# MBH-103: Mahabharata Content Audit Report

**Date**: 2026-04-08 | **Status**: COMPLETE — NEEDS ATTENTION

---

## Executive Summary

Only **3 of 18 parvas** have ingested data. The backlog and CLAUDE.md claim "18/18 ✅ Complete" — this is inaccurate and must be corrected.

---

## Parva-by-Parva Inventory

| Parva | Name | Expected Adhyayas (BORI) | Actual Files | Verses (approx) | Authors | Status |
|-------|------|--------------------------|--------------|-----------------|---------|--------|
| 1 | Adi Parva | 225 | 225 flat files | ~13,455 | km_ganguli | ⚠️ PRESENT but NOT in manifest |
| 2 | Sabha Parva | 72 | 72 (parva-2/) | ~2,390 | km_ganguli | ✅ In manifest |
| 3 | Vana Parva | 299 | 299 (parva-3/) | ~10,234 | km_ganguli | ✅ In manifest |
| 4–18 | All remaining | ~1,400+ | 0 | 0 | — | ❌ MISSING |

**Total present**: 3 / 18 parvas (17%)

---

## Data Structure Findings

### Parva 1 (Adi Parva) — Flat Files, Not in Manifest
- Files: `data/3-gold/mahabharata/mahabharata-parva-1-adhyaya-N.json`
- Format: NVF (list of fragments with `id`, `text_slug`, `chapter`, `verse`, `original`, `meaning`, `layers`)
- Author: `km_ganguli` only
- **Issue**: These files are NOT referenced in `manifest.json` shards array. The app routing uses the manifest, so parva 1 is effectively inaccessible via the current `VedicDataService`.

### Parvas 2–3 — Directory Format, In Manifest
- Files: `data/3-gold/mahabharata/parva-N/adhyaya-M.json`
- Format: NVF (same schema as parva 1)
- Author: `km_ganguli` only
- Commentary layers: Sparse — most fragments have only translation layer, no scholarly commentary

### Manifest Discrepancies
- `manifest.json` declares `total_chapters: 371`, `total_verses: 12624`
- Manifest `shards` only lists parva-2 and parva-3 entries
- Parva 1 flat files are completely absent from manifest shards
- Declared authors: `dnyaneshwari-en`, `iskcon-en`, `kmg` — but only `km_ganguli` found in actual data

---

## Backlog Errors Identified

| Claim | Reality |
|-------|---------|
| "18/18 Parvas ingested ✅" in CLAUDE.md | 3/18 parvas present (17%) |
| Adi Parva "19 Adhyayas" in backlog table | 225 adhyaya files actual |
| Vana Parva "267 Adhyayas" in backlog table | 299 adhyaya files actual |
| Sabha Parva "72 Adhyayas" | ✅ Correct |

---

## Action Items

1. **Update CLAUDE.md** metrics: `Mahabharata Parvas ingested: 3/18` (not 18/18)
2. **Update backlog ingestion table** with correct status per parva
3. **Add parva-1 to manifest.json shards** so it's accessible via VedicDataService
4. **MBH-104**: AI enrichment scoped to parvas 1–3 only
5. **MBH-105**: Cross-reference validation scoped to available 3 parvas
6. **Future work**: Ingest parvas 4–18 before claiming full Mahabharata coverage

---

## Verdict: NEEDS ATTENTION

The ingestion baseline is 3/18 parvas. All downstream EPIC 10 tasks (MBH-104 through MBH-505) must be scoped to the 3 available parvas only. The "18/18 ✅" claim is an inaccuracy introduced in prior release notes and must be corrected.
