import { useEffect, useId, useMemo, useState, type KeyboardEvent } from 'react';
import type { ArchitectureDiagram, DiagramEdge, DiagramNode } from '@/data/diagrams';

interface Props {
  diagrams: ArchitectureDiagram[];
  /** Stack the detail panel under the canvas (for use inside article columns). */
  compact?: boolean;
}

/* Geometry, in SVG user units. Nodes are centred in the cells of a grid. */
const CELL_W = 206;
const CELL_H = 118;
const NODE_W = 150;
const NODE_H = 58;
const PAD = 16;

interface Point {
  x: number;
  y: number;
}

const centre = (node: DiagramNode): Point => ({
  x: PAD + node.col * CELL_W + CELL_W / 2,
  y: PAD + node.row * CELL_H + CELL_H / 2,
});

interface EdgeGeometry {
  d: string;
  label: Point;
  anchor: 'middle' | 'start';
}

function routeEdge(edge: DiagramEdge, from: DiagramNode, to: DiagramNode): EdgeGeometry {
  const a = centre(from);
  const b = centre(to);
  const hw = NODE_W / 2;
  const hh = NODE_H / 2;
  const dirX = Math.sign(b.x - a.x) || 1;
  const dirY = Math.sign(b.y - a.y) || 1;

  if (edge.route === 'hv') {
    const startX = a.x + dirX * hw;
    return {
      d: `M${startX},${a.y} H${b.x} V${b.y - dirY * hh}`,
      label: { x: (startX + b.x) / 2, y: a.y - 8 },
      anchor: 'middle',
    };
  }
  if (from.row === to.row) {
    const x1 = a.x + dirX * hw;
    const x2 = b.x - dirX * hw;
    return { d: `M${x1},${a.y} H${x2}`, label: { x: (x1 + x2) / 2, y: a.y - 8 }, anchor: 'middle' };
  }
  if (from.col === to.col) {
    const y1 = a.y + dirY * hh;
    const y2 = b.y - dirY * hh;
    return { d: `M${a.x},${y1} V${y2}`, label: { x: a.x + 9, y: (y1 + y2) / 2 + 4 }, anchor: 'start' };
  }
  const x1 = a.x + dirX * hw;
  const x2 = b.x - dirX * hw;
  const mid = (x1 + x2) / 2;
  return {
    d: `M${x1},${a.y} H${mid} V${b.y} H${x2}`,
    label: { x: mid + 9, y: (a.y + b.y) / 2 + 4 },
    anchor: 'start',
  };
}

/** True when the visitor has asked for reduced motion. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

const pillClass = (active: boolean) =>
  `inline-flex h-9 items-center border px-3.5 text-sm transition-colors duration-150 ${
    active ? 'border-fg bg-fg text-bg' : 'border-line text-muted hover:border-line-strong hover:text-fg'
  }`;

const stepButtonClass =
  'inline-flex h-9 items-center border border-line px-3.5 text-sm text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted';

/**
 * Interactive architecture diagram. Select a component to inspect it, or pick
 * a flow and step through it. Everything it draws comes from src/data/diagrams.ts.
 *
 * Markup deliberately avoids bare list and heading elements so the component
 * can be embedded inside long-form `.prose` content without inheriting its styles.
 */
export default function DiagramExplorer({ diagrams, compact = false }: Props) {
  const uid = useId();
  const reducedMotion = usePrefersReducedMotion();
  const [diagramIndex, setDiagramIndex] = useState(0);
  const [flowId, setFlowId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const diagram = diagrams[diagramIndex] ?? diagrams[0];

  const geometry = useMemo(() => {
    if (!diagram) return null;
    const nodes = new Map(diagram.nodes.map((node) => [node.id, node]));
    const edges = diagram.edges.flatMap((edge) => {
      const from = nodes.get(edge.from);
      const to = nodes.get(edge.to);
      return from && to ? [{ edge, from, to, ...routeEdge(edge, from, to) }] : [];
    });
    return { nodes, edges };
  }, [diagram]);

  if (!diagram || !geometry) return null;

  const width = diagram.cols * CELL_W + PAD * 2;
  const height = diagram.rows * CELL_H + PAD * 2;
  const flow = diagram.flows.find((item) => item.id === flowId) ?? null;
  const selected = selectedId ? (geometry.nodes.get(selectedId) ?? null) : null;

  // What is currently emphasised: one step, a whole flow, or a node's connections.
  const activeEdges = new Set<string>();
  if (flow) {
    const step = stepIndex === null ? undefined : flow.steps[stepIndex];
    if (step) activeEdges.add(step.edge);
    else flow.steps.forEach((item) => activeEdges.add(item.edge));
  } else if (selected) {
    diagram.edges
      .filter((edge) => edge.from === selected.id || edge.to === selected.id)
      .forEach((edge) => activeEdges.add(edge.id));
  }
  const activeNodes = new Set<string>();
  diagram.edges
    .filter((edge) => activeEdges.has(edge.id))
    .forEach((edge) => {
      activeNodes.add(edge.from);
      activeNodes.add(edge.to);
    });
  if (selected) activeNodes.add(selected.id);
  const focused = activeEdges.size > 0 || selected !== null;

  const stepNumbers = new Map<string, number>();
  flow?.steps.forEach((step, index) => {
    if (!stepNumbers.has(step.edge)) stepNumbers.set(step.edge, index + 1);
  });

  const reset = () => {
    setFlowId(null);
    setStepIndex(null);
    setSelectedId(null);
  };

  const chooseDiagram = (index: number) => {
    setDiagramIndex(index);
    reset();
  };

  const chooseFlow = (id: string | null) => {
    setFlowId(id);
    setStepIndex(null);
    setSelectedId(null);
  };

  const toggleNode = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
    setFlowId(null);
    setStepIndex(null);
  };

  const onNodeKey = (event: KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleNode(id);
    }
  };

  const connections = selected
    ? diagram.edges.flatMap((edge) => {
        const outgoing = edge.from === selected.id;
        if (!outgoing && edge.to !== selected.id) return [];
        const other = geometry.nodes.get(outgoing ? edge.to : edge.from);
        return other ? [{ id: edge.id, outgoing, other, label: edge.label }] : [];
      })
    : [];

  const arrow = `${uid}-arrow`;
  const arrowActive = `${uid}-arrow-active`;

  return (
    <div className="not-prose">
      {diagrams.length > 1 && (
        <div role="tablist" aria-label="Diagrams" className="mb-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
          {diagrams.map((item, index) => {
            const active = index === diagramIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => chooseDiagram(index)}
                className={`-mb-px border-b py-3 text-left text-[0.9375rem] tracking-tight transition-colors duration-150 ${
                  active ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg'
                }`}
              >
                <span className="label mr-3">{String(index + 1).padStart(2, '0')}</span>
                {item.title}
              </button>
            );
          })}
        </div>
      )}

      <p className="max-w-2xl text-muted">{diagram.summary}</p>

      <div role="group" aria-label="Highlight a flow" className="mt-6 flex flex-wrap gap-2">
        <button type="button" aria-pressed={flow === null} onClick={() => chooseFlow(null)} className={pillClass(flow === null)}>
          Overview
        </button>
        {diagram.flows.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={flow?.id === item.id}
            onClick={() => chooseFlow(item.id)}
            className={pillClass(flow?.id === item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={`mt-6 grid gap-px border border-line bg-line ${compact ? '' : 'lg:grid-cols-3'}`}>
        <div className={`flex items-start overflow-x-auto bg-surface py-4 ${compact ? '' : 'lg:col-span-2'}`}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="group"
            aria-label={`${diagram.title} diagram`}
            className="mx-auto block h-auto w-full"
            style={{ minWidth: `${Math.round(width * (compact ? 0.64 : 0.72))}px`, maxWidth: `${Math.round(width * 1.15)}px` }}
          >
            <defs>
              {[
                { id: arrow, className: 'fill-subtle' },
                { id: arrowActive, className: 'fill-accent' },
              ].map((marker) => (
                <marker key={marker.id} id={marker.id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M0,0.5 L8,4 L0,7.5 Z" className={marker.className} />
                </marker>
              ))}
            </defs>

            {diagram.zones.map((zone) => {
              const x = PAD + zone.cols[0] * CELL_W + 6;
              const y = PAD + zone.rows[0] * CELL_H + 4;
              return (
                <g key={zone.id}>
                  <rect
                    x={x}
                    y={y}
                    width={(zone.cols[1] - zone.cols[0] + 1) * CELL_W - 12}
                    height={(zone.rows[1] - zone.rows[0] + 1) * CELL_H - 8}
                    rx="2"
                    className="fill-none stroke-line-strong"
                    strokeDasharray="3 4"
                  />
                  <text x={x + 9} y={y + 15} className="fill-subtle font-mono text-[9.5px] uppercase tracking-[0.08em]">
                    {zone.label}
                  </text>
                </g>
              );
            })}

            {geometry.edges.map(({ edge, d, label, anchor }) => {
              const active = activeEdges.has(edge.id);
              const number = stepNumbers.get(edge.id);
              return (
                <g
                  key={edge.id}
                  className="transition-opacity duration-200"
                  style={{ opacity: focused && !active ? 0.22 : 1 }}
                >
                  <path
                    d={d}
                    fill="none"
                    strokeWidth={active ? 1.75 : 1.1}
                    strokeDasharray={edge.dashed ? '4 4' : undefined}
                    strokeLinejoin="round"
                    markerEnd={`url(#${active ? arrowActive : arrow})`}
                    className={`transition-colors duration-200 ${active ? 'edge-flow stroke-accent' : 'stroke-subtle'}`}
                  />
                  {/* A packet travelling along the highlighted path. */}
                  {active && flow && !reducedMotion && (
                    <circle r="3.2" className="fill-accent" aria-hidden="true">
                      <animateMotion dur="1.5s" repeatCount="indefinite" path={d} />
                    </circle>
                  )}
                  {number !== undefined ? (
                    <g aria-hidden="true">
                      <circle cx={anchor === 'start' ? label.x + 2 : label.x} cy={label.y - 4} r="9" className="fill-accent" />
                      <text
                        x={anchor === 'start' ? label.x + 2 : label.x}
                        y={label.y - 0.5}
                        textAnchor="middle"
                        className="fill-accent-contrast font-mono text-[10px] font-medium"
                      >
                        {number}
                      </text>
                    </g>
                  ) : (
                    edge.label && (
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor={anchor}
                        className="fill-muted stroke-surface font-mono text-[10px]"
                        strokeWidth="4"
                        style={{ paintOrder: 'stroke' }}
                      >
                        {edge.label}
                      </text>
                    )
                  )}
                </g>
              );
            })}

            {diagram.nodes.map((node) => {
              const { x, y } = centre(node);
              const isSelected = selected?.id === node.id;
              const active = activeNodes.has(node.id);
              return (
                <g
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => toggleNode(node.id)}
                  onKeyDown={(event) => onNodeKey(event, node.id)}
                  className="group cursor-pointer outline-none transition-opacity duration-200"
                  style={{ opacity: focused && !active ? 0.4 : 1 }}
                >
                  <rect
                    x={x - NODE_W / 2}
                    y={y - NODE_H / 2}
                    width={NODE_W}
                    height={NODE_H}
                    rx="2"
                    strokeWidth={isSelected ? 1.75 : 1}
                    className={`fill-bg transition-colors duration-150 group-hover:stroke-fg group-focus-visible:stroke-accent group-focus-visible:[stroke-width:2.5] ${
                      isSelected ? 'node-active stroke-accent' : flow && active ? 'stroke-accent' : 'stroke-line-strong'
                    }`}
                  />
                  <text x={x} y={node.sublabel ? y - 2 : y + 4.5} textAnchor="middle" className="fill-fg text-[13px] font-medium">
                    {node.label}
                  </text>
                  {node.sublabel && (
                    <text x={x} y={y + 14} textAnchor="middle" className="fill-subtle font-mono text-[9.5px]">
                      {node.sublabel}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="bg-bg p-6 sm:p-7" aria-live="polite">
          {selected ? (
            <div>
              <p className="label">{selected.kind}</p>
              <p role="heading" aria-level={3} className="mt-3 text-xl tracking-tight text-fg">
                {selected.label}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{selected.description}</p>

              {selected.tech && selected.tech.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {selected.tech.map((item) => (
                    <span
                      key={item}
                      className="inline-block border border-line px-2 py-1 font-mono text-[0.6875rem] uppercase leading-none tracking-[0.06em] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {connections.length > 0 && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="label">Connections</p>
                  <div role="list" className="mt-3 space-y-1">
                    {connections.map((connection) => (
                      <div role="listitem" key={connection.id}>
                        <button
                          type="button"
                          onClick={() => toggleNode(connection.other.id)}
                          className="flex w-full items-baseline gap-3 py-1 text-left text-sm text-muted transition-colors hover:text-fg"
                        >
                          <span className="font-mono text-xs text-subtle" aria-hidden="true">
                            {connection.outgoing ? '→' : '←'}
                          </span>
                          <span className="sr-only">{connection.outgoing ? 'Calls' : 'Called by'}</span>
                          <span>{connection.other.label}</span>
                          {connection.label && <span className="ml-auto font-mono text-xs text-subtle">{connection.label}</span>}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button type="button" onClick={reset} className={`${stepButtonClass} mt-6`}>
                Clear selection
              </button>
            </div>
          ) : flow ? (
            <div>
              <p className="label">Flow</p>
              <p role="heading" aria-level={3} className="mt-3 text-xl tracking-tight text-fg">
                {flow.label}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{flow.description}</p>

              <div role="list" className="mt-5 border-t border-line">
                {flow.steps.map((step, index) => {
                  const current = stepIndex === index;
                  return (
                    <div role="listitem" key={`${step.edge}-${index}`} className="border-b border-line">
                      <button
                        type="button"
                        aria-current={current ? 'step' : undefined}
                        onClick={() => setStepIndex(current ? null : index)}
                        className={`flex w-full gap-4 py-3 text-left text-sm leading-relaxed transition-colors ${
                          current ? 'text-fg' : 'text-muted hover:text-fg'
                        }`}
                      >
                        <span className={`pt-0.5 font-mono text-xs ${current ? 'text-accent' : 'text-subtle'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{step.text}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={stepButtonClass}
                  disabled={stepIndex === null || stepIndex === 0}
                  onClick={() => setStepIndex((current) => (current === null ? null : Math.max(0, current - 1)))}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className={stepButtonClass}
                  disabled={stepIndex === flow.steps.length - 1}
                  onClick={() => setStepIndex((current) => (current === null ? 0 : Math.min(flow.steps.length - 1, current + 1)))}
                >
                  {stepIndex === null ? 'Step through' : 'Next'}
                </button>
                {stepIndex !== null && (
                  <button type="button" className={stepButtonClass} onClick={() => setStepIndex(null)}>
                    Show all
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="label">How to read this</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                Select any component to see what it is responsible for and what it talks to. Or choose a flow above
                to follow one path through the system, step by step.
              </p>
              <div className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-muted">
                <p className="flex items-center gap-3">
                  <svg width="28" height="8" aria-hidden="true">
                    <line x1="0" y1="4" x2="28" y2="4" className="stroke-subtle" strokeWidth="1.2" />
                  </svg>
                  Request traffic
                </p>
                <p className="flex items-center gap-3">
                  <svg width="28" height="8" aria-hidden="true">
                    <line x1="0" y1="4" x2="28" y2="4" className="stroke-subtle" strokeWidth="1.2" strokeDasharray="4 4" />
                  </svg>
                  Supporting relationship
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm text-subtle md:hidden">Scroll the diagram sideways to see all of it.</p>
      <p className="mt-4 text-sm text-subtle">{diagram.note}</p>
    </div>
  );
}
