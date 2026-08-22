# Unit 3 — Cell Structure (AY 2026-27)

Three student-facing interactives for Grade 9 Biology Unit 3. They pair with the block pages
on `g9-bio-site`, which name them and link to them.

| Folder | Page | Used at |
|---|---|---|
| `section-1/` | Cell Theory and Evidence | Blocks 1 and 3 |
| `section-2/` | Inside the Cell | Blocks 4 to 7 |
| `section-3/` | Why Cells Stay Small | Blocks 10 and 11 |

## Where they are served from

**Apps Script, not this domain.** AISC blocks the `g9-bio-site` domain for student accounts,
so every one of these is deployed as an Apps Script web app inside Google Workspace and
embedded in the class Google Site. Each `section-N/apps-script/README.md` is the deployment
walkthrough for that page. The standalone `section-N/index.html` in this repo is the same page
with a site nav on it, for preview and for editing.

Once a page is deployed, put its `script.google.com` URL on the matching block pages. The seven
steps that name an interactive are listed in `g9-bio-site/INTAKE-NOTES.md`, Unit 3, note 3. Only
one of the seven currently carries a link; the rest name the interactive without linking it.

## Where they came from

Sections 1 and 2 are re-cuts of the Unit 2 pilot pages, not new writing.

**Section 1** is `unit-2/section-1/` with the Unit 2 material removed: the seven characteristics
of life, the levels of organization, the levels explorer, and the levels drag sort all belong to
Unit 2 Characteristics of Life now. What is left is the bowl, the scientists, the practice and
the AI critique. Pasteur was added to the scientists, because Unit 1 already taught the
swan-neck flask and the third principle needs him. Part C is gone, so the page runs A, B, D, E,
F, and the Block 1 lesson describes it that way.

**Section 2** is `unit-2/section-2/` as built, with the organelle inventory trimmed from
fourteen to **seven plus ribosomes**: nucleus, cytoplasm, cell membrane, cell wall, chloroplast,
vacuole, mitochondrion. Endoplasmic reticulum, Golgi, lysosome, centriole, cytoskeleton, vesicle
and nucleolus are out of the reading, the explorer, the drag cards, the fill-ins and the
multiple choice. The endosymbiosis card and the plant / animal / both sort stay. The AI critique
stays but no longer turns on centrioles; its third error is now the ribosome trap, which is the
one Block 6 names.

Two things to know about the trimmed section 2. The Wikimedia diagrams still carry their full
printed labels, because they are textbook figures and stripping labels out of the artwork is a
different job; a line under the explorer tells students the list is their list and the picture
carries more. And with only these seven structures, **the animal-only column of the sort is
correctly empty**, because there is nothing an animal cell has that a plant cell lacks. The card
says one column may finish empty without saying which.

**Section 3** is new. Same six-block architecture, same shared CSS and JS, one new shared
module, `_shared/js/cube-model.js`, for the slider.

## The Section 3 numbers

The class data plotted beside the slider is 1, 2, 8, 18 and 32 minutes for cubes of side 0.5, 1,
2, 3 and 4 cm. **The practice items stop at 3 cm on purpose.** Summative Q10 asks students to
calculate surface area, volume and ratio for a 4 cm cube, a size the lab does not use, so the
4 cm row must not be a fill-in answer anywhere on this page. The slider will happily compute
4 cm, which is intended: Q10 tests knowing that surface area is 6s² and volume is s³, not
arithmetic.

## Editing

- **Content** (questions, answers, the AI passage, the class data) lives in the master Sheet per
  section. Edit the Sheet, reload the deployed URL. `content-snapshot.json` is the frozen copy in
  git; refresh it with `exportSectionNSnapshot` when the Sheet moves ahead of it.
- **Prose, layout and styling** live in `section-N/index.html`. Edit that, then run:

  ```
  python3 unit-3/make-apps-script.py
  ```

  which rewrites every `section-N/apps-script/Index.html` from its standalone page. Paste the
  result into the Apps Script project and redeploy as a new version. Skipping that step is the
  one way the preview page and the page students actually see can disagree.
- `SeedSheet.gs` is generated from `content-snapshot.json`, so the seeder and the page cannot
  start out disagreeing. It is single use; delete it from the Apps Script project after it runs.

## Two things that are not done

- **No `script.google.com` URLs exist yet.** Nothing is deployed. Until it is, the block pages
  name these interactives without linking them.
- **The landing page still uses last year's unit numbering.** `index.html` at the repo root maps
  Unit 2 to Cell Biology and Unit 3 to Cellular Energetics, which was the 2025-26 syllabus. Under
  the 2026-27 syllabus Unit 2 is Characteristics of Life and Unit 3 is Cell Structure, which is
  this folder. The unit map and the preview list were left alone rather than renumbered, because
  which year the public preview presents is an editorial call, not a build one.
