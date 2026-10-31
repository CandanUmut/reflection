# Design Brief — Tefekkür

> Status: **proposal**. Nothing here is final until Umut approves the Phase 0 design study (see `docs/BUILD_PROMPT.md`). Every choice below says *why*, so it can be argued with.

---

## 1. The one idea

**The site should feel like a quiet room where you are invited to look again.**

The Quran repeats one invitation: *a-fa-lā tatafakkarūn* — "will you not reflect?" It does not shout. It points at ordinary things (a seed, a shadow, a cloud, your own sleep) and asks you to look again. The design must do the same:

- **Slow, not dull.** Things arrive the way dawn arrives: gradually, then fully.
- **Quiet, not empty.** Generous space, but every element earns its place.
- **Honest, not preachy.** The design never oversells. When the content is uncertain, the design says so calmly (the Honest Note).
- **Ordinary made luminous.** Our heroes are seeds, water, shadows, ants. The craft is in showing them so carefully that they become astonishing.

If a design choice makes the visitor feel rushed, sold to, or lectured, it is wrong for this site.

---

## 2. What the site must never look like

These are the easy defaults that would kill the aura. Avoid all of them.

- Generic "AI startup" look: purple-blue gradients, glassmorphism, glowing blobs, emoji icons, rounded cards with heavy drop shadows.
- Religious clichés: mosque-silhouette-plus-crescent headers, green-and-gold "Islamic" templates, fake parchment with burnt edges, dramatic god-rays.
- Stock photography of praying hands, galaxies with lens flare, or smiling models.
- "Miracle" energy: flashing numbers, "SCIENCE CONFIRMS!" headlines, countdowns, superlatives.
- Busy motion: parallax for its own sake, bouncing, auto-playing carousels, confetti.

---

## 3. Visual language

### 3.1 Light and time (signature element)

The Quran ties light to time (10:5, 25:45–46, 78:13). So does this site.

- The palette follows the visitor's **local time of day**: *Fajr* (dawn), *Day*, *ʿAṣr* (late afternoon), *Night*. Changes are subtle — a shift in paper warmth and ink depth, never a jarring theme swap.
- The visitor can override it with a small sun/moon control (which is itself a tiny sign: the moon's phase in the control is the real current phase).
- `prefers-color-scheme` is respected as the starting point if the visitor has a preference; time-of-day only tints within it.

### 3.2 Palette (proposal — to be tested in Phase 0)

Drawn from the signs themselves, not from a "religious" template.

| Token | Role | Day value | Night value | Source of the idea |
|---|---|---|---|---|
| `--paper` | page background | warm parchment `#F3EDE2` | deep night ink `#0E1322` | dawn page / night sky |
| `--ink` | main text | `#1D1A16` | `#E9E3D6` | ink on paper / moonlight on dark |
| `--ink-soft` | secondary text | `#5E564C` | `#A7A092` | |
| `--lamp` | the one warm accent (sirāj) | muted gold `#A9823F` | `#D2AE66` | 78:13 "blazing lamp" |
| `--life` | rare accent for living things | sap green `#4F6B47` | `#8DAA7F` | 36:80 the green tree |
| `--water` | science / data accent | deep teal `#2F5E66` | `#7FB3B8` | 21:30 water |
| `--clay` | Honest Note accent | earth red `#8A4B36` | `#C98D72` | 23:12 clay, "the earth speaks plainly" |
| `--hairline` | rules and borders | `#D9CFBF` | `#2A3046` | |

Rules:
- **One accent per view.** `--lamp` is the default. `--life`, `--water`, `--clay` appear only where their meaning applies.
- Contrast must meet WCAG AA in every time-of-day variant (test all four).
- Gold is never used as large fills or gradients. It is a thread, not a coat.

### 3.3 Typography (proposal — verify glyph coverage first)

The site must render: Turkish (ç ğ ı İ ö ş ü), academic transliteration (ā ī ū ḥ ṣ ḍ ṭ ẓ ḏ ṯ ġ ʿ ʾ), and Arabic Quranic text. **Coverage is a hard requirement. Test every candidate font with a glyph page before choosing.**

| Role | First choice | Fallback | Why |
|---|---|---|---|
| Display (titles, verse translations) | **Fraunces** (variable, soft optical axis) | EB Garamond | Warm, slightly organic serif; feels hand-made without being antique |
| Reading text | **Literata** | Source Serif 4 | Designed for long reading on screens; calm rhythm |
| Arabic (Quran) | **Amiri Quran** | Amiri / Noto Naskh Arabic | Classical Naskh with proper Quranic marks; open license |
| Labels, references, UI | **IBM Plex Sans** (Plex Mono for verse refs like 6:95) | Inter | Precise, quiet; mono references feel like a scholar's apparatus |

Type rules:
- Reading measure 60–70 characters. Line height 1.6–1.7 for body.
- Arabic verse text is set larger than the translation and given its own breathing space; it is never squeezed into a card corner.
- Transliteration is italic and slightly smaller; key Arabic words get a dotted underline that opens a word card.
- No ALL CAPS headings. Small caps only for labels.

### 3.4 Texture and form

- A very faint paper grain (SVG noise, ≤3% opacity). Turned off in high-contrast mode.
- **Geometry from a single point.** Section dividers are Islamic geometric patterns that *draw themselves* from one compass point (circle → hexagon → star), like a compass-and-straightedge construction. Symbol: all order unfolding from one origin. Used sparingly — once per page at most.
- Borders are hairlines. Depth comes from layering and space, not shadows.
- Corners: 2–4 px, not pill shapes.

---

## 4. Signature components

### 4.1 The Threshold (home)
Three arches, drawn in thin line: **Reflect · Live · Ask** (*Tefekkür et · Yaşa · Sor*). Hovering or touching an arch fills it slowly with light from below, like dawn in a doorway. One line above them, the invitation of the day — a short verse that changes daily.

### 4.2 The Four Layers (core of every Sign page)
Inspired by the manuscript tradition where commentary (*sharḥ*, *ḥāshiya*) surrounds the central text. Each sign shows four clearly separated layers:

1. **The verse** — Arabic, transliteration, translation. Center, largest.
2. **Classical tafsir** — how the early scholars read it.
3. **How it works** — the science, with numbers and sources.
4. **Reflection** — what the verse invites us to notice.

Visually these are distinct layers (position, typeface, accent), so the reader always knows which voice is speaking. This is the design's main promise of honesty.

### 4.3 The Honest Note (*Dürüst not*)
A margin note in `--clay`, set like a scholar's handwritten marginal comment: hairline rule on the left, small label "Honest note", calm wording. It must be visible without hunting, never hidden behind a click. This component is the credibility engine of the whole project.

### 4.4 The Pause (*Tefekkür arası*)
Between the verse and the explanation, a brief, skippable pause: the verse's question appears alone in the center ("Have you seen the seed you sow?") and the page waits a breath (≈1.5 s, or on scroll) before continuing. Never blocks; a skip affordance is always there; disabled with reduced motion.

### 4.5 Layered answer cards (Ask section)
For each hard question: the steelmanned question → short answer → depth layers (religious, philosophical, scientific, psychological) → honest limits → sources. The reader chooses how deep to go. The steelmanned question is shown *first and respectfully*, in full, so the doubter feels heard.

### 4.6 Range-of-views slider
For contested issues (Hell, salvation, hadith, Aisha's age): scholars placed along a line with name, era and school. Shows the tradition's real breadth without the site choosing for the reader.

### 4.7 Gentle help card
On pages about suffering, vesvese, grief and disasters: a quiet card pointing to professional help (Türkiye and international resources). Never alarmist.

### 4.8 Visualizations
Each sign has 1–2 visualizations from the research docs (germination time-lapse, orbit model, sundial, cloud weight meter, ocean descent…). Rules:
- They **explain**, they don't decorate. Each one answers one question.
- Interaction is optional; every visualization has a text equivalent.
- Motion is slow, physically believable, and pausable.
- Same visual system across all of them (line weight, palette, labels in Plex).

---

## 5. Motion principles

- **Breath tempo.** Standard ease is slow-in, slow-out; core durations 400–900 ms for UI, 4–6 s for ambient loops (roughly one breath).
- **Things grow, they don't pop.** Reveal by drawing lines, unfolding, filling with light — like a seed opening, a shadow lengthening.
- **One moving thing at a time.** Attention is sacred here.
- **`prefers-reduced-motion`**: all ambient motion stops; reveals become instant; visualizations offer step buttons instead.

---

## 6. Sound (optional, off by default)
A single soft ambient layer (wind, distant water) on the Threshold, off by default, with a clear toggle. No Quran recitation without proper licensing and Umut's decision.

---

## 7. Language and voice

- Bilingual from day one: Turkish and English, with a visible switch. Arabic verse text appears in both.
- Plain words. Short sentences. No preaching, no "you must", no mocking anyone.
- Turkish uses established terms (*tefekkür, âyet, kader, cüz'î irade, vesvese, haşyet*) with a small glossary popover.
- Doubts are written with respect: "Bu soruyu soranlar haklı bir şeye işaret ediyor…" not "Bazı şüpheciler iddia ediyor…".

---

## 8. Accessibility and performance (non-negotiable)

- WCAG 2.2 AA in all four time-of-day palettes.
- Full keyboard use; visible focus styles that match the aesthetic (a lamp-gold hairline).
- Arabic spans use `lang="ar" dir="rtl"`; Turkish and English pages set `lang` correctly (important for Turkish İ/i casing).
- Mobile-first. Most visitors will be young people on phones.
- Lighthouse ≥ 95 for Performance, Accessibility, Best Practices, SEO on the home page and one sign page.
- Fonts subset and self-hosted; no layout shift on font load.

---

## 9. Open decisions for Umut

1. **Site name.** Working title *Tefekkür* (EN subtitle: "Signs for those who reflect"). Alternatives: *Âyât*, *Bak* ("Look"), *Bir Daha Bak* ("Look again").
2. **Quran translations — licensing.** Diyanet and Sahih International translations are under copyright. Options: (a) use an API with permission/attribution such as Quran.com's, (b) use older public-domain translations (Elmalılı for Turkish; Pickthall / Yusuf Ali for English) with light modern notes, (c) write our own careful renderings of short excerpts and say so. Needs a decision before content goes live.
   - **Decided by Umut (2026-10-30):** use **Saheeh International** (English) and **Elmalılı Hamdi Yazır** (Turkish), no placeholders. Texts are taken verbatim from the Tanzil Project (`en.sahih`, `tr.yazir`), with the Arabic from Tanzil's Uthmani text (CC BY 3.0); attribution and a link to tanzil.net appear on every page. Transliteration comes from Quran.com's word-by-word data. Built by `scripts/quran-data.mjs` into `src/data/quran.json`, which holds only the verses the site uses.
   - **Decided by Umut (2026-10-31):** no written permission will be sought. His words: "elmalili hamdi died almost 100 years ago, sahih international wouldn't mind we use english translations of Quran why they did the translation in the first place, why would i need a written permission". Tanzil's terms (tanzil.net/trans) allow the translations "for non-commercial purposes only"; the site is free and non-commercial and gives attribution, and the About page says so. If the site ever became commercial, permission would be needed.
   - **Earlier note (superseded):** Saheeh International remains under copyright by its publisher; Tanzil distributes it, but Quran.com uses it with permission. The Tanzil `tr.yazir` text is a simplified (sadeleştirilmiş) modern edition of Elmalılı, whose editor may hold rights even though the 1935 original is public domain. Written permission from both publishers is the safe path before going public.
3. **Recitation audio** — include or not, and from which licensed source.
4. **Public or private repository**, and whether to use GitHub Pages or another host.
5. **Content review**: who reviews theology (a scholar) and science (a domain expert) before launch.
6. **Visual redesign (2026-10-31).** After seeing Phases 0–3, Umut asked for a different look. His words, unchanged:
   - "the UI needs to look much better and unique , the coloring, animations and the fonts can be better , also add some motifs like on some interior mosque they have nice motifs like the Mimar sinan designs please make it look very nice and well thought out"
   - After seeing the first version (branch `design-sinan`): "I liked it much more than the before but i think it can be a bit better, like the ornaments they look so mechanical, let's add some emotions and art into the pages please"
   - **What changed, and which parts of this brief it replaces** (until Umut confirms or changes them):
     - §3.2 palette → İznik tile colours: cobalt, turquoise, coral red (`--clay`), sage, gold on warm paper; four time-of-day versions in `src/styles/palettes.mjs`, all pairs AA.
     - §3.3 type → Cormorant Garamond (display), Crimson Pro (text), Inter (labels), IBM Plex Mono (references); Amiri Quran unchanged.
     - §3.4 ornament → hand-drawn İznik flowers (tulip, carnation, saz leaf, hatayi rosette) from `src/lib/flora.ts`: a tile border (header, footer, verse frame), a flower medallion that opens from its centre (replacing the self-drawing geometric divider), a tree of life that grows in the Pause window. Geometry remains in the arcade cornice and the arch doors.
     - §4.1 Threshold → an arcade of red-and-ivory (ablaq) arches, each with a hanging lamp that breathes twice on arrival and then rests.
   - **Umut's answers (2026-10-31):** "we can use a different color for honest notes" — the Honest Note now has its own colour (`--honest`, İznik manganese aubergine), used by nothing else. "I don't see a mosque imagery, using motifs is okay i think they look nice". The ornament rules below are therefore superseded by the motifs as built.
   - **Tensions with this brief that these answers settle:**
     - §3.2 kept clay red for the Honest Note alone; the flowers and arches now use it too, so the Honest Note's colour stands out less.
     - §2 lists "mosque-silhouette" clichés; Umut asked for mosque-interior motifs. The hanging lamps and arcade sit between the two.
     - §3.4 said "once per page at most" for ornament; pages now carry several borders plus a medallion or Pause window.
