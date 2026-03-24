# 🛠️ Vishwa-Vani: Engineering & Operations

This document defines the quality standards, development processes, and coding conventions for the Vishwa-Vani project.

## 🏛️ Development Process

### 1. The Autonomous Data Factory (ADF) Workflow: Data Tiers
We utilize a Medallion Architecture for scriptural data to ensure 100% accuracy:
- **BRONZE (Raw)**: Original source data (PDFs, raw text, scraped JSON). Located in `data-bronze/`. Use `python scripts/vishwa.py data ingest` to import.
- **SILVER (Staging)**: Processed NVF JSONs. Data is structured but may lack full multi-lang layers or final audit. Located in `data-silver/`.
- **GOLD (Production)**: Fully audited, sharded, and hardened NVF 1.0 JSONs. Located in `data/`. High-performance reading is served from here.
- **Promotion**: Use `python scripts/vishwa.py data promote <slug>` to move data between tiers after validation.
- **Audit**: Every Gold-tier book must pass `python scripts/vishwa.py audit` (schema and coverage).
- **Deployment**: `npm run build` generates the `out/` folder using Gold data and SQLite Lakes.

### 2. Coding Standards
- **TypeScript**: Strict mode enabled. No `any` without explicit justification.
- **Naming**:
  - Files: `lowercase-kebab-case.tsx`
  - Components: `PascalCase`
  - Data Hooks: `use-` prefix.
- **Typography**: Minimum font size of 13px for metadata, 18px for primary shlokas/commentary.

## 🛡️ Quality & Testing

### 1. Verification Strategy
- **Textual Hardening**: 100% match required between Sanskrit and IAST transliteration.
- **Hydration Safety**: No browser-specific logic in the initial render to prevent Next.js hydration mismatches.
- **Performance Budget**: Initial bundle size must remain under 250KB (Gzipped).

### 2. Automated Checks
- **Schema Validation**: CI task to verify all JSON in `data/` follows the NVF 1.0 spec.
- **Link Integrity**: All internal shloka cross-references must be valid slugs.

## ⚖️ Compliance & Legal
- **Content Provenance**: Only CC0 or explicit permission based translations are aggregated.
- **Attribution**: Every author layer in NVF must include a `source_url` and `license_type`.
- **Transparency**: Clear metadata provided for AI-generated layers (e.g., "AI-Synthesized Hindi").

## 🧹 Codebase Hygiene
- **No Temporary Files**: `logs/`, `dumps/`, and `tmp/` files are gitignored and must be purged before merging.
- **Minimal Dependencies**: Prefer Vanilla JS/CSS or WASM over heavy NPM packages for small tasks.

---
_Driving Factors: [Vision](./vision.md) | [Backlog](./backlog.md)_
