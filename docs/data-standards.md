# Vishwa-Vani Data Standards — Bronze / Silver / Gold

**Version:** 1.0 | **SDLC:** v5.1 | **Last updated:** 2026-04-25

This document defines the minimum required fields, quality thresholds, and promotion gates for each data tier in the Vishwa-Vani NVF 1.3 pipeline. All agents (Claude, Jules, Antigravity) must consult this before writing, promoting, or auditing data.

---

## Tier Summary

```
[Raw Source] → BRONZE → SILVER → GOLD → available:true in lib/texts.ts
                (raw)  (struct.) (prod.)
```

- **BRONZE** — Raw acquired text. No structure. No validation.
- **SILVER** — Structured as NVF JSON. May have placeholders. Not UI-ready.
- **GOLD** — 100% complete, validated, authentic. Ready to wire directly to the reader UI.

---

## BRONZE — Raw Acquisition

**Location:** `data/1-bronze/`
**Format:** Any (HTML, TSV, PDF, plain text, OCR output)
**Purpose:** Hold raw scraped or downloaded source material exactly as obtained.

### Requirements

- File named descriptively: `{book}-{source}-{format}.{ext}` (e.g. `mahabharata-kmg-vol1.html`)
- Source URL or publication metadata in a companion `.meta.txt` (same base name)
- No NVF structure needed
- No validation gate — anything may be bronze

### Explicitly Allowed

- Incomplete chapters (partial acquisition is fine)
- Mixed scripts (IAST, ASCII, Devanagari)
- OCR artifacts and noise
- Missing verse numbers

### Never Do

- Promote directly from bronze to gold (silver stage is mandatory)
- Delete bronze originals after promotion (keep them for re-processing)

---

## SILVER — Structured, Work-In-Progress

**Location:** `data/2-silver/{book-slug}/{book-slug}-chapter-N.json`
**Format:** NVF 1.3 JSON array of verse objects
**Purpose:** Sanskrit text is properly structured and parseable. Commentary/translation layers may still be incomplete or placeholder. Pipeline validation passes.

### Required Fields Per Verse

```json
{
  "id": "{text_slug}_{chapter}_{verse}",
  "text_slug": "book-slug",
  "chapter": 1,
  "verse": 1,
  "original": "Sanskrit Devanagari text (≥ 5 chars)",
  "transliteration": "IAST transliteration (≥ 5 chars)",
  "layers": [/* at least 1 layer */]
}
```

### Required Fields Per Layer

```json
{
  "author": "author-key",
  "lang": "en",
  "type": "commentary | translation | meaning",
  "content": "text content"
}
```

### Silver Quality Thresholds

- `original` must not be `"Mock Verse"`, blank, or fewer than 5 chars
- `transliteration` must not be `"Mock Transliteration"`, blank, or fewer than 5 chars
- At least 1 layer per verse with `lang: "en"` and non-empty content
- `[PLACEHOLDER_*]` bracket content is **allowed** at silver (marks a known gap)
- Generic filler strings (`THIS IS A GENERIC PLACEHOLDER`, `INSERTED TO SATISFY THE MINIMUM LENGTH`) are **NOT allowed** even at silver — these indicate corrupted data, not a real work-in-progress placeholder

### Validation Gate

Run `python3 scripts/vishwa.py validate {book-slug}` before any promotion.
Must exit 0. Fix all failures before proceeding.

---

## GOLD — Production-Ready

**Location:** `data/3-gold/{book-slug}/{book-slug}-chapter-N.json`
**Format:** NVF 1.3 JSON array — hardened, fully populated
**Purpose:** Every field is complete, authentic, and UI-ready. The reader can be pointed directly at gold data with no further transformation.

Gold is the **only tier that may be connected to the UI** (`available: true` in `lib/texts.ts`).

---

### GOLD Checklist — Per Verse (all must pass)

#### 1. Sanskrit Core

- [ ] `original` — Devanagari Sanskrit, ≥ 10 chars, verse-complete (no mid-verse truncation)
- [ ] `transliteration` — IAST standard, ≥ 10 chars
- [ ] `translation` — Base English prose translation (attributed), ≥ 20 chars
- [ ] `meaning` — Word-by-word Sanskrit→English breakdown (e.g. `karma — action; yoga — union`), ≥ 20 chars

#### 2. Commentary Layers — Minimum 6 Layers Per Verse

| Slot | Author | Language | Type | Min Length | Must Be Authentic |
|---|---|---|---|---|---|
| 1 | Author 1 | `en` | commentary | ≥ 80 chars | yes |
| 2 | Author 1 | `hi` | commentary | ≥ 80 chars | yes — real Hindi prose, not EN wrapped in Hindi |
| 3 | Author 1 | `mr` | commentary | ≥ 80 chars | yes — real Marathi prose, not EN wrapped in Marathi |
| 4 | Author 2 | `en` | commentary | ≥ 80 chars | yes |
| 5 | Author 2 | `hi` | commentary | ≥ 80 chars | yes |
| 6 | Author 2 | `mr` | commentary | ≥ 80 chars | yes |

- The two authors **must represent distinct philosophical traditions** (e.g. Bhakti + Advaita; ISKCON + Dnyaneshwari)
- HI and MR commentary must be **authentic scholarly translation** — NOT English content reformatted with Hindi/Marathi framing strings
- Content must be **verse-specific** — a chapter summary used for every verse in a chapter is a gold violation

#### 3. Layer Content Rules

- [ ] No bracket-prefix content (`[PLACEHOLDER_*]`, `[ADVAITA_PERSPECTIVE:...]`) — these are blocked by `isValidCommentaryContent()`
- [ ] No generic filler strings (see silver rules above)
- [ ] No repeated identical content across two or more verses in the same chapter for the same author+lang
- [ ] Author metadata complete: `author_name`, `author_bio`, `author_label`, `author_icon`, `publication`, `organization`

#### 4. AI Metadata

- [ ] `ai_metadata.topics` — array of ≥ 1 philosophical theme tags (e.g. `["karma", "dharma", "detachment"]`)
- [ ] `ai_metadata.correlations` — object (may be empty `{}` at initial gold; populated over time)
- [ ] `ai_metadata.stats.original_words` — integer
- [ ] `ai_metadata.stats.translit_words` — integer
- [ ] `ai_metadata.stats.layers_count` — integer
- [ ] `ai_metadata.fingerprint` — MD5 hash of `original + chapter + verse`

#### 5. Stotra / Mantra Tagging (where applicable)

If a verse is a standalone mantra, daily prayer, or embedded stotra:

- [ ] `mantraType` field on verse: `"stotra" | "mantra" | "ashtaka" | "upanishad-mantra"`
- [ ] `dailyUse: true` on verse (if recited daily in tradition)
- [ ] Pronunciation guide layer: `{ "lang": "en", "type": "pronunciation", "content": "..." }`
- [ ] Stotra extracted to `data/2-silver/stotras/{stotra-slug}.json` (for standalone stotra pages)

---

### GOLD Checklist — Per Chapter (all must pass)

- [ ] Verse count in manifest matches actual verse array length
- [ ] No gaps in verse numbering (verse 1 through N all present)
- [ ] Chapter metadata in manifest: `title` (EN + HI + MR), philosophical `theme`
- [ ] **Vedic Labs gate**: at least 1 entry in `lib/vedic-labs-registry.ts` with `chapters: [N]` for this chapter — identifies an interactive educational app concept rooted in the chapter's themes. This analysis requires reading the chapter's verse content and identifying:
  - Philosophical patterns suitable for simulation/visualization
  - Comparative analysis opportunities (e.g. two opposing viewpoints)
  - Practice/contemplation tools (e.g. meditation guides, decision frameworks)
  - Historical/linguistic analysis apps (meter analysis, word etymology)

---

### GOLD Checklist — Per Book (all must pass before `available: true`)

- [ ] All chapters pass per-chapter checklist above
- [ ] `node scripts/audit_gold.js {book-slug}` → Readiness 100%, 0 PLACEHOLDER-HEAVY authors
- [ ] `node scripts/audit_multilang.js {book-slug}` → exit 0 (0 repeated content, 0 thin layers)
- [ ] Manifest `status: "GOLD"`, `completeness_score: 100`, `last_audit` updated to today
- [ ] Manual UI verification: every chapter URL loads, verse permalinks work, all 3 language selectors function, AI synthesis returns result, mobile layout correct at 375px
- [ ] All P0 and P1 bugs from the bug hunt are fixed before flipping `available: true`
- [ ] `available: true` set in `lib/texts.ts` ONLY after all above pass

---

## Placeholder Detection Reference

The following strings are blocked at ALL tiers (they indicate corrupted or accidentally generated data, not legitimate in-progress placeholders):

```
Mock Verse
Mock Transliteration
THIS IS A GENERIC PLACEHOLDER
INSERTED TO SATISFY THE MINIMUM LENGTH
```

The following are blocked specifically at GOLD tier (allowed at silver as work-in-progress markers):

```
[PLACEHOLDER_*]    (bracket-prefix template)
[ADVAITA_PERSPECTIVE:...]
[SUTRA_TEXT]
[ISKCON_EN]
TBD_CONTENT
TODO_LAYER
LOREM IPSUM
```

---

## Audit Scripts Quick Reference

```bash
# Comprehensive standards check (all tiers, one book)
node scripts/audit_standards.js {book-slug}

# Gold tier completeness (verse count, author coverage, placeholder %)
node scripts/audit_gold.js {book-slug}

# HI/MR per-verse uniqueness and thin-content check
node scripts/audit_multilang.js {book-slug}

# Silver tier NVF validation (must exit 0 before promotion)
python3 scripts/vishwa.py validate {book-slug}

# Run all gold books
node scripts/audit_standards.js --all
```

---

## Promotion Gates (mandatory sequence — no skipping)

```
BRONZE → SILVER
  1. Convert raw source to NVF 1.3 JSON
  2. Fill original + transliteration (real Sanskrit — no mocks)
  3. Add at least 1 EN layer per verse (may use [PLACEHOLDER_*] for others)
  4. python3 scripts/vishwa.py validate {book} → exit 0
  5. Commit to data/2-silver/

SILVER → GOLD
  1. Complete all 6 layers per verse (2 authors × 3 languages)
  2. All HI/MR content is authentic (see layer rules above)
  3. Add ai_metadata (fingerprint + topics + stats)
  4. python3 scripts/vishwa.py validate {book} → exit 0
  5. python3 scripts/vishwa.py promote {book}
  6. node scripts/audit_gold.js {book} → Readiness 100%
  7. node scripts/audit_multilang.js {book} → exit 0
  8. Commit to data/3-gold/

GOLD → available:true
  1. All per-book gold checklist items pass (see above)
  2. Manual UI verification passes
  3. All P0/P1 bugs fixed
  4. Set available:true in lib/texts.ts
  5. Commit with note: "feat({book}): set available:true after gold verification"
```
