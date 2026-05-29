// Shared: G9 Biology _shared/js/ai-critique.js — keep in sync.
// Renders flawed AI text with clickable error spans + per-error explanation captures.

(function () {
  const store = window.G9Storage;
  const data = (window.__CONTENT__ && window.__CONTENT__.ai_critique) || {};
  const flawed = data.flawed_text || "";
  const errors = data.errors || [];

  function findIntervals() {
    const list = [];
    errors.forEach((err) => {
      const idx = flawed.indexOf(err.marker);
      if (idx < 0) return;
      list.push({ start: idx, end: idx + err.marker.length, error: err });
    });
    list.sort((a, b) => a.start - b.start);
    return list;
  }

  function makeMarkerSpan(err) {
    const span = document.createElement("span");
    span.className = "ai-error-marker";
    span.dataset.errorId = err.error_id;
    span.setAttribute("role", "button");
    span.setAttribute("tabindex", "0");
    span.setAttribute("aria-pressed", "false");
    span.textContent = err.marker;
    return span;
  }

  function renderPassage(host) {
    host.textContent = "";
    const intervals = findIntervals();
    let cursor = 0;
    intervals.forEach((iv) => {
      if (iv.start > cursor) {
        host.appendChild(document.createTextNode(flawed.slice(cursor, iv.start)));
      }
      host.appendChild(makeMarkerSpan(iv.error));
      cursor = iv.end;
    });
    if (cursor < flawed.length) host.appendChild(document.createTextNode(flawed.slice(cursor)));
  }

  function readSelected() {
    const raw = store.read("ai-critique.selected");
    return new Set(raw ? raw.split(",").filter(Boolean) : []);
  }

  function writeSelected(set) {
    store.write("ai-critique.selected", Array.from(set).join(","));
  }

  function applySelection(host, selected) {
    Array.from(host.querySelectorAll(".ai-error-marker")).forEach((s) => {
      const on = selected.has(s.dataset.errorId);
      s.classList.toggle("is-selected", on);
      s.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function toggleSpan(span, selected, host) {
    const id = span.dataset.errorId;
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    writeSelected(selected);
    applySelection(host, selected);
  }

  function wireMarkers(host, selected) {
    Array.from(host.querySelectorAll(".ai-error-marker")).forEach((span) => {
      span.addEventListener("click", () => toggleSpan(span, selected, host));
      span.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSpan(span, selected, host);
        }
      });
    });
  }

  function makeExplanationField(err) {
    const li = document.createElement("li");
    const label = document.createElement("p");
    label.style.fontWeight = "600";
    label.textContent = "Error " + err.error_id + " — explain why this is wrong:";
    const ta = document.createElement("textarea");
    ta.className = "textarea";
    ta.id = "ai-explain-" + err.error_id;
    ta.placeholder = "Cite the correct information from the reading.";
    const prior = store.read("ai-critique.explain." + err.error_id);
    if (prior) ta.value = prior;
    let timer = null;
    ta.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        store.write("ai-critique.explain." + err.error_id, ta.value);
      }, 400);
    });
    li.appendChild(label);
    li.appendChild(ta);
    return li;
  }

  function wireReveal(host) {
    const btn = document.getElementById("ai-reveal");
    const list = document.getElementById("ai-reveal-list");
    if (!btn || !list) return;
    btn.addEventListener("click", () => {
      const selected = readSelected();
      list.textContent = "";
      errors.forEach((err) => {
        const span = host.querySelector('.ai-error-marker[data-error-id="' + err.error_id + '"]');
        const found = selected.has(err.error_id);
        if (span) span.classList.add(found ? "is-revealed-correct" : "is-revealed-missed");
        const li = document.createElement("li");
        const head = document.createElement("p");
        head.style.fontWeight = "600";
        head.textContent = (found ? "Caught: " : "Missed: ") + err.marker;
        const body = document.createElement("p");
        body.textContent = err.correct_explanation;
        li.appendChild(head);
        li.appendChild(body);
        list.appendChild(li);
      });
    });
  }

  function mount() {
    const host = document.getElementById("ai-passage");
    const explanations = document.getElementById("ai-explanations");
    if (!host) return;
    renderPassage(host);
    const selected = readSelected();
    applySelection(host, selected);
    wireMarkers(host, selected);
    if (explanations) errors.forEach((err) => explanations.appendChild(makeExplanationField(err)));
    wireReveal(host);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
