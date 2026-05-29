// Approach C — Reference + Quick Check. Content left, adjacent practice right, gated nav.
document.getElementById("topbar").append(topbar("c"));
const strip = document.getElementById("strip");
const contentPane = document.getElementById("content");
const practicePane = document.getElementById("practice");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const PROGRESS_KEY = "sg-prototype:approach-c:progress";

const clear = node => { while (node.firstChild) node.firstChild.remove(); };
const loadDone = () => new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]"));
const markDone = id => { const s = loadDone(); s.add(id); localStorage.setItem(PROGRESS_KEY, JSON.stringify([...s])); };

const ORDER_LEVELS = ["Atom", "Molecule", "Organelle", "Cell", "Tissue", "Organ", "Organ system", "Organism"];
const ORDER_SECRETION = ["Nucleus", "Ribosome", "Endoplasmic reticulum", "Golgi apparatus", "Plasma membrane"];

function feedback(pane, ok, text) {
  pane.querySelector(".practice-feedback")?.remove();
  pane.append(el("div", { className: `practice-feedback ${ok ? "ok" : "no"}`, textContent: text }));
}

function practiceMCQ(section, onAttempt) {
  const card = mcq(section.self_check[0]);
  card.querySelectorAll(".opt").forEach(opt => opt.addEventListener("click", onAttempt, { once: true }));
  return card;
}

function practiceClassify(onAttempt) {
  const items = GUIDE.organelles_catalog.map(o => ({ label: o.name, bucket: o.in_animal ? "Both" : "Plant only" }));
  const wrap = el("div");
  const pool = el("div", { className: "dc-pool" });
  let selected = null;
  const buckets = ["Plant only", "Both"].map(name => {
    const box = el("div", { className: "dc-bucket" }, el("h4", { textContent: name }));
    box.dataset.bucket = name;
    box.onclick = () => {
      if (!selected) return;
      onAttempt();
      const ok = selected.dataset.bucket === name;
      selected.classList.add(ok ? "correct" : "wrong");
      if (ok) { box.append(selected); selected.onclick = null; }
      selected.classList.remove("picked"); selected = null;
    };
    return box;
  });
  items.forEach(item => {
    const chip = el("span", { className: "dc-chip", textContent: item.label });
    chip.dataset.bucket = item.bucket;
    chip.onclick = () => { pool.querySelectorAll(".picked").forEach(c => c.classList.remove("picked")); selected = chip; chip.classList.add("picked"); };
    pool.append(chip);
  });
  wrap.append(el("p", { className: "muted", textContent: "Tap an organelle, then tap the cell type it belongs to." }),
    pool, el("div", { className: "dc-buckets" }, buckets));
  return wrap;
}

function practiceOrder(sequence, onAttempt) {
  const wrap = el("div");
  const picks = el("p", { className: "order-picks", textContent: "Tap the steps in order." });
  const list = el("ul", { className: "order-list" });
  const shuffled = sequence.map((label, i) => ({ label, i })).sort((a, b) => ((a.i * 7 + 3) % 5) - ((b.i * 7 + 3) % 5));
  const chosen = [];
  shuffled.forEach(({ label }) => {
    const li = el("li", { textContent: label });
    li.onclick = () => {
      if (li.classList.contains("picked")) return;
      onAttempt();
      li.classList.add("picked");
      chosen.push(label);
      picks.textContent = chosen.map((c, n) => `${n + 1}. ${c}`).join("   ");
      if (chosen.length === sequence.length) {
        const ok = chosen.every((c, n) => c === sequence[n]);
        feedback(wrap, ok, ok ? "Correct order." : "Not quite. Correct order: " + sequence.join(" → "));
      }
    };
    list.append(li);
  });
  wrap.append(picks, list);
  return wrap;
}

function buildPractice(section, onAttempt) {
  if (section.id === "plant-vs-animal") return practiceClassify(onAttempt);
  if (section.id === "levels-of-organization") return practiceOrder(ORDER_LEVELS, onAttempt);
  if (section.id === "organelles-together") return practiceOrder(ORDER_SECRETION, onAttempt);
  return practiceMCQ(section, onAttempt);
}

let index = 0;
function renderStrip() {
  clear(strip);
  const done = loadDone();
  GUIDE.sections.forEach((s, i) => {
    const pill = el("button", { className: "pill", textContent: s.title, role: "tab" });
    if (i === index) pill.classList.add("active");
    if (done.has(s.id)) pill.classList.add("done");
    pill.onclick = () => { index = i; render(); };
    strip.append(pill);
  });
}

function render() {
  const section = GUIDE.sections[index];
  renderStrip();
  clear(contentPane);
  contentPane.append(el("h2", { textContent: section.title }), bigIdea(section), ...contentBlocks(section));
  clear(practicePane);
  const attempted = loadDone().has(section.id);
  const onAttempt = () => { markDone(section.id); nextBtn.disabled = false; renderStrip(); };
  practicePane.append(el("p", { className: "eyebrow", textContent: "Quick check" }), buildPractice(section, onAttempt));
  const isLast = index === GUIDE.sections.length - 1;
  nextBtn.textContent = isLast ? "Done" : "Next concept →";
  nextBtn.disabled = isLast || !attempted;
  prevBtn.disabled = index === 0;
  scrollTo(0, 0);
}

nextBtn.onclick = () => { if (index < GUIDE.sections.length - 1) { index++; render(); } };
prevBtn.onclick = () => { if (index > 0) { index--; render(); } };
render();
