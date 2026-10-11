# ADR-006: Architecture for 1-Hour Speed Reader ("Tattva Saṁgraha") & Pre-Computed Offline Distillation

- **Status**: Accepted
- **Date**: 2026-10-11
- **Deciders**: Solution Architect, Lead Implementer, Vedic Content Lead
- **Related ADRs**: [ADR-005: Local LLM Conversational Search & Server Load Architecture](file:///d:/Code/avinya-forge/vishwa-vani/docs/ADR-005-Local-LLM-Conversational-Search-And-Server-Load.md)

---

## 1. Context & Problem Statement

Users of Vishwa-Vani arrive with varied backgrounds, reading goals, and time availability:
1. **Scholars & Deep Practitioners**: Spend months or years studying word-by-word Sanskrit grammar, anvaya, and multi-lineage commentaries (Shankara, Ramanuja, Madhva).
2. **Curious Seekers & Fast Learners**: Seek to comprehend the core philosophical breakthrough and spiritual essence (*Tattva*) of a scripture within **45 to 60 minutes**, before deciding whether to commit to full study.

Currently:
- Reading a complete scripture requires navigating hundreds of verses (e.g., 701 verses across 18 chapters in Bhagavad Gita; 196 sutras in Yoga Sutras).
- Without a curated executive pathway, general users feel overwhelmed by the depth of data.
- If we dynamically ran an LLM to generate summaries on every user request, we would face severe latency (15–30s per request), non-deterministic hallucinations, and serverless compute costs/OOM crashes under concurrent traffic.

---

## 2. Decision: Pre-Computed Static Distillation ("Tattva Saṁgraha")

We decide to build the **Tattva Saṁgraha (1-Hour Speed Reader)** engine using a **Pre-Computed, Offline-Distilled Static Architecture**:

### A. The 60-Minute Reading Protocol
Each canonical scripture is distilled into a deterministic, structured JSON schema optimized for human absorption in 45–60 minutes:
1. **Prastāvanā (Context & The Central Crisis - 7 Mins)**: The historical setting, the seeker's existential dilemma (e.g., Arjuna's grief, Nachiketa's inquiry on death, Shaunaka's inquiry on ultimate knowledge), and the fundamental philosophical question answered.
2. **Pramukha Ślokas (The 8–12 Essential Signpost Verses - 30 Mins)**: The pinnacle verses that define the scripture's core thesis. Each verse includes:
   - Authentic Devanagari Sanskrit text
   - IAST Transliteration
   - Clear modern English translation
   - Philosophical insight & practical takeaway
   - Direct deep-dive hyperlink into the full interactive study canvas (`/read/[slug]/[chapter]#[verse]`).
3. **Siddhānta Saṁgraha (Philosophical Synthesis - 15 Mins)**: The key philosophical pillars distilled into concise, conceptual mental models (e.g., Karma Yoga, Jñāna Yoga, Bhakti Yoga, Trigunas, Purusha vs. Prakriti).
4. **Sādhanā Prayoga (Actionable Daily Practice - 8 Mins)**: Daily lifestyle or meditative application derived directly from the scripture.

### B. Offline Distillation Pipeline (Zero Runtime Latency, 100% Authentic)
Rather than executing LLM inference at runtime:
1. An offline Python/Node pipeline feeds canonical Gold NVF JSON into an LLM (Qwen-2.5 / DeepSeek) with strict system prompts requesting structured Tattva Saṁgraha JSON.
2. Human scholars review and audit the generated signpost verses against canonical texts to guarantee 100% fidelity.
3. The verified distillations are stored statically in `data/tattva-samgraha/<slug>.json` and loaded statically by Next.js Server Components.
4. **Runtime Performance**: 0 ms LLM inference latency, 0 server GPU cost, instantaneous static serving from edge cache.

---

## 3. Data Schema (`TattvaSamgraha`)

```typescript
export interface SignpostVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  essence: string;
  actionableTakeaway: string;
  deepDiveUrl: string; // e.g. "/read/bhagavad-gita/2#47"
}

export interface PhilosophicalPillar {
  title: string;
  sanskritTerm: string;
  definition: string;
  keyVerseCitation: string;
}

export interface TattvaSamgrahaDigest {
  id: string;
  slug: string;
  title: string;
  sanskritTitle: string;
  estimatedReadMinutes: number; // typically 45 to 60
  totalOriginalVerses: number;
  crisisAndContext: {
    seeker: string;
    preceptor: string;
    setting: string;
    centralQuestion: string;
    coreInsight: string;
  };
  signpostVerses: SignpostVerse[];
  philosophicalPillars: PhilosophicalPillar[];
  sadhanaTakeaways: string[];
  historicalImpact: string;
}
```

---

## 4. User Experience & Dual Placement Strategy

1. **Dedicated Discovery Hub (`/essence` - Tattva Saṁgraha Hub)**:
   - Features a clean, uncluttered catalog of all 17 Gold scriptures with estimated reading times (e.g., "Bhagavad Gita — 55 min", "Katha Upanishad — 40 min", "Isha Upanishad — 20 min").
   - Filterable by tradition (Upanishads, Gita, Yoga Sutras, Advaita).
   - Speed reading mode with progress tracking, ambient chanting, and one-click deep-dive triggers.

2. **In-Reader Quick Path Integration**:
   - On every scripture overview page (`/read/[slug]`), a hero card surfaces:
     `"⚡ Short on time? Read the 45-Minute Vedic Essence (Tattva Saṁgraha) before diving into all 701 verses."`
   - Gives users immediate confidence without feeling overwhelmed.

---

## 5. Security, Accuracy & Performance Guarantees

| Metric | Target | Verification Mechanism |
|---|---|---|
| **Page Load Time** | < 120ms | Static JSON bundled at build time; edge cached |
| **Server Compute Load** | 0% | No runtime LLM invocations |
| **Verse Accuracy** | 100% | Every signpost verse verified against canonical Gold NVF JSON |
| **Deep-Dive Continuity** | 100% | Direct anchor URLs link to verified chapter & verse study views |

---

## 6. Implementation Stages
1. **Stage 1 (Immediate)**: Create `lib/speed-reader.ts` providing canonical Tattva Saṁgraha digests for Gold scriptures and build the `/essence` UI and reader banner.
2. **Stage 2 (Subsequent)**: Expand offline distillation pipeline to automatically generate initial drafts for all incoming Silver scriptures before manual scholar sign-off.
