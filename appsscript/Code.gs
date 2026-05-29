/**
 * Private web-app wrapper for the Kidney Transplant study guide.
 *
 * Serves index.html — the self-contained build produced by build-private.js
 * (Brenner figures base64-inlined). index.html is NOT committed to the public
 * repo; it is generated locally and pushed here with `clasp push`.
 *
 * Access is restricted to the deploying user (see appsscript.json: access=MYSELF),
 * so only you, signed into your Google account, can open the page.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Kidney Transplant — Fellow Orientation')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
