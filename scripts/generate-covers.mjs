/**
 * Generates the architecture thumbnails shown on project cards
 * (src/content/projects/covers/<slug>.svg). Run with `npm run covers`.
 *
 * Each cover is a deliberately high-level sketch: a handful of components and
 * the main paths between them. Nodes sit on a grid (col 0–3, row 0–2); `accent`
 * marks the component the project is really about. Edit a spec and re-run.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const W = 640;
const H = 400;
const BOX_W = 134;
const BOX_H = 46;
const COL = 160;
const ROW = 130;

const covers = {
  'mcp-platform': {
    zone: { label: 'ONE REPOSITORY · THREE PROCESSES', cols: [1, 3], rows: [0, 1] },
    nodes: {
      client: [0, 0, 'Console / API'],
      api: [1, 0, 'api'],
      temporal: [2, 0, 'Temporal'],
      worker: [3, 0, 'worker'],
      pg: [1, 1, 'PostgreSQL'],
      gateway: [3, 1, 'gateway', true],
      ext: [2, 2, 'External client'],
      servers: [3, 2, 'MCP servers'],
    },
    edges: [
      ['client', 'api'], ['api', 'temporal'], ['temporal', 'worker'], ['api', 'pg'],
      ['worker', 'gateway'], ['gateway', 'servers'], ['gateway', 'pg', true], ['ext', 'gateway'],
    ],
  },
  'currency-rate-platform': {
    nodes: {
      partners: [0, 0, 'API consumers'],
      staff: [0, 1, 'Internal users'],
      serve: [1, 0, 'API · dashboard'],
      queue: [2, 0, 'Redis queue'],
      worker: [3, 0, 'Activator', true],
      pg: [2, 1, 'PostgreSQL'],
    },
    edges: [['partners', 'serve'], ['staff', 'serve'], ['serve', 'queue'], ['queue', 'worker'], ['serve', 'pg'], ['worker', 'pg', true]],
  },
  payin: {
    nodes: {
      providers: [0, 0, 'External providers'],
      edge: [1, 0, 'Nginx'],
      app: [2, 0, 'Webhook pipeline', true],
      db: [3, 0, 'MariaDB'],
      console: [1, 1, 'Admin console'],
      workers: [2, 1, 'Queue workers'],
      downstream: [3, 1, 'Downstream systems'],
    },
    edges: [['providers', 'edge'], ['edge', 'app'], ['app', 'db'], ['app', 'workers'], ['workers', 'downstream'], ['console', 'app']],
  },
  'x-purchase': {
    nodes: {
      clients: [0, 0, 'API clients'],
      edge: [1, 0, 'Nginx'],
      app: [2, 0, 'Laravel monolith', true],
      pg: [3, 0, 'PostgreSQL'],
      console: [1, 1, 'Admin console'],
      workers: [2, 1, 'Queue workers'],
      adapters: [3, 1, 'Provider adapters'],
    },
    edges: [['clients', 'edge'], ['edge', 'app'], ['app', 'pg'], ['app', 'workers'], ['workers', 'adapters'], ['console', 'app']],
  },
  tabtab: {
    zone: { label: 'KUBERNETES · GOOGLE CLOUD', cols: [2, 3], rows: [0, 0] },
    nodes: {
      web: [0, 0, 'Nuxt web app'],
      edge: [1, 0, 'Cloudflare'],
      services: [2, 0, 'Go · Lumen · NestJS', true],
      data: [3, 0, 'Data stores'],
      external: [2, 1, 'OpenAI · Maps APIs'],
    },
    edges: [['web', 'edge'], ['edge', 'services'], ['services', 'data'], ['services', 'external']],
  },
  'infrastructure-engineering': {
    zone: { label: 'KUBERNETES', cols: [2, 3], rows: [1, 1] },
    nodes: {
      commit: [0, 0, 'Commit'],
      ci: [1, 0, 'CI/CD pipeline'],
      registry: [2, 0, 'Image registry'],
      users: [0, 1, 'Users'],
      edge: [1, 1, 'Cloudflare'],
      ingress: [2, 1, 'Nginx ingress'],
      app: [3, 1, 'Services', true],
    },
    edges: [['commit', 'ci'], ['ci', 'registry'], ['registry', 'app'], ['users', 'edge'], ['edge', 'ingress'], ['ingress', 'app']],
  },
  reefcare: {
    nodes: {
      browser: [0, 0, 'Browser'],
      proxy: [1, 0, 'Caddy'],
      api: [2, 0, 'Go API · workers', true],
      pg: [3, 0, 'PostgreSQL'],
      web: [2, 1, 'SvelteKit (static)'],
      storage: [3, 1, 'Object storage'],
    },
    edges: [['browser', 'proxy'], ['proxy', 'api'], ['proxy', 'web'], ['api', 'pg'], ['api', 'storage']],
  },
};

function render({ nodes, edges, zone }) {
  const rows = Math.max(...Object.values(nodes).map(([, row]) => row)) + 1;
  const top = (H - (rows - 1) * ROW) / 2;
  const at = ([col, row]) => [80 + col * COL, top + row * ROW];

  const path = (from, to) => {
    const [x1, y1] = at(nodes[from]);
    const [x2, y2] = at(nodes[to]);
    if (y1 === y2) {
      const dir = Math.sign(x2 - x1);
      return `M${x1 + (dir * BOX_W) / 2},${y1} H${x2 - (dir * BOX_W) / 2}`;
    }
    if (x1 === x2) {
      const dir = Math.sign(y2 - y1);
      return `M${x1},${y1 + (dir * BOX_H) / 2} V${y2 - (dir * BOX_H) / 2}`;
    }
    const dir = Math.sign(x2 - x1);
    const startX = x1 + (dir * BOX_W) / 2;
    const endX = x2 - (dir * BOX_W) / 2;
    const mid = (startX + endX) / 2;
    return `M${startX},${y1} H${mid} V${y2} H${endX}`;
  };

  const edgeSvg = edges
    .map(([from, to, dashed]) => {
      const colour = dashed ? '#5b6472' : '#4fd6c4';
      return `<path d="${path(from, to)}" fill="none" stroke="${colour}" stroke-width="1.5"${
        dashed ? ' stroke-dasharray="5 5"' : ''
      } marker-end="url(#${dashed ? 'muted' : 'accent'})"/>`;
    })
    .join('\n  ');

  const nodeSvg = Object.values(nodes)
    .map((node) => {
      const [x, y] = at(node);
      const [, , label, accent] = node;
      return `<rect x="${x - BOX_W / 2}" y="${y - BOX_H / 2}" width="${BOX_W}" height="${BOX_H}" rx="2" fill="#0a0d12" stroke="${
        accent ? '#4fd6c4' : '#333b49'
      }" stroke-width="${accent ? 1.6 : 1}"/>
  <text x="${x}" y="${y + 4.5}" text-anchor="middle" font-family="ui-sans-serif,system-ui,Helvetica,Arial,sans-serif" font-size="12.5" font-weight="500" fill="#edece8">${label.replace(/&/g, '&amp;')}</text>`;
    })
    .join('\n  ');

  let zoneSvg = '';
  if (zone) {
    const [x1, y1] = at([zone.cols[0], zone.rows[0]]);
    const [x2, y2] = at([zone.cols[1], zone.rows[1]]);
    const x = x1 - BOX_W / 2 - 12;
    const y = y1 - BOX_H / 2 - 22;
    zoneSvg = `<rect x="${x}" y="${y}" width="${x2 - x1 + BOX_W + 24}" height="${y2 - y1 + BOX_H + 38}" rx="2" fill="none" stroke="#333b49" stroke-dasharray="3 4"/>
  <text x="${x + 8}" y="${y - 7}" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1" fill="#838894">${zone.label}</text>`;
  }

  const marker = (id, colour) =>
    `<marker id="${id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,.5 L8,4 L0,7.5Z" fill="${colour}"/></marker>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>${marker('accent', '#4fd6c4')}${marker('muted', '#5b6472')}</defs>
  <rect width="${W}" height="${H}" fill="#10141b"/>
  ${zoneSvg}
  ${edgeSvg}
  ${nodeSvg}
</svg>
`;
}

const directory = new URL('../src/content/projects/covers/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const [slug, spec] of Object.entries(covers)) {
  await writeFile(new URL(`${slug}.svg`, directory), render(spec));
}
console.log(`Wrote ${Object.keys(covers).length} covers`);
