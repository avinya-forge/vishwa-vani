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


**SDLC v3.0 | Status: ALPHA**

## 1. CORE DIRECTIVES (The "No Mistakes" Policy)
- **TDD-FIRST**: No functional code is accepted without a corresponding unit test in `tests/`.
- **LOC GATE**: No single function or React component should exceed **50 lines of code**.
- **0 DEAD CODE**: Immediately remove any unused imports, variables, or commented-out blocks.
- **NO BUGGY CODE**: If a bug is caught by the [QA] engine, it MUST be fixed before the task is marked as `[x]`.

## 2. PROJECT-SPECIFIC RULES
- **Schema Compliance**: All scriptural data must adhere to **NVF 1.3** specifications.
- **Responsive Purity**: UI card layouts must be tested across 3 breakpoints (Mobile, Tablet, Desktop).
- **Static Ingestion**: Maintain the "Zero-Touch" static directory scanning for books.

## 3. DATA INTEGRITY (The "No Data Loss" Policy)
- **Backlog**: New tasks are ALWAYS appended at the **bottom** of `docs/backlog/index.md`.
- **Release Notes**: Completed tasks are migrated version-wise to `docs/release/release-notes.md`.
- **Vision Document**: The strategic vision in `README.md` is immutable unless authorized by the [PO] role.

## 4. SESSION PRIORITY
- **Primary Engine**: `development-and-verification.md` is the default prompt for implementation.
- **Verification**: Every session must conclude with an E2E test run (`./run.sh --test`).

---
_Authorized by: Product Governor_
