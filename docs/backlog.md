# 🚀 Vishwa-Vani: Aligned Master Backlog [SDLC v8.0 — Vision & Pipeline Integration]

This backlog is organized strictly by Priority and aligned to the **Vishwa-Vani Vision**. Content development is structured by scripture in exact descending priority of their score, ensuring focused completion of one book at a time.

---

## Priority 0: Bugs
- [ ] `BUG-081` **Search Page Performance Jitter**: Client-side filtering lag during multi-scripture queries; optimize rendering loops and filter states.
- [ ] `BUG-082` **Dark Mode Contrast for Skeletons**: Auditing layout skeletons inside Vedic Lab view for low contrast ratio in dark theme mode.
- [ ] `BUG-083` **Intersection Observer Threshold Polish**: Address minor lag in the reader progress bar synchronization during rapid scroll.

---

## Priority 1: Core Features (Vision Realization)

### 1. Semantic Deep-Linking Protocol (Ontological Knowledge Graph)
- [ ] `FEAT-SEM-001` **Define Tattva Ontology Schema**: Define a JSON schema (`types/ontology.ts`) for global semantic concepts (Tattvas) such as "Dharma", "Brahman", "Atman", and "Karma" mapped to scripture coordinates.
- [ ] `FEAT-SEM-002` **Static Ontology Seed Mapping**: Create `data/ontology/tattvas.json` containing initial hand-curated linkages across Bhagavad Gita, Isha Upanishad, and Kena Upanishad.
- [ ] `FEAT-SEM-003` **Automated Linkage Indexing Script**: Write `scripts/generate_semantic_links.py` to crawl the Gold text corpus and automatically index keyword coordinates.
- [ ] `FEAT-SEM-004` **Cross-Scripture Tattva Router**: Implement dynamic route page `app/tattvas/[slug]/page.tsx` displaying connected verses dynamically across all scriptures.
- [ ] `FEAT-SEM-005` **UI Semantic Explorer Drawer**: Implement an interactive, visual sliding drawer in the reader UI allowing readers to view and jump to cross-scripture linked verses.

### 2. Search Scale & Edge-Hosted SQLite WASM Web Workers
- [ ] `FEAT-SRC-001` **Off-Thread SQLite WASM Worker**: Build `public/workers/sqlite-search.worker.js` loading SQLite WASM off the main thread to handle massive Mahabharata queries.
- [ ] `FEAT-SRC-002` **Type-Safe Message Bridge**: Implement `lib/search-bridge.ts` providing typed message passing interfaces to post query requests and receive chunked results.
- [ ] `FEAT-SRC-003` **Dynamic Payload Pruning Layer**: Configure the SQLite WASM data pipeline to prune scholar and commentary layers to enforce the "Max 2" scholar limit before passing back to the main thread.
- [ ] `FEAT-SRC-004` **Edge Vector Index Hydration**: Map Cloudflare Vectorize endpoints to return coordinates that the client Web Worker instantly hydratess.
- [ ] `FEAT-SRC-005` **Worker-Backed Search Page**: Refactor the search page UI to utilize the WASM search worker, rendering rapid results with streaming loaders.

### 3. Scholar Imbalance & Type-Safe Data Service Layer
- [ ] `FEAT-SCH-001` **Strict NVF 1.3 TypeScript Types**: Refactor `types/nvf.ts` to strictly narrow scholar commentary types, eliminating any implicit `any` in parsing scripts.
- [ ] `FEAT-SCH-002` **Core Verse Data Hydrator**: Develop `lib/data-service.ts` helper `getEnrichedVerse(book, chapter, verse)` to fetch from the worker layer and enforce Lean UI Max 2 limits.
- [ ] `FEAT-SCH-003` **Reader Scholar Carousel Toggle**: Build a sleek UI control allowing users to swap active scholars on-the-fly, instantly loading alternate commentaries.

### 4. Beta Feedback Loop & Telemetry Integration
- [ ] `FEAT-BETA-001` **Feedback to GitHub Issue Bridge**: Modify `/api/feedback` server route to automatically format feedback submissions and submit them as issues to the repository.
- [ ] `FEAT-BETA-002` **Inline star rating analytics**: Build a lightweight telemetry SQLite table to capture anonymous study ratings, displaying translation feedback directly.

---

## Priority 2: Content (Descending score priority to complete books)

### 1. Bhagavad Gita [Readiness Score: 82.16%] (HIGHEST PRIORITY)
- [ ] `GITA-DATA-GAP` **Identify Missing Gita Verses**: Conduct an automated audit to locate the exact 43 missing verses in the existing JSON shards (657/700 verses).
- [ ] `GITA-DATA-ACQ` **Acquire Missing Gita Verses**: Extract raw Sanskrit text, IAST, base translation, and meaning for the missing 43 verses without placeholders.
- [ ] `GITA-DATA-MERGE` **Merge Missing Verses**: Inject the acquired 43 verses into the active JSON shards.
- [ ] `GITA-DATA-VALIDATE` **Validate and Promote Gita**: Execute `scripts/run_pipeline.js bhagavad-gita` to update the Gold manifest and verify 700/700 verses are present.
- [ ] `GITA-SCH-ACQ` **Acquire Deferred Gita Scholars**: Unblock and download digitized text for Tilak, Aurobindo, Bhave, Ramanuja, Madhva, Abhinavagupta, Savarkar, and Gita Press commentaries.
- [ ] `GITA-SCH-PARSE` **Parse and Enrich Commentary Layers**: Run `scripts/parse_scholar_bhasya.js` to structure the newly acquired scholars into the NVF format.
- [ ] `GITA-SCH-INTEGRATE` **Promote Enriched Scholars**: Merge the parsed commentary layers into the Gita Gold shards and verify in the UI.

### 2. Mahabharata [Readiness Score: 58.7%]
- [ ] `MBH-DATA-GAP-PARV1` **Resolve Parva 1 Missing Layers**: Gather Hindi/Marathi translations and AI metadata for Parva 1.
- [ ] `MBH-DATA-PROM-PARV1` **Freeze Parva 1 Gold Data**: Run the promotion pipeline on Parva 1 and verify.
- [ ] `MBH-DATA-INGEST-PARVS` **Ingest remaining Parvas 2-18**: Ingest the remaining 1816 chapters / 80k+ verses into the silver data layer.
- [ ] `MBH-DATA-PROM-PARVS` **Promote Remaining Parvas to Gold**: Run promotion and audit standards sequentially on all Parvas.

### 3. Stotras & Stuties [Readiness Score: 50.51%]
- [ ] `STOTRAS-DATA-GAP` **Identify Target Hymns**: Define the exact list of stotras needed to reach the target 100 chapters and 1000 verses.
- [ ] `STOTRAS-DATA-ACQ` **Acquire Multilingual Stotra Layers**: Gather Sanskrit, transliteration, English, Hindi, and Marathi layers.
- [ ] `STOTRAS-DATA-PROM` **Promote and Register Stotras**: Run promotion pipeline and update UI cards.

### 4. Srimad Bhagavatam (12 Cantos) [Readiness Score: 42.33%]
- [ ] `BHAG-DATA-GAP-CANTOS` **Map Missing Cantos**: Outline missing chapters and verses for Cantos 2 through 12.
- [ ] `BHAG-DATA-ACQ-CANTOS` **Acquire Cantos 2-12**: Retrieve Sanskrit text, Prabhupada English translations, and AI metadata.
- [ ] `BHAG-DATA-PROM-CANTOS` **Promote Skandhas Sequentially**: Run promotion pipeline to systematically populate Gold layer Skandhas.

### 5. Yoga Sutras of Patanjali [Readiness Score: 36.53%]
- [ ] `YOGA-DATA-GAP` **Identify Missing Sutras**: Map missing 186 sutras across Padas 2, 3, and 4.
- [ ] `YOGA-DATA-ACQ` **Gather Sutras 2-4**: Ingest Sanskrit, IAST, Vivekananda translation, and Hindi/Marathi translation layers.
- [ ] `YOGA-DATA-PROM` **Promote Yoga Sutras to Gold**: Run pipeline validation to achieve 100% score.

### 6. 16 Samskaras (Ritual Handbook) [Readiness Score: 32.29%]
- [ ] `SAMSKARAS-DATA-GAP` **Map Samskara Procedures**: Locate remaining 13 life-cycle rituals and associated verses.
- [ ] `SAMSKARAS-DATA-ACQ` **Gather Ritual Mantras**: Source legally cleared mantras and multilang instructions.
- [ ] `SAMSKARAS-DATA-PROM` **Validate & Promote Samskaras**: Promote to Gold and enable on the UI.

### 7. Vishnu Purana [Readiness Score: 20.98%]
- [ ] `VISHNU-DATA-GAP` **Map Missing Chapters**: Identify missing 120 chapters / ~6994 verses.
- [ ] `VISHNU-DATA-ACQ` **Ingest H.H. Wilson Layers**: Acquire remaining chapters and translations.
- [ ] `VISHNU-DATA-PROM` **Promote Vishnu Purana**: Sequentially run pipeline and promote to Gold.

### 8. Garuda Purana [Readiness Score: 10.16%]
- [ ] `GARUDA-DATA-GAP` **Identify Missing Chapters**: Map the remaining 248 chapters.
- [ ] `GARUDA-DATA-ACQ` **Gather Legally Cleared Layers**: Source authentic data layers and AI metadata.
- [ ] `GARUDA-DATA-PROM` **Promote Garuda Purana**: Run pipeline to raise from Silver to Gold.

### 9. Rigveda Samhita [Readiness Score: 0.0%]
- [ ] `RIGVEDA-DATA-ACQ` **Acquire Bronze Core**: Sourced from GRETIL/Sacred-Texts, ingest raw text for 10 mandalas.
- [ ] `RIGVEDA-DATA-PROM` **Promote Rigveda**: Establish the initial Gold schema and manifest registration.

### 10. Brahma Sutras [Readiness Score: 0.0%]
- [ ] `BRAHMA-DATA-ACQ` **Ingest Core Sutras**: Gather 555 sutras, IAST transliterations, and English bhashyas.
- [ ] `BRAHMA-DATA-PROM` **Promote Brahma Sutras**: Move from Bronze to Gold.

### 11. Manusmriti [Readiness Score: 0.0%]
- [ ] `MANUSMRITI-DATA-ACQ` **Gather Sanskrit text**: Ingest 2684 verses across 12 chapters.
- [ ] `MANUSMRITI-DATA-PROM` **Promote Manusmriti**: Promote to Gold and verify.

### 12. Dasbodh [Readiness Score: 0.0%]
- [ ] `DASBODH-DATA-ACQ` **Ingest Samarth Ramdas Text**: Sourced Marathi text and English translations for 7751 verses.
- [ ] `DASBODH-DATA-PROM` **Promote Dasbodh**: Move to Gold.

### 13. Samaveda Samhita [Readiness Score: 0.0%]
- [ ] `SAMAVEDA-DATA-ACQ` **Gather Hymns**: Ingest 1875 melodies and English translations.
- [ ] `SAMAVEDA-DATA-PROM` **Promote Samaveda**: Promote to Gold.

### 14. Yajurveda Samhita [Readiness Score: 0.0%]
- [ ] `YAJURVEDA-DATA-ACQ` **Gather Ritual Mantras**: Ingest 1975 verses across 40 chapters.
- [ ] `YAJURVEDA-DATA-PROM` **Promote Yajurveda**: Promote to Gold.

### 15. Atharvaveda Samhita [Readiness Score: 0.0%]
- [ ] `ATHARVAVEDA-DATA-ACQ` **Gather Formulas**: Ingest 5977 verses across 20 chapters.
- [ ] `ATHARVAVEDA-DATA-PROM` **Promote Atharvaveda**: Promote to Gold.

---

## Priority 3: Pipeline
- [ ] `PIPE-004` **Dual-Audit Verification Gate**: Develop automated validation checks within `scripts/run_pipeline.js` that cross-audit LLM synthesized text against root Sanskrit nouns to eliminate hallucination.
- [ ] `PIPE-005` **Automation of Manifest Updates**: Build a self-triggering pipeline hook to recalculate V-Scores upon any data shard commit.

---

## Priority 4: UI
- [ ] `UI-004` **Devanagari Responsive Font Sizing**: Fine-tune CSS variables in reader layout to scale Devanagari text sizes gracefully down to 320px width viewports.
- [ ] `UI-005` **Reader Mobile Toolbar Compaction**: Re-align the reader page's action toolbar to prevent overlap on small screens.
- [ ] `UI-006` **Canvas Layout CLS Hardening**: Inject server-rendered dimensions into the `<canvas>` container in ShlokaMask to prevent Cumulative Layout Shifts during hydration.

---

## 🛑 Pending Human Decision Backlog
- `MBH-DATA-GAP`: Blocked on gathering complete Mahabharata Parva 1 data due to unknown target source.
- `GITA-SCH-03` to `GITA-SCH-10`: Blocked on gathering complete data for Tilak, Aurobindo, Bhave, Ramanuja, Madhva, Abhinavagupta, Savarkar, Gita Press due to unknown target source.
- `BHAG-GATHER-FULL`: Blocked on gathering complete Bhagavata Purana data due to unknown target source.
- `YOGA-GATHER-REMAINING`: Blocked on gathering the remaining 186 sutras for Yoga Sutras due to unknown target source.
- `VISHNU-PURANA-GATHER`: Blocked on gathering complete Vishnu Purana data due to missing target source.
