# Turkish translation prompt (paste into any chat, with one question's English section)

Save each result as `content-src/tr-v2/Q<n>.yaml`. Claude checks it automatically (every Quran quotation against Elmalılı, structure against the English) and builds the Turkish page.

---

Translate the attached English section (one question from a research file) into natural, simple Turkish for a bilingual website on Islamic faith. Output **only** a YAML file in exactly this shape:

```yaml
verses: ["2:256", "18:29"]          # the key verses for the page (keep the English page's list)
steelman: |
  <"The question, at its strongest">
whyAsked: |
  <"Why people ask it">
shortAnswer: |
  <"Short answer">
fullAnswer:                          # one item per "####" part, SAME ORDER, SAME kind
  - kind: quran
    text: |
      <the part's text>
  - kind: history
    title:                           # only when the English heading differs from the standard one
      tr: <Turkish heading>
      en: <English heading as written>
    text: |
      <…>
followUps:                           # one per "**question?** answer", same order
  - q: <question>
    a: |
      <answer>
honestLimits: |
  <"Honest limits">
```

Rules:
- Quran: quote **only** the Elmalılı Hamdi Yazır translation, word for word (as on tanzil.net, "tr.yazir"); never translate a verse yourself. Keep the verse reference after each quotation, e.g. "…" (2:256).
- Keep every `{hadith:collection:number}` token exactly as it is. Translate the hadith wording faithfully from the English.
- Honorifics outside quotations: "Hz. Peygamber (s.a.v.)", other prophets "(a.s.)" (Mûsâ (a.s.)), a Companion narrator "(r.a.)".
- Keep **bold** opening sentences, *italics* and lists; keep names, works, dates and numbers exactly.
- Natural Turkish, short sentences; explain terms as the English does. Do not add or drop content.
