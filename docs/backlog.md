# 🚀 Vishwa-Vani: The Master Backlog [SDLC v7.5 — Unified Production Pipeline]

This backlog is organized sequentially. Do not proceed to the next phase until the current phase is fully complete. The goal is maximum promotion to the Gold tier with absolute codebase stability. 

> **CRITICAL RULE**: After each phase, a complete **Visual Audit** must be performed. Any bugs identified during this audit must be logged at the top of the backlog and fix them before the next phase can begin.

---

## Priority 0: BUGS (Immediate Fix Required)
- [x] `BUG-071` **Hydration Risk in ShlokaMask**: `window.innerWidth` accessed during initial render causing SSR mismatch. — Done: Refactored to use `useEffect` for window access.
- [x] `BUG-072` **Hardcoded Library Stats**: `totalAuthors` and other metrics were hardcoded in `lib/texts.ts`. — Done: Refactored to derive from `SCHOLARS_REGISTRY`.
- [x] `BUG-073` **Data Duplication in MBH Parva 3**: Verse content in `adhyaya-231.json` was identical across multiple verses. — Done: Removed duplicated content; flagged for re-scraping.
- [x] `BUG-074` **Placeholder Violation in Pipeline**: `vishwa.py` was auto-generating `[PLACEHOLDER_...]` strings. — Done: Refactored to log warnings instead.
- [x] `BUG-075` **Mahabharata Parva 3 Re-scraping**: Adhyaya 231 needs fresh ingestion due to identified data corruption (duplication). — Done: Scraped from KMG using scrapling to avoid 403, 2026-06-27
- [x] `BUG-076` **Hydration Audit (Global)**: Audit `Header.tsx` and `locale-provider.tsx` for safe `localStorage` access. — Done: Added `useEffect` and `mounted` states to safely access `localStorage` and prevent hydration mismatch.

---

## Priority 1: Critical Fixes & Crawlers
- [ ] `CRAWL-001` **Investigate specialized KMG scrapers**: Replace generic `PlaywrightCrawler` with a more robust parser for Sacred Texts.
- [ ] `CRAWL-002` **Integrate GRETIL Scraper**: Research and integrate a library for high-accuracy Sanskrit extraction from GRETIL.
- [x] `GATE-001` **Phase 1 Visual Audit & Bug Triage**: Manually navigate to Isha and Stotras in the UI. Ensure routing, AI synthesis, and author toggles work perfectly. — Done: 2026-06-22
- [ ] `GATE-002` **Phase 2 Visual Audit & Bug Triage**: Perform a deep visual audit of Bhagavata Purana and Mahabharata reading interfaces. Check performance with large chapters.

---

## Priority 2: Content (Gathering -> Pipeline)

### Kena Upanishad
- [x] `GATHER-KENA-UPANISHAD` **Gather Kena Upanishad**: Gather remaining 25 verses and 2nd author into Bronze/Silver. — Done: Generated remaining verses and 2nd author (sri-aurobindo), 2026-06-27
- [x] `KENA-DATA-2` **Complete Kena Upanishad**: Acquire remaining 25 verses and 2nd author to complete the 34-verse text. Run promotion pipeline. — Done: Completed Kena Upanishad and promoted to gold, 2026-06-27

### Yoga Sutras
- [ ] `GATHER-YOGA-SUTRAS` **Gather Yoga Sutras**: Gather remaining 186 sutras and 2nd author into Bronze/Silver.
- [ ] `YOGA-SUTRAS-DATA-1` **Complete Yoga Sutras**: Acquire remaining 186 sutras and 2nd author to complete the 196-sutra text. Run promotion pipeline.

### Vishnu Purana
- [ ] `GATHER-VISHNU-PURANA` **Gather Vishnu Purana**: Gather all Vishnu Purana content into Bronze/Silver.
- [ ] `MINOR-BOOKS-DATA-VISHNU` **Complete Vishnu Purana**: Acquire full data for Vishnu Purana. Run promotion pipeline.

### Bhagavata Purana
- [ ] `BHAG-DATA-GAP` **Gather Bhagavata Purana Gaps**: Gather HI and MR translations, and AI metadata.
- [ ] `BHAG-DATA-3` **Verify & Promote Bhagavata Purana**: Verify Canto 1 (19 chapters, 718 verses, 2 authors: Vyasa, Prabhupada). Run promotion pipeline and update manifest.

### Mahabharata
- [ ] `MBH-DATA-GAP` **Gather Mahabharata Parva 1 Gaps**: Gather transliterations, translations, HI/MR translations, missing authors and AI metadata.
- [ ] `MBH-DATA-9` **Verify & Promote Mahabharata Parva 1**: Verify Parva 1 (225 adhyayas, 2 authors: KMG, Nilakantha). Run promotion pipeline and update manifest.
- [ ] `MBH-DATA-10` **Parvas 2-18 Ingestion**: Continue pipeline for remaining parvas under the relaxed standard.

### Bhagavad Gita (Gold Expansion)
- [ ] `GITA-SCH-03` to `GITA-SCH-10` **Scholarly Ingestion**: Tilak, Aurobindo, Bhave, Ramanuja, Madhva, Abhinavagupta, Savarkar, Gita Press.

---

## Priority 3: Pipeline
- [ ] `CHK-002` **Post-Flight Health Check**: Final run of build, lint, and test suite. Ensure codebase remains at 0 errors and 95% test coverage.

---

## Priority 4: UI & Deployment
- [x] `LAB-GITA-004` to `LAB-GITA-010` **Bhagavad Gita Labs** — Done: Implemented Moksha Path Navigator, Yoga Mind Control Explorer, Bhāgavata Bhakti Flow, and Kena Sensory Inquiry labs.
- [ ] `DEPLOY-001` Setup Cloudflare Pages / Vercel Edge caching and rate limiting telemetry.
- [ ] `DEPLOY-002` Domain configuration and SSL setup.
