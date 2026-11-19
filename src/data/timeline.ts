/**
 * Technical timeline — the milestones that changed how you work, newest first.
 *
 * TODO: the entries below are placeholders, not history. Replace them with
 * real milestones and remove `placeholder: true`. Placeholder entries are
 * labelled on the page, and disappear from production builds when
 * `showDraftsInProduction` (src/config/site.ts) is false.
 */
export interface TimelineEntry {
  /** A year or range, e.g. "2024" or "2022 — 2023". */
  period: string;
  title: string;
  description: string;
  tags?: string[];
  placeholder?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    period: 'Year',
    title: 'Most recent milestone',
    description:
      'Describe what changed in your technical practice — a new problem domain, a platform you became responsible for, or a shift in how you design systems.',
    tags: ['Technology', 'Domain'],
    placeholder: true,
  },
  {
    period: 'Year',
    title: 'An earlier turning point',
    description:
      'Describe the system or responsibility that pushed you beyond application code — into infrastructure, security or architecture.',
    tags: ['Technology'],
    placeholder: true,
  },
  {
    period: 'Year',
    title: 'Where it started',
    description: 'Describe the first stack you worked in and what it taught you that still holds.',
    placeholder: true,
  },
];
