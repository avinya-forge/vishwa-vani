# 🚀 Vishwa-Vani: The Master Backlog [SDLC v5.1 — Priority-First, Content-Scaled]

This is the single authoritative ledger for Vishwa-Vani progress. It is organized by **Priority** (Bugs → Content → Pipeline → UI) and **Book** (Gita → Mahabharata).

---

## 🐞 PRIORITY 1: BUGS
*Goal: 100% production-ready quality. Zero regressions in implemented features.*

### BOOK: GLOBAL / ALL
- [ ] `BUG-038` **Landing Page Hydration/Blank Screen** — Landing page renders completely blank (only Header visible) after mount. Repro: Load `/` on desktop/mobile and wait for hydration.
- [ ] `BUG-039` **Search Filter Contrast** — Unselected category chips on the Search page have broken light-mode tokens, rendering them illegible. Repro: Go to `/search` in light mode, observe 'ITIHAS', 'UPANISHAD', etc. chips.
- [ ] `BUG-040` **Labs Skeleton Theme Mismatch** — Skeleton loaders on Vedic Labs render with dark-mode colors on a light-mode page. Repro: Go to `/lab` in light mode, observe placeholder cards before components load.
- [ ] `BUG-041` **Reader Content Layout Shift** — Main verse content in the Reader view exhibits a massive empty vertical space, pushing text to the absolute bottom. Repro: Go to `/bhagavad-gita/1/1`, scroll to main content area.

### COMPLETED BUGS (HISTORICAL)
- [x] `BUG-025` **Mobile Navigation Dropdown hidden** — Fix header layout stacking.
- [x] `BUG-026` **Next Chapter Link Broken** — Fix absolute slugs in navigation.
- [x] `BUG-029` **Redundant Interactive Tools** — Apps were repeated for every shloka. Fix: Moved to Desktop Sidebar (Global Chapter context). — Done: 2026-04-16
- [x] `BUG-030` **Scholar selection limit unrestriction** — Restored "Max 2" selection limit (irrespective of language) to avoid UI clutter. — Done: 2026-04-16
- [x] `BUG-032` **Mobile Horizontal Jitter** — Fixed: `html, body { max-width: 100% }` instead of `100vw` in globals.css. — Done: 2026-04-19
- [x] `BUG-033` **Sound Propagation (Mobile Safari)** — Fixed: `ctx.resume()` fire-and-forget (no await) keeps execution on user-gesture stack for Mobile Safari. — Done: 2026-04-19
- [x] `BUG-034` **Persistent "Auditing" Placeholder** — Root cause found: `dnyaneshwari` author key (old placeholder scaffold) coexisted alongside real `sant-dnyaneshwar` layers. `isValidCommentaryContent` correctly filtered them but data was bloated. Fixed: stripped all 1971 `author === 'dnyaneshwari'` placeholder layers from all 18 Gita chapters. — Done: 2026-04-19
- [x] `BUG-035` **Timeline Alignment** — Fixed: Added `text-center md:text-left` to milestone label/value elements in vedic-timeline.tsx. — Done: 2026-04-19
- [x] `BUG-036` **StudyClient Tests Broken (32 failures)** — Fixed: Realigned all 169 tests to current component structure. Added Scholars X/2 counter, re-enabled AI Synthesis button, fixed v.translation||v.meaning fallback, getAllByTestId for multiple nav instances. — Done: 2026-04-19
- [x] `BUG-037` **Dnyaneshwari Hindi Layer Missing** — Fixed: `rebuild_gita_multilang.js` added sant-dnyaneshwar HI layer for all 657 verses across 18 chapters. — Done: 2026-04-19

---

## 🏆 PRIORITY 2: CONTENT

### BOOK: BHAGAVAD GITA
*Goal: Transform into a "Vedic Wikipedia" by providing the 10 most influential commentaries across Hi/En/Mr.*
- [ ] `SCHOLAR-001` **Top 10 Identification**: Research and rank candidates (Adi Shankara, Ramanuja, Madhva, Abhinavagupta, Tilak, Gandhi, Radhakrishnan, Easwaran, Aurobindo, Gita Press).
- [ ] `SCHOLAR-002` **Multilingual Balance Pass**: Actively target scholars to ensure Hindi (Goyandka), Marathi (Historical Sages), and English (Modern scholars) are represented.
- [ ] `SCHOLAR-003` **Single-Language Excellence**: Ingest high-prestige scholars even if they only have 1 language (e.g., pure Sanskrit Bhasyas or regional Marathi works). 
- [ ] `SCHOLAR-004` **Data Acquisition**: Gather public domain / CC-licensed raw text for identified authors.
- [ ] `SCHOLAR-005` **Author Comparison Research**: Document the "philosophical school" (Advaita, Vishishtadvaita, etc.) for each scholar to aid UI categorization.

### BOOK: MAHABHARATA
- [ ] `MBH-CORE-004` **MBH Metadata Foundation**: Research timeline and historical era specific to MBH for the Timeline component.

---

## ⛓️ PRIORITY 3: PIPELINE

### BOOK: BHAGAVAD GITA
*Pipeline status as of 2026-04-19: All 18 chapters loaded. ISKCON (EN/HI/MR) + Dnyaneshwari (EN/MR) = 5 layers per verse. Zero placeholders. `available: true` in lib/texts.ts. Missing: Dnyaneshwari HI layer (BUG-037), real Shankara/Tilak/Gandhi commentary data (SCHOLAR-004).*
*Goal: Process raw content into verified UI-ready Gold JSON shards.*
- [ ] `GOLD-101` **Bronze-to-Silver Cleanup**: Automated OCR noise removal for new acquired texts.
- [ ] `GOLD-102` **Verse Alignment**: Cross-verify adhyaya/shloka numbering for all 10 scholars (handling variant numberings).
- [ ] `GOLD-103` **Metadata Injection**: Add author bios, historical dates, and icons for all 10 new scholars.
- [ ] `GOLD-104` **Data Service Mapping**: Register new scholar indices in `VedicDataService`.

### BOOK: MAHABHARATA
*Goal: Replicate the Gita pipeline for a book 100x larger (18 Parvas, 100k+ verses).*
- [ ] `MBH-CORE-001` **Scale Ingestion Roadmap**: Audit all 18 Parvas (225-300+ adhyayas each) and create a phased ingestion schedule (Phase 1-Parvas 1-6, Phase 2-Parvas 7-12, Phase 3-Parvas 13-18).
- [ ] `MBH-CORE-002` **Process Replication**: Document the `docs/ingestion-runbook.md` specific to MBH scale (avoiding OOM during build, handling massive JSON shards).
- [ ] `MBH-CORE-003` **KMG Source Verification**: Clean the KMG (Kisari Mohan Ganguli) layers for parvas 1-18.

---

## 🎨 PRIORITY 4: UI

### BOOK: BHAGAVAD GITA
*Goal: Elegant interface that handles 10+ authors without cluttering.*
- [ ] `UI-901` **Scholar Selection Overhaul**: Design a categorized/tabbed selector for scholars (e.g. "Classical Sages", "Modern Philosophers", "Regional Masters").
- [ ] `UI-902` **Advanced Language Filtering**: Allow users to hide scholars based on language availability.
- [ ] `UI-903` **Scholar "Mode" Persistence**: Save preferred scholars to `localStorage` so they stick across chapters.
- [ ] `UI-904` **Interactive Tagging**: Implement the "Tag System" for links to reduce screen space usage.

### BOOK: MAHABHARATA
- [ ] `MBH-CORE-005` **Adhyaya Navigation Hardening**: Improve the `HierarchicalNav` to handle parvas with 300+ items efficiently (search-in-dropdown).

---

## 🗺️ EPIC: THE VEDIC WIKIPEDIA VISION REVISION

*Goal: Align current architecture with the long-term Vedic Wikipedia vision by closing gaps in deep-linking, search, and UI/data balance.*

- [ ] `VISION-001` **Ontological Linkage Blueprint**: Design a graph-based or relational schema to support "Semantic Deep-Linking" beyond hierarchical routing (e.g., Tattva to Shloka mappings across texts).
- [ ] `VISION-002` **Search Scalability Prototype**: Prototype edge-cached, vector-based semantic search integration (via Cloudflare Workers AI) to bypass client-side limitations for 100k+ verses.
- [ ] `VISION-003` **Scholar Curation Strategy**: Finalize the acquisition roadmap for 10+ scholars while explicitly defining the subset rules for the "Max 2" Lean UI presentation.
- [ ] `VISION-004` **Ontological Mapping Schema**: Define the cross-scripture schema mapping structure to effectively relate tags/concepts across disparate texts (Gita, Mahabharata, Upanishads) without rigid hierarchies.
- [ ] `VISION-005` **Knowledge Graph Foundation**: Investigate and define the underlying data structure (e.g., RDF, property graph) for the Semantic Deep-Linking Protocol to scale beyond traditional relational models.
- [ ] `VISION-006` **Type-Safe Ontological Maps**: Ensure all cross-scripture linking matrices define rigid interfaces to prevent `any` mapping errors during deep-link navigation.
- [ ] `VISION-007` **Lean UI Global Enforcement**: Implement global architecture controls to formally decouple the internal 10+ scholar dataset used for AI reasoning from the maximum 2-scholar payload served to the UI.

## 🔬 EPIC: VEDIC LABS & AI DISCOVERY (PAUSED)

*Note: Lab development is paused to prioritize Core Data Architecture (100k+ verses).*
- [ ] `LAB-AI-001` **Gita Chapter Audit**: Run LLM pass to discover 50+ new lab opportunities.
- [ ] `LAB-AI-002` **Sankhya Logic Visualizer**: Gita Ch 13 interactive Discrimination UI.

---

## 🏛️ EPIC: ARCHITECTURE FOR SCALE & HARDENING (100K+ VERSES)

*Goal: Evolve the data-service and server-lake layers for Mahabharata-scale (100k+ verses) and establish a semantic deep-linking protocol.*

- [ ] `ARCH-001` **Server-Lake Edge Strategy**: Implement edge-hosted SQLite WASM for Mahabharata scale to prevent memory exhaustion and offload the main thread.
- [ ] `ARCH-002` **Semantic Deep-Linking Protocol**: Build a resilient, global verse-linking system enabling "Cross-Scripture Tattva Analysis" logic to route effectively across all 15+ texts.
- [ ] `ARCH-003` **Type-Safe Data Fallbacks**: Harden the `VedicDataService` and UI schema interfaces to support rigorous type narrowing and eliminate all implicit `any` patterns during JSON-to-NVF parsing.
- [ ] `ARCH-004` **Edge-Cached Semantic Search**: Design the integration pathway for Cloudflare Workers AI embedding endpoints for fast, semantic search across the entire structured dataset.
- [ ] `ARCH-005` **Web Worker Query Hardening**: Enforce strict type-safety boundaries between the main thread UI and the Web Worker executing SQLite WASM queries, completely eliminating implicit `any` usage.
- [ ] `ARCH-006` **Lean UI Data-Service Enforcement**: Refactor the data-service layer to dynamically prune scholar payloads, guaranteeing that the UI receives a maximum of 2 scholars per verse to maintain the Lean UI principle, regardless of the underlying 10+ scholar dataset.
- [ ] `ARCH-007` **Data Sharding Refinement**: Implement intermediate aggregate shards (e.g., Parva-level summaries) to accelerate the Server-Lake layer's hydration of SQLite without stalling on 100k independent verse reads.
- [ ] `ARCH-008` **Cross-Scripture Index Modeling**: Design the SQLite table indices required to execute real-time cross-scripture queries (e.g., linking Upanishad concepts directly to Gita verses) at the edge.
- [ ] `ARCH-009` **SQLite WASM Boundaries**: Formalize the message-passing contract between the main thread and the Server-Lake worker to guarantee zero memory leaks and type-safe data hydration during continuous fetching.
- [ ] `ARCH-010` **Memory-Safe Ingestion Pipeline**: Redesign the ingestion scripts (e.g., JSON to SQLite conversion) to operate via stream-processing instead of holding 100k+ verses in RAM simultaneously.
- [ ] `ARCH-011` **Type-Safe Pruning Logic**: Implement rigorous type validation inside `VedicDataService` to ensure the pruning algorithm never returns invalid or partial verse fragments, even when dynamically extracting the top 2 authors.
- [ ] `ARCH-012` **Web-Worker Type Bridges**: Build rigorous generic wrappers around Web Worker `postMessage` interfaces to strictly type all inter-thread communication payloads.
- [ ] `ARCH-013` **Edge WASM Chunking Strategy**: Define chunking and pagination limits for SQLite WASM queries to guarantee constant time `O(1)` memory consumption during extreme burst fetching.

---

## 📜 HISTORICAL TASK ARCHIVE (Preservation Ledger)

### PHASE 0: DEPLOYMENT FOUNDATION
- [x] `DEPL-001` CI workflow — Done: 2026-04-09
- [x] `DEPL-002` Deploy workflow — Done: 2026-04-09
- [x] `DEPL-003` Env example — Done: 2026-04-09
- [x] `DEPL-004` Health route — Done: 2026-04-09
- [x] `DEPL-005` Sitemap — Done: 2026-04-09
- [x] `DEPL-006` Robots.txt — Done: 2026-04-09
- [x] `DEPL-007` Meta tags — Done: 2026-04-09
- [x] `DEPL-008` Security headers — Done: 2026-04-09
- [x] `DEPL-009` CSP fix — Done: 2026-04-10
- [x] `DEPL-010` Vercel Analytics — Done: 2026-04-10
- [x] `DEPL-011` Parva-1 Registration — Done: 2026-04-10
- [x] `DEPL-012` Health test — Done: 2026-04-09

### PHASE 1: BETA INFRASTRUCTURE
- [x] `BETA-001` FeedbackWidget — Done: 2026-04-09
- [x] `BETA-002` POST /api/feedback — Done: 2026-04-09
- [x] `BETA-003` Feedback tests — Done: 2026-04-09
- [x] `BETA-004` BetaBanner — Done: 2026-04-09
- [x] `BETA-005` Error boundary — Done: 2026-04-09
- [x] `BETA-006` Loading skeletons — Done: 2026-04-10
- [x] `BETA-007` 404 page — Done: 2026-04-10
- [x] `BETA-008` API error handling — Done: 2026-04-10
- [x] `BETA-009` FeedbackWidget tests — Done: 2026-04-10
- [x] `BETA-010` Reader feedback button — Done: 2026-04-10

### PHASE 2: CONTENT COMPLETENESS
- [x] `CONT-001` MBH available: true — Done: 2026-04-11
- [x] `CONT-002` Parva-1 shards — Done: 2026-04-11
- [x] `CONT-007` Isha available: true — Done: 2026-04-11
- [x] `CONT-008` Isha shards — Done: 2026-04-11
- [x] `CONT-010` Quality report script — Done: 2026-04-14
- [x] `STAB-701` Post-Launch Audit — Done: 2026-04-14
- [x] `STAB-702` undefined labels fix — Done: 2026-04-14
- [x] `STAB-703` Route protection — Done: 2026-04-14
- [x] `STAB-704` Isha Silver-to-Gold — Done: 2026-04-14

### EPIC 6: VEDIC LABS GITA
- [x] `APP-701` Gita Analysis — Done
- [x] `APP-702` Vedic Labs Registry — Done
- [x] `APP-703` Verse-to-App Linking — Done
- [x] `APP-704` Karma Yoga — Done
- [x] `APP-705` Jnana Yoga — Done
- [x] `APP-706` Bhakti Yoga — Done
- [x] `APP-707` Dharma Decision — Done
- [x] `APP-708` Time Wheel — Done
- [x] `APP-709` Divine Qualities — Done
- [x] `APP-712` Meditation State — Done
- [x] `LAB-801` Theme Consistency — Done
- [x] `LAB-806` Pranayama Enhancements — Done
- [x] `LAB-807` Akshauhini Context — Done
- [x] `UI-701` Lean Template Verification — Done

### EPIC 7-11: STABILITY & UI REFINEMENT
- [x] `STAB-601` Verification Audit — Done
- [x] `STAB-602` Placeholder Removal — Done
- [x] `STAB-603` Endpoint Hardening — Done
- [x] `STAB-604` UI Behavior Audit — Done
- [x] `STAB-605` Coverage Audit — Done
- [x] `STAB-606` Coverage Remediation — Done
- [x] `STAB-607` Doc Verification — Done
- [x] `STAB-608` Stability Gate — Done
- [x] `UI-601/604` Gita/MBH Parity — Done
- [x] `UI-701-713` Critical Refinements — Done
- [x] `UI-714-718` Reader Optimization — Done

---

*Last Updated: 2026-04-16 by Claude/Antigravity.*
