# Private deploy — Google Apps Script (clasp)

Serves the study guide **privately**: only you, signed into your Google account,
can open it (`access: MYSELF` in `appsscript.json`). The copyrighted Brenner
figures live only in the locally-generated `appsscript/index.html` — never in the
public repo.

## One-time setup

1. **Install clasp** (needs Node):
   ```
   npm install -g @google/clasp
   ```
2. **Enable the Apps Script API** for your Google account (one toggle):
   <https://script.google.com/home/usersettings> → turn **Apps Script API** ON.
3. **Log in:**
   ```
   clasp login
   ```
   (Opens a browser consent screen — this is the step only you can do.)
4. **Create the Apps Script project**, pointing it at this folder:
   ```
   clasp create --type webapp --title "KT Fellow Orientation (private)" --rootDir appsscript
   ```
   This writes a `.clasp.json` (your private project id — gitignored).
   - If `clasp create` overwrites `appsscript/appsscript.json` with a default,
     restore the committed one (it presets `access: MYSELF`):
     ```
     git checkout -- appsscript/appsscript.json
     ```

## Build + push (repeat on every content change)

From the repo root:
```
node build-private.js      # inlines the 7 Brenner figures -> appsscript/index.html (~3.4 MB)
clasp push -f              # uploads Code.gs + appsscript.json + index.html
```

## Deploy / get your private URL

Easiest via the editor UI (`clasp open`):
1. **Deploy → New deployment → Web app**
2. **Execute as:** Me · **Who has access:** Only myself
3. **Deploy** → copy the `.../exec` URL. That is your private page (works on
   your phone too, as long as you're signed into the same Google account).

On later updates: `node build-private.js` → `clasp push -f` → **Deploy → Manage
deployments → (edit) → New version**.

## Notes / troubleshooting

- **Sandbox quirk:** Apps Script serves the page inside an iframe, so URL-hash
  deep-links (`#hla`, `#ov-timeline`) won't drive the wrapper URL. Tabs,
  accordions, the timeline / crossmatch / T-cell widgets, and the figure
  lightbox all work normally.
- **If `clasp push` rejects index.html on size:** recompress the figures
  (e.g. re-crop at a lower `--zoom`, or convert the PNGs to quality-85 JPEG) and
  rebuild — that typically cuts the artifact well under any limit.
- **The page is blank / "needs authorization":** re-deploy with *Execute as: Me*
  and authorize the scopes once when prompted.
