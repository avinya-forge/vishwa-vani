# Release Notes

## [0.9.3] - 2026-04-09
### 🏗️ Major Milestones
- **Production Baseline Hardening**: Restored green baseline by fixing pre-existing ESLint errors and validating test suite.
- **Security & Infrastructure (PUB Phase 1)**: Completed initial publication phase including domain documentation, HSTS enforcement, and CSP hardening.
- **Brand Professionalization**: Removed all Beta/PoC indicators to prepare for v1.0.0.

### ✨ Added
- **HSTS Enforcement**: Enabled `Strict-Transport-Security` in `next.config.ts`.
- **Hardened CSP**: Unified Content Security Policy in `next.config.ts` with support for analytics and GitHub integration.
- **Deployment Documentation**: Created `docs/deployment.md` with Domain and Cloudflare configurations.

### 🔧 Changed
- **UI Branding**: Removed `BetaBanner` from root layout.
- **Component Polish**: Updated Lab components and Shloka cards to remove "PoC" and "Simulated" labels.
- **Prototype Logic**: Hidden `PrototypeBadge` from UI via functional suppression.
- **Synthesis API**: Updated documentation stubs to reflect current production logic.

### 🧪 Test Coverage
- ✅ All 163 tests passing (16 suites).
- ✅ Build: 84 static pages generated successfully.
- ✅ TypeScript: Zero errors (strict mode).
- ✅ Lint: Zero errors (strict mode).

### 📋 Backlog Updates
- [x] `PUB-001` Register and configure custom domain — Documented in docs/deployment.md.
- [x] `PUB-002` Configure Cloudflare — Documented in docs/deployment.md.
- [x] `PUB-003` Enable HTTPS/HSTS — Implemented in next.config.ts.
- [x] `PUB-004` Security Audit/CSP — Consolidated and hardened in next.config.ts.
- [x] `PUB-005` Remove Beta/PoC labels — Cleaned from all UI and API components.

### 🚀 Deployment Status
- **Build**: ✅ Production-ready
- **Tests**: ✅ 100% Passing
- **Security**: ✅ Hardened CSP/HSTS
- **Version**: 0.9.2 → 0.9.3
