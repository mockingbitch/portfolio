/**
 * Technical expertise, organised by engineering domain.
 *
 * Proficiency is not scored. Each domain is backed on the Expertise page by
 * evidence: the projects, system designs and deep dives whose frontmatter
 * lists the domain id in `domains`.
 */
export const domains = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    summary: 'Services and APIs built around clear contracts, predictable data models and well-understood failure behaviour.',
    technologies: ['Go (Gin, Echo)', 'PHP (Laravel, Symfony, CakePHP)', 'Node.js (NestJS, Express)', 'REST, OpenAPI, gRPC'],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    summary: 'Interfaces that respect the system behind them: typed boundaries, honest loading states and no surprise round trips.',
    technologies: ['React', 'Vue, Nuxt', 'TypeScript', 'Svelte', 'Tailwind CSS'],
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    summary: 'Deciding where boundaries go, how components communicate, and which complexity a system has actually earned.',
    technologies: [
      'Microservices',
      'Distributed Systems',
      'Event-driven Architecture',
      'Domain-driven Design',
      'Clean Architecture',
      'API Architecture',
    ],
  },
  {
    id: 'database',
    title: 'Database',
    summary: 'Schemas, indexes and caching designed from the access patterns up, with one clear source of truth.',
    technologies: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Data pipelines (ETL, batch)'],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    summary: 'The path from commit to production, and the runtime that keeps software healthy once it is there.',
    technologies: ['Docker', 'Kubernetes', 'Linux', 'Nginx', 'CI/CD (GitHub Actions)'],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    summary: 'Managed platforms and the network edge, used deliberately rather than by default.',
    technologies: ['Google Cloud Platform', 'AWS (EC2, RDS, S3, IAM, VPC)', 'Cloudflare'],
  },
  {
    id: 'security',
    title: 'Security',
    summary: 'Identity, trust and authorization treated as architecture — for users, for services and for the secrets they depend on.',
    technologies: ['OAuth2', 'OIDC', 'mTLS', 'KMS', 'Secrets Management', 'HMAC request signing'],
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    summary: 'Putting language models to work inside real systems: tool access, orchestration and the guardrails around them.',
    technologies: ['LLM Integration (OpenAI API)', 'MCP', 'AI Agents', 'Agent Orchestration'],
  },
] as const;

export type Domain = (typeof domains)[number];
export type DomainId = Domain['id'];

export const domainIds = domains.map((domain) => domain.id) as [DomainId, ...DomainId[]];

export function getDomain(id: DomainId): Domain {
  const domain = domains.find((item) => item.id === id);
  if (!domain) throw new Error(`Unknown domain: ${id}`);
  return domain;
}
