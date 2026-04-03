# 🚀 Vishwa-Vani: The Master Backlog [SDLC v3.0]

This is the consolidated roadmap and task list for Vishwa-Vani's journey from a framework to an **Autonomous Data Factory (ADF)** and a global **Vedic Wikipedia**.

---

## 🗺️ High-Level Roadmap (The Rollout)

### 🏛️ Milestone 1: The Autonomous Data Factory (CRITICAL PRIORITY)
*Phase: Alpha | Target: 100% Ingestion for 5 Core Books.*
1. **[PO] Feasibility Audit**: Review the legal and technical feasibility of aggregating 10+ translations per book.
2. **[ARCH] Schema Gaps**: Resolve NVF 1.2 vs 1.3 prose support inconsistencies.
3. **[DEV] Gita-Patching**: Finalize Shankara/Ramanuja layers integration.

### 🤖 Milestone 2: The AI Professor (BETA READY)
*Phase: Beta | Target: AI-assisted conceptual maps.*
1. **[SM] Phase Orchestration**: Arrange "AI Explanation" tasks into 2-week sprints.
2. **[DEV] Semantic Search**: Implement Vector Lite for philosophical concept indexing.
3. **[QA] Hallucination Audit**: End-to-end verification of AI-generated commentaries.

### 🌍 Milestone 3: Global Public Release (GOLD)
*Phase: Rollout | Target: Public-facing API and Multi-language UI.*

---

## 🏗️ Technical Epics (SDLC Lifecycle)

### EPIC 1: THE GREAT INGESTION (ADF-MASSIVE)
- [ ] **[SM] Roadmap Alignment**: Schedule parva-by-parva ingestion for Mahabharata.
- [ ] **[DEV] BORI Sanskrit Sourcing**: Fetch Critical Edition Sanskrit for all 18 Parvas.
- [ ] **[QA] OCR Verification**: Tester to verify `nilakantha-raw-ocr.txt` segmentation accuracy.

### EPIC 2: Dual-Audit & Hallucination Defense (ADF-HARDEN)
- [ ] **[ARCH] Structural Audit**: Audit `vishwa-audit.py` for schema compliance v1.3.
- [ ] **[PO] Content Verification**: Product Owner review of source-text diversity.
- [ ] **[QA] Cyclic Bug Loop**: Identify 5% random verse errors -> Inject back to Backlog.

### EPIC 3: Knowledge Graph & Cross-Scripture Linkage (ADF-LINK)
- [ ] **ADF-301 (Nested Slug Handler)**: 🔥 **HIGH PRIORITY** Parent/Child book relationships (e.g. Gita in Mahabharata).
- [ ] **ADF-302 (Universal Concept Tagging)**: Cross-book search functionality via shared tattvas.
- [ ] **ADF-303 (Genealogical Map)**: UI component for Vedic timeline placement.

### EPIC 4: UI consistency & UX Excellence (UI-ENG)
- [x] **[DEV] Font Clipping**: Fix Sanskrit text clipping in `ShlokaMask`.
- [x] **[DEV] Global Scale-Up**: Standardize font size at 13-14px.
- [ ] **[QA] Card Sync Audit**: Verify consistent card heights on Home/Lab.
- [ ] **[DEV] Commentary Filter**: Implement 2-step `Author` + `Language` dropdown in `StudyClient` (supports `all`, named authors, and 0-case for `Original`).
- [ ] **[DEV] API Stability**: Add non-break fallback in `synthesizeEntireChapter` when `/api/synthesize` is unavailable; document and add tests.
- [ ] **[QA] Verse Overflow**: Add regression tests for text overflow in `StudyClient` (commentary cards, translation cells, and responsive text wrapping) using Cypress/Jest.
- [ ] **[BUG] Mahabharata Parva Navigation**: Validate `adhyaya` query in `app/[text]/[chapter]/page.tsx` against `manifest.json` and add missing default flow.

### EPIC 5: Developer Ecosystem & APIs (VANI-API)
- [ ] **AP-101 (Public API Spec)**: Design a secure, rate-limited GraphQL/REST API for scriptural retrieval (Read-only).
- [ ] **AP-102 (Developer SDK)**: Client library for integrating Vedic data into 3rd party apps.

---

## 📊 Book-Wise Ingestion Progress (NVF 1.0)

Every book must pass through 5 phases (P1: Ingest, P2: Harden, P3: Enrich, P4: Tag, P5: Verify).

### 1. 🕉️ Bhagavad Gita
- **Status**: ✅ **STABLE**
- **Tasks**: [X] 700 Verses, [X] UI Audit, [ ] **[PO]** Feasibility check for 10+ Commentary integration.
- [ ] **[DEV]** Add `footer` meta that name/author/language filter is shown on verse page.
- [ ] **[QA]** Verify “All Commentaries” and “each author” behavior in multi-language selector.

### 2. 🐘 Mahabharata
- **Status**: ⚠️ **PARTIAL (Parva ingestion + adhyaaya routing only)**
- **Tasks**: [ ] **[DEV]** Stabilize `adhyaya` URL parsing and proper fallback to first subchapter.
- [ ] **[DEV]** Add UI indicator: current book/chapter/adhyaya + total counts.
- [ ] **[QA]** Validate inbound data for Parva-specific commentary language variants.

### 3. 🕯️ Isha Upanishad
- **Status**: ⏳ **IN PROGRESS**
- **Tasks**: [X] P1, [X] P2, [ ] **[DEV]** P3 (Add Adi Shankara Bhasya), [ ] **[QA]** P5 (Validation).

---

## 🧬 Special Constraints
- **Zero-Touch Ops**: Static auto-registration of books via directory scanning in Next.js.
- **NVF Compliance**: Sanskrit -> Translit -> Meaning -> HI/MR Layers.

_This backlog acts as our Roadmap for the Autonomous Evolution of Vishwa-Vani._

