# Section 1 — Apps Script Deployment

This folder is what you upload to a Google Apps Script project. When deployed, it serves the Section 1 page from a `script.google.com` URL that you can embed in your class Google Site.

## Files in this folder

| File | What it is | Keep? |
|---|---|---|
| `Code.gs` | Section 1 entry point. Has the Sheet ID and the `doGet` handler. | Yes |
| `ContentLoader.gs` | Reads the master content Sheet into JSON (cached). Copied from `_shared/apps-script/`. | Yes |
| `ServeSection.gs` | Reusable doGet that injects the JSON into `Index.html`. Copied from `_shared/apps-script/`. | Yes |
| `Index.html` | The student-facing page. | Yes |
| `SeedSheet.gs` | **One-time use.** Populates the seven tabs in the empty Sheet with the starter content. | Delete after first run |

Before you start, create an empty Google Sheet in your Drive and copy its Sheet ID (the long string between `/d/` and `/edit` in the URL). You'll paste it into `Code.gs` in Step 1.

## Step 1 — Create the Apps Script project

1. Go to **script.google.com**, click **New project**.
2. Rename the project to: `G9 Bio U2 S1 Web App`.
3. Delete the default `Code.gs` content. Paste the contents of this folder's `Code.gs`. **Replace `YOUR_SHEET_ID_HERE` on line 7 with the Sheet ID you copied above.**
4. Add four more files via the `+` button next to **Files**:
   - Script → name it `ContentLoader` → paste `ContentLoader.gs`
   - Script → name it `ServeSection` → paste `ServeSection.gs`
   - Script → name it `SeedSheet` → paste `SeedSheet.gs`
   - HTML → name it `Index` → paste `Index.html`
5. Save (Cmd/Ctrl + S).

## Step 2 — Run the seeder (one time)

1. In the Apps Script editor, open `SeedSheet.gs`.
2. From the function dropdown at the top of the toolbar, choose **`seedSection1Sheet`**.
3. Click **Run**.
4. Authorize when prompted — the script needs permission to write to your Sheet.
5. Open the master Sheet in another tab. Verify that seven tabs appeared: `meta`, `mcq`, `fill_blank`, `drag_order`, `ai_critique_text`, `ai_critique_errors`, `levels`. Each should have a header row and data rows.

## Step 3 — Delete the seeder

1. Back in the Apps Script editor, in the **Files** sidebar, hover over `SeedSheet.gs` and click the **⋮** menu → **Remove**.
2. Confirm. The seeder is no longer needed and removing it prevents an accidental Run from wiping any future Sheet edits.

## Step 4 — Deploy

1. Click **Deploy → New deployment**.
2. Click the gear icon → **Web app**.
3. Description: `G9 Bio U2 S1 — v1`.
4. Execute as: **Me**.
5. Who has access: **Anyone with the link**.
6. Click **Deploy**.
7. Authorize when prompted.
8. Copy the **Web app URL**. Save it in your own notes (Drive, password manager, wherever). Don't commit it to the public repo.

## Step 5 — Embed in Google Sites

1. Open your Google Site for the class.
2. On the page where Section 1 should live, choose **Insert → Embed**.
3. Paste the Web app URL. Choose "Embed by URL".
4. Resize the iframe tall enough that students don't get a nested scrollbar (start around 2000px; adjust to taste).
5. Publish.

## Updating content (no redeploy needed)

1. Edit the Sheet directly.
2. Reload the deployed URL. `CacheService` keeps the JSON for 5 minutes — to skip the cache once, append `?refresh=1`: `<your-url>?refresh=1`.

## Updating the page or styling (redeploy needed)

If you change `Index.html`, `ContentLoader.gs`, `ServeSection.gs`, or `Code.gs`:

1. Paste the new contents over the old file in the Apps Script editor.
2. **Deploy → Manage deployments → pencil icon → Version: New version → Deploy.**
3. The same URL keeps working — Apps Script silently updates the served version.

## Snapshot the Sheet back to git

To freeze the current Sheet state in the repo (after content edits):

1. In the Apps Script editor, select the function `exportSection1Snapshot` from the dropdown.
2. Click **Run**.
3. It writes `content-snapshot-u2-s1.json` to your Drive root. Download it and replace `../content-snapshot.json`. Commit.

## Troubleshooting

- **`seedSection1Sheet` fails with permission error.** First-run authorization is split: you have to grant Sheet access. Click the function again, this time clicking through the OAuth dialog.
- **Page is blank inside the Google Site iframe.** Make sure the deployment is set to "Anyone with the link" (not "Anyone in your domain") and that `setXFrameOptionsMode(ALLOWALL)` is in `ServeSection.gs`.
- **Page loads but section title is "G9 Biology"** with no content showing. The Sheet ID in `Code.gs` is wrong or you skipped Step 2.
- **`localStorage` is not persisting.** Apps Script web apps render inside a sandboxed iframe at `googleusercontent.com`. Browser scopes `localStorage` to that iframe origin — answers persist across reloads on the same device + browser, but not across different devices. Fine for the pilot.
- **Drag-and-drop doesn't work on iPad.** Make sure you pasted the latest `Index.html`. The code uses pointer events, not HTML5 drag-drop, so touch is supported.
