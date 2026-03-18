# 🗺️ Vishwa-Vani: The Vedic Wikipedia Master Backlog

> **Vision**: Building the central, multilingual "Wikipedia for Vedic Wisdom" with AI-assisted creative explanations, hosted for free on GitHub Pages. We prioritize a rock-solid, secure, and performant framework before massive data aggregation.

---

## 🏗️ Phase 1: Core Framework & Scalable Architecture (High Priority)
*Objective: Build the scalable UI, routing, and hosting skeleton first so data can simply be poured in later.*

<<<<<<< HEAD
**TASK [1801]: Hyper-Optimized 1-Screen Shloka UI** | [x] | [UI/UX]
**SPEC:** Reduce overall UI margins, padding, and font sizes even further. Ensure that at a minimum, one full Shloka, its Sanskrit text, English meaning, regional meaning, and short commentaries all perfectly fit within a single mobile viewport without requiring any scrolling.

**TASK [1701]: Implement Wikipedia-Style Semantic URL Routing** | [TODO] | [Architecture]
**SPEC:** Migrate from the hardcoded `/study/[chapter]` routing to a generic, scalable `/[text-slug]/[chapter-slug]/[verse-slug]` format. E.g., `/bhagavad-gita/chapter-1/verse-1` or `/upanishads/isha/verse-1`.

**TASK [1702]: Standardize Native i18n Translation Handlers** | [TODO] | [Architecture]
**SPEC:** Integrate an industry-standard i18n library to map `/[locale]/[text-slug]` so the entire menu and shell is translated natively (e.g., `/hi/bhagavad-gita`).

**TASK [1703]: Assess & Integrate Modern Scalable Database (Static JSON / Vector)** | [TODO] | [Database]
**SPEC:** Establish a scalable, free-hosting compatible data storage approach (like partitioned JSON files on a CDN or a free Vector DB tier) capable of organizing infinite texts.

**TASK [1501]: Implement Robust API Throttling & Security** | [TODO] | [Security]
**SPEC:** Configure an API strategy using edge middleware to enable rate-limiting, CORS lockdown, and IP-based throttling.

**TASK [1705]: Universal API Construction for Public Integration** | [TODO] | [Backend]
**SPEC:** Build a standard GraphQL or RESTful Next.js API layer exposing all stored Vedic content publicly (`GET /api/v1/texts/...`).
=======
| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1701** | P0 | **Bootstrap i18n Support**: next-intl integration (EN, HI, MR). | ✅ **DONE** |
| **1702** | P0 | **Semantic URI Structure**: Restructure routes to `/[locale]/[text]/[chapter]`. | ✅ **DONE** |
| **1706** | P0 | **Vedic Library Registry**: Central source of truth for scriptures (`lib/texts.ts`). | ✅ **DONE** |
| **1801** | P0 | **Hyper-Optimized 1-Screen UI**: Shloka/Commentary fit on 1 mobile screen. | ✅ **DONE** |
| **1703** | P0 | **Optimized JSON Storage Layer**: Standardize schema and chapter-based sharding. | ✅ **DONE** |
| **1709** | P0 | **Vedic Lake PoC (SQLite WASM)**: Hybrid storage (Binary + JSON) engine. | ✅ **DONE** |
| **1502** | P0 | **Security Hardening (CSP & Obfuscation)**: Root-level security rules. | ✅ **DONE** |
| **1705** | P0 | **GitHub Pages Deployment Strategy**: Static export & redirect logic validation. | ✅ **DONE** |
| **1710** | P1 | **Catalog of Vedic Sources**: (Mahabharata: bhavykhatri, Puranas: Akhilesh-Gogikar). | ✅ **DONE** |
| **1707** | P1 | **Static Search Index (Lunr/FlexSearch)**: Build-time index for Wikipedia searching. | 📅 BACKLOG |
| **1501** | P1 | **API Throttling & Security Integration**: Throttling/rate-limit for future API layer. | 📅 BACKLOG |
| **1708** | P1 | **Client-side JSON Prefetching**: Speed up cross-chapter navigation. | 📅 BACKLOG |
| **1601** | P3 | **Root Codebase Cleanup**: Pruning redundant files and legacy scripts. | ✅ **DONE** |
>>>>>>> 2f5409a (feat: implement Vedic Lake (SQLite) storage, Security Shield, and UI density optimizations. Cleanup legacy scripts and docs.)

---

## 🤖 Phase 2: AI Professor & Creative Explanations
*Objective: Make the wisdom deeply understandable, engaging, and creatively explained.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1802** | P1 | **"AI Professor" Creative Explanations**: Local LLM (WebLLM) conceptual breakdowns. | 📅 BACKLOG |
| **1804** | P1 | **Visual "Handwritten Notes" UI**: Styled diagrams and flowcharts for AI logic. | 📅 BACKLOG |
| **1805** | P1 | **WebLLM Proof of Concept**: Browser-side summarization on author subset. | 📅 BACKLOG |
| **1407** | P2 | **GPS/Locale Language Detection**: Auto-default to local language (HI/MR). | 📅 BACKLOG |

---

## 🟨 Phase 3: Massive Data Collection & Aggregation
*Objective: Gather infinite Vedic texts once the framework is ready.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1704** | P2 | **Multi-Author Legal Content Aggregation**: Curation of diverse interpretations. | 📅 BACKLOG |
| **1401** | P2 | **Populate Complete Bhagavad Gita Chapters**: Chapters 1-18 with all translations. | 📅 BACKLOG |
| **1402** | P2 | **Mahabharata Integration (18 Parvas)**: Use `bhavykhatri/DharmicData` source. | 📅 BACKLOG |
| **1403** | P2 | **Rigveda Samhita Integration**: Mandela-wise import from `DharmicData`. | 📅 BACKLOG |
| **1404** | P2 | **18 Mukhya Puranas Consolidation**: Aggregation from `Akhilesh-Gogikar/English-Puranas`. | 📅 BACKLOG |
| **1405** | P3 | **Stotra & Stuti Library**: Curated Ganesha, Shiva, Vishnu collections. | 📅 BACKLOG |
| **1406** | P3 | **Major Upanishads Expansion**: Sourcing from `atmabodha/Vedanta_Datasets`. | 📅 BACKLOG |
| **1408** | P2 | **Commentary Clustering/Deduplication**: Aggregate sentiments from sages. | 📅 BACKLOG |
| **1503** | P2 | **Sanskrit-to-Selection Verification**: Ensure translation strictly hits intent. | 📅 BACKLOG |

---

## 🟩 Phase 4: Wikipedia Crowdsourcing & Maintenance
*Objective: User corrections and long-term sustainability.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1803** | P3 | **Wikipedia-Style User Corrections**: Flagging and suggesting edits. | 📅 BACKLOG |
| **1505** | P3 | **Donation Footnotes & Analytics**: Sustainability infrastructure. | ✅ **DONE** |
| **1601** | P3 | **Root Codebase Cleanup**: Constant pruning of redundant files. | ⏳ IN PROGRESS |

---
_Last Updated: March 2026_
