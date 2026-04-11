# Release Notes

## [1.0.2] - 2026-04-11
### ✨ Enhancements & Fixes
- **Audit Findings Resolved**:
  - Prevented layout shifts in lab components by giving `LabSkeleton` a `min-h-[400px] h-full` styling (AUDIT-001).
  - Implemented a Vedic-themed empty state with Om (`ॐ`) for search results (AUDIT-002).
  - Enhanced mobile navigation legibility by using a 12px backdrop blur (AUDIT-003).
  - Improved mobile shloka legibility by reducing font size on `<640px` viewports (AUDIT-004).
  - Standardized error response structures for `/api/feedback` and `/api/synthesize` to `{ error, code }` (AUDIT-005).
  - Verified presence of `rel="nofollow"` on external links in acknowledgments page (AUDIT-006).

### 🧪 Quality Gates
- Lint: ✅ (0 errors)
- TSC: ✅ (0 errors)
- Test: ✅ (172/172 passing)
- Build: ✅ (84 pages generated)

## [1.0.1] - 2026-04-10
### ✨ Enhancements & Fixes
- **Analytics Integration**: Added `@vercel/analytics` to `app/layout.tsx` for core web vitals tracking (DEPL-010).
- **Security Policy**: Updated `next.config.ts` Content-Security-Policy to allow Vercel Analytics and wasm-unsafe-eval (DEPL-009).
- **Content completeness**: Registered missing `mahabharata` parva-1 adhyaya shard files in `manifest.json` as GOLD status (DEPL-011).
- **UX & UI**: Added `SkeletonVerse` and `SkeletonCommentary` components for smooth loading (BETA-006).
- **Routing**: Added a custom `app/not-found.tsx` 404 page (BETA-007).
- **API Error Handling**: Created `app/api/error.tsx` (BETA-008).
- **Feedback Widget Testing**: Wrote tests for `FeedbackWidget` in `__tests__/components-feedback-widget.test.tsx` (BETA-009).
- **Feedback Button**: Added a feedback trigger button to the `study-client.tsx` toolbar (BETA-010).
- **Infrastructure**: Verified `eslint.config.mjs` validity (INFRA-009).

### 🧪 Quality Gates
- Lint: ✅ (0 errors)
- TSC: ✅ (0 errors)
- Test: ✅ (172/172 passing)
- Build: ✅ (84 pages generated)


## [1.0.0] - 2026-04-09
### 🏆 PRODUCTION RELEASE
- **v1.0.0 Milestone**: Official production release of Vishwa-Vani, the universal voice of Vedic wisdom.
- **Full Scripture Support**: Stable Gold-tier data for Bhagavad Gita (18 chapters), Isha Upanishad, and Mahabharata (Sabha Parva).
- **Vedic Labs**: Interactive suite of 10+ experimental tools for Vedic study.
- **Lean UI Standard**: Optimized reading experience with dual-scholar commentary limit.

### 🏗️ Performance & Quality Audit
- **Lighthouse Scores**:
  - Performance: 83
  - Accessibility: 95
  - Best Practices: 100
  - SEO: 100
- **Bundle Optimization**: Full dynamic importing for Lab components.
- **Infrastructure**: Hardened CSP, HSTS enforcement, and zero-error ESLint/TSC baseline.

### ✨ Added
- **Social Assets**: OpenGraph/Twitter card generator (`scripts/generate-og.js`) and branding images in `public/og/`.
- **Sitemap**: Comprehensive `sitemap.xml` supporting all scripture routes.
- **Documentation**: New root `README.md` and `docs/launch-announcement.md`.

### 🧪 Quality Gates
- Lint: ✅ (0 errors)
- TSC: ✅ (0 errors)
- Test: ✅ (171/171 passing)
- Build: ✅ (84 pages generated)

---

## [0.9.3] - 2026-04-09
### 🏗️ Major Milestones
- **Production Baseline Hardening**: Restored green baseline by fixing pre-existing ESLint errors and validating test suite.
- **Security \u0026 Infrastructure (PUB Phase 1)**: Completed initial publication phase including domain documentation, HSTS enforcement, and CSP hardening.
- **Brand Professionalization**: Removed all Beta/PoC indicators to prepare for v1.0.0.

### 📋 Backlog Updates
- [x] `PUB-011` Submit sitemap.xml — Generated and verified.
- [x] `PUB-012` Create launch announcement assets — Finalized in docs/launch-announcement.md.
- [x] `PUB-013` Run E2E smoke tests — Playwright/Jest suite passing.
- [x] `PUB-014` Tag v1.0.0 release — Version bumped in package.json.
