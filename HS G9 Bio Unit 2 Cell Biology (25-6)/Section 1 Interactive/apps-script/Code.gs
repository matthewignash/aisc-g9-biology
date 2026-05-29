// G9 Biology · Unit 2 · Section 1 — Apps Script entry point.
// Configure SHEET_ID before deploying. The two shared files (ContentLoader.gs,
// ServeSection.gs) are copies of _shared/apps-script/* — re-sync if those change.

const SHEET_ID = '1zPY_mBm1BwdP4TRJQq2O5L1EDucLAlI-69LliQW8LPo';
const INDEX_FILE = 'Index';

function doGet(e) {
  return serveSection(SHEET_ID, INDEX_FILE, (e && e.parameter) || {});
}

function exportSection1Snapshot() {
  return exportSnapshot(SHEET_ID, 'u2-s1');
}
