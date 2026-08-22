# Section 3 — Why Cells Stay Small: Apps Script deployment

Upload this folder to a Google Apps Script project. Deployed, it serves the page from a
`script.google.com` URL you can embed in the class Google Site. That is the only route
students get, because AISC blocks the `g9-bio-site` domain for student accounts.

## Files in this folder

| File | What it is | Keep? |
|---|---|---|
| `Code.gs` | Section 3 entry point. Holds the Sheet ID and the `doGet` handler. | Yes |
| `ContentLoader.gs` | Reads the master content Sheet into JSON, cached. Copied from `_shared/apps-script/`. | Yes |
| `ServeSection.gs` | Reusable `doGet` that injects the JSON into `Index.html`. Copied from `_shared/apps-script/`. | Yes |
| `Index.html` | The student-facing page. | Yes |
| `SeedSheet.gs` | **One-time use.** Fills the content tabs in the empty Sheet. | Delete after the first run |

Before you start, create an empty Google Sheet in your Drive and copy its Sheet ID, the
long string between `/d/` and `/edit` in the URL. You paste it into `Code.gs` in Step 1.

## Step 1 — Create the Apps Script project

1. Go to **script.google.com**, click **New project**.
2. Rename the project to: `G9 Bio U3 S3 Web App`.
3. Delete the default `Code.gs` content and paste this folder's `Code.gs`.
   **Replace `YOUR_SHEET_ID_HERE` with the Sheet ID you copied.**
4. Add four more files with the `+` next to **Files**:
   - Script, named `ContentLoader`, paste `ContentLoader.gs`
   - Script, named `ServeSection`, paste `ServeSection.gs`
   - Script, named `SeedSheet`, paste `SeedSheet.gs`
   - HTML, named `Index`, paste `Index.html`
5. Save.

## Step 2 — Run the seeder, once

1. Open `SeedSheet.gs`, choose **`seedSection3Sheet`** from the function dropdown, click **Run**.
2. Authorize when prompted. The script needs permission to write to your Sheet.
3. Open the Sheet and check the tabs appeared: `meta`, `mcq`, `fill_blank`, `cube_rows`, `class_data`, `ai_critique_text`, `ai_critique_errors`. Each has a header row and data rows.

## Step 3 — Delete the seeder

In the **Files** sidebar, hover `SeedSheet.gs`, click **⋮ → Remove**, confirm. Removing it
prevents an accidental Run from wiping later Sheet edits.

## Step 4 — Deploy

1. **Deploy → New deployment**, gear icon → **Web app**.
2. Description: `G9 Bio U3 S3 — v1`. Execute as **Me**. Who has access: **Anyone with the link**.
3. **Deploy**, authorize, copy the **Web app URL**.
4. Keep that URL in your own notes. **Do not commit it to this repo**, which is public.

## Step 5 — Embed in Google Sites

Insert → Embed → Embed by URL, paste the Web app URL, and make the iframe tall enough that
students do not get a nested scrollbar. Start around 2000px and adjust. Publish.

## Step 6 — Put the URL on the block pages

The `g9-bio-site` lesson pages name this interactive but do not link it yet. Once the URL
exists, add it to the steps listed for Why Cells Stay Small in `g9-bio-site/INTAKE-NOTES.md`, Unit 3 note 3,
then rebuild that site.

## Updating content, no redeploy needed

Edit the Sheet and reload the deployed URL. `CacheService` holds the JSON for 5 minutes; to
skip the cache once, append `?refresh=1`.

## Updating the page or styling, redeploy needed

Paste the new file contents over the old ones, then
**Deploy → Manage deployments → pencil → Version: New version → Deploy**. The URL is unchanged.

## Snapshot the Sheet back to git

Run `exportSection3Snapshot` from the function dropdown. It writes
`content-snapshot-u3-s3.json` to your Drive root. Download it, replace
`../content-snapshot.json`, and commit.

## Troubleshooting

- **Blank page inside the Google Site iframe.** The deployment must be "Anyone with the link",
  not "Anyone in your domain", and `ServeSection.gs` must keep `setXFrameOptionsMode(ALLOWALL)`.
- **Page loads but nothing is in it.** The Sheet ID in `Code.gs` is wrong, or Step 2 was skipped.
- **Saved answers vanish on another device.** Expected. Apps Script renders inside a sandboxed
  iframe on `googleusercontent.com`, so the browser scopes `localStorage` to that origin and to
  that device. Answers survive a reload on the same machine, and nothing here is graded.
- **Drag and drop does not work on iPad.** The code uses pointer events, not HTML5 drag and
  drop, so touch is supported. If it fails, `Index.html` was pasted from an older copy.
