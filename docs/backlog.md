# 📖 Vishwa-Vani: Global Project Backlog & Strategic Roadmap

---

## 🌌 EPIC-ROADMAP-MASTER-VISION [STRATEGIC ROADMAP]
*The overarching architectural and literary roadmap to fulfill Vishwa-Vani's vision: digitizing, normalizing, and preserving 18 canonical scriptures (~291,000+ verses) across 4 classical languages (Sanskrit, English, Hindi, Marathi) with zero hallucinations and authentic multi-scholar commentary.*

- [ ] **Phase 2: Large-Scale Scripture Expansion & Turso Edge Migration (Target: ~291,000 Verses)**: Deep verse-by-verse expansion across all 18 Parvas of Mahabharata, all 7 Kandas of Ramayana, all 12 Cantos of Bhagavata Purana, and remaining Veda Samhitas. Ingestion of Samarth Ramdas's Dasbodh and Skanda Purana. Decouple storage to Turso LibSQL Edge.
- [ ] **Phase 3: The Four Veda Samhitas & Darshana Philosophy (Target: ~22,000 Mantras / 165 Story Points)**: Ingest metrical Sanskrit and Sayana/Griffith/Dayananda commentary layers for Rigveda, Samaveda, Yajurveda, Atharvaveda, and Badarayana's Brahma Sutras with comparative Advaita/Vishishtadvaita/Dvaita Bhashyas.
- [ ] **Phase 4: Universal Puranic Scale & Vernacular Classics (Target: ~108,000 Verses / 180 Story Points)**: Massive ingestion of Skanda Purana, Samarth Ramdas's Dasbodh (Marathi Ovis), Manusmriti Dharmashastra, 16 Samskaras ritual handbook, and 108 canonical Stotras.
- [ ] **Phase 5: Global AI Brain, Semantic Vectors & Oracle Metal Migration (Target: 70 Story Points)**: Generate 768-dimensional vector embeddings for all 291k+ verses using AirLLM / local transformers. Decouple data layer to Oracle Cloud Always-Free ARM instance (24GB RAM, 200GB storage) for zero-cost perpetual ownership.

---

## 🛡️ EPIC-SECURITY-OWASP-APPSEC [ACTIVE & CRITICAL]
*Comprehensive application security audit and vulnerability mitigation covering OWASP Top 10 Web Application Security Risks and OWASP Top 10 for Large Language Models (LLMs).*

- [ ] `SEC-OWASP-004` **[P2-MEDIUM] Production CSP Hardening & Removal of `'unsafe-eval'` (A05)**: Refactor client-side utilities to eliminate runtime evaluation and remove `'unsafe-eval'` from production Content Security Policy in `next.config.ts`.
- [ ] `SEC-OWASP-006` **[P2-MEDIUM] NPM Audit Supply Chain Vulnerability Mitigation (A06)**: Audit package lockfile to eliminate 32 high-severity transitive vulnerabilities affecting development and test dependencies (`braces`, `micromatch`, `fast-glob`) using npm `overrides` in `package.json`.
- [ ] `SEC-OWASP-007` **[P2-MEDIUM] Bronze Source Cryptographic Provenance (A08)**: Add mandatory SHA-256 integrity checksums to `book.meta.json` for every downloaded bronze source file to guarantee against tampered or corrupted offline data drops.
- [ ] `SEC-OWASP-008` **[P2-MEDIUM] Structured Security Telemetry & Anonymized Audit Logging (A09)**: Replace raw `console.error` in API routes with structured JSON telemetry logging timestamps, hashed IP addresses, route endpoints, status codes, and latency, without leaking PII or secrets.

---

## 🟢 EPIC-BOOK-DASBODH [QUEUED - TIER: BRONZE | SIZE: L | 35 PTS]
*Dasbodh of Samarth Ramdas Swami: 20 Dashakas, 200 Samasas, 7,751 Ovis. Masterpiece of practical spirituality and statecraft.*
*Lead Traditions: Samarth Ramdas Swami, Sakal Ramdasi MSS, Maharashtrian Warkari / Ramdasi scholars.*

- [ ] `DAS-ACQ-001` [Bronze Ingest] Harvest original 17th-century Marathi Ovi text and verified public-domain English translations [10 pts].
- [ ] `DAS-PARSE-001` [Silver Parser] Parse 20 Dashakas and 200 Samasas into NVF 1.3 JSON shards [10 pts].
- [ ] `DAS-LAYER-001` [Gold Commentary] Layer modern Marathi prose Bhavartha, Hindi translation, and English synthesis for each Ovi [10 pts].
- [ ] `DAS-GATE-001` [QA Gate] Execute validation gate, sync to Turso Edge DB, and build Practical Wisdom & Vivek Explorer [5 pts].

---

## 🟢 EPIC-BOOK-SKANDA-PURANA [QUEUED - TIER: BRONZE | SIZE: XXL | 100 PTS]
*Skanda Purana: 7 Khandas (Mahesvara, Vaisnava, Brahma, Kasi, Avanti, Nagara, Prabhasa), ~81,000 Shlokas. The largest of all 18 Puranas.*
*Lead Traditions: G.V. Tagare (English AITM, Motilal Banarsidass), Kashi Khanda scholars.*

- [ ] `SKP-ACQ-001` [Bronze Ingest] Harvest Kashi Khanda and Mahesvara Khanda Sanskrit texts and English translations [20 pts].
- [ ] `SKP-PARSE-001` [Silver Parser] Build streaming chunked parser to extract Kashi Khanda (100 chapters) into NVF shards [25 pts].
- [ ] `SKP-LAYER-001` [Gold Commentary] Layer sacred geography metadata, pilgrimage itineraries, and trilingual verse meanings [35 pts].
- [ ] `SKP-GATE-001` [QA Gate] Validate schema, execute batch Turso sync, and build Interactive Sacred Tirtha Geospatial Map [20 pts].

---

## 🟠 EPIC-USER-INTERFACE-AND-READING-UX [ACTIVE]
*Continuous UX refinement to guarantee responsive breathing room, intuitive discovery, and dignified scholarly presentation.*

- [ ] `UI-READ-003` **Reading Canvas Layout & Responsive Breathing Room Audit**: Continually optimize padding, font sizes (fluid clamp), and card proportions across mobile, tablet, and desktop screens for edge-case viewports.
- [ ] `METRIC-003` **Live Database Verse Verification CLI**: Scheduled job to verify Turso edge database table counts against local manifests and emit automated telemetry alerts on count drift.
- [ ] `LAB-002` **Vedic Labs Category Grouping & Performance Lazy-Loading**: Group the 22+ experimental lab shards by scripture/philosophical school and bundle them into split chunks to maintain blazing-fast sub-second initial route transitions.

---

## 🔵 EPIC-AI-SEMANTIC-SEARCH [BACKGROUND DEV]
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

## 🟣 EPIC-LONG-TERM-ARCHITECTURE [FUTURE]
*Perpetual ownership, zero vendor lock-in, and 200GB storage scaling.*

- [ ] `OCI-001` **Oracle ARM Compute Instance Provisioning**: Setup 4-core Ampere ARM instance with 24GB RAM and 200GB NVMe storage under Oracle Cloud Always Free tier.
- [ ] `OCI-002` **Dockerized PostgreSQL + pgvector Deployment**: Deploy self-hosted relational store capable of holding 291k+ verses and 10GB+ vector embeddings.
- [ ] `OCI-003` **LibSQL/Turso Dump Migration to Native Postgres**: Streamline data pipeline export to native PostgreSQL with sub-millisecond query indexing.
- [ ] `OCI-004` **Lightweight FastAPI / Go Query Gateway**: Replace direct database drivers with an authenticated edge API gateway.
