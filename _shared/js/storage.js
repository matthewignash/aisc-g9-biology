// Shared: G9 Biology _shared/js/storage.js — keep in sync.
// Namespaced localStorage wrapper. Keys are scoped to g9bio.u<unit>.s<section>.<field>.

(function () {
  const content = window.__CONTENT__ || {};
  const meta = content.meta || {};
  const unit = meta.unit_id || "x";
  const section = meta.section_id || "x";
  const prefix = `g9bio.u${unit}.s${section}.`;

  function key(field) {
    return prefix + field;
  }

  function isAvailable() {
    try {
      const probe = "__probe__";
      localStorage.setItem(probe, "1");
      localStorage.removeItem(probe);
      return true;
    } catch (_) {
      return false;
    }
  }

  const fallback = new Map();
  const available = isAvailable();

  function read(field) {
    if (!available) return fallback.get(field) ?? null;
    return localStorage.getItem(key(field));
  }

  function write(field, value) {
    if (!available) {
      fallback.set(field, String(value));
      return;
    }
    localStorage.setItem(key(field), String(value));
  }

  function remove(field) {
    if (!available) {
      fallback.delete(field);
      return;
    }
    localStorage.removeItem(key(field));
  }

  function clearAll() {
    if (!available) {
      fallback.clear();
      return;
    }
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(prefix) === 0) toRemove.push(k);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  }

  window.G9Storage = { read, write, remove, clearAll, prefix, isAvailable: available };
})();
