#!/usr/bin/env node
/*
 * build-private.js — produce the private, self-contained study build.
 *
 * Reads the repo HTML (which references Brenner figures by relative path) and
 * inlines each figures/brenner/*.png as a base64 data-URI, writing a single
 * self-contained file to appsscript/index.html for the Apps Script deploy.
 *
 * The copyrighted image bytes live ONLY in figures/brenner/ (gitignored) and in
 * this generated artifact (also gitignored). Nothing copyrighted is committed.
 *
 * Usage:  node build-private.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC_HTML = 'Kidney Transplant — Fellow Orientation v1.html';
const OUT_DIR  = 'appsscript';
const OUT_HTML = path.join(OUT_DIR, 'index.html');

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp' };

let html = fs.readFileSync(SRC_HTML, 'utf8');
let inlined = 0;
const missing = [];

// Every figures/brenner/* reference in this guide is a Brenner companion figure,
// so we can inline by src path alone (order-independent of other img attributes).
html = html.replace(/(src=")(figures\/brenner\/[^"]+)(")/g, (m, pre, rel, post) => {
  const file = path.normalize(rel);
  if (!fs.existsSync(file)) { missing.push(rel); return m; }
  const ext = path.extname(file).toLowerCase();
  const b64 = fs.readFileSync(file).toString('base64');
  inlined++;
  return pre + 'data:' + (MIME[ext] || 'application/octet-stream') + ';base64,' + b64 + post;
});

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_HTML, html);

const mb = (Buffer.byteLength(html, 'utf8') / 1048576).toFixed(2);
console.log(`Inlined ${inlined} figure(s) -> ${OUT_HTML} (${mb} MB self-contained)`);

if (missing.length) {
  console.error('\nWARNING: these figures were not found and were left as relative paths:');
  missing.forEach(f => console.error('  ' + f));
  console.error('Drop the cropped images into figures/brenner/ and re-run.');
  process.exit(1);
}
