# G9 Biology Interactive Curriculum — Conventions

Author: Matthew Ignash
Last revised: 2026-05-22

These conventions apply to every section's HTML page across G9 Biology. If a rule here conflicts with a unit-specific document, this file wins unless the unit-specific document is the brief itself.

## 1. Language

- American English spelling. "Organization," "analyze," "behavior," "color." Never "organisation," "analyse," "behaviour," "colour."
- 9th-grade reading level. Conversational but precise. No baby-talk, no "as we know…", no "obviously…".
- Define terms inline the first time they appear in a section.

## 2. File and folder layout

```
aisc-g9-biology/
  index.html                        # Public-site landing page (Vercel root)
  vercel.json
  _shared/                          # Curriculum-wide assets
    css/   js/   apps-script/
    conventions.md   content-schema.md
  unit-<n>/
    design-brief.md                 # Why this unit exists
    build-guide.md                  # Build spec
    section-<m>/
      section<m>.html               # Standalone interactive
      content-snapshot.json         # Snapshot of the master Sheet
      apps-script/
        Code.gs   Index.html   README.md
        ContentLoader.gs            # Copy of _shared file
        ServeSection.gs             # Copy of _shared file
```

The deployment URL of the master content Sheet for each section lives on the teacher's machine and in Google Drive — not in this repo, since the repo is public.

Apps Script does not natively support shared libraries without extra setup, so the `.gs` files under `_shared/apps-script/` are **copied** into each section's `apps-script/` folder, not linked. When the shared file changes, copies must be re-synced manually. Keep the file's first comment line as `// Shared: G9 Biology _shared/apps-script/<file>.gs — keep in sync.`

## 3. Visual tokens (defined in `css/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--c-teal-deep` | `#0F3D3E` | Section headers, primary text |
| `--c-sage` | `#7FB069` | Accents, "alive" indicators, correct-answer outline |
| `--c-coral` | `#F2A65A` | Interactive callouts, buttons, highlights |
| `--c-bg` | `#FAFAF7` | Page background |
| `--c-text` | `#1A2B2C` | Body text |
| `--c-muted` | `#5E6F70` | Secondary text, helper copy |
| `--c-rule` | `#D9D7CE` | Borders, dividers |
| `--c-error` | `#B23A48` | Incorrect-answer outline, AI-critique selections |

No hardcoded hex outside `tokens.css`.

Type:
- Headers: `Georgia, "Charter", serif`
- Body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Body size: 17px desktop, 16px mobile, line-height 1.6.

## 4. Layout

- One self-contained HTML page per section.
- Sticky table of contents on the left (≥1024px) or as a collapsing top bar (<1024px).
- Six lettered sections (A–F): Phenomenon, Reading, Interactive Model, Practice, AI Critique, Revisit.
- Page must be readable and functional at 768px width (iPad portrait) and 375px (phone) without horizontal scrolling.

## 5. Interactivity

- No external HTTP requests at runtime. All CSS, JS, images (as inline SVG or base64) embedded.
- Every interactive element keyboard-navigable. Visible focus rings (`outline: 2px solid var(--c-coral); outline-offset: 2px;`).
- Drag-and-drop works on touch — use pointer events, do not rely on `mouseover`/`hover`.
- Images have meaningful `alt` text. Decorative SVGs use `aria-hidden="true"`.
- No emoji as decoration.

## 6. Persistence

- All student input is `localStorage` only. Keys namespaced `g9bio.u<unit>.s<section>.<field>`.
  - Example: `g9bio.u2.s1.is-alive-initial`, `g9bio.u2.s1.cer-response`.
- A "Reset section" link at the bottom of the page wipes all `g9bio.u<unit>.s<section>.*` keys after a confirmation prompt.

## 7. Content sources

- **In HTML (authored prose):** Section B reading text, the page skeleton, all styling. Edits via git.
- **In Google Sheets (per-section master Sheet):** Everything structured and iterable — see `content-schema.md`.

The Apps Script `doGet` injects Sheet content into `Index.html` as `window.__CONTENT__`. The standalone `section<n>.html` reads the same shape from an embedded `<script>` block built from `content-snapshot.json`.

## 8. Code excellence

Inherits the Three Laws and quantitative limits from `CLAUDE.md`:
- Function body ≤ 25 lines, ≤ 4 parameters.
- File length ≤ 300 lines.
- Nesting depth ≤ 3 levels (use early returns).
- No defensive code for scenarios that can't occur.
- No comments restating the code. Name things so well that comments are unnecessary.

## 9. Placeholders

- Video: `<div class="video-placeholder">[VIDEO: short looping clip of batter rising over 8 hours]</div>` with descriptive text as a fallback. Add a `<!-- TODO: replace with real video -->` comment alongside.
- Images we don't yet have: same pattern, `<div class="img-placeholder">[IMAGE: ...]</div>`.

## 10. Voice

- Personal where appropriate (the idli batter framing is grounded in Chennai life). Universal where required (the eight levels of organization are universal).
- The teacher is not on the page. The student is reading directly. No "your teacher will tell you…".
