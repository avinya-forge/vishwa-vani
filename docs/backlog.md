# 📖 Vishwa-Vani: Global Project Backlog

## 🔴 EPIC-P0-DATABASE-MIGRATION-TURSO [COMPLETED]
*Immediate end-to-end migration of vedic-lake.db to Turso Edge Database to bypass Vercel 50MB and GitHub 100MB limits. This is currently blocking production deployments and must be resolved before any other tasks.*
- [x] DB-001: Environment Provisioning - Create Turso Database, obtain TURSO_DATABASE_URL and TURSO_AUTH_TOKEN, and add them to local and Vercel environments.
- [x] DB-002: LibSQL Client Integration - Install @libsql/client. Refactor lib/server-lake.ts to swap etter-sqlite3 for async LibSQL HTTP client calls.
- [x] DB-003: Schema & Data Sync Pipeline - Create scripts/sync_turso.js to parse local Gold JSON files and insert tables/rows into the remote Turso database dynamically.
- [x] DB-004: Async Route Upgrades - Refactor Next.js React Server Components (pp/[text]/[chapter]/page.tsx) and API routes (/api/search) to strictly wait the new Turso database queries.
- [x] DB-005: Repo Cleanup & Deployment Verification - Add *.db to .gitignore, completely remove public/vedic-lake.db from git history, and verify a clean Vercel production build under the 50MB limit.

## 🔴 EPIC-P0-PRODUCTION-AUDIT-AND-CORRECTIONS [COMPLETED]
*Critical production deployment audit fixes for vishwa-vani.co.uk: brand assets, navbar metrics, navigation cleanup, page styling, metric standardization, roadmap dual-pool architecture, and full-spectrum character encoding/mojibake repair.*
- [x] NAV-001: Restore Sanskrit 'ॐ' Logo Icon in Navbar - Fix mojibake corruption (`à¥ ` -> `ॐ`) and verify brand icon rendering and styling across viewports.
- [x] NAV-002: Correct Navbar Shloka Metric to 100% Completed Books - Replace hardcoded 709 verse count with verified canonical verse count of 100% complete Gold scriptures (950 verses: Gita 701 + Isha 19 + Kena 34 + Yoga Sutras 196).
- [x] NAV-003: Harmonize Navbar Books & Verses Center Stats - Fix desktop navbar metrics (currently showing misleading 17 Books / 1,500+ Verses) to reflect the verified 100% completed pool (4 Books / 950 Verses) with clear labeling.
- [x] NAV-004: Remove Isolated 'Data Engine' Link from Navbar - Remove `/engine` from primary navbar on desktop and mobile menu to eliminate unwarranted nav clutter.
- [x] NAV-005: Fix 'Vedic Labs' Navbar Tab Active State - Fix styling bug where Vedic Labs link remains permanently orange on non-lab pages; ensure active orange highlight only triggers when route is `/lab`.
- [x] LAB-001: Unify Vedic Lab Page Styling & Remove Mouse Dot Effect - Align `/lab` background with site-wide cream/dark theme (`bg-[#FDFBF7] dark:bg-[#1C1917]`) and remove distracting mouse-cursor particle dots (`CosmicCanvas`).
- [x] METRIC-001: Establish Scriptural Standard Unit Hierarchy - Formalize 3-tier unit standard across system: lowest atomic unit is Shloka (Mantra/Verse/Sutra), intermediate unit is Chapter (Adhyaya/Pada/Parva/Khanda), and highest unit is Book (Grantha).
- [x] METRIC-002: Implement Dual-Pool Architecture - Partition catalog into 2 explicit pools: (1) 100% Completed & Verified Books Pool (Gold tier: 4 books, 24 chapters, 950 verses) and (2) Ingestion & Pipeline Pool (Silver & Bronze tiers: 13 books, 3,000+ chapters, ~168,000+ verses).
- [x] ROADMAP-001: Roadmap Metrics & Diagrammatic Tier Visualizer - Overhaul `/roadmap` to diagrammatically display Gold, Silver, and Bronze tiers with short definitions, exact 3-unit counts, and real database metrics.
- [x] ROADMAP-002: Correct 'How We Process Data' 5-Stage Pipeline - Update roadmap pipeline visualizer from confusing labels to standard progression: Bronze (Raw Acquisition) -> Silver (Structural NVF Parsing) -> Gold (Vedic Schema & Multi-Layer Commentary) -> Verification (Zero Hallucination Gate) -> Live (Production Edge).
- [x] CHAR-001: Sweep & Repair Character Encoding (Mojibake) Across Codebase - Clean and restore authentic Devanagari Sanskrit/Hindi/Marathi text and emojis across `lib/texts.ts`, `app/page.tsx`, `components/layout/Header.tsx`, `components/shloka/study-client.tsx`, and `components/shloka/shloka-mask.tsx`.
- [x] AUDIT-001: Realign Scripture Readiness Scores & Catalog Gating - Synchronize `SCRIPTURE_READINESS_SCORES` and `lib/texts.ts` so incomplete books are not deceptively reported as 100% while keeping reader routes safe.

## 🔴 EPIC-P0-UX-READING-EXPERIENCE-AND-DYNAMIC-METRICS [ACTIVE]
*Immediate overhaul of reading layout, dynamic metric calculation, universal library access, responsive typography, and brand-aligned navigation to fix critical usability and statistical defects reported in production audit.*
- [ ] DYN-001: Zero Hardcoded Verse Counts & Dynamic Aggregation Engine - Replace all hardcoded verse and book statistics (including 709, 950, 1500+) with dynamic queries from the live corpus database and shard manifests. Ensure library stats dynamically reflect the true loaded corpus (126,306+ database verses / 148,000+ total gold verses across all 17 sacred texts).
- [ ] READ-001: Eliminate Double Sidebar Cramping in Reader - Refactor `components/shloka/study-client.tsx` to remove the dual 280px/320px static sidebars that steal 600px of horizontal space and crush the center content. Convert Vedic Labs and Interactive Tools into non-intrusive collapsible drawers or unified header/footer utilities.
- [ ] READ-002: Transition Shloka Layout to Dignified Single-Column Reading Flow - Replace the cramped 2-column card grid (`grid-cols-1 lg:grid-cols-2`) with an expansive, well-proportioned single-column reading canvas (`max-w-4xl mx-auto`). Ensure Devanagari Sanskrit, IAST, translations, and commentaries have generous line-height, proper font hierarchy, and breathing room.
- [ ] LIB-001: Comprehensive Universal Library with Full Catalog Browser - Overhaul the Library section (and dedicated `/library` route/anchor) to display all 17 sacred texts organized by Vedic categories (Itihasa, Upanishad, Purana, Veda, Darshana), showing their exact chapter and verse availability so any user can pick and begin reading immediately.
- [ ] NAV-006: Brand Streamlining & Intuitive Navigation - Re-architect Header navigation to cleanly represent the core pillars of Vishwa-Vani: Sacred Library, Vedic Labs, Search, and Roadmap, with dynamic live corpus statistics and zero confusing or isolated items.
- [ ] FLOW-001: Fix 'Begin Reading' Button Target - Refactor `BeginReadingButton` in the hero section so that if no previous reading position exists, it guides the user directly to the Library (`#library`) to choose a scripture, rather than arbitrarily hardcoding Bhagavad Gita chapter 1.
- [ ] CONT-001: End-to-End Content & Copy Polishing Audit - Review and refine copy, descriptions, card labels, and metadata across all landing, roadmap, lab, and info pages from an end-user perspective to ensure authentic, dignified, and scholarly presentation.

## 🔴 EPIC-SECURITY-AND-BUGS [ACTIVE]
*All bug and security issues are prioritized here.*
- [ ] SEC-001: Implement Scraping Protection - Secure data and API routes from malicious public scraping.
- [ ] SEC-002: Data Encryption Mechanisms - Audit and implement robust encryption for sensitive data at rest and in transit.
- [ ] BUG-001: Resolve any lingering UI glitches in the commentary dropdowns or Next.js App Router navigation.

## 🟠 EPIC-USER-INTERFACE [ACTIVE]
*All UI/UX overhauls, redesigns, and user experience enhancements.*
- [ ] UI-001: Lightweight UI Overhaul - Optimize all React Server Components for maximum speed and minimal DOM size.
- [ ] UI-002: Chapter Top Bar Redesign - Perfect the 'Back' button, current chapter name, and 'Next Chapter' flow.
- [ ] UI-003: AI Synthesis Note - Clarify and beautifully render the "AI synthesis note" in the chapter UI.
- [ ] UI-004: Commentary & Language Selector - Polish the UI for switching between the 4+ authors and 3+ languages per shloka.
- [ ] UI-005: Daily Pooja & Festivals - Build a UI module for dynamically generated pooja paths and calendars.

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

## 🔵 EPIC-AI-BRAIN-ENHANCEMENT [BACKGROUND DEV]
*LLM, Symbolic Extraction, Vector Search.*
- [ ] AI-001: Evaluate Model Upgrades & Architecture.
- [ ] AI-002: Enhance LLM Contextual Output.
- [ ] AI-003: Deep Shloka Symbolic Decoding (Puranas).
- [ ] AI-004: Concept Generalization & Vectorization.

## 🟣 EPIC-LONG-TERM-ARCHITECTURE (ORACLE) [FUTURE]
*When the dataset exceeds ~7-8GB (approx. after vectorizing all Puranas), migrate from Turso to Oracle Cloud "Always Free" tier for absolute 200GB ownership and native Postgres/pgvector.*
- [ ] OCI-001: Provision Oracle ARM instance (24GB RAM, 200GB Storage).
- [ ] OCI-002: Setup Postgres & pgvector via Docker.
- [ ] OCI-003: Migrate LibSQL/Turso dump to PostgreSQL.
- [ ] OCI-004: Swap @libsql/client to pg driver in server-lake.ts.

