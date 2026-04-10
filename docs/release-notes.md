# Release Notes

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
