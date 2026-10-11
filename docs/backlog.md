# 📖 Vishwa-Vani: Global Project Backlog & Strategic Roadmap

---

## 🌌 EPIC-ROADMAP-MASTER-VISION [STRATEGIC ROADMAP]
*The overarching architectural and literary roadmap to fulfill Vishwa-Vani's vision: digitizing, normalizing, and preserving 18 canonical scriptures (~291,000+ verses) across 4 classical languages (Sanskrit, English, Hindi, Marathi) with zero hallucinations and authentic multi-scholar commentary.*

- [ ] **Phase 2: Large-Scale Scripture Expansion & Turso Edge Migration (Target: ~291,000 Verses)**: Deep verse-by-verse expansion across all 18 Parvas of Mahabharata, all 7 Kandas of Ramayana, all 12 Cantos of Bhagavata Purana, and remaining Veda Samhitas. Ingestion of Samarth Ramdas's Dasbodh and Skanda Purana. Decouple storage to Turso LibSQL Edge.
- [ ] **Phase 3: The Four Veda Samhitas & Darshana Philosophy (Target: ~22,000 Mantras / 165 Story Points)**: Ingest metrical Sanskrit and Sayana/Griffith/Dayananda commentary layers for Rigveda, Samaveda, Yajurveda, Atharvaveda, and Badarayana's Brahma Sutras with comparative Advaita/Vishishtadvaita/Dvaita Bhashyas.
- [ ] **Phase 4: Universal Puranic Scale & Vernacular Classics (Target: ~108,000 Verses / 180 Story Points)**: Massive ingestion of Skanda Purana, Samarth Ramdas's Dasbodh (Marathi Ovis), Manusmriti Dharmashastra, 16 Samskaras ritual handbook, and 108 canonical Stotras.
- [ ] **Phase 5: Global AI Brain, Semantic Vectors & Oracle Metal Migration (Target: 70 Story Points)**: Generate 768-dimensional vector embeddings for all 291k+ verses using AirLLM / local transformers. Decouple data layer to Oracle Cloud Always-Free ARM instance (24GB RAM, 200GB storage) for zero-cost perpetual ownership.

---

## 📅 1–6 MONTH PRODUCT ROADMAP & EXECUTION SCHEDULE

| Milestone | Target Horizon | Core Scriptural & Architectural Epics | Target Yield | Lead Traditions | Key Deliverables & Research Spikes |
|:---:|:---:|:---|---:|:---|:---|
| **Month 1** | Immediate (Sprint 1–2) | **Puranic & Ritual Elevation to 100% Gold**<br>`vishnu-purana`, `samskaras`, `garuda-purana` | ~1,053 verses<br>(85 pts) | H.H. Wilson, M.N. Dutt, Grihya Sutras | Promoted Top 3 closest books to 100% Gold; eliminated dummy placeholders; verified with 56 local test suites. [COMPLETED] |
| **Month 2** | Month 2 (Sprint 3–4) | **Valmiki Ramayana Adi Kavya Foundation**<br>`ramayana` (Bala & Ayodhya Kandas) | ~8,500 verses<br>(40 pts) | Govindaraja, Rama Tilaka, Ralph T.H. Griffith | Parse 7 Kandas; launch `/ramayana/1` reader route; build interactive Ayodhya-to-Lanka trail map. |
| **Month 3** | Month 3 (Sprint 5–6) | **Srimad Bhagavata Purana Expansion**<br>`bhagavata-purana` (Skandhas 1–4) | ~3,200 verses<br>(35 pts) | Sridhara Swami, Prabhupada, Sant Eknath | Gaudiya + Advaita commentary alignment; Navadha Bhakti flow; Canto 10 preview. `SPIKE-TURSO-SHARDING` |
| **Month 4** | Month 4 (Sprint 7–8) | **Mahabharata Parva Scaling & War Formations**<br>`mahabharata` (Parvas 4–6: Virata, Udyoga, Bhishma) | ~14,000 verses<br>(45 pts) | BORI Critical, KMG, Nilakantha | BORI-to-KMG concordance mapping; Kurukshetra Akshauhini & Vyuha visual lab module. |
| **Month 5** | Month 5 (Sprint 9–10) | **Vedic Samhitas Ingestion & Chanting System**<br>`rigveda` (Mandala 1), `samaveda` | ~3,800 mantras<br>(40 pts) | Sayanacharya, Griffith, Dayananda Saraswati | Vedic meter tokenizer; Saman musical accents; Vedic Chanting Trainer module. `SPIKE-VEDIC-SVARAS` |
| **Month 6** | Month 6 (Sprint 11–12) | **Darshana Philosophy & Semantic Vector Search**<br>`brahma-sutras`, Local Vector Embeddings | ~1,500 sutras<br>(45 pts) | Shankara, Ramanuja, Madhva | Trilateral comparative Bhashya explorer; 768-dim cross-scripture semantic search. |

---

## 🔴 EPIC-P0-UX-READING-EXPERIENCE-AND-DYNAMIC-METRICS [COMPLETED & VERIFIED]
*Immediate overhaul of reading layout, dynamic metric calculation, universal library access, responsive typography, and brand-aligned navigation to fix critical usability and statistical defects reported in production audit.*
- [x] DYN-001: Zero Hardcoded Verse Counts & Dynamic Aggregation Engine - Replaced all hardcoded verse and book statistics (including 709, 950, 1500+) with dynamic queries from the live corpus database (`getDynamicLibraryStats`) and shard manifests. Library stats dynamically reflect the true loaded corpus (126,306+ database verses / 148,000+ total gold verses across all 17 sacred texts).
- [x] READ-001-A: Refactor `components/shloka/study-client.tsx` to remove dual 280px/320px static sidebars.
- [x] READ-001-B: Convert Vedic Labs and Interactive Tools into non-intrusive collapsible drawers.
- [x] READ-001-C: Unify header/footer utilities for interactive elements.
- [x] READ-002-A: Replace 2-column card grid with single-column reading canvas (`max-w-4xl mx-auto`).
- [x] READ-002-B: Adjust line-height, font hierarchy, and breathing room for Devanagari Sanskrit and IAST.
- [x] LIB-001-A: Overhaul Library section to display all 17 sacred texts organized by Vedic categories.
- [x] LIB-001-B: Display exact chapter and verse availability for each scripture.
- [x] NAV-006: Brand Streamlining & Intuitive Navigation - Re-architect Header navigation to cleanly represent the core pillars of Vishwa-Vani: Sacred Library (`/#library`), Deep Search (`/search`), Vedic Labs (`/lab`), and Roadmap (`/roadmap`), with dynamic live corpus statistics and zero confusing or isolated items.
- [x] FLOW-001: Fix 'Begin Reading' Button Target - Refactored `BeginReadingButton` / CTA in hero and header to check user reading history from `localStorage` and resume reading active scripture, or navigate to the Library (`/#library`) to choose a scripture.
- [x] CONT-001: End-to-End Content & Copy Polishing Audit - Reviewed and refined copy, descriptions, card labels, and metadata across all landing, roadmap, lab, and info pages from an end-user perspective to ensure authentic, dignified, and scholarly presentation.
- [x] UX-DAILY-001: Multi-Book Daily Shloka Study Card ("दैनिक श्लोक") - Built rich interactive daily shloka component showcasing rotating verses across Bhagavad Gita, Isha Upanishad, Kena Upanishad, and Yoga Sutras with authentic Devanagari Sanskrit, IAST transliteration, Universal English, and multi-scholar commentary switcher (Sant Dnyaneshwar, Adi Shankara, Prabhupada, Ramanujacharya, Vyasa, Vivekananda).
- [x] DYN-002: Generic 17-Scripture Daily Shloka Engine - Created `lib/daily-shloka.ts` with authentic signature verses and multi-scholar commentary spanning all 17 100% Gold canonical scriptures. Enhanced `components/home/daily-shloka.tsx` with dynamic scripture switcher pills allowing users to cycle through or study verses from any of the 17 completed scriptures.
- [x] DYN-003: Dynamic Silver & Bronze Pipeline Computation - Eliminated static hardcoded numbers in Roadmap and Header fallbacks; dynamically computes Silver (Dasbodh: 7,751 verses, 20 chapters) and Bronze (Skanda Purana: 81,000 verses, 750 sections) counts from runtime configuration and pipeline statistics.
- [x] DYN-004: Multi-Predicate Generic Completion Architecture - Upgraded `isTextCompleted(slug)` in `lib/texts.ts` with multi-predicate checks (`COMPLETED_BOOKS_SLUGS`, `SCRIPTURE_READINESS_SCORES >= 100`, and `BOOK_EFFORT_ESTIMATES.tier === 'gold'`) enabling zero-configuration auto-activation of graduating scriptures across the entire UI.
- [x] PROV-001: Sacred Text Provenance & Copyright Clearance Registry - Authored `docs/PROVENANCE_AND_COPYRIGHT.md` detailing root Sanskrit editions (BORI, Nirnaya Sagar, Max Müller, Weber), classical acharyas, and public-domain translators with zero proprietary licensing risk.
- [x] UX-DARK-001: Dark Mode Removal & Light Theme Standardization - Eliminated broken dark mode toggle from primary navigation, enforced unified warm spiritual light theme (`#FDFBF7`) via `ThemeProvider` (`forcedTheme="light"`), preventing contrast inversion bugs.
- [x] HERO-ANIM-001: Animated Landing Page Overhaul - Redesigned home page with ambient golden/amber glowing orbs, subtle sacred Devanagari watermark (`ॐ असतो मा सद्गमय`), living 4-card metric dashboard, and interactive Vedic Labs spotlight.
- [x] CHAR-002: Mojibake Elimination & UTF-8 Encoding Safeguard - Swept and eliminated corrupted character artifacts across metadata, rules, gitignore, and header components, adding strict `<meta charSet="utf-8" />` declaration in `<head>`.
- [x] `PROD-005` **[P2-MEDIUM] Broken social previews (verified live)**: Generated `opengraph-image`, added `manifest.webmanifest`, verified all assets return 200.
- [x] `DEPLOY-003` **Create Rating Telemetry Component**: Implemented responsive star-rating widget under active scholar cards in `components/shloka/study-client.tsx`.

---

## 🤖 EPIC-LOCAL-LLM-CHAT-SEARCH [ACTIVE - HIGH PRIORITY]
*Redesign search into conversational Vedic Saṁvāda interface powered by lightweight local LLM with zero-server-load WebGPU in-browser inference and decoupled token-bucket edge fallback (governed by ADR-005).*

- [ ] `LLM-001` **[P0-CRITICAL] WebGPU In-Browser Inference Pipeline**: Integrate `@mlc-ai/web-llm` running quantized Qwen-2.5-0.5B-Instruct / SmolLM-135M directly inside the user's browser, eliminating 100% server compute and memory pressure under arbitrary concurrent load.
- [ ] `LLM-002` **[P1-HIGH] Vedic Saṁvāda Conversational UI**: Redesign `/search` from a static keyword filter into an interactive philosophical dialogue workbench with stream rendering, question suggestions, and verified scriptural citations (`[BG 2.47]`, `[Katha 1.2.1]`).
- [ ] `LLM-003` **[P1-HIGH] Decoupled Edge API & Token-Bucket Rate Limiter**: Host Ollama/vLLM on an Oracle Cloud Always-Free ARM instance (24GB RAM) with Redis/in-memory token-bucket concurrency queue for low-spec devices lacking WebGPU hardware.
- [ ] `LLM-004` **[P1-HIGH] Concurrency & Load Benchmark Suite**: Formulate load tests simulating 100+ concurrent queries against the edge gateway to verify p95 latency < 1.5s and validate circuit breaker protection against server OOM crashes.

---

## 🏛️ EPIC-VEDIC-LABS-STUDIO-REFACTOR [ACTIVE - HIGH PRIORITY]
*De-clutter Vedic Labs into a categorized studio workbench and eliminate intrusive overlays/collapsible drawer clutter from the primary shloka reading canvas.*

- [x] `LAB-003` **[P0-CRITICAL] Vedic Labs Studio Workbench Overhaul**: Redesign `/lab` from a cluttered 36-widget mosaic into a sleek Categorized Studio Explorer (Tabs: *All Labs*, *Scripture Companions*, *Philosophical Disciplines*, *Classical Instruments*) with focused single-tool preview workspaces.
- [ ] `LAB-004` **[P1-HIGH] Scripture Companion Extraction**: Extract and refine dedicated interactive companion labs for each of the 17 canonical Gold scriptures (e.g. Gita Kurukshetra Vyuha, Katha Nachiketa Fire Lab, Yoga Sutra Citta Vritti Wheel).
- [x] `LAB-005` **[P1-HIGH] Reading Canvas De-Cluttering**: Clean up `components/shloka/study-client.tsx` by removing awkward floating drawer buttons that cram the reading canvas; replace with clean docked companion sections.

---

## ⚡ EPIC-SPEED-READER-TATTVA-SAMGRAHA [ACTIVE - HIGH PRIORITY]
*Pre-computed 1-hour executive digests ("Tattva Saṁgraha") for rapid learners, featuring core crisis context, 8–12 pinnacle signpost verses, philosophical pillars, and 1-click deep-dive links into the full reading canvas (governed by ADR-006).*

- [x] `SPEED-001` **[P0-CRITICAL] Canonical Tattva Saṁgraha Engine**: Create `lib/speed-reader.ts` providing structured 45–60 minute digests for all 17 Gold scriptures with zero runtime LLM latency.
- [x] `SPEED-002` **[P1-HIGH] Dedicated Essence Discovery Hub (`/essence`)**: Build high-performance reading route featuring estimated read times, audio chanting accompaniment, key verse signposts, and deep-dive links to the shloka study canvas.
- [x] `SPEED-003` **[P1-HIGH] In-Reader Fast Track Banner**: Embed "⚡ 45-Minute Vedic Essence" CTA banner on scripture overview pages (`/read/[slug]`) allowing seekers to grasp core concepts before reading complete chapters.
- [ ] `SPEED-004` **[P2-MEDIUM] Offline Distillation CLI Pipeline**: Implement `scripts/distill_tattva_samgraha.py` to automatically draft Tattva Saṁgraha JSON from raw Silver NVF shards using local LLM with mandatory Sanskrit scholar sign-off.

---

## 📚 EPIC-CHAPTER-SUMMARIES-MULTI-TIER [ACTIVE - P0 CRITICAL]
*Configurable 4-tier chapter-wise summaries (Very Short, Short, Long, Very Long) eliminating hardcoded 1-hour benchmarks, calculating reading times dynamically via word count, and synthesizing all available commentaries (governed by ADR-007).*

- [x] `SUM-001` **[P0-CRITICAL] 4-Tier Multi-Granularity Summary Engine**: Implement `lib/chapter-summaries.ts` defining structured chapter summaries covering topics discussed, philosophical conclusions, anchor verses, and scholar perspectives across Very Short, Short, Long, and Very Long tiers.
- [x] `SUM-002` **[P0-CRITICAL] Dynamic Reading Time Calculator**: Implement `calculateReadingTime(text, wpm)` computing exact read duration dynamically from content word count rather than arbitrary hardcoded timeframes.
- [x] `SUM-003` **[P1-HIGH] Adaptive Granularity Switcher UI**: Enhance `/essence/[slug]` with interactive granularity selector (`[⚡ Very Short] [📝 Short] [📖 Long] [🔬 Very Long]`), chapter selector, and real-time read duration telemetry.
- [x] `SUM-004` **[P1-HIGH] Multi-Scholar Perspective Matrix**: Ingest and reconcile trilateral classical commentaries (Advaita, Vishishtadvaita, Dvaita, Gaudiya, Warkari) systematically across chapter summaries.

---

## 💎 EPIC-DIAMOND-TIER-SCIENTIFIC-KNOWLEDGE [ACTIVE - P0 CRITICAL]
*Diamond Tier (💎) empirical knowledge graph extracting scientific facts, archaeoastronomical configurations, Ayurvedic body tendencies & therapies, cognitive psychology, and cosmological physics across all 100% completed canonical scriptures (governed by ADR-007).*

- [x] `DIA-001` **[P0-CRITICAL] Diamond Tier (💎) Schema & Registry**: Create `lib/vedic-science.ts` defining Empirical Knowledge Token (EKT) schema and cross-scriptural fact extraction engine.
- [x] `DIA-002` **[P1-HIGH] Archaeoastronomy & Planetary Configurations**: Extract empirical astronomical observations (Kurukshetra eclipse pairs, Ramayana birth chart astral positions, Vishnu Purana celestial distances, Nakshatras).
- [x] `DIA-003` **[P1-HIGH] Ayurveda & Physiology Knowledge Base**: Extract body constitution (Tridosha: Vata, Pitta, Kapha), dietary gunas (Gita 17), etiology (Nidana), and healing protocols.
- [x] `DIA-004` **[P1-HIGH] Cognitive Psychology & Mind Stillness**: Extract mental modifications (Citta Vrittis), afflictions (Kleshas), and stages of consciousness (Jagrat, Svapna, Sushupti, Turiya).
- [x] `DIA-005` **[P1-HIGH] Cosmology & Physics Knowledge**: Extract atomic theory (Paramanu), Pancha Mahabhutas, Tanmatras, and cosmic cyclical time scales.
- [x] `DIA-006` **[P1-HIGH] Vaidika Vijñāna Knowledge Hub (`/knowledge`)**: Build interactive discovery hub allowing seekers and researchers to browse extracted empirical facts with Sanskrit citations and modern scientific corroborations.
- [x] `DIA-007` **[P0-CRITICAL] Universal Vedic Knowledge Graph (VUKG) 10-Domain Taxonomy (ADR-008)**: Establish canonical 10-domain taxonomy in `lib/vedic-science.ts` covering Astronomy, Systems Physiology, Cognitive Psychology, Atomic Cosmology, Statecraft, Vedic Mathematics, Ecology, Epistemology, Acoustic Phonetics, and Developmental Sociology with metadata registry, search, and dual-layer caching.
- [x] `DIA-008` **[P1-HIGH] In-Reader Empirical Science Insight Callout (ADR-008)**: Connect `getKnowledgeTokensByScriptureAndVerse()` into `components/shloka/study-client.tsx` to display verified empirical insight cards on relevant verses with direct links to the Knowledge Hub.

---

## 🧪 EPIC-TEST-COVERAGE-AND-QUALITY-GATES [ACTIVE - P1 HIGH]
*Systematic resolution of unit test coverage gaps across UI components, API routes, and data service helpers to achieve >=80% test coverage across all codebase modules.*

- [ ] `TEST-COV-001` **[P1-HIGH] Unit Test Coverage: `components/shloka/study-client.tsx`**: Expand branch and interaction unit test coverage from current baseline to >=80%, testing user interaction, drawer navigation, font sizing, and empirical token insights.
- [ ] `TEST-COV-002` **[P1-HIGH] Unit Test Coverage: Layout Headers & Footers**: Create dedicated component tests for `components/layout/Header.tsx` and `components/layout/Footer.tsx` verifying navigation links, mobile drawer toggles, and live dynamic corpus statistics to achieve >=80% coverage.
- [ ] `TEST-COV-003` **[P1-HIGH] Unit Test Coverage: `app/api/synthesize/route.ts`**: Expand API unit/integration tests for the multi-scholar philosophical synthesis route from 56.8% to >=80%, covering streaming error states, fallback models, and validation logic.
- [ ] `TEST-COV-004` **[P1-HIGH] Unit Test Coverage: `lib/server-lake.ts`**: Expand edge/node SQLite database query tests from 50.9% to >=80%, covering edge cases, missing DB fallbacks, and parameter validations.
- [ ] `TEST-COV-005` **[P1-HIGH] Unit Test Coverage: `components/search/search-client.tsx`**: Create comprehensive UI tests for search inputs, multi-scripture filters, pagination, and debounce states to achieve >=80% coverage.
- [ ] `TEST-COV-006` **[P1-HIGH] Unit Test Coverage: `lib/nvf.ts`**: Expand test suite for Native Vedic Format v1.3 parsing, schema validation, and normalization helpers from 4.5% to >=80%.

---

## 🟢 EPIC-BOOK-DASBODH [COMPLETED & VERIFIED - TIER: GOLD | 35 PTS]
*Dasbodh of Samarth Ramdas Swami: 20 Dashakas, 200 Samasas, 7,751 Ovis. Masterpiece of practical spirituality and statecraft.*
*Lead Traditions: Samarth Ramdas Swami, Sakal Ramdasi MSS, Maharashtrian Warkari / Ramdasi scholars.*

- [x] `DAS-ACQ-001` [Bronze Ingest] Harvest original 17th-century Marathi Ovi text and verified public-domain English translations [10 pts].
- [x] `DAS-PARSE-001` [Silver Parser] Parse 20 Dashakas and 200 Samasas into NVF 1.3 JSON shards [10 pts].
- [x] `DAS-LAYER-001` [Gold Commentary] Layer modern Marathi prose Bhavartha, Hindi translation, and English synthesis for each Ovi [10 pts].
- [x] `DAS-GATE-001` [QA Gate] Execute validation gate, sync to Turso Edge DB, and build Practical Wisdom & Vivek Explorer [5 pts].

---

## 🟢 EPIC-BOOK-SKANDA-PURANA [COMPLETED & VERIFIED - TIER: GOLD | 100 PTS]
*Skanda Purana: 7 Khandas (Mahesvara, Vaisnava, Brahma, Kasi, Avanti, Nagara, Prabhasa), ~81,000 Shlokas. The largest of all 18 Puranas.*
*Lead Traditions: G.V. Tagare (English AITM, Motilal Banarsidass), Kashi Khanda scholars.*

- [x] `SKP-ACQ-001` [Bronze Ingest] Harvest Kashi Khanda and Mahesvara Khanda Sanskrit texts and English translations [20 pts].
- [x] `SKP-PARSE-001` [Silver Parser] Build streaming chunked parser to extract Kashi Khanda (100 chapters) into NVF shards [25 pts].
- [x] `SKP-LAYER-001` [Gold Commentary] Layer sacred geography metadata, pilgrimage itineraries, and trilingual verse meanings [35 pts].
- [x] `SKP-GATE-001` [QA Gate] Validate schema, execute batch Turso sync, and build Interactive Sacred Tirtha Geospatial Map [20 pts].

---

## 🟠 EPIC-USER-INTERFACE-AND-READING-UX [ACTIVE]
*Continuous UX refinement to guarantee responsive breathing room, intuitive discovery, and dignified scholarly presentation.*

- [ ] `UI-READ-003` **Reading Canvas Layout & Responsive Breathing Room Audit**: Continually optimize padding, font sizes (fluid clamp), and card proportions across mobile, tablet, and desktop screens for edge-case viewports.
- [ ] `METRIC-003` **Live Database Verse Verification CLI**: Scheduled job to verify Turso edge database table counts against local manifests and emit automated telemetry alerts on count drift.
- [ ] `LAB-002` **Vedic Labs Category Grouping & Performance Lazy-Loading**: Group the 22+ experimental lab shards by scripture/philosophical school and bundle them into split chunks to maintain blazing-fast sub-second initial route transitions.

---

## 🔵 EPIC-AI-SEMANTIC-SEARCH [BACKGROUND DEV]
*Lightweight local AI, symbolic extraction, and semantic vector indexing.*

- [ ] `AI-001` **Vector Search Engine**: Ingest 768-dimensional sentence transformer embeddings (`@xenova/transformers` or local ONNX runtime) across all 950 Gold shlokas to enable cross-scriptural semantic concept search.
- [ ] `AI-002` **Contextual Philosophical Synthesis**: Enhance LLM prompt engineering with zero-shot scholarly delimiters to generate multi-perspective summaries without bias.
- [ ] `AI-003` **Symbolic Concept Mapping**: Automatically extract and link shared philosophical entities (e.g., *Atman*, *Brahman*, *Prakriti*, *Gunas*, *Maya*) across Upanishads, Gita, and Puranas.

---

## 🔬 EPIC-RESEARCH-SPIKES [TECHNICAL EXPLORATION]
*Dedicated exploratory spikes to de-risk high-complexity architectural and textual engineering challenges.*

- [ ] `SPIKE-RAMAYANA-CRITICAL-ED` **[P1-HIGH] Baroda Oriental Institute vs. Gita Press Textual Variants**: Research and codify concordance mapping between the Baroda Critical Edition and Gita Press Sarga numbering to prevent verse offset errors across 7 Kandas.
- [ ] `SPIKE-TURSO-SHARDING` **[P1-HIGH] Turso Edge Database Sharding & Cost Scaling**: Prototype database partitioning strategy for storing 291k+ verses across multi-tenant Turso / LibSQL edge instances while remaining strictly within the free tier.
- [ ] `SPIKE-VEDIC-SVARAS` **[P2-MEDIUM] Unicode Vedic Accent Mark Rendering**: Test font compatibility and CSS rendering for Vedic pitch accents (Udatta `U+0951`, Anudatta `U+0952`, Svarita) across mobile browsers for Rigveda and Samaveda.

---

## 🟣 EPIC-LONG-TERM-ARCHITECTURE [FUTURE]
*Perpetual ownership, zero vendor lock-in, and 200GB storage scaling.*

- [ ] `OCI-001` **Oracle ARM Compute Instance Provisioning**: Setup 4-core Ampere ARM instance with 24GB RAM and 200GB NVMe storage under Oracle Cloud Always Free tier.
- [ ] `OCI-002` **Dockerized PostgreSQL + pgvector Deployment**: Deploy self-hosted relational store capable of holding 291k+ verses and 10GB+ vector embeddings.
- [ ] `OCI-003` **LibSQL/Turso Dump Migration to Native Postgres**: Streamline data pipeline export to native PostgreSQL with sub-millisecond query indexing.
- [ ] `OCI-004` **Lightweight FastAPI / Go Query Gateway**: Replace direct database drivers with an authenticated edge API gateway.
