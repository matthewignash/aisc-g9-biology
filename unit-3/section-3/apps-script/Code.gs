// G9 Biology · Unit 3 · Section 3 — Why Cells Stay Small. Apps Script entry point.
// Configure SHEET_ID before deploying. The two shared files (ContentLoader.gs,
// ServeSection.gs) are copies of _shared/apps-script/* — re-sync if those change.

// Replace with your own Sheet ID. Create an empty Google Sheet in your Drive,
// copy the ID out of its URL (the long string between /d/ and /edit), and paste it here.
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const INDEX_FILE = 'Index';

function doGet(e) {
  return serveSection(SHEET_ID, INDEX_FILE, (e && e.parameter) || {});
}

function exportSection3Snapshot() {
  return exportSnapshot(SHEET_ID, 'u3-s3');
}
