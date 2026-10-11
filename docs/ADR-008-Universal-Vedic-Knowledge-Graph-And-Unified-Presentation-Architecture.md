# ADR-008: Universal Vedic Knowledge Graph (VUKG) & Unified Multi-Dimensional Presentation Architecture

## Status
**ACCEPTED & ACTIVE** (October 11, 2026)

## Context
Across 19 canonical scriptures (~291,000+ total target verses, 126,306+ database verses), the Vishwa-Vani corpus contains far more than theological poetry or ritual instructions. It contains systematic empirical observations of natural phenomena, systems biology, cognitive psychology, mathematical combinatorics, governance dynamics, acoustic phonetics, and ecological conservation.

Previously (ADR-007), empirical observations were classified into 4 initial domains (Astronomy, Ayurveda, Psychology, Cosmology). However, a comprehensive audit across all 19 graduated Gold scriptures reveals that ancient Indian thinkers developed distinct disciplines of knowledge (Vidyāsthānas) that require a formalized, extensible, and forward-compatible taxonomy.

Furthermore, how this knowledge is presented to the user is paramount:
1. It must be accessible seamlessly from the top-level navigation (`/knowledge`).
2. It must enrich the primary shloka reading experience (`/[slug]/[chapter]`) without introducing visual clutter or confusing drawers.
3. It must connect ancient Sanskrit observations directly with modern peer-reviewed scientific corroboration.
4. The underlying data model must support edge-cached in-memory lookup while maintaining a clean SQL schema for Turso / LibSQL edge synchronization.

---

## Decision

### 1. The 10 Universal Knowledge Domains of VUKG

We establish a standardized 10-domain taxonomy:

| Domain Key | Sanskrit Term | English Domain | Canonical Scriptural Anchors | Modern Scientific Corroboration |
| :--- | :--- | :--- | :--- | :--- |
| `astronomy` | खगोल & पुरातत्त्वज्योतिष | Astronomy & Archaeoastronomy | Mahabharata (Bhishma Parva), Ramayana (Bala Kanda), Vishnu Purana (Amsa 2) | NASA orbital ephemeris, Planetarium retrograde backward calculations |
| `ayurveda` | शारीर, चिकित्सा & आहार | Systems Physiology & Nutrition | Bhagavad Gita (Ch 17), Atharvaveda (Kandas 1–2), Garuda Purana | Nutritional biochemistry, gut-brain axis, metabolic Prakriti genomics |
| `psychology` | मनोविज्ञान & चेतना | Cognitive Psychology & Consciousness | Yoga Sutras (Ch 1), Mandukya Upanishad, Bhagavad Gita (Ch 6) | Default Mode Network (DMN) fMRI, brainwave oscillation EEG (Beta to Delta) |
| `cosmology` | पदार्थविज्ञान & काल | Physics, Atomic Theory & Deep Time | Brahma Sutras (2.2), Vishnu Purana (1.3), Rigveda (Nasadiya Sukta) | Paramanu atomic clustering, Giga-annum astrophysical timescales |
| `governance` | राजनीति, अर्थशास्त्र & नीति | Geopolitics, Statecraft & Ethics of Power | Mahabharata (Shanti & Sabha Parva), Ramayana (Ayodhya), Manusmriti (7), Dasbodh (18) | Institutional game theory, anti-fragility, ethical diplomacy (Mandala theory) |
| `mathematics` | गणित, संख्या & छन्दशास्त्र | Vedic Mathematics & Combinatorics | Shukla Yajurveda (Ch 17), Pingala Chhandas Sutras, Sulba Sutras | Decimal power scaling ($10^{12}$ Parardha), Meru Prastara binary combinatorics |
| `ecology` | भूमिविद्या & प्रकृतिसंरक्षण | Ecology, Botany & Environmental Ethics | Atharvaveda (Bhumi Sukta 12.1), Manusmriti (1.49), Skanda Purana | Plant neurobiology (cellular sensitivity), biodiversity conservation ethics |
| `epistemology` | प्रमाणशास्त्र, न्याय & तर्क | Epistemology, Logic & Dialectics | Yoga Sutras (1.7), Brahma Sutras (Adhikarana logic), Kena Upanishad | Scientific empiricism (Pratyaksha), deductive inference (Anumana), peer review |
| `linguistics` | शब्दबोध, शिक्षा & नादब्रह्म | Acoustic Phonetics & Psychoacoustics | Samaveda (Saman accents), Mandukya (AUM spectrum), Paninian Shiksha | Formant acoustic harmonics, parasympathetic vagal stimulation |
| `sociology` | समाजधर्म & जीवनसंस्कार | Developmental Psychology & Sociology | 16 Samskaras, Manusmriti, Dasbodh (Murkha Lakshana) | Neurodevelopmental milestones, rite-of-passage transitional psychology |

---

### 2. Dual-Layer Storage Architecture (Edge Memory + Turso LibSQL)

To achieve zero server latency while supporting futuristic scaling:

1. **Edge-Native In-Memory Registry (`lib/vedic-science.ts`)**:
   - Provides instant static JSON access for Next.js Server Components and Client Components with 0 ms query latency.
   - 100% typed via TypeScript interfaces (`EmpiricalKnowledgeToken`, `ScientificDomain`).

2. **Turso / LibSQL Table Schema (`knowledge_tokens`)**:
   ```sql
   CREATE TABLE IF NOT EXISTS knowledge_tokens (
     id TEXT PRIMARY KEY,
     domain TEXT NOT NULL,
     domain_label TEXT NOT NULL,
     title TEXT NOT NULL,
     sanskrit_term TEXT NOT NULL,
     scripture_slug TEXT NOT NULL,
     scripture_name TEXT NOT NULL,
     chapter INTEGER NOT NULL,
     verse_range TEXT NOT NULL,
     ancient_observation TEXT NOT NULL,
     modern_corroboration TEXT NOT NULL,
     empirical_fact TEXT NOT NULL,
     key_citations_json TEXT NOT NULL,
     tags_json TEXT NOT NULL,
     cross_references_json TEXT,
     confidence_level TEXT DEFAULT 'high',
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX IF NOT EXISTS idx_kt_domain ON knowledge_tokens(domain);
   CREATE INDEX IF NOT EXISTS idx_kt_scripture ON knowledge_tokens(scripture_slug);
   ```

---

### 3. Unified Presentation Layer (Navbar to Verse Detailing)

1. **Navbar Integration (`components/layout/Header.tsx`)**:
   - `🔬 Science` / `Vedic Science` route (`/knowledge`) permanently elevated as a primary pillar alongside `Library`, `Essence`, `Vedic Labs`, and `Roadmap`.

2. **Knowledge Hub (`app/knowledge/page.tsx`)**:
   - Multi-facet interactive filtering across all 10 domains with token count pills, search bar, and domain-themed ambient color badges.
   - Direct 1-click links into the canonical Gold reading canvas (`/[slug]/[chapter]#[verse]`).

3. **In-Reader Verse Insights (`components/shloka/study-client.tsx`)**:
   - Dynamic verse-level lookup (`getKnowledgeTokensByScriptureAndVerse(slug, chapter, verse)`).
   - When a verse has an associated empirical insight, display an elegant non-intrusive badge:
     `💎 Empirical Vedic Science Insight` $\rightarrow$ clicking expands a verified scientific summary and links to the full knowledge hub.

---

## Consequences & Verification
- **Backward Compatibility**: Fully compatible with existing NVF 1.3 shloka schemas and existing test suites.
- **Verification Guarantee**: 100% unit tested via Jest with verified citations, valid URLs, and zero placeholder text.
