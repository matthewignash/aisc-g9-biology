# Cell Biology Study Guide — Three-Approach Prototype

Three side-by-side presentations of the same Cell Biology study guide content, each in a
different scaffolding style. **For adult evaluation, not student use yet.** Built as
self-contained static HTML/CSS/JS so it deploys to the existing Vercel static site and
ports cleanly to Google Apps Script (Vercel is blocked on the AISC network; Apps Script
is the eventual student-facing target).

## The three approaches

| | Approach | Touch | What changes |
|---|---|---|---|
| A | [Searchable Reference](searchable.html) | Lowest | Better navigation, live search + highlight, vocabulary help. Same content, less friction. |
| B | [Guided Path](guided.html) | Medium | Entry is a question ("where are you with this?"). Four paths, big-idea callouts, help drawers, progress, a quiz, a review map. |
| C | [Reference + Quick Check](hybrid.html) | Highest | Practice next to every concept (MCQ, tap-to-classify, tap-to-order). Next is gated until you try the check. |

Start at [`index.html`](index.html) — the comparison landing page.

## Run locally

No build step. Serve the folder over HTTP (needed so the browser can load `data/study-guide.js`):

```bash
python3 -m http.server 4321 --directory study-guide-prototype
# then open http://localhost:4321/
```

## Content status

- **Sections 1–2** (Cell Theory, Levels of Organization) — sourced from the existing
  `unit-2/section-1/content-snapshot.json`.
- **Sections 3–8** (Prokaryotic, Eukaryotic, Organelles, Plant vs Animal, Micrographs,
  How Organelles Work Together) — standard 9th-grade biology authored for this prototype.
  **Verify against the colleague's `Cell Biology Study Guide 2024.docx` before any student use.**

All content lives in one file: [`data/study-guide.js`](data/study-guide.js).

## Structure

```
study-guide-prototype/
  index.html          Landing — compare the three approaches
  searchable.html     Approach A
  guided.html         Approach B
  hybrid.html         Approach C
  css/app.css         Shared design system (matches _shared/css tokens)
  js/shared.js        Shared renderers (vocab tooltips, tables, MCQ, top bar)
  js/searchable.js    Approach A logic
  js/guided.js        Approach B logic
  js/hybrid.js        Approach C logic
  data/study-guide.js The content spine (window.STUDY_GUIDE)
```

## Next step after the meeting

Port the chosen approach to Google Apps Script for student deployment.
