<!-- The three report formats. scripts/make-research-prompts.mjs copies the right
one into each run file. They match what scripts/migrate-v2.mjs reads: keep the
heading names exactly, or the report cannot be turned into pages automatically. -->

## ask
For each question, exactly these headings, in this order:

```
## Q<n> — <title, as on the current page>

### Sources read
- <full reference with URL or edition/page> — what it was used for

### The question, at its strongest
<the doubt as its most serious holder would put it; 3–6 sentences>

### Why people ask it
<2–3 sentences>

### Short answer
<5–7 plain sentences a hurried reader can take away>

### The full answer
#### heart — For the heart and mind            (first, when the topic is personal)
#### quran — What the Quran says               (each verse: words, setting, addressee — rule 4)
#### sunnah — What the Prophet (pbuh) taught
#### scholars — How scholars have understood it (named, with works and actual arguments)
#### fiqh — What the four schools hold         (only where law applies)
#### history — History                         (and/or: science — What science says; reasoning — How philosophers argue about it)
#### objection — The strongest objections, and the replies   (each reply followed by "*Limit:* …")
#### views — The range of views                (each view: who holds it, the work, the reason)

### Questions readers ask next
**<question?>** <short answer, 2–5 sentences>
(5–7 of them; include the questions listed for this page below)

### Honest limits
<what remains uncertain, disputed or unanswered — always visible on the page>
```

Under each `####` heading, write plain prose. Open each paragraph with a **bold sentence that states its point**.

## live
For each theme, exactly these headings, in this order:

```
## M<n> — <title, as on the current page>

### Sources read
- <full reference with URL or edition/page> — what it was used for

### In brief
<2–3 sentences: the heart of the teaching, with one key verse quoted exactly>

### Go deeper
#### meaning — What it means                   (the key Arabic terms and roots, in plain words)
#### quran — What the Quran says               (each verse: words, setting, addressee, named tafsir — rule 4)
#### sunnah — What the Prophet (pbuh) taught   (stories told in full, not in fragments)
#### scholars — How scholars have understood it (classical akhlaq: al-Ghazali, Miskawayh, al-Raghib al-Isfahani…; maqasid; modern voices — named, with works)
#### fiqh — What the four schools hold         (only where law applies: each school, named work)
#### history — History                         (real examples with sources, told honestly)
#### research — What research shows           (named studies with numbers and strength labels — rule 8)
#### practice — In daily life                  (concrete steps and examples)
#### heart — For the one who is struggling     (the person on the receiving end, or who finds this hard)

### Questions readers ask next
**<question?>** <short answer, 2–5 sentences>
(5–7 of them; include the questions listed for this page below, and the hardest objection to the teaching)

### Honest limits
<the gap between ideal and practice, with data; what is disputed; what the page does not claim>
```

Under each `####` heading, open each paragraph with a **bold sentence that states its point**.

## reflect
Each page keeps four layers **strictly separate**: the verse; classical tafsir; science; reflection. For each page, exactly these headings, in this order:

```
## S<n> — <title, as on the current page>

### Sources read
- <full reference with URL or edition/page> — what it was used for

### In brief
<1–2 sentences: the page's opening line. It must be about this verse, not a stray fact.>

### Verse note
<the verse(s) quoted exactly in Saheeh International; the key Arabic words and what they mean; setting (before/after, Meccan/Medinan)>

### Classical tafsir
<named commentators on this verse — al-Tabari, al-Qurtubi, Ibn Kathir, al-Razi, al-Zamakhshari, al-Sa'di… — in their own words where possible; where they differ; what they did NOT say (e.g. no classical commentator read it as X). No science here.>

### How it works
<the science, step by step, with numbers, units, named sources and strength labels; each point tied to a word in the verse (rule 8). No tafsir here.>

### Points of awe
- <3–5 verifiable facts, each with its source>

### The reflection
<120–250 words: what the verse invites us to notice, its links to other verses, what it asks of the reader. No new factual claims here.>

### Honest notes
- <each overclaim to avoid (state the popular claim, then why it fails or what is uncertain), and anything the science or the tafsir does not settle>

### Questions readers ask next
**<question?>** <short answer, 2–5 sentences>
(4–6 of them; include the questions listed for this page below)
```

## end
After the last page, add these two sections, after a line `---`:

```
---
## Corrections to the current pages
- **<page id>** — "<the sentence on the live page, quoted>" — <what is wrong: wrong / stretched beyond its source / wrongly attributed / unsourced> — <evidence, with source> — <suggested fix>

## Gaps
- <anything you could not source, and what would be needed>
```
