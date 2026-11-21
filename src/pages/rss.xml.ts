import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { absoluteUrl } from '@/lib/url';
import { profile } from '@/data/profile';
import { getInsightCategory } from '@/data/insightCategories';
import { getPublishedInsights, insightPath } from '@/lib/content';

/** Only published insights are syndicated; drafts never reach the feed. */
export const GET: APIRoute = async (context) => {
  const insights = await getPublishedInsights();

  return rss({
    title: `${profile.name} — Insights`,
    description: site.description,
    // The channel link is the site home, including the base path.
    site: absoluteUrl('/', context.site ?? site.url),
    trailingSlash: true,
    items: insights.flatMap((insight) =>
      insight.data.pubDate
        ? [
            {
              title: insight.data.title,
              description: insight.data.description,
              pubDate: insight.data.pubDate,
              link: insightPath(insight),
              categories: [getInsightCategory(insight.data.category).label],
            },
          ]
        : [],
    ),
  });
};
