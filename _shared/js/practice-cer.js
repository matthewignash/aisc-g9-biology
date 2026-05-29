// Shared: G9 Biology _shared/js/practice-cer.js — keep in sync.
// CER textarea with autosave + copy-to-clipboard.

(function () {
  const store = window.G9Storage;
  const shell = window.G9Shell;

  function wordCount(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  function updateCount(textarea, countEl) {
    countEl.textContent = wordCount(textarea.value) + " words (aim for 150–250)";
  }

  async function copyToClipboard(textarea, statusEl) {
    const text = textarea.value;
    if (!text.trim()) {
      statusEl.textContent = "Write something first, then copy.";
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "Copied. Paste into your lab notebook.";
    } catch (_) {
      textarea.select();
      const ok = document.execCommand && document.execCommand("copy");
      statusEl.textContent = ok ? "Copied. Paste into your lab notebook." : "Copy didn't work — select the text and use Cmd/Ctrl+C.";
    }
  }

  function mount() {
    const textarea = document.getElementById("cer-response");
    const copyBtn = document.getElementById("cer-copy");
    const countEl = document.getElementById("cer-count");
    const savedEl = document.getElementById("cer-saved");
    const statusEl = document.getElementById("cer-status");
    if (!textarea) return;
    const prior = store.read("cer-response");
    if (prior) textarea.value = prior;
    if (countEl) updateCount(textarea, countEl);
    let timer = null;
    textarea.addEventListener("input", () => {
      if (countEl) updateCount(textarea, countEl);
      clearTimeout(timer);
      timer = setTimeout(() => {
        store.write("cer-response", textarea.value);
        if (shell && savedEl) shell.pulse(savedEl);
      }, 400);
    });
    if (copyBtn) copyBtn.addEventListener("click", () => copyToClipboard(textarea, statusEl));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
