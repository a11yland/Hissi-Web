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

export const collections = { legal };
