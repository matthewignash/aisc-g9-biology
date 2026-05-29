# Content Schema — Google Sheet structure

Each section has one master Google Sheet. Tab names are fixed. Column names are fixed. `ContentLoader.gs` reads every tab into an object keyed by tab name; each tab's rows become an array of row objects (or for `meta`, a single key→value map).

The standalone `content-snapshot.json` mirrors this shape exactly:

```json
{
  "meta":         { "section_title": "...", "phenomenon_prompt": "...", ... },
  "mcq":          [ { "id": "...", "prompt": "...", ... }, ... ],
  "fill_blank":   [ { "id": "...", "prompt": "...", ... }, ... ],
  "drag_order":   [ { "id": "...", "label": "...", "correct_position": 1 }, ... ],
  "ai_critique":  { "flawed_text": "...", "errors": [ { "error_id": "...", ... }, ... ] },
  "levels":       [ { "organism": "...", "level_index": 1, ... }, ... ]
}
```

## Tab: `meta`

Two columns: `key`, `value`. Required keys:

| key | value (example) |
|---|---|
| `section_title` | `Section 1 — Cell Theory and the Levels of Life` |
| `phenomenon_prompt` | The scene-setting paragraph from brief §3. |
| `opening_question` | `Is it alive? Write down your gut answer before you read further.` |
| `revisit_prompt` | `Now that you've worked through the section, would you change your answer? What changed your mind?` |
| `unit_id` | `2` (numeric, for localStorage namespace) |
| `section_id` | `1` |

## Tab: `mcq`

Columns: `id`, `prompt`, `option_a`, `option_b`, `option_c`, `option_d`, `correct`, `explanation`.

- `id` is a stable short slug (e.g., `mcq-cell-theory-1`). Used as element IDs and as localStorage keys.
- `correct` is one of `a`, `b`, `c`, `d` (lowercase).
- `explanation` is shown after the student picks an answer, regardless of whether they got it right.

## Tab: `fill_blank`

Columns: `id`, `prompt`, `accepted_answers`, `case_sensitive`.

- `prompt` contains a literal `____` (four underscores) where the blank goes.
- `accepted_answers` is a pipe-separated list. Example: `Hooke|Robert Hooke|R. Hooke|R Hooke`.
- `case_sensitive` is `TRUE` or `FALSE`. Default `FALSE`.

## Tab: `drag_order`

Columns: `id`, `label`, `correct_position`.

- `correct_position` is a 1-indexed integer (smallest = 1, largest = 8 for the eight levels).
- The dragger renders one drag-zone with cards scrambled on load.

## Tab: `ai_critique_text`

A single tab with one column `flawed_text` and one row. The full passage lives in that cell.

The flawed passage must contain unique substrings (markers) that wrap each error. Example: `In 1755, Robert Hooke first observed living cells…` — the substring `In 1755` is the marker for an error.

## Tab: `ai_critique_errors`

Columns: `error_id`, `marker`, `kind`, `correct_explanation`.

- `marker` is the **exact** substring in `flawed_text` that the student clicks on to mark the error. It must be unique within `flawed_text` (the renderer uses `String.prototype.indexOf`).
- `kind` is one of `historical`, `conceptual`, `subtle`. Used in the answer key for reporting which kinds students caught.
- `correct_explanation` is shown after the student submits their selection.

A section must have at least three errors, with at least one of each kind.

## Tab: `levels`

Columns: `organism`, `level_index`, `level_name`, `label`, `definition`, `example`, `svg_ref`.

- `organism` is one of `rice_plant`, `human_body` (extensible later — the explorer's toggle reads the distinct values from this column).
- `level_index` is 1–8, matching the eight levels (atom→organism).
- `level_name` is the universal name (e.g., `Cell`).
- `label` is the organism-specific name at this level (e.g., `Mesophyll cell` for rice at level 4).
- `definition` is one sentence.
- `example` is one concrete sentence anchoring the level to the organism.
- `svg_ref` is an ID into an inline `<symbol>` defined in the HTML's SVG sprite. If empty, no figure is shown.

## ID conventions

All `id` columns use kebab-case ASCII. They become DOM IDs (`#mcq-cell-theory-1`) and localStorage keys (`g9bio.u2.s1.mcq.mcq-cell-theory-1`). Do not change an `id` once students have started using a deployment — it orphans their saved state.

## Editing workflow

1. Edit the Sheet.
2. Reload the deployed Apps Script URL. `CacheService` caches the JSON for 5 minutes; pass `?refresh=1` to force a re-fetch.
3. After substantive content changes, re-export `content-snapshot.json` via the Apps Script menu item "Export snapshot" (see `ContentLoader.gs`). Commit the updated snapshot to git.
