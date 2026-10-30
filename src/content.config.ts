// Typed content model (docs/BUILD_PROMPT.md, "Content model"). Each item is
// one YAML file holding both languages side by side, so parity is easy to see.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ tr: z.string().min(1), en: z.string().min(1) });
const verseRef = z.string().regex(/^\d{1,3}:\d{1,3}(-\d{1,3})?$/);
// A source label is either one string (a citation, same in both languages) or
// a {tr, en} pair when it describes the source in words.
const source = z.object({ label: z.union([z.string(), text]), url: z.url().optional() });

const signs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/signs' }),
  schema: z.object({
    id: z.string().regex(/^S\d+$/),
    slug: z.string(),
    order: z.number(),
    theme: z.string(),
    verses: z.array(verseRef).min(1),
    pause: z.object({ ref: verseRef }).optional(),
    title: text,
    summary: text,
    tafsir: text,
    howItWorks: text,
    awe: text.optional(),
    reflection: text,
    reflectionVerses: z.array(verseRef).optional(),
    honestNotes: z.array(text),
    visualizations: z.array(
      text.extend({ id: z.string(), steps: z.object({ tr: z.array(z.string()), en: z.array(z.string()) }).optional() }),
    ),
    sources: z.array(source).min(1),
  }),
});

export const collections = { signs };
