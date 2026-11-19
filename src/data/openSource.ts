/**
 * Open-source work: projects you maintain and contributions to other projects.
 *
 * TODO: the entries below are placeholders. Replace them with real work and
 * remove `placeholder: true`. Only list contributions that can be verified
 * from the linked repository or pull request.
 */
export interface OpenSourceEntry {
  project: string;
  role: 'Maintainer' | 'Contributor';
  description: string;
  /** Repository URL. Omit while the entry is a placeholder. */
  url?: string;
  language?: string;
  /** Individual contributions, each ideally linked to a pull request or issue. */
  contributions?: { title: string; url?: string }[];
  placeholder?: boolean;
}

export const openSource: OpenSourceEntry[] = [
  {
    project: 'your-project',
    role: 'Maintainer',
    description: 'A project you created or maintain. Say what it does and who it is for in one sentence.',
    language: 'Go',
    placeholder: true,
  },
  {
    project: 'upstream/project',
    role: 'Contributor',
    description: 'A project you have contributed to. Summarise the area you worked in.',
    contributions: [
      { title: 'Title of a merged pull request' },
      { title: 'Title of another contribution' },
    ],
    placeholder: true,
  },
];
