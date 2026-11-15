import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One .mdx file per project in src/content/work/.
// The build fails if a project is missing results or lessons, so every
// page keeps the case-study shape. The exception is `brief: true`, for
// employer work that can only be mentioned in outline: no headline,
// metrics, lessons, stack or diagram, and it can't be featured.
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z
    .object({
      brief: z.boolean().default(false),

      title: z.string(),
      summary: z.string().max(140),
      kind: z.string(), // e.g. "RAG system", "Computer vision"
      context: z.string(), // e.g. "Solo project", "At LIXI", "Team of 4"
      period: z.string(), // e.g. "Apr – Jun 2026"
      order: z.number(), // lower numbers appear first
      featured: z.boolean().default(false),
      status: z.enum(['shipped', 'in progress', 'prototype']).default('shipped'),
      role: z.string(),
      stack: z.array(z.string()).default([]),

      // Alt text for the cover image in src/assets/projects/<slug>.(jpg|png|webp).
      // Falls back to "<title> project image".
      coverAlt: z.string().optional(),

      // The single number shown on the home page.
      headline: z.object({ value: z.string(), label: z.string() }).optional(),

      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            conditions: z.string(),
          }),
        )
        .default([]),

      lessons: z.array(z.string()).default([]),

      links: z
        .array(z.object({ label: z.string(), href: z.string().url() }))
        .default([]),
    })
    .superRefine((p, ctx) => {
      const need = (ok: boolean, message: string) => {
        if (!ok) ctx.addIssue({ code: 'custom', message });
      };
      if (p.brief) {
        need(!p.featured, 'A brief project cannot be featured on the home page.');
        need(
          !p.headline && p.metrics.length === 0 && p.lessons.length === 0 && p.stack.length === 0,
          'A brief project must not list a headline, metrics, lessons or stack.',
        );
      } else {
        need(!!p.headline, 'Add a headline (the number shown on the home page).');
        need(p.metrics.length > 0, 'Add at least one metric.');
        need(p.lessons.length > 0, 'Add at least one lesson.');
        need(p.stack.length > 0, 'Add the stack.');
      }
    }),
});

export const collections = { work };
