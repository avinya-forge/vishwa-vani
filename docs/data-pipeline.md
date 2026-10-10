# 🗄️ Vishwa-Vani: Master Data Pipeline & Onboarding Specification

## 1. Executive Mission & Architectural Foundations

Vishwa-Vani's data engineering mission is to systematically digitize, normalize, verify, and democratize humanity's oldest philosophical corpus—encompassing **17 canonical Vedic scriptures**, **over 175,000 sacred verses**, and **centuries of authoritative multi-lineage commentaries** across 4 classical languages: Sanskrit (Devanagari & IAST), English, Hindi, and Marathi.

To eliminate data corruption, hallucinations, and copyright risks, all scriptural onboarding proceeds through a deterministic, strictly gated **5-Stage Lifecycle**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        VISHWA-VANI 5-STAGE SCRIPTURE PIPELINE                          │
└────────────────────────────────────────────────────────────────────────────────────────┘
 [STAGE 1: BRONZE]  ──► Multi-Source Ingestion & Public-Domain Licensing Gate
         │              (GRETIL, Sacred-Texts, SanskritDocuments, BORI, Gita Press)
         ▼
 [STAGE 2: SILVER]  ──► Regex Parsing, Unicode Normalization & NVF 1.3 Structuring
         │              (Devanagari, IAST, Anvaya, Pada boundaries, JSON Shards)
         ▼
 [STAGE 3: GOLD]    ──► Multi-Scholar Commentary Layering & Trilingual Enrichment
         │              (Min 2+ Scholars, EN/HI/MR layers, Zero Placeholders)
         ▼
 [STAGE 4: QA GATE] ──► Schema Validation, Authenticity Audit & Test Verification
         │              (validate_silver.js, audit_gold.js, Jest test runner)
         ▼
 [STAGE 5: EDGE DB] ──► Turso / LibSQL HTTP Batch Synchronization & Reader Gating
                        (sync_turso.js, manifest.json status: GOLD, Dynamic Stats)
```

---

## 2. The 5-Stage Onboarding Lifecycle

### Stage 1: Bronze (Raw Acquisition & Provenance)
* **Goal:** Acquire complete, unedited source texts from vetted public domain or CC-licensed repositories.
* **Storage:** `data/1-bronze/{book-slug}/` or `data/1-bronze/{book-slug}.html/.txt`.
* **Vetted Repositories:**
  - *GRETIL (Göttingen Register of Electronic Texts in Indian Languages):* Machine-readable TEI XML / Roman transliteration.
  - *Sacred-Texts (Internet Sacred Text Archive):* KMG Mahabharata, Max Müller SBE translations.
  - *SanskritDocuments.org / SARIT:* Clean Devanagari digital editions.
  - *BORI (Bhandarkar Oriental Research Institute):* Critical Edition baseline references.
* **Legal Clearance Gate:** Every Bronze acquisition must possess a valid `book.meta.json` recording `source_url`, `public_domain_status`, `publication_date`, and `license_type` (`LEGAL-003`).

### Stage 2: Silver (Structuring & NVF 1.3 Normalization)
* **Goal:** Parse unstructured text into canonical chapters, sections, and verses adhering to the **Normalized Vedic Format (NVF 1.3)** schema.
* **Storage:** `data/2-silver/{book-slug}/{book-slug}-chapter-{n}.json`.
* **Transforms:**
  - Standardize Devanagari punctuation (`।`, `॥`, `१`, `२`).
  - Extract or generate exact IAST diacritical romanization (`ā, ī, ū, ṛ, ṝ, ḷ, ṅ, ñ, ṭ, ḍ, ṇ, ś, ṣ, ḥ, ṁ`).
  - Isolate Pada boundaries and verse numbering.
  - Enforce atomic chapter JSON shards to maintain constant memory during build.

### Stage 3: Gold (Multi-Scholar Enrichment)
* **Goal:** Elevate silver shards to publishable, scholarly excellence.
* **Storage:** `data/3-gold/{book-slug}/{book-slug}-chapter-{n}.json`.
* **Mandatory Criteria:**
  - **Authentic Translation:** Complete Universal English translation for 100% of verses.
  - **Multi-Scholar Depth:** Minimum 2 distinct philosophical lineages (e.g., Advaita vs. Dvaita, Shankara vs. Ramanuja vs. Prabhupada).
  - **Language Coverage:** Hindi and Marathi layers where available in the historical record.
  - **Minimum Content Length:** Every commentary layer must contain $\ge 80$ characters of genuine philosophical synthesis.
  - **Zero Placeholders:** Work-in-progress markers (`[PLACEHOLDER_*]`, `Mock Verse`) are strictly forbidden.

### Stage 4: QA Gate & Certification
* **Tooling:**
  - `node scripts/validate_silver.js {book-slug}`: Schema validator enforcing NVF 1.3 constraints.
  - `node scripts/audit_gold.js {book-slug}`: Verifies 0 placeholders, valid JSON, and length thresholds.
  - `npm test -- --ci`: Automated regression test suite ensuring >=80% coverage on all parsers and loaders.
* **Gate Enforcement:** Promotion to Gold is physically blocked if a single validation check exits non-zero.

### Stage 5: Edge Lake Ingestion & Live Delivery
* **Tooling:**
  - `node scripts/promote_to_gold.js {book-slug}`: Copies verified shards to `data/3-gold/` and updates `data/manifest.json`.
  - `node scripts/sync_turso.js`: Batch-streams Gold JSON records into the remote Turso Edge Database (LibSQL HTTP client) in parameterized chunks.
  - `lib/server-lake.ts`: Automatically exposes the updated verse counts via `getDynamicLibraryStats()`.

---

## 3. NVF 1.3 (Normalized Vedic Format) Schema

Every verse shard in Vishwa-Vani complies with the following structural contract:

```typescript
export interface NVFVerse {
  /** Unique composite identifier: {book}_{chapter}_{verse} */
  id: string;
  /** Canonical scripture slug */
  text_slug: string;
  /** Chapter / Adhyaya / Kanda / Parva number */
  chapter: number;
  /** Verse / Shloka / Mantra / Sutra index */
  verse: number;
  /** Original Sanskrit in Devanagari script */
  original: string;
  /** Academic Roman transliteration with complete diacritics */
  transliteration: string;
  /** Modern primary English translation */
  translation: string;
  /** Philosophical synthesis / core meaning (>= 80 characters) */
  meaning: string;
  /** Multi-Scholar commentary perspectives */
  commentaries: {
    author: string;          // e.g., 'adi-shankara', 'sant-dnyaneshwar', 'prabhupada'
    author_name: string;     // e.g., 'Ādi Śaṅkarācārya', 'Sant Dnyaneshwar'
    language: 'en' | 'hi' | 'mr' | 'sa';
    type: 'bhasya' | 'tika' | 'translation' | 'commentary';
    content: string;         // Detailed exposition (>= 80 characters)
  }[];
  /** Semantic classification & symbolic extraction */
  ai_metadata?: {
    topics?: string[];
    philosophical_concepts?: string[];
    cross_references?: string[];
    sentiment?: 'uplifting' | 'contemplative' | 'instructive';
  };
}
```

---

## 4. Multi-Scholar Lineage Alignment Matrix

To reflect the diversity of Indian philosophy without sectarian bias, each scripture is paired with appropriate historical commentary traditions:

| Philosophical Tradition | Lead Scholars / Lineages | Target Scriptures | Primary Languages |
|:---|:---|:---|:---|
| **Advaita Vedānta** | Ādi Śaṅkarācārya, Madhusūdana Sarasvatī, Śrīdhara Svāmī | Upaniṣads, Gītā, Brahma Sūtras, Bhāgavata Purāṇa | Sanskrit, English, Hindi |
| **Viśiṣṭādvaita Vedānta** | Rāmānujācārya, Vedānta Deśika | Gītā, Upaniṣads, Brahma Sūtras, Viṣṇu Purāṇa | Sanskrit, English, Hindi |
| **Dvaita Vedānta** | Madhvācārya, Jayatīrtha | Gītā, Upaniṣads, Brahma Sūtras, Bhāgavata Purāṇa | Sanskrit, English |
| **Gauḍīya Vaiṣṇavism** | A.C. Bhaktivedanta Swami Prabhupāda, Baladeva Vidyābhūṣaṇa | Gītā, Bhāgavata Purāṇa, Upaniṣads | English, Hindi |
| **Māhārāṣṭra Vārkarī** | Sant Dnyāneśvar, Sant Eknāth, Sant Tukārām | Gītā (Dnyāneśvarī), Bhāgavata Purāṇa (Eknāthī Bhāgavat) | Marathi, English |
| **Vedic Bhasyakaras** | Sāyaṇācārya, Dayānanda Sarasvatī (Ārya Samāj) | Ṛgveda, Sāmaveda, Yajurveda, Atharvaveda | Sanskrit, Hindi, English |
| **Rāmadāsī Sampradāya** | Samarth Rāmdās Svāmī | Dāsbodh, Manāce Śloka | Marathi, Hindi, English |
| **Classical Yoga** | Patañjali, Veda Vyāsa, Swami Vivekānanda | Yoga Sūtras | Sanskrit, English, Hindi |
| **Dharmashastra Tika** | Medhātithi, Kullūka Bhaṭṭa | Manusmṛti | Sanskrit, English |

---

## 5. Effort Estimation Framework & Scripture Sizing Matrix

### Estimation Formula
$$\text{Story Points} = \left( \frac{\text{Verse Count}}{\text{Base Factor}} \right) \times W_{\text{complexity}} + W_{\text{tooling}}$$

Where:
- $\text{Base Factor} = 250\text{ verses / point}$
- $W_{\text{complexity}} \in [1.0, 2.5]$ (dependent on language layers, prose density, and commentary availability)
- $W_{\text{tooling}} = 5\text{ pts}$ (fixed cost for parser scaffolding, schema tests, and lab modules)

### Scripture Inventory & Effort Matrix

| Scripture Slug | Category | Chapters | Total Verses | Target Scholars | Tier | Status | Size | Story Points |
|:---|:---|---:|---:|:---|:---:|:---:|:---:|:---:|
| `bhagavad-gita` | Itihāsa | 18 | 701 | Shankara, Dnyaneshwar, Prabhupada | Gold | Live | S | 15 pts |
| `isha-upanishad` | Upaniṣad | 1 | 19 | Shankara, Aurobindo, Prabhupada | Gold | Live | XS | 5 pts |
| `kena-upanishad` | Upaniṣad | 1 | 34 | Shankara, Max Müller | Gold | Live | XS | 5 pts |
| `yoga-sutras` | Darśana | 4 | 196 | Vyasa, Vivekananda, Patanjali | Gold | Live | S | 10 pts |
| `mahabharata` | Itihāsa | 2,115 | 100,000 | BORI, KMG, Nilakantha | Silver | Active Ingest | XXL | 120 pts |
| `bhagavata-purana` | Purāṇa | 335 | 18,000 | Prabhupada, Sridhara Swami | Silver | Active Ingest | XL | 80 pts |
| `vishnu-purana` | Purāṇa | 126 | 7,000 | Wilson, Gita Press | Silver | Active Ingest | L | 35 pts |
| `garuda-purana` | Purāṇa | 250 | 19,000 | Dutt, Gita Press | Silver | Active Ingest | L | 40 pts |
| `skanda-purana` | Purāṇa | 750 | 81,000 | Tagare, Motilal Banarsidass | Bronze | Queued | XXL | 100 pts |
| `rigveda` | Veda | 10 | 10,552 | Sayana, Griffith, Dayananda | Bronze | Queued | XL | 65 pts |
| `samaveda` | Veda | 2 | 1,875 | Sayana, Griffith | Bronze | Queued | M | 20 pts |
| `yajurveda` | Veda | 40 | 1,975 | Sayana, Griffith, Dayananda | Bronze | Queued | M | 20 pts |
| `atharvaveda` | Veda | 20 | 5,977 | Whitney, Bloomfield | Bronze | Queued | L | 35 pts |
| `brahma-sutras` | Darśana | 4 | 555 | Shankara, Ramanuja, Madhva | Bronze | Queued | M | 25 pts |
| `dasbodh` | Other | 20 | 7,751 | Samarth Ramdas, Warkari | Bronze | Queued | L | 35 pts |
| `manusmriti` | Other | 12 | 2,684 | Medhatithi, Buhler | Bronze | Queued | M | 25 pts |
| `samskaras` | Other | 1 | 24 | Traditional Grihya Sutras | Silver | Active Ingest | S | 10 pts |
| `stotras` | Other | 1 | 17 | Shankara, Valmiki, Traditional | Silver | Active Ingest | S | 10 pts |
| **TOTALS** | **17 Books** | **3,690** | **~267,360** | **15+ Traditions** | — | — | — | **655 pts** |

---

## 6. Zero-Hallucination & Legal Compliance Directives

1. **No AI-Invented Verses:** AI translation or commentary synthesis may only be performed from authenticated Sanskrit root text. The root text must never be generated by LLMs.
2. **Deterministic Shard Slicing:** To maintain sub-second serverless execution and build stability, scripture JSON files are strictly partitioned by chapter (`{book}-chapter-{n}.json`), capped at a maximum uncompressed size of $5\text{ MB}$ per shard.
3. **Public-Domain Verification:** All English translations older than 95 years (published prior to 1929, including SBE, KMG, Griffith, Whitney) are fully verified as public domain in both the US and UK. Newer commentaries are included strictly under fair dealing / academic citation with explicit publisher provenance.