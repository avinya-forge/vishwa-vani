# 🗺️ Vishwa-Vani: Prioritized Master Backlog (v0.6)

> **Core Focus**: Transitioning from a framework-complete "Library" to a data-rich "Wikipedia of Wisdom" with AI-assisted creative explanations.

---

## 🚨 UI Density & Space Management (New Priority)
*Objective: Fix 'Oversized' elements and 'Micro-text' to utilize viewport efficiently.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **UX-101** | P0 | **Hero Refactor**: Reduce Landing Hero size (8xl -> 6xl) and tighten vertical margins for above-the-fold CTA visibility. | ✅ **DONE** |
| **UX-102** | P0 | **Shloka Visual Prominence**: Fix 'weird smallness' by increasing font weight/style and reducing `ShlokaCard` padding (p-10 -> p-6). | ✅ **DONE** |
| **UX-201** | P0 | **Vedic ExplainShell Interaction**: Implement SVG-based connectors between Sanskrit tokens and English/Hindi word-meanings (Hover-mapping). | 📅 BACKLOG |
| **UX-103** | P0 | **Intl Cleanup**: Resolve missing keys (`nav.readNow`, `prefs.sa`) to eliminate console hydration errors. | ✅ **DONE** |
| **UX-202** | P1 | **Anvaya Tokenization Engine**: Refactor NVF schema to support word-by-word mapping (Token-level metadata). | 📅 BACKLOG |
| **UX-104** | P1 | **Sidebar Visual Softening**: Update 'Astro Explorer' and sidebars to light/muted themes to match the 'Parchment' aesthetic. | 📅 BACKLOG |
| **UX-105** | P1 | **Grid Compression**: Reduce `ShlokaCard` internal padding and gap distance to fit 20% more verses per screen. | 📅 BACKLOG |

## 🔥 P0: Foundation & System Robustness (Critical)
*Objective: Ensure the massive data ingestion doesn't break the user experience.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **BUG-001**| P0 | **Fix Search CSP**: Resolve CSP blocker preventing Web Worker start for search. | ✅ **DONE** |
| **BUG-002**| P0 | **Fix SSR Hydration**: Resolve `<body>` className mismatch on root layout. | ✅ **DONE** |
| **UX-301** | P0 | **Mobile Navigation**: Implement Hamburger Menu for Library/Search. | ✅ **DONE** |
| **UX-302** | P0 | **Mobile Shloka Optimization**: Scale text and reduce padding for mobile viewports. | ✅ **DONE** |
| **3006** | P0 | **Search Indexed Optimization**: Upgraded DB generation and Worker to use SQLite B-Tree indices for instant, indexed prefix-match queries. | ✅ **DONE** |
| **3002** | P0 | **Web Worker SQL Offloading**: Move all SQLite WASM queries to background worker to ensure 100% UI responsiveness during deep searches. | 📅 BACKLOG |
| **3004** | P0 | **Schema Versioning & Validation**: Implement strict metadata checksums and auto-version detection for sharded Lake integrity. | 📅 BACKLOG |
| **3001** | P0 | **Multi-Lake Data Ingestion**: Complete mass ingestion for Gita (1-18) and initial Mahbharata shards using the sharding strategy. | ⏳ IN PROGRESS |
| **1902** | P0 | **Legal & Compliance Audit Tracking**: Continuous verification of upcoming Puranic data sources (SRC-002, SRC-003). | [TECH_DEBT] ⏳ IN PROGRESS |

---

## 🦾 P1: AI & Enrichment Pipeline (Medium)
*Objective: Transform raw text into "Wise" content through AI interpretation.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **AI-301** | P1 | **NLP Vector Pipeline**: Generate and store 384d semantic embeddings for all verses during the build phase (`vedic-vectors.db`). | 📅 BACKLOG |
| **AI-302** | P1 | **WASM Semantic Search Engine**: Run `Transformers.js` locally to convert user queries into vectors and retrieve top 5 relevant verses using cosine similarity. | 📅 BACKLOG |
| **AI-303** | P1 | **Vedic RAG Guide (API Integration)**: Build a secure Edge Proxy to connect the UI to Hugging Face's Free API, ensuring fast, mobile-friendly RAG generation without local downloads. | 📅 BACKLOG |
| **1903** | P1 | **AI Tagger Pipeline**: Build-time LLM process for generating visual & concept metadata (AI Interpretation) for every shloka. | 📅 BACKLOG |
| **1904** | P1 | 🚫 **REJECTED**: Scraping unsecured API keys from third-party sites violates ethical and legal compliance. We will strictly use official Free Tier endpoints (like Hugging Face). | 🛑 WON'T DO |
| **1802** | P1 | **AI Professor PoC**: Browser-side summarization on author subsets to provide creative explanations. | 📅 BACKLOG |
| **1503** | P1 | **Middleware Layer B (Proxy)**: Template for rate-limiting, edge-caching, and future API monetization. | 📅 BACKLOG |
| **1901** | P1 | **Interactive Vedic Lab**: PoC for Astro-calculators and Tithi-math modules integrated into study pages. | 📅 BACKLOG |
| **1707** | P1 | **Static Search Index (Lunr/FlexSearch)**: Build-time index for local Wikipedia searching (fallback for SQLite FTS5). | 📅 BACKLOG |

---

## 🗃️ P2: Librarian's Roadmap (Massive Aggregation)
*Objective: Populate the library with the primary Hindu canon.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **DATA-001**| P1| **Ingest Listed Upanishads**: Scrape and parse Isha and Kena Upanishads into NVF schema to replace placeholders. | ✅ **DONE** |
| **DATA-002**| P1| **Ingest Yoga Sutras**: Crawl legally compliant sources for Patanjali's Sutras and ingest them. | ✅ **DONE** |
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

_Last Updated: March 19, 2026 (v0.6.0 Revision)_
