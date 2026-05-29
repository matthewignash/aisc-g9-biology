// Shared: G9 Biology _shared/js/levels-explorer.js — keep in sync.
// Bidirectional zoom through the eight biological levels. Two organisms toggle.

(function () {
  const store = window.G9Storage;
  const rows = (window.__CONTENT__ && window.__CONTENT__.levels) || [];

  function organismLabel(id) {
    const map = { rice_plant: "Rice plant", human_body: "Human body" };
    return map[id] || id;
  }

  function byOrganism() {
    const grouped = new Map();
    rows.forEach((r) => {
      const list = grouped.get(r.organism) || [];
      list.push(r);
      grouped.set(r.organism, list);
    });
    grouped.forEach((list) => list.sort((a, b) => Number(a.level_index) - Number(b.level_index)));
    return grouped;
  }

  function setText(host, sel, value) {
    const el = host.querySelector(sel);
    if (el) el.textContent = value || "";
  }

  function showSvg(figure, ref) {
    figure.textContent = "";
    if (!ref) return;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS(ns, "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + ref);
    use.setAttribute("href", "#" + ref);
    svg.appendChild(use);
    figure.appendChild(svg);
  }

  function render(host, grouped, organism, position) {
    const list = grouped.get(organism) || [];
    if (!list.length) return;
    const max = list.length;
    const i = Math.max(0, Math.min(position, max - 1));
    const row = list[max - 1 - i];
    setText(host, ".levels__index", "Level " + row.level_index + " of " + max);
    setText(host, ".levels__name", row.level_name);
    setText(host, ".levels__label", row.label);
    setText(host, ".levels__definition", row.definition);
    setText(host, ".levels__example", row.example);
    const figure = host.querySelector(".levels__figure");
    if (figure) showSvg(figure, row.svg_ref);
    host.querySelector(".levels__zoom-in").disabled = i >= max - 1;
    host.querySelector(".levels__zoom-out").disabled = i <= 0;
    store.write("levels.organism", organism);
    store.write("levels.position", String(i));
  }

  function wireToggle(host, grouped, organisms, state) {
    const toggle = host.querySelector(".levels__toggle");
    toggle.textContent = "";
    organisms.forEach((id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = organismLabel(id);
      btn.setAttribute("aria-pressed", id === state.organism ? "true" : "false");
      btn.addEventListener("click", () => {
        state.organism = id;
        state.position = 0;
        Array.from(toggle.querySelectorAll("button")).forEach((b) => {
          b.setAttribute("aria-pressed", b.textContent === organismLabel(id) ? "true" : "false");
        });
        render(host, grouped, state.organism, state.position);
      });
      toggle.appendChild(btn);
    });
  }

  function wireZoom(host, grouped, state) {
    host.querySelector(".levels__zoom-in").addEventListener("click", () => {
      state.position += 1;
      render(host, grouped, state.organism, state.position);
    });
    host.querySelector(".levels__zoom-out").addEventListener("click", () => {
      state.position -= 1;
      render(host, grouped, state.organism, state.position);
    });
  }

  function mount() {
    const host = document.getElementById("levels-explorer");
    if (!host || !rows.length) return;
    const grouped = byOrganism();
    const organisms = Array.from(grouped.keys());
    const state = {
      organism: store.read("levels.organism") || organisms[0],
      position: Number(store.read("levels.position") || 0)
    };
    if (!grouped.has(state.organism)) state.organism = organisms[0];
    wireToggle(host, grouped, organisms, state);
    wireZoom(host, grouped, state);
    render(host, grouped, state.organism, state.position);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
