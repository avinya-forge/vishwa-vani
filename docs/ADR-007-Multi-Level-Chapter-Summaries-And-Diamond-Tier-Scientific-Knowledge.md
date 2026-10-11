# ADR-007: Architecture for Multi-Level Chapter Summaries & Diamond Tier (💎) Scientific Knowledge Extraction

- **Status**: Accepted
- **Date**: 2026-10-11
- **Deciders**: Solution Architect, Lead Implementer, Vedic Knowledge Lead, AI Agent Engineer
- **Related ADRs**:
  - [ADR-005: Local LLM Conversational Search & Server Load Architecture](file:///d:/Code/avinya-forge/vishwa-vani/docs/ADR-005-Local-LLM-Conversational-Search-And-Server-Load.md)
  - [ADR-006: 1-Hour Speed Reader (Tattva Saṁgraha) & Pre-Computed Distillation](file:///d:/Code/avinya-forge/vishwa-vani/docs/ADR-006-One-Hour-Speed-Reader-Tattva-Samgraha.md)

---

## 1. Context & Problem Statement

Users and scholars have highlighted critical nuances in the reading and knowledge extraction pipeline:
1. **The Inadequacy of a Fixed "1-Hour" Benchmark**:
   - A rigid 1-hour target fails for scriptures of vastly different magnitudes:
     - Small texts like *Māṇḍūkya Upaniṣad* (12 mantras) or *Īśā Upaniṣad* (18 mantras) can be absorbed deeply in 10–15 minutes.
     - Medium texts like *Bhagavad Gītā* (701 verses) require 45–60 minutes for an executive digest, but 2–3 hours for chapter-wise study.
     - Massive epics like *Mahābhārata* (100,000 verses) or *Śrīmad Bhāgavata Purāṇa* (18,000 verses) cannot be covered in 1 hour without superficial truncation.
   - **Requirement**: Eliminate arbitrary hardcoded reading times; dynamically compute estimated reading times based on word count and standard reading speeds (~200 words per minute).
2. **Need for Chapter-Wise Comprehensive Coverage**:
   - Readers cannot afford to "miss out on anything." Each book must offer a **chapter-by-chapter summary** detailing:
     - Topics Introduced & Context
     - Core Dialectic / Debates
     - Philosophical Conclusions
     - Multi-Scholar Synthesis (comparing Shankara, Ramanuja, Madhva, Prabhupada, Dnyaneshwar)
     - Core Anchor Verses with Word Meanings.
3. **Multi-Tier Granularity Demand**:
   - Different user personas require different depths:
     - Commuters / Rapid Learners: **Very Short** (1–3 min high-impact takeaways).
     - Seekers / Students: **Short** (10–25 min executive overview).
     - Deep Practitioners: **Long** (45–75 min chapter-wise detailed exegesis).
     - Researchers / Academics: **Very Long** (comprehensive philosophical & textual breakdown).
4. **Scientific & Empirical Vedic Knowledge Extraction**:
   - Ancient Indian canonical scriptures contain precise observations of the natural world:
     - **Archaeoastronomy & Astronomy (*Khagola*)**: Planetary configurations, Nakshatra conjunctions, eclipse sequences, solstices (Uttarayana/Dakshinayana), cosmological distance scales.
     - **Ayurveda & Human Physiology (*Śārīra & Cikitsā*)**: Tridosha constitution (Vata, Pitta, Kapha), disease etiology (Nidana), dietary energetics (Guna-based nutrition), psychophysiological therapies.
     - **Cognitive Psychology (*Manovijñāna*)**: Citta Vrittis, Kleshas, mental equanimity, neurological stages of meditation (Kshipta to Nirodha).
     - **Physics & Cosmology (*Padārtha Vijñāna*)**: Atomic theory (Paramanu), Pancha Mahabhutas, Tanmatras, cosmic cycles (Nimesha to Kalpa).
   - **Requirement**: Extract these structured empirical facts into a cross-scriptural knowledge graph rather than leaving them buried inside verse commentaries.

---

## 2. Decision: 4-Tier Granularity Summaries & The Diamond Tier (💎)

### A. Dynamic Multi-Granularity Architecture

We reject both fixed single-level summaries and runtime LLM generation for base summaries:
- **Feasibility Evaluation**:
  | Strategy | Latency | Server Load / Memory | Consistency | User Flexibility |
  |---|---|---|---|---|
  | **Runtime LLM Generation** | Poor (15–40s) | High risk of OOM / Serverless timeout | Non-deterministic, hallucination risk | High prompt control |
  | **Fixed Single Summary** | Instant (<10ms) | Zero server load | 100% verified | Rigid, one-size-fits-none |
  | **Pre-Computed 4-Tier Granularity (Chosen)** | **Instant (<10ms)** | **Zero server load** | **100% verified by scholars** | **Full user control (Very Short → Very Long)** |

#### The 4 Granularity Levels (`SummaryGranularity`):
1. **Very Short (`very_short`) — "Sūtra Essence"**:
   - 1 core sentence or aphorism per chapter.
   - Dynamic Read Time: 1–3 minutes per text.
2. **Short (`short`) — "Tattva Saṁgraha"**:
   - 3 bullet points per chapter: Topic, Crisis/Dilemma, Resolution.
   - 1 anchor signpost verse per chapter.
   - Dynamic Read Time: 8–20 minutes per text.
3. **Long (`long`) — "Adhyāya Vivaraṇa"**:
   - Comprehensive section-by-section breakdown of every chapter.
   - Trilateral scholar synthesis (Advaita vs. Vishishtadvaita vs. Dvaita vs. Achintya Bhedabheda).
   - Dynamic Read Time: 35–70 minutes per text.
4. **Very Long (`very_long`) — "Śāstra Mahā-Bodh"**:
   - Exhaustive thematic exegesis covering all Adhikaranas, objections (Purvapaksha), rebuttals (Siddhanta), and practical daily Sadhana protocols.
   - Dynamic Read Time: 90–180+ minutes per text.

#### Dynamic Reading Time Computation Engine
```typescript
export function calculateReadingTime(text: string, wpm = 200): number {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / wpm))
}
```

---

### B. The 4-Tier Scriptural Lifecycle (Introducing Diamond Tier 💎)

We expand Vishwa-Vani's data processing pipeline from a 3-tier to a **4-tier lifecycle**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   VISHWA-VANI 4-TIER DATA PIPELINE                      │
└────────────────────────────────────────────────────────────────────────┘
 [1. BRONZE]  ──► Raw text harvesting (OCR, MSS, Archive scrapes)
       │
       ▼
 [2. SILVER]  ──► NVF 1.3 schema normalization (Devanagari, IAST, basic English)
       │
       ▼
 [3. GOLD]    ──► 100% complete: authentic Sanskrit + multi-lineage commentaries
       │
       ▼
 [4. DIAMOND 💎] ──► Scientific knowledge extraction + 4-tier chapter summaries +
                     cross-scriptural knowledge graph linking Astronomy, Ayurveda,
                     Psychology, and Cosmology.
```

#### Diamond Tier Criteria:
1. **Multi-Granularity Chapter Summaries**: Complete coverage across all 4 tiers (`very_short`, `short`, `long`, `very_long`) covering 100% of chapters.
2. **Empirical Knowledge Graph (EKT)**: All passages describing astronomical alignments, ayurvedic remedies, botanical references, psychology, and cosmology extracted as structured, cited **Empirical Knowledge Tokens (EKTs)**.
3. **Multi-Commentary Alignment**: Explicit side-by-side reconciliation of classical commentaries (Adi Shankara, Ramanuja, Madhva, Sant Dnyaneshwar, Sridhara Swami, Prabhupada).

---

## 3. Data Schemas

### A. Multi-Tier Chapter Summary Schema
```typescript
export interface ChapterSummaryTier {
  veryShort: string // 1-2 sentence core aphorism
  short: {
    topics: string[]
    coreDilemma: string
    philosophicalResolution: string
    anchorVerse: {
      chapter: number
      verse: number
      sanskrit: string
      translation: string
      deepDiveUrl: string
    }
  }
  long: {
    overview: string
    thematicSections: {
      sectionTitle: string
      verseRange: string
      discussion: string
    }[]
    scholarPerspectives: {
      tradition: string // Advaita, Vishishtadvaita, Dvaita, Gaudiya, etc.
      keyInsight: string
    }[]
    conclusions: string[]
  }
  veryLong: {
    purvapaksha: string[] // Counter-arguments and doubts raised
    siddhanta: string[]   // Definite conclusions established
    sadhanaInstructions: string[] // Actionable spiritual disciplines
    etymologicalNotes: string[]   // Key Sanskrit technical terms analyzed
  }
}
```

### B. Empirical Knowledge Token (EKT) Schema
```typescript
export type ScientificDomain = 
  | 'astronomy'      // Khagola & Archaeoastronomy (Nakshatras, eclipses, planetary alignments)
  | 'ayurveda'       // Sharira, Doshas, Herbs, Health & Etiology
  | 'psychology'     // Manovijnana, Cognitive modifications, Kleshas, Meditation neuro-states
  | 'cosmology'      // Padartha Vijnana, Atomic theory, Pancha Mahabhutas, Time dilation
  | 'governance'     // Rajaneeti, Ethics, Statecraft, Economics

export interface EmpiricalKnowledgeToken {
  id: string
  domain: ScientificDomain
  title: string
  sanskritTerm: string
  scriptureSlug: string
  chapter: number
  verseRange: string
  empiricalFact: string
  ancientObservation: string
  modernCorroboration: string
  keyCitations: {
    sanskrit: string
    translation: string
    verseUrl: string
  }[]
  tags: string[]
}
```

---

## 4. User Experience & Route Topology

1. **Chapter Summary Switcher (`/essence/[slug]`)**:
   - Sticky Granularity Segmented Control: `[⚡ Very Short] [📝 Short] [📖 Long] [🔬 Very Long]`.
   - Real-time dynamic reading time badge dynamically updates as user switches granularity (e.g. `⚡ 4 Min Read` -> `📖 48 Min Read`).
   - Chapter selector allows jumping directly to any chapter's summary.
   - Deep-dive links allow jumping directly into full shloka reading canvas.

2. **Empirical Knowledge Hub (`/insights` or `/knowledge`)**:
   - Filter by Domain: Astronomy, Ayurveda & Health, Cognitive Psychology, Cosmology & Physics.
   - Interactive Knowledge Cards showing the Sanskrit verse, the ancient observation, and modern corroboration (e.g., Kurukshetra solar/lunar eclipse sequence; Gita 17 dietary gunas and metabolic health; Patanjali's cognitive modification stages).

---

## 5. Security, Accuracy & Performance Guarantees

| Metric | Target | Verification Mechanism |
|---|---|---|
| **Summary Load Time** | < 50ms | Pre-computed static JSON edge-served via Next.js Server Components |
| **Server CPU / GPU Load** | 0% | No runtime LLM invocations for summary rendering |
| **Reading Time Accuracy** | 100% Dynamic | Computed at runtime via `calculateReadingTime()` based on active granularity word count |
| **Verse Citation Integrity** | 100% | Every anchor verse verified against canonical Gold NVF JSON |
