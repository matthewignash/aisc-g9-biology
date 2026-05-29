// Shared: G9 Biology _shared/js/practice-fill.js — keep in sync.
// Renders fill-in-the-blank items into #fill-list.

(function () {
  const store = window.G9Storage;
  const items = (window.__CONTENT__ && window.__CONTENT__.fill_blank) || [];

  function normalize(value, caseSensitive) {
    const trimmed = String(value || "").trim();
    return caseSensitive ? trimmed : trimmed.toLowerCase();
  }

  function isAccepted(value, item) {
    const accepted = String(item.accepted_answers || "").split("|");
    const target = normalize(value, item.case_sensitive);
    return accepted.some((a) => normalize(a, item.case_sensitive) === target && target.length > 0);
  }

  function splitPrompt(prompt) {
    return String(prompt || "").split("____");
  }

  function makePromptFragment(prompt, input) {
    const fragment = document.createDocumentFragment();
    const parts = splitPrompt(prompt);
    parts.forEach((part, i) => {
      fragment.appendChild(document.createTextNode(part));
      if (i < parts.length - 1) fragment.appendChild(input);
    });
    return fragment;
  }

  function showFeedback(fb, ok) {
    fb.textContent = ok ? "Correct." : "Not yet — check the spelling and try again.";
    fb.classList.remove("is-correct", "is-incorrect");
    fb.classList.add(ok ? "is-correct" : "is-incorrect");
  }

  function makeInput(item) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "input";
    input.setAttribute("aria-label", "Answer for " + item.id);
    input.autocomplete = "off";
    input.spellcheck = false;
    input.style.maxWidth = "260px";
    return input;
  }

  function renderItem(item) {
    const card = document.createElement("div");
    card.className = "practice";
    card.id = item.id;
    const label = document.createElement("p");
    label.className = "practice__label";
    label.textContent = "Fill in the blank";
    card.appendChild(label);
    const prompt = document.createElement("p");
    prompt.className = "practice__prompt fill-row";
    const input = makeInput(item);
    prompt.appendChild(makePromptFragment(item.prompt, input));
    card.appendChild(prompt);
    const fb = document.createElement("p");
    fb.className = "fill-feedback";
    card.appendChild(fb);
    input.addEventListener("input", () => {
      store.write("fill." + item.id, input.value);
      if (!input.value) {
        fb.textContent = "";
        fb.classList.remove("is-correct", "is-incorrect");
        return;
      }
      showFeedback(fb, isAccepted(input.value, item));
    });
    const prior = store.read("fill." + item.id);
    if (prior) {
      input.value = prior;
      showFeedback(fb, isAccepted(prior, item));
    }
    return card;
  }

  function mount() {
    const host = document.getElementById("fill-list");
    if (!host) return;
    items.forEach((item) => host.appendChild(renderItem(item)));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
