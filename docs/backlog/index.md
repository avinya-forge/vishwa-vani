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
- [x] **[SM] Roadmap Alignment**: Schedule parva-by-parva ingestion for Mahabharata.
- [x] **[DEV] BORI Sanskrit Sourcing**: Fetch Critical Edition Sanskrit for all 18 Parvas.
- [x] **[QA] OCR Verification**: Tester to verify `nilakantha-raw-ocr.txt` segmentation accuracy.

### EPIC 2: Dual-Audit & Hallucination Defense (ADF-HARDEN)
- [x] **[ARCH] Structural Audit**: Audit `vishwa-audit.py` for schema compliance v1.3.
- [x] **[PO] Content Verification**: Product Owner review of source-text diversity.
- [x] **[QA] Cyclic Bug Loop**: Identify 5% random verse errors -> Inject back to Backlog.

### EPIC 3: UI consistency & UX Excellence (UI-ENG)
- [x] **[DEV] Font Clipping**: Fix Sanskrit text clipping in `ShlokaMask`.
- [x] **[DEV] Global Scale-Up**: Standardize font size at 13-14px.
- [x] **[QA] Card Sync Audit**: Verify consistent card heights on Home/Lab.
- [x] **[DEV] Commentary Filter**: Implement 2-step `Author` + `Language` dropdown in `StudyClient` (supports `all`, named authors, and 0-case for `Original`).
- [x] **[DEV] API Stability**: Add non-break fallback in `synthesizeEntireChapter` when `/api/synthesize` is unavailable; document and add tests.
- [x] **[QA] Verse Overflow**: Add regression tests for text overflow in `StudyClient` (commentary cards, translation cells, and responsive text wrapping) using Cypress/Jest.
- [x] **[BUG] Mahabharata Parva Navigation**: Validate `adhyaya` query in `app/[text]/[chapter]/page.tsx` against `manifest.json` and add missing default flow.

### EPIC 5: Developer Ecosystem & APIs (VANI-API)
- [x] **[AP-101] Public API Spec**: Implement `/api/synthesize` with payload validation and fallback.
- [x] **[AP-102] Developer SDK foundation**: Add `lib/data-service.ts` and connect chapter page data flow.
- [x] **[AP-103] Data Modeling**: Add AI-enriched verse metadata, navigation metadata, and caching strategy.
- [x] **[AP-104] Deployment / Docs**: Add Vercel/Netlify/GitHub Pages deployment instructions and `vercel.json`.

### EPIC 6: UI Parity & Page-Level Audit (UI-MASTER)
- [ ] **[UI-601] Gita Template Parity**: Use Bhagavad Gita as reference UI for Mahabharata and all other major texts.
- [x] **[UI-602] Dynamic Begin Reading**: Replace hardcoded `/bhagavad-gita/1` with preferred last-read or default text.
- [ ] **[UI-603] Header Active States**: Add active and focus style for nav Library/Search/Lab and Gita/Mahabharata items.
- [ ] **[UI-604] Mahabharata Parva Routing**: Confirm parva/adhyaya mapping in `manifest` and add validation/fallback to StudyClient.
- [x] **[UI-605] Commentary Author Uniformity**: Enforced author name normalization in StudyClient and search results (dnyaneshwari + iskcon canonical selection, language variants hidden from filter list).
- [ ] **[UI-606] UI Density Audit**: Reduce empty whitespace across StudyClient verses, header, and lab page containers.
- [ ] **[UI-607] Responsive Space Optimization**: Audit nav and page grid at mobile/tablet/desktop in code and test.
- [ ] **[UI-608] Verse Page Generalization**: Remove Gita-only types in `/[text]/[chapter]/[verse]` and ensure all texts are supported.
- [ ] **[UI-609] Continue Reading**: Add top-level library menu context and progress indicator for user journeys.
- [ ] **[UI-610] Anchor Accessibility**: Ensure all header links and dropdowns are keyboard navigable.

### EPIC 7: Chapter-Level Micro-Apps & Educational Content (VEDIC-LABS-EXT)
- [ ] **[APP-701] Gita Analysis**: Analyze Gita chapters and recommend micro-apps based on content themes (e.g., Yoga for Ch.6, Guna for Ch.14).
- [ ] **[APP-702] Vedic Labs Registry**: Build registry mapping each app to book/chapter/verse; support multi-app per chapter.
- [ ] **[APP-703] Verse-to-App Linking**: Implement data-driven linking; display app name/description on verse tile as optional explore button.
- [ ] **[APP-704] POC Micro-Apps**: Implement 1-2 interactive apps for Gita (e.g., Guna-Dosha interaction, Yoga pose-to-verse map).
- [ ] **[APP-705] Mahabharata Evaluation**: Assess use cases for Mahabharata (genealogy timeline, Kurukshetra battle simulator, Kaurava-Pandava tree).

### EPIC 8: Mahabharata Data Optimization (MBH-OPTIMIZE)
- [ ] **[MBH-801] Content Audit**: Audit parva + adhyaya; identify chapters with > 500 words per shloka; measure word density.
- [ ] **[MBH-802] Lazy Loading**: Enable adhyaya-level lazy loading and verse pagination (10-20 verses per page tile) for long chapters.
- [ ] **[MBH-803] Metadata Card**: Create per-adhyaya card with auto-generated summary, key themes, verse count, density gauge.
- [ ] **[MBH-804] Glossary Layer**: Add Mahabharata-specific terms (Kurukshetra, Kuru dynasty, Dharma vs Adharma) with cross-references.

### EPIC 9: Template Consistency & Book Rollout (TEMPLATE-STD)
- [ ] **[TMPL-901] Gita Lean Template**: Verify Gita follows lean UI template; refactor StudyClient if needed.
- [ ] **[TMPL-902] Mahabharata Lean Template**: Apply lean UI template + optimization tasks (EPIC 8).
- [ ] **[TMPL-903] Book Checklist**: Document lean UI template spec for future books (Upanishads, Puranas, Vedas, etc.).
- [ ] **[TMPL-904] New Book Rollout**: Onboard next book using TMPL-901/902 as reference pattern.
- [ ] **[TMPL-905] AI Data Cleaning**: Integrate an AI-driven data categorization/quality pipeline that cleans commentary, maps authors, and suggests missing content; store quality metrics in verse metadata.
- [ ] **[TMPL-906] App-Task Generator**: Auto-generate UI micro-app tasks per verse/chapter based on semantic topics (e.g. Dharma/Gun/Action in Gita and Mahabharata). 

---

## 📊 Book-Wise Ingestion Progress (NVF 1.0)

Every book must pass through 5 phases (P1: Ingest, P2: Harden, P3: Enrich, P4: Tag, P5: Verify).

### 1. 🕉️ Bhagavad Gita
- **Status**: ✅ **STABLE**
- **Tasks**: [X] 700 Verses, [X] UI Audit, [ ] **[PO]** Feasibility check for 10+ Commentary integration.
- [ ] **[DEV]** Add `footer` meta that name/author/language filter is shown on verse page.- [x] **[DEV] Enforce the 2-author lean filter for Gita and Mahabharata (Dnyaneshwari + Prabhupada).**
- [x] **[DEV] Keep base template meaning visible by default (Sanskrit + English meaning).**- [ ] **[QA]** Verify “All Commentaries” and “each author” behavior in multi-language selector.

### 2. 🐘 Mahabharata
- **Status**: ⚠️ **PARTIAL (Parva ingestion + adhyaaya routing only)**
- **Tasks**: [x] **[DEV]** Stabilize `adhyaya` URL parsing and proper fallback to first subchapter.
- [x] **[DEV]** Add UI indicator: current book/chapter/adhyaya + total counts.
- [x] **[QA]** Validate inbound data for Parva-specific commentary language variants.

### 3. 🕯️ Isha Upanishad
- **Status**: ⏳ **IN PROGRESS**
- **Tasks**: [X] P1, [X] P2, [ ] **[DEV]** P3 (Add Adi Shankara Bhasya), [ ] **[QA]** P5 (Validation).

---

## 🧬 Special Constraints
- **Zero-Touch Ops**: Static auto-registration of books via directory scanning in Next.js.
- **NVF Compliance**: Sanskrit -> Translit -> Meaning -> HI/MR Layers.

_This backlog acts as our Roadmap for the Autonomous Evolution of Vishwa-Vani._


### Cyclic Bug Loop Findings
