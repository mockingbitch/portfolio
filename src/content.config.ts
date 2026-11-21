import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { deepDiveTopicSlugs } from './data/deepDiveTopics';
import { domainIds } from './data/expertise';
import { insightCategorySlugs } from './data/insightCategories';
import { projectGroupIds } from './data/projectGroups';

/** Expertise domains an entry is evidence for (ids from src/data/expertise.ts). */
const domains = z.array(z.enum(domainIds)).default([]);

/**
 * `outline` drafts are skeletons of placeholders; `review` drafts are complete
 * text waiting for the author's sign-off. Only affects the draft notice.
 */
const stage = z.enum(['outline', 'review']).default('outline');

const requiresPubDate = <T extends { draft: boolean; pubDate?: Date }>(entry: T) =>
  entry.draft || entry.pubDate !== undefined;
const pubDateIssue = { message: 'Published entries require a pubDate.', path: ['pubDate'] };

/** Project case studies. */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Kind of system, e.g. "AI Agent Control Plane". */
      category: z.string(),
      summary: z.string(),
      /** Position in the project list (1-based). */
      order: z.number().int().positive(),
      /** Featured projects appear on the home page. */
      featured: z.boolean().default(false),
      /**
       * `published`: the case study page is built and the card links to it.
       * `draft`: the card is listed with "Case study coming soon" and no link;
       * the page is only built in development (or when drafts are shown).
       */
      status: z.enum(['published', 'draft']).default('draft'),
      /** Filter group on /projects/ — exactly one per project (ids in src/data/projectGroups.ts). */
      group: z.enum(projectGroupIds),
      /** e.g. "Lead engineer / Solution architect". */
      role: z.string().optional(),
      /** e.g. "2024 – present". */
      period: z.string().optional(),
      /** One to three short, verifiable metrics, e.g. "12k req/s". Never estimates. */
      impact: z.array(z.string()).min(1).max(3).optional(),
      teamSize: z.number().int().positive().optional(),
      /** e.g. "Product company" or a client name. */
      client: z.string().optional(),
      /** Where the system is in its life, e.g. "In production", "In development". */
      lifecycle: z.string().optional(),
      /** Full technology list, shown on the case study page. */
      tech: z.array(z.string()).min(1),
      /** Up to five technologies shown on the card. Defaults to the first five of `tech`. */
      featuredTech: z.array(z.string()).min(1).max(5).optional(),
      /** Architecture thumbnail for the card, relative to the MDX file. */
      coverDiagram: image().optional(),
      /** Alt text for the thumbnail. Defaults to "Architecture diagram of <title>". */
      coverDiagramAlt: z.string().optional(),
      domains,
      stage,
      /** Optional external links (repository, live site, write-up). */
      links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
    }),
});

/** Architecture Lab: system design studies — worked design problems, not shipped projects. */
const systemDesign = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/system-design' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      topics: z.array(z.string()).min(1),
      domains,
      stage,
      pubDate: z.coerce.date().optional(),
      draft: z.boolean().default(true),
    })
    .refine(requiresPubDate, pubDateIssue),
});

/** Engineering deep dives, one or more per topic in src/data/deepDiveTopics.ts. */
const deepDives = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/deep-dives' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      topic: z.enum(deepDiveTopicSlugs),
      domains,
      stage,
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(true),
    })
    .refine(requiresPubDate, pubDateIssue),
});

/** Insights: the engineering blog. */
const insights = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/insights' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.enum(insightCategorySlugs),
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      /** Drafts are labelled, marked noindex, and never appear in the RSS feed or sitemap. */
      draft: z.boolean().default(true),
    })
    .refine(requiresPubDate, pubDateIssue),
});

export const collections = { projects, systemDesign, deepDives, insights };
