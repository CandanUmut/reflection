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
const slug = z.object({ tr: z.string().regex(/^[a-z0-9-]+$/), en: z.string().regex(/^[a-z0-9-]+$/) });
const visualization = text.extend({
  id: z.string(),
  /** Text shown with a built visualization (and its text equivalent). */
  caption: text.optional(),
  steps: z.object({ tr: z.array(z.string()), en: z.array(z.string()) }).optional(),
});

const signs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/signs' }),
  schema: z.object({
    id: z.string().regex(/^S\d+$/),
    slugs: slug,
    order: z.number(),
    theme: z.string(),
    verses: z.array(verseRef).min(1),
    /** Related verses named in the research ("see also"), listed by reference only. */
    seeAlso: z.array(verseRef).optional(),
    pause: z.object({ ref: verseRef }).optional(),
    title: text,
    summary: text,
    /** Word notes from the research's verse section (e.g. the root of a key word). */
    verseNotes: text.optional(),
    /** Optional: a few early research items (e.g. S6) give no classical tafsir; logged in CONTENT_GAPS. */
    tafsir: text.optional(),
    howItWorks: text,
    awe: text.optional(),
    /** Optional: S3, S7 and S9 have no reflection in the research; logged in CONTENT_GAPS. */
    reflection: text.optional(),
    reflectionVerses: z.array(verseRef).optional(),
    honestNotes: z.array(text),
    visualizations: z.array(visualization),
    sources: z.array(source).min(1),
  }),
});

const questions = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/questions' }),
  schema: z.object({
    id: z.string().regex(/^Q\d+$/),
    slugs: slug,
    order: z.number(),
    theme: z.string(),
    /** "high" = the research marks it high-sensitivity. */
    sensitivity: z.enum(['normal', 'high']),
    /** Suffering, grief, disasters, vesvese: show the gentle help card. */
    helpCard: z.union([z.literal(false), z.enum(['general', 'vesvese', 'suffering', 'disaster'])]),
    verses: z.array(verseRef),
    title: text,
    summary: text.optional(),
    steelman: text,
    whyAsked: text,
    shortAnswer: text,
    layers: z.array(
      text.extend({
        kind: z.enum(['religious', 'philosophical', 'scientific', 'clinical', 'psychological', 'history']),
      }),
    ),
    honestLimits: text,
    visualizations: z.array(visualization),
    sources: z.array(source).min(1),
  }),
});

const morals = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/morals' }),
  schema: z.object({
    id: z.string().regex(/^M\d+$/),
    slugs: slug,
    order: z.number(),
    theme: z.string(),
    verses: z.array(verseRef).min(1),
    title: text,
    summary: text,
    /** M13 (marriage) names domestic violence: show the help card. */
    helpCard: z.enum(['violence']).optional(),
    /** Research section "Key verses and hadith" (M8+), verbatim. */
    teachings: text.optional(),
    hadith: text.optional(),
    scholarship: text.optional(),
    evidence: text.optional(),
    stories: text.optional(),
    gaps: text,
    visualizations: z.array(visualization),
    sources: z.array(source).min(1),
  }),
});

export const collections = { signs, questions, morals };
