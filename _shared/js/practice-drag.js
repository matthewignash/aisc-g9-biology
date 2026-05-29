// Shared: G9 Biology _shared/js/practice-drag.js — keep in sync.
// Lift-and-place reorder. The dragged card position:fixed-follows the finger.
// A placeholder slot moves smoothly through the zone. Touch-safe on iPad.

(function () {
  const store = window.G9Storage;
  const items = (window.__CONTENT__ && window.__CONTENT__.drag_order) || [];
  const STORE_KEY = "drag-order";

  function shuffled(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function makeCard(item) {
    const card = document.createElement("div");
    card.className = "drag-card";
    card.dataset.id = item.id;
    card.dataset.correct = String(item.correct_position);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "listitem");
    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.setAttribute("aria-hidden", "true");
    handle.textContent = "≡";
    card.appendChild(handle);
    card.appendChild(document.createTextNode(item.label));
    return card;
  }

  function makePlaceholder(card) {
    const rect = card.getBoundingClientRect();
    const ph = document.createElement("div");
    ph.className = "drag-placeholder";
    ph.style.height = rect.height + "px";
    return ph;
  }

  function liftCard(card, placeholder, e) {
    const rect = card.getBoundingClientRect();
    card._dragOffsetY = e.clientY - rect.top;
    card._dragWidth = rect.width;
    card.parentNode.insertBefore(placeholder, card);
    card.style.position = "fixed";
    card.style.left = rect.left + "px";
    card.style.top = rect.top + "px";
    card.style.width = rect.width + "px";
    card.style.zIndex = "1000";
    card.classList.add("is-dragging");
  }

  function moveCard(card, e) {
    card.style.top = (e.clientY - card._dragOffsetY) + "px";
  }

  function repositionPlaceholder(zone, placeholder, clientY) {
    const cards = Array.from(zone.children).filter(
      (n) => n.classList.contains("drag-card") && !n.classList.contains("is-dragging")
    );
    const after = cards.find((c) => {
      const r = c.getBoundingClientRect();
      return clientY < r.top + r.height / 2;
    });
    if (after) zone.insertBefore(placeholder, after);
    else zone.appendChild(placeholder);
  }

  function dropCard(card, placeholder) {
    card.classList.remove("is-dragging");
    card.style.position = "";
    card.style.top = "";
    card.style.left = "";
    card.style.width = "";
    card.style.zIndex = "";
    placeholder.parentNode.insertBefore(card, placeholder);
    placeholder.remove();
  }

  function attachPointer(card, zone) {
    let placeholder = null;
    card.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      placeholder = makePlaceholder(card);
      liftCard(card, placeholder, e);
      card.setPointerCapture(e.pointerId);
    });
    card.addEventListener("pointermove", (e) => {
      if (!card.classList.contains("is-dragging") || !placeholder) return;
      moveCard(card, e);
      repositionPlaceholder(zone, placeholder, e.clientY);
    });
    function release(e) {
      if (!card.classList.contains("is-dragging") || !placeholder) return;
      if (card.hasPointerCapture(e.pointerId)) card.releasePointerCapture(e.pointerId);
      dropCard(card, placeholder);
      placeholder = null;
      persistOrder(zone);
    }
    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", release);
  }

  function attachKeyboard(card, zone) {
    card.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const sibling = e.key === "ArrowUp" ? card.previousElementSibling : card.nextElementSibling;
      if (!sibling || !sibling.classList.contains("drag-card")) return;
      if (e.key === "ArrowUp") zone.insertBefore(card, sibling);
      else zone.insertBefore(sibling, card);
      card.focus();
      persistOrder(zone);
    });
  }

  function persistOrder(zone) {
    const ids = Array.from(zone.querySelectorAll(".drag-card")).map((c) => c.dataset.id);
    store.write(STORE_KEY, ids.join(","));
  }

  function restoreOrder(zone) {
    const raw = store.read(STORE_KEY);
    if (!raw) return;
    const ids = raw.split(",");
    const map = new Map(Array.from(zone.querySelectorAll(".drag-card")).map((c) => [c.dataset.id, c]));
    ids.forEach((id) => { const card = map.get(id); if (card) zone.appendChild(card); });
  }

  function checkOrder(zone, feedback) {
    const cards = Array.from(zone.querySelectorAll(".drag-card"));
    let allRight = true;
    cards.forEach((card, idx) => {
      card.classList.remove("is-correct", "is-misplaced");
      const here = idx + 1 === Number(card.dataset.correct);
      card.classList.add(here ? "is-correct" : "is-misplaced");
      if (!here) allRight = false;
    });
    feedback.textContent = allRight
      ? "All eight levels are in the right order."
      : "Some cards are out of place — the highlighted ones need to move.";
    feedback.classList.remove("is-correct", "is-incorrect");
    feedback.classList.add(allRight ? "is-correct" : "is-incorrect");
  }

  function clearFeedback(zone, feedback) {
    Array.from(zone.querySelectorAll(".drag-card")).forEach((c) => {
      c.classList.remove("is-correct", "is-misplaced");
    });
    feedback.textContent = "";
    feedback.classList.remove("is-correct", "is-incorrect");
  }

  function mount() {
    const host = document.getElementById("drag-zone");
    const feedback = document.getElementById("drag-feedback");
    const submit = document.getElementById("drag-submit");
    if (!host || !items.length) return;
    shuffled(items).forEach((it) => host.appendChild(makeCard(it)));
    restoreOrder(host);
    Array.from(host.querySelectorAll(".drag-card")).forEach((c) => {
      attachPointer(c, host);
      attachKeyboard(c, host);
    });
    if (submit) submit.addEventListener("click", () => checkOrder(host, feedback));
    host.addEventListener("pointerdown", () => clearFeedback(host, feedback), { capture: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
