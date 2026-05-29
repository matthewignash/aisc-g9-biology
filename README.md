# AISC HS Grade 9 Biology

NGSS-aligned curriculum materials and student-facing interactives for **Grade 9 Biology** at the American International School Chennai (AISC).

Author: Matthew Ignash

## What's in here

```
.
├── HS G9 Bio Unit 1 Scientific Inquiry and Lab Safety (25-6)/
├── HS G9 Bio Unit 2 Cell Biology (25-6)/    ← current pilot scope
│   ├── Section 1 Interactive/                 (deployed)
│   ├── Section 2 Interactive/                 (built, awaiting Apps Script package)
│   ├── Unit 2 Design Brief - Interactive Materials.md
│   └── Unit 2 Website Build Guide - Sections 2-3 and Landing.md
├── HS G9 Bio Unit 3 Cellular Energetics (25-6)/
├── HS G9 Bio Unit 4 Matter and Energy (25-6)/
├── HS G9 Bio Unit 5 DNA to Protein Synthesis (25-6)/
├── HS G9 Bio Unit 6 Mendelian Genetics (25-6)/
└── _shared/                                   shared CSS / JS / Apps Script files
    ├── apps-script/                            ContentLoader.gs, ServeSection.gs
    ├── css/                                    tokens.css, base.css, components.css
    ├── js/                                     storage, section-shell, practice modules
    ├── conventions.md                          curriculum-wide conventions
    └── content-schema.md                       Google Sheet content schema
```

## Why this exists

A 2025–26 student survey at AISC found that science is the class where 9th graders use AI the most. The honest interpretation is that current materials aren't meeting student needs — students are filling the gap with AI tutors. This repo is the rebuild: phenomenon-driven, AI-literacy integrated, lab-first, with the HTML page itself as the primary student-facing surface.

The full rationale is in [`HS G9 Bio Unit 2 Cell Biology (25-6)/Unit 2 Design Brief - Interactive Materials.md`](./HS%20G9%20Bio%20Unit%202%20Cell%20Biology%20%2825-6%29/Unit%202%20Design%20Brief%20-%20Interactive%20Materials.md).

## How students reach this material

**Not** via Vercel, Netlify, GitHub Pages, or any third-party CDN — AISC's network blocks those. Deployment is:

1. Each section's HTML is served by a small **Google Apps Script web app** (`apps-script/`).
2. The web app is **embedded inside Google Sites** as an iframe.
3. Students click into the unit area of the class Google Site to reach it.

The Apps Script web app pulls structured content (multiple-choice questions, fill-in-the-blank items, drag-and-drop cards, AI critique passages, organelle definitions) from a master Google Sheet per section, so content can be edited without redeploying. Reading prose and page structure stay in the HTML.

See `_shared/conventions.md` for the curriculum-wide conventions and `_shared/content-schema.md` for the Sheet schema.

## Status

| Unit | Section | Standalone HTML | Apps Script package | Deployed |
|---|---|---|---|---|
| Unit 2 | Section 1 — Cell theory + organization | ✓ | ✓ | ✓ |
| Unit 2 | Section 2 — Inside the cell | ✓ | (next) | — |
| Unit 2 | Section 3 — Membrane & transport | — | — | — |
| Unit 2 | Landing page | — | — | — |

Other units have unit plans only at this stage.

## License

All rights reserved unless otherwise noted. Cell diagrams used in Section 2 are by Mariana Ruiz Villarreal (LadyofHats) via Wikimedia Commons, released to the public domain.
