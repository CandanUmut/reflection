# Deep research prompt (paste into a deep-research tool)

Run one batch at a time. Save each result as `docs/research/07-ask-deep-<batch>.md` (e.g. `07-ask-deep-A.md`). Claude then converts it to pages, checks every Quran quote and hadith grade automatically, translates to Turkish, and runs one reader review per batch.

Batches (Ask section, hardest first):
- **A:** Q7 Is leaving Islam punishable by death? · Q13 Is eternal Hell just for finite sins? · Q14 Are good people of other faiths saved? What about those who never heard? · Q31 Are my non-Muslim loved ones lost?
- **B:** Q20 Aisha's age at marriage · Q21 Slavery · Q22 The Prophet's wars and Banu Qurayza · Q25 Homosexuality
- **C:** Q6 Does Islam treat women unequally? · Q23 Polygyny · Q24 Hijab and coercion · Q2 If everything is written, how am I free?
- **D onward:** the remaining questions (Q3–Q5, Q8–Q12, Q15–Q19, Q26–Q30, Q32–Q38), four per batch.

---

## The prompt (replace the question list for each batch)

You are researching deep, honest answers for a bilingual website on Islamic faith, aimed at doubters, curious outsiders, students of Islamic knowledge, scientists, people who are hurting, and informed skeptics. The tone is calm, respectful and honest: it states every doubt at full strength and admits the limits of every answer. Simple, clear English; explain every technical term the first time.

**Questions for this batch:**
1. Q7 — Is leaving Islam punishable by death?
2. Q13 — Is eternal Hell just for finite sins?
3. Q14 — Are good people of other faiths saved? What about those who never heard?
4. Q31 — Are my non-Muslim loved ones lost? (the personal side: a parent, partner or friend who is not Muslim, alive or dead)

**Rules (strict):**
- Use only sources you actually read, and cite each precisely (work, author, edition/page or URL). Never cite from memory. If something cannot be sourced, say so in a "Gaps" list instead of writing it.
- Quran: give the reference for every verse (e.g. 2:256). When quoting, quote the Saheeh International translation exactly.
- Hadith: give collection and number in sunnah.com numbering (for Sahih Muslim, the standard Abd al-Baqi number, e.g. Muslim 2752), and write each as `{hadith:collection:number}` with collection one of bukhari, muslim, abudawud, tirmidhi, nasai, ibnmajah. Give the grade and grader you found (e.g. al-Albani). Other collections (Musnad Ahmad, Muwatta, al-Hakim…): cite in words with the grader. **No claim may rest on a weak (da'if) hadith**; mention a weak one only to say it is weak.
- Tafsir: quote or summarise named commentators (al-Tabari, al-Qurtubi, Ibn Kathir, al-Razi, al-Sa'di…) on the specific verse.
- Fiqh: the four Sunni schools only (Hanafi, Maliki, Shafi'i, Hanbali), each with a named scholar or work.
- Scholarship and science: named scholars and their actual arguments (not just names); peer-reviewed or reputable academic sources; give numbers with their source.
- Honorifics outside quotations: "the Prophet (pbuh)", "Moses (pbuh)"; a Companion named as narrator "(ra)". Never change a quotation.
- No "miracle", "proves" or "predicted" for science claims about verses. Not centred on any one country.
- Face the hard material; never skip it. After each reply to an objection, state its limit.

**Output format, for each question, exactly:**

```
## Q<n> — <title>

### Sources read
- <full reference with URL or edition/page> — what it was used for

### The question, at its strongest
<the doubt as its most serious holder would put it>

### Why people ask it
<2–3 sentences>

### Short answer
<5–7 plain sentences>

### The full answer
#### heart — For the heart and mind        (first, when the topic is personal)
#### quran — What the Quran says
#### sunnah — What the Prophet taught
#### scholars — How scholars have understood it
#### fiqh — What the four schools hold      (where law applies)
#### history — History                     (and/or: science — What science says; reasoning — How philosophers argue about it)
#### objection — The strongest objections, and the replies
#### views — The range of views
<under each: plain prose; each paragraph opens with a bold sentence stating its point>

### Questions readers ask next
**<question?>** <short answer>
(4–6 of them)

### Honest limits
<what remains uncertain, disputed or unanswered>

---
## Gaps
- <anything you could not source>
```

Length: about 2,500–4,000 words per question for these hard topics. Write in English only.
