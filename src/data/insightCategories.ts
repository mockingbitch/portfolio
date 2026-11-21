export const insightCategories = [
  { slug: 'system-design', label: 'System Design', description: 'Requirements, estimates and the shape of larger systems.' },
  { slug: 'backend-engineering', label: 'Backend Engineering', description: 'Service design, APIs, data modelling and performance.' },
  { slug: 'architecture-patterns', label: 'Architecture Patterns', description: 'Boundaries, integration styles and when each one fits.' },
  { slug: 'infrastructure-devops', label: 'Infrastructure & DevOps', description: 'Deployment, runtime platforms and operating production.' },
  { slug: 'security-engineering', label: 'Security Engineering', description: 'Identity, trust, authorization and secrets.' },
  { slug: 'ai-agent-engineering', label: 'AI & Agent Engineering', description: 'Language models, tools and orchestration in real systems.' },
] as const;

export type InsightCategorySlug = (typeof insightCategories)[number]['slug'];

export const insightCategorySlugs = insightCategories.map((c) => c.slug) as [
  InsightCategorySlug,
  ...InsightCategorySlug[],
];

export function getInsightCategory(slug: InsightCategorySlug) {
  const category = insightCategories.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown insight category: ${slug}`);
  return category;
}
