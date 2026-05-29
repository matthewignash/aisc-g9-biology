# Master content Sheet — G9 Bio U2 S1

**Sheet name:** `G9 Bio U2 S1 — Content`
**Sheet URL:** https://docs.google.com/spreadsheets/d/1zPY_mBm1BwdP4TRJQq2O5L1EDucLAlI-69LliQW8LPo/edit
**Sheet ID:** `1zPY_mBm1BwdP4TRJQq2O5L1EDucLAlI-69LliQW8LPo`

**Web app URL (v1, deployed 2026-05-22):** https://script.google.com/a/macros/aischennai.org/s/AKfycbziicRy0VkLDM5zpizrrJd-ahfgv0dD7sc9rJUzWRh16w-n0gOtCdVNOxqfKrxSgdIA/exec

This is an AISC-domain-scoped deployment (`/a/macros/aischennai.org/`), which means only signed-in `@aischennai.org` accounts can open it. Good for students inside the school. If you ever need a public-link version (parents, guest demos), redeploy with **Who has access: Anyone**.

---

## Tabs

The Sheet has these tabs, populated automatically by `apps-script/SeedSheet.gs`:

1. `meta` — `key | value`
2. `mcq` — `id | prompt | option_a | option_b | option_c | option_d | correct | explanation`
3. `fill_blank` — `id | prompt | accepted_answers | case_sensitive`
4. `drag_order` — `id | label | correct_position`
5. `ai_critique_text` — `flawed_text` (single cell at A2)
6. `ai_critique_errors` — `error_id | marker | kind | correct_explanation`
7. `levels` — `organism | level_index | level_name | label | definition | example | svg_ref`

Column schema is documented in `../../_shared/content-schema.md`.

The starting content for each tab also lives as a JSON snapshot at `content-snapshot.json` in this folder.
