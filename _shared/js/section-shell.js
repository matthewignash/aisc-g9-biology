// Shared: G9 Biology _shared/js/section-shell.js — keep in sync.
// Wires the ToC scroll-spy, the "is alive?" input, the revisit recall, and the reset link.

(function () {
  const store = window.G9Storage;
  const content = window.__CONTENT__ || {};
  const meta = content.meta || {};

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }
  function $$(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function pulse(indicator) {
    if (!indicator) return;
    indicator.classList.add("is-visible");
    setTimeout(() => indicator.classList.remove("is-visible"), 1200);
  }

  function wireToc() {
    const links = $$(".toc a[href^='#']");
    if (!links.length) return;
    const targets = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((a) => {
          a.setAttribute("aria-current", a.getAttribute("href") === "#" + id ? "true" : "false");
        });
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
    targets.forEach((t) => observer.observe(t));
  }

  function debounce(fn, ms) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  function wireTextarea(textareaEl, savedEl, fieldKey) {
    if (!textareaEl) return;
    const prior = store.read(fieldKey);
    if (prior) textareaEl.value = prior;
    const save = debounce(() => {
      store.write(fieldKey, textareaEl.value);
      pulse(savedEl);
    }, 400);
    textareaEl.addEventListener("input", save);
  }

  function wirePhenomenon() {
    const promptEl = $("#phenomenon-prompt");
    if (promptEl && meta.opening_question) promptEl.textContent = meta.opening_question;
    wireTextarea($("#initial-answer"), $("#initial-saved"), "is-alive-initial");
  }

  function setRecall(recallEl, prior) {
    recallEl.textContent = "";
    if (!prior) {
      const em = document.createElement("em");
      em.textContent = "You didn't write an initial answer. Scroll back up to add one.";
      recallEl.appendChild(em);
      return;
    }
    const label = document.createElement("strong");
    label.textContent = "What you said earlier: ";
    recallEl.appendChild(label);
    recallEl.appendChild(document.createTextNode(prior));
  }

  function wireRevisit() {
    const recallEl = $("#revisit-recall");
    const promptEl = $("#revisit-prompt");
    if (promptEl && meta.revisit_prompt) promptEl.textContent = meta.revisit_prompt;
    if (recallEl) setRecall(recallEl, store.read("is-alive-initial"));
    wireTextarea($("#revisit-answer"), $("#revisit-saved"), "is-alive-revisit");
  }

  function wireReset() {
    const btn = $("#reset-section");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const ok = window.confirm("Erase all your saved answers on this page? You can't undo this.");
      if (!ok) return;
      store.clearAll();
      window.location.reload();
    });
  }

  function applyMeta() {
    const title = $("#section-title");
    if (title && meta.section_title) title.textContent = meta.section_title;
    const scene = $("#phenomenon-scene");
    if (scene && meta.phenomenon_prompt) scene.textContent = meta.phenomenon_prompt;
  }

  function init() {
    applyMeta();
    wireToc();
    wirePhenomenon();
    wireRevisit();
    wireReset();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.G9Shell = { pulse };
})();
