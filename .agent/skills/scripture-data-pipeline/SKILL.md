---
name: scripture-data-pipeline
description: End-to-end multi-tier scripture data processing pipeline (Bronze -> Silver -> Gold NVF 1.0 schema).
---

# Scripture Data Pipeline 📜⚙️

**Goal:** Process raw scriptural texts from Bronze (raw extraction) through Silver (structured draft) to Gold Tier (NVF 1.0 production ready).

## Pipeline Stages

1. **Bronze Tier (`data/1-bronze/`)**:
   - Store raw Sanskrit, Devanagari, OCR, or public domain files (e.g. Ganguli MBH, GRETIL, TSV chapter mapping schemas).

2. **Silver Tier (`data/2-silver/`)**:
   - Store structured JSON chapters sharded by book.
   - Run validation: `node scripts/validate_silver.js [book-slug]`.

3. **Gold Tier (`data/3-gold/`)**:
   - Production NVF 1.0 JSON shards matching schema: `{ id, chapter, verse, original, transliteration, meaning, layers: { [author]: { en, hi, mr } } }`.
   - Promote: `node scripts/promote_to_gold.js [book-slug]`.
   - Run Content Audit: `node scripts/audit_standards.js [book-slug]`.
   - Unified pipeline command: `node scripts/run_pipeline.js [book-slug | --all]`.

## Quality Invariants
- **Schema**: Valid NVF 1.0 format.
- **Volume**: Commentary layers must have ≥ 150 words per verse layer.
- **Zero Hallucination / Zero Placeholder**: Absolutely no generic descriptive sentences or `TODO` / `[PLACEHOLDER_*]` text.
