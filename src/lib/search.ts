import {
  deepDivePath,
  getDeepDives,
  getInsights,
  getProjects,
  getSystemDesignStudies,
  insightPath,
  projectHasPage,
  projectPath,
  systemDesignPath,
} from '@/lib/content';
import { getDeepDiveTopic } from '@/data/deepDiveTopics';
import { getInsightCategory } from '@/data/insightCategories';

export interface SearchEntry {
  type: 'Project' | 'System design' | 'Deep dive' | 'Insight';
  title: string;
  description: string;
  url: string;
  tags: string[];
  /** Plain text of the body, truncated. */
  text: string;
  draft: boolean;
}

/** Reduce an MDX body to searchable plain text. Unwritten placeholder prompts are left out. */
function plainText(body: string | undefined): string {
  return (body ?? '')
    .replace(/<Placeholder[\s\S]*?<\/Placeholder>/g, ' ')
    .replace(/```mermaid[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*`>|_~[\](){}]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 6000);
}

/** Everything searchable on the site, built once at build time. */
export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const [projects, studies, deepDives, insights] = await Promise.all([
    getProjects(),
    getSystemDesignStudies(),
    getDeepDives(),
    getInsights(),
  ]);

  return [
    ...projects.filter(projectHasPage).map((entry) => ({
      type: 'Project' as const,
      title: entry.data.title,
      description: entry.data.summary,
      url: projectPath(entry),
      tags: [entry.data.category, ...entry.data.tech],
      text: plainText(entry.body),
      draft: entry.data.status === 'draft',
    })),
    ...studies.map((entry) => ({
      type: 'System design' as const,
      title: entry.data.title,
      description: entry.data.summary,
      url: systemDesignPath(entry),
      tags: entry.data.topics,
      text: plainText(entry.body),
      draft: entry.data.draft,
    })),
    ...deepDives.map((entry) => ({
      type: 'Deep dive' as const,
      title: entry.data.title,
      description: entry.data.description,
      url: deepDivePath(entry),
      tags: [getDeepDiveTopic(entry.data.topic).title],
      text: plainText(entry.body),
      draft: entry.data.draft,
    })),
    ...insights.map((entry) => ({
      type: 'Insight' as const,
      title: entry.data.title,
      description: entry.data.description,
      url: insightPath(entry),
      tags: [getInsightCategory(entry.data.category).label],
      text: plainText(entry.body),
      draft: entry.data.draft,
    })),
  ];
}
