# 🕉️ Vishwa-Vani: Aligned Master Backlog [SDLC v8.1 – Vision & Live Deployment Success]

This backlog is organized strictly by Priority and aligned to the **Vishwa-Vani Vision**. Following our successful deployment to Vercel, the priorities have been restructured to focus on **Security, Content Gating, Customer Experience, and Pipeline Visibility**. 

**5-CHAPTER AUDIT RULE**: After every 5 chapters of any book are processed, an explicit 'Bug Hunting & System Audit' phase MUST take place. All identified issues must be categorized and added to Priority 0 before continuing.

**DEPLOYMENT GATE RULE**: We only move to subsequent priorities or new items *after* completing a successful deployment.

---

## EPIC 1: Security, Hardening & Content Protection (Priority 0)
*Crucial to ensure a safe, robust, and reliable live platform without exposed vulnerabilities or easily scraped content.*

- [x] `SEC-001` **SAST / DAST Vulnerability Fixes**: Run `npm audit fix` and patch critical Next.js/PostCSS vulnerabilities in the lockfile to resolve Vercel edge/runtime security warnings.
- [x] `SEC-002` **Anti-Scraping / Content Protection**: Add `user-select: none` to CSS and block context menu/copy actions via JS to prevent automated crawling and manual copy-pasting of proprietary translations.
- [x] `SEC-003` **Hardcoded Token Sweep**: Audit the repository for any exposed API keys or Vercel OIDC tokens (Verified clear; only local `.vercel` config exists).
- [x] `SEC-004` **Robots.txt & Crawling Prevention**: Deploy a `robots.txt` that restricts aggressive crawler bot access to the API and text content.
- [x] `SEC-005` **Gating Incomplete Content**: Enforced strict gating in `lib/texts.ts` so that *only* 100% completed scripture tiers are available to the UI. Anything incomplete is hidden from the live deployment.
- [ ] `SEC-006` **Zero-Warning Dependency Audit**: Deep update of all npm packages to eliminate deprecation warnings (e.g., glob, inflight, abab) and patch remaining transitive vulnerabilities via forced updates or overrides.
- [ ] `SEC-007` **Package Unification & Dependency Workflow**: Remove `axios` and standardize entirely on Next.js native `fetch`. Implement an automated Dependabot workflow to ensure dependencies remain current without breaking builds.
- [ ] `SEC-008` **Security Hardening (Hack-Proofing)**: Implement strict HTTP Security Headers in `next.config.ts`, add `zod` for strict API input validation, and integrate rate limiting (e.g., Redis via `@upstash/ratelimit`) to protect against DDoS.
- [ ] `SEC-009` **Web Scraping Resilience**: Upgrade internal crawler scripts (`crawlee`/`playwright`) with stealth plugins, human emulation, and proxy rotation to prevent data acquisition blocks.

---

## EPIC 2: Customer First Impression & Live Success (Priority 1)
*Enhancing the production deployment UX so that users arriving on the platform get a flawless first impression.*

- [x] `UX-001` **Pipeline Visibility UI**: Display a visually appealing "Pipeline Data Status" tracker on the landing page showing what texts are currently live and what is coming next.
- [x] `UX-002` **Console Error Resolution**: Clean up benign hydration and layout errors (e.g., ResizeObserver loop) in `app/layout.tsx` to keep the console clean for technical visitors.
- [x] `BUG-081` **Search Page Performance Jitter**: Client-side filtering lag during multi-scripture queries; optimize rendering loops and filter states.
- [x] `BUG-082` **Dark Mode Contrast for Skeletons**: Auditing layout skeletons inside Vedic Lab view for low contrast ratio in dark theme mode.
- [x] `BUG-083` **Intersection Observer Threshold Polish**: Address minor lag in the reader progress bar synchronization during rapid scroll.

---

## EPIC 3: Core Content Pipeline (Priority 2)
*Completing the actual scripture data acquisition and processing for our most impactful books.*

- **Bhagavad Gita [Readiness Score: 90.0%] (GOLD | UI VISIBLE)**
  - [x] `GITA-SCH-01` **Acquire Sankaracharya Bhashya**: Sourced and structured for all 700 verses.
  - [x] `GITA-SCH-02` **Acquire Prabhupada Purports**: Sourced and structured for all 700 verses.
  - [ ] `GITA-SCH-03` to `GITA-SCH-10`: Acquire remaining commentary layers (Tilak, Ramanuja, Madhva, etc.) to achieve 100% completion.

- **Mahabharata [Readiness Score: 60.35%] (GOLD | UI HIDDEN)**
  - [x] `MBH-PARV1-PROM` to `MBH-PARV3-PROM`: Adi, Sabha, and Vana Parvas acquired and promoted to Gold.
  - [ ] `MBH-PARV4-ACQ` **Acquire Virata Parva**: Retrieve core verses, transliterations, and KMG translation layers.
  - [ ] `MBH-PARV5-ACQ` to `MBH-PARV18-ACQ`: Acquire remaining 14 Parvas sequentially.

- **Bhagavata Purana (Srimad Bhagavatam) [Readiness Score: 51.85%] (GOLD | UI HIDDEN)**
  - [x] `BHAG-CANTO1-PROM` to `BHAG-CANTO6-PROM`: Cantos 1 through 6 acquired and mapped.
  - [ ] `BHAG-CANTO7-ACQ` **Acquire Canto 7**: Parse dialogues of Prahlada Maharaja.
  - [ ] `BHAG-CANTO8-ACQ` to `BHAG-CANTO12-ACQ`: Acquire remaining cantos.

---

## EPIC 4: Structural Architecture & Enhancements (Priority 3)
*Advanced features to organize and surface the Vedic knowledge.*

- [x] `FEAT-SEM-001` **Define Tattva Ontology Schema**: Define a JSON schema (`types/ontology.ts`) for global semantic concepts (Tattvas) such as "Dharma", "Brahman", "Atman", and "Karma".
- [x] `FEAT-SEM-002` **Static Ontology Seed Mapping**: Create `data/ontology/tattvas.json` containing initial hand-curated linkages across Bhagavad Gita and Upanishads.
- [ ] `FEAT-SEM-004` **Dynamic Concept Cloud UI**: Build a visualization graph in the Vedic Lab allowing users to explore Tattvas and jump directly to connected verses.

---

## EPIC 5: Core Infrastructure & Authentication (Priority 1)
*Scaling the platform to support personalized user accounts and robust production data storage.*

- [ ] `INFRA-001` **Authentication Setup (OAuth) & User Strategy**: Install and configure `next-auth` (Auth.js) to support seamless Google and Facebook sign-in flows. Execute Step 1 of the data collection strategy defined in `docs/user-registration-goals.md` (tracking reading progress, preferences, and roadmap votes).
- [ ] `INFRA-002` **Production Database & ORM Migration**: Migrate away from local `better-sqlite3` to a production-ready Serverless PostgreSQL database (e.g., Vercel Postgres) and integrate Prisma or Drizzle ORM for secure schema management and data integrity.

---

## 🛑 Pending Human Decision Backlog
- `MBH-DATA-GAP`: Blocked on gathering complete Mahabharata Parva 1 data due to unknown target source.
- `GITA-SCH-03` to `GITA-SCH-10`: Blocked on gathering complete data for Tilak, Aurobindo, Bhave, Ramanuja, Madhva, Abhinavagupta, Savarkar, Gita Press.
- `BHAG-GATHER-FULL`: Blocked on gathering complete Bhagavata Purana data due to unknown target source.
