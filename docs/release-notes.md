# 🚀 Vishwa-Vani: Unified Release Archive

*Current Version*: v0.8.1 (Lean UI Template & Scholarly Interface)

---

## [0.8.1] - 2026-04-04 (Lean UI Template)
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
