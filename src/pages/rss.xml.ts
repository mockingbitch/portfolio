import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { profile } from '@/data/profile';
import { getNoteCategory } from '@/data/noteCategories';
import { getPublishedNotes, notePath } from '@/lib/content';

/** Only published notes are syndicated; drafts never reach the feed. */
export const GET: APIRoute = async (context) => {
  const notes = await getPublishedNotes();

  return rss({
    title: `${profile.name} — Technical Notes`,
    description: site.description,
    site: context.site ?? site.url,
    trailingSlash: true,
    items: notes.flatMap((note) =>
      note.data.pubDate
        ? [
            {
              title: note.data.title,
              description: note.data.description,
              pubDate: note.data.pubDate,
              link: notePath(note),
              categories: [getNoteCategory(note.data.category).label],
            },
          ]
        : [],
    ),
  });
};
