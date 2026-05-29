# Unit 2 Cell Biology — Website Build Guide

**Scope:** Section 2 (Cell Structure), Section 3 (Membrane & Transport), and a Unit 2 Landing Page.
**Audience for this guide:** Claude Code, picking up after the Section 1 build.
**Author:** Matthew Ignash
**Drafted:** 2026-05-23

---

## 1. What this guide is and is not

This guide is a **continuation** of the original Design Brief at `Unit 2 Design Brief - Interactive Materials.md` (same folder). That brief establishes the *why* (AISC's 9th-grade AI usage survey signal), the four design lenses (phenomenon-driven, AI-literacy integrated, lab-first/data-first, self-paced interactive HTML), and the anchoring phenomenon (idli batter fermentation). It also sets the visual direction, the American English spelling convention, and the no-external-dependencies constraint.

**Do not re-derive any of that. Read the original brief first, then use this guide as the build spec for the next pieces.**

This guide adds:

- The spec for **Section 2 (Cell Structure)** — content, blocks, practice, AI critique
- The spec for **Section 3 (Membrane & Transport)** — same
- The spec for the **Unit 2 Landing Page** — what it contains and where it lives
- **Cross-section threads** (image observation skill, idli batter continuity, summative skill alignment) that connect all three sections
- **Architecture replication notes** (Sections 2 and 3 follow Section 1's pattern exactly)
- **Google Classroom integration pattern** (already validated for Section 1, replicate for 2 and 3)

This guide does NOT re-spec what Section 1 does. If you find yourself uncertain about a structural decision, look at the Section 1 build at `Section 1 Interactive/` first.

---

## 2. What's already built — do not duplicate

The `Section 1 Interactive/` folder contains a working build. The pattern Claude Code arrived at is:

- A single self-contained HTML page (`section1.html`) for local preview, identical in content to the deployed `apps-script/Index.html`.
- A small Apps Script project (`apps-script/`) with `Code.gs` (entry point + Sheet ID), `ContentLoader.gs` (Sheet → JSON, cached for 5 min), `ServeSection.gs` (reusable `doGet` that injects the JSON into the HTML template), and a one-time `SeedSheet.gs` that populates the master Sheet.
- A master Google Sheet (`G9 Bio U2 S1 — Content`) with seven tabs for editable content (`meta`, `mcq`, `fill_blank`, `drag_order`, `ai_critique_text`, `ai_critique_errors`, `levels`).
- An AISC-domain-scoped web app deployment (`/a/macros/aischennai.org/`) so only signed-in school accounts can open it.
- A `content-snapshot.json` for version control.

**Replicate this architecture for Sections 2 and 3.** Different Sheet IDs, different content, same code structure. The `ContentLoader.gs` and `ServeSection.gs` files are intentionally section-agnostic — they should be copied verbatim. Only `Code.gs` changes (different `SHEET_ID`).

---

## 3. New deliverables

Three new folders under `HS G9 Bio Unit 2 Cell Biology (25-6)/`:

```
Section 2 Interactive/
├── section2.html                  (standalone preview)
├── content-snapshot.json
├── sheet-link.md
└── apps-script/
    ├── Code.gs                    (new SHEET_ID)
    ├── ContentLoader.gs           (verbatim from Section 1)
    ├── ServeSection.gs            (verbatim from Section 1)
    ├── SeedSheet.gs               (Section 2 content seed)
    ├── Index.html                 (mirrors section2.html)
    └── README.md                  (deployment steps, mostly copied)

Section 3 Interactive/
└── (same structure as Section 2)

Unit 2 Landing/
├── landing.html                   (standalone preview / fallback)
├── google-sites-content.md        (paste-ready content for Sites editor)
└── README.md                      (setup instructions for Matthew)
```

Build in this order: **Section 2 first**, **Section 3 second**, **Landing page last** (it can only be assembled meaningfully once 2 and 3 exist and have URLs).

---

## 4. Architecture: replicate Section 1's pattern

Three rules.

**Rule 1: Content lives in Sheets, not in the HTML.** All MC questions, fill-in-blank items, drag-order labels, AI critique text and errors, organelle definitions, and any other editable content goes into the master Sheet for that section. The HTML reads them via the `contentJson` template variable. This lets Matthew edit content without redeploying.

**Rule 2: Reading prose stays in the HTML.** The actual narrative content of the reading sections (B1, B2, etc.) is hard-coded in the HTML. Putting it in Sheets is overkill and makes formatting fragile. Sheets are for structured, repeatable, list-shaped content. Prose is in HTML.

**Rule 3: One Sheet per section.** Don't try to share a Sheet across sections. Each section gets its own master Sheet, its own `SHEET_ID`, its own deployment URL. Keeps everything independent and lets each section be edited without touching the others.

The reusable files (`ContentLoader.gs`, `ServeSection.gs`) should be **byte-identical** across all three sections. If they need to evolve, evolve them once and update all three. There is a `_shared/apps-script/` directory referenced in Section 1's README comments — if it doesn't exist yet, create it and treat it as canonical, then copy from it into each section's folder.

---

## 5. Section 2 build spec — Cell Structure

### 5.1 Phenomenon (Block A: continuation of the idli batter story)

Section 1 framed the question "is the idli batter alive?" Section 2 zooms inside.

Opening framing (paste this voice; refine wording but keep the move):

> Take a single drop of your fermenting idli batter and put it under a microscope. You don't see one kind of life. You see two.
>
> Bigger, rounder cells with visible internal structures — these are yeasts. Saccharomyces cerevisiae or a relative. They have a nucleus, mitochondria, a defined cytoskeleton. They are **eukaryotic cells**.
>
> In between the yeasts, you see much smaller shapes — rods, sometimes pairs, sometimes chains. These are lactic acid bacteria — Leuconostoc and Lactobacillus species. They have a cell membrane and DNA, but no nucleus and no membrane-bound organelles. They are **prokaryotic cells**.
>
> Two kinds of life, sharing one bowl, eating the same sugars, producing different wastes.
>
> **Why does the world have room for both? Why hasn't one outcompeted the other?**

Above the fold: short framing paragraph (above), an image placeholder for a side-by-side micrograph of yeast and bacteria (`[IMAGE: side-by-side micrograph — yeast cells (~8 μm, visible nucleus) next to lactic acid bacteria (~1-2 μm, rod-shaped); annotate sizes]`), and an opening prompt: *"Write down your first guess. Why is there room for both kinds of cell?"* Saved to localStorage, surfaced again in Block F.

### 5.2 Reading (Block B)

Four subsections. Target combined word count: 1800–2200 words.

**B1. Two kinds of cells.** Define prokaryotic and eukaryotic clearly. The fundamental difference: presence of a nucleus and membrane-bound organelles. Use the idli batter example. Include a comparison table — sourced from `cell_compare` Sheet tab (see schema below) so it's editable.

Cover: cell membrane (present in both), cell wall (present in both bacteria and plant cells but made of different stuff — peptidoglycan vs. cellulose; brief mention now, deeper in B3), cytoplasm, ribosomes (different sizes — 70S vs 80S, mention but don't belabor), DNA (circular and free-floating in prokaryotes; linear and packaged with proteins in eukaryotes), nucleoid region vs. nucleus.

**B2. Inside the eukaryotic cell — the organelles.** This is the heaviest content section in Unit 2. Cover, with one paragraph + one concrete example for each:

- Nucleus (contains DNA, the cell's "control center")
- Nucleolus (where ribosomes are assembled)
- Ribosomes (protein synthesis — both free in cytoplasm and bound to ER)
- Rough endoplasmic reticulum (proteins destined for export)
- Smooth endoplasmic reticulum (lipid synthesis, detoxification, calcium storage)
- Golgi apparatus (modifies, packages, and ships proteins from the ER)
- Mitochondria (cellular respiration — ATP production)
- Chloroplast (photosynthesis — plants only)
- Vacuole (storage; large central vacuole in plant cells)
- Lysosome (cellular recycling — animal cells)
- Cell membrane (selectively permeable boundary — deeper dive in Section 3)
- Cell wall (rigid outer layer — plant cells, fungi, bacteria — different materials)
- Cytoskeleton (structural network — actin, microtubules, intermediate filaments; brief)
- Vesicles (small membrane-bound transport sacs)

End with a one-paragraph synthesis on **compartmentalization**: why having organelles is an evolutionary advantage. Enzymes can be concentrated, damaging substances can be contained, conditions like pH can be maintained for specific reactions. This is verbatim content from the co-teacher's study guide (`Cell Biology Study Guide 2024.docx`), surfaced explicitly here so students see the connection between the study guide they have and the reading they're doing.

**B3. Plant vs. animal cells.** A comparison section. What's in both (all the eukaryotic organelles, plasma membrane, cytoplasm), what's unique to plant cells (cell wall, large central vacuole, chloroplasts, plasmodesmata), what's unique to animal cells (lysosomes, centrioles, smaller/no vacuoles, no cell wall). Include the mushroom example from the summative: fungi have cell walls (chitin, not cellulose) but no chloroplasts — so they're heterotrophs, getting food by absorbing nutrients. This is a deliberate seed for the summative's Part B mushroom reasoning question.

**B4. Endosymbiotic theory.** This is the explicit Part C summative prep. Tell the story:

- About 2 billion years ago, the first eukaryotic cells appeared. They were larger than prokaryotes and had internal compartments — but where did those compartments come from?
- The endosymbiotic theory proposes that **mitochondria and chloroplasts were once free-living prokaryotes** that were engulfed by a larger ancestral cell. Instead of being digested, they survived inside the cell and entered into a partnership.
- Evidence: mitochondria and chloroplasts have **their own DNA** (circular, like prokaryotes), have **their own ribosomes** (70S, like prokaryotes — not 80S like the rest of the eukaryotic cell), have **double membranes** (consistent with having been engulfed), and **divide on their own schedule** by binary fission, not in sync with the host cell.
- Why it matters: the eukaryotic cell isn't a single evolved lineage; it's a fusion. Every animal, plant, fungus, and protist alive today is a chimera. You are, in part, descended from a swallowed bacterium.

This is also a callback to the idli batter: two kinds of life living together in one bowl. Two billion years ago, that partnership became permanent.

### 5.3 Interactive model (Block C): clickable cell explorer

Three modes, toggled at the top: **Plant cell / Animal cell / Prokaryotic cell**.

Each mode renders a labeled diagram (SVG, authored — use the existing community SVGs as a starting point if helpful but the labels and styling should match the page). Clicking any organelle pops up:

- Organelle name
- One-sentence function
- One concrete example or "fun fact"
- A note on whether it's present in the OTHER two cell types (with quick toggles to compare)

This satisfies the unit plan's "compare different cell types" success criterion. Implementation note: don't use external image assets. Either embed SVG inline or use a placeholder with a clear `[TODO: SVG of plant cell]` marker and a written description so Matthew can drop in art later.

### 5.4 Practice (Block D)

Four sub-blocks. Pull questions from the Section 2 master Sheet (same schema as Section 1).

**D1. Multiple choice — 8 questions.** Pull from the `mcq` tab. Distribute across topics: 2 on pro vs eukaryotic, 3 on organelle function identification, 2 on plant vs animal differences, 1 on endosymbiotic theory. Each question has an explanation that shows on answer reveal.

**D2. Drag-and-drop — plant vs animal vs both.** Three columns labeled "Plant only," "Animal only," "Both." Students drag organelle cards into the correct column. Cards: chloroplast (plant), cell wall (plant), large central vacuole (plant), centrioles (animal), lysosomes (animal — primarily), nucleus (both), mitochondria (both), ribosomes (both), Golgi apparatus (both), endoplasmic reticulum (both), cell membrane (both). **This is direct rehearsal for Part B Q3 of the summative — the Venn diagram error-finding question.** Use a new Sheet tab `drag_columns` with schema: `id | label | correct_column`.

**D3. Fill-in-the-blank — 6 questions.** Pull from `fill_blank` tab. Mix of organelle function and structural identification. Examples to seed: "The organelle that makes ATP through cellular respiration is the ______." (mitochondria); "Plant cells have a rigid outer layer made of cellulose called the ______." (cell wall); "Mitochondria have their own ______, which supports the endosymbiotic theory." (DNA or ribosomes — accept either).

**D4. CER — micrograph interpretation.** Provide a placeholder for a micrograph (`[IMAGE: electron micrograph of an unknown eukaryotic cell — should clearly show nucleus, mitochondria, ER, possibly chloroplasts]`). Prompt: *"Is this a plant cell or an animal cell? Make a claim, identify at least three pieces of evidence from the image, and explain your reasoning. 100–150 words."* Save to localStorage. Copy-to-clipboard button for paste into a Classroom Doc.

### 5.5 AI critique (Block E)

Author a deliberately-flawed AI response on plant vs animal cells. Three errors minimum, varied difficulty:

- One factual error (e.g., "Animal cells have cell walls made of cellulose")
- One conceptual error (e.g., "Plant cells don't need mitochondria because they have chloroplasts" — this is the *exact* misconception students commonly hold)
- One historical or structural subtlety (e.g., "Both plant and animal cells contain centrioles" — animal cells do, plant cells generally don't)

Students click on the errors (clickable spans) and explain each one in a text box. Save to localStorage. The flawed text and the error list live in the Sheet (`ai_critique_text` and `ai_critique_errors` tabs, same schema as Section 1).

### 5.6 Revisit (Block F)

Surface the student's initial guess from Block A: *"Why is there room in nature for both kinds of cell?"* Prompt: *"Now that you've worked through the unit, would you change your answer? What in the reading changed your thinking?"* Short text field, saved to localStorage.

### 5.7 Image observation thread

At the top of B1 (before students start reading), include a short image-observation activity. Provide a single micrograph (the same one used in Block A is fine). Prompt: *"Before you read further, look at this image for 30 seconds. Write down: (1) one thing you see clearly, (2) one thing you're not sure about, (3) one question you have."* Three short text fields. Saved to localStorage. This activity repeats in Section 3 with a different image — by the time students hit Part C of the summative, they've done structured image observation three times across the unit and the muscle memory is there.

### 5.8 Sheet schema additions for Section 2

Extend the Section 1 schema with these new or modified tabs:

- `cell_compare` — `feature | prokaryote | eukaryote | notes` — drives the B1 comparison table
- `organelles` — `id | name | function | example | in_plant | in_animal | in_prokaryote | notes` — drives the Block C interactive model
- `drag_columns` — `id | label | correct_column` — drives the D2 plant/animal/both drag activity (correct_column ∈ {plant, animal, both})

The standard tabs (`meta`, `mcq`, `fill_blank`, `ai_critique_text`, `ai_critique_errors`) carry over unchanged.

---

## 6. Section 3 build spec — Membrane & Transport

### 6.1 Phenomenon (Block A)

Continues the idli batter story. Section 2 zoomed inside the cell. Section 3 zooms onto the membrane.

Opening framing:

> The microbes in your idli batter are eating sugars from the rice and dal. They're producing carbon dioxide — that's what makes the batter rise. They're also producing lactic acid — that's what makes it sour.
>
> But here's the thing. The sugars are *outside* the microbe. The CO₂ has to get *out* of the microbe and into the bubble. The lactic acid has to get *out* into the surrounding batter.
>
> All of that movement happens across a single thin layer — the cell membrane. About 5 nanometers thick. Without it, the cell isn't a cell. With it, the cell is selective about what crosses and what doesn't.
>
> **Why doesn't everything just leak through? And how does anything get across at all?**

Above the fold: framing paragraph, `[IMAGE: cross-section illustration of cell membrane with phospholipids and embedded proteins]`, opening prompt: *"What do you think makes some things cross a cell membrane easily, and others not at all? Write your first guess."* Saved to localStorage.

### 6.2 Reading (Block B)

Four subsections. Combined word count: 1800–2200.

**B1. The plasma membrane — a phospholipid bilayer.** Define phospholipids (hydrophilic head, hydrophobic tails). Explain why they spontaneously form a bilayer in water. Introduce cholesterol's role (fluidity regulator). Fluid mosaic model. Selective permeability comes from this structure: things that "look like" the tails (small, nonpolar) can cross; things that don't (large, polar, charged) cannot.

**B2. Membrane proteins.** Five functional categories: channel proteins (passive tunnels for specific molecules), carrier proteins (bind and shuttle), pumps (use energy to move things against gradient), receptors (signal reception), and enzymes (catalyze reactions at the membrane surface). One concrete example each.

**B3. Passive transport — no energy required.** Cover simple diffusion (small nonpolar molecules: O₂, CO₂), facilitated diffusion (through channels or carriers, still down concentration gradient), and osmosis (water, specifically). For osmosis, introduce the three solution types — hypotonic, isotonic, hypertonic — and what happens to a cell in each (animal cells: lyse vs. normal vs. shrivel; plant cells: turgid vs. flaccid vs. plasmolyzed). This is the lead-in for the Section 3 lab (potato osmosis).

Include factors affecting diffusion rate: concentration gradient steepness, temperature, surface area, membrane permeability. The unit plan calls this out explicitly.

**B4. Active transport, endocytosis, exocytosis.** Active transport uses ATP to pump against the gradient — use the Na+/K+ pump as the canonical example. Endocytosis (cell eats — phagocytosis for large solids, pinocytosis for fluids). Exocytosis (cell exports — how the Golgi sends vesicles to the membrane). Connect back to the idli batter: when the yeast cell produces CO₂, the CO₂ leaves by simple diffusion. When it produces ethanol or lactic acid, those also leave by diffusion. The microbes are eating sugar (which crosses via specific transporters — facilitated diffusion or active transport depending on the organism).

### 6.3 Interactive model (Block C): membrane transport sandbox

A phospholipid bilayer rendered in the page. A panel of draggable molecules on the side: water (H₂O), oxygen (O₂), carbon dioxide (CO₂), glucose, sodium ion (Na⁺), large protein.

Students drag a molecule onto the membrane. The animation shows:

- Water — crosses freely (small, polar but tiny enough to slip through; technically uses aquaporins but we can simplify here)
- O₂ and CO₂ — cross freely (small, nonpolar)
- Glucose — needs a carrier protein. Shows the carrier rendering, accepting the glucose, flipping orientation.
- Na⁺ — needs a pump. Shows the pump using ATP to move it across against gradient.
- Large protein — does not cross. Shows it bouncing off.

Each molecule click should show a popup: "Transport type: ___. Energy needed: yes/no. Direction: down/up gradient."

Implementation note: keep this in SVG + JS. No external graphics libraries. The animation can be CSS transitions — it doesn't need to be Three.js or anything heavy.

### 6.4 Practice (Block D)

**D1. Multiple choice — 8 questions.** Mix transport types, osmosis, factors affecting diffusion. Pull from `mcq` Sheet tab.

**D2. Drag-and-drop — sort by transport mechanism.** Four columns: "Simple diffusion," "Facilitated diffusion," "Osmosis," "Active transport." Molecules/scenarios as cards (e.g., "CO₂ leaving a cell," "Glucose entering a cell via GLUT4," "Water moving from low-solute to high-solute side," "Na⁺ pumped out against gradient"). Use `drag_columns` schema from Section 2.

**D3. Fill-in-the-blank — 6 questions.** Vocabulary-heavy: hypotonic/isotonic/hypertonic, turgid/flaccid/plasmolyzed, channel protein, carrier protein, pump.

**D4. CER — integrate the osmosis lab.** This is the differentiator. The unit plan includes a potato osmosis lab where students measure mass change in different sucrose concentrations. Prompt:

> Look at your potato osmosis lab data. Identify one solution where your potato gained mass and one where it lost mass. Make a claim about what type of solution each was (hypotonic, isotonic, or hypertonic relative to the potato). Use your mass change data as evidence. Explain your reasoning using the concept of water moving down its concentration gradient. 150–200 words.

This is the explicit "student data" lens from the original brief — AI cannot do this for them because the data is theirs. The HTML cannot pre-fill their data; it just has to provide the prompt and the saved-to-localStorage text field.

### 6.5 AI critique (Block E)

Author a flawed AI response to: *"Why do red blood cells burst when placed in pure water?"*

A version with three deliberate errors:

> When red blood cells are placed in pure water, they burst because water is attracted to the cells. The cells absorb the water through a process called active transport, where the cell uses energy to pull water in. Eventually the cell becomes too full and the cell wall ruptures, releasing the contents.

Errors: (1) water isn't "attracted" — it moves down its concentration gradient by osmosis (passive), (2) it's osmosis, not active transport — no ATP used, (3) red blood cells don't have a cell wall (that's a plant cell feature) — animal cells have only a membrane.

Same clickable-spans + explanation format as Section 1.

### 6.6 Revisit (Block F)

Surface the student's Block A guess. Prompt for revision.

### 6.7 Image observation thread (continued)

At the top of B1, include the image observation activity again — this time with the phospholipid bilayer cross-section or a TEM micrograph showing a cell membrane. Same three prompts (see clearly / unsure / question).

### 6.8 Sheet schema for Section 3

Same as Section 2, plus:

- `transport_molecules` — `id | name | size | polarity | charge | transport_type | needs_energy | direction` — drives the Block C interactive model

---

## 7. Unit 2 Landing Page

### 7.1 Where it lives

The landing page lives in **Google Sites**, not as a separate Apps Script web app. It's the entry point students hit when they click into the Unit 2 area of the class site. The three Section pages (deployed Apps Script web apps) get embedded *inside* this Site as sub-pages.

This means the landing page deliverable is:

1. A standalone `landing.html` file (in `Unit 2 Landing/`) that Matthew can preview locally to see the design.
2. A `google-sites-content.md` file with paste-ready copy and structural instructions for assembling the equivalent in Google Sites' native editor.
3. A `README.md` explaining how to set up the Sites navigation: landing page → embedded Section 1 page → embedded Section 2 page → embedded Section 3 page.

### 7.2 What the landing page contains

Top of page: the unit title, the anchoring question, and a hero image.

> **Unit 2 — Cell Biology**
>
> *How does a bowl of batter become alive?*
>
> [Hero image placeholder: idli batter in a bowl, side-by-side with a micrograph of yeast and bacteria, captioned: "Same bowl. Two kinds of life. Three questions: What makes it alive? What's inside the cells? How do they trade with the world?"]

Middle of page: three large cards, one per section. Each card has a title, a one-sentence framing question, and a "Start →" button that navigates to the embedded section page.

> **Section 1 — Cell Theory & the Levels of Life**
> *Is the batter alive? What does "alive" even mean?*
> [Start →]
>
> **Section 2 — Inside the Cell**
> *Under the microscope, you see two kinds of life. Why?*
> [Start →]
>
> **Section 3 — The Cell Membrane**
> *How does anything get in or out of a cell?*
> [Start →]

Bottom of page: a "Study Tools" area. For now, this contains:

- A link to the Cell Biology Study Guide (`Cell Biology Study Guide 2024.docx`) labeled as: *"Your study guide is your reference. Use it to check your work, not to start your work."* This frames the relationship explicitly per the conversation in the design discussion.
- A vocabulary glossary (alphabetized list of unit terms — pull from the unit plan + study guide). This can be inline on the page or its own Sites sub-page.
- A placeholder for the Study Guide Companion (to be built later).
- A placeholder for the Summative Skills Map (to be built later).

### 7.3 Visual style

Match the visual style of the Section pages. Same color palette (teal `#0F3D3E`, sage `#7FB069`, coral `#F2A65A`, off-white `#FAFAF7`, charcoal `#1A2B2C`). Same font stack (serif headers, system sans for body). No emoji.

When translated into Google Sites' native editor, exact color matching may be limited by Sites' theme controls — get as close as the editor allows. The standalone `landing.html` preview file should show what the *ideal* looks like, and the `google-sites-content.md` file should give Matthew the text + the closest Sites-equivalent settings.

---

## 8. Cross-section threads

Three things that must run consistently across all three section pages.

### 8.1 The idli batter through-line

Every section opens by extending the idli batter story. Section 1 asked "is it alive?" Section 2 zooms inside to "what's living in there?" Section 3 zooms onto the membrane to "how do they exchange with the world?" By the end of the unit, students have built up a complete biological account of one bowl on a kitchen counter. Resist the urge to invent new phenomena for each section — the continuity is the point.

### 8.2 Image observation skill

Every section's Block B begins with the image observation activity (see-clearly / unsure / question). Same three prompts each time. Different image each time. This is direct preparation for the summative's Part C, which asks students to observe an image and identify a misconception it introduces. Three reps across the unit means students aren't doing this skill cold on the test.

### 8.3 Study guide companion callouts

In each section, at the end of Block B, include a callout box that names which pages of the co-teacher's `Cell Biology Study Guide 2024.docx` align with this section's reading. Example for Section 2:

> **Connect to your study guide.** This section covers the same material as pages 3–7 of your study guide (organelle structures and functions, plant vs animal cells, similarities and differences between prokaryotes and eukaryotes). Use the guide as your reference when you study — but the reasoning skills practiced on this page are what the summative tests.

This explicitly positions the study guide as reference, not lesson. Reinforces the framing Matthew is establishing with his students.

---

## 9. Summative skill alignment

Each block of each section is designed to rehearse a specific kind of summative thinking. The mapping:

| Summative section | Skill | Where in Sections 2 & 3 |
|---|---|---|
| Part A (recall MC, ~18%) | Definition recall | B reading + D1 MC blocks in both sections |
| Part B Q1-2 (identify structures, explain function) | Identification + explanation | Section 2 B2 reading + D3 fill-in |
| **Part B Q3 (Venn diagram errors)** | **Misconception ID in classification** | **Section 2 D2 drag-and-drop (plant/animal/both)** |
| Part B Q4 (micrograph organelle + function) | Image interpretation | Section 2 D4 CER (micrograph) + image observation thread |
| Part B Q5 (plant cell diagram error) | Visual misconception ID | Section 2 E AI critique + image observation thread |
| Part B Q6 (tissue/organ distinguish) | Levels reasoning | Section 1 + Section 2 Block B3 |
| **Part B Q7 (mushroom reasoning)** | **Application — apply concepts to novel case** | **Section 2 B3 reading (mushroom example seeded) + D4 CER** |
| Part C all (endosymbiotic theory) | Synthesis, image observation, evolutionary reasoning | **Section 2 B4 dedicated section + image observation thread (3 reps)** |
| (Lab summative — potato osmosis) | Data interpretation + CER | Section 3 D4 CER (uses their own lab data) |

The bolded rows are the ones where Sections 2 and 3 are doing the heavy lifting for the summative. If those land, students will be in good shape across all three parts of the test.

---

## 10. Google Classroom integration

Replicate the pattern validated for Section 1. For each section, in Google Classroom:

Create an assignment per section with:

1. **The web app URL** as a link attachment (the deployed Apps Script URL for that section).
2. **A Google Doc template** set to "Make a copy for each student" containing the CER prompt for that section's Block D4. Title format: `[Student name] — Section N CER`.

Students click the URL, complete the in-page work (MC, drag-and-drop, fill-in, AI critique, image observation — all autosave to localStorage), write their CER in Block D4's text field, click "Copy to clipboard," paste into their per-student Doc, and submit the Doc. The Doc submission is the gradeable artifact in Classroom.

For Section 3 specifically, students should be told to **complete the potato osmosis lab first**, then come to the HTML page to do the CER on their data. The CER prompt is built around their own measurements.

Don't build automatic Classroom assignment creation or auto-submit features. They're fragile and overkill.

---

## 11. Pacing constraints

Each section page should be doable in ~50 minutes of focused student work (the same as Section 1). This is asynchronous time — not in-class time. The pacing model the design supports:

- Section 1: 4 class periods. HTML as homework.
- Section 2: 5–6 class periods (it's content-heavier). HTML as homework. In-class includes the microscopy lab + a separate organelle role-model activity (the unit plan calls for this) + endosymbiotic theory discussion.
- Section 3: 5 class periods. HTML page assigned after the potato osmosis lab is run so students have their own data.

Total Unit 2: ~14–15 class periods, which matches a standard 3-week unit at 5 periods/week.

The HTML page should NOT try to do everything. If a topic is best served by a lab, leave it for the lab. If a topic is best served by class discussion, leave it for discussion. The HTML covers content delivery + structured practice + AI critique. That's enough.

---

## 12. Out of scope for this build

To keep the deliverables tight:

- No backend tracking of student progress (Classroom Doc submission is the gradeable artifact)
- No teacher dashboard inside the HTML
- No automatic grading of the CER (text-based, requires teacher feedback)
- No video assets — placeholders only, Matthew records footage later
- No accessibility audit beyond basic semantic HTML and alt text on images
- No translation / EAL versions — vocabulary support comes from in-class card resources per the unit plan UDL section
- No mobile-specific layout beyond responsive design (page must be readable + functional at 768px width)
- No Study Guide Companion document — separate deliverable, not part of this build
- No Summative Skills Map document — separate deliverable, not part of this build
- No revisions to Section 1 — that's a separate task after Matthew's pilot

---

## 13. Build order

Recommend Claude Code follows this sequence:

1. **Set up `_shared/apps-script/` directory** (if it doesn't exist) and put canonical copies of `ContentLoader.gs` and `ServeSection.gs` there. Confirm Section 1's versions are byte-identical to the shared ones.
2. **Section 2 first.** Build `section2.html` as standalone (working interactivity, placeholder Sheet content inline). Verify it works in a browser. Then build the Apps Script package (`Code.gs`, `SeedSheet.gs` for Section 2 content, copies of shared files, `Index.html`, `README.md`). Update `content-snapshot.json` from the seeded content.
3. **Section 3 second.** Same pattern. The interactive model (membrane transport sandbox) is the biggest new piece — budget time for that.
4. **Landing page last.** Build `landing.html` standalone, generate the `google-sites-content.md`, write the `README.md` for Sites assembly.

After each section is built, present the standalone HTML file to Matthew for review before deploying to Apps Script. Easier to iterate on the standalone than on the deployed version.

---

## 14. When in doubt

The design constraint that wins is from the original Design Brief: *will an AI tool be able to do this assignment for the student? If yes, redesign until the answer is no.*

If a build decision violates one of the four design lenses (phenomenon-driven, AI-literacy integrated, lab-first / data-first, self-paced interactive HTML as primary surface), flag it for Matthew before proceeding rather than guessing.

If you need to deviate from the Section 1 architecture — e.g., a new Sheet tab type, a different drag mechanic, an inline image rather than a placeholder — note it in the README for that section so the divergence is visible.

---

*End of build guide.*
