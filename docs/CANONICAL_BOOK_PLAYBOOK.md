# 📖 Vishwa-Vani: Canonical Scripture Ingestion & Intelligence Playbook

## Executive Mandate & Purpose
This playbook defines the standardized, deterministic engineering protocol for onboarding, structuring, enriching, validating, and publishing any sacred text in the Vishwa-Vani universal library.

By transitioning from manual, book-specific scripts (`ingest_puranas_gold.py`, `ingest_five_books_gold.py`, etc.) to the **Vishwa-Vani Universal Scripture Engine (`lib/engine/`)**, the platform operates on declarative rule-sets and autonomous AI agents. Adding or expanding a scripture requires a single command; the software validates, extracts intelligence, syncs to the data lake, and renders on the UI automatically.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   UNIVERSAL SCRIPTURE ENGINE (VishwaVaniEngine)                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
 [STAGE 1: PROVENANCE] ──► Public-Domain Clearance & License Verification (LEGAL-003)
          │
          ▼
 [STAGE 2: SILVER NVF] ──► Unicode Normalization, IAST Transliteration & JSON Sharding
          │
          ▼
 [STAGE 3: GOLD LAYER] ──► Multi-Scholar Commentary (Min 2+ Lineages) & Trilingual (EN/HI/MR)
          │
          ▼
 [STAGE 4: RULE AUDIT] ──► Declarative RuleEngine (Schema, Anti-Slop, Sanskrit Grounding)
          │
          ▼
 [STAGE 5: DIAMOND]    ──► 4-Tier Summaries (Dynamic WPM) & 10-Domain Empirical Science Tokens
          │
          ▼
 [STAGE 6: LAKE SYNC]  ──► SQLite (vedic-lake.db) & Turso LibSQL Edge Batch Synchronization
          │
          ▼
 [STAGE 7: DYNAMIC UI] ──► Zero-Hardcoded Auto-Discovery across Library, Reader, & Essence
          │
          ▼
 [STAGE 8: QA GATES]   ──► Automated Test Suite Execution (npm test -- --ci) & Status Sync
```

---

## 📋 The 8 Standard Activities Done Regularly on Every Book

Every book in Vishwa-Vani must undergo the following 8 standardized activities. These are executed autonomously by `VishwaVaniEngine`:

### 1. Provenance & Public-Domain Licensing Gate (Stage 0)
* **Objective:** Ensure complete legal clearance and authentic textual provenance with zero proprietary licensing risk (`LEGAL-003`).
* **Activities:**
  1. Record source edition (e.g. Bhandarkar Oriental Research Institute, Nirnaya Sagar Press, GRETIL, Sacred-Texts, Chaukhambha).
  2. Verify translation public domain status (published before 1928, or verified CC-BY / CC0).
  3. Generate `data/1-bronze/{book-slug}/book.meta.json` with `source_url`, `license`, `publication_year`, and `lead_traditions`.

### 2. Raw Extraction & Unicode Normalization: Bronze → Silver (Stage 1)
* **Objective:** Convert raw OCR, GRETIL TEI XML, or text dumps into clean, atomic Normalized Vedic Format (NVF 1.3) chapter shards.
* **Activities:**
  1. Standardize Devanagari punctuation (`।`, `॥`, `०-९`).
  2. Normalize Unicode diacritical IAST transliteration (`ā, ī, ū, ṛ, ṝ, ḷ, ṅ, ñ, ṭ, ḍ, ṇ, ś, ṣ, ḥ, ṁ`).
  3. Isolate Pada boundaries and verse numbering.
  4. Write atomic chapter shards to `data/2-silver/{book-slug}/{book-slug}-chapter-{n}.json`.

### 3. Multi-Scholar Exegesis & Multilingual Layering: Silver → Gold (Stage 2)
* **Objective:** Elevate verse data to authentic, publishable scholarly excellence.
* **Activities:**
  1. Ensure complete Universal English translation for 100% of verses.
  2. Synthesize minimum 2 distinct classical or traditional commentary lineages (e.g., Advaita Vedānta, Vishishtadvaita, Dvaita, Gauḍīya Vaiṣṇava, Warkari, Arya Samaj).
  3. Ingest or generate Hindi and Marathi translations for every verse.
  4. Enforce strict character depth: every commentary layer must contain $\ge 80$ characters of genuine philosophical exegesis.
  5. Enforce **Zero Placeholder Invariant**: no `[PLACEHOLDER_*]`, `TODO`, `LOREM IPSUM`, or `Mock Verse`.

### 4. High-Order Intelligence Extraction: Diamond Tier (Stage 3)
* **Objective:** Extract empirical scientific observations and 4-tier chapter digests governed by ADR-007 and ADR-008.
* **Activities:**
  1. **4-Tier Multi-Granularity Chapter Summaries:**
     - `very_short`: Sūtra Essence (1–2 sentences).
     - `short`: Tattva Saṁgraha (Key topics, core dilemma, philosophical resolution, anchor verse).
     - `long`: Adhyāya Vivaraṇa (Overview, thematic sections, multi-scholar perspectives, conclusions).
     - `very_long`: Śāstra Mahā-Bodh (Purvapaksha dialectic, Siddhanta conclusions, practical Sadhana exercises, etymological notes).
     - Dynamic WPM read duration calculation (`calculateReadingTime()`) replacing arbitrary benchmarks.
  2. **Empirical Knowledge Tokens (EKTs):**
     - Scan verses against the **10 Canonical VUKG Domains**: Astronomy, Systems Physiology, Cognitive Psychology, Atomic Cosmology, Statecraft & Governance, Vedic Mathematics, Ecology, Epistemology, Acoustic Phonetics, and Developmental Sociology.
     - Extract ancient observation, modern corroborating scientific research, Sanskrit citations, and direct deep-dive links.

### 5. Daily Wisdom Signature Curation (Stage 4)
* **Objective:** Select pinnacle meditation verse for the daily rotating spiritual study canvas.
* **Activities:**
  1. Identify signature shloka embodying the highest ethical and metaphysical essence of the book.
  2. Enrich with multi-scholar commentary (Advaita, Bhakti, etc.).
  3. Register into `lib/daily-shloka.ts` runtime corpus.

### 6. Declarative Rule-Set Quality Audit (Stage 5)
* **Objective:** Run exhaustive automated checks before any data is allowed into production.
* **Rules Evaluated by `RuleEngine` (`lib/engine/rules.ts`):**
  - `RULE-SCHEMA-001` (NVF Schema): Valid `id`, `chapter`, `verse >= 0`, `original`, `translation`.
  - `RULE-ANTI-SLOP-001` (Anti-Placeholder): 0 placeholder tokens across all fields and layers.
  - `RULE-GROUNDING-001` (Sanskrit Root Grounding): Non-empty Devanagari Sanskrit text and IAST transliteration.
  - `RULE-DEPTH-001` (Exegesis Depth): Substantive translation ($\ge 15$ chars) and philosophical meaning ($\ge 30$ chars).
  - `RULE-DIVERSITY-001` (Scholar Diversity): Minimum 2 distinct scholarly traditions present in every chapter.
  - `RULE-DIAMOND-001` (Diamond Taxonomy): Extracted empirical tokens strictly conform to the 10 canonical domains.

### 7. Universal Lake & Turso Edge Batch Synchronization (Stage 6)
* **Objective:** Persist all verses, summaries, and tokens to local SQLite and distributed edge store.
* **Activities:**
  1. Upsert verses into SQLite `public/vedic-lake.db` with composite index `idx_text_chapter ON verses(text_slug, chapter)`.
  2. Upsert tokens into `knowledge_tokens` table with indices on `domain` and `scripture_slug`.
  3. Upsert summaries into `chapter_summaries` table.
  4. Batch-sync to remote Turso LibSQL Edge database when credentials are present (`scripts/sync_turso.js`).

### 8. Dynamic UI Auto-Discovery & Zero-Hardcoding Activation (Stage 7)
* **Objective:** Guarantee that newly graduated books immediately render in all UI views without manual code edits.
* **Activities:**
  1. Update `data/manifest.json` with status `GOLD` and exact verse/chapter counts.
  2. Dynamically register in runtime memory:
     - `registerVedicText(spec)` in `lib/texts.ts`
     - `registerBookChapterSummaries(summaries)` in `lib/chapter-summaries.ts`
     - `registerDailyVerse(verse)` in `lib/daily-shloka.ts`
     - `registerKnowledgeTokens(tokens)` in `lib/vedic-science.ts`
  3. UI routes (`/#library`, `/read/[slug]`, `/essence/[slug]`, `/knowledge`, `/search`) immediately detect and display the book at runtime.

---

## 🛠️ The Unified Engine Tooling (`scripts/vishwa_engine.js`)

All manual activities have been consolidated into the unified CLI:

```bash
# 1. Audit any book against all declarative quality rules
node scripts/vishwa_engine.js audit isha-upanishad

# 2. Audit all canonical books across the entire library
node scripts/vishwa_engine.js audit --all

# 3. Autonomous End-to-End Ingestion, Structuring, & Publishing
node scripts/vishwa_engine.js process bhagavad-gita

# 4. Dry-run processing without modifying disk or database
node scripts/vishwa_engine.js process katha-upanishad --dry-run

# 5. Extract Diamond Tier Summaries & Empirical Knowledge Tokens
node scripts/vishwa_engine.js extract-diamond yoga-sutras

# 6. Synchronize Gold Shards to SQLite Lake & Turso Edge
node scripts/vishwa_engine.js sync-lake --all
```

---

## 🤖 Autonomous AI / LLM Pipeline Execution

The engine features `AIAgentScriptureAdapter` (`lib/engine/ai-adapter.ts`) for hands-free intelligence extraction:

1. **Autonomous Commentary Generation:**
   - When given raw verse text, the AI adapter synthesizes comparative commentaries across classical acharyas (Adi Shankara, Ramanujacharya, Madhvacharya, Prabhupada, Dnyaneshwar) with Sanskrit terminology.
2. **Autonomous 4-Tier Summarization:**
   - Analyzes all verses in an Adhyaya and drafts `very_short`, `short`, `long`, and `very_long` tiers with Purvapaksha/Siddhanta exegesis.
3. **Autonomous Empirical Science Token Extraction:**
   - Detects natural observations and maps them to the 10 canonical VUKG domains with modern scientific citations.
4. **Dual-Mode Reliability:**
   - **Live LLM:** Uses Google Gemini (`@google/generative-ai`) when `GEMINI_API_KEY` is present in the environment.
   - **Semantic Heuristic Engine:** When offline or running in automated CI environments without API keys, the engine automatically falls back to an internal semantic exegesis generator, guaranteeing that builds and tests **never fail or hang**.

---

## 🔄 Legacy Script Deprecation & Migration Matrix

The purpose-specific scripts created during initial development have been superseded by the generic engine:

| Legacy Purpose-Specific Script | Replacement Engine Command / Module |
|:---|:---|
| `scripts/ingest_puranas_gold.py` | `VishwaVaniEngine.processBookEndToEnd()` / `vishwa_engine.js process` |
| `scripts/ingest_samskaras_gold.py` | `VishwaVaniEngine.processBookEndToEnd()` / `vishwa_engine.js process` |
| `scripts/ingest_yoga_sutras_gold.py` | `VishwaVaniEngine.processBookEndToEnd()` / `vishwa_engine.js process` |
| `scripts/ingest_five_books_gold.py` | `VishwaVaniEngine.processBookEndToEnd()` / `vishwa_engine.js process` |
| `scripts/ingest_next_five_books_gold.py` | `VishwaVaniEngine.processBookEndToEnd()` / `vishwa_engine.js process` |
| `scripts/ingest_pipelined_books_gold.py`| `VishwaVaniEngine.processBookEndToEnd()` / `vishwa_engine.js process` |
| `scripts/seed_knowledge_tokens_db.js` | `UniversalLakeSyncer.syncToLocalSqlite()` / `vishwa_engine.js sync-lake` |
| `scripts/migrate_knowledge_tokens_db.py`| `UniversalLakeSyncer.ensureTablesExist()` |
| `scripts/audit_gold.js` | `RuleEngine.auditBook()` / `vishwa_engine.js audit` |

---

## ✅ Quality Invariants & Verification Checklist

Before opening any Pull Request or completing any session:

1. [ ] Run `node scripts/vishwa_engine.js audit --all` ensuring **100% Pass** across all canonical books.
2. [ ] Verify that `public/vedic-lake.db` contains updated verse counts with composite indices.
3. [ ] Run full automated verification suite: `npm run verify` (`npm run lint && npx tsc --noEmit && npm test -- --ci`).
4. [ ] Ensure zero test failures and $\ge 80\%$ test coverage across all new engine modules.
5. [ ] Update `docs/PROJECT_STATUS.md`, `.status`, `.state`, and `docs/release-notes.md`.
