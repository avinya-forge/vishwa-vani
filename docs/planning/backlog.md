# 🗺️ Vishwa-Vani: The Vedic Wikipedia Master Backlog

> **Vision**: Building the central, multilingual "Wikipedia for Vedic Wisdom" with AI-assisted creative explanations, hosted for free on GitHub Pages. We prioritize a rock-solid, secure, and performant framework before massive data aggregation.

---

## 🏗️ Phase 1: Core Framework & Scalable Architecture (High Priority)
*Objective: Build the scalable UI, routing, and hosting skeleton first so data can simply be poured in later.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1701** | P0 | **Bootstrap i18n Support**: next-intl integration (EN, HI, MR). | ✅ **DONE** |
| **1702** | P0 | **Semantic URI Structure**: Restructure routes to `/[locale]/[text]/[chapter]`. | ✅ **DONE** |
| **1706** | P0 | **Vedic Library Registry**: Central source of truth for scriptures (`lib/texts.ts`). | ✅ **DONE** |
| **1801** | P0 | **Hyper-Optimized 1-Screen UI**: Shloka/Commentary fit on 1 mobile screen. | ✅ **DONE** |
| **1802** | P0 | **Full-Width Immersive UI**: Expand layout beyond 4xl to utilize entire screen. | ⏳ IN PROGRESS |
| **1703** | P0 | **Optimized JSON Storage Layer**: Standardize schema and chapter-based sharding. | ✅ **DONE** |
| **1709** | P0 | **Vedic Lake PoC (SQLite WASM)**: Hybrid storage (Binary + JSON) engine. | ✅ **DONE** |
| **1502** | P0 | **Security Hardening (CSP & Obfuscation)**: Root-level security rules. | ✅ **DONE** |
| **1705** | P0 | **GitHub Pages Deployment Strategy**: Static export & redirect logic validation. | ✅ **DONE** |
| **1711** | P1 | **State-based Language Toggle**: Remove `/[locale]` from URL; use Cookie/State. | 📅 BACKLOG |
| **1901** | P1 | **Interactive Vedic Lab (PoC)**: e.g. Astro-calculator module in study page. | 📅 BACKLOG |
| **1710** | P1 | **Catalog of Vedic Sources**: (Mahabharata: bhavykhatri, Puranas: Akhilesh-Gogikar). | ✅ **DONE** |
| **1707** | P1 | **Static Search Index (Lunr/FlexSearch)**: Build-time index for Wikipedia searching. | 📅 BACKLOG |
| **1501** | P1 | **API Throttling & Security Integration**: Throttling/rate-limit for future API layer. | 📅 BACKLOG |
| **1708** | P1 | **Client-side JSON Prefetching**: Speed up cross-chapter navigation. | 📅 BACKLOG |
| **1601** | P3 | **Root Codebase Cleanup**: Pruning redundant files and legacy scripts. | ✅ **DONE** |

---

## 🛠️ Phase 1.5: Framework Robustness & Robustness (Technical Audit)
*Objective: Solidify the technical foundation to support 'The Wikipedia of Wisdom' at scale.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **3001** | P0 | **Multi-Lake Sharding Strategy**: Support multiple SQLite DBs (Gita, MHB, Purana) to bypass 100MB static limits. | ⏳ IN PROGRESS |
| **3002** | P0 | **Web Worker SQL Offloading**: Move all SQLite WASM queries to background worker to ensure 60fps UI. | 📅 BACKLOG |
| **3003** | P0 | **Global Semantic Search Index (FTS5)**: Implement cross-scripture full-text search across all Lakes. | 📅 BACKLOG |
| **3004** | P0 | **Schema Versioning & Validation**: Implement strict metadata checksums for static data integrity. | 📅 BACKLOG |
| **3005** | P1 | **Vedic Calculation Hub (Jyotish/Pooja)**: Modular utility for Tithis, Muhurta, and Astro-math. | 📅 BACKLOG |

---

## 🤖 Phase 2: AI Professor & Creative Explanations
*Objective: Make the wisdom deeply understandable, engaging, and creatively explained.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1802** | P2 | **"AI Professor" Creative Explanations**: Local LLM (WebLLM) conceptual breakdowns. | 📅 BACKLOG |
| **1804** | P2 | **Visual "Handwritten Notes" UI**: Styled diagrams and flowcharts for AI logic. | 📅 BACKLOG |
| **1805** | P2 | **WebLLM Proof of Concept**: Browser-side summarization on author subset. | 📅 BACKLOG |
| **1407** | P3 | **GPS/Locale Language Detection**: Auto-default to local language (HI/MR). | 📅 BACKLOG |

---

## 🟨 Phase 3: Massive Data Collection & Aggregation (Librarian's Catalog)
*Objective: Gather infinite Vedic texts once the framework is ready. Requirement: Sanskrit + Translit + 3 Commentaries per verse.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **2006** | P1 | **16 Samskaras Implementation**: 16 Life-cycle rites from Garbhadhana to Antyeshti. | ⏳ IN PROGRESS |
| **2001** | P1 | **11 Principal Upanishads (Mukhya)**: Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, Brihadaranyaka, Shvetashvatara. | 📅 BACKLOG |
| **2002** | P2 | **Prasthana Trayi Expansion**: Integration of **Brahma Sutras** with multi-commentary logic. | 📅 BACKLOG |
| **2003** | P2 | **Vedangas (Kalpa Focus)**: **Grihya & Shrauta Sutras** mapping (Practical Steps extraction). | 📅 BACKLOG |
| **2004** | P2 | **18 Maha Puranas (Primary)**: Focus on **Garuda, Bhagavata, Vishnu** (Adhyaya-level sharding). | 📅 BACKLOG |
| **2005** | P2 | **Upavedas Collection**: Ayurveda, Dhanurveda, Gandharvaveda, Sthapatyaveda data nodes. | 📅 BACKLOG |
| **2007** | P2 | **Dr. Shankar Abhyankar's Works**: Digitalizing "Bhakti-Kosh" & "Geeta-Sagar". | 📅 BACKLOG |
| **1401** | P2 | **Populate Complete Bhagavad Gita Chapters**: Chapters 1-18 with all translations. | 📅 BACKLOG |
| **1402** | P2 | **Mahabharata Integration (18 Parvas)**: Use `bhavykhatri/DharmicData` source. | 📅 BACKLOG |
| **1403** | P3 | **Rigveda Samhita Integration**: Mandela-wise import from `DharmicData`. | 📅 BACKLOG |
| **1408** | P3 | **Commentary Clustering/Deduplication**: Aggregate sentiments from 3 Enlightened Sages. | 📅 BACKLOG |

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
