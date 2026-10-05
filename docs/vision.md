# 🌌 Vishwa-Vani: Scriptural Intelligence Platform

Vishwa-Vani is an **AI-First Engine** designed to transform the world's unstructured Vedic and Sanskrit heritage into highly structured, multi-dimensional knowledge. It is not merely a digital library; it is a platform that uses advanced AI to analyze, correlate, and normalize scriptural wisdom for modern applications, games, and deep philosophical research.

## 🏛️ Project Identity: The Vedic Wikipedia
Building the **Vedic Wikipedia**: A transcendent, multilingual, and friction-free digital sanctuary for exploring Vedic wisdom. Vishwa-Vani provides an immersive, highly performant, and deeply interconnected experience of Shlokas, Mantras, and Sanskrit definitions across languages — English, Hindi, and Marathi.

## 🔍 Critical Analysis & Scalability Readiness

**Assessment: Solution vs. "Vedic Wikipedia" Vision**
While the current U2S pipeline successfully ingests and renders standard texts like the Gita, a critical gap analysis reveals significant hurdles in fully realizing the "Vedic Wikipedia" vision:
- **Semantic Deep-Linking Gap:** The current routing is strictly hierarchical (Book → Chapter → Verse). We lack a global ontological linkage map that allows users to traverse themes (e.g., "Dharma") seamlessly across the Gita, Upanishads, and Mahabharata. We must design a Knowledge Graph foundation to establish inter-textual relationships.
- **Search Scale Bottlenecks:** Simple client-side filtering works for a 700-verse Gita but fails catastrophically for semantic discovery across 100k+ verses. The vision demands edge-cached, vector-based semantic search interacting seamlessly with our SQLite worker architecture.
- **Scholar Imbalance & Lean UI Drift:** The platform aims for 10+ scholars, yet our Lean UI principle mandates a strict "Max 2" scholar view to prevent cognitive overload. We lack a robust, type-safe data-service layer to dynamically enforce this 2-author limit while still providing the full 10-scholar dataset for search and AI reasoning.
- **Type-Safety Enforcement Gap:** As the dataset scales to 100k+ verses, implicit `any` usage in data parsing becomes a massive regression vector. Architecture must evolve to support rigorous type-narrowing across the boundary between unstructured external data and the structured React frontend.

**Scalability: Mahabharata Core Blueprint Readiness (100k+ verses)**
The current static JSON sharding strategy is insufficient for the Mahabharata.
- **The Threat:** Loading 100k verses via JSON shards will cause main-thread memory exhaustion, massive CDN payloads, and severe UI jank.
- **The Solution:** The architecture must evolve to a **Server-Lake Layer** using edge-hosted **SQLite WASM** isolated strictly within **Web Workers**. This establishes a non-blocking boundary. It enables rapid, off-thread querying and enforces type-safe data hydration via strictly typed message-passing bridges without blocking the UI rendering cycle. Furthermore, the WASM data layer must actively chunk data streams and prune payloads to guarantee the 2-author limit before transmitting back to the main thread.

## 🚀 Core Mission: Unstructured-to-Structured (U2S)
Our primary objective is to take raw, disparate textual fragments (scanned scrolls, unstructured PDFs, web-shards) and process them through the **Vishwa ADF (Autonomous Data Factory)** until they are "Frozen" as **NVF 1.3** production-grade data accessible through a live, publicly reachable product.

## 🎯 SDLC v5.0 — Deployment-First, Beta-Driven (Current Operating Model)

**Effective 2026-04-09**, Vishwa-Vani operates under SDLC v5.0, which replaces the previous data-first approach with a **deployment-first, beta-driven** release cycle:

**Core principles of v5.0:**
- Deploy to production on Vercel (zero-cost free tier) before adding more features. A live product beats perfect local code.
- Circulate the deployed URL to a private beta group for real user feedback, bug discovery, and use-case validation.
- Bi-weekly deployment cadence — every sprint produces a tagged release deployed to production.
- Speed with quality: each task must pass all four quality gates (lint → tsc → test → build) before marking complete.
- Content and features grow in parallel — never block features waiting for full content ingestion.

**Zero-cost deployment stack:**
- Vercel free tier (100GB bandwidth, 100K serverless invocations/month, automatic global CDN)
- GitHub Actions free CI (2,000 minutes/month) for lint → tsc → test → build → deploy pipeline
- No managed database — JSON shards as static assets, SQLite WASM in Web Worker for large scriptures
- Anthropic Claude API (pay-per-use, under $5/month at beta scale with rate limiting)
- Cloudflare free tier for DNS, DDoS protection, and edge caching at v1.0

## 🏔 Strategic Pillars

1. **Deployment-First (SDLC v5.0)**: Ship a working, live product immediately. Iterate on top of production, not localhost.
2. **Beta Feedback Loop**: Circulate to a curated group. Build FeedbackWidget → GitHub Issues pipeline so every bug and feature request from real users flows directly into the backlog.
3. **AI-Inbuilt Synthesis (ADF)**: A semi-autonomous pipeline that extracts Sanskrit, English, Hindi, and Marathi layers from raw sources, using a "Dual-Audit" system to eliminate hallucination.
4. **Human-in-the-Loop (HITL) Curation**: The system discovers sources but empowers the Creator to select "Gold Standard" authors (Maharashtra-centric standard).
5. **NVF (Normalized Vedic Fragment)**: Frozen, standardized JSON schema `{ id, original, transliteration, layers[] }` enabling high-performance inference, cross-scripture search, and dynamic app integration.
6. **Inter-Book Reasoning**: Clean data allows AI to perform "Cross-Scripture Tattva Analysis" linking concepts across Vedas, Gita, and Puranas automatically.
7. **Zero-Touch UI**: Auto-registers books as soon as they are "Frozen" in the data lake — no code changes needed.
8. **Server-Lake Layer**: Handle massive datasets (like Mahabharata with 100k+ verses) via edge-hosted SQLite WASM to provide rapid query performance without main-thread jank or heavy CDN payloads.
9. **Semantic Deep-Linking Protocol**: Build highly resilient, AI-ready global linkage models across the entire text corpus, enabling deep and structured thematic navigation across 15+ ancient texts.

## 🏔 Ideal State & North Star

**Performance**: Sub-100ms LCP on all text-heavy routes via Next.js SSG and Vercel edge CDN. Semantic Graph query latency must resolve under 200ms at the edge.
**Aesthetic**: Minimalist, culturally resonant design focused on absolute readability (Devanagari-safe fonts) and accessibility (WCAG 2.1 AA).  
**Storage**: JSON shards for Gita-scale texts; SQLite WASM in Web Worker for Mahabharata-scale (100k+ verses), deeply integrated with edge KV stores for topic linkage.
**Cost**: $0/month at beta scale. Under $5/month at full Mahabharata + AI synthesis load.  
**Security**: CSP headers, no secrets in client code, rate-limited API routes, CORS-protected endpoints. Strict data-service typing ensuring zero payload leaks.

## 🤖 Multi-Agent Ecosystem

Vishwa-Vani operates under a strict, AI-driven division of labor:

**Claude (The Architect)**: Dedicated to architectural planning, blueprinting, and SDLC roadmap generation. Governs `vision.md`, `docs/backlog.md`, `docs/blueprint.md`, and technical specifications. Does NOT write feature code.

**Jules & Antigravity (The Execution Agents)**: Software engineers responsible for feature development. They parse Claude's blueprints from `docs/backlog.md`, implement tasks per `docs/standards.md`, run the quality gates, and commit code. Use `docs/jules-prompt.md` as the schedulable execution prompt.

## ⚖️ Pipeline Laws

1. **Static-First Execution**: Default to Static Generation (`npm run build`). JSON data sharding is used for chapters to keep page loads fast. The `output: 'export'` config is disabled to preserve API routes.
2. **Deployment Before Data**: The deployment pipeline (Phase 0) must be live before content ingestion expands beyond the current 3 parvas.
3. **Beta Before Features**: Beta infrastructure (Phase 1) must be live before major new features ship.
4. **Gold Standard Only**: The UI never hooks into Bronze or Silver data. Only complete, validated books are marked `available: true` in `lib/texts.ts`.
5. **Backlog is an Append Ledger**: `docs/backlog.md` only grows — never overwrites, never loses completed items.
6. **Quality Gate Blocking**: No commit proceeds if lint, tsc, test, or build fail.

## 📊 Current State (v1.0.0-beta)

**Live content**: Bhagavad Gita (18 chapters, full), Mahabharata Adi/Sabha/Vana Parvas (3/18), Isha Upanishad (10 verses, partial).  
**Current phase**: PHASE 4 — The Vedic Wikipedia Vision Revision (Addressing semantic deep-linking gaps, search bottlenecks, and enforcing type-safety & Lean UI at the SQLite WASM data layer).
**Development Velocity**: Rapid, Beta-driven feature parallelization (SDLC v5.1), requiring active architecture hardening against scale bottlenecks before scaling to full Mahabharata integration.
**Test coverage**: 155 passing, 2 pre-existing failures (known, tracked in backlog).  
**TypeScript**: 0 errors. ESLint: 33 pre-existing violations tracked in backlog (INFRA-007).  
**Next milestone**: Edge-hosted SQLite data ingestion architecture for Mahabharata scale and integration of Semantic Deep-Linking Protocol.

_Last updated: 2026-04-20 — Claude (The Architect), SDLC v5.1_
---

# User Registration & Data Collection Strategy (Phase 1)

## Primary Goals for User Registration
The introduction of user accounts (`next-auth`) is designed to move Vishwa-Vani from a static library to a personalized spiritual and educational platform. 

### 1. Personalized Learning & Reading Progress
* **Goal**: Allow users to pick up exactly where they left off.
* **Data to Collect**: 
  - `last_read_verse` (Book, Chapter, Verse).
  - `bookmarks` (Saved verses for later reference).
  - `reading_history` (Timestamped log of completed chapters).
* **Benefit**: Deepens user engagement; users don't lose their place in massive texts like the Mahabharata.

### 2. Preference & Customization Memory
* **Goal**: Persist user UI/UX and localization preferences across devices.
* **Data to Collect**: 
  - `preferred_language` (e.g., English, Hindi, Sanskrit).
  - `preferred_script` (e.g., Devanagari vs IAST vs ITRANS).
  - `theme` (Dark/Light/Sepia).
  - `preferred_commentary` (e.g., Defaulting to Prabhupada or Sankaracharya).
* **Benefit**: Creates a frictionless, instantly familiar experience on every login.

### 3. Community Curation & Feedback
* **Goal**: Understand which translations or purports are resonating or if there are errors.
* **Data to Collect**: 
  - `verse_upvotes` / `commentary_helpful_votes`.
  - `error_reports` (Reported typos or translation issues linked to user ID to prevent spam).
* **Benefit**: Crowdsources quality control and highlights the most impactful verses.

### 4. Roadmap Prioritization & Engagement
* **Goal**: Use real user demand to drive our data acquisition pipeline.
* **Data to Collect**: 
  - `book_votes` (Which scripture users want next, tied to authenticated accounts to prevent manipulation).
* **Benefit**: Aligns our development roadmap (like focusing on Bhagavata Purana vs Garuda Purana) with actual user demand.

## Step 1 Execution Plan
1. **Schema Design**: Update Prisma/Drizzle schema to include `User`, `Session`, `ReadingProgress`, and `UserPreferences` tables.
2. **OAuth Integration**: Implement Google and Facebook providers via `next-auth` to ensure one-click, low-friction sign-ups.
3. **Telemetry & Analytics**: Anonymously aggregate reading completion rates to understand drop-off points in large texts.

---

# Vishwa-Vani: Stotras & Stuties Target List

**Goal**: Achieve the canonical target of 100 Chapters (individual Stotras/Hymns) and approximately 1,000 verses.
**Current Status**: Initial 17 stotras/verses ingested (`STOTRAS-BASE-ACQ`).

This document outlines the exact target list of Stotras to be acquired, translated, and integrated into the Vishwa-Vani platform under the **Stotras & Stuties** text.

## 1. Major Sahasranamas (The Thousand Names) - 441 Verses
1. **Vishnu Sahasranama** (108 verses) - *From Mahabharata (Anushasana Parva)*
2. **Lalita Sahasranama** (183 verses) - *From Brahmanda Purana*
3. **Shiva Sahasranama** (150 verses) - *From Mahabharata / Linga Purana*

## 2. The Great Laharis (Waves of Devotion) - 200 Verses
4. **Soundarya Lahari** (100 verses) - *Adi Shankaracharya*
5. **Sivananda Lahari** (100 verses) - *Adi Shankaracharya*

## 3. Foundational Suktams (Vedic Hymns) - 61 Verses
6. **Purusha Suktam** (16 verses) - *Rigveda*
7. **Sri Suktam** (16 verses) - *Rigveda Khilani*
8. **Narayana Suktam** (13 verses) - *Mahanarayana Upanishad*
9. **Rudra Suktam / Namakam** (11 Anuvakas / verses) - *Yajurveda*
10. **Ganesha Atharvashirsha** (5 verses) - *Atharvaveda*

## 4. Key Philosophical Stotras (Advaita) - 49 Verses
11. **Bhaja Govindam (Mohamudgara)** (33 verses) - *Adi Shankaracharya*
12. **Dakshinamurthy Stotram** (10 verses) - *Adi Shankaracharya*
13. **Nirvana Shatakam (Atma Shatakam)** (6 verses) - *Adi Shankaracharya*

## 5. Devotional Ashtakams (8-Verse Hymns) - 56 Verses
14. **Lingashtakam** (8 verses)
15. **Bilvashtakam** (8 verses)
16. **Kalabhairava Ashtakam** (8 verses)
17. **Madhurashtakam** (8 verses)
18. **Achyutashtakam** (8 verses)
19. **Krishnashtakam** (8 verses)
20. **Jagannathashtakam** (8 verses)

## 6. Popular Puranic Stotras - 149 Verses
21. **Aditya Hrudayam** (31 verses) - *Valmiki Ramayana*
22. **Mahishasura Mardini Stotram** (21 verses) - *Ramakrishna Kavi*
23. **Kanakadhara Stotram** (21 verses) - *Adi Shankaracharya*
24. **Shiva Tandava Stotram** (15 verses) - *Ravana*
25. **Hanuman Chalisa** (43 verses) - *Tulsidas*
26. **Navagraha Stotram** (9 verses) - *Veda Vyasa*
27. **Ganesha Pancharatnam** (5 verses) - *Adi Shankaracharya*
28. **Bhavani Ashtakam** (4 verses) - *Adi Shankaracharya*

## 7. Short Daily Pratasmaranam (Morning Prayers) - 15 Verses
29. **Pratasmarana Stotram (Shiva)** (3 verses)
30. **Pratasmarana Stotram (Vishnu)** (3 verses)
31. **Pratasmarana Stotram (Devi)** (3 verses)
32. **Pratasmarana Stotram (Ganesha)** (3 verses)
33. **Pratasmarana Stotram (Surya)** (3 verses)

## 8. Remaining 67 Stotras (Short Hymns & Mantras) - ~50 Verses
*To reach the 100 chapters target, we will group smaller individual Dhyana Shlokas, Gayatri Mantras of different deities, and essential individual verses (e.g., Vakratunda Mahakaya, Saraswati Vandana, Guru Brahma).*
34 - 100. **Miscellaneous Namaskara & Dhyana Mantras** (67 individual chapters/verses)

---
### Total Summary
- **Total "Chapters" (Individual Stotras/Hymns)**: 100
- **Total Estimated Verses**: ~1,021 Verses

### Next Steps for Acquisition (`STOTRAS-DATA-ACQ`)
1. Create directory structure in `data/3-gold/stotras/` for each of the major items.
2. Source Sanskrit Text (Devanagari) & IAST.
3. Source English, Hindi, and Marathi translations.
4. Convert to NVF 1.3 schema.

---

# Vishwa-Vani v1.0.0 Launch Announcement Assets (PUB-012)

This document contains templates for announcing the release of Vishwa-Vani.

## Twitter / X
**Option 1: Scholarly Focus**
> Today, we unveil Vishwa-Vani v1.0.0 — The Universal Repository of Vedic Wisdom. Explore the Bhagavad Gita, Upanishads, and Mahabharata in a high-performance, multilingual digital sanctuary. 🕉️✨
>
> Read now: https://vishwavani.app
> #VedicWisdom #Sanskrit #BhagavadGita #OpenSource

**Option 2: Technical Focus**
> Built for performance, architected for wisdom. Vishwa-Vani v1.0.0 is live! Next.js 15 + SQLite WASM + NVF Schema. A new standard for digitized scriptures. 🚀🏗️
>
> Explore the lab: https://vishwavani.app/lab
> #NextJS #WebDev #SanskritAI

## Email Announcement
**Subject: Introducing Vishwa-Vani: A New Era for Vedic Wisdom**

Dear Seekers and Scholars,

We are thrilled to announce the official launch of **Vishwa-Vani v1.0.0**, a digital sanctuary designed to preserve and project the profound wisdom of the Vedas for the modern age.

Vishwa-Vani (The Universal Voice) is more than just a library; it's a high-performance platform featuring:
- **Lean UI**: Focused reading experience with scholarly depth.
- **Vedic Lab**: Interactive tools for grammar and meter analysis.
- **Multilingual Support**: Switch between English, Hindi, and Marathi instantly.

Explore the library today at: https://vishwavani.app

Join us in preserving this heritage.

Warm regards,
The Avinya Forge Team

## Social Media Image Captions (Instagram/LinkedIn)
> "Wisdom is the ultimate sanctuary." 🏛️
>
> Introducing Vishwa-Vani, the universal voice of Vedic wisdom. Our v1.0.0 release brings the Bhagavad Gita, Isha Upanishad, and the Sabha Parva of Mahabharata to your fingertips with deep scholarly commentaries and a minimalist reading experience.
>
> Designed by Avinya Forge, powered by open source.
>
> Link in bio: https://vishwavani.app
