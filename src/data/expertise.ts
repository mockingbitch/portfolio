export interface ExpertiseArea {
  id: string;
  title: string;
  summary: string;
  items: string[];
}

export const expertise: ExpertiseArea[] = [
  {
    id: 'backend',
    title: 'Backend & Distributed Systems',
    summary:
      'Services and APIs designed around clear contracts, predictable data models and well-understood failure behaviour.',
    items: [
      'Go',
      'Laravel',
      'API design',
      'Event-driven architecture',
      'Database design',
      'Performance optimization',
    ],
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    summary:
      'Shaping how services, tenants and identities fit together — and keeping the boundaries between them honest as a platform grows.',
    items: [
      'Microservices',
      'Multi-tenant platforms',
      'Service orchestration',
      'Distributed authentication',
      'Integration architecture',
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Reliability',
    summary:
      'The path from commit to production: containers, clusters, the edge, delivery pipelines and the signals needed to operate them.',
    items: ['Docker', 'Kubernetes', 'Linux', 'GCP', 'Cloudflare', 'CI/CD', 'Observability'],
  },
  {
    id: 'security',
    title: 'Security Engineering',
    summary:
      'Identity, trust and authorization treated as architecture — for users, for services and for the secrets they depend on.',
    items: ['OAuth2 / OIDC', 'mTLS', 'PKI', 'KMS', 'RBAC / ABAC', 'Secrets management'],
  },
];
