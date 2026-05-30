# AISC HS Grade 9 Biology — Public Site

The student-facing curriculum site for **Grade 9 Biology** at the American International School Chennai (AISC). NGSS-aligned, phenomenon-driven, AI-literacy integrated, lab-first.

By Matthew Ignash.

Live preview: deployed on Vercel from `main` (see [`vercel.json`](./vercel.json)).

## What's in this repo

This repo contains **only the public-facing site and the student-facing interactives**. Matthew's authoring source (unit plan docs, lecture slide decks, study guides, reference PDFs) and any student work live in Google Classroom and Google Drive, not here.

```
.
├── index.html              Public landing page (Vercel root)
├── vercel.json             Clean-URL config
├── _shared/                Shared assets used by all section pages
│   ├── apps-script/        Reusable Apps Script: ContentLoader, ServeSection
│   ├── css/                tokens.css, base.css, components.css
│   ├── js/                 storage, section-shell, practice modules, etc.
│   ├── conventions.md      Curriculum-wide conventions
│   └── content-schema.md   Google Sheet content schema
├── unit-2/                 Cell Biology (pilot scope)
│   ├── design-brief.md     Why this exists, four design lenses, phenomenon
│   ├── build-guide.md      Build spec for Sections 2/3 + landing
│   ├── section-1/          Cell theory & levels of life (deployed)
│   │   ├── index.html       Standalone interactive (also served at /unit-2/section-1/)
│   │   ├── content-snapshot.json
│   │   └── apps-script/
│   └── section-2/          Inside the cell (built, awaiting Apps Script package)
│       └── index.html       Standalone interactive (also served at /unit-2/section-2/)
└── study-guide-prototype/  Cell Biology study guide, three scaffolding styles —
                            evaluation prototype for adult review, not student-production
```

## How students reach this material

**Not** via Vercel — AISC's network blocks third-party CDNs. Vercel hosts the **public preview** of the work, for colleagues and other teachers.

Students reach the actual interactives via:

1. Each section's HTML is served by a small **Google Apps Script web app**.
2. The Apps Script web app is **embedded inside Google Sites** as an iframe.
3. Students click into the unit area of the class Google Site to reach it.
4. Private deliverables (CER responses, lab data, graded work) flow through **Google Classroom**, not through this repo.

Each section's Apps Script pulls structured content (multiple-choice questions, fill-in-the-blank items, drag cards, AI-critique passages, organelle definitions) from a per-section Google Sheet, so content edits don't require a redeploy. Reading prose and page structure stay in the HTML.

See [`_shared/conventions.md`](./_shared/conventions.md) and [`_shared/content-schema.md`](./_shared/content-schema.md) for details.

## Status

| Unit | Section | Standalone HTML | Apps Script package | Deployed |
|---|---|:-:|:-:|:-:|
| Unit 2 | Section 1 — Cell theory + levels of life | ✓ | ✓ | ✓ |
| Unit 2 | Section 2 — Inside the cell | ✓ | — | — |
| Unit 2 | Section 3 — Membrane & transport | — | — | — |
| Unit 2 | Landing | — | n/a | — |
| Unit 2 | Study guide prototype (3 approaches, for review) | ✓ | n/a | ✓ |

Other units (1, 3, 4, 5, 6) are planned but the public interactives haven't been built yet.

## License

All rights reserved unless otherwise noted. Cell diagrams used in Section 2 are by Mariana Ruiz Villarreal (LadyofHats) via Wikimedia Commons, released to the public domain.
