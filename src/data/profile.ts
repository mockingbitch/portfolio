/**
 * Personal profile — the single source of truth for who this site is about.
 * Values marked TODO are placeholders. Replace them before publishing.
 */
export const profile = {
  /** TODO: replace with your name. */
  name: 'Your Name',
  /** Short wordmark shown in the header. Defaults to the name. */
  wordmark: 'Your Name',
  positioning: ['Backend Engineer', 'Platform Architect', 'Product-minded Technologist'],
  headline: {
    primary: 'Engineering systems that scale.',
    secondary: 'Building products that matter.',
  },
  statement:
    'I work at the intersection of backend engineering, system architecture, and infrastructure — turning complex technical challenges into reliable production systems.',
  intro:
    'Backend-focused engineer working primarily in Go and PHP/Laravel, with a strong interest in how systems behave once they leave the editor: how they are deployed, secured, observed and operated.',
  /** Shown in the hero as "Current focus". */
  focus: [
    'Distributed systems & API architecture',
    'Platform and infrastructure engineering',
    'Security architecture & service identity',
    'Product engineering & technical decisions',
  ],
  /** TODO: replace with your contact address. */
  email: 'hello@example.com',
  /** Optional location line, e.g. "Ho Chi Minh City · UTC+7". Leave empty to hide. */
  location: '',
  availability: {
    /** Set to false to hide the status indicator. */
    enabled: true,
    label: 'Open to new conversations',
  },
} as const;
