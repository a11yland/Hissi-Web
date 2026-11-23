import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/** Legal pages (privacy policy, legal notice) as Markdown, one file per language. */
const legal = defineCollection({
  loader: glob({ base: './src/content/legal', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Short line under the heading, e.g. the app name. */
    tagline: z.string().optional(),
    locale: z.enum(['de', 'en']),
    pageKey: z.enum(['privacy', 'legal']),
    updated: z.coerce.date(),
  }),
});

/** Changelog of the apps: one entry per release and language; the file name pairs the two languages. */
const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** One sentence for the teaser on the landing page. */
    summary: z.string(),
    locale: z.enum(['de', 'en']),
    date: z.coerce.date(),
    /** App versions this entry describes. */
    releases: z.array(z.object({ platform: z.enum(['ios', 'android']), version: z.coerce.string() })).min(1),
  }),
});

export const collections = { legal, news };
