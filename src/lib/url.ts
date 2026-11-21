/**
 * Base-path aware URLs.
 *
 * The site can be served from a sub-path (GitHub Pages project sites live at
 * /<repo>/). Astro prefixes its own assets, but not links written by hand, so
 * every internal href goes through `withBase`.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative path with the configured base. External URLs, mailto links and bare anchors pass through. */
export function withBase(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Absolute URL of a root-relative path, for canonical links, feeds and structured data. */
export function absoluteUrl(path: string, site: URL | string | undefined): string {
  return new URL(withBase(path), site).href;
}
