/**
 * Site-wide configuration.
 * Everything here is build-time only — edit and redeploy.
 */
export const site = {
  /** Production origin, without a trailing slash and without the base path. */
  url: 'https://mockingbitch.github.io',
  /**
   * Path the site is served from. '/portfolio' for the GitHub Pages project
   * site; use '/' when deploying to a domain root (custom domain, Cloudflare Pages).
   */
  base: '/portfolio',
  /** Appended to every page title. */
  titleSuffix: 'Software Engineer & Solution Architect',
  /** Default meta description, used when a page does not provide one. */
  description:
    'Senior software engineer and solution architect — designing and building scalable software systems, distributed architectures and infrastructure-aware platforms.',
  locale: 'en',
  /** Default Open Graph image, relative to /public. Regenerate with `npm run og`. */
  ogImage: '/og-default.png',
  /**
   * Drafts (every entry with `draft: true`) and data entries flagged
   * `placeholder: true` are always visible in `astro dev`.
   * When false, they are left out of the production build entirely.
   * When true, they are built for production too — labelled as drafts, marked
   * `noindex`, and excluded from the sitemap and RSS feed.
   */
  showDraftsInProduction: false,
} as const;
