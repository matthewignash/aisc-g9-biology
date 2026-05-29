// Approach B — Guided Path. Four entry paths, hash-routed, progress in localStorage.
document.getElementById("topbar").append(topbar("b"));
const view = document.getElementById("view");
const drawer = document.getElementById("drawer");
const PROGRESS_KEY = "sg-prototype:approach-b:progress";

const loadProgress = () => JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
const saveStep = step => localStorage.setItem(PROGRESS_KEY, JSON.stringify({ step }));
const clear = node => { while (node.firstChild) node.firstChild.remove(); };
const go = hash => { location.hash = hash; };

function openDrawer(section) {
  clear(drawer);
  const simpler = section.big_idea.split(/[,.] /)[0];
  drawer.append(
    el("button", { className: "link-btn", textContent: "Close ✕", onclick: () => drawer.classList.remove("open") }),
    el("h3", { textContent: "Help with " + section.title }),
    el("p", { className: "big-idea", textContent: simpler + "." }),
    el("p", { textContent: "In plain terms: " + section.summary }),
    el("div", { className: "note", textContent: "Take it one sentence at a time. Read the big idea, then the list, then come back here if a word is unfamiliar." }),
    el("button", { className: "btn btn-sage", textContent: "Got it now", style: "margin-top:16px", onclick: () => drawer.classList.remove("open") })
  );
  drawer.classList.add("open");
}

function home() {
  const progress = loadProgress();
  const ask = el("div", { className: "ask" }, [
    el("h1", { textContent: "Where are you with this material?" }),
    el("p", { textContent: "Pick the option that fits where you are right now. You can always come back and choose differently." })
  ]);
  const cards = [
    ["coral", "I'm just starting this section", "Walk me through it from the beginning.", "#starting"],
    ["sage", "I'm confused about something specific", "I have a topic in mind. Just help me with that.", "#confused"],
    ["teal", "I want to test what I know", "Skip the reading. Quiz me.", "#test"],
    ["coral", "I want to review for the test", "I've studied. Show me what to focus on.", "#review"]
  ].map(([tone, title, tag, hash]) =>
    el("button", { className: `path-card card ${tone}`, onclick: () => go(hash) }, [
      el("h3", { textContent: title }), el("p", { className: "tag", textContent: tag })
    ]));
  clear(view);
  view.append(ask, el("div", { className: "path-grid" }, cards));
  if (progress.step > 0) {
    const resume = el("div", { className: "resume" }, [
      el("p", { textContent: `Welcome back — you're on Step ${progress.step + 1} of ${GUIDE.sections.length}.` }),
      el("button", { className: "btn btn-sage", textContent: "Pick up where I left off", onclick: () => go("#starting") }),
      el("button", { className: "btn", textContent: "Start over", onclick: () => { saveStep(0); home(); } })
    ]);
    view.prepend(resume);
  }
}

function crumbs(index) {
  return el("div", { className: "crumbs" }, GUIDE.sections.map((s, i) =>
    el("span", { className: `step ${i === index ? "current" : i < index ? "done" : ""}`, textContent: s.title })));
}

function starting() {
  let index = loadProgress().step || 0;
  function render() {
    saveStep(index);
    const section = GUIDE.sections[index];
    const next = el("button", { className: "btn btn-sage", textContent: index < GUIDE.sections.length - 1 ? "I get this →" : "Finish →" });
    next.onclick = () => { if (index < GUIDE.sections.length - 1) { index++; render(); } else { saveStep(0); go(""); } };
    const help = el("button", { className: "btn btn-coral", textContent: "Help me with this →", onclick: () => openDrawer(section) });
    const back = el("button", { className: "btn", textContent: "← Back", onclick: () => { if (index > 0) { index--; render(); } } });
    clear(view);
    view.append(crumbs(index), el("h1", { textContent: section.title }), bigIdea(section),
      ...contentBlocks(section), el("div", { className: "step-actions" }, [back, help, next]));
    scrollTo(0, 0);
  }
  render();
}

function sectionDeepDive(section) {
  const block = el("div", {}, [
    el("h1", { textContent: section.title }), bigIdea(section), ...contentBlocks(section),
    el("h3", { textContent: "Still confused?" }),
    el("p", { className: "note", textContent: "Another way to say it: " + section.summary }),
    section.self_check.length ? mcq(section.self_check[0]) : ""
  ]);
  const idx = GUIDE.sections.indexOf(section);
  const related = GUIDE.sections[idx + 1] || GUIDE.sections[idx - 1];
  if (related) block.append(el("p", {}, ["This connects to: ",
    el("button", { className: "link-btn", textContent: related.title + " →", onclick: () => confused(related.id) })]));
  block.append(el("p", { style: "margin-top:20px" },
    el("button", { className: "btn", textContent: "← Pick another topic", onclick: () => confused() })));
  return block;
}

function confused(preselect) {
  clear(view);
  const section = preselect && GUIDE.sections.find(s => s.id === preselect);
  if (section) { view.append(sectionDeepDive(section)); scrollTo(0, 0); return; }
  view.append(el("h1", { textContent: "What are you confused about?" }),
    el("p", { className: "muted", textContent: "Pick the topic you want help with." }),
    el("div", { className: "topic-grid" }, GUIDE.sections.map(s =>
      el("button", { className: "btn", style: "justify-content:flex-start", textContent: s.title, onclick: () => confused(s.id) }))));
}

function test() {
  const questions = GUIDE.sections.flatMap(s => s.self_check.map(q => ({ q, section: s.title })));
  let i = 0, correct = 0;
  const wrongBy = {};
  function renderQuestion() {
    const { q, section } = questions[i];
    clear(view);
    view.append(el("p", { className: "muted", textContent: `Question ${i + 1} of ${questions.length}` }));
    const card = mcq(q);
    const original = q.correct_index;
    card.querySelectorAll(".opt").forEach((opt, idx) => opt.addEventListener("click", () => {
      if (idx === original) correct++; else wrongBy[section] = (wrongBy[section] || 0) + 1;
    }, { once: true }));
    view.append(card);
    const next = el("button", { className: "btn btn-sage", textContent: i < questions.length - 1 ? "Next question →" : "See results →", style: "margin-top:12px" });
    next.onclick = () => { if (i < questions.length - 1) { i++; renderQuestion(); } else summary(); };
    view.append(next);
    scrollTo(0, 0);
  }
  function summary() {
    const weakest = Object.entries(wrongBy).sort((a, b) => b[1] - a[1])[0];
    clear(view);
    view.append(el("div", { className: "quiz-summary" }, [
      el("h1", { textContent: `You got ${correct} of ${questions.length}` }),
      el("p", { className: "muted", textContent: weakest ? `Spend your next review on ${weakest[0]}.` : "Strong across the board." }),
      weakest ? el("button", { className: "btn btn-coral", textContent: `Review ${weakest[0]} →`,
        onclick: () => confused(GUIDE.sections.find(s => s.title === weakest[0]).id) }) : "",
      el("p", { style: "margin-top:16px" }, el("button", { className: "btn", textContent: "Back to start", onclick: () => go("") }))
    ]));
  }
  renderQuestion();
}

function review() {
  const parts = [
    ["Part A — Recall", "Names, definitions, and the three principles of cell theory.", ["cell-theory", "organelles", "prokaryotic-cells"]],
    ["Part B — Application", "Compare cell types and classify structures. Rehearse the plant-vs-animal sort.", ["plant-vs-animal", "eukaryotic-cells", "micrographs"]],
    ["Part C — Synthesis", "Explain how organelles cooperate. This asks for reasoning the guide only sets up.", ["organelles-together", "levels-of-organization"]]
  ];
  clear(view);
  view.append(el("h1", { textContent: "Review for the test" }),
    el("p", { className: "muted", textContent: "What each part of the summative asks, and which sections prepare you for it." }));
  parts.forEach(([title, desc, ids]) => {
    const links = ids.map(id => el("button", { className: "link-btn", style: "margin-right:14px",
      textContent: GUIDE.sections.find(s => s.id === id).title, onclick: () => { go("#confused"); } }));
    view.append(el("div", { className: "skills-part card" }, [
      el("h3", { textContent: title }), el("p", { textContent: desc }),
      el("p", { className: "muted", style: "margin-bottom:6px", textContent: "Prepares you:" }), el("div", {}, links)
    ]));
  });
  view.append(el("button", { className: "btn", textContent: "Back to start", onclick: () => go("") }));
}

const routes = { "": home, "#starting": starting, "#confused": () => confused(), "#test": test, "#review": review };
const route = () => (routes[location.hash] || home)();
addEventListener("hashchange", route);
route();
