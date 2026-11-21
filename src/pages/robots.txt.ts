import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { absoluteUrl } from '@/lib/url';

export const GET: APIRoute = ({ site: origin }) => {
  const sitemap = absoluteUrl('/sitemap.xml', origin ?? site.url);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
