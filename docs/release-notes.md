# Release Notes


## [1.0.10] - Current Session
### 🏛️ Scripture Promotion & Bug Fixes
- [x] `BUG-069` **Validate Silver Edge Cases**: Added required `book.meta.json` legal clearance metadata to `garuda-purana`, `isha-upanishad`, `samskaras`, `stotras`, and `yoga-sutras` so they successfully pass silver data validation.
- [x] `BUG-070` **Check Search Coverage**: Modified `lib/lake.worker.ts` to include searching the JSON `content` column in SQLite so new commentary data is indexed in the fallback search query.
- [x] `BUG-071` **Audit Mobile Viewport Navigation**: Patched `HierarchicalNav` to restrict maximum dropdown width on narrow mobile viewports and implemented search filtering inside the dropdown to handle large parva structures.
- `BUG-052` **[P2] npm install Warnings and Vulnerabilities**: Audit all deprecated package warnings (`inflight`, `glob`, `whatwg-encoding`, `prebuild-install`) and security vulnerabilities to achieve a clean `npm i` execution output.
- `BUG-068` **[P2] Dev Environment Dependency Security Audit**: Execute automated audits on the package lockfile to ensure zero high-risk vulnerabilities are present in devDependencies.
- Ingest Nilakantha Sanskrit commentary from `data/1-bronze/nilakantha-raw-ocr.txt` into Gold adhyaya files.
- Register in scholars registry & update UI selector.
- Write dedicated Jest test case: `__tests__/mbh-nilakantha.test.ts`.
- Run lint, test runner, and build check.
- Ingest KMG translation, promote to Gold, register, test, and verify.
- Scrape Vedabase for Canto 1.
- Parse into NVF 1.0 format.
- Register in scholars registry & update UI selector.
- Write dedicated Jest test case: `__tests__/bhagavata-prabhupada.test.ts`.
- Run validation, promote to Gold, test runner, and lint pass.
- Register in scholars registry & update UI selector.
- `DEPLOY-003` **Create Rating Telemetry Component**: Implement a clean, responsive client star-rating widget under active scholar cards in `components/shloka/study-client.tsx` using Tailwind v4.
- Developed interactive `RatingTelemetry` component, providing users a star-rating widget under active scholar cards to rate translations and commentary.
- Documented data acquisition blocks for Phase A bronze drops (`MBH-DATA-2` to `5`, `KENA-DATA-1`, `BHAG-DATA-1`, `VISHNU-DATA-1`) in the `Pending Human Decision Backlog`.
- Added Crawlee and Playwright dependencies and scaffolded generic data crawling implementation.
- Fixed `isha-upanishad` pipeline verification missing file `book.meta.json` and repromoted to Gold level.
- Enabled Mahabharata availability in `lib/texts.ts` and successfully verified its UI via rigorous checks.
- Addressed development environment dependency vulnerabilities and resolved deprecated package warnings, satisfying `BUG-052` and `BUG-068`.
- Updated test environment `jsdom` and `jest-environment-jsdom` to exact compatible versions and eliminated testing blockers.
- Modified `scripts/audit_gold.js`, `scripts/audit_multilang.js`, `scripts/audit_standards.js` to recursively resolve nested directories (fixing Mahabharata Parva traversal).
- Created `data/2-silver/mahabharata/book.meta.json` (and for Bhagavata Purana, Vishnu Purana).
- Promoted Mahabharata, Bhagavata Purana, and Vishnu Purana to Gold using `scripts/promote_to_gold.js`.
- Bumped version to 1.0.10.

### 📜 Scholars Registry
- Marked `GITA-SCH-03` through `GITA-SCH-10` as BLOCKED and appended missing source data note to Pending Human Decision Backlog.

### 🧪 Quality Gates
- Lint: ✅
- TSC: ✅
- Test: ✅
- Build: ✅


## [1.0.9] - 2026-05-17
### 🏛️ Scripture Promotion
- **Mahabharata (Parvas 1-3)** promoted to Gold tier (~19,580 verses).
- **Bhagavata Purana** (Canto 1) promoted to Gold tier.
- **Vishnu Purana** promoted to Gold tier.
- Legal metadata (book.meta.json) created for Mahabharata, Bhagavata Purana, and Vishnu Purana to satisfy the pipeline safety gate.

### 📜 Scholars Registry
- **Nilakantha Caturdhara** registered as a live Tier 0 scholar with POC commentary injection for Mahabharata 1.1.
- **Bal Gangadhar Tilak** and **Sri Aurobindo** (Gita) marked as deferred until reliable digital sources are added to the repository.

### 🔧 Engineering & Stability
- **Stability Gate**: Upgraded next version in package.json to match the actual environment (^16.2.6) and verified build.
- **Bug Fix**: Resolved a division-by-zero error in scripts/vishwa.py manifest generation.
- **Test Suite**: Added __tests__/mbh-kmg.test.ts to verify Mahabharata Gold data integrity.

### 🧪 Quality Gates
- Lint: ✅
- TSC: ✅
- Test: ✅
- Build: ✅

## [2026-05-29] - Ingestion & Quality Sprint
- **Bhagavata Purana (Canto 1)**: Repaired all 19 chapters. Removed "A beautiful verse" fillers, backfilled Vyasa/Prabhupada metadata, and ensured EN/HI/MR coverage. Added chapter themes to manifest.
- **Kena Upanishad**: Ingested Khandas 1 & 2 (14 verses) with Max Müller translation. Promoted to Gold and activated.
- **Yoga Sutras (Chapter 1)**: Ingested 10 key sutras of Samadhi Pada with Vivekananda translation. Promoted to Gold and activated.
- **Kena Sensory Inquiry Lab**: New interactive lab for sensory inquiry (Kena 1.1-1.2).
- **V-Score/Readiness**: Bhagavata Purana, Kena Upanishad, and Yoga Sutras now 100% Gold Standard compliant.

**Current Session ID**: session_20260529_kena_bhag_yoga
**Last Action**: Full Gold promotion and Lab registration for three scriptures.
