# Release Notes


## [1.0.10] - Current Session
### 🏛️ Scripture Promotion & Bug Fixes
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
