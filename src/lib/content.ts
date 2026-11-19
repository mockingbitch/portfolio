import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '@/config/site';

export type Project = CollectionEntry<'projects'>;
export type Note = CollectionEntry<'notes'>;
export type Decision = CollectionEntry<'decisions'>;
export type SystemDesignStudy = CollectionEntry<'systemDesign'>;

/** Drafts are always visible in development; in production it is opt-in. */
export const showDrafts: boolean = import.meta.env.DEV || site.showDraftsInProduction;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Published notes first (newest to oldest), then drafts alphabetically. */
export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => showDrafts || !data.draft);
  return notes.sort((a, b) => {
    if (a.data.draft !== b.data.draft) return a.data.draft ? 1 : -1;
    const byDate = (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0);
    return byDate || a.data.title.localeCompare(b.data.title);
  });
}

export async function getPublishedNotes(): Promise<Note[]> {
  return (await getNotes()).filter((note) => !note.data.draft);
}

export const projectPath = (project: Project) => `/projects/${project.id}/`;
export const notePath = (note: Note) => `/notes/${note.id}/`;
export const noteCategoryPath = (slug: string) => `/notes/category/${slug}/`;

/** Published records first, newest number first; templates and drafts last. */
export async function getDecisions(): Promise<Decision[]> {
  const decisions = await getCollection('decisions', ({ data }) => showDrafts || !data.draft);
  return decisions.sort((a, b) => {
    if (a.data.draft !== b.data.draft) return a.data.draft ? 1 : -1;
    return b.data.number - a.data.number;
  });
}

/** Published studies first (newest to oldest), then drafts alphabetically. */
export async function getSystemDesignStudies(): Promise<SystemDesignStudy[]> {
  const studies = await getCollection('systemDesign', ({ data }) => showDrafts || !data.draft);
  return studies.sort((a, b) => {
    if (a.data.draft !== b.data.draft) return a.data.draft ? 1 : -1;
    const byDate = (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0);
    return byDate || a.data.title.localeCompare(b.data.title);
  });
}

export const decisionPath = (decision: Decision) => `/architecture/decisions/${decision.id}/`;
export const systemDesignPath = (study: SystemDesignStudy) => `/architecture/system-design/${study.id}/`;

/** ADR-0001 */
export const decisionLabel = (decision: Decision) => `ADR-${String(decision.data.number).padStart(4, '0')}`;

/**
 * Data entries flagged `placeholder: true` follow the same rule as drafts:
 * visible while drafts are shown, removed from the build otherwise.
 */
export function withoutHiddenPlaceholders<T extends { placeholder?: boolean }>(items: readonly T[]): T[] {
  return items.filter((item) => showDrafts || !item.placeholder);
}
