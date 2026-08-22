// Shared: G9 Biology _shared/apps-script/ServeSection.gs — keep in sync.
// Reusable doGet pattern. The section's Code.gs supplies SHEET_ID + INDEX_FILE.

function serveSection(sheetId, indexFile, params) {
  const refresh = params && params.refresh === '1';
  const content = loadContent(sheetId, refresh);
  const template = HtmlService.createTemplateFromFile(indexFile);
  template.contentJson = JSON.stringify(content).replace(/<\//g, '<\\/');
  return template.evaluate()
    .setTitle(content.meta && content.meta.section_title ? content.meta.section_title : 'G9 Biology')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
