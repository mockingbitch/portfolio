import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { insightCategories } from '@/data/insightCategories';
import {
  deepDivePath,
  getDeepDives,
  getProjects,
  getPublishedInsights,
  getSystemDesignStudies,
  insightCategoryPath,
  insightPath,
  projectPath,
  systemDesignPath,
} from '@/lib/content';

const staticPaths = [
  '/',
  '/about/',
  '/expertise/',
  '/projects/',
  '/architecture/',
  '/architecture/playground/',
  '/deep-dives/',
  '/leadership/',
  '/insights/',
  '/open-source/',
  '/contact/',
];

/**
 * Hand-rolled sitemap so indexability stays in step with the content model:
 * drafts of every kind and empty categories are left out.
 */
export const GET: APIRoute = async ({ site: origin }) => {
  const [projects, studies, deepDives, insights] = await Promise.all([
    getProjects(),
    getSystemDesignStudies(),
    getDeepDives(),
    getPublishedInsights(),
  ]);
  const published = <T extends { data: { draft: boolean } }>(entries: T[]) => entries.filter((entry) => !entry.data.draft);

  const entries: { path: string; lastmod?: Date }[] = [
    ...staticPaths.map((path) => ({ path })),
    ...projects.filter((entry) => entry.data.status === 'published').map((entry) => ({ path: projectPath(entry) })),
    ...published(studies).map((entry) => ({ path: systemDesignPath(entry), lastmod: entry.data.pubDate })),
    ...published(deepDives).map((entry) => ({
      path: deepDivePath(entry),
      lastmod: entry.data.updatedDate ?? entry.data.pubDate,
    })),
    ...insightCategories
      .filter((category) => insights.some((insight) => insight.data.category === category.slug))
      .map((category) => ({ path: insightCategoryPath(category.slug) })),
    ...insights.map((entry) => ({
      path: insightPath(entry),
      lastmod: entry.data.updatedDate ?? entry.data.pubDate,
    })),
  ];

  const urls = entries
    .map(({ path, lastmod }) => {
      const loc = new URL(path, origin ?? site.url).href;
      const modified = lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : '';
      return `  <url><loc>${loc}</loc>${modified}</url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
