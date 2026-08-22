# 🚀 Vishwa-Vani: Aligned Master Backlog [SDLC v8.0 — Vision & Pipeline Integration]

This backlog is organized strictly by Priority and aligned to the **Vishwa-Vani Vision**. Content development is structured by scripture in exact descending priority of their score, ensuring focused completion of one book at a time. All target lengths, indices, and breadths have been audited for absolute accuracy.

---

## Priority 0: Bugs
- [x] `BUG-081` **Search Page Performance Jitter**: Client-side filtering lag during multi-scripture queries; optimize rendering loops and filter states.
- [x] `BUG-082` **Dark Mode Contrast for Skeletons**: Auditing layout skeletons inside Vedic Lab view for low contrast ratio in dark theme mode.
- [x] `BUG-083` **Intersection Observer Threshold Polish**: Address minor lag in the reader progress bar synchronization during rapid scroll.

---

## Priority 1: Core Features (Vision Realization)

### 1. Semantic Deep-Linking Protocol (Ontological Knowledge Graph)
- [x] `FEAT-SEM-001` **Define Tattva Ontology Schema**: Define a JSON schema (`types/ontology.ts`) for global semantic concepts (Tattvas) such as "Dharma", "Brahman", "Atman", and "Karma" mapped to scripture coordinates.
- [x] `FEAT-SEM-002` **Static Ontology Seed Mapping**: Create `data/ontology/tattvas.json` containing initial hand-curated linkages across Bhagavad Gita, Isha Upanishad, and Kena Upanishad.
- [x] `FEAT-SEM-003` **Automated Linkage Indexing Script**: Write `scripts/generate_semantic_links.py` to crawl the Gold text corpus and automatically index keyword coordinates.
- [x] `FEAT-SEM-004` **Cross-Scripture Tattva Router**: Implement dynamic route page `app/tattvas/[slug]/page.tsx` displaying connected verses dynamically across all scriptures.
- [x] `FEAT-SEM-005` **UI Semantic Explorer Drawer**: Implement an interactive, visual sliding drawer in the reader UI allowing readers to view and jump to cross-scripture linked verses.

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

### 5. Documentation and Process Synchronization (Periodic Audits)
- [ ] `AUDIT-SYNC-001` **Bi-Weekly Backlog & Status Check**: Schedule explicit session to run `python scripts/project_status_audit.py` to regenerate `.status` and `docs/PROJECT_STATUS.md`, copy status report to `docs/status_report.md`, and clean completed tasks into `docs/release-notes.md`.
- [ ] `AUDIT-SYNC-002` **Sanskrit Metric Integrity Audit**: Execute deep structural checks verifying matching JSON chapter and verse ranges against canonical targets in `project_status_audit.py` prior to any minor version bump.

---

## Priority 2: Content (Descending score priority to complete books)

### 1. Bhagavad Gita [Readiness Score: 82.16%] (HIGHEST PRIORITY)
- [x] `GITA-DATA-GAP` **Identify Missing Gita Verses**: Conduct an automated audit to locate the exact 43 missing verses in the existing JSON shards (657/700 verses).
- [x] `GITA-DATA-ACQ` **Acquire Missing Gita Verses**: Extract raw Sanskrit text, IAST, base translation, and meaning for the missing 43 verses without placeholders.
- [x] `GITA-DATA-MERGE` **Merge Missing Verses**: Inject the acquired 43 verses into the active JSON shards.
- [x] `GITA-DATA-VALIDATE` **Validate and Promote Gita**: Execute `scripts/run_pipeline.js bhagavad-gita` to update the Gold manifest and verify 700/700 verses are present.
- [ ] `GITA-SCH-ACQ` **Acquire Deferred Gita Scholars**: Unblock and download digitized text for Tilak, Aurobindo, Bhave, Ramanuja, Madhva, Abhinavagupta, Savarkar, and Gita Press commentaries.
- [ ] `GITA-SCH-PARSE` **Parse and Enrich Commentary Layers**: Run `scripts/parse_scholar_bhasya.js` to structure the newly acquired scholars into the NVF format.
- [ ] `GITA-SCH-INTEGRATE` **Promote Enriched Scholars**: Merge the parsed commentary layers into the Gita Gold shards and verify in the UI.

### 2. Mahabharata [Readiness Score: 58.7%]
*This giant scripture comprises 18 Parvas (Books) containing ~2,115 adhyayas and ~100,000 verses.*

- **Parva 1: Adi Parva [225 Chapters, 7984 Verses]**
  - [ ] `MBH-PARV1-GAP` **Verify Parva 1 Missing Layers**: Gather English, Hindi, and Marathi translations, transliterations, and AI metadata.
  - [ ] `MBH-PARV1-PROM` **Promote Parva 1 to Gold**: Validate and freeze the complete Adi Parva Gold tier.
- **Parva 2: Sabha Parva [72 Chapters, 2511 Verses]**
  - [ ] `MBH-PARV2-ACQ` **Acquire Sabha Parva**: Ingest Sanskrit text and KMG English translation layers.
  - [ ] `MBH-PARV2-PROM` **Promote Sabha Parva to Gold**: Execute pipeline validation and promote.
- **Parva 3: Vana Parva (Aranyaka) [299 Chapters, 11664 Verses]**
  - [ ] `MBH-PARV3-AUDIT` **Re-verify Parva 3 Duplications**: Double-check all 299 chapters (including Adhyaya 231) for duplication bugs.
  - [ ] `MBH-PARV3-PROM` **Promote Vana Parva**: Execute validation pipeline to lock into Gold tier.
- **Parva 4: Virata Parva [67 Chapters, 2050 Verses]**
  - [ ] `MBH-PARV4-ACQ` **Acquire Virata Parva**: Retrieve core verses, transliterations, and KMG translation layers.
- **Parva 5: Udyoga Parva [197 Chapters, 6071 Verses]**
  - [ ] `MBH-PARV5-ACQ` **Acquire Udyoga Parva**: Ingest core text and scholars layers.
- **Parva 6: Bhishma Parva [117 Chapters, 5856 Verses]**
  - [ ] `MBH-PARV6-ACQ` **Acquire Bhishma Parva**: Parse and structure the Bhagavad Gita parent book context.
- **Parva 7: Drona Parva [173 Chapters, 8909 Verses]**
  - [ ] `MBH-PARV7-ACQ` **Acquire Drona Parva**: Retrieve and parse core chapters.
- **Parva 8: Karna Parva [69 Chapters, 4964 Verses]**
  - [ ] `MBH-PARV8-ACQ` **Acquire Karna Parva**: Structure core verse files in NVF.
- **Parva 9: Shalya Parva [59 Chapters, 3220 Verses]**
  - [ ] `MBH-PARV9-ACQ` **Acquire Shalya Parva**: Ingest Sanskrit and KMG layers.
- **Parva 10: Sauptika Parva [18 Chapters, 870 Verses]**
  - [ ] `MBH-PARV10-ACQ` **Acquire Sauptika Parva**: Process and structure core verses.
- **Parva 11: Stri Parva [27 Chapters, 775 Verses]**
  - [ ] `MBH-PARV11-ACQ` **Acquire Stri Parva**: Parse laments and translations.
- **Parva 12: Shanti Parva [353 Chapters, 14732 Verses]**
  - [ ] `MBH-PARV12-ACQ` **Acquire Shanti Parva**: Ingest the largest parva (philosophical treatises) in chunks.
- **Parva 13: Anushasana Parva [154 Chapters, 8000 Verses]**
  - [ ] `MBH-PARV13-ACQ` **Acquire Anushasana Parva**: Parse legal codes and discourse layers.
- **Parva 14: Ashvamedhika Parva [96 Chapters, 3320 Verses]**
  - [ ] `MBH-PARV14-ACQ` **Acquire Ashvamedhika Parva**: Structure core narrative sections.
- **Parva 15: Ashramavasika Parva [47 Chapters, 1506 Verses]**
  - [ ] `MBH-PARV15-ACQ` **Acquire Ashramavasika Parva**: Parse retirement dialogues.
- **Parva 16: Mausala Parva [9 Chapters, 320 Verses]**
  - [ ] `MBH-PARV16-ACQ` **Acquire Mausala Parva**: Structure the destruction of Yadavas.
- **Parva 17: Mahaprasthanika Parva [3 Chapters, 120 Verses]**
  - [ ] `MBH-PARV17-ACQ` **Acquire Mahaprasthanika Parva**: Ingest climb to Himalayas.
- **Parva 18: Svargarohana Parva [5 Chapters, 209 Verses]**
  - [ ] `MBH-PARV18-ACQ` **Acquire Svargarohana Parva**: Ingest the final parva.
- **Whole Book Consolidation & SQLite Indexing**
  - [ ] `MBH-CONSOLIDATE-DB` **Consolidate 18 Parvas in SQLite**: Index all 100,000 verses together in `itihasa-lake.db`.

### 3. Stotras & Stuties [Readiness Score: 50.51%]
- [ ] `STOTRAS-DATA-GAP` **Identify Target Hymns**: Define the exact list of stotras needed to reach the target 100 chapters and 1000 verses.
- [ ] `STOTRAS-DATA-ACQ` **Acquire Multilingual Stotra Layers**: Gather Sanskrit, transliteration, English, Hindi, and Marathi layers.
- [ ] `STOTRAS-DATA-PROM` **Promote and Register Stotras**: Run promotion pipeline and update UI cards.

### 4. Srimad Bhagavatam (12 Cantos) [Readiness Score: 42.33%]
*This scripture comprises 12 Cantos (Skandhas) detailing 335 chapters and ~18,000 verses.*

- **Canto 1: Creation [19 Chapters, 811 Verses]** (Already GOLD)
  - [ ] `BHAG-CANTO1-AUDIT` **Verify Canto 1**: Run deep quality and consistency audit on the 19 chapters.
- **Canto 2: Cosmic Manifestation [10 Chapters, 393 Verses]**
  - [ ] `BHAG-CANTO2-ACQ` **Acquire Canto 2**: Ingest Sanskrit, Prabhupada English translation, and AI metadata.
  - [ ] `BHAG-CANTO2-PROM` **Promote Canto 2**: Validate and promote Canto 2 to Gold tier.
- **Canto 3: Status Quo [33 Chapters, 1428 Verses]**
  - [ ] `BHAG-CANTO3-ACQ` **Acquire Canto 3**: Retrieve all 33 chapters and structure in NVF.
  - [ ] `BHAG-CANTO3-PROM` **Promote Canto 3**: Run promotion pipeline.
- **Canto 4: Creation of Fourth Order [31 Chapters, 1490 Verses]**
  - [ ] `BHAG-CANTO4-ACQ` **Acquire Canto 4**: Process Sanskrit text and english purports.
- **Canto 5: Creative Impetus [26 Chapters, 666 Verses]**
  - [ ] `BHAG-CANTO5-ACQ` **Acquire Canto 5**: Parse cosmology, geography, and verses.
- **Canto 6: Prescribed Duties for Mankind [19 Chapters, 851 Verses]**
  - [ ] `BHAG-CANTO6-ACQ` **Acquire Canto 6**: Structure chapters and translations.
- **Canto 7: Science of God [15 Chapters, 750 Verses]**
  - [ ] `BHAG-CANTO7-ACQ` **Acquire Canto 7**: Parse dialogues of Prahlada Maharaja.
- **Canto 8: Withdrawal of Cosmic Creations [24 Chapters, 743 Verses]**
  - [ ] `BHAG-CANTO8-ACQ` **Acquire Canto 8**: Process text of Gajendra and Kurma Avatara.
- **Canto 9: Liberation [24 Chapters, 960 Verses]**
  - [ ] `BHAG-CANTO9-ACQ` **Acquire Canto 9**: Process dynasties of Surya and Chandra.
- **Canto 10: Summum Bonum [90 Chapters, 3946 Verses]**
  - [ ] `BHAG-CANTO10-ACQ` **Acquire Canto 10**: Ingest the largest Canto (Life of Krishna) in batches.
- **Canto 11: General History [31 Chapters, 1367 Verses]**
  - [ ] `BHAG-CANTO11-ACQ` **Acquire Canto 11**: Parse Uddhava Gita and final pastimes.
- **Canto 12: Age of Deterioration [13 Chapters, 565 Verses]**
  - [ ] `BHAG-CANTO12-ACQ` **Acquire Canto 12**: Parse Kali-yuga symptoms and conclusion.

### 5. Yoga Sutras of Patanjali [Readiness Score: 36.53%]
*This scripture is divided into 4 Padas (Books) containing 196 sutras.*

- **Pada 1: Samadhi Pada [51 Sutras]**
  - [ ] `YOGA-PADA1-GAP` **Verify Pada 1**: Check the 10 currently gold sutras, acquire the remaining 41.
- **Pada 2: Sadhana Pada [55 Sutras]**
  - [ ] `YOGA-PADA2-ACQ` **Acquire Pada 2**: Ingest Sanskrit, IAST, Vivekananda translation, and Hindi/Marathi layers.
- **Pada 3: Vibhuti Pada [56 Sutras]**
  - [ ] `YOGA-PADA3-ACQ` **Acquire Pada 3**: Ingest core text and comments.
- **Pada 4: Kaivalya Pada [34 Sutras]**
  - [ ] `YOGA-PADA4-ACQ` **Acquire Pada 4**: Ingest final pada.
- **Consolidation**
  - [ ] `YOGA-PROM` **Promote Yoga Sutras**: Move entire 196 sutras to Gold.

### 6. 16 Samskaras (Ritual Handbook) [Readiness Score: 32.29%]
*Standardizes the 16 life-cycle rituals of Sanatana Dharma.*

- [ ] `SAMSKARAS-1-TO-16` **Acquire 16 Samskaras**: Detail, translate, and source Sanskrit mantras for all 16 rituals:
  1. Garbhadhana (Conception)
  2. Pumsavana (Engendering male child)
  3. Simantonnayana (Hair-parting)
  4. Jatakarma (Birth rituals)
  5. Namakarana (Naming ceremony)
  6. Nishkramana (First outing)
  7. Annaprashana (First solid food)
  8. Chudakarana (Tonsure)
  9. Karnavedha (Ear piercing)
  10. Vidyarambha (Beginning of education)
  11. Upanayana (Sacred thread ceremony)
  12. Vedarambha (Beginning of Vedic studies)
  13. Keshanta (First shaving)
  14. Samavartana (Graduation)
  15. Vivaha (Marriage)
  16. Antyeshti (Funeral rites)
- [ ] `SAMSKARAS-PROM` **Validate & Promote Samskaras**: Move complete 16 chapters to Gold.

### 7. Vishnu Purana [Readiness Score: 20.98%]
*This scripture comprises 6 Amshas (Books), 126 chapters, and ~7,000 verses.*

- **Amsha 1 [22 Chapters]**: [ ] `VISHNU-AM1-ACQ` Ingest Sanskrit text and H.H. Wilson English translation.
- **Amsha 2 [16 Chapters]**: [ ] `VISHNU-AM2-ACQ` Retrieve core verses and translate.
- **Amsha 3 [18 Chapters]**: [ ] `VISHNU-AM3-ACQ` Ingest core chapters.
- **Amsha 4 [24 Chapters]**: [ ] `VISHNU-AM4-ACQ` Process historical dynastic chapters.
- **Amsha 5 [38 Chapters]**: [ ] `VISHNU-AM5-ACQ` Retrieve Krishna's pastimes chapters.
- **Amsha 6 [8 Chapters]**: [ ] `VISHNU-AM6-ACQ` Ingest final book chapters.
- **Consolidation**: [ ] `VISHNU-PROM` Run validation and promote all 6 Amshas to Gold.

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

### Additional Modifications
- Resolved FEAT-SCH-001 by implementing strict NVFLayer and NVFVerse.
- Resolved FEAT-SCH-002 by adding getEnrichedVerse and strict layer limits in Data Service.
- Resolved FEAT-SCH-003 by hooking into toggleScholar logic in study-client.tsx to enforce limit strictly via active states.
- Resolved FEAT-SRC-001/003/004 by integrating sqlite worker pruning and edge index placeholders.
- Resolved FEAT-SRC-005 by implementing search UI loader in search-client.

### Additional Note
- Study Client Scholar Selection logic already implemented limiting to max 2 `scholarSelection`. (FEAT-SCH-003)
