import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '@/config/site';

export type Project = CollectionEntry<'projects'>;
export type SystemDesignStudy = CollectionEntry<'systemDesign'>;
export type DeepDive = CollectionEntry<'deepDives'>;
export type Insight = CollectionEntry<'insights'>;

/** Drafts are always visible in development; in production it is opt-in. */
export const showDrafts: boolean = import.meta.env.DEV || site.showDraftsInProduction;

const visible = ({ data }: { data: { draft: boolean } }) => showDrafts || !data.draft;

/** Published entries first (newest to oldest), then drafts alphabetically. */
function byPublication<T extends { data: { draft: boolean; pubDate?: Date; title: string } }>(a: T, b: T) {
  if (a.data.draft !== b.data.draft) return a.data.draft ? 1 : -1;
  const byDate = (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0);
  return byDate || a.data.title.localeCompare(b.data.title);
}

/** Every project, published or not: drafts are listed on the site without a link. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** True when the project's case study page exists in this build. */
export const projectHasPage = (project: Project): boolean => project.data.status === 'published' || showDrafts;

/** The technologies shown on a project card: at most five. */
export const projectFeaturedTech = (project: Project): string[] =>
  project.data.featuredTech ?? project.data.tech.slice(0, 5);

export async function getSystemDesignStudies(): Promise<SystemDesignStudy[]> {
  return (await getCollection('systemDesign', visible)).sort(byPublication);
}

export async function getDeepDives(): Promise<DeepDive[]> {
  return (await getCollection('deepDives', visible)).sort(byPublication);
}

export async function getInsights(): Promise<Insight[]> {
  return (await getCollection('insights', visible)).sort(byPublication);
}

export async function getPublishedInsights(): Promise<Insight[]> {
  return (await getInsights()).filter((insight) => !insight.data.draft);
}

export const projectPath = (project: Project) => `/projects/${project.id}/`;
export const systemDesignPath = (study: SystemDesignStudy) => `/architecture/system-design/${study.id}/`;
export const deepDivePath = (deepDive: DeepDive) => `/deep-dives/${deepDive.id}/`;
export const insightPath = (insight: Insight) => `/insights/${insight.id}/`;
export const insightCategoryPath = (slug: string) => `/insights/category/${slug}/`;

/** The published date of an entry, or undefined while it is a draft. */
export const publishedDate = (data: { draft: boolean; pubDate?: Date }) =>
  !data.draft && data.pubDate ? data.pubDate : undefined;

/**
 * Data entries flagged `placeholder: true` follow the same rule as drafts:
 * visible while drafts are shown, removed from the build otherwise.
 */
export function withoutHiddenPlaceholders<T extends { placeholder?: boolean }>(items: readonly T[]): T[] {
  return items.filter((item) => showDrafts || !item.placeholder);
}

/** Entries flagged `draft: true` in data files (diagrams) follow the same rule as content drafts. */
export function withoutHiddenDrafts<T extends { draft?: boolean }>(items: readonly T[]): T[] {
  return items.filter((item) => showDrafts || !item.draft);
}
