import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { noteCategories } from '@/data/noteCategories';
import {
  decisionPath,
  getDecisions,
  getProjects,
  getPublishedNotes,
  getSystemDesignStudies,
  noteCategoryPath,
  notePath,
  projectPath,
  systemDesignPath,
} from '@/lib/content';

/**
 * Hand-rolled sitemap so indexability stays in step with the content model:
 * draft case studies, draft notes and empty categories are left out.
 */
export const GET: APIRoute = async ({ site: origin }) => {
  const [projects, notes, studies, decisions] = await Promise.all([
    getProjects(),
    getPublishedNotes(),
    getSystemDesignStudies(),
    getDecisions(),
  ]);

  const entries: { path: string; lastmod?: Date }[] = [
    { path: '/' },
    { path: '/about/' },
    { path: '/projects/' },
    { path: '/architecture/' },
    { path: '/architecture/playground/' },
    { path: '/notes/' },
    { path: '/contact/' },
    ...projects.filter((project) => !project.data.draft).map((project) => ({ path: projectPath(project) })),
    ...studies
      .filter((study) => !study.data.draft)
      .map((study) => ({ path: systemDesignPath(study), lastmod: study.data.pubDate })),
    ...decisions
      .filter((decision) => !decision.data.draft)
      .map((decision) => ({ path: decisionPath(decision), lastmod: decision.data.date })),
    ...noteCategories
      .filter((category) => notes.some((note) => note.data.category === category.slug))
      .map((category) => ({ path: noteCategoryPath(category.slug) })),
    ...notes.map((note) => ({
      path: notePath(note),
      lastmod: note.data.updatedDate ?? note.data.pubDate,
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
