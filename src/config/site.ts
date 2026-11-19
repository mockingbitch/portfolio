/**
 * Site-wide configuration.
 * Everything here is build-time only — edit and redeploy.
 */
export const site = {
  /** Production origin, without a trailing slash. Used for canonical URLs, sitemap, RSS and Open Graph. */
  url: 'https://example.com',
  /** Appended to every page title. */
  titleSuffix: 'Engineering Portfolio',
  /** Default meta description, used when a page does not provide one. */
  description:
    'Backend engineering, system architecture and infrastructure — turning complex technical challenges into reliable production systems.',
  locale: 'en',
  /** Default Open Graph image, relative to /public. Regenerate with `npm run og`. */
  ogImage: '/og-default.png',
  /**
   * Draft notes and draft case studies are always visible in `astro dev`.
   * When true they are also built for production, clearly labelled as drafts,
   * marked `noindex`, and left out of the sitemap and RSS feed.
   * Set to false to hide draft notes from the production site entirely.
   */
  showDraftsInProduction: true,
} as const;
