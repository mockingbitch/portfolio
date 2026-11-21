/**
 * Personal profile — the single source of truth for who this site is about.
 */
export const profile = {
  name: 'Tran Quang Phong',
  /** Short wordmark shown in the header. Defaults to the name. */
  wordmark: 'Tran Quang Phong',
  /** Used as the schema.org job title. */
  title: 'Senior Software Engineer',
  positioning: ['Senior Software Engineer', 'Solution Architect', 'System Design'],
  headline: {
    primary: 'Building Scalable Systems.',
    secondary: 'Engineering Better Solutions.',
  },
  statement:
    'I design and build scalable software systems, distributed architectures, and infrastructure-aware platforms. Focused on backend engineering, system reliability, security, performance, and engineering excellence.',
  /** Core professional domains, shown in the hero. */
  domains: [
    'Backend Engineering',
    'System Architecture',
    'Distributed Systems',
    'Cloud Infrastructure',
    'Security Engineering',
    'AI & Agent Engineering',
    'Technical Leadership',
  ],
  email: 'jarvis.phongtran@gmail.com',
  /** One-paragraph professional summary, shown on the About page. */
  summary:
    'Senior fullstack developer and technical leader with more than five years of hands-on experience designing, building and operating scalable backend systems and product platforms for international clients and product companies.',
  /** Downloadable resume, served from /public. Set `href` to '' to hide the links. */
  resume: {
    href: '/CV-Tran-Quang-Phong.pdf',
    label: 'Resume',
  },
  /** Optional location line. Leave empty to hide. */
  location: 'Hanoi, Vietnam',
  availability: {
    /** Set to false to hide the status indicator. */
    enabled: true,
    label: 'Open to new conversations',
  },
} as const;
