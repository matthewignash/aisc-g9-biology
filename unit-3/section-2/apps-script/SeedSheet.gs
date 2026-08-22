// G9 Biology · Unit 3 · Section 2 — Inside the Cell. One-time Sheet seeder.
//
// Run `seedSection2Sheet` ONCE from the Apps Script editor after creating the empty
// Sheet. It creates or overwrites the content tabs.
//
// AFTER IT WORKS: delete this file from the Apps Script project. It is not needed for
// serving the page, and leaving it in place means a stray Run could wipe your edits.

const SEED_SNAPSHOT = JSON.parse(`{
  "meta": {
    "unit_id": 3,
    "section_id": 2,
    "section_title": "Inside the Cell",
    "phenomenon_prompt": "Take a single drop of the fermenting idli batter and put it under a microscope. You do not see one kind of life. You see two. Bigger oval cells with a nucleus, a vacuole and mitochondria inside them: these are yeasts, Saccharomyces or a relative, and they are eukaryotic cells. In between them are much smaller shapes, rods, sometimes in pairs, sometimes in chains. These are lactic acid bacteria, Leuconostoc and Lactobacillus. They have a cell membrane, a cell wall and DNA, but no nucleus and no membrane-wrapped compartments at all. They are prokaryotic cells. Two kinds of life, one bowl, the same sugars, different wastes.",
    "opening_question": "Why is there room in one bowl for both kinds of cell?",
    "revisit_prompt": "Now that you have worked through the page, would you change your answer? Say what in the reading shifted it, or what would have to happen before it shifted."
  },
  "mcq": [
    {
      "id": "mcq-pro-vs-euk-1",
      "prompt": "Which structure is present in all cells — prokaryotic and eukaryotic?",
      "option_a": "Nucleus",
      "option_b": "Mitochondria",
      "option_c": "Cell membrane",
      "option_d": "Cell wall",
      "correct": "c",
      "explanation": "Every cell has a membrane separating inside from outside. Only eukaryotes have a nucleus and mitochondria, and animal cells have no wall at all."
    },
    {
      "id": "mcq-pro-vs-euk-2",
      "prompt": "A microbiologist sees a tiny cell about 1.5 μm across with no nucleus and no internal compartments. The cell is most likely:",
      "option_a": "A yeast cell",
      "option_b": "A bacterial cell",
      "option_c": "A plant cell",
      "option_d": "An animal cell",
      "correct": "b",
      "explanation": "Prokaryotes (bacteria, archaea) lack a true nucleus and membrane-bound organelles, and are typically 0.5–5 μm — much smaller than eukaryotic cells."
    },
    {
      "id": "mcq-organelle-fn-1",
      "prompt": "Which organelle breaks down glucose to release ATP?",
      "option_a": "Chloroplast",
      "option_b": "Vacuole",
      "option_c": "Mitochondrion",
      "option_d": "Ribosome",
      "correct": "c",
      "explanation": "Mitochondria run cellular respiration — they release ATP from glucose. Chloroplasts capture sunlight to make sugar; ribosomes build proteins."
    },
    {
      "id": "mcq-organelle-fn-2",
      "prompt": "Where in a cell are proteins synthesized?",
      "option_a": "Ribosome",
      "option_b": "Nucleus",
      "option_c": "Vacuole",
      "option_d": "Cell wall",
      "correct": "a",
      "explanation": "Ribosomes are the protein-building machinery, and they are the one structure here that prokaryotes have too. The nucleus holds the instructions; it does not build the protein itself."
    },
    {
      "id": "mcq-wall-material",
      "prompt": "You are looking at a walled eukaryotic cell with no chloroplasts. What is its wall most likely made of?",
      "option_a": "Cellulose",
      "option_b": "Chitin",
      "option_c": "Murein",
      "option_d": "It has no wall",
      "correct": "b",
      "explanation": "Walled plus eukaryote plus no chloroplasts means a fungus, and fungal walls are chitin. Cellulose would make it a plant, and murein would make it a bacterium, which is not a eukaryote."
    },
    {
      "id": "mcq-plant-vs-animal-1",
      "prompt": "A student sees an unknown eukaryotic cell with a large central vacuole and chloroplasts. The cell is most likely:",
      "option_a": "A plant cell",
      "option_b": "An animal cell",
      "option_c": "A bacterial cell",
      "option_d": "A fungal cell",
      "correct": "a",
      "explanation": "Both features are characteristic of plant cells. Fungi have cell walls (chitin) but no chloroplasts. Animal cells have neither."
    },
    {
      "id": "mcq-plant-vs-animal-2",
      "prompt": "Of the seven structures, which set is in a plant cell but not in an animal cell?",
      "option_a": "Cell wall, chloroplast, large vacuole",
      "option_b": "Nucleus, mitochondrion, ribosomes",
      "option_c": "Chloroplast and mitochondrion",
      "option_d": "Cell membrane and cytoplasm",
      "correct": "a",
      "explanation": "Mitochondria are the trap. Plants respire as well as photosynthesize, so they need mitochondria too, which puts the mitochondrion in both columns and not in this answer."
    },
    {
      "id": "mcq-endosymbiotic-1",
      "prompt": "Which observation provides the strongest evidence for the endosymbiotic theory?",
      "option_a": "Mitochondria are larger than chloroplasts.",
      "option_b": "Mitochondria and chloroplasts have their own DNA and their own (70S) ribosomes.",
      "option_c": "All eukaryotic cells have a nucleus.",
      "option_d": "Plant cells perform photosynthesis.",
      "correct": "b",
      "explanation": "Their separate, bacterial-style DNA and 70S ribosomes — plus their double membranes and independent division — point to a free-living prokaryotic ancestry."
    }
  ],
  "fill_blank": [
    {
      "id": "fill-mitochondria",
      "prompt": "The organelle that releases ATP through cellular respiration is the ____.",
      "accepted_answers": "mitochondrion|mitochondria|mitochondrian",
      "case_sensitive": false
    },
    {
      "id": "fill-cell-wall",
      "prompt": "Plant cells have a rigid outer layer made of cellulose called the ____.",
      "accepted_answers": "cell wall|cellulose cell wall",
      "case_sensitive": false
    },
    {
      "id": "fill-endosymbiotic-dna",
      "prompt": "Mitochondria and chloroplasts both have their own ____, which is one piece of evidence for the endosymbiotic theory.",
      "accepted_answers": "DNA|ribosomes|circular DNA",
      "case_sensitive": false
    },
    {
      "id": "fill-nucleoid",
      "prompt": "In a prokaryotic cell, the region where the DNA is located — with no surrounding membrane — is called the ____.",
      "accepted_answers": "nucleoid|nucleoid region",
      "case_sensitive": false
    },
    {
      "id": "fill-chloroplast",
      "prompt": "The organelle that captures sunlight to make sugar in plant cells is the ____.",
      "accepted_answers": "chloroplast|chloroplasts",
      "case_sensitive": false
    },
    {
      "id": "fill-cytoplasm",
      "prompt": "The watery interior of a cell, where most of the reactions happen, is the ____.",
      "accepted_answers": "cytoplasm",
      "case_sensitive": false
    },
    {
      "id": "fill-vacuole",
      "prompt": "The structure that stores water and dissolved substances, and keeps a plant cell firm by pushing out against the wall, is the ____.",
      "accepted_answers": "vacuole|large central vacuole|central vacuole",
      "case_sensitive": false
    },
    {
      "id": "fill-chitin",
      "prompt": "A plant cell wall is made of cellulose. A fungal cell wall, such as a yeast's, is made of ____.",
      "accepted_answers": "chitin",
      "case_sensitive": false
    }
  ],
  "drag_columns": [
    {
      "id": "chloroplast",
      "label": "Chloroplast",
      "correct_column": "plant"
    },
    {
      "id": "cell-wall",
      "label": "Cell wall",
      "correct_column": "plant"
    },
    {
      "id": "large-central-vacuole",
      "label": "Large central vacuole",
      "correct_column": "plant"
    },
    {
      "id": "nucleus",
      "label": "Nucleus",
      "correct_column": "both"
    },
    {
      "id": "mitochondria",
      "label": "Mitochondria",
      "correct_column": "both"
    },
    {
      "id": "ribosomes",
      "label": "Ribosomes",
      "correct_column": "both"
    },
    {
      "id": "cell-membrane",
      "label": "Cell membrane",
      "correct_column": "both"
    },
    {
      "id": "cytoplasm",
      "label": "Cytoplasm",
      "correct_column": "both"
    }
  ],
  "ai_critique": {
    "flawed_text": "Plant cells and animal cells share many features, but they have some important differences. All plant cells have a cell wall made of cellulose, and animal cells have a cell wall made of cellulose too — they just call theirs something else. Plant cells don't need mitochondria because they have chloroplasts, which do all of the energy production through photosynthesis. Ribosomes are found only in eukaryotic cells, which is why bacteria have to absorb their proteins ready-made. The large central vacuole in a plant cell is the plant equivalent of the nucleus in an animal cell — it stores the cell's genetic material.",
    "errors": [
      {
        "error_id": "E1",
        "marker": "animal cells have a cell wall made of cellulose too — they just call theirs something else",
        "kind": "factual",
        "correct_explanation": "Animal cells do not have a cell wall at all. They have only a cell membrane on the outside. Cell walls are found in plants (cellulose), fungi (chitin), and most prokaryotes (peptidoglycan), but never in animal cells."
      },
      {
        "error_id": "E2",
        "marker": "Plant cells don't need mitochondria because they have chloroplasts",
        "kind": "conceptual",
        "correct_explanation": "Plant cells absolutely do have mitochondria. Chloroplasts capture sunlight to build sugar, but the cell still needs mitochondria to release ATP from that sugar — and chloroplasts can only work in light. Plants need both organelles."
      },
      {
        "error_id": "E3",
        "marker": "Ribosomes are found only in eukaryotic cells",
        "kind": "structural",
        "correct_explanation": "Ribosomes are the one structure on your anchor chart that every cell has, bacteria included. A bacterium builds its own proteins. Its ribosomes are slightly smaller than yours, which is exactly why some antibiotics can stop a bacterium without stopping you."
      },
      {
        "error_id": "E4",
        "marker": "The large central vacuole in a plant cell is the plant equivalent of the nucleus in an animal cell — it stores the cell's genetic material",
        "kind": "conceptual",
        "correct_explanation": "The central vacuole stores water, sugars, salts, and waste — not genetic material. Plant cells have a nucleus too, in addition to the central vacuole. The vacuole's role is storage and structural support (turgor pressure), not information storage."
      }
    ]
  },
  "cell_compare": [
    {
      "feature": "Nucleus",
      "prokaryote": "No — DNA sits in a nucleoid region with no surrounding membrane",
      "eukaryote": "Yes — a double-membrane-bound compartment",
      "notes": "The defining difference between the two camps"
    },
    {
      "feature": "Cell membrane",
      "prokaryote": "Yes",
      "eukaryote": "Yes",
      "notes": "Same basic phospholipid bilayer in both"
    },
    {
      "feature": "Cell wall",
      "prokaryote": "Yes — peptidoglycan in most bacteria",
      "eukaryote": "Plants (cellulose) and fungi (chitin) only",
      "notes": "Animal cells never have a cell wall"
    },
    {
      "feature": "Ribosomes",
      "prokaryote": "Yes — 70S",
      "eukaryote": "Yes — 80S in cytoplasm; 70S inside mitochondria and chloroplasts",
      "notes": "Size difference is why some antibiotics work"
    },
    {
      "feature": "DNA shape",
      "prokaryote": "Circular, free-floating",
      "eukaryote": "Linear, packaged with proteins (histones)",
      "notes": ""
    },
    {
      "feature": "Membrane-bound organelles",
      "prokaryote": "None",
      "eukaryote": "Yes: nucleus, mitochondria, and chloroplasts in plants",
      "notes": "Compartmentalization is the eukaryotic advantage"
    },
    {
      "feature": "Typical size",
      "prokaryote": "0.5 – 5 μm",
      "eukaryote": "10 – 100 μm",
      "notes": "Eukaryotes are 10–100× larger by length"
    },
    {
      "feature": "Examples",
      "prokaryote": "Bacteria, archaea",
      "eukaryote": "Animals, plants, fungi, protists",
      "notes": ""
    }
  ],
  "organelles": [
    {
      "id": "nucleus",
      "name": "Nucleus",
      "function": "Holds the cell's DNA and directs all activity.",
      "example": "In a yeast cell, the nucleus controls protein synthesis, growth, and division.",
      "in_plant": "yes",
      "in_animal": "yes",
      "in_prokaryote": "no"
    },
    {
      "id": "cytoplasm",
      "name": "Cytoplasm",
      "function": "The watery interior of the cell. Most reactions happen here, and everything else sits in it.",
      "example": "The sugars a yeast cell takes from the batter are broken down in the cytoplasm before the mitochondria finish the job.",
      "in_plant": "yes",
      "in_animal": "yes",
      "in_prokaryote": "yes"
    },
    {
      "id": "cell_membrane",
      "name": "Cell membrane",
      "function": "A selectively permeable boundary made of phospholipids; controls what enters and leaves the cell.",
      "example": "CO₂ leaves a yeast cell through the cell membrane during fermentation.",
      "in_plant": "yes",
      "in_animal": "yes",
      "in_prokaryote": "yes"
    },
    {
      "id": "cell_wall",
      "name": "Cell wall",
      "function": "A rigid outer layer outside the cell membrane — gives the cell structure and pressure resistance.",
      "example": "Cellulose in plants, chitin in fungi, peptidoglycan in bacteria — same idea, different materials.",
      "in_plant": "yes",
      "in_animal": "no",
      "in_prokaryote": "yes"
    },
    {
      "id": "chloroplast",
      "name": "Chloroplast",
      "function": "Captures sunlight and uses it to build sugar from CO₂ and water.",
      "example": "In a rice mesophyll cell, chloroplasts pack the cell with green pigment and run photosynthesis.",
      "in_plant": "yes",
      "in_animal": "no",
      "in_prokaryote": "no"
    },
    {
      "id": "vacuole",
      "name": "Vacuole",
      "function": "Stores water, salts, sugars and waste. In a plant cell it is large and permanent, and it pushes outward against the cell wall to keep the cell firm.",
      "example": "When a plant wilts, the central vacuoles have lost water.",
      "in_plant": "yes",
      "in_animal": "no",
      "in_prokaryote": "no"
    },
    {
      "id": "mitochondria",
      "name": "Mitochondria",
      "function": "Release ATP from glucose through cellular respiration — the cell's power plant.",
      "example": "A working muscle cell can contain thousands of mitochondria.",
      "in_plant": "yes",
      "in_animal": "yes",
      "in_prokaryote": "no"
    },
    {
      "id": "ribosomes",
      "name": "Ribosomes",
      "function": "Build proteins by linking amino acids together according to instructions copied from DNA.",
      "example": "Every cell has them, bacteria included, which is why ribosomes are the one structure on this list that is in all three columns of the sort.",
      "in_plant": "yes",
      "in_animal": "yes",
      "in_prokaryote": "yes"
    },
    {
      "id": "nucleoid",
      "name": "Nucleoid region",
      "function": "The area inside a prokaryotic cell where the circular DNA sits, with no surrounding membrane.",
      "example": "In a Lactobacillus cell, the DNA is concentrated in a tangled mass in the cell's center.",
      "in_plant": "no",
      "in_animal": "no",
      "in_prokaryote": "yes"
    },
    {
      "id": "flagellum",
      "name": "Flagellum",
      "function": "A whip-like tail used for movement.",
      "example": "Some bacteria spin their flagella to swim toward food.",
      "in_plant": "no",
      "in_animal": "no",
      "in_prokaryote": "yes"
    }
  ]
}`);

function seedSection2Sheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  buildTabSpecs(SEED_SNAPSHOT).forEach(function (spec) { writeTab(ss, spec); });
  removeDefaultSheet(ss);
  SpreadsheetApp.flush();
}

function buildTabSpecs(s) {
  return [
    { name: 'meta', headers: ['key', 'value'],
      rows: Object.keys(s.meta).map(function (k) { return [k, s.meta[k]]; }) },
    { name: 'mcq', headers: ["id", "prompt", "option_a", "option_b", "option_c", "option_d", "correct", "explanation"],
      rows: pickRows(s.mcq, ["id", "prompt", "option_a", "option_b", "option_c", "option_d", "correct", "explanation"]) },
    { name: 'fill_blank', headers: ["id", "prompt", "accepted_answers", "case_sensitive"],
      rows: pickRows(s.fill_blank, ["id", "prompt", "accepted_answers", "case_sensitive"]) },
    { name: 'drag_columns', headers: ["id", "label", "correct_column"],
      rows: pickRows(s.drag_columns, ["id", "label", "correct_column"]) },
    { name: 'cell_compare', headers: ["feature", "prokaryote", "eukaryote", "notes"],
      rows: pickRows(s.cell_compare, ["feature", "prokaryote", "eukaryote", "notes"]) },
    { name: 'organelles', headers: ["id", "name", "function", "example", "in_plant", "in_animal", "in_prokaryote"],
      rows: pickRows(s.organelles, ["id", "name", "function", "example", "in_plant", "in_animal", "in_prokaryote"]) },
    { name: 'ai_critique_text', headers: ['flawed_text'],
      rows: [[s.ai_critique.flawed_text]] },
    { name: 'ai_critique_errors',
      headers: ['error_id', 'marker', 'kind', 'correct_explanation'],
      rows: pickRows(s.ai_critique.errors,
        ['error_id', 'marker', 'kind', 'correct_explanation']) }
  ];
}

function pickRows(list, fields) {
  return list.map(function (item) { return fields.map(function (f) { return item[f]; }); });
}

function writeTab(ss, spec) {
  let sheet = ss.getSheetByName(spec.name);
  if (sheet) sheet.clear();
  else sheet = ss.insertSheet(spec.name);
  const all = [spec.headers].concat(spec.rows);
  sheet.getRange(1, 1, all.length, spec.headers.length).setValues(all);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, spec.headers.length);
}

function removeDefaultSheet(ss) {
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && ss.getSheets().length > 1) ss.deleteSheet(sheet1);
}
