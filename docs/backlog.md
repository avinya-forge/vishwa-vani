# 📖 Vishwa-Vani: Global Project Backlog

## 🔴 EPIC-P0-DATABASE-MIGRATION-TURSO [BLOCKING PRODUCTION]
*Immediate end-to-end migration of vedic-lake.db to Turso Edge Database to bypass Vercel 50MB and GitHub 100MB limits. This is currently blocking production deployments and must be resolved before any other tasks.*
- [ ] DB-001: Environment Provisioning - Create Turso Database, obtain TURSO_DATABASE_URL and TURSO_AUTH_TOKEN, and add them to local and Vercel environments.
- [ ] DB-002: LibSQL Client Integration - Install @libsql/client. Refactor lib/server-lake.ts to swap etter-sqlite3 for async LibSQL HTTP client calls.
- [ ] DB-003: Schema & Data Sync Pipeline - Create scripts/sync_turso.js to parse local Gold JSON files and insert tables/rows into the remote Turso database dynamically.
- [ ] DB-004: Async Route Upgrades - Refactor Next.js React Server Components (pp/[text]/[chapter]/page.tsx) and API routes (/api/search) to strictly wait the new Turso database queries.
- [ ] DB-005: Repo Cleanup & Deployment Verification - Add *.db to .gitignore, completely remove public/vedic-lake.db from git history, and verify a clean Vercel production build under the 50MB limit.

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

