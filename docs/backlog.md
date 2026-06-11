# 🚀 Vishwa-Vani: The Master Backlog [SDLC v7.4 — Unified Production Pipeline]

This backlog is organized sequentially. Do not proceed to the next phase until the current phase is fully complete. The goal is maximum promotion to the Gold tier with absolute codebase stability. 

> **CRITICAL RULE**: After each phase, a complete **Visual Audit** must be performed. Any bugs identified during this audit must be logged at the top of the backlog and fixed before the next phase can begin.

---

## 🛡️ PHASE 0: PRE-FLIGHT CHECKS
*Enforce absolute codebase stability before making any data changes.*

- [x] `CHK-001` **Pre-Flight Health Check**: Run full build (`npm run build`), lint (`npm run lint`), and test suite (`npm test`). Enforce 0 errors and 95% unit test coverage floor before starting data ingestion.
- [x] `BUG-050` **Placeholder Content Audit**: Run scripts to catch mock content or single-character placeholders in Gold/Silver tiers (specifically Isha and Mahabharata datasets).
- [x] `BUG-051` **Transliteration Missing**: Generate missing transliteration fields for Mahabharata Parva 1 to comply with NVF requirements.
- [x] `BUG-052` **AI Metadata Missing**: Generate missing AI Metadata (topics, correlations) for Mahabharata Parva 1 to comply with NVF requirements.
- [x] `GATE-000` **Phase 0 Visual Audit & Bug Triage**: Complete visual check of the UI. Log any new bugs here and fix them before starting Phase 1.

---

## 🚀 PHASE 1: HIGH PRIORITY PROMOTIONS
*Thoroughly verify and promote books that already have 100% of required data (all chapters, all verses, 2+ authors, EN/HI/MR).*

- [ ] `ISHA-DATA-11` **Verify & Promote Isha Upanishad**: Manually verify the 19 verses (Sanskrit, EN/HI/MR, 2+ authors). Run `promote_to_gold.js` and update manifest.
- [ ] `STOTRA-DATA-1` **Verify & Promote Stotras**: Audit and promote the 17 verses across 3 chapters. Update manifest.
- [ ] `GATE-001` **Phase 1 Visual Audit & Bug Triage**: Manually navigate to Isha and Stotras in the UI. Ensure routing, AI synthesis, and author toggles work perfectly. Log any new bugs here and fix them before starting Phase 2.

---

## 🌍 PHASE 2: MASSIVE VOLUME PROMOTIONS
*Promote massive texts under the **Relaxed Gold Standard**: Sanskrit + English verse/meaning + 2 Authors (even if HI/MR are missing).*

- [ ] `BHAG-DATA-3` **Verify & Promote Bhagavata Purana**: Verify Canto 1 (19 chapters, 718 verses, 2 authors: Vyasa, Prabhupada). Run promotion pipeline and update manifest.
- [ ] `MBH-DATA-9` **Verify & Promote Mahabharata Parva 1**: Verify Parva 1 (225 adhyayas, 2 authors: KMG, Nilakantha). Run promotion pipeline and update manifest.
- [ ] `MBH-DATA-10` **Parvas 2-18 Ingestion**: Continue pipeline for remaining parvas under the relaxed standard.
- [ ] `GATE-002` **Phase 2 Visual Audit & Bug Triage**: Perform a deep visual audit of Bhagavata Purana and Mahabharata reading interfaces. Check performance with large chapters. Log any new bugs here and fix them before starting Phase 3.

---

## 🏗️ PHASE 3: DATA ACQUISITION & COMPLETION
*Reuse existing Silver data and fill in missing gaps with better quality sources to complete these books.*

- [ ] `KENA-DATA-2` **Complete Kena Upanishad**: Acquire remaining 25 verses and 2nd author to complete the 34-verse text. Run promotion pipeline.
- [ ] `YOGA-SUTRAS-DATA-1` **Complete Yoga Sutras**: Acquire remaining 186 sutras and 2nd author to complete the 196-sutra text. Run promotion pipeline.
- [ ] `MINOR-BOOKS-DATA-1` **Complete Stubs**: Acquire full data for Vishnu Purana, Garuda Purana, and Samskaras. Run promotion pipeline.
- [ ] `GATE-003` **Phase 3 Visual Audit & Bug Triage**: Visually audit newly completed books. Log any new bugs here and fix them before starting Phase 4.

---

## 📚 PHASE 4: EXISTING GOLD EXPANSION
*Expand the depth of books already in the Gold tier.*

- [ ] `GITA-SCH-03` **Bal Gangadhar Tilak**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-04` **Sri Aurobindo**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-05` **Acharya Vinoba Bhave**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-06` **Rāmānuja**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-07` **Madhvācārya**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-08` **Abhinavagupta**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-09` **Veer Savarkar**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-10` **Gita Press Gorakhpur**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GATE-004` **Phase 4 Visual Audit & Bug Triage**: Audit Gita reading UI with all 10 scholars loaded to check toggle logic and performance. Log any new bugs here and fix them before starting Phase 5.

---

## 🛡️ PHASE 5: POST-FLIGHT CHECKS
*Ensure the codebase remains pristine after all data migrations and promotions.*

- [ ] `CHK-002` **Post-Flight Health Check**: Final run of build, lint, and test suite. Ensure codebase remains at 0 errors and 95% test coverage.

---

## 🧪 VEDIC LABS & PRODUCTION DEPLOYMENT
- [ ] `LAB-GITA-004` to `LAB-GITA-010` **Bhagavad Gita Labs**
- [ ] `LAB-GARUDA-001` **Garuda Purana Lab**
- [ ] `LAB-SAMSKARA-001` **Samskaras Lab**
- [ ] `DEPLOY-001` Setup Cloudflare Pages / Vercel Edge caching and rate limiting telemetry.
- [ ] `DEPLOY-002` Domain configuration and SSL setup.

---

## 🔮 FUTURE BOOK INTEGRATION (Roadmap)
- [ ] `ROADMAP-001` **Upanishad Expansion**: Target Katha, Prashna, Mundaka, and Mandukya Upanishads.
- [ ] `ROADMAP-002` **Ramayana Integration**: Target Valmiki Ramayana (all Kandas).
- [ ] `ROADMAP-003` **Vedas Integration**: Target Rigveda (Mandala 1-10).
