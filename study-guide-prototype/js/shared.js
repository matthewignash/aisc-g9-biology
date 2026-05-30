// Shared helpers for all three prototype approaches. Depends on window.STUDY_GUIDE.
const GUIDE = window.STUDY_GUIDE;

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key.includes("-")) node.setAttribute(key, value);
    else node[key] = value;
  }
  for (const child of [].concat(children)) {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

function topbar(currentApproach) {
  const approaches = [["a", "/study-guide-prototype/searchable", "A"], ["b", "/study-guide-prototype/guided", "B"], ["c", "/study-guide-prototype/hybrid", "C"]];
  const links = [];
  approaches.forEach(([key, href, label], i) => {
    if (i > 0) links.push(el("span", { className: "sep" }, "·"));
    const attrs = { href, textContent: label };
    if (key === currentApproach) attrs["aria-current"] = "page";
    links.push(el("a", attrs));
  });
  return el("header", { className: "topbar" }, [
    siteLinks("study-guide"),
    el("span", { className: "spacer" }),
    el("nav", { className: "approach-switch", "aria-label": "Switch approach" }, links),
    el("a", { className: "back", href: "/study-guide-prototype/", textContent: "↩ Comparison" })
  ]);
}

function siteLinks(current) {
  const items = [["home", "/", "G9 Biology"], ["section-1", "/unit-2/section-1/", "Section 1"],
    ["section-2", "/unit-2/section-2/", "Section 2"], ["study-guide", "/study-guide-prototype/", "Study Guide"]];
  return el("nav", { className: "sitelinks", "aria-label": "Site" }, items.map(([key, href, label]) => {
    const attrs = { href, textContent: label };
    if (key === "home") attrs.className = "brand";
    if (key === current) attrs["aria-current"] = "page";
    return el("a", attrs);
  }));
}

function withVocabTooltips(text, vocab) {
  const frag = document.createDocumentFragment();
  const terms = vocab.map(v => v.term).sort((a, b) => b.length - a.length)
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  if (!terms) return frag.append(text), frag;
  const seen = new Set();
  let last = 0;
  for (const match of text.matchAll(new RegExp(`\\b(${terms})\\b`, "gi"))) {
    const def = vocab.find(v => v.term.toLowerCase() === match[0].toLowerCase());
    if (!def || seen.has(def.term)) continue;
    seen.add(def.term);
    frag.append(text.slice(last, match.index));
    frag.append(el("button", { className: "vocab-term", type: "button", title: def.definition,
      textContent: match[0], onclick: () => alert(`${def.term}: ${def.definition}`) }));
    last = match.index + match[0].length;
  }
  frag.append(text.slice(last));
  return frag;
}

function contentBlocks(section) {
  return section.content_blocks.map(block => {
    if (block.type === "list") return el("ul", {}, block.items.map(item => el("li", { textContent: item })));
    return el("p", {}, withVocabTooltips(block.text, section.vocab || []));
  });
}

function bigIdea(section) {
  return el("div", { className: "big-idea", textContent: section.big_idea });
}

function comparisonTable(table, collapsedAfter = 3) {
  const head = el("thead", {}, el("tr", {}, table.columns.map(c => el("th", { textContent: c }))));
  const rows = table.rows.map((row, i) => {
    const tr = el("tr", {}, row.map(cell => el("td", { textContent: cell })));
    if (i >= collapsedAfter) tr.hidden = true;
    return tr;
  });
  const tableEl = el("table", { className: "cmp-table" }, [el("caption", { textContent: table.title }), head, el("tbody", {}, rows)]);
  const wrap = el("div", { className: "table-expand" }, tableEl);
  if (table.rows.length > collapsedAfter) {
    const btn = el("button", { className: "btn", textContent: `Show all ${table.rows.length} rows ▼` });
    btn.onclick = () => { rows.forEach(r => r.hidden = false); btn.remove(); };
    wrap.append(btn);
  }
  return wrap;
}

function mcq(question) {
  const wrap = el("div", { className: "mcq" }, el("p", { className: "prompt", textContent: question.prompt }));
  const explain = el("p", { className: "explanation", hidden: true, textContent: question.explanation });
  question.options.forEach((text, i) => {
    const opt = el("button", { className: "btn opt", textContent: text });
    opt.onclick = () => {
      if (explain.hidden === false) return;
      opt.classList.add(i === question.correct_index ? "correct" : "wrong");
      if (i !== question.correct_index) wrap.querySelectorAll(".opt")[question.correct_index].classList.add("correct");
      explain.hidden = false;
    };
    wrap.append(opt);
  });
  wrap.append(explain);
  return wrap;
}
