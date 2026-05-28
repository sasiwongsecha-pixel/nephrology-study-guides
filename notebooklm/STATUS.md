# Kidney Transplant Fellow Orientation — Build Status

**Branch:** `claude/sweet-haslett-5b89b3`
**Plan version:** v2 (locked, scrutinize patches 1-7 applied)
**Resume instruction:** Read this file + the current ship-point's HTML state. All design decisions are in the conversation; key ones repeated below for cold-start.

---

## Where we are

**BATCH 4 — Ship #3 HLA tab + signature widget + critic ✅ complete**

### Ship #3 delivered
- All 5 HLA stub sections filled (Basics / DSA & MFI / Crossmatch + widget / ABO-i + paired / Desensitization). PRA section unchanged from Ship #1.
- ★ Signature widget: **HLA Compatibility Lab** — interactive 2-side allele grid (recipient + donor) at HLA-A/B/DR, click any allele to cycle through 8 preset alleles per locus. 3 toggleable recipient antibodies (anti-A11 / anti-B44 / anti-DR7). 5 quick-scenario buttons (Half-haplo · Identical sib · Random DDKT · Sensitized · Weak DSA). Live mismatch count + CDC/FCXM/VXM verdicts + GO/CAUTION/STOP decision with rationale text.
- Verified all 5 scenarios produce clinically-correct verdicts: sensitized → all 3 XMs positive, STOP; weak DSA → VXM only, CAUTION; identical → 0/6, GO; random 6/6 no DSA → all neg, GO.
- 9 critic fixes applied (3 blockers + 4 majors + 2 minors):
  - **CDC threshold** — added "simulation" disclaimer (MFI is an imperfect surrogate; titre + IgG subclass + antigen density matter); updated rationale text per Tambur AJT 2018 consensus.
  - **ABO hyperacute timing** — "within minutes" → "within minutes to hours of revascularization."
  - **TTC 2 §17 attribution** — "within 14 days" → "within 2 weeks before surgery (TTC 2 §17)"; KDIGO/TTC requirement split.
  - **Anti-DQ7 row removed** from widget — DQ not in the donor panel, can't fire VXM logic, was pedagogically misleading.
  - **MFI threshold note** — added Tambur 2018 disclaimer to MFI cutoffs.
  - **ABO-i titre attribution** — split between Japanese/Stockholm (≤1:8) and Hopkins (≤1:16).
  - **Orandi NEJM 2016** citation added for desensitized HLA-i graft survival data.
  - **PIRCHE-II vs HLAMatchmaker** — corrected (HLAMatchmaker = eplet; PIRCHE-II = T-cell epitope prediction).
- 3 nits deferred (KDIGO 2009 vs TTC 2 wording, pre-formed DSA + anamnesis caveat, splenectomy historical context).

---

**BATCH 5 — Interactive diagrams A + B + C ✅ delivered**

- **A. Kidney placement anatomy** (Overview § 02) — SVG of iliac fossa placement, vascular anastomoses, ureteric reimplantation, native kidneys, lymphatic stumps, wound. 6 clickable hotspots → complication detail (TRAS, renal vein thrombosis, ureteric stricture/leak, lymphocele, wound infection, native-kidney indications for removal)
- **B. HLA molecule schematic** (HLA § 01) — Class I (α1/α2/α3 + β2m, closed groove, CD8 docking) and Class II (αβ heterodimer, open groove, CD4 docking) side-by-side. 5 hotspots: Class I groove, α3 CD8 site, β2m, Class II groove, β2 CD4 site
- **C. ABMR mechanism cartoon** (HLA § 03) — 5-step interactive: (1) DSA in serum → (2) binds donor HLA → (3) C1q docks → (4) C4d "tattoo" + MAC pore + neutrophil margination → (5) Banff lesions (C4d-PTC, ptc, g, + DSA = active ABMR)
- Generic `.diag-wrap` / `.diag-hotspot` / `.diag-detail` / `.step-controls` CSS patterns added for reuse

---

**BATCH 4 — Ship #3 HLA + interactive widget + critic ✅ complete**
**BATCH 3 — Ship #2 Overview fill + critic ✅ complete**

### Ship #2 delivered
- All 4 Overview stubs filled (Why / Donors / Immuno-in-30s / Drug cheat sheet)
- Added cheat-table CSS + numbers-ribbon CSS to the style block
- Drug cheat sheet: 8-row table (basiliximab, rATG, Tac, MMF, pred, valganciclovir, TMP-SMX, antifungal) with class pills, doses, durations, side effects
- Numbers ribbon in Why-transplant section (5 graft/patient survival stats)
- 7 critic findings applied:
  - "First cousins" → hedged to "cousins" per TTC 2 actual wording
  - ECD definition → added Port 2002 citation + KDPI 2014 supersession note
  - Tacrolimus dose → unambiguous "0.05-0.1 mg/kg q12h (≈0.1-0.2 mg/kg/day total)" — was previously ambiguous
  - Valganciclovir → renal dosing ladder added (900 qd → 450 qd → 450 qod → 450 twice wk by CrCl)
  - Methylpred intra-op → range corrected (125-250 mg standard, 250-500 mg high-risk)
  - Belatacept signal 1 attribution → corrected (purely signal 2)
  - DCD outcomes → hedged with "higher DGF rate (~2× DBD), comparable graft survival"
  - KDIGO Lipid → added year/grade (2013, 2B)
- 3 nit findings deferred (SRTR 2023 attribution, Sharif NODAT citation, "1-yr UNOS recent era" label)

---

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
