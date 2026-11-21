import type { APIRoute } from 'astro';
import { buildSearchIndex } from '@/lib/search';

/** Static search index, fetched by /search/ on first use. */
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await buildSearchIndex()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
