# 🗺️ Vishwa-Vani: Global Master Backlog & Roadmap

> **Vision**: Transform Vishwa-Vani into a production-ready, globally scaled "Wikipedia of Wisdom" capable of handling millions of concurrent users with sub-50ms latency, zero-downtime CI/CD, and robust AI data pipelines.

---

## 🪣 Bucket 1: Data Ingestion & Source Collation (The Core Foundation)
*Objective: Achieve 100% comprehensive data coverage for all existing books in detail.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| DATA-101 | P0 | **Bhagavad Gita Data Audit**: Ensure all 700 verses have Sanskrit + Translit + EN Meaning + (Sankar/Siva & Sw. Ramsukhdas). | ✅ **DONE** |
| DATA-102 | P0 | **Isha Upanishad Refinement**: Add 2nd Indian Commentary (e.g., Adi Shankara or Chinmaya Mission). | 🔥 **HIGH PRIORITY** |
| DATA-103 | P0 | **Kena Upanishad Mock-Replacement**: Replace mock JSON with full Sanskrit text + 2 Indian Commentaries. | 🔥 **HIGH PRIORITY** |
| DATA-104 | P0 | **Srimad Bhagavatam (Cantos 2-12)**: Replace mock data; Ingest Sanskrit + 2 Indian Commentaries (e.g., Prabhupada/Sridhara). | 🔥 **HIGH PRIORITY** |
| DATA-105 | P1 | **Vishnu Purana Mock-Replacement**: Ingest all 6 Anshas with Sanskrit + 2 Indian sources. | 📅 BACKLOG |
| DATA-106 | P1 | **Garuda Purana Mock-Replacement**: Ingest Achara/Preta Khandas with Sanskrit + 2 Indian sources. | 📅 BACKLOG |
| DATA-107 | P1 | **Mahabharata (18 Parvas)**: Audit KMG English text; Add 2 Indian regional commentaries as secondary layers. | 📅 BACKLOG |
| DATA-301 | P2 | **Digitalization: Rigveda**: Audit and source manuscripts for 10 Mandalas (Sanskrit + EN Translation). | 📅 BACKLOG |
| DATA-302 | P2 | **Digitalization: Brahma Sutras**: Secure 555 Sutras with primary translations and Shankara Bhashya. | 📅 BACKLOG |
| DATA-303 | P2 | **Digitalization: Valmiki Ramayana**: Source Kanda-wise manuscripts for primary Sanskrit text. | 📅 BACKLOG |

---

## 🪣 Bucket 2: UI/UX Audit & Consistency Focus
*Objective: Everything that exists must be 100% functional with zero errors before adding more.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **UI-001** | P0 | **Navbar Link Audit**: Fix all broken navigation links (Home, Library, Search) across all page depths. Make absolutely sure nothing is broken. | 🔥 **TOP PRIORITY** |
| **UI-002** | P0 | **Chapter-by-Chapter Audit**: Visually audit every chapter of every book to ensure data is displayed correctly, with no layout breaks or hydration errors. | ⏳ IN PROGRESS |
| **UI-003** | P0 | **Interface Consistency Framework**: Implement a strict "2-Author Limit" in the primary view with an "Advanced" drawer to hide additional noise. | ✅ **DONE** |
| **UI-004** | P0 | **Text Differentiation**: Maintain clear visual separation between Verse, Translation, and Commentary (weights, styles, subtle backdrops). | ✅ **DONE** |
| UI-101 | P1 | **Squelch React Warnings**: Resolve any remaining `ResizeObserver loop completed` and SSR hydration mismatches across the site. | ✅ **DONE** |
| UI-201 | P1 | **Book Audit: Bhagavad Gita**: Verify all 700 verses display Sanskrit, English, and 2 authors correctly. | ✅ **DONE** |
| UI-202 | P1 | **Book Audit: Upanishads**: Verify Isha/Kena data integrity and layout consistency. | 📅 BACKLOG |
| UI-203 | P1 | **Book Audit: Mahabharata**: Ensure 18 Parvas navigation and heavy-text rendering performance. | 📅 BACKLOG |
| UI-204 | P1 | **Book Audit: Yoga Sutras**: Visual audit of Sutra-wise breakdown and commentary slots. | 📅 BACKLOG |
| UI-205 | P1 | **Book Audit: Puranas**: Verify Vishnu Purana and Bhagavatam Canto-wise navigation links. | 📅 BACKLOG |

---

## 🪣 Bucket 3: AI Interpretation & Analytics
*Objective: Link concepts and provide high-level tracking.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **ANA-001** | P0 | **Simple Usage Analytics**: Implement basic analytics to track read verses, most popular books, and interaction times for UI improvement. | 📅 BACKLOG |
| **AI-001** | P0 | **AI Professor Multi-Author Synthesis**: Synthesizer must reason over EN/HI/MR commentators verse-by-verse to generate one unified 'Universal Summary'. | ✅ **DONE** |
| **AI-002** | P1 | **Philosophical Correlation Engine**: With AI, interpret and link philosophical concepts deeply across various books (e.g. Gita's karma vs Mahabharata's karma). | 📅 BACKLOG |
| **AI-003** | P1 | **High-Level Mind-Map Visualization**: Generate visual maps of scriptures, tracking interpretations and origins dynamically. | ✅ **DONE** |

---

## 🪣 Bucket 4: Knowledge Labs & Mini-Apps
*Objective: Justify learned data with standardized, short, template-driven tools.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **LAB-001** | P0 | **Standardized App Template**: Create a reusable template (UI/UX) so all new knowledge apps feel cohesive and short. | ✅ **DONE** |
| **LAB-002** | P1 | **Tattva App Refinement**: Ensure the existing Tattva explorer uses the new standardized template. | ✅ **DONE** |
| **LAB-003** | P1 | **Sanskrit Grammar Tokenizer App**: A new short app using the template to break down grammar for a given shloka. | ✅ **DONE** |
| **LAB-004** | P1 | **Chhanda / Meter Analyzer App**: A new short app to visualize poetic meter algorithms for Vedic verses. | ✅ **DONE** |

---

## 🪣 Bucket 5: Core Technical Debt & Dev Ops
*Objective: Unseen infrastructure that enables the scale.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **OPS-001** | P0 | **FTS5 Edge Search**: Fast text search index for all fetched and collated data using SQLite WASM. | ✅ **DONE** |
| **OPS-002** | P0 | **OPFS Persistent Shards**: Implement Origin Private File System for persistent binary lake storage to handle the massive influx of multiauthor data. | 🔥 **HIGH PRIORITY** |
| OPS-003 | P1 | **Special Character Fonts Audit**: Ensure MacOS/Windows glyph fallbacks are 100% working across Sanskrit/Marathi/Hindi. | ✅ **DONE** |

---

## 🪣 Bucket 6: Guided Learning Journeys (Tiered Paths)
*Objective: Transform a visitor into a scholar through structured curriculum.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **PATH-101** | P1 | **Journey 1: The Seeker's Introduction (Novice)**:<br>• Study Gita Ch 2: 1-30 (Nature of Soul)<br>• Study Isha Upanishad (Universal Presence)<br>• Tattva Explorer Intro (Five Elements breakdown)<br>• **Quiz**: Core philosophical concepts. | 📅 BACKLOG |
| **PATH-102** | P1 | **Journey 2: The Deep Dive (Intermediate)**:<br>• Full Gita with AI Synthesis per Chapter<br>• Yoga Sutras Samadhi Pada (Mental Discipline)<br>• Kena Upanishad Study (The Who behind the What)<br>• **Lab**: Sanskrit Shloka Tokenizer usage. | 📅 BACKLOG |
| **PATH-103** | P2 | **Journey 3: The Scholar's Mastery (Expert)**:<br>• Mahabharata Shanti Parva (Political/Ethical Science)<br>• Brahma Sutras Adhyaya 1 (Vedanta Logic)<br>• Bhagavata Purana Canto 2 (Cosmology)<br>• **Final Project**: Write a synthesis of 3 schools of Vedanta. | 📅 BACKLOG |
| **PATH-UI** | P1 | **Progression Dashboard**: Design interface to track progress through the 3 journeys with badges. | 📅 BACKLOG |

---

## 🪣 Bucket 7: Infrastructure & CI/CD Excellence
*Objective: Unbreakable distribution and developer agility.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **OPS-101** | P0 | **GitHub Pages CI/CD Fix**: Resolve `middleware.ts` incompatibility with `output: export` by splitting edge logic. | 🔥 **HIGH PRIORITY** |
| **OPS-102** | P1 | **Automated Lake Ingestion**: Move `scripts/lakeIngest.js` into a GitHub Action that runs when new CSV/JSON data is pushed. | 📅 BACKLOG |
| **OPS-103** | P1 | **Local Model Orchestration**: Containerize the build environment to ensure reproducible static exports across developer machines. | 📅 BACKLOG |

---

## 🪣 Bucket 8: Social, Wiki & Community Collaboration
*Objective: Transform from a "Library" to a "Living Sanctuary".*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **SOC-101** | P1 | **Community Edit Protocol**: Standardized YAML/JSON edit contribution guide for scholars to fix typos and translation errors. | 📅 BACKLOG |
| **SOC-102** | P2 | **Scholar Dashboards**: Allow users to save notes, highlight favorite shlokas, and generate "Wisdom Collections". | 📅 BACKLOG |
| **SOC-103** | P2 | **API Public Surface**: Document and expose the "Vedic Lake" API for third-party devotional or research apps. | 📅 BACKLOG |

---

## 🪣 Bucket 9: Immersive Media & Multimodal Wisdom
*Objective: Engagement through more than just text.*

| Task ID | Level | Task Description | Status |
| :--- | :--- | :--- | :--- |
| **MED-101** | P0 | **1600px UI Refinement**: Ensure the "Wide Canvas" layout used for Gita-18 is consistently applied to Upanishads and Puranas. | 🔥 **HIGH PRIORITY** |
| **MED-102** | P1 | **Audio Shloka Integration**: Link Sanskrit audio files (.mp3) to verse IDs with a persistent sticky player. | 📅 BACKLOG |
| **MED-103** | P2 | **Visual Lineage Maps**: Use the `viz_type` metadata to render 3D-like lineage graphs of philosophers and gurus. | 📅 BACKLOG |

---

_This backlog acts as our strict SDLC/PDLC map. All finished items migrate into `docs/release/release-notes.md` per release cycle._
