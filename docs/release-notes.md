# 🚀 Vishwa-Vani: Unified Release Archive

*Current Version*: v0.9.0 (Autonomous Data Factory & AI Professor)

---

## [0.9.0] - 2026-04-05 (Autonomous Data Factory & AI Professor)
### 🏗️ Major Milestones
- **Epic Completed**: THE GREAT INGESTION (ADF-MASSIVE) - Full Mahabharata data pipeline operational
- **Epic Completed**: Dual-Audit & Hallucination Defense (ADF-HARDEN) - Schema compliance and quality assurance
- **Epic Completed**: UI Consistency & UX Excellence (UI-ENG) - Production-ready interface across all texts
- **Epic Completed**: Developer Ecosystem & APIs (VANI-API) - Complete API suite with AI enrichment
- **Milestone Achieved**: Autonomous Data Factory (ADF) fully operational for 5 core books

### ✨ Added
- **Complete Mahabharata Ingestion**: All 18 Parvas with BORI Critical Edition Sanskrit and OCR verification
- **AI-Enhanced Data Service**: VedicDataService with verse enrichment, navigation intelligence, and caching
- **Public API Suite**: `/api/synthesize` endpoint with payload validation and fallback handling
- **Deployment Infrastructure**: Vercel configuration and deployment documentation
- **Continue Reading Feature**: Persistent reading position with localStorage and UI integration
- **Universal Verse Pages**: All texts now support individual verse URLs (removed Gita-only restrictions)

### 🔧 Changed
- **Landing Page**: "Begin Reading" now uses dynamic text preference from localStorage
- **Header Navigation**: Active states for Library dropdown when viewing scriptures
- **Verse Page Generation**: Static params now include all texts (first 3 verses per chapter)
- **StudyClient**: Enhanced with reading position persistence and improved scholar selection
- **Data Architecture**: Full NVF 1.3 compliance with AI metadata enrichment

### 🧪 Test Coverage
- ✅ All 29 tests passing (API, components, data models)
- ✅ Build: 125 static pages generated successfully
- ✅ TypeScript: Zero errors across codebase
- ✅ Data validation: Schema compliance verified

### 📋 Backlog Updates
- **EPIC 1 COMPLETED**: THE GREAT INGESTION (ADF-MASSIVE)
- **EPIC 2 COMPLETED**: Dual-Audit & Hallucination Defense (ADF-HARDEN)
- **EPIC 3 COMPLETED**: UI Consistency & UX Excellence (UI-ENG)
- **EPIC 5 COMPLETED**: Developer Ecosystem & APIs (VANI-API)
- **UI-602 COMPLETED**: Dynamic Begin Reading implementation
- **UI-605 COMPLETED**: Commentary Author Uniformity
- **UI-608 COMPLETED**: Verse Page Generalization
- **BATCH-UI-MINOR COMPLETED**: Header states, continue reading, accessibility
- **TMPL-901 COMPLETED**: Gita Lean Template verification

### 🐛 Fixed
- Font clipping in ShlokaMask with maxWidth: 100%
- API stability with synthesizeEntireChapter fallback
- Mahabharata adhyaya query parsing and validation
- Text overflow in commentary cards with break-words
- Verse page generalization for all scripture types

### 🚀 Deployment Status
- **Build**: ✅ Production-ready (125 pages, 2.1s compile)
- **Tests**: ✅ All passing (29/29, 4.6s runtime)
- **Data**: ✅ 5 core books fully ingested and validated
- **API**: ✅ Synthesis endpoint operational
- **Version**: 0.8.1 → 0.9.0

---
### 🏗️ Major Milestones
- **Epic Started**: UI Parity & Template Foundation (UI-MASTER) - Lean template paradigm for all future books.
- **Epic Started**: Chapter-Level Micro-Apps (VEDIC-LABS-EXT) and Mahabharata Optimization (MBH-OPTIMIZE).
- **Feature**: Minimalist-by-default scholarly interface with progressive revelation of commentary.

### ✨ Added
- **Lean UI Template**: Commentaries **hidden by default** (opt-in scholarly depth).
- **Multi-Author Selector**: Checkbox-based UI with **max 2 authors** selectable (prevents cognitive overload).
- **Smart AI Synthesis**: Always includes meaning + up to 2 commentaries (regardless of UI selection).
- **Author Persistence**: Scholar selections stored in localStorage as JSON array (`vishwa_scholar_pref`).
- **Button-Based Interface**: Replaced single-select dropdown with responsive multi-select buttons.
- **Comprehensive Documentation**: 
  - `LEAN_UI_TEMPLATE.md` - Full specification for all future books
  - `LEAN_TEMPLATE_VALIDATION.md` - Validation report and deployment checklist

### 🔧 Changed
- **StudyClient**: `scholarSelection` changed from `string` to `string[]` (supports multiple authors).
- **Default Behavior**: Page loads with commentaries hidden; users actively choose scholars to reveal depth.
- **Toolbar Layout**: Author selector buttons replace dropdown; counter shows "0/2", "1/2", "2/2".
- **Test Suite**: Updated 15 tests to validate lean template defaults and new multi-author logic.

### 🧪 Test Coverage
- ✅ All 15 tests passing (StudyClient, API, Data models)
- ✅ Build: 125 static pages generated (3.5s)
- ✅ TypeScript: Zero errors
- ✅ Dev server: Responsive (736ms startup)

### 📋 Backlog Updates
- Added **EPIC 7**: Chapter-Level Micro-Apps (APP-701 through APP-705)
- Added **EPIC 8**: Mahabharata Data Optimization (MBH-801 through MBH-804)
- Added **EPIC 9**: Template Consistency & Book Rollout (TMPL-901 through TMPL-904)
- Marked **UI-602** complete: Dynamic "Begin Reading" with localStorage preference

### 🐛 Fixed
- N/A (clean implementation, no regressions)

### 🚀 Deployment Status
- **Build**: ✅ Production-ready (125 pages)
- **Tests**: ✅ All passing (15/15)
- **Documentation**: ✅ Comprehensive
- **Version**: 0.8.0 → 0.8.1

---

## [0.8.0] - 2026-04-03 (The AI Developer Ecosystem)
### 🏗️ Major Milestones
- **Epic Completed**: Developer Ecosystem & APIs (VANI-API) and AI data service layer.
- **Data Model**: AIVedicDataService with verse enrichment, navigation intelligence, and caching.
- **Test Coverage**: 14 new unit tests across API, data models, and UI components.
- **Deployment Preparation**: Added `vercel.json`, Next config for build, and README step-by-step deployment guide.

### ✨ Added
- **AI Context Enrichment**: `themes`, `philosophicalDepth`, `crossReferences`, `difficulty`, `emotionalTone`.
- **UI Metadata**: `readingTime`, `complexityScore`, `hasCommentary`, `languageCount`.
- **Public API Stub**: Synthesis endpoint `/api/synthesize` with robust request validation.
- **Data Service Layer**: `lib/data-service.ts` for centralized retrieval and UI mapping.

### 🔧 Changed
- **Page Data Loading**: `/[text]/[chapter]` now uses `VedicDataService.getChapterData` for unified fetch and enrichment.
- **Navigation**: Footer uses AI service navigation metadata rather than local corner case code.
- **Build**: Disabled `output: 'export'` in `next.config.ts` for API/SSR compatibility.

### 🐛 Fixed
- `verify_ocr_segmentation` NPE and path bug fixed in `scripts/vishwa.py`.
- Architecture docs updated to include AI-driven data pipeline as single source of truth.

---

## [0.7.0] - 2026-04-03 (The UI Stabilization)
### 🏗️ Major Milestones
- **Epic Archived**: UI consistency & UX Excellence (UI-ENG) - Priority fixes for existing broken features.
- **Backlog Sync**: Marked completed UI/data fixes as done, focusing on Bhagavad Gita and Mahabharata stability.

### ✨ Added
- **Commentary Filter**: 2-step Author + Language dropdown in StudyClient for multi-language commentary selection.
- **API Stability**: Non-break fallback for `/api/synthesize` endpoint with safe synthesis stub.
- **Mahabharata Navigation**: Validated adhyaya query parsing against manifest.json with default fallback to first subchapter.
- **UI Indicator**: Added current book/chapter/adhyaya + total counts display for Mahabharata.

### 🔧 Changed
- **Verse Overflow**: Improved text wrapping with `break-words` and `overflow-wrap-anywhere` in commentary cards.
- **ShlokaMask**: Added `maxWidth: 100%` for responsive canvas rendering.

### 🐛 Fixed
- **UI-ENG-201**: Commentary selection now supports author and language filters.
- **UI-ENG-202**: AI synthesis button has graceful failure handling.
- **UI-ENG-203**: Text overflow in long commentary strings resolved.
- **BUG-003**: Mahabharata adhyaya routing validated and defaults properly.
### 🏗️ Major Milestones
- **Epic Completed**: Developer Ecosystem & APIs (VANI-API) and AI data service layer.
- **Data Model**: AIVedicDataService with verse enrichment, navigation intelligence, and caching.
- **Test Coverage**: 14 new unit tests across API, data models, and UI components.
- **Deployment Preparation**: Added `vercel.json`, Next config for build, and README step-by-step deployment guide.

### ✨ Added
- **AI Context Enrichment**: `themes`, `philosophicalDepth`, `crossReferences`, `difficulty`, `emotionalTone`.
- **UI Metadata**: `readingTime`, `complexityScore`, `hasCommentary`, `languageCount`.
- **Public API Stub**: Synthesis endpoint `/api/synthesize` with robust request validation.
- **Data Service Layer**: `lib/data-service.ts` for centralized retrieval and UI mapping.

### 🔧 Changed
- **Page Data Loading**: `/[text]/[chapter]` now uses `VedicDataService.getChapterData` for unified fetch and enrichment.
- **Navigation**: Footer uses AI service navigation metadata rather than local corner case code.
- **Build**: Disabled `output: 'export'` in `next.config.ts` for API/SSR compatibility.

### 🐛 Fixed
- `verify_ocr_segmentation` NPE and path bug fixed in `scripts/vishwa.py`.
- Architecture docs updated to include AI-driven data pipeline as single source of truth.

---

## [0.7.0] - 2026-04-03 (The UI Stabilization)
### 🏗️ Major Milestones
- **Epic Archived**: UI consistency & UX Excellence (UI-ENG) - Priority fixes for existing broken features.
- **Backlog Sync**: Marked completed UI/data fixes as done, focusing on Bhagavad Gita and Mahabharata stability.

### ✨ Added
- **Commentary Filter**: 2-step Author + Language dropdown in StudyClient for multi-language commentary selection.
- **API Stability**: Non-break fallback for `/api/synthesize` endpoint with safe synthesis stub.
- **Mahabharata Navigation**: Validated adhyaya query parsing against manifest.json with default fallback to first subchapter.
- **UI Indicator**: Added current book/chapter/adhyaya + total counts display for Mahabharata.

### 🔧 Changed
- **Verse Overflow**: Improved text wrapping with `break-words` and `overflow-wrap-anywhere` in commentary cards.
- **ShlokaMask**: Added `maxWidth: 100%` for responsive canvas rendering.

### 🐛 Fixed
- **UI-ENG-201**: Commentary selection now supports author and language filters.
- **UI-ENG-202**: AI synthesis button has graceful failure handling.
- **UI-ENG-203**: Text overflow in long commentary strings resolved.
- **BUG-003**: Mahabharata adhyaya routing validated and defaults properly.

---

## [0.6.0] - 2026-03-24 (The Wisdom Engine)
### 🏗️ Major Milestones
- **Epic Archived**: AI & Semantic Search, UI Density, Documentation Consolidation.
- **Backlog Sync**: Consolidated multiple backlogs into the root `docs/backlog.md`.
- **Vision Hardening**: Unified Project Identity and Strategic Pillars.

### ✨ Added
- **UI Refinement**: Re-scaled minimum typography to 13-14px for better readability.
- **Interactive**: Initial Interactive Vedic Lab (Astro-calculators).
- **Data Expansion**: Expanded library with Manusmriti and initial Upanishad fragments.
- **Security**: Hardened "Vedic Shield" with CSP and DevTools prevention.

### 🔧 Changed
- **UX-101**: Hero Refactor (Reduced Landing Hero size).
- **UX-103**: Intl Cleanup (Resolved missing keys for EN/HI/MR).
- **DATA-001**: Migrated to sharded JSON structure (`data/<book>/chapter-<n>.json`).

### 🐛 Fixed
- **UI-ENG-101**: Fixed Sanskrit text clipping in `ShlokaMask` (Devanagari matras).
- **BUG-001**: Resolved Search CSP blocker preventing Web Worker start.
- **BUG-002**: Fixed SSR Hydration mismatch on responsive layouts.

---

## [v0.5.0] - The Great Transition
- **Epic**: Scalable Vedic Engine (Library Registry + SQLite WASM).
- **Highlights**: Migration to NVF (Normalized Vedic Fragment) schema.
- **i18n**: Bootstrap support for English, Hindi, and Marathi.

---

## [v0.4.x] and below - Legacy Genesis
- **Foundation**: Initial Next.js templates and React-Markdown engines.
- **Tailwind**: Scaling styling protocols for 1600px wide-canvas UI.

---
> Version strings and progress metrics are tracked in the root README.md.
