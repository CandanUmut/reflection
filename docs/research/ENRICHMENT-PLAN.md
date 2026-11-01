# Content enrichment plan — whole site (Ask, Reflect, Live)

Umut's request (2026-10-31): the content across the site is too short and not satisfying. Every remaining page in **Ask**, **Reflect** and **Live** gets new deep research, aiming at the depth of the Q1 model answer (`07-ask-deep-I.md`, reader score 7.7/10). This plan replaces the batch list (B–D) in `DEEP-RESEARCH-PROMPT.md`.

## Done
- Q1 — model answer (`07-ask-deep-I.md`)
- Batch A: Q7, Q13, Q14, Q31 (`07-ask-deep-A.md`) — on the site in English (2026-10-31). Checked automatically: all 12 hadith (number, grade; none weak), all 35 Quran quotations (verbatim, `scripts/check-quotes.mjs`). Not yet checked one by one: scholars' quotations and figures. Turkish: previous page until `content-src/tr-v2/Q<n>.yaml` exists (`prompts/TRANSLATE-TR.md`).

## Runs (one deep-research run each; output file in `docs/research/`)

Depth needs about 4 questions per run for Ask (2,500–4,000 words each), and about 8 pages per run for Reflect and Live (1,500–2,500 words each). Order: weakest pages first, mixing sections so the whole site improves together.

| # | Section | Pages | Output file | Baseline reader score |
|---|---|---|---|---|
| 1 | Ask — God and religion | Q3, Q32, Q28, Q36 | `08-enrich-ask-1.md` | 2.8–3.5 |
| 2 | Live I | M1–M8 | `10-enrich-live-1.md` | ~4–5 |
| 3 | Reflect I | S1–S8 | `09-enrich-reflect-1.md` | 2.8–6 |
| 4 | Ask — meaning, mind, miracles | Q29, Q33, Q34, Q26 | `08-enrich-ask-2.md` | 3.0–3.8 |
| 5 | Ask — women and family | Q6, Q23, Q24, Q20 | `08-enrich-ask-3.md` | 3.2–5.3 |
| 6 | Ask — hard history and ethics | Q21, Q22, Q25, Q19 | `08-enrich-ask-4.md` | 4.3–5.3 |
| 7 | Live II | M9–M15 | `10-enrich-live-2.md` | — |
| 8 | Reflect II | S9–S16 | `09-enrich-reflect-2.md` | — |
| 9 | Ask — sources and creation | Q2, Q5, Q4, Q11 | `08-enrich-ask-5.md` | 3.8–6.2 |
| 10 | Ask — practice | Q37, Q35, Q10, Q9 | `08-enrich-ask-6.md` | 3.2–5.7 |
| 11 | Reflect III | S17–S25 | `09-enrich-reflect-3.md` | — |
| 12 | Ask — pastoral | Q8, Q15, Q16, Q38 | `08-enrich-ask-7.md` | 4.7–5.3 |
| 13 | Ask — God, prophethood, afterlife | Q12, Q17, Q18, Q27, Q30 | `08-enrich-ask-8.md` | 4.3–5.5 |
| 14 | Reflect IV | S26–S33 | `09-enrich-reflect-4.md` | — |

Each run's prompt includes the reader critic's "missing" items and follow-up questions for its pages (`docs/reader-scores/round-1-ask-baseline/`, `round-0/`), so the research answers what real readers asked.

## After each run (efficient version, 2026-10-31)
1. Save the report verbatim as the output file above.
2. Automatic checks, no AI: `node scripts/check-quotes.mjs` (Quran verbatim), `npm run hadith` (every hadith resolves, with grade; a missing or ungraded one stops the build), `node scripts/hadith-audit.mjs` (no weak hadith carrying a claim). A source-checker run only on a sample, or when the automatic checks show problems.
3. Turn it into the page (English and Turkish), per `WRITING-BRIEF.md`.
4. Run `reader-critic` on the new page and record the score.

## Output formats

**Ask** — exactly the format in `DEEP-RESEARCH-PROMPT.md` (Sources read · The question, at its strongest · Why people ask it · Short answer · The full answer with kinds heart/quran/sunnah/scholars/fiqh/history/science/reasoning/objection/views · Questions readers ask next · Honest limits · Gaps).

**Reflect** (signs), for each page — the four layers stay separate:
```
## S<n> — <title>
### Sources read
### The verse(s) — Arabic phrase, Saheeh International translation, context (before/after, Meccan/Medinan)
### Key words — the Arabic words that matter and what they mean
### Classical tafsir — named commentators on this verse, their words, where they differ
### How it works — the science, step by step, with numbers, units and sources
### Points of awe — 3–5 verifiable facts, each with a source
### The reflection — what the verse invites us to notice; connections to other verses
### Honest notes — overclaims to avoid, what is uncertain, and why
### Questions readers ask next
### Visualization ideas
---
## Gaps
```

**Live** (moral themes), for each page:
```
## M<n> — <title>
### Sources read
### What it means — the key Arabic terms and their roots, in plain words
### What the Quran says — verses with context and named tafsir
### What the Prophet taught — hadith as {hadith:collection:number} tokens with grades; stories told in full
### How scholars have understood it — classical akhlaq (al-Ghazali, Miskawayh, al-Raghib al-Isfahani…) and maqasid
### What the four schools hold — only where law applies
### In daily life — concrete practice, examples, steps
### What research shows — peer-reviewed findings with effect sizes and strength of evidence
### History — real examples, with sources, told honestly
### The gap between ideal and practice — with data
### For the one who is struggling — the person on the receiving end, or who finds this hard
### Questions readers ask next
### Honest limits
---
## Gaps
```
