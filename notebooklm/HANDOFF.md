# Kidney Transplant — Fellow Orientation v1 · Cold-Start Handoff

**Read this file + `notebooklm/STATUS.md` and you can resume the project from a fresh session with zero prior context.**

---

## TL;DR — where we are

- **Project:** Interactive HTML study guide on kidney transplant for a zero-knowledge Thai nephrology fellow.
- **Repo:** `sasiwongsecha-pixel/nephrology-study-guides`, branch `claude/sweet-haslett-5b89b3` (worktree). `main` already has every commit pushed.
- **Live URL** (public Pages): https://sasiwongsecha-pixel.github.io/nephrology-study-guides/Kidney%20Transplant%20%E2%80%94%20Fellow%20Orientation%20v1.html
- **Last commit:** `5cc81ee` — U3 HLA Lab v2 (DQ locus + threshold/C1q toggles + clinical-risk warning banner).
- **File state:** 233 KB single-file HTML, all CSS + JS inline.
- **Round 1 status: 9 of 10 batches done. Only Ship #5 (Rejection tab) remains.**

## Resolved decisions (BATCH 9, was "pending")

1. **Privacy infrastructure — DECIDED: Google Apps Script.** Private web-app (`access: MYSELF`), base64-inlined single file. NOT GitHub Pro. The public GitHub repo stays public but figure-free; the figure-embedded build lives only in the private Apps Script deployment. See `appsscript/DEPLOY.md`.
2. **Click-to-zoom — DECIDED: lightbox overlay.** Reusable `#fig-lightbox` (click any `.brenner-fig` → full-screen; Esc/click dismisses).

## Workflow CHANGE (BATCH 9) — I now run /figure-crop on Brenner myself

⚠️ **The old "user-crops-only, never /figure-crop on Brenner" rule is REVERSED.** The user explicitly directed me to extract Brenner figures with `/figure-crop` and integrate them. This is safe because the figures are kept out of the public repo (see copyright hygiene below) and served only from the private Apps Script build.

**Copyright hygiene (load-bearing):** Brenner image bytes live ONLY in `figures/brenner/` (gitignored) and the generated `appsscript/index.html` (gitignored). The public repo keeps the `.fig-card` markup + captions (original work) but never the image bytes. `build-private.js` inlines base64 at build time. Verify with `git show --stat` that no commit contains image bytes.

### (historical) original figure workflow — superseded by the above

### Folder convention (proposed; user may rename)
```
figures/brenner/chXX_figXX-NN_short-descriptor.jpg
```

### Per-figure workflow when an image arrives
1. User tells me: file path + where in the guide it should appear + optional teaching context
2. I write a `.fig-card` (existing CSS pattern in the file) with:
   - `<img src="figures/brenner/...">`
   - Neutral caption (1-2 sentences max)
   - Source attribution line: *"Brenner & Rector's The Kidney, 12e, Fig XX-NN — personal study material"*
   - Optional click-to-zoom (deferred decision)
3. Commit + push + Pages-verify (or skip Pages depending on privacy decision above)

**Never run `/figure-crop` on Brenner PDFs to bulk-extract figures.** Existing permissively-sourced figures stay in place:
- `figures/pdb_1hsa.jpeg` (HLA-A2, CC0)
- `figures/pdb_2bnq.jpeg` (HLA-DR1, CC0)
- Custom SVG diagrams (kidney anatomy, HLA molecule, ABMR cartoon, T-cell signaling, SRTR KM curve) — all my original work

## Ship #5 — only remaining batch

**Scope:** Rejection tab fully filled + Banff lesion explorer (the signature widget) + final 2 critic passes (one on content, one specifically on Banff scoring thresholds) + PR opened.

### Existing Rejection tab state
Currently has anchor TOC + one worked example (§ 02 TCMR vs ABMR mini-comparison with Banff 2022 three-pillar criteria already verbatim from the critic round — DO NOT re-derive these). Sections § 01 / § 03 / § 04 / § 05 are stubs.

### Ship #5 plan (locked across grill + scrutinize rounds)
1. **§ 01 Mechanism** — TCMR vs ABMR cellular biology, why they need different treatments
2. **§ 03 Banff 2022 lesion explorer** — signature widget. Clickable biopsy schematic. Each lesion (i, t, v, g, ptc, C4d, cg, ci, ct, cv, ah, ti, i-IFTA, t-IFTA) clickable → verbatim scoring criteria from Naesens 2024 AJT (already in NotebookLM source `927f55c9`). Plus PMC CC-BY micrograph search for real H&E/PAS/C4d images per lesion (fallback to text-only per lesion if no CC-BY source).
4. **§ 04 Treatment ladder** — TCMR (steroids → rATG), ABMR (PLEX + IVIG + rituximab → bortezomib/eculizumab refractory), chronic active ABMR (no proven therapy)
5. **§ 05 Chronic active ABMR + cg lesion** — late graft loss driver
6. **Per-section "✓ Check yourself"** + **🇹🇭 Thai callout** with TH geo-tag pill
7. **Critic #1** — full Rejection tab content vs KDIGO, Brenner Ch 68/69
8. **Critic #2 (separate, per scrutinize patch 6)** — Banff lesion explorer scoring thresholds verbatim vs Naesens 2024
9. **Apply fixes, commit, push, open PR**

### PMC CC-BY micrograph workflow (when Ship #5 starts)
- Search PubMed Central for `("antibody-mediated rejection" OR Banff) AND open-access` filtered to recent reviews
- For each candidate paper, verify CC-BY license + identify which Banff lesion images are present
- `/figure-crop` extract small portions with conspicuous attribution
- Lesions with no permissive source → text-only criteria in explorer (do not fall back to Tier 3)

## Locked design decisions (DO NOT re-grill)

| Topic | Decision |
|---|---|
| Audience | Thai/Siriraj nephrology fellow, zero-knowledge baseline |
| Source hierarchy | KDIGO global → 🇹🇭 TTC 1-4 national overlay → Siriraj local if supplied |
| Tabs (R1) | Overview · HLA & Crossmatch · Immunosuppression · Rejection |
| Tabs (R2, future) | Infections · Long-term · Recurrent disease · Comprehensive quiz |
| Depth pattern | 3-layer progressive disclosure: core-box (always visible) → expandable detail → 🇹🇭 callout with "TH" pill |
| In-tab nav | Sticky anchor TOC + collapsible cards (no sub-tabs) |
| "Check yourself" | Open-ended Q + click-to-reveal A, `<details><summary>` based, per section |
| Audio overview | Skip |
| Critic cadence | Per-tab (not end-of-Round) + separate critic on Banff explorer for Ship #5 |
| Filename | `Kidney Transplant — Fellow Orientation v1.html` |
| Briefings storage | `./notebooklm/` (committed) |
| Commit cadence | 1 commit per ship-point |
| Figure tier policy | Tier 1 (CC0/public-domain) + Tier 2 (CC-BY) only. Tier 3 (Brenner, commercial AJT) only when user supplies the cropped image themselves. No bulk extraction by me. |

## File map

```
.
├── Kidney Transplant — Fellow Orientation v1.html  (233 KB, single-file)
├── README.md  (lists all 3 guides + live URLs)
├── figures/
│   ├── pdb_1hsa.jpeg   (CC0, HLA-A2)
│   ├── pdb_2bnq.jpeg   (CC0, HLA-DR1)
│   └── brenner/        (NEW — user populates with their own crops)
├── notebooklm/
│   ├── STATUS.md       (running log per batch)
│   ├── HANDOFF.md      (this file)
│   ├── 00_study_guide.md
│   ├── 01_overview.md
│   ├── 02_hla.md
│   ├── 03_immunosuppression.md
│   └── 04_rejection.md
└── Sodium Handling Deep Dive v2.html  (unrelated, sibling guide)
```

## Technical gotchas (must know)

1. **Bash on Windows mangles the `📚` in `D:\medicine si\📚 Study Materials\...`** — paths become `??`. Use PowerShell, or copy files to `C:\temp\` first.
2. **`pdftotext` location:** `C:\Program Files\Git\mingw64\bin\pdftotext.exe`. Doesn't render Thai script properly — route Thai content through NotebookLM.
3. **NotebookLM CLI:**
   - Invoke as `PYTHONIOENCODING=utf-8 python -m notebooklm <cmd>` (cp874 console encoding fix)
   - CLI prints `Matched: ...` lines to stdout BEFORE JSON. Strip with `tail -n +2` (or `+3` for nested matches) before parsing JSON.
   - Target notebook ID: `8e49d619-1fae-4e94-9293-888f5e4d701c` ("Kidney transplant")
   - Auth expires periodically — re-run `python -m notebooklm login` if calls fail with "Authentication expired."
   - Key sources in notebook by ID: `88a890bc` Brenner Ch 68 · `3a1d2978` Brenner Ch 69 · `51dadbac` Brenner Ch 70 · `927f55c9` **Banff 2022 (Naesens AJT 2024)** · `d7d78c02`/`01a1f4f7`/`9876bd3a` TTC 1/2/3 · `aacb618c` KDIGO 2009 KTR · `ff746d43` KDIGO 2020 Candidate · `aeef7835` TTC 4 (2025) · `84d74a2a` ⚠️ junk (failed reCAPTCHA scrape, ignore)
4. **Pages rebuild watcher pattern** (one-shot until-loop, run in background):
   ```bash
   until status=$(gh api repos/sasiwongsecha-pixel/nephrology-study-guides/pages/builds/latest --jq '.status'); \
     [ "$status" = "built" ] && \
     [ "$(gh api ...builds/latest --jq '.commit' | cut -c1-7)" = "$(git rev-parse HEAD | cut -c1-7)" ]; \
   do sleep 8; done
   ```
5. **Git push from worktree to main:** `git push origin claude/sweet-haslett-5b89b3:main` (fast-forwards origin/main to our branch tip). User's branch never needs to be checked out locally as `main`.
6. **Critic subagent invocation** — give it a file path + specific claims to verify (with line refs if possible) + ask for severity-ordered findings under a word cap. Critic has WebFetch/PubMed; it doesn't need NotebookLM.
7. **Preview server:** `mcp__Claude_Preview__preview_start` with name `sodium-deep-dive` (configured in `.claude/launch.json` to `npx serve . --listen 3737`).

## Resume instructions for a fresh session

```bash
# 1. Verify state
git log --oneline -5
git status
# Expected: on branch claude/sweet-haslett-5b89b3, clean tree, latest commit = U3 / 5cc81ee or later

# 2. Read this handoff + STATUS.md
cat notebooklm/HANDOFF.md
cat notebooklm/STATUS.md

# 3. If a new Brenner figure has been dropped, find it
ls figures/brenner/

# 4. If proceeding to Ship #5, verify NotebookLM auth + Banff 2022 source
PYTHONIOENCODING=utf-8 python -m notebooklm source list -n 8e49d619 2>&1 | tail -n +2 | head -20

# 5. Live URL check
curl -sIL https://sasiwongsecha-pixel.github.io/nephrology-study-guides/Kidney%20Transplant%20%E2%80%94%20Fellow%20Orientation%20v1.html | head -3
```

## Recommended first move in fresh session

**Ask the user:**
1. "Have you made the privacy decision (a/b/c/d) yet?"
2. "Is there a new Brenner figure file in `figures/brenner/` waiting for integration? If so, where in the guide should it go?"
3. "Otherwise — proceed to Ship #5 (Rejection tab + Banff explorer)?"

**Then execute whichever they pick.** Don't re-derive locked decisions; trust the locked-decisions table above.
