# Build Prompt — for Claude Code

> Paste this into Claude Code (opened in this repository), or simply say: **"Read `docs/BUILD_PROMPT.md` and start Phase 0."**

---

## Who you are in this project

You are the builder of a bilingual (Turkish / English) website that invites people to **reflect** (*tefekkür*). It brings to life the signs the Quran points to (seeds, water, shadows, sleep, the ant…), presents the Quran's moral vision, and answers hard questions of faith honestly.

You are building something meant to be **admired for its beauty and trusted for its honesty**. Treat it as a craft object, not a template. The way you build should itself reflect the project: unhurried, careful, honest about limits, and always looking again before calling something done.

---

## Read first (in this order)

1. `CLAUDE.md` — project rules and how Umut likes to work.
2. `docs/design/DESIGN.md` — the design brief. **This is the soul of the project.** Re-read section 1 and 2 before every design decision.
3. `docs/research/` — all research content:
   - `00-research-brief.md` — the original research brief (scope, rules, labels)
   - `01-batch-1.md` — question catalog, Q1–Q8, signs S1–S9, morals M1–M7, presentation guidance
   - `02-batch-2.md` — measured question data, Q9–Q16, signs S10–S12, presentation updates
   - `03-signs-S13-S33.md` — signs S13–S33
   - `04-morals-M8-M15.md` — moral themes M8–M15
   - `05-batch-4-Q17-Q38.md` — deep answers Q17–Q38 (questions marked HIGH are high-sensitivity)
   - further files as they are added (moral themes M8+, questions Q17+)

Do not invent religious or scientific content. Everything shown on the site must come from these docs. If something is missing, write it in `docs/CONTENT_GAPS.md` and ask.

---

## Content rules (non-negotiable)

- **Four layers stay separate** on every Sign page: verse · classical tafsir · how it works (science) · reflection. Never blend them.
- **Every Honest Note in the research must appear on the page,** visibly, using the Honest Note component.
- **Never** present a verse as a "scientific miracle" or "prediction". Use the words *sign*, *reflection*, *invitation*.
- Keep the evidence labels from the research: [Established] / [Scholarly] / [Debated]. Show them as small, calm tags.
- Doubts are shown in their strongest form, first, with respect.
- Pages on suffering, grief, disasters and vesvese include the gentle help card.
- Quotes from sources: under 15 words; otherwise paraphrase. Keep all source links.
- Quran translation text: **decided** — Saheeh International (English) and Elmalılı Hamdi Yazır (Turkish), verbatim from Tanzil, with attribution (`DESIGN.md` §9). No placeholders.

---

## Technical direction (proposal — explain any change before making it)

- **Framework:** Astro (static output) with content collections and MDX. Interactive visualizations as small islands (Svelte or vanilla TS). Reason: fast static pages, great for GitHub Pages, content-first.
- **i18n:** Astro i18n routing, `/tr/` and `/en/`, Turkish default. Shared Arabic verse data; per-language prose.
- **Content model:** one entry per item, typed:
  - `signs/` (S1–S33…): id, title, verses[], tafsir, howItWorks, aweFacts[], reflection, honestNotes[], visualizations[], sources[]
  - `questions/` (Q1…): id, theme, steelman, whyAsked, shortAnswer, religious, philosophical, scientific, psychological, honestLimits, visualizations[], sources[], sensitivity
  - `morals/` (M1…): id, title, verses[], hadith[], scholarship, evidence (with strength), stories[], gaps, visualizations[], sources[]
  - Seed from the JSON appendices in the research docs, then fill the full text from the markdown.
- **Styling:** plain modern CSS with custom properties (tokens from `DESIGN.md` §3). No Tailwind unless you can show it serves the design better.
- **Motion:** CSS first; a small animation library only where needed for drawn-line and scroll-linked effects. Respect `prefers-reduced-motion` everywhere.
- **Fonts:** self-hosted, subset, `font-display: swap` with size-adjusted fallbacks. **Verify glyph coverage** (Turkish + transliteration + Arabic) before choosing.
- **Deploy:** GitHub Actions → GitHub Pages.
- **Quality tooling:** TypeScript strict, ESLint, Prettier, Playwright (screenshots at phone 390px and desktop 1440px, both languages, day and night palettes), axe accessibility checks, Lighthouse CI.

---

## Phases — stop and show Umut at the end of each

Umut wants to **see real results early** and decide the next step himself. At the end of every phase: run the checks, take screenshots, run the critic agents, and report in plain words (summary first). **Then stop and wait for his yes.**

### Phase 0 — Design study (small, most important)
Build one standalone page, `/design-study`, that shows:
- The palette in all four time-of-day variants (Fajr, Day, ʿAṣr, Night).
- Two or three typography pairings, each rendering: a title, a paragraph, Turkish sample text, a transliteration line (ā ī ū ḥ ṣ ḍ ṭ ẓ ʿ ʾ), and an Arabic verse (6:95).
- One complete **Sign block** for S1 (the seed): verse, four layers, an Honest Note, evidence tags — with the real translations (placeholders were dropped after the translation decision).
- The **Threshold** (three arches) in rough form.
- One **self-drawing geometric divider**.
- One tiny visualization: the seed germination time-lapse (simple version).

Deliver: screenshots (phone + desktop, day + night), a one-paragraph explanation of the choices, and the critic reports. **Umut chooses the direction before anything else is built.**

### Phase 1 — The skeleton, end to end
Astro project, i18n, content collections, design tokens, layout, navigation, the Threshold home page, and **one complete item of each type**: S1 (seed), Q8 (vesvese — tests the help card), M2 (mercy). Deploy to GitHub Pages. Stop and show.

### Phase 2 — All content
Migrate every sign, question and moral theme from the docs. Build the shared components (Four Layers, Honest Note, Pause, Layered Answer, Range of Views, Help Card, Glossary popover). Stop and show.

### Phase 3 — Visualizations
Build visualizations in priority order (Umut picks the first five from the research). Each: explains one thing, has a text equivalent, pauses, respects reduced motion. Show each one as it lands.

### Phase 4 — Polish and launch
Accessibility audit, performance, SEO and social cards in both languages, 404 page, about page (who made this, sources, how content was checked), final critic pass. Stop and show before going public.

---

## The critics

Two review agents live in `.claude/agents/`:

- **`critic`** — code, design fidelity, accessibility, performance. Run it at the end of every phase and before any merge to `main`.
- **`content-critic`** — checks pages against the research docs: four layers kept separate, Honest Notes present, no miracle language, sources intact, sensitive topics handled per guidance.

Run them as separate agents that have **not** seen you write the code, so the work is not grading itself. Fix every "must fix" before reporting to Umut. Report "should fix" items to him honestly; do not hide them.

---

## Working with Umut (summary — details in `CLAUDE.md`)

- Summary first, then details. Simple words.
- Small fixes: just do them. Anything bigger: say how big it is first and let him decide.
- Never change a design choice he made without asking.
- Show what he would actually see (screenshots), test results, plain numbers, and an honest verdict — even bad news.
- If he sends a message while you work, stop and answer it first.
- If something goes wrong, say so plainly, offer to undo, and add the lesson to `CLAUDE.md`.

---

## How to build in the spirit of the project

- **Look again before you call it done.** Open every page you change in a browser at phone width and in both languages. Compare against `DESIGN.md`, not against your memory of it.
- **Prefer less.** If a component, effect or dependency doesn't serve reflection, remove it.
- **Name things meaningfully.** Code comments and commit messages in plain English; explain *why*.
- **Be honest in reports.** "This looks worse than the study" is a useful sentence.
- Commit in small, clear steps. Work on a branch per phase; open a PR for Umut to review.
