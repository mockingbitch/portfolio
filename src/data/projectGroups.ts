/**
 * Project groups for the filter on /projects/. Each project and each client
 * engagement belongs to exactly one group, so the filter counts add up.
 * (Expertise domains in expertise.ts are a different axis: a project can
 * evidence several of those.)
 */
export const projectGroups = [
  { id: 'ai-agents', label: 'AI & Agents' },
  { id: 'fintech', label: 'Fintech & Payments' },
  { id: 'commerce', label: 'Commerce & Logistics' },
  { id: 'platforms', label: 'Product Platforms' },
  { id: 'infrastructure', label: 'Infrastructure' },
] as const;

export type ProjectGroupId = (typeof projectGroups)[number]['id'];

export const projectGroupIds = projectGroups.map((group) => group.id) as [ProjectGroupId, ...ProjectGroupId[]];
