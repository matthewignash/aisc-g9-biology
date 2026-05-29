// Cell Biology Study Guide — content spine for all three prototype approaches.
// Sections 1–2 (Cell Theory, Levels of Organization) are sourced verbatim from
// unit-2/section-1/content-snapshot.json. Sections 3–8 are standard 9th-grade
// biology authored for this prototype and flagged in README as needs-verification
// against the colleague's "Cell Biology Study Guide 2024.docx".
window.STUDY_GUIDE = {
  title: "Cell Biology Study Guide",
  sections: [
    {
      id: "cell-theory",
      title: "Cell Theory",
      summary: "The three principles that define what a cell is and where new ones come from.",
      big_idea: "All living things are made of cells, the cell is the basic unit of life, and every cell comes from a cell that already existed.",
      content_blocks: [
        { type: "prose", text: "Cell theory is the foundation of biology. It took almost two hundred years and many scientists to put together. In 1665, Robert Hooke looked at a thin slice of cork under an early microscope and saw tiny empty boxes that reminded him of the small rooms — cellae in Latin — where monks lived. He named them cells. A few years later, Anton van Leeuwenhoek built stronger single-lens microscopes and became the first person to see living single-celled organisms, which he called animalcules." },
        { type: "prose", text: "Over the next two centuries, Matthias Schleiden and Theodor Schwann concluded that plants and animals are both built from cells, and Rudolf Virchow added the final piece: cells do not appear from nonliving matter — every cell comes from a pre-existing cell. That idea closed the door on spontaneous generation." },
        { type: "list", items: [
          "All living things are made of one or more cells.",
          "The cell is the basic unit of structure and function in living things.",
          "All cells come from pre-existing cells by reproduction."
        ] }
      ],
      vocab: [
        { term: "cell", definition: "The basic structural and functional unit of all living organisms." },
        { term: "cell theory", definition: "The set of three principles describing what cells are and where they come from." },
        { term: "spontaneous generation", definition: "The discredited idea that living things can arise from nonliving matter." }
      ],
      self_check: [
        { type: "mcq", prompt: "Which of the following is NOT one of the three principles of modern cell theory?",
          options: ["All living things are made of one or more cells.", "The cell is the basic unit of structure and function.", "All cells come from pre-existing cells.", "All cells contain a nucleus."],
          correct_index: 3,
          explanation: "Bacteria (prokaryotes) have no nucleus, but they are still cells. The three principles apply to all cells, not only cells with nuclei." },
        { type: "mcq", prompt: "The idea that 'all cells come from pre-existing cells' is most directly associated with which scientist?",
          options: ["Robert Hooke", "Anton van Leeuwenhoek", "Rudolf Virchow", "Matthias Schleiden"],
          correct_index: 2,
          explanation: "Virchow synthesized earlier work to argue that cells reproduce, closing the door on spontaneous generation." }
      ]
    },
    {
      id: "levels-of-organization",
      title: "Levels of Organization",
      summary: "How life is built up in steps, from a single atom all the way to a whole organism.",
      big_idea: "Living things are organized in a nested hierarchy: atoms build molecules, molecules build organelles, and the pattern continues up to the whole organism.",
      content_blocks: [
        { type: "prose", text: "Biology is organized at many scales. The smallest unit of matter that still behaves like an element is an atom. Atoms bond into molecules. Inside a cell, molecules build organelles — small structures that each do a specific job. Many organelles working together make a cell, the smallest thing that counts as alive." },
        { type: "prose", text: "From there the pattern keeps climbing. Many similar cells form a tissue. Several tissues form an organ. A group of organs that work together forms an organ system. All the organ systems together make an organism. Each level is built from the level below it." },
        { type: "list", items: [
          "Atom — the smallest unit of matter that keeps the properties of an element.",
          "Molecule — two or more atoms bonded together.",
          "Organelle — a specialized structure inside a cell that does one job.",
          "Cell — the basic unit of structure and function in living things.",
          "Tissue — many similar cells working together to do one job.",
          "Organ — several tissues working together to do a larger job.",
          "Organ system — a group of organs working together to do a major job.",
          "Organism — an individual living thing made of all its organ systems together."
        ] }
      ],
      vocab: [
        { term: "organelle", definition: "A specialized structure inside a cell that performs a specific job." },
        { term: "tissue", definition: "Many similar cells working together to do one job." },
        { term: "organ", definition: "Several tissues working together to do a larger job." },
        { term: "organ system", definition: "A group of organs working together to do a major job." }
      ],
      self_check: [
        { type: "mcq", prompt: "A single layer of skin cells working together to form a barrier is best described as which level of organization?",
          options: ["An organ", "An organ system", "A tissue", "An organelle"],
          correct_index: 2,
          explanation: "Many similar cells working together form a tissue. Several tissues working together form an organ." },
        { type: "mcq", prompt: "Which list places the levels in the correct order from smallest to largest?",
          options: ["Cell, organelle, tissue, organ", "Molecule, organelle, cell, tissue", "Tissue, cell, organ, organelle", "Organelle, molecule, atom, cell"],
          correct_index: 1,
          explanation: "Molecules build organelles, organelles build the cell, and many cells build a tissue." }
      ]
    },
    {
      id: "prokaryotic-cells",
      title: "Prokaryotic Cells",
      summary: "The simpler, smaller cell type with no nucleus — the bacteria and archaea.",
      big_idea: "Prokaryotic cells have no nucleus and no membrane-bound organelles; their DNA floats freely in the cytoplasm.",
      content_blocks: [
        { type: "prose", text: "Prokaryotic cells are the oldest and simplest cells. Bacteria and archaea are prokaryotes. The word prokaryote means 'before the nucleus' — these cells have no nucleus. Instead, their single loop of DNA sits in a region of the cytoplasm called the nucleoid." },
        { type: "prose", text: "Prokaryotic cells are small, usually less than 5 micrometers across. They have a plasma membrane, cytoplasm, ribosomes, and a cell wall, but no membrane-bound organelles. They reproduce asexually by splitting in two, a process called binary fission." },
        { type: "list", items: [
          "No nucleus — DNA sits in the nucleoid region.",
          "No membrane-bound organelles.",
          "Small ribosomes (70S) for building proteins.",
          "A single, circular loop of DNA.",
          "Usually have a cell wall and a plasma membrane."
        ] }
      ],
      vocab: [
        { term: "prokaryote", definition: "A cell with no nucleus and no membrane-bound organelles, such as a bacterium." },
        { term: "nucleoid", definition: "The region of a prokaryotic cell where the DNA is found, not enclosed by a membrane." },
        { term: "binary fission", definition: "Asexual reproduction in which one cell splits into two identical cells." }
      ],
      self_check: [
        { type: "mcq", prompt: "Where is the DNA found in a prokaryotic cell?",
          options: ["Inside the nucleus", "In the nucleoid region of the cytoplasm", "Inside the mitochondria", "Attached to the cell wall"],
          correct_index: 1,
          explanation: "Prokaryotes have no nucleus. Their single loop of DNA floats in the cytoplasm in a region called the nucleoid." },
        { type: "mcq", prompt: "Which feature would you NOT expect to find in a prokaryotic cell?",
          options: ["A plasma membrane", "Ribosomes", "A membrane-bound nucleus", "Cytoplasm"],
          correct_index: 2,
          explanation: "Prokaryotes lack a membrane-bound nucleus and all other membrane-bound organelles." }
      ]
    },
    {
      id: "eukaryotic-cells",
      title: "Eukaryotic Cells",
      summary: "The larger, more complex cell type with a nucleus and membrane-bound organelles.",
      big_idea: "Eukaryotic cells keep their DNA inside a membrane-bound nucleus and use many membrane-bound organelles to divide up the work of the cell.",
      content_blocks: [
        { type: "prose", text: "Eukaryotic cells are larger and more complex than prokaryotic cells. The word eukaryote means 'true nucleus.' Animals, plants, fungi, and protists are all made of eukaryotic cells. Their DNA is stored inside a nucleus surrounded by a double membrane." },
        { type: "prose", text: "Eukaryotic cells divide labor among many membrane-bound organelles. The mitochondria release energy, the endoplasmic reticulum and ribosomes build proteins, and the Golgi apparatus packages them. This division of labor lets eukaryotic cells grow larger and do more complex jobs than prokaryotes." },
        { type: "list", items: [
          "A true nucleus enclosed by a nuclear membrane.",
          "Many membrane-bound organelles.",
          "Larger ribosomes (80S).",
          "Linear DNA wrapped with proteins into chromosomes.",
          "Usually larger than 10 micrometers."
        ] }
      ],
      vocab: [
        { term: "eukaryote", definition: "A cell with a membrane-bound nucleus and membrane-bound organelles." },
        { term: "nucleus", definition: "The membrane-bound organelle that contains the cell's DNA." },
        { term: "chromosome", definition: "A length of DNA wrapped with proteins, found in the nucleus of a eukaryotic cell." }
      ],
      self_check: [
        { type: "mcq", prompt: "What is the main feature that defines a eukaryotic cell?",
          options: ["It has no nucleus", "It has a membrane-bound nucleus", "It is always single-celled", "It has no ribosomes"],
          correct_index: 1,
          explanation: "Eukaryote means 'true nucleus.' These cells keep their DNA inside a membrane-bound nucleus." },
        { type: "mcq", prompt: "Which group of organisms is made of eukaryotic cells?",
          options: ["Bacteria", "Archaea", "Animals and plants", "All prokaryotes"],
          correct_index: 2,
          explanation: "Animals, plants, fungi, and protists are eukaryotes. Bacteria and archaea are prokaryotes." }
      ]
    },
    {
      id: "organelles",
      title: "Organelles",
      summary: "The specialized structures inside a cell, each doing a specific job.",
      big_idea: "A cell works like a tiny factory: each organelle has a specialized job, and together they keep the cell alive.",
      content_blocks: [
        { type: "prose", text: "An organelle is a specialized structure inside a cell. Each one does a specific job, the way each room in a building has a purpose. The nucleus is the control center and holds the DNA. The mitochondria release energy from food. Ribosomes build proteins, and the endoplasmic reticulum carries those proteins through the cell." },
        { type: "prose", text: "The Golgi apparatus packages and ships proteins. Lysosomes break down waste. The plasma membrane controls what enters and leaves. Plant cells add a few of their own: a stiff cell wall, large water-filled vacuoles, and chloroplasts that capture sunlight." },
        { type: "list", items: [
          "Nucleus — controls the cell and stores DNA.",
          "Mitochondria — release energy from food.",
          "Ribosomes — build proteins.",
          "Endoplasmic reticulum — transports materials through the cell.",
          "Golgi apparatus — packages and ships proteins.",
          "Chloroplast — captures light energy (plant cells only)."
        ] }
      ],
      vocab: [
        { term: "mitochondrion", definition: "The organelle that releases energy from food; often called the powerhouse of the cell." },
        { term: "ribosome", definition: "The structure that builds proteins by linking amino acids together." },
        { term: "Golgi apparatus", definition: "The organelle that packages and ships proteins out of the cell." },
        { term: "chloroplast", definition: "The organelle in plant cells that captures light energy for photosynthesis." }
      ],
      self_check: [
        { type: "mcq", prompt: "Which organelle is often called the powerhouse of the cell?",
          options: ["The nucleus", "The mitochondrion", "The ribosome", "The Golgi apparatus"],
          correct_index: 1,
          explanation: "Mitochondria release energy from food, powering the cell's activities." },
        { type: "mcq", prompt: "What is the main job of the ribosome?",
          options: ["Storing DNA", "Building proteins", "Breaking down waste", "Capturing sunlight"],
          correct_index: 1,
          explanation: "Ribosomes link amino acids together to build proteins." }
      ]
    },
    {
      id: "plant-vs-animal",
      title: "Plant vs Animal Cells",
      summary: "What plant and animal cells share, and the three structures only plants have.",
      big_idea: "Plant and animal cells share most organelles, but only plant cells have a cell wall, a large central vacuole, and chloroplasts.",
      content_blocks: [
        { type: "prose", text: "Plant and animal cells are both eukaryotic, so they share most of their organelles: a nucleus, mitochondria, ribosomes, endoplasmic reticulum, and a Golgi apparatus. The differences come down to three structures that plant cells have and animal cells do not." },
        { type: "prose", text: "Plant cells have a rigid cell wall outside the membrane that gives them shape and support. They have a large central vacuole that stores water and keeps the cell firm. And they have chloroplasts, where photosynthesis turns sunlight into sugar. Animal cells have none of these three, but they often have small vacuoles and a more flexible shape." },
        { type: "list", items: [
          "Both have a nucleus, mitochondria, ribosomes, and a plasma membrane.",
          "Only plant cells have a cell wall.",
          "Only plant cells have a large central vacuole.",
          "Only plant cells have chloroplasts.",
          "Animal cells tend to be round; plant cells tend to be rectangular."
        ] }
      ],
      vocab: [
        { term: "cell wall", definition: "A rigid layer outside the membrane of a plant cell that gives shape and support." },
        { term: "central vacuole", definition: "A large fluid-filled sac in a plant cell that stores water and keeps the cell firm." }
      ],
      self_check: [
        { type: "mcq", prompt: "Which structure is found in plant cells but NOT in animal cells?",
          options: ["Nucleus", "Mitochondrion", "Cell wall", "Ribosome"],
          correct_index: 2,
          explanation: "The cell wall, the large central vacuole, and chloroplasts are found only in plant cells." },
        { type: "mcq", prompt: "Why can a plant cell capture sunlight while an animal cell cannot?",
          options: ["It has chloroplasts", "It has more mitochondria", "It has no nucleus", "It is larger"],
          correct_index: 0,
          explanation: "Chloroplasts carry out photosynthesis. Animal cells do not have them." }
      ]
    },
    {
      id: "micrographs",
      title: "Reading Micrographs",
      summary: "How to make sense of the magnified images cells are actually studied through.",
      big_idea: "A micrograph is a photo taken through a microscope; reading one means using scale, shape, and visible structures to identify what kind of cell you are looking at.",
      content_blocks: [
        { type: "prose", text: "We almost never see cells with the naked eye. A micrograph is an image taken through a microscope. Light micrographs use visible light and show color and living cells, but at lower detail. Electron micrographs fire electrons instead of light and reveal fine internal structure, but only in black and white and only of non-living samples." },
        { type: "prose", text: "To read a micrograph, start with the scale bar, which tells you the real size of what you see. Then look for clues: a visible nucleus and organelles point to a eukaryotic cell, while a very small cell with no internal structures points to a prokaryote. A rigid rectangular outline suggests a plant cell." },
        { type: "list", items: [
          "Check the scale bar first — it gives the real size.",
          "A light micrograph shows color and living cells at lower detail.",
          "An electron micrograph shows fine structure in black and white.",
          "Visible internal organelles point to a eukaryotic cell.",
          "A rigid rectangular wall points to a plant cell."
        ] }
      ],
      vocab: [
        { term: "micrograph", definition: "An image of a small object taken through a microscope." },
        { term: "scale bar", definition: "A labeled line on a micrograph that shows the real size of the magnified image." }
      ],
      self_check: [
        { type: "mcq", prompt: "What does the scale bar on a micrograph tell you?",
          options: ["The color of the cell", "The real size of what you are seeing", "The age of the sample", "The type of microscope"],
          correct_index: 1,
          explanation: "The scale bar lets you work out the actual size of structures in the magnified image." },
        { type: "mcq", prompt: "You see a micrograph of a very small cell with no visible internal structures. It is most likely:",
          options: ["A plant cell", "An animal cell", "A prokaryotic cell", "A tissue"],
          correct_index: 2,
          explanation: "Prokaryotes are small and have no membrane-bound organelles, so the inside looks featureless." }
      ]
    },
    {
      id: "organelles-together",
      title: "How Organelles Work Together",
      summary: "The teamwork behind making and shipping a protein out of the cell.",
      big_idea: "Organelles cooperate like an assembly line: making and exporting a protein hands work from the nucleus to ribosomes to the ER to the Golgi to the membrane.",
      content_blocks: [
        { type: "prose", text: "No organelle works alone. The clearest example is making a protein the cell needs to export. It starts in the nucleus, where the DNA holds the instructions. A copy of those instructions leaves the nucleus through a pore and travels to a ribosome." },
        { type: "prose", text: "The ribosome, often attached to the endoplasmic reticulum, reads the instructions and builds the protein. The endoplasmic reticulum folds it and ships it to the Golgi apparatus, which packages it into a vesicle. The vesicle travels to the plasma membrane and releases the protein outside the cell. Each organelle handles one step of the line." },
        { type: "list", items: [
          "Nucleus — stores the instructions in DNA.",
          "Ribosome — builds the protein from the instructions.",
          "Endoplasmic reticulum — folds and transports the protein.",
          "Golgi apparatus — packages the protein into a vesicle.",
          "Plasma membrane — releases the protein out of the cell."
        ] }
      ],
      vocab: [
        { term: "vesicle", definition: "A small membrane sac that carries materials within or out of the cell." },
        { term: "endoplasmic reticulum", definition: "A network of membranes that folds and transports proteins through the cell." }
      ],
      self_check: [
        { type: "mcq", prompt: "Where does the instruction to build an exported protein begin?",
          options: ["In the Golgi apparatus", "In the nucleus", "At the plasma membrane", "In a vesicle"],
          correct_index: 1,
          explanation: "The DNA in the nucleus holds the instructions. A copy leaves to reach the ribosome." },
        { type: "mcq", prompt: "Which organelle packages a finished protein into a vesicle for shipping?",
          options: ["The ribosome", "The nucleus", "The Golgi apparatus", "The mitochondrion"],
          correct_index: 2,
          explanation: "The Golgi apparatus packages proteins into vesicles that travel to the membrane." }
      ]
    }
  ],
  comparison_tables: [
    {
      id: "prokaryote-vs-eukaryote",
      title: "Prokaryotic vs Eukaryotic Cells",
      columns: ["Characteristic", "Prokaryotic Cells", "Eukaryotic Cells"],
      rows: [
        ["Cell type", "Often unicellular", "Often multicellular"],
        ["Plasma membrane", "Yes", "Yes"],
        ["Ribosomes", "Small, 70S", "Large, 80S"],
        ["Membrane-bound organelles", "None", "Many present"],
        ["Nucleus", "No (nucleoid region)", "Yes (nuclear membrane)"],
        ["DNA", "Circular, no proteins", "Linear, with proteins"],
        ["Typical size", "Small, under 5 µm", "Larger, over 10 µm"],
        ["Reproduction", "Always asexual", "Asexual or sexual"]
      ]
    },
    {
      id: "plant-vs-animal",
      title: "Plant vs Animal Cells",
      columns: ["Structure", "Plant Cell", "Animal Cell"],
      rows: [
        ["Nucleus", "Yes", "Yes"],
        ["Mitochondria", "Yes", "Yes"],
        ["Ribosomes", "Yes", "Yes"],
        ["Cell membrane", "Yes", "Yes"],
        ["Cell wall", "Yes", "No"],
        ["Chloroplasts", "Yes", "No"],
        ["Large central vacuole", "Yes", "No"],
        ["Typical shape", "Rectangular, fixed", "Round, flexible"]
      ]
    }
  ],
  organelles_catalog: [
    { id: "nucleus", name: "Nucleus", function: "Controls the cell and stores DNA", in_plant: true, in_animal: true },
    { id: "mitochondrion", name: "Mitochondrion", function: "Releases energy from food", in_plant: true, in_animal: true },
    { id: "ribosome", name: "Ribosome", function: "Builds proteins", in_plant: true, in_animal: true },
    { id: "er", name: "Endoplasmic reticulum", function: "Transports materials through the cell", in_plant: true, in_animal: true },
    { id: "golgi", name: "Golgi apparatus", function: "Packages and ships proteins", in_plant: true, in_animal: true },
    { id: "cell-membrane", name: "Cell membrane", function: "Controls what enters and leaves", in_plant: true, in_animal: true },
    { id: "cell-wall", name: "Cell wall", function: "Gives shape and support", in_plant: true, in_animal: false },
    { id: "chloroplast", name: "Chloroplast", function: "Captures light energy for photosynthesis", in_plant: true, in_animal: false },
    { id: "central-vacuole", name: "Central vacuole", function: "Stores water and keeps the cell firm", in_plant: true, in_animal: false }
  ]
};
