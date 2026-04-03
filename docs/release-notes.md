# 🚀 Vishwa-Vani: Unified Release Archive

*Current Version*: v0.8.0 (AI Service & Developer Ecosystem)

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
