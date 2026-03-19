# 🗺️ Vishwa-Vani: Prioritized Master Backlog (v0.5)

> **Core Focus**: Transitioning from a framework-complete "Library" to a data-rich "Wikipedia of Wisdom" with AI-assisted creative explanations.

---

## 🔥 P0: Foundation & System Robustness (Critical)
*Objective: Ensure the massive data ingestion doesn't break the user experience.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **3002** | P0 | **Web Worker SQL Offloading**: Move all SQLite WASM queries to background worker to ensure 100% UI responsiveness during deep searches. | 📅 BACKLOG |
| **3004** | P0 | **Schema Versioning & Validation**: Implement strict metadata checksums and auto-version detection for sharded Lake integrity. | 📅 BACKLOG |
| **3001** | P0 | **Multi-Lake Data Ingestion**: Complete mass ingestion for Gita (1-18) and initial Mahbharata shards using the sharding strategy. | ⏳ IN PROGRESS |
| **1902** | P0 | **Legal & Compliance Audit Tracking**: Continuous verification of upcoming Puranic data sources (SRC-002, SRC-003). | ⏳ IN PROGRESS |

---

## 🦾 P1: AI & Enrichment Pipeline (Medium)
*Objective: Transform raw text into "Wise" content through AI interpretation.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1903** | P1 | **AI Tagger Pipeline**: Build-time LLM process for generating visual & concept metadata (AI Interpretation) for every shloka. | 📅 BACKLOG |
| **1802** | P1 | **AI Professor PoC**: Browser-side summarization on author subsets to provide creative explanations. | 📅 BACKLOG |
| **1503** | P1 | **Middleware Layer B (Proxy)**: Template for rate-limiting, edge-caching, and future API monetization. | 📅 BACKLOG |
| **1901** | P1 | **Interactive Vedic Lab**: PoC for Astro-calculators and Tithi-math modules integrated into study pages. | 📅 BACKLOG |
| **1707** | P1 | **Static Search Index (Lunr/FlexSearch)**: Build-time index for local Wikipedia searching (fallback for SQLite FTS5). | 📅 BACKLOG |

---

## 🗃️ P2: Librarian's Roadmap (Massive Aggregation)
*Objective: Populate the library with the primary Hindu canon.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **2006** | P2 | **16 Samskaras Implementation**: Life-cycle rites registry (Garbhadhana to Antyeshti). | ⏳ IN PROGRESS |
| **2001** | P2 | **11 Principal Upanishads (Mukhya)**: Full ingestion and normalization (NVF). | 📅 BACKLOG |
| **2004** | P2 | **18 Maha Puranas (Primary)**: Focus on Garuda, Bhagavata, Vishnu (Adhyaya-level sharding). | 📅 BACKLOG |
| **3005** | P2 | **Vedic Calculation Hub**: Modular utility for Tithis, Muhurta, and Astro-math. | 📅 BACKLOG |
| **2007** | P2 | **Dr. Shankar Abhyankar's Works**: Digitalizing "Bhakti-Kosh" & "Geeta-Sagar". | 📅 BACKLOG |
| **1402** | P2 | **Mahabharata Integration (18 Parvas)**: Using `bhavykhatri` project shards. | 📅 BACKLOG |

---

## 🧩 P3: Wikipedia Growth & Refinement (Low)
*Objective: Long-term sustainability and user-driven corrections.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **1803** | P3 | **Wikipedia-Style User Corrections**: Flagging and suggesting edits to AI translations. | 📅 BACKLOG |
| **1407** | P3 | **GPS/Locale Language Detection**: Auto-default to regional language (HI/MR) based on coordinates. | 📅 BACKLOG |
| **1408** | P3 | **Commentary Clustering**: Deduplication and sentiment clustering for infinite commentators. | 📅 BACKLOG |

---

_Last Updated: March 19, 2026 (v0.5.0 Revision)_
