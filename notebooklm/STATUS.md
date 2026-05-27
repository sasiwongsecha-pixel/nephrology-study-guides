# Kidney Transplant Fellow Orientation — Build Status

**Branch:** `claude/sweet-haslett-5b89b3`
**Plan version:** v2 (locked, scrutinize patches 1-7 applied)
**Resume instruction:** Read this file + the current ship-point's HTML state. All design decisions are in the conversation; key ones repeated below for cold-start.

---

## Where we are

**BATCH 2 — NotebookLM briefings + Ship #1 skeleton ✅ complete**

### Ship #1 delivered
- `Kidney Transplant — Fellow Orientation v1.html` — 4-tab skeleton
- Overview tab: full post-tx complication timeline widget (SVG, 11 clickable bands with phase/category/click-for-detail), anchor TOC, section structure with 4 stubs awaiting Ship #2 content
- HLA tab: anchor TOC + one fully-worked collapsible card (PRA/cPRA with all 3 layers + Thai callout + Check yourself) + 5 stubs
- IS tab: anchor TOC + one fully-worked drug card (Tacrolimus, 4 expandable details + Thai callout + 2 Check yourself questions) + 6 stubs
- Rejection tab: anchor TOC + one mini-comparison (TCMR vs ABMR core + Banff categories at a glance + Check yourself) + 3 stubs
- All worked-example sections use the locked 3-layer pattern (core-box / expandable details / 🇹🇭 callout) + per-section "✓ Check yourself"
- Interactive features verified: tab switching, timeline band click→detail, details/summary expansion, expand-all toggle, sticky anchor TOC, reading progress bar, URL-hash deep-linking

### Briefing generation tasks (kicked off)

| Artifact | Task ID | Destination |
|---|---|---|
| Overview briefing | `e4121acf-6203-48a9-90f4-8e5985a8d021` | `notebooklm/01_overview.md` |
| HLA briefing | `76fddac0-b155-402e-ac37-6f61aa1e060e` | `notebooklm/02_hla.md` |
| IS briefing | `b802d305-1b54-4dff-8bc2-9a948a69cd85` | `notebooklm/03_immunosuppression.md` |
| Rejection briefing | `5ea6d805-258d-4896-8e1d-ea982ddbf12a` | `notebooklm/04_rejection.md` |
| Master study guide | `3d360570-9e57-4a16-a019-e60cee75c5aa` | `notebooklm/00_study_guide.md` |

Background subagent dispatched to wait + download. ETA 5-15 min each, parallel.

---

**BATCH 1 — Step 0 verification ✅ complete**

### Gate A — Repo context ✅
Explore subagent mapped visual identity from `nephrology_v3.html` + `Sodium Handling Deep Dive v2.html`.
- Palette: dark-clinical (`--bg #0f172a`, surface `#1e293b`, text `#f1f5f9`, accent teal `#0d9488/#14b8a6`)
- Typography: Segoe UI, 14.5px body, 1.65 line-height, H1 38px
- Tab pattern: `.sg-tabs/.na-tabs` flex row + `.sg-panel.active` (display block, fadeIn keyframe)
- Card pattern: `.card { background: var(--surface); border-radius: 12px; padding: 20px }`
- Callout: `.risk-panel { border: 2px solid; border-radius: 12px; padding: 22px }`
- Citation style: `.diag-src { font-size: 10px; color: var(--text-dim); font-style: italic }`
- v3 has TRANSPLANT PLACEHOLDER (mindmap node "Dialysis & Transplant > Transplant > Preemptive/Immunosuppression/Late Referral") but no deep content. **DECISION:** new file — mirror sodium deep dive pattern. Don't bloat v3.

### Gate B — Source identification ✅
| File | Identification |
|---|---|
| `99555.pdf` | **Belal et al, World J Nephrol 2025** — generalist review of KT care. Supplementary, NOT Banff. |
| `KITxpGL_summary.pdf` | **KDIGO 2009 KTR Guideline summary** (Kasiske, Kidney Int 2009). Core source for IS tab dosing. ✓ |
| `KDIGO-2020-Transplant-Candidate-Guideline.pdf` | KDIGO 2020 candidate evaluation. ✓ |
| `CF-1107-THAI_TRANSPLANT_CARE_2025` | **TTC 4 (2025)** — Practice Guidelines on Immunosuppression + ID management in SOT. Thai language. Primary Thai-practice source. ✓ |
| `TTC kidney.pdf` | TTC 1, Thai Transplantation Society, Sept 2014 (Thai language) |
| `TTC2 Living KT.pdf` | TTC 2, TTS Sept 2016, Living Donor (Thai language) |
| `TTC3.pdf` | TTC 3, TTS Sept 2020, KT Candidate/Recipient (Thai language) |

**~~GAP — Banff 2022 missing locally.~~** ✅ Banff 2022 IS in the NotebookLM "Kidney transplant" notebook as source `927f55c9` — Naesens et al, AJT 2024 (24:338-349), "The Banff 2022 Kidney Meeting Report." Primary source for Rejection tab + Banff explorer. No external fetch needed.

**NOTE on Thai PDFs:** pdftotext doesn't render Thai script (output is glyph soup for body text, English headings only). Must rely on NotebookLM extraction for Thai content — NotebookLM handles native PDF text layers properly.

### Gate C — NotebookLM CLI ✅
- `notebooklm-py v0.3.4` installed; auth restored
- CLI: `PYTHONIOENCODING=utf-8 python -m notebooklm <cmd>` (needs UTF-8 env on Windows cp874 console)
- CLI prints `Matched: ...` lines to stdout BEFORE JSON output — must `tail -n +2` or `+3` before `python -m json.tool`
- Target notebook: `8e49d619-1fae-4e94-9293-888f5e4d701c` ("Kidney transplant")
- **Sources in target notebook (10 ready, 1 junk):**
  - `88a890bc` Brenner Ch 68 Immunobiology of Transplantation
  - `3a1d2978` Brenner Ch 69 Clinical Management of KT
  - `51dadbac` Brenner Ch 70 Living Kidney Donation
  - `927f55c9` **Banff 2022** (Naesens et al, AJT 2024)
  - `d7d78c02` TTC 1 (2014, Thai)
  - `01a1f4f7` TTC 2 Living KT (2016, Thai)
  - `9876bd3a` TTC 3 KT Candidate (2020, Thai)
  - `aacb618c` KDIGO 2009 KTR summary
  - `ff746d43` KDIGO 2020 Candidate
  - `aeef7835` TTC 4 (2025) Practice Guidelines on IS + ID in SOT (Thai)
  - `84d74a2a` ⚠️ junk source ("Checking your browser — reCAPTCHA"), failed scrape, ignore

### Patch 7 (Explore visual identity) ✅
Done as part of Gate A. Full pattern reference captured above.

---

## Pending user decisions before Batch 2

1. **Run `python -m notebooklm login`** to restore NotebookLM auth.
2. **Banff 2022 source:** (a) I fetch Loupy 2022 from PubMed/AJT next batch, (b) check if it's already in your NotebookLM notebook, or (c) skip Banff 2022 and rely on Brenner Ch 68/69 + older Banff.
3. **Confirm: new file** `Kidney Transplant — Fellow Orientation v1.html` (recommended) vs. extend `nephrology_v3.html` (Explore's suggestion).

---

## Round 1 ship sequence (locked v2 plan)

```
Batch 1: Step 0  ← we are here
Batch 2: NotebookLM briefings (5 background subagents) + Ship #1 skeleton + Overview timeline
Batch 3: Ship #2 — Overview tab fill + critic
Batch 4: Ship #3 — HLA tab + HLA visualizer + critic
Batch 5: Ship #4 — IS tab + drug grid + T-cell overlay + critic
Batch 6: Ship #5 — Rejection tab + Banff explorer + 2 critic passes + PR
```

## Locked design decisions (cold-start summary)

- **Audience:** Thai/Siriraj nephrology fellow, zero-knowledge baseline
- **Source hierarchy:** KDIGO (global) → TTC 4 / TTC 1-3 (Thai national, 🇹🇭 callout) → Siriraj (local, if supplied)
- **Tabs (R1):** Overview · HLA & Crossmatch · Immunosuppression · Rejection
- **Tabs (R2 later):** Infections · Long-term · Recurrent disease · comprehensive quiz
- **Depth:** 3-layer progressive disclosure (core box always visible / expandable detail / 🇹🇭 callout)
- **In-tab nav:** sticky anchor TOC + collapsible cards (no sub-tabs)
- **Widgets:** 1 signature per tab (timeline / HLA visualizer / IS drug grid + T-cell overlay / Banff lesion explorer)
- **Per-section "✓ Check yourself":** open-ended Q + click-to-reveal A, `<details><summary>` based
- **Audio:** skip
- **Critic cadence:** per-tab (not end-of-round)
- **Verbatim claim fallback:** `python -m notebooklm ask --json` with `cited_text` cross-check
- **Thai callout query template:** structured per-section query; if TTC silent, say "🇹🇭 silent — defer to KDIGO"
- **Filename:** `Kidney Transplant — Fellow Orientation v1.html`
- **Briefings storage:** `./notebooklm/` (committed)
- **Commit cadence:** 1 commit per ship-point (5 in R1)

## Subagent inventory for R1 (10 total)

- 1× Explore (Patch 7) ✅ done
- 4× general-purpose (background NotebookLM waits)
- 5× critic (4 per-tab + 1 Banff-specific)

## Operational notes

- Bash on Windows mangles `📚` Unicode paths → use PowerShell, or copy PDFs to `C:\temp\kt_pdfs\` (already done)
- `pdftotext.exe` lives at `C:\Program Files\Git\mingw64\bin\pdftotext.exe`
- `pdftotext` does not extract Thai script properly; route Thai content through NotebookLM
