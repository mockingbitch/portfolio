/**
 * Technology ecosystem, organised by honest proficiency rather than a flat list.
 *
 * TODO: the levels below are sensible defaults inferred from the site brief.
 * Review each one and move it to the tier that reflects your actual experience.
 */
export const proficiencyLevels = [
  { id: 'core', label: 'Core', description: 'Primary tools. Deep, day-to-day production experience.' },
  { id: 'proficient', label: 'Proficient', description: 'Used regularly in production work.' },
  { id: 'working', label: 'Working knowledge', description: 'Comfortable contributing; not a daily driver.' },
] as const;

export type Proficiency = (typeof proficiencyLevels)[number]['id'];

export interface TechnologyGroup {
  title: string;
  items: { name: string; level: Proficiency }[];
}

export const technologies: TechnologyGroup[] = [
  {
    title: 'Backend',
    items: [
      { name: 'Go', level: 'core' },
      { name: 'PHP', level: 'core' },
      { name: 'Laravel', level: 'core' },
      { name: 'Node.js', level: 'proficient' },
      { name: 'NestJS', level: 'working' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'TypeScript', level: 'proficient' },
      { name: 'Vue.js', level: 'proficient' },
      { name: 'Nuxt', level: 'working' },
      { name: 'React', level: 'working' },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      { name: 'Docker', level: 'core' },
      { name: 'Linux', level: 'core' },
      { name: 'CI/CD', level: 'core' },
      { name: 'Kubernetes', level: 'proficient' },
      { name: 'Nginx', level: 'proficient' },
      { name: 'Cloudflare', level: 'proficient' },
      { name: 'GCP', level: 'proficient' },
    ],
  },
  {
    title: 'Data & Messaging',
    items: [
      { name: 'PostgreSQL', level: 'core' },
      { name: 'MySQL / MariaDB', level: 'proficient' },
      { name: 'Redis', level: 'proficient' },
    ],
  },
  {
    title: 'Architecture & Security',
    items: [
      { name: 'Distributed Systems', level: 'core' },
      { name: 'OAuth2 / OIDC', level: 'core' },
      { name: 'Microservices', level: 'proficient' },
      { name: 'API Gateway', level: 'proficient' },
      { name: 'mTLS', level: 'proficient' },
      { name: 'PKI', level: 'proficient' },
      { name: 'RBAC / ABAC', level: 'proficient' },
      { name: 'KMS', level: 'working' },
    ],
  },
];
