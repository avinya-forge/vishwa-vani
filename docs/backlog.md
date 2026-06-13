# 🚀 Vishwa-Vani: The Master Backlog [SDLC v7.4 — Unified Production Pipeline]

This backlog is organized sequentially. Do not proceed to the next phase until the current phase is fully complete. The goal is maximum promotion to the Gold tier with absolute codebase stability. 

> **CRITICAL RULE**: After each phase, a complete **Visual Audit** must be performed. Any bugs identified during this audit must be logged at the top of the backlog and fixed before the next phase can begin.

---

## Priority 1: Bugs
- [ ] `GATE-001` **Phase 1 Visual Audit & Bug Triage**: Manually navigate to Isha and Stotras in the UI. Ensure routing, AI synthesis, and author toggles work perfectly. Log any new bugs here and fix them before starting Phase 2.
- [ ] `GATE-002` **Phase 2 Visual Audit & Bug Triage**: Perform a deep visual audit of Bhagavata Purana and Mahabharata reading interfaces. Check performance with large chapters. Log any new bugs here and fix them before starting Phase 3.
- [ ] `GATE-003` **Phase 3 Visual Audit & Bug Triage**: Visually audit newly completed books. Log any new bugs here and fix them before starting Phase 4.
- [ ] `GATE-004` **Phase 4 Visual Audit & Bug Triage**: Audit Gita reading UI with all 10 scholars loaded to check toggle logic and performance. Log any new bugs here and fix them before starting Phase 5.

---

## Priority 2: Content

### Kena Upanishad
- [ ] `GATHER-KENA-UPANISHAD` **Gather Kena Upanishad**: Gather remaining 25 verses and 2nd author into Bronze/Silver.
- [ ] `KENA-DATA-2` **Complete Kena Upanishad**: Acquire remaining 25 verses and 2nd author to complete the 34-verse text. Run promotion pipeline.

### Yoga Sutras
- [ ] `GATHER-YOGA-SUTRAS` **Gather Yoga Sutras**: Gather remaining 186 sutras and 2nd author into Bronze/Silver.
- [ ] `YOGA-SUTRAS-DATA-1` **Complete Yoga Sutras**: Acquire remaining 186 sutras and 2nd author to complete the 196-sutra text. Run promotion pipeline.

### Vishnu Purana
- [ ] `GATHER-VISHNU-PURANA` **Gather Vishnu Purana**: Gather all Vishnu Purana content into Bronze/Silver.
- [ ] `MINOR-BOOKS-DATA-VISHNU` **Complete Vishnu Purana**: Acquire full data for Vishnu Purana. Run promotion pipeline.

### Garuda Purana
- [ ] `GATHER-GARUDA-PURANA` **Gather Garuda Purana**: Gather all Garuda Purana content into Bronze/Silver.
- [ ] `MINOR-BOOKS-DATA-GARUDA` **Complete Garuda Purana**: Acquire full data for Garuda Purana. Run promotion pipeline.

### Samskaras
- [ ] `GATHER-SAMSKARAS` **Gather Samskaras**: Gather all Samskaras content into Bronze/Silver.
- [ ] `MINOR-BOOKS-DATA-SAMSKARAS` **Complete Samskaras**: Acquire full data for Samskaras. Run promotion pipeline.

### Bhagavata Purana
- [ ] `BHAG-DATA-GAP` **Gather Bhagavata Purana Gaps**: Gather HI and MR translations, and AI metadata.
- [ ] `BHAG-DATA-3` **Verify & Promote Bhagavata Purana**: Verify Canto 1 (19 chapters, 718 verses, 2 authors: Vyasa, Prabhupada). Run promotion pipeline and update manifest.

### Mahabharata
- [ ] `MBH-DATA-GAP` **Gather Mahabharata Parva 1 Gaps**: Gather transliterations, translations, HI/MR translations, missing authors and AI metadata.
- [ ] `MBH-DATA-9` **Verify & Promote Mahabharata Parva 1**: Verify Parva 1 (225 adhyayas, 2 authors: KMG, Nilakantha). Run promotion pipeline and update manifest.
- [ ] `MBH-DATA-10` **Parvas 2-18 Ingestion**: Continue pipeline for remaining parvas under the relaxed standard.

### Bhagavad Gita (Gold Expansion)
- [ ] `GITA-SCH-03` **Bal Gangadhar Tilak**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-04` **Sri Aurobindo**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-05` **Acharya Vinoba Bhave**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-06` **Rāmānuja**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-07` **Madhvācārya**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-08` **Abhinavagupta**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-09` **Veer Savarkar**: Acquire data, parse to NVF, promote to Gold.
- [ ] `GITA-SCH-10` **Gita Press Gorakhpur**: Acquire data, parse to NVF, promote to Gold.

### Future Book Integration (Roadmap)
- [ ] `ROADMAP-001` **Upanishad Expansion**: Target Katha, Prashna, Mundaka, and Mandukya Upanishads.
- [ ] `ROADMAP-002` **Ramayana Integration**: Target Valmiki Ramayana (all Kandas).
- [ ] `ROADMAP-003` **Vedas Integration**: Target Rigveda (Mandala 1-10).

---

## Priority 3: Pipeline
- [ ] `CHK-002` **Post-Flight Health Check**: Final run of build, lint, and test suite. Ensure codebase remains at 0 errors and 95% test coverage.

---

## Priority 4: UI
- [ ] `LAB-GITA-004` to `LAB-GITA-010` **Bhagavad Gita Labs**
- [ ] `LAB-GARUDA-001` **Garuda Purana Lab**
- [ ] `LAB-SAMSKARA-001` **Samskaras Lab**
- [ ] `DEPLOY-001` Setup Cloudflare Pages / Vercel Edge caching and rate limiting telemetry.
- [ ] `DEPLOY-002` Domain configuration and SSL setup.
