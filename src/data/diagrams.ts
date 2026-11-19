/**
 * Interactive architecture diagrams.
 *
 * Each diagram is plain data: nodes sit on a column/row grid, edges connect
 * them, zones frame a group of cells, and flows walk through edges in order.
 * The explorer component (components/diagrams/DiagramExplorer.tsx) draws
 * whatever is described here — add a diagram by adding an object.
 *
 * TODO: the two diagrams below are generic reference models. Replace them with
 * (or add) diagrams of your own systems once you are ready to publish those.
 */
export type NodeKind = 'Client' | 'Edge' | 'Service' | 'Data store' | 'Security' | 'Delivery' | 'Operations';

export interface DiagramNode {
  id: string;
  label: string;
  /** Short line under the label, e.g. the technology. */
  sublabel?: string;
  kind: NodeKind;
  /** Zero-based grid position. */
  col: number;
  row: number;
  description: string;
  tech?: string[];
}

export interface DiagramEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  /** Dashed edges mark supporting relationships (issuance, telemetry) rather than request traffic. */
  dashed?: boolean;
  /**
   * How the line is routed. Defaults to a straight line for nodes sharing a
   * row or column, and a horizontal–vertical–horizontal elbow otherwise.
   * `hv` leaves sideways and enters the target from above or below.
   */
  route?: 'hv';
}

export interface DiagramZone {
  id: string;
  label: string;
  /** Inclusive [from, to] grid ranges. */
  cols: [number, number];
  rows: [number, number];
}

export interface DiagramFlow {
  id: string;
  label: string;
  description: string;
  steps: { edge: string; text: string }[];
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  summary: string;
  /** Shown under the diagram. Use it to say what the diagram is and is not. */
  note: string;
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  zones: DiagramZone[];
  flows: DiagramFlow[];
}

const REFERENCE_NOTE =
  'Reference model — a generic pattern for illustration, not a record of a specific production system.';

export const diagrams: ArchitectureDiagram[] = [
  {
    id: 'secure-service-platform',
    title: 'Secure service platform',
    summary:
      'How a request is authenticated, authorized and carried between services that each hold a verifiable identity.',
    note: REFERENCE_NOTE,
    cols: 4,
    rows: 3,
    nodes: [
      {
        id: 'client',
        label: 'Client',
        sublabel: 'User or agent',
        kind: 'Client',
        col: 0,
        row: 1,
        description:
          'Anything calling the platform from outside: an application acting for a user, or an automated agent. It holds no long-lived secrets for internal services.',
      },
      {
        id: 'idp',
        label: 'Identity provider',
        sublabel: 'OAuth2 / OIDC',
        kind: 'Security',
        col: 1,
        row: 0,
        description:
          'Authenticates the caller and issues short-lived, signed access tokens. Publishes the keys other components use to verify those tokens.',
        tech: ['OAuth2', 'OIDC', 'JWKS'],
      },
      {
        id: 'gateway',
        label: 'API gateway',
        sublabel: 'Single entry point',
        kind: 'Edge',
        col: 1,
        row: 1,
        description:
          'Terminates external traffic, verifies the access token, applies coarse limits, and forwards the request inward over a mutually authenticated connection.',
        tech: ['Token verification', 'Rate limiting', 'Routing'],
      },
      {
        id: 'policy',
        label: 'Policy engine',
        sublabel: 'RBAC / ABAC',
        kind: 'Security',
        col: 2,
        row: 0,
        description:
          'Answers one question: may this caller perform this action on this resource? Keeping the decision here keeps authorization logic out of individual services.',
        tech: ['RBAC', 'ABAC'],
      },
      {
        id: 'orchestrator',
        label: 'Orchestrator',
        sublabel: 'Core service',
        kind: 'Service',
        col: 2,
        row: 1,
        description:
          'Owns the request once it is inside: checks authorization, decides which downstream services to call, and assembles the result.',
        tech: ['Go'],
      },
      {
        id: 'pki',
        label: 'Internal PKI',
        sublabel: 'Certificate authority',
        kind: 'Security',
        col: 2,
        row: 2,
        description:
          'Issues short-lived certificates to every workload. A certificate is the workload’s identity; rotation is automatic so expiry is routine, not an incident.',
        tech: ['X.509', 'mTLS', 'KMS-backed keys'],
      },
      {
        id: 'service-a',
        label: 'Service A',
        sublabel: 'Downstream',
        kind: 'Service',
        col: 3,
        row: 0,
        description:
          'A downstream service. It accepts connections only from peers presenting a certificate it trusts, and knows which service is calling.',
      },
      {
        id: 'service-b',
        label: 'Service B',
        sublabel: 'Downstream',
        kind: 'Service',
        col: 3,
        row: 1,
        description:
          'A second downstream service with the same contract: mutual TLS in, explicit caller identity, no implicit trust in the network.',
      },
    ],
    edges: [
      { id: 'client-idp', from: 'client', to: 'idp', label: 'authenticate' },
      { id: 'client-gateway', from: 'client', to: 'gateway', label: 'token' },
      { id: 'gateway-idp', from: 'gateway', to: 'idp', label: 'verify' },
      { id: 'gateway-orchestrator', from: 'gateway', to: 'orchestrator', label: 'mTLS' },
      { id: 'orchestrator-policy', from: 'orchestrator', to: 'policy', label: 'authorize' },
      { id: 'orchestrator-a', from: 'orchestrator', to: 'service-a', label: 'mTLS' },
      { id: 'orchestrator-b', from: 'orchestrator', to: 'service-b', label: 'mTLS' },
      { id: 'pki-orchestrator', from: 'pki', to: 'orchestrator', label: 'certificate', dashed: true },
      { id: 'pki-gateway', from: 'pki', to: 'gateway', dashed: true, route: 'hv' },
      { id: 'pki-b', from: 'pki', to: 'service-b', dashed: true, route: 'hv' },
    ],
    zones: [{ id: 'identity', label: 'Identity and policy', cols: [1, 2], rows: [0, 0] }],
    flows: [
      {
        id: 'request',
        label: 'Authenticated request',
        description: 'The path of a single call, from sign-in to a downstream service.',
        steps: [
          { edge: 'client-idp', text: 'The client authenticates and receives a short-lived access token.' },
          { edge: 'client-gateway', text: 'It calls the gateway, presenting the token.' },
          { edge: 'gateway-idp', text: 'The gateway verifies the token’s signature and claims against the provider’s keys.' },
          { edge: 'gateway-orchestrator', text: 'The request moves inward over mutual TLS, so both sides know who they are talking to.' },
          { edge: 'orchestrator-policy', text: 'The orchestrator asks the policy engine whether this caller may perform this action.' },
          { edge: 'orchestrator-b', text: 'Only then is the downstream service called, again over mutual TLS.' },
        ],
      },
      {
        id: 'identity',
        label: 'Workload identity',
        description: 'How services obtain the identity that mutual TLS relies on.',
        steps: [
          { edge: 'pki-gateway', text: 'The gateway requests a certificate that asserts its service identity.' },
          { edge: 'pki-orchestrator', text: 'Each internal service does the same; certificates are short-lived and rotated automatically.' },
          { edge: 'pki-b', text: 'Downstream services trust the same authority, so any two workloads can verify each other.' },
        ],
      },
    ],
  },
  {
    id: 'production-infrastructure',
    title: 'Production infrastructure',
    summary: 'Two paths through the same platform: how a request is served, and how a change reaches production.',
    note: REFERENCE_NOTE,
    cols: 5,
    rows: 3,
    nodes: [
      {
        id: 'commit',
        label: 'Commit',
        sublabel: 'Git',
        kind: 'Delivery',
        col: 0,
        row: 0,
        description: 'Every change starts as a commit. Nothing reaches production by another route.',
      },
      {
        id: 'ci',
        label: 'CI pipeline',
        sublabel: 'Build and test',
        kind: 'Delivery',
        col: 1,
        row: 0,
        description:
          'Builds the change, runs the test suite and produces an immutable container image. A failing stage stops the change here.',
        tech: ['CI/CD', 'Docker'],
      },
      {
        id: 'registry',
        label: 'Registry',
        sublabel: 'Container images',
        kind: 'Delivery',
        col: 2,
        row: 0,
        description: 'Stores versioned images. What runs in production is exactly what was built and tested.',
      },
      {
        id: 'rollout',
        label: 'Rollout',
        sublabel: 'Deploy controller',
        kind: 'Delivery',
        col: 3,
        row: 0,
        description:
          'Replaces running instances gradually, waits for health checks, and rolls back if the new version does not become healthy.',
        tech: ['Kubernetes'],
      },
      {
        id: 'users',
        label: 'Users',
        sublabel: 'Internet',
        kind: 'Client',
        col: 0,
        row: 1,
        description: 'Browsers and API clients reaching the public endpoint.',
      },
      {
        id: 'edge',
        label: 'Edge',
        sublabel: 'Cloudflare',
        kind: 'Edge',
        col: 1,
        row: 1,
        description: 'DNS, TLS termination, caching and filtering at the network edge, before traffic reaches the origin.',
        tech: ['Cloudflare'],
      },
      {
        id: 'ingress',
        label: 'Ingress',
        sublabel: 'Nginx',
        kind: 'Edge',
        col: 2,
        row: 1,
        description: 'Routes requests entering the cluster to the right service and balances them across healthy instances.',
        tech: ['Nginx', 'Kubernetes'],
      },
      {
        id: 'app',
        label: 'Application',
        sublabel: 'Service pods',
        kind: 'Service',
        col: 3,
        row: 1,
        description: 'Stateless application instances. Because they hold no state, they can be scaled and replaced freely.',
        tech: ['Go', 'Laravel'],
      },
      {
        id: 'postgres',
        label: 'PostgreSQL',
        sublabel: 'Primary data',
        kind: 'Data store',
        col: 4,
        row: 1,
        description: 'The system of record. Durable, transactional state lives here and nowhere else.',
        tech: ['PostgreSQL'],
      },
      {
        id: 'observability',
        label: 'Observability',
        sublabel: 'Logs, metrics, alerts',
        kind: 'Operations',
        col: 3,
        row: 2,
        description: 'Collects the signals needed to know whether the system is healthy and to explain it when it is not.',
      },
      {
        id: 'redis',
        label: 'Redis',
        sublabel: 'Cache and queues',
        kind: 'Data store',
        col: 4,
        row: 2,
        description: 'Fast, disposable state: caches, queues and short-lived coordination. Losing it should degrade, not break.',
        tech: ['Redis'],
      },
    ],
    edges: [
      { id: 'commit-ci', from: 'commit', to: 'ci', label: 'push' },
      { id: 'ci-registry', from: 'ci', to: 'registry', label: 'image' },
      { id: 'registry-rollout', from: 'registry', to: 'rollout', label: 'release' },
      { id: 'rollout-app', from: 'rollout', to: 'app', label: 'replace' },
      { id: 'users-edge', from: 'users', to: 'edge', label: 'HTTPS' },
      { id: 'edge-ingress', from: 'edge', to: 'ingress' },
      { id: 'ingress-app', from: 'ingress', to: 'app' },
      { id: 'app-postgres', from: 'app', to: 'postgres', label: 'query' },
      { id: 'app-redis', from: 'app', to: 'redis', label: 'cache' },
      { id: 'app-observability', from: 'app', to: 'observability', label: 'signals', dashed: true },
    ],
    zones: [
      { id: 'delivery', label: 'Delivery pipeline', cols: [0, 3], rows: [0, 0] },
      { id: 'cluster', label: 'Kubernetes cluster', cols: [2, 3], rows: [1, 2] },
    ],
    flows: [
      {
        id: 'request',
        label: 'Request path',
        description: 'What happens between a user’s request and the response.',
        steps: [
          { edge: 'users-edge', text: 'The request reaches the edge, where TLS is terminated and cached content is served directly.' },
          { edge: 'edge-ingress', text: 'Anything dynamic is forwarded to the origin and enters the cluster through the ingress.' },
          { edge: 'ingress-app', text: 'The ingress routes it to a healthy application instance.' },
          { edge: 'app-redis', text: 'The application checks the cache first.' },
          { edge: 'app-postgres', text: 'On a miss it reads from, or writes to, the database.' },
        ],
      },
      {
        id: 'deploy',
        label: 'Deploy path',
        description: 'How a change travels from a commit to running in production.',
        steps: [
          { edge: 'commit-ci', text: 'A pushed commit triggers the pipeline.' },
          { edge: 'ci-registry', text: 'After build and tests pass, an immutable image is published.' },
          { edge: 'registry-rollout', text: 'The release points the deployment at the new image version.' },
          { edge: 'rollout-app', text: 'Instances are replaced gradually, each gated on its health checks.' },
          { edge: 'app-observability', text: 'Signals from the new version confirm the rollout — or trigger a rollback.' },
        ],
      },
    ],
  },
];

export function getDiagram(id: string): ArchitectureDiagram {
  const diagram = diagrams.find((item) => item.id === id);
  if (!diagram) throw new Error(`Unknown diagram: ${id}`);
  return diagram;
}
