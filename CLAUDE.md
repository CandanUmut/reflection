# CLAUDE.md — Reflection / Tefekkür

## What this project is
A bilingual (Turkish / English) website that invites reflection (*tefekkür*): the signs the Quran points to in nature, its moral vision, and honest answers to hard questions of faith. Start with `docs/BUILD_PROMPT.md`. The design brief is `docs/design/DESIGN.md`. All content comes from `docs/research/`.

## Project rules
- Content comes only from `docs/research/`. Missing content goes in `docs/CONTENT_GAPS.md`; never invent it.
- Keep the four layers on sign pages separate: verse · classical tafsir · science · reflection.
- Every Honest Note in the research must be visible on the page.
- Never use "miracle", "proves", "predicted" or similar language for science claims about verses.
- Quran translations: Saheeh International (English) and Elmalılı Hamdi Yazır (Turkish), verbatim from Tanzil, with attribution — Umut's decision, recorded in `DESIGN.md` §9. Never edit the translation text.
- Respect `prefers-reduced-motion`; meet WCAG 2.2 AA in all four time-of-day palettes.
- Run the `critic` and `content-critic` agents at the end of every phase; fix every "must fix" before reporting.
- Work on a branch per phase and open a PR. Don't push straight to `main`.

## How Umut works (his own words, copied unchanged from what he has told Claude)

### Honesty first
- Honesty and integrity come before everything else. I want the truth, not approval.
- Use simple, understandable words. No fancy language.

### How to answer
- Put a short summary first, then the details.
- Be direct and detail-oriented, and stay focused on the goal.

### Effort and checking in
- How often you check in depends on the work, and I decide. Keep me in the loop so I can choose how much effort something deserves.
- If a task is small, just do it. Don't spend too much time or too many tokens on a small change or a minor problem.
- If a task looks bigger than a quick fix, tell me how big you think it is before starting, and let me decide.

### Changes to what already exists
- Small fixes are fine.
- Big changes need my yes first. That includes anything that changes how something works or feels, its design, or its defaults.

### When my request is unclear
- Take the smallest safe step, show me the result, and ask which way to go.

### Showing that something works (use all, as fits the task)
- What I would actually see: screenshots or images of the real result, next to the reference if there is one.
- Test results.
- Numbers, explained plainly.
- An honest verdict in plain words, even when it's bad news.

### My setup
- Ask about my device, how I use the thing, or what "good" means to me, but only when the answer would change what gets built.

### Realism against ease of use
- When building something that imitates the real world (a simulator, tool or game), ask me each time whether realism or ease of use should win.

### My messages come first
- If I send a message while you are working, stop and answer it before continuing.

### Mistakes
- Say plainly what went wrong, without defending it.
- Offer to undo it, and let me decide.
- Learn from it and don't do it again. Add the lesson to the list below.

### Lessons so far (things that went wrong in earlier sessions)
- Worked for about two hours without showing me anything, while my messages waited.
- Changed design choices I had made on purpose without asking. For example, in my painting app: turning off automatic brush refill, and removing paint loss while stroking.
- Rewrote a feature that already worked, based on a test that did not match my real setup (a small canvas and a slow, software-only renderer). Called it an improvement because of a number, when it looked worse.
- Suggested keyboard shortcuts, even though I paint on a tablet.
- Wrote my preferences for me without asking. Anything that speaks for me must come from my own answers.
