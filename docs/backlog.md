# 🚀 Vishwa-Vani: The Master Backlog [SDLC v7.0 — Core Four Ingestion Focus]

This is the single authoritative ledger for Vishwa-Vani progress. It is strictly organized to prioritize:
1. **STABILITY & BUGS**: Zero vulnerabilities, clean lints, 100% test coverage first.
2. **THE CORE FOUR SCRIPTURE ENRICHMENT (HIGHEST INGESTION PRIORITY)**: Focus strictly on completing and pushing all books we have already started into Gold tier first, concentrating on the most famous cornerstone texts: **Mahabharata** (which includes **Bhagavad Gita**), **Bhagavata Purana**, and **Ramayana**. Each must have **at least 10 commentators** fully integrated in the UI before release.
3. **GOLDEN SCRIPTURE AUDITING & BUG HUNT**: Auditing newly promoted Gold scriptures for consistency, accuracy, search indexing, and performance.
4. **LIVE PRODUCTION DEPLOYMENT**: Custom domains, proxy servers, caching, and rate limiting telemetry (pushed down!).
5. **SECONDARY SCRIPTURES PIPELINE**: Upanishads and other scriptures (Isha Upanishad, Kena Upanishad, Yoga Sutras) pushed down for secondary focus.

---

## 🎯 PRIORITY 0: STABILITY GATE & ACTIVE BUG FIXES

### BUG HUNTER: STABILITY & REGRESSIONS
- [ ] `BUG-050` **Placeholder Content Audit**: Run `scripts/audit_standards.js` specifically to catch mock content or single-character placeholders in Gold tier. Current Isha and Mahabharata datasets contain placeholders causing validation to fail.
- [ ] `BUG-051` **Transliteration Missing**: Generate missing transliteration fields for Mahabharata Parva 1 to comply with NVF requirements.
- [ ] `BUG-052` **AI Metadata Missing**: Generate missing AI Metadata (topics, correlations) for Mahabharata Parva 1 to comply with NVF requirements.

---

## 📚 PRIORITY 1: THE CORE FOUR SCRIPTURE ENRICHMENT
*Surgically ingest, promote to Gold, register, and write dedicated unit tests for 10 commentators across each of the Core Four scriptures. Books are processed one at a time.*

### 🏛️ BOOK A: BHAGAVAD GITA (657 Verses)
*Status: 2 commentators complete (Shankara, Dnyaneshwar). 8 commentators queued to reach the 10-scholar standard.*
- [ ] `GITA-SCH-03` **Bal Gangadhar Tilak — *Gītā Rahasya*** (Karma-Yoga): Acquire data, parse to NVF, promote to Gold, register, test.
- [ ] `GITA-SCH-04` **Sri Aurobindo — *Essays on the Gītā*** (Integral Yoga): Acquire data, parse to NVF, promote to Gold, register, test.
- [ ] `GITA-SCH-05` **Acharya Vinoba Bhave — *Gītā Pravachane*** (Samyayoga): Acquire data, parse to NVF, promote to Gold, register, test.
- [ ] `GITA-SCH-06` **Rāmānuja — *Gītā Bhāṣya*** (Vishishtadvaita): Acquire data, parse to NVF, promote to Gold, register, test.
- [ ] `GITA-SCH-07` **Madhvācārya — *Gītā Bhāṣya*** (Dvaita): Acquire data, parse to NVF, promote to Gold, register, test.
- [ ] `GITA-SCH-08` **Abhinavagupta — *Gītārtha-saṅgraha*** (Kashmir Shaiva): Acquire data, parse to NVF, promote to Gold, register, test.
- [ ] `GITA-SCH-09` **Veer Savarkar — *Gītā Karma-Yoga*** (Karma-Yoga): Acquire data, parse to NVF, promote to Gold, register, test.
- [ ] `GITA-SCH-10` **Gita Press Gorakhpur — *Śrīmadbhagavadgītā*** (Sanatana Synthesis): Acquire data, parse to NVF, promote to Gold, register, test.

### 🏛️ BOOK B: MAHABHARATA (PARVAS 1-18)
*Status: Partially acquired in Silver. Missing metadata, proper alignments, and real translations for secondary layers.*
- [ ] `MBH-DATA-5` **Author 2 Hindi/Marathi Layer**: For thematically rich adhyayas 1–5 — Bal Gangadhar Tilak's Mahabharata perspective from Gitarahasya (Marathi original). Scrape using `scripts/scraping/use_scrapling.py`. Format as `author: "tilak-mr"`, `lang: "mr"`.
- [ ] `MBH-DATA-8` **Enrichment Script Real Data**: Re-run `scripts/enrich_mbh_parva1.js` using real scraped data rather than mock placeholder data for KMG (EN/HI/MR) and Author 2 (MND).
- [ ] `MBH-DATA-9` **Pipeline Run Parva 1**: Validate Silver, Promote to Gold, Audit for Parva 1.
- [ ] `MBH-DATA-10` **Parvas 2-18 Ingestion**: Follow the 18 Parvas ingestion schedule. Parse, enrich, validate, and promote.

### 🏛️ BOOK C: BHAGAVATA PURANA (ALL CANTOS)
*Status: Needs real layered enrichment. Canto 1 was mock-promoted.*
- [ ] `BHAG-DATA-2` **Acquire Canto 1-12 Layers**: Ensure all 12 skandhas have real 2+ authors, 3 languages.
- [ ] `BHAG-DATA-3` **Pipeline Run**: Validate Silver, Promote to Gold, Audit for all cantos.

### 🏛️ BOOK D: VISHNU PURANA
*Status: Needs real layered enrichment.*
- [ ] `VISHNU-DATA-2` **Acquire Missing Layers**: Ensure all amshas have real 2+ authors, 3 languages.
- [ ] `VISHNU-DATA-3` **Pipeline Run**: Validate Silver, Promote to Gold, Audit.

---

## 🔍 PRIORITY 2: SECONDARY SCRIPTURES PIPELINE
*These books have been started but lack 2+ authors across 3 languages.*

### 🏛️ BOOK E: GARUDA PURANA
*Status: Partial Silver. Needs completion.*
- [ ] `GARUDA-DATA-1` **Acquire Missing Layers**: Ensure 2+ authors, 3 languages for Garuda Purana.
- [ ] `GARUDA-DATA-2` **Pipeline Run**: Validate Silver, Promote to Gold, Audit.

### 🏛️ BOOK F: SAMSKARAS
*Status: Partial Silver. Needs completion.*
- [ ] `SAMSKARAS-DATA-1` **Acquire Missing Layers**: Ensure 2+ authors, 3 languages for 16 Samskaras.
- [ ] `SAMSKARAS-DATA-2` **Pipeline Run**: Validate Silver, Promote to Gold, Audit.

### 🏛️ BOOK G: YOGA SUTRAS OF PATANJALI
*Status: Stub Silver. Needs completion.*
- [ ] `YOGA-SUTRAS-DATA-1` **Acquire Missing Layers**: Ensure 2+ authors, 3 languages for Yoga Sutras.
- [ ] `YOGA-SUTRAS-DATA-2` **Pipeline Run**: Validate Silver, Promote to Gold, Audit.

### 🏛️ BOOK H: KENA UPANISHAD
*Status: Stub Silver. Needs completion.*
- [ ] `KENA-DATA-2` **Acquire Missing Layers**: Ensure 2+ authors, 3 languages for Kena Upanishad.
- [ ] `KENA-DATA-3` **Pipeline Run**: Validate Silver, Promote to Gold, Audit.

### 🏛️ BOOK I: ISHA UPANISHAD
*Status: Needs completion of missing verses and commentaries.*
- [ ] `ISHA-DATA-10` **Complete Isha Cycle**: Add 8 missing verses and 2 real commentaries to complete ISHA-CYCLE.

---

## 🧪 PRIORITY 3: VEDIC LABS
*Specialized modules for interactive learning. Many books currently have no labs, which prevents graduation.*

- [ ] `LAB-GITA-004` **Sanyasa Paradox Resolver** (Ch 4, 5) — Map life situation to Krishna's guidance on Karma Yoga vs. pure renunciation.
- [ ] `LAB-GITA-005` **Visvarupa Contemplation Guide** (Ch 11) — Guided progressive revelation using Ch 11 verses.
- [ ] `LAB-GITA-006` **Royal Science Decoder** (Ch 9) — Progressive unlock of 9 secrets Krishna reveals.
- [ ] `LAB-GITA-007` **Jnana Progression Path** (Ch 7) — Map 7 stages of knowing.
- [ ] `LAB-GITA-008` **Purushottama Self-Inquiry** (Ch 15) — Self-assessment of current consciousness level.
- [ ] `LAB-GITA-009` **Dharmic Conflict Resolver — Modern Edition** (Ch 2, 4, 16, 18) — Map modern dilemmas.
- [ ] `LAB-GITA-010` **Verse Guna Analyzer** (Ch 14–17) — Analyze dominant Guna for each verse.
- [ ] `LAB-GARUDA-001` **Garuda Purana Lab**: Create at least one lab app for Garuda Purana to satisfy STD-005.
- [ ] `LAB-SAMSKARA-001` **Samskaras Lab**: Create at least one lab app for Samskaras to satisfy STD-005.

---

## 🌐 PRIORITY 4: LIVE PRODUCTION DEPLOYMENT
- [ ] `DEPLOY-001` Setup Cloudflare Pages / Vercel Edge caching and rate limiting telemetry.
- [ ] `DEPLOY-002` Domain configuration and SSL setup.

---

## 🛑 Pending Human Decision Backlog

- **Data Acquisition Blocked**: Web scraping of `sacred-texts.com` using `scrapling` returns 403s on strict endpoints. Human intervention is required to manually download and drop these source files into the repository so pipeline enrichment can resume.
- **OCR Extraction Logic for Large Texts**: The Nilakantha OCR file (3.7MB) is structurally dense and lacks clear machine-readable verse markers. We need a decision on whether to invest in a custom regex-based segmenter for Nilakantha or prioritize high-quality digital-first sources (like GRETIL).
- **Missing Source Data for Tier 1 Scholars**: Source files for Bal Gangadhar Tilak (Gita Rahasya) and Sri Aurobindo (Essays on the Gita) are missing.
- **Mahabharata Parva 1-3 Alignment**: KMG translation for Parva 1, Adhyaya 1 is currently grouped in verse 0/2 rather than per-verse. A decision is needed on whether to keep preamble-style grouping or manually/AI-split into per-verse layers.
