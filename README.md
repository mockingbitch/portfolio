# Engineering Portfolio

A static, content-driven site for a senior software engineer and solution architect: project case studies, an architecture lab with interactive diagrams, engineering deep dives, and a technical blog. Built with Astro, TypeScript (strict), Tailwind CSS and MDX. Dark by default, with a light theme.

## Requirements

- Node.js 22.23.4 or newer (see `.node-version`)
- npm

## Commands

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm install`     | Install dependencies                                 |
| `npm run dev`     | Start the dev server at `http://localhost:4321`      |
| `npm run check`   | Type-check `.astro`, `.ts` and `.tsx` files          |
| `npm run build`   | Build the static site into `dist/`                   |
| `npm run preview` | Serve the production build locally                   |
| `npm run og`      | Regenerate `public/og-default.png` from the headline |
| `npm run covers`  | Regenerate project card thumbnails from their specs  |

## Sitemap

| Route | Purpose | Source |
| --- | --- | --- |
| `/` | Positioning, expertise, featured projects, architecture, principles, experience, contact | `src/data/*` |
| `/about/` | Profile, philosophy, specialization, interests, career, collaboration | `philosophy.ts`, `experience.ts` |
| `/expertise/` | Eight engineering domains, each with linked evidence | `expertise.ts` + content `domains` |
| `/projects/`, `/projects/<slug>/` | Case studies, filterable by domain | `content/projects` |
| `/architecture/` | Architecture Lab: playground and system design studies | `diagrams.ts`, `content/system-design` |
| `/architecture/playground/` | Interactive diagrams | `diagrams.ts` |
| `/architecture/system-design/<slug>/` | A system design study | `content/system-design` |
| `/deep-dives/`, `/deep-dives/<slug>/` | Twelve-topic curriculum and its articles | `deepDiveTopics.ts`, `content/deep-dives` |
| `/leadership/` | Technical leadership areas | `leadership.ts` |
| `/insights/`, `/insights/category/<slug>/`, `/insights/<slug>/` | Engineering blog | `content/insights`, `insightCategories.ts` |
| `/open-source/` | Libraries, tools, contributions | `openSource.ts` |
| `/contact/` | Channels and contact form | `profile.ts`, `social.ts` |
| `/search/` | Client-side search over `/search.json` | `lib/search.ts` |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt` | Feeds and crawler files | `src/pages` |

`public/_redirects` maps the old `/notes/*` routes to `/insights/`.

The decision records section was removed from the site. Its source files are kept locally in `archive/decisions/`, which is ignored by git.

## Before you publish

The site ships with placeholders instead of invented personal details. Replace them first:

1. **`src/config/site.ts`** — `url` and `base` are set for GitHub Pages; change both if the site moves.
2. **`src/data/profile.ts`** — availability status. The resume is served from `public/CV-Tran-Quang-Phong.pdf`; note that everything in that file is public.
3. **`src/data/openSource.ts`** — real repositories and contributions; remove `placeholder: true`.
4. **`src/data/leadership.ts`** — add `evidence` links as artefacts become publishable.
5. **Everything in `src/content/` is published.** To take an entry down, set `status: draft` (projects) or `draft: true` (other collections).
6. **Review the other complete drafts** before publishing: the six system design studies, the deep dive, the six insights and decision records 0005–0020. They are finished text, but they should go out only once you agree with every claim.
7. Run `npm run og` after changing the name or headline.

## Where things live

```
src/
  config/site.ts          Site URL, default metadata, draft visibility
  assets/                 Portrait (avatar.jpeg) and its square crop; resized and converted at build time
  data/                   Profile, portrait, navigation, social, expertise domains, philosophy,
                          experience and education, client work, leadership, open source,
                          insight categories, deep-dive topics, diagrams
  content/
    projects/             Case studies
    system-design/        Architecture Lab studies
    deep-dives/           Engineering deep dives
    insights/             Blog articles
  content.config.ts       Content collection schemas
  lib/                    Content queries, search index, formatting helpers
  layouts/                BaseLayout (HTML shell, fonts, SEO) and ArticleLayout (long-form MDX pages)
  components/
    layout/               Header, Footer, Section, PageHeader, Seo
    navigation/           ThemeToggle
    sections/             Home and about page sections
    projects/ articles/   List rows and listings
    diagrams/             Mermaid runtime, interactive diagram explorer
    ui/                   Buttons, tags, prose wrapper, details, contact form
    mdx.ts                Components available in every MDX file
  pages/                  Routes
  styles/global.css       Design tokens, utilities and long-form typography
```

Components never hardcode personal data — they read it from `src/data` and `src/config`.

## Drafts and placeholders

Every content entry has `draft` (default `true`). Drafts are always visible in `npm run dev`. `showDraftsInProduction` in `src/config/site.ts` is currently `false`, so **production builds contain no drafts** — to publish an entry, set `draft: false` in its frontmatter. Setting the flag to `true` builds drafts for production too, labelled, marked `noindex` and left out of the sitemap and RSS feed. Data entries with `placeholder: true`, and diagrams with `draft: true` in `src/data/diagrams.ts`, follow the same rule; a section with nothing visible is not rendered.

System design studies and deep dives also take `stage`: `outline` (a skeleton of placeholders, the default) or `review` (complete text awaiting sign-off). It only changes the wording of the draft notice.

## Content types

### Projects

```yaml
---
title: MCP Platform
category: AI Agent Control Plane
summary: One-sentence description.
order: 1                       # position in the list
featured: true                 # shown on the home page
status: draft                  # published | draft
group: ai-agents               # exactly one id from src/data/projectGroups.ts
role: Lead engineer            # optional
period: 2025 – present         # optional
impact: ["12k req/s"]          # optional, 1–3 measured results — never estimates
teamSize: 11                   # optional
client: Product company        # optional
lifecycle: In production       # optional
tech: [Go, PostgreSQL, Redis]  # full list, shown on the case study page
featuredTech: [Go, PostgreSQL] # optional, max 5, shown on the card
coverDiagram: ./covers/mcp-platform.svg   # optional thumbnail, relative to the MDX file
coverDiagramAlt: Three processes around a gateway   # optional
domains: [backend, security]   # ids from src/data/expertise.ts
stage: review                  # outline (default) | review — wording of the draft notice
---
```

A `draft` project is still listed, with "Case study coming soon" and no link; its page is built only in development. Setting `status: published` builds the page and links the card. The body follows a seventeen-section case study structure, from Project Overview to Results and Business Impact. The API Design section stays high-level by policy: no endpoint paths, payloads, headers or error codes. `group` drives the filter on `/projects/`; `domains` drives the evidence lists on `/expertise/`.

### System design studies

```yaml
---
title: Distributed Job Scheduler
summary: One-sentence summary.
topics: [Scheduling, PostgreSQL]
domains: [architecture, database]
stage: review
pubDate: 2026-01-15   # required when draft is false
draft: false
---
```

Thirteen sections, from Problem Statement to Trade-offs.

### Deep dives

```yaml
---
title: Worker pools in Go
description: One-sentence summary.
topic: worker-pools   # a slug from src/data/deepDiveTopics.ts
domains: [backend]
pubDate: 2026-01-15
draft: false
---
```

A topic without an article shows as "Planned" on `/deep-dives/` in development only; production lists just the topics that have an article.

### Insights

```yaml
---
title: Article title
description: One-sentence summary.
category: backend-engineering   # a slug from src/data/insightCategories.ts
pubDate: 2026-01-15
draft: false
---
```

### MDX helpers

Available in every MDX file without an import:

- `<Placeholder>` marks text still to be written. Delete it as you fill sections in.
- `<InteractiveDiagram id="..." />` embeds an interactive diagram from `src/data/diagrams.ts`.
- `<Details summary="...">` wraps an expandable explanation.
- A fenced code block tagged `mermaid` renders as a themed diagram; `sequenceDiagram` works too. Mermaid loads only on pages that contain a diagram.
- Other fenced code blocks are highlighted at build time and get a copy button.

## Interactive diagrams

The playground and `<InteractiveDiagram>` both draw from `src/data/diagrams.ts`. A diagram is plain data:

- `nodes` sit on a grid (`col`, `row`) and carry a description shown when selected.
- `edges` connect two node ids; `dashed: true` marks a supporting relationship, and `route: 'hv'` makes the line leave sideways and enter the target from above or below.
- `zones` draw a labelled frame around a range of grid cells.
- `flows` are ordered lists of edge ids with a sentence per step.

Add an object to the `diagrams` array and it appears as a new tab in the playground.

## Design system

Tokens are CSS custom properties in `src/styles/global.css` (`--bg`, `--surface`, `--line`, `--line-strong`, `--fg`, `--muted`, `--subtle`, `--accent`, `--danger`), defined once for dark and once for light, and exposed to Tailwind as `bg-bg`, `text-muted`, `border-line`, `text-accent` and so on.

### Motion

All motion is progressive enhancement and is disabled under `prefers-reduced-motion`.

- `components/layout/Motion.astro` drives three attributes: `data-reveal` (a 280 ms fade up, triggered as the element enters the viewport), `data-reveal-stagger` (the same for each child, in sequence) and `data-scramble` (mono text that resolves from random glyphs). `data-spotlight` adds a pointer-following glow to a block.
- `components/sections/HeroField.astro` draws the hero's network backdrop on a canvas; it pauses off-screen and follows the theme.
- Interactive diagrams animate the highlighted path: dashes flow along active edges and a packet travels each step.
- The header's reading-progress line uses a CSS scroll timeline, with no JavaScript.

Custom utilities: `shell` (page container), `label` (mono uppercase marker), `link` (inline link), `rise` (entry animation), and the type scale `text-display`, `text-title`, `text-heading`, `text-lead`.

Fonts (Geist, Geist Mono) are configured in `astro.config.ts`, downloaded at build time and self-hosted.

## Search, filtering and the contact form

- **Search** fetches `/search.json`, generated at build time from every content collection, and ranks matches in the browser.
- **Project filtering** on `/projects/` uses five non-overlapping groups from `src/data/projectGroups.ts`, covering both case studies and client work. The selection is kept in the URL (`?group=fintech`); without JavaScript all projects are shown.
- **The contact form** composes a pre-filled email in the visitor's mail client. Nothing is sent from the page.

## Deploying to GitHub Pages

The site is configured for the project site at `https://mockingbitch.github.io/portfolio/`:
`url` and `base` are set in `src/config/site.ts`, and every internal link goes through
`withBase` in `src/lib/url.ts`.

1. In the repository on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. This is a one-time step.
2. Push to `master`. `.github/workflows/deploy.yml` type-checks, builds and deploys; it can also be run by hand from the Actions tab.

To serve from a domain root instead (a custom domain, or Cloudflare Pages), set `base: '/'` and the
new origin in `src/config/site.ts`.

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
- `public/_redirects` — redirects for renamed routes.
- `src/pages/404.astro` — built as `404.html`, which Pages serves for unknown routes.
