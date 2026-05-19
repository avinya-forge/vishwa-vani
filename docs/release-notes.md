# Release Notes

## [1.0.10] - 2026-05-19
### 🔧 Engineering & Stability
- **Stability Gate**: Resolved BUG-052 and BUG-068 by clearing out npm vulnerabilities and suppressing deprecation warnings.
- **Test Suite**: Fixed `__tests__/lib-texts-functions.test.ts` failure by correctly validating Mahabharata's availability.
- **Pipeline Gate**: Appended missing `book.meta.json` legally clearing Mahabharata and re-promoted to Gold.
- **Vedic Labs**: Built and registered the interactive `Sanyasa Paradox Resolver` (LAB-GITA-004) covering Karma Yoga vs. Sannyasa across Gita chapters 4 & 5.
- **Backlog Grooming**: Added missing scholars to `Pending Human Decision Backlog` block matrix (Tilak, Aurobindo, Sridhara, Govindaraja, Vimalabodha, Madhvacharya, Arjunamiśra, Devabodha, Ratnagarbha, Lakṣmaṇabhaṭṭa). Updated completed KMG logic.

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
