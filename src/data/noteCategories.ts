export const noteCategories = [
  {
    slug: 'backend-engineering',
    label: 'Backend Engineering',
    description: 'Service design, APIs, data modelling and performance.',
  },
  {
    slug: 'system-architecture',
    label: 'System Architecture',
    description: 'Boundaries, integration and the shape of larger systems.',
  },
  {
    slug: 'infrastructure-devops',
    label: 'Infrastructure & DevOps',
    description: 'Deployment, runtime platforms and operating production.',
  },
  {
    slug: 'security-engineering',
    label: 'Security Engineering',
    description: 'Identity, trust, authorization and secrets.',
  },
  {
    slug: 'engineering-decisions',
    label: 'Engineering Decisions',
    description: 'Trade-offs, decision records and lessons from choosing.',
  },
] as const;

export type NoteCategorySlug = (typeof noteCategories)[number]['slug'];

export const noteCategorySlugs = noteCategories.map((c) => c.slug) as [
  NoteCategorySlug,
  ...NoteCategorySlug[],
];

export function getNoteCategory(slug: NoteCategorySlug) {
  const category = noteCategories.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown note category: ${slug}`);
  return category;
}
