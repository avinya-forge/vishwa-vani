# 🌌 Vishwa-Vani: Scriptural Intelligence Platform

Vishwa-Vani is an **AI-First Engine** designed to transform the world's unstructured Vedic and Sanskrit heritage into highly structured, multi-dimensional knowledge. It is not merely a digital library; it is a platform that uses advanced AI to analyze, correlate, and normalize scriptural wisdom for modern applications, games, and deep philosophical research.

## 🏛️ Project Identity: The Vedic Wikipedia
Building the **Vedic Wikipedia**: A transcendent, multilingual, and friction-free digital sanctuary for exploring Vedic wisdom. Vishwa-Vani provides an immersive, highly performant, and deeply interconnected experience of Shlokas, Mantras, and Sanskrit definitions across languages — English, Hindi, and Marathi.

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

**Performance**: Sub-100ms LCP on all text-heavy routes via Next.js SSG and Vercel edge CDN.  
**Aesthetic**: Minimalist, culturally resonant design focused on absolute readability (Devanagari-safe fonts) and accessibility (WCAG 2.1 AA).  
**Storage**: JSON shards for Gita-scale texts; SQLite WASM in Web Worker for Mahabharata-scale (100k+ verses).  
**Cost**: $0/month at beta scale. Under $5/month at full Mahabharata + AI synthesis load.  
**Security**: CSP headers, no secrets in client code, rate-limited API routes, CORS-protected endpoints.

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

## 📊 Current State (v1.0.0-beta — 2026-04-17)

**Live content**: Bhagavad Gita (18 chapters, full), Mahabharata Adi/Sabha/Vana Parvas (3/18), Isha Upanishad (10 verses, partial).  
**Current phase**: PHASE 3 — Architecture for Scale & Scholarship Expansion (Deploying SQLite WASM edge edge layer and improving semantic linkages).
**Test coverage**: 155 passing, 2 pre-existing failures (known, tracked in backlog).  
**TypeScript**: 0 errors. ESLint: 33 pre-existing violations tracked in backlog (INFRA-007).  
**Next milestone**: Edge-hosted SQLite data ingestion architecture for Mahabharata scale and integration of Semantic Deep-Linking Protocol.

_Last updated: 2026-04-17 — Claude (The Architect), SDLC v5.1_