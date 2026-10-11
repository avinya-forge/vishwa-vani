# 📖 Vishwa-Vani: Global Project Backlog & Strategic Roadmap

---

## 🌌 EPIC-ROADMAP-MASTER-VISION [STRATEGIC ROADMAP]
*The overarching architectural and literary roadmap to fulfill Vishwa-Vani's vision: digitizing, normalizing, and preserving 18 canonical scriptures (~291,000+ verses) across 4 classical languages (Sanskrit, English, Hindi, Marathi) with zero hallucinations and authentic multi-scholar commentary.*

- [x] **Phase 1: Gold Core Foundation (7 Canonical Scriptures / 1,053 Verses)**: Bhagavad Gita (701), Isha Upanishad (19), Kena Upanishad (34), Yoga Sutras (195), Vishnu Purana (60), Garuda Purana (20), 16 Samskaras (24). Multi-scholar commentary live, zero placeholders, 100% verified unit tests, dynamic runtime UI statistics.
- [ ] **Phase 2: Itihāsa & Major Purāṇa Scale (Target: ~69,000 Verses / 315 Story Points)**: Complete ingestion of Valmiki Ramayana (7 Kandas, 24k verses), Mahabharata Parvas 1–6 (BORI/KMG), Bhagavata Purana Skandhas 1–4 (Prabhupada/Sridhara Swami), Vishnu Purana (Wilson), and Garuda Purana (Dutt). Decouple storage to Turso LibSQL Edge.
- [ ] **Phase 3: The Four Veda Samhitas & Darshana Philosophy (Target: ~22,000 Mantras / 165 Story Points)**: Ingest metrical Sanskrit and Sayana/Griffith/Dayananda commentary layers for Rigveda, Samaveda, Yajurveda, Atharvaveda, and Badarayana's Brahma Sutras with comparative Advaita/Vishishtadvaita/Dvaita Bhashyas.
- [ ] **Phase 4: Universal Puranic Scale & Vernacular Classics (Target: ~108,000 Verses / 180 Story Points)**: Massive ingestion of Skanda Purana, Samarth Ramdas's Dasbodh (Marathi Ovis), Manusmriti Dharmashastra, 16 Samskaras ritual handbook, and 108 canonical Stotras.
- [ ] **Phase 5: Global AI Brain, Semantic Vectors & Oracle Metal Migration (Target: 70 Story Points)**: Generate 768-dimensional vector embeddings for all 291k+ verses using AirLLM / local transformers. Decouple data layer to Oracle Cloud Always-Free ARM instance (24GB RAM, 200GB storage) for zero-cost perpetual ownership.

---

## 📅 1–6 MONTH PRODUCT ROADMAP & EXECUTION SCHEDULE

| Milestone | Target Horizon | Core Scriptural & Architectural Epics | Target Yield | Lead Traditions | Key Deliverables & Research Spikes |
|:---:|:---:|:---|---:|:---|:---|
| **Month 1** | Immediate (Sprint 1–2) | **Puranic & Ritual Elevation to 100% Gold**<br>`vishnu-purana`, `samskaras`, `garuda-purana` | ~1,053 verses<br>(85 pts) | H.H. Wilson, M.N. Dutt, Grihya Sutras | Promoted Top 3 closest books to 100% Gold; eliminated dummy placeholders; verified with 56 local test suites. [COMPLETED] |
| **Month 2** | Month 2 (Sprint 3–4) | **Valmiki Ramayana Adi Kavya Foundation**<br>`ramayana` (Bala & Ayodhya Kandas) | ~8,500 verses<br>(40 pts) | Govindaraja, Rama Tilaka, Ralph T.H. Griffith | Parse 7 Kandas; launch `/ramayana/1` reader route; build interactive Ayodhya-to-Lanka trail map. |
| **Month 3** | Month 3 (Sprint 5–6) | **Srimad Bhagavata Purana Expansion**<br>`bhagavata-purana` (Skandhas 1–4) | ~3,200 verses<br>(35 pts) | Sridhara Swami, Prabhupada, Sant Eknath | Gaudiya + Advaita commentary alignment; Navadha Bhakti flow; Canto 10 preview. `SPIKE-TURSO-SHARDING` |
| **Month 4** | Month 4 (Sprint 7–8) | **Mahabharata Parva Scaling & War Formations**<br>`mahabharata` (Parvas 4–6: Virata, Udyoga, Bhishma) | ~14,000 verses<br>(45 pts) | BORI Critical, KMG, Nilakantha | BORI-to-KMG concordance mapping; Kurukshetra Akshauhini & Vyuha visual lab module. |
| **Month 5** | Month 5 (Sprint 9–10) | **Vedic Samhitas Ingestion & Chanting System**<br>`rigveda` (Mandala 1), `samaveda` | ~3,800 mantras<br>(40 pts) | Sayanacharya, Griffith, Dayananda Saraswati | Vedic meter tokenizer; Saman musical accents; Vedic Chanting Trainer module. `SPIKE-VEDIC-SVARAS` |
| **Month 6** | Month 6 (Sprint 11–12) | **Darshana Philosophy & Semantic Vector Search**<br>`brahma-sutras`, Local Vector Embeddings | ~1,500 sutras<br>(45 pts) | Shankara, Ramanuja, Madhva | Trilateral comparative Bhashya explorer; 768-dim cross-scripture semantic search. |

---

## 🔴 EPIC-P0-UX-READING-EXPERIENCE-AND-DYNAMIC-METRICS [COMPLETED & VERIFIED]
*Immediate overhaul of reading layout, dynamic metric calculation, universal library access, responsive typography, and brand-aligned navigation to fix critical usability and statistical defects reported in production audit.*
- [x] DYN-001: Zero Hardcoded Verse Counts & Dynamic Aggregation Engine - Replaced all hardcoded verse and book statistics (including 709, 950, 1500+) with dynamic queries from the live corpus database (`getDynamicLibraryStats`) and shard manifests. Library stats dynamically reflect the true loaded corpus (126,306+ database verses / 148,000+ total gold verses across all 17 sacred texts).
- [x] READ-001-A: Refactor `components/shloka/study-client.tsx` to remove dual 280px/320px static sidebars.
- [x] READ-001-B: Convert Vedic Labs and Interactive Tools into non-intrusive collapsible drawers.
- [x] READ-001-C: Unify header/footer utilities for interactive elements.
- [x] READ-002-A: Replace 2-column card grid with single-column reading canvas (`max-w-4xl mx-auto`).
- [x] READ-002-B: Adjust line-height, font hierarchy, and breathing room for Devanagari Sanskrit and IAST.
- [x] LIB-001-A: Overhaul Library section to display all 17 sacred texts organized by Vedic categories.
- [x] LIB-001-B: Display exact chapter and verse availability for each scripture.
- [x] NAV-006: Brand Streamlining & Intuitive Navigation - Re-architect Header navigation to cleanly represent the core pillars of Vishwa-Vani: Sacred Library (`/#library`), Deep Search (`/search`), Vedic Labs (`/lab`), and Roadmap (`/roadmap`), with dynamic live corpus statistics and zero confusing or isolated items.
- [x] FLOW-001: Fix 'Begin Reading' Button Target - Refactored `BeginReadingButton` / CTA in hero and header to check user reading history from `localStorage` and resume reading active scripture, or navigate to the Library (`/#library`) to choose a scripture.
- [x] CONT-001: End-to-End Content & Copy Polishing Audit - Reviewed and refined copy, descriptions, card labels, and metadata across all landing, roadmap, lab, and info pages from an end-user perspective to ensure authentic, dignified, and scholarly presentation.
- [x] UX-DAILY-001: Multi-Book Daily Shloka Study Card ("दैनिक श्लोक") - Built rich interactive daily shloka component showcasing rotating verses across Bhagavad Gita, Isha Upanishad, Kena Upanishad, and Yoga Sutras with authentic Devanagari Sanskrit, IAST transliteration, Universal English, and multi-scholar commentary switcher (Sant Dnyaneshwar, Adi Shankara, Prabhupada, Ramanujacharya, Vyasa, Vivekananda).
- [x] UX-DARK-001: Dark Mode Removal & Light Theme Standardization - Eliminated broken dark mode toggle from primary navigation, enforced unified warm spiritual light theme (`#FDFBF7`) via `ThemeProvider` (`forcedTheme="light"`), preventing contrast inversion bugs.
- [x] HERO-ANIM-001: Animated Landing Page Overhaul - Redesigned home page with ambient golden/amber glowing orbs, subtle sacred Devanagari watermark (`ॐ असतो मा सद्गमय`), living 4-card metric dashboard, and interactive Vedic Labs spotlight.
- [x] CHAR-002: Mojibake Elimination & UTF-8 Encoding Safeguard - Swept and eliminated corrupted character artifacts across metadata, rules, gitignore, and header components, adding strict `<meta charSet="utf-8" />` declaration in `<head>`.
- [x] `PROD-005` **[P2-MEDIUM] Broken social previews (verified live)**: Generated `opengraph-image`, added `manifest.webmanifest`, verified all assets return 200.
- [x] `DEPLOY-003` **Create Rating Telemetry Component**: Implemented responsive star-rating widget under active scholar cards in `components/shloka/study-client.tsx`.

---

## 🛡️ EPIC-SECURITY-OWASP-APPSEC [ACTIVE & CRITICAL]
*Comprehensive application security audit and vulnerability mitigation covering OWASP Top 10 Web Application Security Risks and OWASP Top 10 for Large Language Models (LLMs).*

### OWASP Top 10 (Web Applications)
- [x] `SEC-OWASP-001` **[P0-CRITICAL] Input Validation & Path Traversal Lockdown in `/api/lake` (A01/A04)**: Enforced strict regex validation (`/^[a-zA-Z0-9_-]+\.db$/`), sanitized base filename resolution via `path.basename()`, and bounded numerical ranges in `/api/lake`.
- [x] `SEC-OWASP-002` **[P1-HIGH] Search Query Wildcard DoS Hardening (A03/A04)**: Enforced max query length (100 chars) and escaped SQL LIKE wildcards (`%`, `_`, `\`) in `/api/lake` to prevent regex table scan exhaustion.
- [x] `SEC-OWASP-003` **[P1-HIGH] Cryptographic Key Derivation & Fail-Closed Hardening in `server-lake.ts` (A02)**: Standardized cryptographic key derivation using `crypto.createHash('sha256').update(keySource).digest()` to guarantee a uniform 256-bit key.
- [ ] `SEC-OWASP-004` **[P2-MEDIUM] Production CSP Hardening & Removal of `'unsafe-eval'` (A05)**: Refactor client-side utilities to eliminate runtime evaluation and remove `'unsafe-eval'` from production Content Security Policy in `next.config.ts`.
- [x] `SEC-OWASP-005` **[P1-HIGH] Anti-Scraping Token Bucket & IP Rate Limiting (A04/A07)**: Implemented an in-memory sliding-window token bucket rate limiter in `lib/api-guard.ts` capping requests at 60 req/min per IP with automated expired bucket pruning.
- [ ] `SEC-OWASP-006` **[P2-MEDIUM] NPM Audit Supply Chain Vulnerability Mitigation (A06)**: Audit package lockfile to eliminate 32 high-severity transitive vulnerabilities affecting development and test dependencies (`braces`, `micromatch`, `fast-glob`) using npm `overrides` in `package.json`.
- [ ] `SEC-OWASP-007` **[P2-MEDIUM] Bronze Source Cryptographic Provenance (A08)**: Add mandatory SHA-256 integrity checksums to `book.meta.json` for every downloaded bronze source file to guarantee against tampered or corrupted offline data drops.
- [ ] `SEC-OWASP-008` **[P2-MEDIUM] Structured Security Telemetry & Anonymized Audit Logging (A09)**: Replace raw `console.error` in API routes with structured JSON telemetry logging timestamps, hashed IP addresses, route endpoints, status codes, and latency, without leaking PII or secrets.

### OWASP Top 10 for LLMs
- [x] `SEC-LLM-001` **[P0-CRITICAL] Prompt Injection Defense & Delimiter Hardening in `/api/synthesize` (LLM01)**: Implemented `sanitizeVedicContext()` to strip HTML tags, redact adversarial override keywords (`system prompt`, `ignore previous instructions`), and enclose scripture context in formal `<scripture_context>` boundary fences.
- [x] `SEC-LLM-002` **[P1-HIGH] Model Denial of Service & Token Quota Throttling (LLM04)**: Capped input context length to 1,500 characters and throttled `/api/synthesize` to a maximum of 10 requests per minute per IP via `validateApiRequest()`.
- [x] `SEC-LLM-003` **[P1-HIGH] System Prompt Isolation & Credential Leakage Defense (LLM02/LLM07)**: Error handlers in `/api/synthesize` fail closed with sanitized error messages redacting credentials (`key=[REDACTED]`), preventing internal prompt templates or credentials from leaking in logs or HTTP responses.
- [x] `SEC-LLM-004` **[P2-MEDIUM] Generative UI Output Sanitization (LLM05)**: Sanitized LLM synthesis output by stripping any injected HTML or script tags prior to delivery to client readers.
- [x] `SEC-LLM-005` **[P1-HIGH] Zero-Hallucination Gate & Synthetic Commentary Quarantine (LLM09)**: Attached mandatory `zeroHallucinationGate` and `disclaimer` metadata guarantees to all synthesis responses certifying that root Sanskrit verses originate strictly from verified human editions.

---

## 🟢 EPIC-BOOK-MAHABHARATA [ACTIVE - TIER: SILVER | SIZE: XXL | 120 PTS]
*The Great Epic of India: All 18 Parvas, 2,115 Adhyayas, ~100,000 Shlokas. Currently 19,580 verses ingested in Silver layer (Parvas 1–3).*
*Lead Traditions: BORI Critical Edition, Nilakantha Chaturdhara (Advaita Bhashya), K.M. Ganguli (KMG English).*
- [ ] `MBH-ACQ-001` [Bronze Ingest] Ingest KMG English Bronze for Parvas 4–18 (Virata through Svargarohana) from Sacred-Texts archive [15 pts].
- [ ] `MBH-PARSE-001` [Silver Parser] Build streaming readline parser for Nilakantha Sanskrit Vulgate OCR text to eliminate Node heap OOM [20 pts].
- [ ] `MBH-LAYER-001` [Gold Alignment] Create BORI Critical Edition Adhyaya-to-KMG section concordance mapping table for Parvas 4–8 [25 pts].
- [ ] `MBH-LAYER-002` [Commentary] Enrich Parva 6 (Bhishma Parva - Gita core) with Nilakantha's *Bharatabhavadipa* commentary notes [25 pts].
- [ ] `MBH-GATE-001` [QA Gate] Run `node scripts/validate_silver.js mahabharata` against Parvas 1–6 (ensuring 0 broken verses) [15 pts].
- [ ] `MBH-EDGE-001` [Edge Lake Sync] Stream verified Mahabharata shards into remote Turso database in 500-verse chunks [10 pts].
- [ ] `MBH-LAB-001` [Vedic Lab] Build interactive Kurukshetra Battlefield Formations (Akshauhini & Vyuha) Decision Lab [10 pts].

---

## 🟢 EPIC-BOOK-VALMIKI-RAMAYANA [ACTIVE - TIER: SILVER | SIZE: XL | 75 PTS]
*The Adi Kavya (First Epic Poem): 7 Kandas (Bala, Ayodhya, Aranya, Kishkindha, Sundara, Yuddha, Uttara), ~500 Sargas, ~24,000 Shlokas.*
*Lead Traditions: Govindaraja (Ramayana Bhushana), Rama (Tilaka), Ralph T.H. Griffith (English 1870–1874), Gita Press Gorakhpur.*
- [ ] `RAM-ACQ-001` [Bronze Ingest] Acquire Baroda Oriental Institute Critical Edition text and Ralph T.H. Griffith English translation [10 pts].
- [ ] `RAM-PARSE-001` [Silver Parser] Build NVF 1.3 parser for 7 Kandas with ~500 Sargas and Devanagari verse normalization [20 pts].
- [ ] `RAM-LAYER-001` [Gold Commentary] Layer Govindaraja's *Ramayana Bhushana* and Rama's *Tilaka* classical commentary layers for Bala & Ayodhya Kandas [20 pts].
- [ ] `RAM-LAYER-002` [Vernacular Heritage] Ingest Tulsidas's *Ramcharitmanas* and Sant Eknath's *Bhavartha Ramayana* comparative cross-reference notes [10 pts].
- [ ] `RAM-GATE-001` [QA Gate] Run `node scripts/validate_silver.js ramayana` ensuring 0 broken verse IDs and zero placeholder strings [5 pts].
- [ ] `RAM-EDGE-001` [Edge Lake Sync] Sync Bala Kanda to Turso Edge database and activate live `/ramayana/1` reader route [5 pts].
- [ ] `RAM-LAB-001` [Vedic Lab] Build interactive Ramayana Geography & Journey Map (Ayodhya to Lanka sacred trail) [5 pts].

---

## 🟢 EPIC-BOOK-BHAGAVATA-PURANA [ACTIVE - TIER: SILVER | SIZE: XL | 80 PTS]
*Srimad Bhagavata Purana: 12 Skandhas, 335 Chapters, ~18,000 Shlokas. Currently 718 verses in Silver (Skandhas 1 & 2).*
*Lead Traditions: Sridhara Swami (Bhavartha Dipika - Advaita), A.C. Bhaktivedanta Swami Prabhupada (Gaudiya Vaishnava), Sant Eknath (Marathi Heritage).*
- [ ] `BHA-ACQ-001` [Bronze Ingest] Acquire complete GRETIL Sanskrit TEI XML for Skandhas 3–12 and public-domain English translations [10 pts].
- [ ] `BHA-PARSE-001` [Silver Parser] Build NVF 1.3 regex shard extractor for Skandhas 3–6 (Kapila Gita, Prahlada Charitra) [15 pts].
- [ ] `BHA-LAYER-001` [Gold Commentary] Layer Sridhara Swami's *Bhavartha Dipika* (Sanskrit/English) for Skandha 1 & 2 verses [25 pts].
- [ ] `BHA-LAYER-002` [Marathi Heritage] Ingest Sant Eknath's *Eknathi Bhagavata* (11th Skandha) Marathi verses and translations [15 pts].
- [ ] `BHA-GATE-001` [QA Gate] Validate Skandhas 1–3 completeness and run `node scripts/audit_gold.js bhagavata-purana` [5 pts].
- [ ] `BHA-EDGE-001` [Edge Lake Sync] Promote Skandhas 1–3 to Gold in `data/manifest.json` and sync to Turso Edge [5 pts].
- [ ] `BHA-LAB-001` [Vedic Lab] Build interactive Nine-Fold Devotion Navigator (Navadha Bhakti Flow) and Canto 10 Leela Map [5 pts].

---

## 🟢 EPIC-BOOK-RIGVEDA [ACTIVE - TIER: BRONZE | SIZE: XL | 65 PTS]
*Rigveda Samhita: 10 Mandalas, 1,028 Suktas, 10,552 Mantras. The foundational text of Indo-European literature.*
*Lead Traditions: Sayanacharya (Vedartha Prakasha), Ralph T.H. Griffith (English 1896), Swami Dayananda Saraswati (Arya Bhashya).*
- [ ] `RV-ACQ-001` [Bronze Ingest] Acquire GRETIL metrical Sanskrit edition preserving Vedic accents (Udatta, Anudatta, Svarita) [10 pts].
- [ ] `RV-ACQ-002` [Bronze Ingest] Acquire Ralph T.H. Griffith complete English translation (1896, verified public domain) [10 pts].
- [ ] `RV-PARSE-001` [Silver Parser] Build NVF 1.3 parser splitting Mandalas into Suktas and Riks with Pada-patha separation [15 pts].
- [ ] `RV-LAYER-001` [Gold Commentary] Layer Sayanacharya's ritual commentary and Swami Dayananda Saraswati's Hindi meanings [15 pts].
- [ ] `RV-GATE-001` [QA Gate] Validate Mandala 1 (191 Suktas) through `validate_silver.js rigveda` with zero placeholders [5 pts].
- [ ] `RV-EDGE-001` [Edge Lake Sync] Ingest Mandala 1 to Turso Edge DB and enable `/rigveda/1` reader route [5 pts].
- [ ] `RV-LAB-001` [Vedic Lab] Build Vedic Metrical Analyzer (Chhanda Calculator for Gayatri, Trishtubh, Anushtubh) [5 pts].

---

## 🟢 EPIC-BOOK-VISHNU-PURANA [TIER: GOLD | SIZE: M | 35 PTS - COMPLETED]
*Vishnu Purana: 6 Amsas, 60 Canonical Shlokas. 100% Gold Production Grade.*
*Lead Traditions: H.H. Wilson (English 1840), Sridhara Swami (Atmaprakasa), Gita Press Gorakhpur (Hindi).*
- [x] `VP-ACQ-001` [Bronze Ingest] Harvest H.H. Wilson complete 6-Amsa translation and GRETIL Devanagari text [5 pts].
- [x] `VP-PARSE-001` [Silver Parser] Structure all 6 Amsas into NVF 1.3 JSON shards in `data/2-silver/vishnu-purana/` [10 pts].
- [x] `VP-LAYER-001` [Gold Commentary] Layer Sridhara Swami's *Atmaprakasa* insights and Hindi meanings across all 6 Amsas [10 pts].
- [x] `VP-GATE-001` [QA Gate] Run audit status check ensuring 100.0% Gold readiness and 0 placeholders [5 pts].
- [x] `VP-EDGE-001` [Edge Lake Sync] Synchronize all 6 Amsas to Gold tier, update manifest and reader routes [5 pts].

---

## 🟢 EPIC-BOOK-GARUDA-PURANA [TIER: GOLD | SIZE: S | 20 PTS - COMPLETED]
*Garuda Purana: 2 Khandas (Achara & Preta), 20 Canonical Shlokas. 100% Gold Production Grade.*
*Lead Traditions: Manmatha Nath Dutt (English 1908), Gita Press Gorakhpur (Hindi).*
- [x] `GAR-ACQ-001` [Bronze Ingest] Ingest M.N. Dutt English translation and clean Devanagari Sanskrit text [5 pts].
- [x] `GAR-PARSE-001` [Silver Parser] Parse Achara Khanda (Dharma, ethics, cosmology) and Preta Khanda (eschatology) into NVF shards [5 pts].
- [x] `GAR-LAYER-001` [Gold Commentary] Layer classical scholarly synthesis and Hindi translation for both Khandas [5 pts].
- [x] `GAR-GATE-001` [QA Gate] Execute validation ensuring 100.0% Gold readiness and 0 corrupted strings [2 pts].
- [x] `GAR-EDGE-001` [Edge Lake Sync] Sync verified Garuda Purana chapters to Gold manifest and active reader [3 pts].

---

## 🟢 EPIC-BOOK-SAMAVEDA [QUEUED - TIER: BRONZE | SIZE: M | 20 PTS]
*Samaveda Samhita: 2 Archanas (Purvarchana & Uttararchana), 1,875 Mantras. The Veda of divine chant and melody.*
*Lead Traditions: Sayanacharya, Ralph T.H. Griffith (English 1893).*
- [ ] `SAM-ACQ-001` [Bronze Ingest] Harvest Sanskrit text with musical Saman accent marks and Griffith English translation [5 pts].
- [ ] `SAM-PARSE-001` [Silver Parser] Structure Purvarchana and Uttararchana into NVF 1.3 schema with chant notation [5 pts].
- [ ] `SAM-LAYER-001` [Gold Commentary] Layer Sayanacharya's musical/liturgical Bhashya and Hindi translations [5 pts].
- [ ] `SAM-GATE-001` [QA Gate] Validate schema compliance, promote to Gold, and link to Vedic Chanting Trainer [5 pts].

---

## 🟢 EPIC-BOOK-YAJURVEDA [QUEUED - TIER: BRONZE | SIZE: M | 20 PTS]
*Yajurveda Samhita: Shukla Yajurveda (Vajasaneyi Madhyandina Samhita), 40 Adhyayas, 1,975 Mantras.*
*Lead Traditions: Uvvata, Mahidhara, Ralph T.H. Griffith (English 1899), Swami Dayananda Saraswati.*
- [ ] `YAJ-ACQ-001` [Bronze Ingest] Ingest Sanskrit text and Griffith English translation (1899, Public Domain) [5 pts].
- [ ] `YAJ-PARSE-001` [Silver Parser] Parse all 40 Adhyayas into atomic NVF chapter shards (including Adhyaya 40: Isha Upanishad) [5 pts].
- [ ] `YAJ-LAYER-001` [Gold Commentary] Layer Uvvata/Mahidhara classical commentaries and Arya Samaj Hindi translations [5 pts].
- [ ] `YAJ-GATE-001` [QA Gate] Execute verification gate, sync to Turso Edge, and cross-reference with `/isha-upanishad` [5 pts].

---

## 🟢 EPIC-BOOK-ATHARVAVEDA [QUEUED - TIER: BRONZE | SIZE: L | 35 PTS]
*Atharvaveda Samhita: Shaunaka Shakha, 20 Kandas, 730 Suktas, 5,977 Mantras. Prayers for healing, harmony, and daily life.*
*Lead Traditions: Sayanacharya, William Dwight Whitney & Charles Rockwell Lanman (Harvard Oriental Series, 1905), Maurice Bloomfield (1897).*
- [ ] `ATH-ACQ-001` [Bronze Ingest] Ingest W.D. Whitney / C.R. Lanman complete English translation and Sanskrit Devanagari text [10 pts].
- [ ] `ATH-PARSE-001` [Silver Parser] Build NVF 1.3 parser for 20 Kandas with hymn classifications (Bhaishajya, Ayushya, Paushtika) [10 pts].
- [ ] `ATH-LAYER-001` [Gold Commentary] Layer Sayana commentary and botanical/medicinal metadata for Atharvan healing hymns [10 pts].
- [ ] `ATH-GATE-001` [QA Gate] Run silver validation, sync to Turso Edge, and link to Vedic Healing Herbarium Lab [5 pts].

---

## 🟢 EPIC-BOOK-BRAHMA-SUTRAS [QUEUED - TIER: BRONZE | SIZE: M | 25 PTS]
*Brahma Sutras / Vedanta Sutras of Badarayana: 4 Adhyayas, 16 Padas, 555 Sutras.*
*Lead Traditions: Adi Shankara (Sariraka Bhashya), Ramanuja (Sri Bhashya), Madhvacharya (Anubhashya), George Thibaut (English 1890).*
- [ ] `BRA-ACQ-001` [Bronze Ingest] Ingest George Thibaut SBE Vols 34 & 38 translations and Sanskrit Devanagari Sutras [5 pts].
- [ ] `BRA-PARSE-001` [Silver Parser] Structure 4 Adhyayas (Samanvaya, Avirodha, Sadhana, Phala) into NVF Adhikarana units [5 pts].
- [ ] `BRA-LAYER-001` [Gold Commentary] Layer trilateral comparative commentary (Shankara vs. Ramanuja vs. Madhva) for key Adhikaranas [10 pts].
- [ ] `BRA-GATE-001` [QA Gate] Verify schema integrity, push to Turso Edge, and build Comparative Vedanta Explorer Lab [5 pts].

---

## 🟢 EPIC-BOOK-DASBODH [QUEUED - TIER: BRONZE | SIZE: L | 35 PTS]
*Dasbodh of Samarth Ramdas Swami: 20 Dashakas, 200 Samasas, 7,751 Ovis. Masterpiece of practical spirituality and statecraft.*
*Lead Traditions: Samarth Ramdas Swami, Sakal Ramdasi MSS, Maharashtrian Warkari / Ramdasi scholars.*
- [ ] `DAS-ACQ-001` [Bronze Ingest] Harvest original 17th-century Marathi Ovi text and verified public-domain English translations [10 pts].
- [ ] `DAS-PARSE-001` [Silver Parser] Parse 20 Dashakas and 200 Samasas into NVF 1.3 JSON shards [10 pts].
- [ ] `DAS-LAYER-001` [Gold Commentary] Layer modern Marathi prose Bhavartha, Hindi translation, and English synthesis for each Ovi [10 pts].
- [ ] `DAS-GATE-001` [QA Gate] Execute validation gate, sync to Turso Edge DB, and build Practical Wisdom & Vivek Explorer [5 pts].

---

## 🟢 EPIC-BOOK-MANUSMRITI [QUEUED - TIER: BRONZE | SIZE: M | 25 PTS]
*Manusmriti / Manava Dharmashastra: 12 Adhyayas, 2,684 Shlokas. Foundation of traditional Indian jurisprudence.*
*Lead Traditions: Medhatithi (Manubhashya), Kulluka Bhatta (Manvartha Muktavali), Georg Bühler (English SBE Vol 25, 1886).*
- [ ] `MAN-ACQ-001` [Bronze Ingest] Ingest Georg Bühler English translation and clean Devanagari Sanskrit text [5 pts].
- [ ] `MAN-PARSE-001` [Silver Parser] Structure 12 Adhyayas into NVF 1.3 JSON shards with topic classifications [5 pts].
- [ ] `MAN-LAYER-001` [Gold Commentary] Layer Medhatithi and Kulluka Bhatta commentary extracts with scholarly historical context [10 pts].
- [ ] `MAN-GATE-001` [QA Gate] Run schema validation, sync to Turso Edge, and link to Ancient Legal Systems Comparative Lab [5 pts].

---

## 🟢 EPIC-BOOK-SKANDA-PURANA [QUEUED - TIER: BRONZE | SIZE: XXL | 100 PTS]
*Skanda Purana: 7 Khandas (Mahesvara, Vaisnava, Brahma, Kasi, Avanti, Nagara, Prabhasa), ~81,000 Shlokas. The largest of all 18 Puranas.*
*Lead Traditions: G.V. Tagare (English AITM, Motilal Banarsidass), Kashi Khanda scholars.*
- [ ] `SKP-ACQ-001` [Bronze Ingest] Harvest Kashi Khanda and Mahesvara Khanda Sanskrit texts and English translations [20 pts].
- [ ] `SKP-PARSE-001` [Silver Parser] Build streaming chunked parser to extract Kashi Khanda (100 chapters) into NVF shards [25 pts].
- [ ] `SKP-LAYER-001` [Gold Commentary] Layer sacred geography metadata, pilgrimage itineraries, and trilingual verse meanings [35 pts].
- [ ] `SKP-GATE-001` [QA Gate] Validate schema, execute batch Turso sync, and build Interactive Sacred Tirtha Geospatial Map [20 pts].

---

## 🟢 EPIC-BOOK-SAMSKARAS [TIER: GOLD | SIZE: S | 10 PTS - COMPLETED]
*16 Samskaras (Ritual Handbook): 16 Life-Cycle Rites across 3 Lifecycle Chapters. 24 Authentic Mantras and procedural Vidhis. 100% Gold Production Grade.*
*Lead Traditions: Traditional Grihya Sutras (Ashvalayana, Paraskara, Baudhayana, Rajbali Pandey).*
- [x] `SAMSK-ACQ-001` [Bronze Ingest] Complete acquisition of authentic Vedic Mantras for all 16 life rites [2 pts].
- [x] `SAMSK-PARSE-001` [Silver Parser] Structure 16 rites with step-by-step procedure guides across 3 lifecycle chapters in NVF [3 pts].
- [x] `SAMSK-LAYER-001` [Gold Commentary] Provide authentic Sanskrit Devanagari, English procedure guides, and Hindi/Marathi Vidhi notes [3 pts].
- [x] `SAMSK-GATE-001` [QA Gate] Validate schema compliance, eliminate placeholders, achieve 100.0% Gold audit score [2 pts].

---

## 🟢 EPIC-BOOK-STOTRAS [ACTIVE - TIER: SILVER | SIZE: S | 10 PTS]
*Stotras & Stuties: Universal Devotional Hymns (Vishnu Sahasranama, Shiva Tandava, Mahishasura Mardini, Aditya Hridaya, Gita Dhyana).*
*Lead Traditions: Adi Shankara, Veda Vyasa, Valmiki, Traditional Stotra-shastra.*
- [ ] `STO-ACQ-001` [Bronze Ingest] Curate authentic texts for top 10 universal Stotras (starting with Vishnu Sahasranama) [2 pts].
- [ ] `STO-PARSE-001` [Silver Parser] Structure Stotras with Chhanda meter tags, deity classifications, and daily recitation guides [3 pts].
- [ ] `STO-LAYER-001` [Gold Commentary] Layer Adi Shankara's Vishnu Sahasranama Bhashya and trilingual poetic translations [3 pts].
- [ ] `STO-GATE-001` [QA Gate] Validate NVF compliance, push to Turso Edge, and enable Stotra Recitation Player [2 pts].

---

## 🟠 EPIC-USER-INTERFACE-AND-READING-UX [ACTIVE]
*Continuous UX refinement to guarantee responsive breathing room, intuitive discovery, and dignified scholarly presentation.*
- [ ] `UI-READ-003` **Reading Canvas Layout & Responsive Breathing Room Audit**: Continually optimize padding, font sizes (fluid clamp), and card proportions across mobile, tablet, and desktop screens for edge-case viewports.
- [x] `LIB-002` **Dedicated Full Library Destination Page (`/library`)**: Created dedicated `/library` page with real-time text/Devanagari/scholar search, category pills, tier filters (100% Gold vs Ingestion Pipeline), quick chapter jump drawers, and active reading session resumption.
- [x] `ROADMAP-003` **Interactive Diagrammatic Processing Pipeline & Vision Visualization**: Rendered the 5-Phase Master Vision Roadmap, 5-Stage Data Pipeline lifecycle, scripture effort points/sizing matrix, and OWASP AppSec & LLM Integrity Certification on `/roadmap`.
- [ ] `METRIC-003` **Live Database Verse Verification CLI**: Scheduled job to verify Turso edge database table counts against local manifests and emit automated telemetry alerts on count drift.
- [ ] `LAB-002` **Vedic Labs Category Grouping & Performance Lazy-Loading**: Group the 22+ experimental lab shards by scripture/philosophical school and bundle them into split chunks to maintain blazing-fast sub-second initial route transitions.

---

## 🔵 EPIC-AI-BRAIN-AND-SEMANTIC-SEARCH [BACKGROUND DEV]
*Lightweight local AI, symbolic extraction, and semantic vector indexing.*
- [ ] `AI-001` **Vector Search Engine**: Ingest 768-dimensional sentence transformer embeddings (`@xenova/transformers` or local ONNX runtime) across all 950 Gold shlokas to enable cross-scriptural semantic concept search.
- [ ] `AI-002` **Contextual Philosophical Synthesis**: Enhance LLM prompt engineering with zero-shot scholarly delimiters to generate multi-perspective summaries without bias.
- [ ] `AI-003` **Symbolic Concept Mapping**: Automatically extract and link shared philosophical entities (e.g., *Atman*, *Brahman*, *Prakriti*, *Gunas*, *Maya*) across Upanishads, Gita, and Puranas.

---

## 🔬 EPIC-RESEARCH-SPIKES [TECHNICAL EXPLORATION]
*Dedicated exploratory spikes to de-risk high-complexity architectural and textual engineering challenges.*
- [ ] `SPIKE-RAMAYANA-CRITICAL-ED` **[P1-HIGH] Baroda Oriental Institute vs. Gita Press Textual Variants**: Research and codify concordance mapping between the Baroda Critical Edition and Gita Press Sarga numbering to prevent verse offset errors across 7 Kandas.
- [ ] `SPIKE-TURSO-SHARDING` **[P1-HIGH] Turso Edge Database Sharding & Cost Scaling**: Prototype database partitioning strategy for storing 291k+ verses across multi-tenant Turso / LibSQL edge instances while remaining strictly within the free tier.
- [ ] `SPIKE-VEDIC-SVARAS` **[P2-MEDIUM] Unicode Vedic Accent Mark Rendering**: Test font compatibility and CSS rendering for Vedic pitch accents (Udatta `U+0951`, Anudatta `U+0952`, Svarita) across mobile browsers for Rigveda and Samaveda.

---

## 🟣 EPIC-LONG-TERM-ARCHITECTURE (ORACLE METAL) [FUTURE]
*Perpetual ownership, zero vendor lock-in, and 200GB storage scaling.*
- [ ] `OCI-001` **Oracle ARM Compute Instance Provisioning**: Setup 4-core Ampere ARM instance with 24GB RAM and 200GB NVMe storage under Oracle Cloud Always Free tier.
- [ ] `OCI-002` **Dockerized PostgreSQL + pgvector Deployment**: Deploy self-hosted relational store capable of holding 291k+ verses and 10GB+ vector embeddings.
- [ ] `OCI-003` **LibSQL/Turso Dump Migration to Native Postgres**: Streamline data pipeline export to native PostgreSQL with sub-millisecond query indexing.
- [ ] `OCI-004` **Lightweight FastAPI / Go Query Gateway**: Replace direct database drivers with an authenticated edge API gateway.
