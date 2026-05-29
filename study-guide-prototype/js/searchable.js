// Approach A — Searchable Reference. One long page, left nav, live search filter.
document.getElementById("topbar").append(topbar("a"));

const main = document.getElementById("main");
const nav = document.getElementById("nav");
const count = document.getElementById("count");
const tablesBySection = { "prokaryotic-cells": "prokaryote-vs-eukaryote", "plant-vs-animal": "plant-vs-animal" };

nav.append(el("h3", { textContent: "Sections" }));
GUIDE.sections.forEach(section => {
  nav.append(el("a", { href: `#${section.id}`, textContent: section.title }));
  const node = el("section", { className: "ref-section", id: section.id }, [
    el("h2", { textContent: section.title }),
    el("p", { className: "summary", textContent: section.summary }),
    bigIdea(section),
    ...contentBlocks(section)
  ]);
  const tableId = tablesBySection[section.id];
  if (tableId) node.append(comparisonTable(GUIDE.comparison_tables.find(t => t.id === tableId)));
  node.dataset.haystack = `${section.title} ${section.summary} ${section.big_idea} ${section.content_blocks.map(b => b.text || b.items.join(" ")).join(" ")}`.toLowerCase();
  main.append(node);
});

function markMatches(textNode, query) {
  const value = textNode.nodeValue;
  const lower = value.toLowerCase();
  let from = lower.indexOf(query), last = 0;
  if (from < 0) return;
  const frag = document.createDocumentFragment();
  while (from >= 0) {
    frag.append(value.slice(last, from));
    frag.append(el("mark", { textContent: value.slice(from, from + query.length) }));
    last = from + query.length;
    from = lower.indexOf(query, last);
  }
  frag.append(value.slice(last));
  textNode.replaceWith(frag);
}

function highlight(node, query) {
  node.querySelectorAll("mark").forEach(m => m.replaceWith(m.textContent));
  node.normalize();
  if (!query) return;
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const targets = [];
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    if (t.nodeValue.toLowerCase().includes(query)) targets.push(t);
  }
  targets.forEach(t => markMatches(t, query));
}

const sections = [...main.children];
document.getElementById("search").addEventListener("input", e => {
  const query = e.target.value.trim().toLowerCase();
  let shown = 0;
  sections.forEach(node => {
    const match = !query || node.dataset.haystack.includes(query);
    node.classList.toggle("hidden", !match);
    if (match) shown++;
    highlight(node, match ? query : "");
  });
  count.textContent = query ? `Showing ${shown} of ${sections.length} sections` : "Showing all sections";
});
count.textContent = "Showing all sections";

const toTop = document.getElementById("toTop");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 500));
toTop.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
