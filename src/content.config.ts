import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { noteCategorySlugs } from './data/noteCategories';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Position in the Selected Works list (1-based). */
    order: z.number().int().positive(),
    /** Your role on the project. Rendered as "To be added" while empty. */
    role: z.string().optional(),
    /** e.g. "In production", "In development", "Internal", "Archived". */
    status: z.string().optional(),
    /** e.g. "2024 — present". */
    period: z.string().optional(),
    /** Technical focus / technologies used. */
    focus: z.array(z.string()).min(1),
    /** Optional external links (repository, live site, write-up). */
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
    /** Draft case studies are labelled as such and excluded from search indexing. */
    draft: z.boolean().default(true),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.enum(noteCategorySlugs),
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      /** Drafts are labelled, marked noindex, and never appear in the RSS feed or sitemap. */
      draft: z.boolean().default(true),
    })
    .refine((note) => note.draft || note.pubDate !== undefined, {
      message: 'Published notes require a pubDate.',
      path: ['pubDate'],
    }),
});

const decisionStatuses = ['proposed', 'accepted', 'superseded', 'deprecated'] as const;

/** Architecture decision records (ADRs). */
const decisions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/decisions' }),
  schema: z.object({
    /** Sequential record number, rendered as ADR-0001. */
    number: z.number().int().positive(),
    title: z.string(),
    /** One-sentence statement of what was decided. */
    summary: z.string(),
    status: z.enum(decisionStatuses),
    date: z.coerce.date(),
    /** What the decision applies to, e.g. "This site" or a project name. */
    scope: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
  }),
});

/** System design case studies: worked design problems, as opposed to shipped projects. */
const systemDesign = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/system-design' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      topics: z.array(z.string()).min(1),
      pubDate: z.coerce.date().optional(),
      draft: z.boolean().default(true),
    })
    .refine((study) => study.draft || study.pubDate !== undefined, {
      message: 'Published studies require a pubDate.',
      path: ['pubDate'],
    }),
});

export const collections = { projects, notes, decisions, systemDesign };
