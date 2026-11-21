/**
 * Open-source work: public repositories worth a reader's time. Feeds /open-source/.
 * Source: the public GitHub profile linked in src/data/social.ts.
 *
 * Only list work that can be verified from the linked repository. An entry
 * with `placeholder: true` is labelled on the page and hidden with drafts.
 */
export interface OpenSourceEntry {
  project: string;
  kind: 'Library' | 'Project' | 'Tool' | 'Template' | 'Contribution';
  description: string;
  /** Repository URL. */
  url?: string;
  language?: string;
  /** Individual contributions, each ideally linked to a pull request or issue. */
  contributions?: { title: string; url?: string }[];
  placeholder?: boolean;
}

const repo = (name: string) => `https://github.com/mockingbitch/${name}`;

export const openSource: OpenSourceEntry[] = [
  {
    project: 'laravel-logger',
    kind: 'Library',
    description:
      'A logging package for Laravel: levelled messages, SQL query logging, custom channels and formatted backtraces, integrated with the framework’s own logger.',
    url: repo('laravel-logger'),
    language: 'PHP',
  },
  {
    project: 'reefcare',
    kind: 'Project',
    description:
      'Reef tank management platform: a Go API with background workers, PostgreSQL and a SvelteKit web app, built contract-first with OpenAPI.',
    url: repo('reefcare'),
    language: 'Go',
  },
  {
    project: 'ascension-online',
    kind: 'Project',
    description: 'A browser-based idle MMORPG: Go API, SvelteKit and TypeScript front end, PostgreSQL and Redis.',
    url: repo('ascension-online'),
    language: 'Go',
  },
  {
    project: 'jakshell',
    kind: 'Tool',
    description: 'A command-line shell written in Rust.',
    url: repo('jakshell'),
    language: 'Rust',
  },
  {
    project: 'golang-jwt-template',
    kind: 'Template',
    description: 'Starter for a Go service with JWT authentication.',
    url: repo('golang-jwt-template'),
    language: 'Go',
  },
  {
    project: 'NestJS-micro-template',
    kind: 'Template',
    description: 'Starter for NestJS microservices.',
    url: repo('NestJS-micro-template'),
    language: 'TypeScript',
  },
  {
    project: 'laravel-octane-docker',
    kind: 'Template',
    description: 'Laravel Octane running in Docker.',
    url: repo('laravel-octane-docker'),
    language: 'PHP',
  },
  {
    project: 'docker-loadbalancing-strategy',
    kind: 'Template',
    description: 'Load-balancing strategies demonstrated with Docker.',
    url: repo('docker-loadbalancing-strategy'),
    language: 'Shell',
  },
];
