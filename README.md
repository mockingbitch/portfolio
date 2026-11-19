# Engineering Portfolio

A static, content-driven portfolio for a backend and platform engineer. Built with Astro, TypeScript (strict), Tailwind CSS and MDX. Dark by default, with a light theme.

## Requirements

- Node.js 22.23.4 or newer (see `.node-version`)
- npm

## Commands

| Command           | What it does                                             |
| ----------------- | -------------------------------------------------------- |
| `npm install`     | Install dependencies                                     |
| `npm run dev`     | Start the dev server at `http://localhost:4321`          |
| `npm run check`   | Type-check `.astro`, `.ts` and `.tsx` files              |
| `npm run build`   | Build the static site into `dist/`                       |
| `npm run preview` | Serve the production build locally                       |
| `npm run og`      | Regenerate `public/og-default.png` from the headline     |

## Before you publish

The site ships with placeholders instead of invented personal details. Replace them first:

1. **`src/config/site.ts`** — set `url` to your production origin. Canonical URLs, the sitemap, `robots.txt`, RSS and Open Graph tags all derive from it.
2. **`src/data/profile.ts`** — name, wordmark, email, optional location and availability status.
3. **`src/data/social.ts`** — GitHub and LinkedIn URLs and handles.
4. **`src/data/technologies.ts`** — the proficiency tier of each technology. The defaults are inferred, not verified; move each item to the tier that matches your experience.
5. **`src/data/timeline.ts`** and **`src/data/openSource.ts`** — both ship with entries marked `placeholder: true`. Replace them with real milestones and contributions.
6. **`src/data/diagrams.ts`** — the two interactive diagrams are generic reference models. Adapt them or add your own.
7. **`src/content/projects/*.mdx`** — fill in `role`, `status`, `period`, replace every `<Placeholder>` block and the illustrative diagrams, then set `draft: false`.
8. Run `npm run og` to regenerate the social preview image with your name.

## Where things live

```
src/
  config/site.ts          Site URL, default metadata, draft visibility
  data/                   Profile, navigation, social links, expertise, philosophy, technologies,
                          note categories, interactive diagrams, timeline, open-source work
  content/
    projects/             One MDX file per case study
    notes/                One MDX file per technical note
    system-design/        One MDX file per system design study
    decisions/            One MDX file per decision record (ADR)
  content.config.ts       Content collection schemas
  lib/                    Content queries and formatting helpers
  layouts/                BaseLayout (HTML shell, fonts, SEO) and ArticleLayout (long-form MDX pages)
  components/
    layout/               Header, Footer, Section, PageHeader, Seo
    navigation/           ThemeToggle
    sections/             Home and about page sections
    projects/ articles/   List rows and listings
    diagrams/             Mermaid runtime, interactive diagram explorer
    ui/                   Buttons, tags, prose wrapper, contact form
  pages/                  Routes, plus rss.xml, sitemap.xml and robots.txt
  styles/global.css       Design tokens, utilities and long-form typography
```

Components never hardcode personal data — they read it from `src/data` and `src/config`.

## Editing content

### Projects

Each file in `src/content/projects/` becomes a page at `/projects/<file-name>/`.

```yaml
---
title: MCP Platform
summary: One-sentence description.
order: 1                 # position in the list
role: Lead engineer      # optional — shows "To be added" while missing
status: In production    # optional
period: 2025 — present   # optional
focus: [Go, PostgreSQL]
links:                   # optional
  - { label: Repository, href: https://github.com/... }
draft: true              # false once the case study is real
---
```

While `draft` is `true` the page carries a visible draft notice, is marked `noindex`, and is left out of the sitemap.

### Notes

Each file in `src/content/notes/` becomes a page at `/notes/<file-name>/`. The five files shipped are **templates**, not published articles.

```yaml
---
title: Note title
description: One-sentence summary.
category: backend-engineering   # a slug from src/data/noteCategories.ts
pubDate: 2026-01-15             # required when draft is false
draft: false
---
```

Drafts (notes, studies, decision records) are always visible in `npm run dev`. In production they are shown, labelled as drafts and `noindex`ed, only while `showDraftsInProduction` in `src/config/site.ts` is `true`. Drafts never appear in the RSS feed or sitemap.

### System design studies

Files in `src/content/system-design/` become pages at `/architecture/system-design/<file-name>/` and are listed on `/architecture/`. The three shipped files are templates.

```yaml
---
title: Study title
summary: One-sentence summary.
topics: [mTLS, PKI]
pubDate: 2026-01-15   # required when draft is false
draft: false
---
```

### Decision records (ADRs)

Files in `src/content/decisions/` become pages at `/architecture/decisions/<file-name>/`. Copy `0000-template.mdx` to start one.

```yaml
---
number: 5                 # rendered as ADR-0005
title: What was decided
summary: The decision in one sentence.
status: accepted          # proposed | accepted | superseded | deprecated
date: 2026-01-15
scope: Project or system the decision applies to
tags: [Tag]
draft: false
---
```

ADR-0001 to ADR-0003 are real records describing how this site is built. Keep, edit or delete them.

### Interactive diagrams

The playground at `/architecture/playground/` and the `<InteractiveDiagram id="..." />` MDX component both draw from `src/data/diagrams.ts`. A diagram is plain data:

- `nodes` sit on a grid (`col`, `row`) and carry a description shown when selected.
- `edges` connect two node ids; `dashed: true` marks a supporting relationship, and `route: 'hv'` makes the line leave sideways and enter the target from above or below.
- `zones` draw a labelled frame around a range of grid cells.
- `flows` are ordered lists of edge ids with a sentence per step.

Add an object to the `diagrams` array and it appears as a new tab in the playground.

### Timeline and open source

`src/data/timeline.ts` and `src/data/openSource.ts` feed two sections on the About page. Entries with `placeholder: true` are labelled on the page and follow the same visibility rule as drafts; a section with no visible entries is not rendered.

### MDX helpers

- `<Placeholder>` marks text still to be written. Delete it as you fill sections in.
- `<InteractiveDiagram id="..." />` embeds an interactive diagram from `src/data/diagrams.ts`.
- A fenced code block tagged `mermaid` renders as a diagram that follows the site theme. Mermaid is loaded only on pages that contain a diagram.
- Other fenced code blocks are highlighted at build time.

## Design system

Tokens are CSS custom properties in `src/styles/global.css` (`--bg`, `--surface`, `--line`, `--fg`, `--muted`, `--subtle`, `--accent`), defined once for dark and once for light, and exposed to Tailwind as `bg-bg`, `text-muted`, `border-line`, `text-accent` and so on. Change a token and the whole site follows.

Custom utilities: `shell` (page container), `label` (mono uppercase marker), `link` (inline link), `rise` (entry animation), and the type scale `text-display`, `text-title`, `text-heading`, `text-lead`.

Fonts (Geist, Geist Mono) are configured in `astro.config.ts`, downloaded at build time and self-hosted.

## Contact form

The form on `/contact/` composes a pre-filled email in the visitor's mail client. Nothing is sent from the page and no third-party service is involved. To collect submissions server-side later, replace the submit handler in `src/components/ui/ContactForm.tsx`.

## Deploying to Cloudflare Pages

### Git integration (recommended)

1. Push this repository to GitHub or GitLab.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Use these build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. The Node version is read from `.node-version`.
5. Add your custom domain under **Custom domains**, then set the same origin in `src/config/site.ts`.

### Direct upload

```sh
npm run build
npx wrangler pages deploy
```

`wrangler.toml` already points at `dist`; change `name` to your Pages project name.

### Included configuration

- `wrangler.toml` — Pages project name and output directory.
- `public/_headers` — security headers and long-lived caching for hashed assets.
- `src/pages/404.astro` — built as `404.html`, which Pages serves for unknown routes.
