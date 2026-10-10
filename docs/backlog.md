# 📖 Vishwa-Vani: Global Project Backlog

## 🔴 EPIC-P0-UX-READING-EXPERIENCE-AND-DYNAMIC-METRICS [COMPLETED & VERIFIED]
*Immediate overhaul of reading layout, dynamic metric calculation, universal library access, responsive typography, and brand-aligned navigation to fix critical usability and statistical defects reported in production audit.*
- [x] DYN-001: Zero Hardcoded Verse Counts & Dynamic Aggregation Engine - Replaced all hardcoded verse and book statistics (including 709, 950, 1500+) with dynamic queries from the live corpus database (`getDynamicLibraryStats`) and shard manifests. Ensure library stats dynamically reflect the true loaded corpus (126,306+ database verses / 148,000+ total gold verses across all 17 sacred texts).
- [x] READ-001-A: Refactor `components/shloka/study-client.tsx` to remove the dual 280px/320px static sidebars.
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

## 🔴 EPIC-P0-FOLLOW-UP-AND-SCALE [ACTIVE]
*Next-generation optimizations for reading breathing room, dedicated library destination, and diagrammatic pipeline visualization.*
- [ ] UI-READ-003: Reading Canvas Layout & Responsive Breathing Room Audit - Continually optimize padding, font sizes (fluid clamp), and card proportions across mobile, tablet, and desktop screens for edge-case viewports.
- [ ] LIB-002: Dedicated Full Library Destination Page (`/library`) - Expand dedicated `/library` browse view with advanced scripture search, filter by tradition (Advaita, Vaishnava, Yoga, etc.), and reading list queues.
- [ ] ROADMAP-003: Interactive Diagrammatic Processing Pipeline Visualization - Render rich interactive SVG / HTML flowcharts for Bronze -> Silver -> Gold tier certification standards with real-time pipeline status checks.
- [ ] METRIC-003: Live Database Verse Verification CLI - Scheduled job to verify Turso edge database table counts against local manifests and emit automated telemetry alerts on count drift.
- [ ] LAB-002: Vedic Labs Category Grouping & Performance Lazy-Loading - Group the 22+ experimental lab shards by scripture/philosophical school and bundle them into split chunks to maintain blazing-fast sub-second initial route transitions.

## 🔴 EPIC-SECURITY-AND-BUGS [ACTIVE]
*All bug and security issues are prioritized here.*
- [ ] SEC-001: Implement Scraping Protection - Secure data and API routes from malicious public scraping.
- [ ] SEC-002-A: Implement AES-256 for PII at rest in the database.
- [ ] SEC-002-B: Set up secure HTTP-only cookies for session tokens.
- [ ] BUG-001: Resolve any lingering UI glitches in the commentary dropdowns or Next.js App Router navigation.
- [x] `SEC-008` **Security Hardening (Hack-Proofing)**: Implement strict HTTP Security Headers in `next.config.ts`, add `zod` for strict API input validation, and integrate rate limiting (e.g., Redis via `@upstash/ratelimit`) to protect against DDoS.
- [ ] `SEC-DEP-001` **NPM Audit Mitigation (Micromatch/Braces)**: Resolve 32 high-severity vulnerabilities affecting `jest`, `@next/eslint-plugin-next`, and `fast-glob` by forcing resolution of `braces` and `micromatch` to patched versions (via overrides in package.json) or upgrading testing dependencies. Run unit tests post-fix to verify stability.
- [ ] `BUG-068` **[P2] Dev Environment Dependency Security Audit**: Execute automated audits on the package lockfile to ensure zero high-risk vulnerabilities are present in devDependencies.

## 🟠 EPIC-USER-INTERFACE [ACTIVE]
*All UI/UX overhauls, redesigns, and user experience enhancements.*
- [ ] UI-001-A: Audit RSC components for redundant client-side JS dependencies.
- [ ] UI-001-B: Apply Tailwind container queries for highly responsive grid structures.
- [ ] UI-002: Chapter Top Bar Redesign - Perfect the 'Back' button, current chapter name, and 'Next Chapter' flow.
- [ ] UI-003: AI Synthesis Note - Clarify and beautifully render the "AI synthesis note" in the chapter UI.
- [ ] UI-004: Commentary & Language Selector - Polish the UI for switching between the 4+ authors and 3+ languages per shloka.
- [ ] UI-005: Daily Pooja & Festivals - Build a UI module for dynamically generated pooja paths and calendars.
- [ ] UI-006: Library Page Overhaul - Redesign the library landing page so it visually resembles a library (book covers, categories, summaries) rather than a raw data list.
- [ ] UI-007: Book Entry Journeys - Create a clear, structured entry point for every book. When a user clicks a book, they should see an introduction, chapter list, and a prominent 'Start Reading' button.
- [ ] UI-008: Navigation & Journey Mapping - Ensure that every page provides a logical path for the user to discover books and dive into reading them.
- [ ] UI-009: Book-Specific UI Adjustments - Review each integrated book's UI to ensure its unique structure is presented beautifully and intuitively.
- [ ] `SEC-007` **Package Unification & Dependency Workflow**: Remove `axios` and standardize entirely on Next.js native `fetch`. Implement an automated Dependabot workflow to ensure dependencies remain current without breaking builds.
- [ ] `UX-006` **UI/UX Audit & Clutter Reduction**: Perform a deep review of the landing page and reading UI to eliminate visual clutter and maximize the visibility of 100% completed (Gold) texts.
- [ ] `BUG-052` **[P2] npm install Warnings and Vulnerabilities**: Audit all deprecated package warnings (`inflight`, `glob`, `whatwg-encoding`, `prebuild-install`) and security vulnerabilities to achieve a clean `npm i` execution output.
- [ ] Run lint, test runner, and build check.

## 🟢 EPIC-BOOK: SKANDA PURANA [QUEUED]
*End-to-end integration for Skanda Purana.*
- [ ] ACQ-SKP-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-SKP-002: Silver Regex Parse & Gold Translation.
- [ ] UI-SKP-001: UI Integration & specific styling.
- [ ] AUDIT-SKP-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: DASBODH [QUEUED]
*End-to-end integration for Dasbodh.*
- [ ] ACQ-DAS-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-DAS-002: Silver Regex Parse & Gold Translation.
- [ ] UI-DAS-001: UI Integration & specific styling.
- [ ] AUDIT-DAS-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: RIGVEDA [ACTIVE]
*End-to-end integration for Rigveda.*
- [ ] ACQ-RV-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-RV-002: Silver Regex Parse & Gold Translation.
- [ ] UI-RV-001: UI Integration & specific styling.
- [ ] AUDIT-RV-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: SRIMAD BHAGAVATAM [QUEUED]
*End-to-end integration for Srimad Bhagavatam.*
- [ ] ACQ-BHA-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-BHA-002: Silver Regex Parse & Gold Translation.
- [ ] UI-BHA-001: UI Integration & specific styling.
- [ ] AUDIT-BHA-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: STOTRAS & STUTIES [QUEUED]
*End-to-end integration for Stotras & Stuties.*
- [ ] ACQ-STO-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-STO-002: Silver Regex Parse & Gold Translation.
- [ ] UI-STO-001: UI Integration & specific styling.
- [ ] AUDIT-STO-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: BRAHMA SUTRAS [QUEUED]
*End-to-end integration for Brahma Sutras.*
- [ ] ACQ-BRA-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-BRA-002: Silver Regex Parse & Gold Translation.
- [ ] UI-BRA-001: UI Integration & specific styling.
- [ ] AUDIT-BRA-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: MANUSMRITI [QUEUED]
*End-to-end integration for Manusmriti.*
- [ ] ACQ-MAN-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-MAN-002: Silver Regex Parse & Gold Translation.
- [ ] UI-MAN-001: UI Integration & specific styling.
- [ ] AUDIT-MAN-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: SAMAVEDA SAMHITA [QUEUED]
*End-to-end integration for Samaveda Samhita.*
- [ ] ACQ-SAM-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-SAM-002: Silver Regex Parse & Gold Translation.
- [ ] UI-SAM-001: UI Integration & specific styling.
- [ ] AUDIT-SAM-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: YAJURVEDA SAMHITA [QUEUED]
*End-to-end integration for Yajurveda Samhita.*
- [ ] ACQ-YAJ-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-YAJ-002: Silver Regex Parse & Gold Translation.
- [ ] UI-YAJ-001: UI Integration & specific styling.
- [ ] AUDIT-YAJ-001: Auditing, verification, and testing for correction.

## 🟢 EPIC-BOOK: ATHARVAVEDA SAMHITA [QUEUED]
*End-to-end integration for Atharvaveda Samhita.*
- [ ] ACQ-ATH-001: Bronze ingestion and data processing for new authors.
- [ ] ACQ-ATH-002: Silver Regex Parse & Gold Translation.
- [ ] UI-ATH-001: UI Integration & specific styling.
- [ ] AUDIT-ATH-001: Auditing, verification, and testing for correction.

## 🔵 EPIC-AI-BRAIN-ENHANCEMENT [BACKGROUND DEV]
*LLM, Symbolic Extraction, Vector Search.*
- [ ] AI-001-A: Evaluate cost and latency of upgrading local model to 7B parameters using AirLLM.
- [ ] AI-001-B: Profile VRAM usage of new models against our Vercel limits.
- [ ] AI-002: Enhance LLM Contextual Output.
- [ ] AI-003: Deep Shloka Symbolic Decoding (Puranas).
- [ ] AI-004: Concept Generalization & Vectorization.

## 🟣 EPIC-LONG-TERM-ARCHITECTURE (ORACLE) [FUTURE]
*When the dataset exceeds ~7-8GB (approx. after vectorizing all Puranas), migrate from Turso to Oracle Cloud "Always Free" tier for absolute 200GB ownership and native Postgres/pgvector.*
- [ ] OCI-001: Provision Oracle ARM instance (24GB RAM, 200GB Storage).
- [ ] OCI-002: Setup Postgres & pgvector via Docker.
- [ ] OCI-003: Migrate LibSQL/Turso dump to PostgreSQL.
- [ ] OCI-004: Swap @libsql/client to pg driver in server-lake.ts.
