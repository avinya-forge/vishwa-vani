# 📖 Vishwa-Vani: Global Project Backlog & Strategic Roadmap

---

## 🌌 EPIC-ROADMAP-MASTER-VISION [STRATEGIC ROADMAP]
*The overarching architectural and literary roadmap to fulfill Vishwa-Vani's vision: digitizing, normalizing, and preserving 17 sacred scriptures (~267,000+ verses) across 4 classical languages (Sanskrit, English, Hindi, Marathi) with zero hallucinations and authentic multi-scholar commentary.*

- [x] **Phase 1: Gold Core Foundation (4 Canonical Scriptures / 950 Verses)**: Bhagavad Gita (701), Isha Upanishad (19), Kena Upanishad (34), Yoga Sutras (196). Multi-scholar commentary live, zero placeholders, 100% verified unit tests, dynamic navbar statistics.
- [ ] **Phase 2: Itihāsa & Major Purāṇa Scale (Target: ~45,000 Verses / 240 Story Points)**: Complete ingestion of Mahabharata Parvas 1–6 (BORI/KMG), Bhagavata Purana Skandhas 1–3 (Prabhupada/Sridhara Swami), Vishnu Purana (Wilson), and Garuda Purana (Dutt). Decouple storage to Turso LibSQL Edge.
- [ ] **Phase 3: The Four Veda Samhitas & Darshana Philosophy (Target: ~22,000 Mantras / 165 Story Points)**: Ingest metrical Sanskrit and Sayana/Griffith/Dayananda commentary layers for Rigveda, Samaveda, Yajurveda, Atharvaveda, and Badarayana's Brahma Sutras with comparative Advaita/Vishishtadvaita/Dvaita Bhashyas.
- [ ] **Phase 4: Universal Puranic Scale & Vernacular Classics (Target: ~108,000 Verses / 180 Story Points)**: Massive ingestion of Skanda Purana, Samarth Ramdas's Dasbodh (Marathi Ovis), Manusmriti Dharmashastra, 16 Samskaras ritual handbook, and 108 canonical Stotras.
- [ ] **Phase 5: Global AI Brain, Semantic Vectors & Oracle Metal Migration (Target: 70 Story Points)**: Generate 768-dimensional vector embeddings for all 267k+ verses using AirLLM / local transformers. Decouple data layer to Oracle Cloud Always-Free ARM instance (24GB RAM, 200GB storage) for zero-cost perpetual ownership.

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
- [ ] `SEC-OWASP-003` **[P1-HIGH] Cryptographic Key Derivation & Fail-Closed Hardening in `server-lake.ts` (A02)**: Currently, `SECRET_KEY` is derived via `Buffer.from(keySource, 'utf-8').slice(0, 32)`. Standardize on cryptographic key derivation using `crypto.createHash('sha256').update(keySource).digest()` to guarantee a uniform 256-bit key.
- [ ] `SEC-OWASP-004` **[P2-MEDIUM] Production CSP Hardening & Removal of `'unsafe-eval'` (A05)**: Refactor client-side utilities to eliminate runtime evaluation and remove `'unsafe-eval'` from production Content Security Policy in `next.config.ts`.
- [x] `SEC-OWASP-005` **[P1-HIGH] Anti-Scraping Token Bucket & IP Rate Limiting (A04/A07)**: Implemented an in-memory sliding-window token bucket rate limiter in `lib/api-guard.ts` capping requests at 60 req/min per IP with automated expired bucket pruning.
- [ ] `SEC-OWASP-006` **[P2-MEDIUM] NPM Audit Supply Chain Vulnerability Mitigation (A06)**: Audit package lockfile to eliminate 32 high-severity transitive vulnerabilities affecting development and test dependencies (`braces`, `micromatch`, `fast-glob`) using npm `overrides` in `package.json`.
- [ ] `SEC-OWASP-007` **[P2-MEDIUM] Bronze Source Cryptographic Provenance (A08)**: Add mandatory SHA-256 integrity checksums to `book.meta.json` for every downloaded bronze source file to guarantee against tampered or corrupted offline data drops.
- [ ] `SEC-OWASP-008` **[P2-MEDIUM] Structured Security Telemetry & Anonymized Audit Logging (A09)**: Replace raw `console.error` in API routes with structured JSON telemetry logging timestamps, hashed IP addresses, route endpoints, status codes, and latency, without leaking PII or secrets.

### OWASP Top 10 for LLMs
- [x] `SEC-LLM-001` **[P0-CRITICAL] Prompt Injection Defense & Delimiter Hardening in `/api/synthesize` (LLM01)**: Implemented `sanitizeVedicContext()` to strip HTML tags, redact adversarial override keywords (`system prompt`, `ignore previous instructions`), and enclose scripture context in formal `<scripture_context>` boundary fences.
- [x] `SEC-LLM-002` **[P1-HIGH] Model Denial of Service & Token Quota Throttling (LLM04)**: Capped input context length to 1,500 characters and throttled `/api/synthesize` to a maximum of 10 requests per minute per IP via `validateApiRequest()`.
- [ ] `SEC-LLM-003` **[P1-HIGH] System Prompt Isolation & Credential Leakage Defense (LLM02/LLM07)**: Ensure that API error handlers in `/api/synthesize` fail closed and never return internal prompt templates, error stack traces, or environment keys in the HTTP response body.
- [ ] `SEC-LLM-004` **[P2-MEDIUM] Generative UI Output Sanitization (LLM05)**: Pass AI synthesis output through an HTML sanitization filter before rendering in the client study reader to prevent malicious markdown or script execution from unexpected model outputs.
- [ ] `SEC-LLM-005` **[P1-HIGH] Zero-Hallucination Gate & Synthetic Commentary Quarantine (LLM09)**: Enforce an architectural policy that AI models are strictly prohibited from generating root Sanskrit verses or transliterations. Any AI synthesis must be tagged with `synthesisMode: 'generative-gemini'` and displayed with a clear disclaimer badge.

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

## 🟢 EPIC-BOOK-VISHNU-PURANA [ACTIVE - TIER: SILVER | SIZE: L | 35 PTS]
*Vishnu Purana: 6 Amsas, 126 Adhyayas, ~7,000 Shlokas. Canonical model of the classical Mahapuranas.*
*Lead Traditions: H.H. Wilson (English 1840), Sridhara Swami (Atmaprakasa), Gita Press Gorakhpur (Hindi).*
- [ ] `VP-ACQ-001` [Bronze Ingest] Harvest H.H. Wilson complete 6-Amsa translation and GRETIL Devanagari text [5 pts].
- [ ] `VP-PARSE-001` [Silver Parser] Structure all 126 Adhyayas into NVF 1.3 JSON shards in `data/2-silver/vishnu-purana/` [10 pts].
- [ ] `VP-LAYER-001` [Gold Commentary] Layer Sridhara Swami's *Atmaprakasa* insights and Hindi meanings for Amsa 1 & 2 [10 pts].
- [ ] `VP-GATE-001` [QA Gate] Run `node scripts/promote_to_gold.js vishnu-purana` for Amsa 1 (Creation cosmology) [5 pts].
- [ ] `VP-EDGE-001` [Edge Lake Sync] Synchronize Amsa 1 to Turso Edge and update catalog readiness score to 100% [5 pts].

---

## 🟢 EPIC-BOOK-GARUDA-PURANA [ACTIVE - TIER: SILVER | SIZE: L | 40 PTS]
*Garuda Purana: 2 Khandas (Achara & Preta), 250 Adhyayas, ~19,000 Shlokas.*
*Lead Traditions: Manmatha Nath Dutt (English 1908), Gita Press Gorakhpur (Hindi).*
- [ ] `GAR-ACQ-001` [Bronze Ingest] Ingest M.N. Dutt English translation and clean Devanagari Sanskrit text [5 pts].
- [ ] `GAR-PARSE-001` [Silver Parser] Parse Achara Khanda (Dharma, ayurveda, rituals) and Preta Khanda (eschatology) into NVF shards [15 pts].
- [ ] `GAR-LAYER-001` [Gold Commentary] Layer classical scholarly synthesis and Hindi translation for Achara Khanda [10 pts].
- [ ] `GAR-GATE-001` [QA Gate] Execute `node scripts/validate_silver.js garuda-purana` ensuring 0 corrupted strings [5 pts].
- [ ] `GAR-EDGE-001` [Edge Lake Sync] Sync verified Garuda Purana chapters to Turso Edge DB and activate reader [5 pts].

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

## 🟢 EPIC-BOOK-SAMSKARAS [ACTIVE - TIER: SILVER | SIZE: S | 10 PTS]
*16 Samskaras (Ritual Handbook): 16 Life-Cycle Rites from Garbhadhana to Antyeshti. 24 Core Mantras and procedural Vidhis.*
*Lead Traditions: Traditional Grihya Sutras (Ashvalayana, Paraskara, Baudhayana).*
- [ ] `SAMSK-ACQ-001` [Bronze Ingest] Complete acquisition of authentic Vedic Mantras for all 16 life rites [2 pts].
- [ ] `SAMSK-PARSE-001` [Silver Parser] Structure 16 rites with step-by-step procedure guides and Mantra indices in NVF [3 pts].
- [ ] `SAMSK-LAYER-001` [Gold Commentary] Provide authentic Sanskrit Devanagari, English procedure guides, and Marathi Vidhi notes [3 pts].
- [ ] `SAMSK-GATE-001` [QA Gate] Validate schema compliance, sync to Turso Edge, and launch Interactive 16 Samskaras Timeline [2 pts].

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
- [ ] `LIB-002` **Dedicated Full Library Destination Page (`/library`)**: Expand dedicated `/library` browse view with advanced scripture search, filter by tradition (Advaita, Vaishnava, Yoga, etc.), and reading list queues.
- [ ] `ROADMAP-003` **Interactive Diagrammatic Processing Pipeline Visualization**: Render rich interactive SVG / HTML flowcharts for Bronze -> Silver -> Gold tier certification standards with real-time pipeline status checks.
- [ ] `METRIC-003` **Live Database Verse Verification CLI**: Scheduled job to verify Turso edge database table counts against local manifests and emit automated telemetry alerts on count drift.
- [ ] `LAB-002` **Vedic Labs Category Grouping & Performance Lazy-Loading**: Group the 22+ experimental lab shards by scripture/philosophical school and bundle them into split chunks to maintain blazing-fast sub-second initial route transitions.

---

## 🔵 EPIC-AI-BRAIN-AND-SEMANTIC-SEARCH [BACKGROUND DEV]
*Lightweight local AI, symbolic extraction, and semantic vector indexing.*
- [ ] `AI-001` **Vector Search Engine**: Ingest 768-dimensional sentence transformer embeddings (`@xenova/transformers` or local ONNX runtime) across all 950 Gold shlokas to enable cross-scriptural semantic concept search.
- [ ] `AI-002` **Contextual Philosophical Synthesis**: Enhance LLM prompt engineering with zero-shot scholarly delimiters to generate multi-perspective summaries without bias.
- [ ] `AI-003` **Symbolic Concept Mapping**: Automatically extract and link shared philosophical entities (e.g., *Atman*, *Brahman*, *Prakriti*, *Gunas*, *Maya*) across Upanishads, Gita, and Puranas.

---

## 🟣 EPIC-LONG-TERM-ARCHITECTURE (ORACLE METAL) [FUTURE]
*Perpetual ownership, zero vendor lock-in, and 200GB storage scaling.*
- [ ] `OCI-001` **Oracle ARM Compute Instance Provisioning**: Setup 4-core Ampere ARM instance with 24GB RAM and 200GB NVMe storage under Oracle Cloud Always Free tier.
- [ ] `OCI-002` **Dockerized PostgreSQL + pgvector Deployment**: Deploy self-hosted relational store capable of holding 267k+ verses and 10GB+ vector embeddings.
- [ ] `OCI-003` **LibSQL/Turso Dump Migration to Native Postgres**: Streamline data pipeline export to native PostgreSQL with sub-millisecond query indexing.
- [ ] `OCI-004` **Lightweight FastAPI / Go Query Gateway**: Replace direct database drivers with an authenticated edge API gateway.
