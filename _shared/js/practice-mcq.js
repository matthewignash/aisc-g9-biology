// Shared: G9 Biology _shared/js/practice-mcq.js — keep in sync.
// Renders MCQ items into #mcq-list. Reads from window.__CONTENT__.mcq.

(function () {
  const store = window.G9Storage;
  const items = (window.__CONTENT__ && window.__CONTENT__.mcq) || [];

  function makeOption(letter, text, item) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mcq-option";
    button.setAttribute("data-letter", letter);
    button.setAttribute("aria-pressed", "false");
    const label = document.createElement("span");
    label.style.fontWeight = "600";
    label.style.marginRight = "8px";
    label.textContent = letter.toUpperCase() + ".";
    button.appendChild(label);
    button.appendChild(document.createTextNode(text));
    button.addEventListener("click", () => selectOption(item, letter, button));
    return button;
  }

  function disableAll(card) {
    Array.from(card.querySelectorAll(".mcq-option")).forEach((b) => {
      b.disabled = true;
    });
  }

  function revealCorrect(card, item) {
    Array.from(card.querySelectorAll(".mcq-option")).forEach((b) => {
      if (b.getAttribute("data-letter") === item.correct) b.classList.add("is-correct");
    });
  }

  function showFeedback(card, item, picked) {
    const fb = card.querySelector(".mcq-feedback");
    const right = picked === item.correct;
    fb.textContent = (right ? "Correct. " : "Not quite. ") + (item.explanation || "");
    fb.classList.remove("is-correct", "is-incorrect");
    fb.classList.add(right ? "is-correct" : "is-incorrect");
  }

  function selectOption(item, letter, button) {
    const card = button.closest(".practice");
    if (!card || card.dataset.answered === "true") return;
    card.dataset.answered = "true";
    button.setAttribute("aria-pressed", "true");
    const right = letter === item.correct;
    button.classList.add(right ? "is-correct" : "is-incorrect");
    revealCorrect(card, item);
    showFeedback(card, item, letter);
    disableAll(card);
    store.write("mcq." + item.id, letter);
  }

  function renderItem(item) {
    const card = document.createElement("div");
    card.className = "practice";
    card.id = item.id;
    card.setAttribute("role", "group");
    card.setAttribute("aria-label", "Multiple choice question");
    const label = document.createElement("p");
    label.className = "practice__label";
    label.textContent = "Multiple choice";
    const prompt = document.createElement("p");
    prompt.className = "practice__prompt";
    prompt.textContent = item.prompt;
    card.appendChild(label);
    card.appendChild(prompt);
    ["a", "b", "c", "d"].forEach((letter) => {
      const text = item["option_" + letter];
      if (text) card.appendChild(makeOption(letter, text, item));
    });
    const fb = document.createElement("p");
    fb.className = "mcq-feedback";
    card.appendChild(fb);
    return card;
  }

  function restoreAnswer(card, item) {
    const prior = store.read("mcq." + item.id);
    if (!prior) return;
    const btn = card.querySelector('.mcq-option[data-letter="' + prior + '"]');
    if (btn) selectOption(item, prior, btn);
  }

  function mount() {
    const host = document.getElementById("mcq-list");
    if (!host) return;
    items.forEach((item) => {
      const card = renderItem(item);
      host.appendChild(card);
      restoreAnswer(card, item);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
