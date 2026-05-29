// Shared: G9 Biology _shared/apps-script/ContentLoader.gs — keep in sync.
// Reads the section's master Sheet into a JSON object matching content-schema.md.
// Cached via CacheService for CACHE_TTL_SECONDS so reads are fast.

const CACHE_TTL_SECONDS = 300;
const CACHE_KEY_PREFIX = 'content:';

function loadContent(sheetId, forceRefresh) {
  const cache = CacheService.getScriptCache();
  const cacheKey = CACHE_KEY_PREFIX + sheetId;
  if (!forceRefresh) {
    const hit = cache.get(cacheKey);
    if (hit) return JSON.parse(hit);
  }
  const fresh = readAllTabs(sheetId);
  cache.put(cacheKey, JSON.stringify(fresh), CACHE_TTL_SECONDS);
  return fresh;
}

function readAllTabs(sheetId) {
  const ss = SpreadsheetApp.openById(sheetId);
  return {
    meta: readMetaTab(ss),
    mcq: readRowsTab(ss, 'mcq'),
    fill_blank: readRowsTab(ss, 'fill_blank'),
    drag_order: readRowsTab(ss, 'drag_order'),
    ai_critique: readAiCritique(ss),
    levels: readRowsTab(ss, 'levels')
  };
}

function readMetaTab(ss) {
  const sheet = ss.getSheetByName('meta');
  if (!sheet) return {};
  const values = sheet.getDataRange().getValues();
  const out = {};
  for (let i = 1; i < values.length; i++) {
    const key = String(values[i][0] || '').trim();
    if (!key) continue;
    out[key] = values[i][1];
  }
  return out;
}

function readRowsTab(ss, name) {
  const sheet = ss.getSheetByName(name);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(function (h) { return String(h || '').trim(); });
  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const row = {};
    let hasContent = false;
    for (let j = 0; j < headers.length; j++) {
      const cell = values[i][j];
      if (cell !== '' && cell !== null && cell !== undefined) hasContent = true;
      row[headers[j]] = cell;
    }
    if (hasContent) rows.push(row);
  }
  return rows;
}

function readAiCritique(ss) {
  const textSheet = ss.getSheetByName('ai_critique_text');
  const errorsSheet = ss.getSheetByName('ai_critique_errors');
  const flawed = textSheet ? String(textSheet.getRange(2, 1).getValue() || '') : '';
  const errors = errorsSheet ? readRowsTab(ss, 'ai_critique_errors') : [];
  return { flawed_text: flawed, errors: errors };
}

function exportSnapshot(sheetId, sectionLabel) {
  const content = loadContent(sheetId, true);
  const blob = Utilities.newBlob(JSON.stringify(content, null, 2), 'application/json',
    'content-snapshot-' + sectionLabel + '.json');
  return DriveApp.createFile(blob);
}
