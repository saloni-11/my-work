import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One .mdx file per project in src/content/work/.
// The build fails if a project is missing results or lessons, so every
// page keeps the case-study shape.
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(140),
    kind: z.string(), // e.g. "RAG system", "Computer vision"
    context: z.string(), // e.g. "Solo project", "At LIXI", "Team of 4"
    period: z.string(), // e.g. "Apr – Jun 2026"
    order: z.number(), // lower numbers appear first
    featured: z.boolean().default(false),
    status: z.enum(['shipped', 'in progress', 'prototype']).default('shipped'),
    role: z.string(),
    stack: z.array(z.string()).min(1),

    // The single number shown on the home page.
    headline: z.object({ value: z.string(), label: z.string() }),

    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          conditions: z.string(),
        }),
      )
      .min(1),

    lessons: z.array(z.string()).min(1),

    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
  }),
});

export const collections = { work };
