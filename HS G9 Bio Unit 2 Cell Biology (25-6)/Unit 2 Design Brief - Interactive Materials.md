# Unit 2 Cell Biology — Design Brief for Interactive Student Materials

**Course:** HS G9 Biology, AISC (American International School Chennai)
**Unit:** Unit 2 — Cell Biology
**Author:** Matthew Ignash
**Brief drafted:** 2026-05-21
**Audience for this brief:** Claude Code (or any coding agent) tasked with building the deliverables described below.

---

## 1. Why this brief exists

A 2025–26 student survey at AISC found that science is the class where 9th graders use AI the most. The honest interpretation is that current materials aren't meeting student needs — students are filling the gap with AI tutors. The traditional G9 Biology approach (lecture slides → reading → worksheets → test) inherits from a different teacher and is not what I want to continue.

This brief specifies a redesigned student-facing experience for Unit 2 (Cell Biology) that is built to be **hard to shortcut with AI**, **engaging enough that students don't reach for AI first**, and **deployable inside AISC's IT environment** (where Vercel, Netlify, and many CDNs are blocked, but Google Workspace and Apps Script are not).

The unit plan, NGSS standards, success criteria, and assessment structure stay as written. What changes is the delivery: how students encounter content, how they practice, and what they produce.

The pilot scope is **Section 1 only** (Cell Theory, Levels of Biological Organization, Characteristics of Life). If Section 1 lands well with students, the same pattern is replicated for Section 2 (Cell Structure — Prokaryotic/Eukaryotic) and Section 3 (Plasma Membrane and Transport). The brief includes a short preview of how the pattern adapts to those sections.

A note on voice and convention: I am American. Use American English spelling throughout — "organization," "analyze," "behavior," "color." The school unit plan uses British spelling but my own delivered materials should not.

---

## 2. Four design lenses

Every deliverable below should be evaluated against these four lenses. They aren't separate features to bolt on — they are the operating constraints for what counts as a good piece of material.

### 2.1 Phenomenon-driven
Each section opens with a real, local, unresolved question — not a vocabulary list, not an "I can…" statement. The content gets recruited to explain the phenomenon, rather than the phenomenon being a closing example. For the entire unit, the anchoring phenomenon is **idli batter fermentation** (see Section 3 of this brief). For sub-sections, smaller phenomena nest inside it.

### 2.2 AI-literacy integrated
At least one task per section is a structured AI critique. Students are given a deliberately flawed AI response (which we author) and asked to find and correct the errors using evidence from the readings or their own data. This converts the tool students are already using into the assignment, builds source-criticism skills, and makes the assignment itself something AI cannot do for them.

### 2.3 Lab-first / data-first
Students generate their own data — microscope photos of yeast or onion epidermal peels, idli batter rise measurements at different temperatures, sourness ratings across days, family interviews about fermentation traditions. The data is personal, takes time, and cannot be retrieved by a chatbot. Assessment focuses on interpretation of *their* data, not regurgitation of textbook conclusions.

### 2.4 Self-paced interactive HTML as the primary surface
The HTML page is the lesson, not a supplement to slides. Reading, an interactive model, and practice problems all live in one URL. Class time shifts toward: (a) discussion of the phenomenon, (b) lab work, (c) feedback on student reasoning. The HTML carries the content delivery, freeing class time for the things AI is worst at.

---

## 3. The anchoring phenomenon: idli batter

**The framing question for Unit 2:**

> Your grandmother sets out a bowl of idli batter on the counter at night. By morning, it has nearly doubled in volume and tastes slightly sour. She covers it and waits. By the time the steamers go on, the batter has been transformed.
>
> **What is actually happening in that bowl? Is it alive?**

Why this works as an anchoring phenomenon:

- **Personal.** Nearly every student in Chennai has eaten idli for breakfast. Many have watched the batter ferment overnight. It is not abstract.
- **Visible.** Volume increases. Smell changes. Sourness develops. Bubbles form. Students can document the change with their phone camera in a way that produces unique data.
- **Genuinely mysterious without microbiology.** "It rises" does not explain itself. Why does the batter rise but a bowl of plain rice not? Why does idli batter need 8–12 hours in Chennai's heat but longer in cooler climates?
- **Threads through all three sections.**
  - *Section 1 (Cell Theory, Characteristics of Life):* Are the microbes in the batter alive? Use the seven characteristics to defend your answer. Are they cells? Did they arise from pre-existing cells (cell theory principle 3)?
  - *Section 2 (Cell Structure):* The microbes are both yeasts (Saccharomyces cerevisiae — eukaryotic) and lactic acid bacteria (Leuconostoc mesenteroides, Lactobacillus — prokaryotic). Side-by-side comparison built into one bowl.
  - *Section 3 (Membrane Transport):* Fermentation is glucose → CO₂ + ethanol/lactic acid, with substrates and waste products crossing cell membranes. The CO₂ that makes the batter rise has to get out of the microbe and into the batter.
- **AI struggles with it.** Generic "what is fermentation?" answers exist online, but interpreting *your* specific batter at *your* temperature with *your* measurements requires actual student work.

For Section 1, the local sub-question to open with is:

> Is the idli batter alive? If yes, what specifically is alive — the batter, or the microbes inside it? Defend your answer using at least four of the seven characteristics of life.

---

## 4. Section 1 scope and alignment

### 4.1 What Section 1 covers

Per the unit plan, Section 1 covers cell theory (the three principles plus the historical development — Hooke, Leeuwenhoek, Schleiden, Schwann, Virchow), the eight levels of biological organization (atoms → molecules → organelles → cells → tissues → organs → organ systems → organism), and the seven main characteristics of life.

### 4.2 Alignment to unit plan I-can statements

The HTML page must support students achieving:

- I can state the three principles of cell theory.
- I can state the various levels of biological organization.
- I can identify and describe the seven main characteristics of life.

### 4.3 Alignment to NGSS practices

The materials emphasize the following NGSS Science and Engineering Practices: HS-SEP1 (asking questions), HS-SEP4 (analyzing data — the student data on idli batter), HS-SEP6 (constructing explanations), HS-SEP7 (evaluating claims and evidence — the AI critique task), and HS-SEP8 (communicating scientific ideas). Crosscutting concepts emphasized: Cause and Effect, Systems and System Models.

### 4.4 Resources to draw on

The following CK12 PDFs are already organized in `Resources/Section 1 - Cell Theory and Organization/` and should inform (but not be quoted from) the HTML reading content:

- *Cell Organization* — levels of biological organization
- *Cell Structure* — introductory overview
- *Parts of the Cell* — broad organelle survey

Gaps in the CK12 set that the HTML must fill: cell theory history (Hooke through Virchow), and the seven characteristics of life. The HTML reading authors these from scratch.

The "Prior Year Materials" folder contains lessons by a previous teacher — reference only, not a template. Do not match its voice, structure, or pedagogy.

---

## 5. HTML page architecture (Section 1)

One self-contained HTML page. Single file. All CSS and JS inline. No external CDN requests — AISC's network blocks many external assets, so inline everything. If a font is needed beyond system defaults, use system font stack.

The page is structured as a single scrolling experience with five named sections, with a sticky table of contents on the left (or top on mobile) so students can jump around.

### 5.1 Section A — The Phenomenon (open)

Opens the page. Above the fold. No vocabulary, no objectives.

Contents: a short scene-setting paragraph (the idli batter framing in section 3 of this brief), an embedded looping video or animated SVG of batter rising (we don't have the asset yet — placeholder for now), and the prompt: *"Is it alive? Write down your gut answer before you read further."* A simple text input where students record their initial answer. This is stored client-side and surfaced again at the end of Section E so students can see whether they changed their mind.

### 5.2 Section B — Reading: Three big ideas

The substantive content. Three subsections.

**B1. What makes something alive? (The seven characteristics)** — Written as a story, not a list. Frame each characteristic with an idli-batter example wherever possible: cells (the microbes themselves), order (DNA → ribosomes → cells), energy use (microbes eating sugars from the rice and dal), growth (volume doubles), reproduction (microbes divide every 20–30 minutes), response (rise rates depend on temperature), homeostasis (microbes maintain internal pH even as the batter sours).

**B2. Where cell theory came from** — A narrative of the four key scientists. Frame as "the tools shaped what they could see": Hooke's compound microscope let him name structures; Leeuwenhoek's better lenses let him see life; Schleiden/Schwann's broader sampling let them generalize across plants and animals; Virchow synthesized to close the loop on spontaneous generation. End with the three modern principles as the outcome of 190 years of work.

**B3. Levels of organization** — The eight-level hierarchy. Worked through using a rice plant as the running example (atoms in chlorophyll → chloroplast → mesophyll cell → leaf parenchyma → leaf → shoot system → rice plant). Reinforces local context (rice is the second-most-important crop in Tamil Nadu).

Reading tone: written for 9th graders, conversational but precise. No baby-talk. No "as we know…" or "obviously…". When a term is introduced, define it inline the first time. Word count target for B1+B2+B3 combined: 1500–2000 words. Long enough to be substantive, short enough to read in a class period.

### 5.3 Section C — Interactive model: Levels of organization explorer

A click-through visual model. Students start at the largest level (whole rice plant or human body, their choice via a toggle) and click "zoom in" to descend through the eight levels. At each level: a labeled visual (SVG, authored), a one-sentence definition, and one concrete example. A "zoom out" button returns up the hierarchy.

The model is interactive in a way a static diagram is not — students choose their starting organism, they control the pacing, they can move bidirectionally. Bidirectional zoom is the key interaction; do not allow only one-way descent.

### 5.4 Section D — Practice (four problem types)

Four blocks, in this order:

**D1. Multiple choice with feedback.** Six questions covering cell theory principles, the seven characteristics, and the levels of organization. On answer, show right/wrong plus a one-sentence explanation. No score is recorded — formative only.

**D2. Drag-and-drop: levels of organization sequencer.** Eight cards (Atom, Molecule, Organelle, Cell, Tissue, Organ, Organ System, Organism) start scrambled. Students drag into the correct order, smallest to largest. On submit, check order; if correct, congratulate; if wrong, highlight the misplaced cards. Allow unlimited retries. Use HTML5 drag-and-drop API or pointer events — must work on iPad (no hover assumption).

**D3. Short answer / fill-in-the-blank.** Four prompts. Examples:
- "The scientist who coined the word 'cell' after seeing rooms in cork was ______." (Hooke)
- "The principle that 'all cells come from pre-existing cells' is most associated with ______." (Virchow)
- "Cytoplasm and the nucleus are both ______ within a cell." (organelles)
- "Many similar cells working together form a ______." (tissue)

Accept multiple correct spellings (Hooke / Robert Hooke / R. Hooke). Case-insensitive.

**D4. CER (Claim-Evidence-Reasoning) prompt.** No auto-grade. Students write into a text area. The prompt: *"Is the idli batter alive? Make a claim, support it with at least three pieces of evidence (from the reading, from your own observation of batter at home, or from data you collect), and explain your reasoning. Aim for 150–250 words."* On submit, the response is saved client-side and a "Copy to Google Doc" button copies it to clipboard. Students paste into their lab notebook or a shared Doc.

### 5.5 Section E — AI critique task

A drafted "AI response" (we write it deliberately to contain at least three errors — historical, conceptual, and one subtle one) appears in a styled block as if it came from ChatGPT. Below it, prompts: *"This is a response an AI tool gave to the question 'What is the cell theory and who discovered it?' At least three things in it are wrong. Find them. For each error, cite the correct information from the reading."*

Students mark errors directly in the text (clickable spans) and explain in a text box below. Saved client-side. The flawed AI text is authored, not retrieved — we control the errors.

### 5.6 Section F — Revisit your answer

The student's initial "Is it alive?" answer from Section A is recalled and displayed. New prompt: *"Now that you've worked through the unit, would you change your answer? What changed your mind?"* Short text field.

Closes the loop. Demonstrates learning to the student directly.

---

## 6. Apps Script deployment

### 6.1 Why Apps Script

AISC's IT environment blocks Vercel, Netlify, and many third-party hosts. Google Workspace is whitelisted. Google Apps Script can serve HTML web apps from a `script.google.com` URL that can be embedded into Google Sites via the native Apps Script embed option. This is the lowest-friction path to "URL students can open from any device, embedded in our class site."

### 6.2 Files to produce

The deliverable includes:

1. **`section1.html`** — The full self-contained HTML page (works as a standalone file, openable in any browser, no external dependencies). This is the primary student-facing artifact and what gets shown to Matthew first for review.

2. **`Code.gs`** — Apps Script server-side code with a `doGet()` function that serves the HTML via `HtmlService.createHtmlOutputFromFile('Index').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)`. The `ALLOWALL` flag is required so the page can be embedded in a Google Sites iframe.

3. **`Index.html`** — The Apps Script HTML file. Identical content to `section1.html` but with any Apps Script-specific tweaks if needed (most should not be required since we're inlining everything).

4. **`README.md`** — Step-by-step deployment instructions for Matthew:
   - Go to script.google.com and create a new project.
   - Replace the default Code.gs with the provided Code.gs.
   - Add a new HTML file named "Index" and paste in the Index.html content.
   - Click Deploy → New deployment → type "Web app" → execute as "Me" → access "Anyone with the link."
   - Copy the deployment URL.
   - In Google Sites, insert → Apps Script → paste the URL.

### 6.3 Technical constraints

- No external HTTP requests at runtime. Everything (CSS, JS, fonts, images-as-base64 if needed) is inline.
- Must work in Chrome, Safari (school iPads), and Firefox. No Edge-specific or IE-specific features.
- Drag-and-drop must work on touch devices. Test on iPad.
- All student input is stored client-side only — `localStorage` for cross-session persistence within the embedded app. No backend, no database. Privacy by simplicity. (Note: when embedded via Apps Script web app, `localStorage` is scoped to the Apps Script domain — confirm this works as expected. If it doesn't, fall back to in-memory state with a "copy to clipboard" save button.)
- Page must be readable and functional at 768px width (iPad portrait) without horizontal scrolling.

---

## 7. Visual / style direction

Tone: clean, scientific, not "edutainment." This is high school biology, not elementary.

Color palette: muted, slightly biological. Avoid corporate-blue defaults. A working palette:

- Deep teal `#0F3D3E` for headers and primary text
- Sage green `#7FB069` for accents and "alive" indicators
- Warm coral `#F2A65A` for interactive callouts (buttons, highlights)
- Off-white `#FAFAF7` for page background
- Charcoal `#1A2B2C` for body text

Typography: a serif for headers (Georgia or Charter — system fonts, no web fonts), a clean sans for body (system stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif).

No emoji as decoration. Real scientific figures (SVG, authored or carefully chosen public-domain) preferred over clip art. If you must use a placeholder, mark it clearly and add a TODO in a code comment so it's easy to find later.

Spacing: generous. Section breaks are clear. Practice problems have room to breathe. The page should feel like a Substack article, not a worksheet.

---

## 8. File outputs and paths

All outputs go under the existing Unit 2 folder:

`/Users/imatthew/Documents/Claude/Projects/NGSS Science Standards/G9 Biology/HS G9 Bio Unit 2 Cell Biology (25-6)/`

Create a new subfolder: `Section 1 Interactive/` containing:

- `section1.html` — standalone version for local preview
- `apps-script/Code.gs` — server file for Apps Script
- `apps-script/Index.html` — HTML file for Apps Script
- `apps-script/README.md` — deployment guide

The slide deck I previously built (`U2_S1_Cell_Theory_Organisation_Life.pptx`, currently in the outputs folder) is NOT to be used as a template. Its content sequencing (cell theory → history → levels of organization) is correct, but its direct-instruction pedagogy is what we're moving away from. Refer to it only for fact-checking content order and NGSS alignment.

---

## 9. Out of scope for the pilot

To keep the first build small enough to test in one class period:

- No backend, no user accounts, no progress tracking across students.
- No teacher dashboard. Matthew assesses student work via the CER outputs they paste into their lab notebooks.
- No grading rubric inside the HTML — separate document.
- No translations. EAL support is via Matthew's in-class vocabulary cards (unit plan UDL section).
- No video assets. Use placeholder boxes with `[VIDEO: short looping clip of batter rising over 8 hours]` markers and an alt-text description so Matthew can record footage later.
- Section 2 and Section 3 HTML pages are not built yet. The pattern below shows how they'd be built once Section 1 is validated.

---

## 10. Pattern for Sections 2 and 3 (preview)

Once Section 1 is validated, Sections 2 and 3 follow the same six-block architecture (Phenomenon → Reading → Interactive model → Practice → AI critique → Revisit), with section-specific content:

**Section 2 — Cell Structure.** The phenomenon zooms into the idli batter: under a microscope, what do you actually see? Yeasts (eukaryotic, visible organelles) sitting next to bacteria (prokaryotic, much smaller, no nucleus). The interactive model is a clickable cell diagram (plant, animal, prokaryote) with organelle pop-ups. AI critique: "Here is an AI-generated explanation of plant vs. animal cells — find what's wrong."

**Section 3 — Membrane and Transport.** The phenomenon stays with the idli batter: where does the CO₂ that makes the batter rise actually come from, and how does it get out of the microbe? The interactive model is a phospholipid bilayer with draggable molecules — students drop a glucose molecule on it (can't cross alone, needs a channel) versus a CO₂ molecule (crosses freely). Practice integrates osmosis lab data students bring from the potato/sucrose lab the unit plan already calls for. AI critique: "Here's an AI explanation of why red blood cells burst in pure water — find the missing step."

The three sections together tell one continuous story anchored to one bowl of batter.

---

## 11. Quick reference for the building agent

When starting:

1. Read the existing unit plan at `HS G9 Bio Unit 2 Cell Biology (25-6)/HS G9 Bio Unit 2 Cell Biology UNIT PLAN (25-6).docx` to confirm I-can statements and success criteria.
2. Skim the three CK12 PDFs in `Resources/Section 1 - Cell Theory and Organization/` to understand what scientific depth is appropriate.
3. Do NOT use the "Prior Year Materials" folder as a style template (different teacher, different pedagogy).
4. Author content from scratch, do not paraphrase the CK12 PDFs directly.
5. Build `section1.html` first as a standalone file. Open it in a browser. Verify all four practice types work, drag-and-drop works on touch, and the page is readable at 768px width.
6. Then produce the Apps Script package and README.
7. Match the four design lenses in section 2 of this brief. If a build decision violates one of them, flag it for Matthew before proceeding.

When in doubt, the design constraint that wins is: *will an AI tool be able to do this assignment for the student?* If yes, redesign until the answer is no.

---

*End of brief.*
