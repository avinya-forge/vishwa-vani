# 🚀 Vishwa-Vani: The Master Backlog [SDLC v5.1 — Priority-First, Content-Scaled]

This is the single authoritative ledger for Vishwa-Vani progress. It is organized by **Priority** (Bugs → Content → Pipeline → UI) and **Book** (Gita → Mahabharata).

---

## 🐞 PRIORITY 1: CONTINUOUS STABILITY & BUG BASH

*Goal: 100% production-ready quality. Zero regressions in implemented features.*

- [x] `BUG-025` **Mobile Navigation Dropdown hidden** — Fix header layout stacking.
- [x] `BUG-026` **Next Chapter Link Broken** — Fix absolute slugs in navigation.
- [x] `BUG-029` **Redundant Interactive Tools** — Apps were repeated for every shloka. Fix: Moved to Desktop Sidebar (Global Chapter context). — Done: 2026-04-16
- [x] `BUG-030` **Scholar selection limit unrestriction** — Restored "Max 2" selection limit (irrespective of language) to avoid UI clutter. — Done: 2026-04-16
- [ ] `BUG-032` **Mobile Horizontal Jitter** — Identify and remove 1-2px overflow causing "white screen background" on zoom-out/swipe.
- [ ] `BUG-033` **Sound Propagation (Mobile Safari)** — Fix missing audio triggers for conch sound effects due to strict auto-play/AudioContext restrictions.
- [ ] `BUG-034` **Persistent "Auditing" Placeholder** — Investigate why some Gold-tier verses still show placeholder text even when `original` and `transliteration` are present. Hard-code fallback to `meaning` field if layer is missing.
- [ ] `BUG-035` **Timeline Alignment** — Fix center-alignment of milestones on mobile viewports; currently they lean left.

---

## 📖 BOOK: BHAGAVAD GITA

### 🏆 PRIORITY 2: GITA SCHOLARSHIP EXPANSION (Top 10 Authors)
*Goal: Transform into a "Vedic Wikipedia" by providing the 10 most influential commentaries across Hi/En/Mr.*

- [ ] `SCHOLAR-001` **Top 10 Identification**: Research and rank candidates (Adi Shankara, Ramanuja, Madhva, Abhinavagupta, Tilak, Gandhi, Radhakrishnan, Easwaran, Aurobindo, Gita Press).
- [ ] `SCHOLAR-002` **Multilingual Balance Pass**: Actively target scholars to ensure Hindi (Goyandka), Marathi (Historical Sages), and English (Modern scholars) are represented.
- [ ] `SCHOLAR-003` **Single-Language Excellence**: Ingest high-prestige scholars even if they only have 1 language (e.g., pure Sanskrit Bhasyas or regional Marathi works). 
- [ ] `SCHOLAR-004` **Data Acquisition**: Gather public domain / CC-licensed raw text for identified authors.
- [ ] `SCHOLAR-005` **Author Comparison Research**: Document the "philosophical school" (Advaita, Vishishtadvaita, etc.) for each scholar to aid UI categorization.

### ⛓️ PRIORITY 3: GITA DATA PIPELINE (Gold Standard)
*Goal: Process raw content into verified UI-ready Gold JSON shards.*

- [ ] `GOLD-101` **Bronze-to-Silver Cleanup**: Automated OCR noise removal for new acquired texts.
- [ ] `GOLD-102` **Verse Alignment**: Cross-verify adhyaya/shloka numbering for all 10 scholars (handling variant numberings).
- [ ] `GOLD-103` **Metadata Injection**: Add author bios, historical dates, and icons for all 10 new scholars.
- [ ] `GOLD-104` **Data Service Mapping**: Register new scholar indices in `VedicDataService`.

### 🎨 PRIORITY 4: UI/UX FOR SCALE
*Goal: Elegant interface that handles 10+ authors without cluttering.*

- [ ] `UI-901` **Scholar Selection Overhaul**: Design a categorized/tabbed selector for scholars (e.g. "Classical Sages", "Modern Philosophers", "Regional Masters").
- [ ] `UI-902` **Advanced Language Filtering**: Allow users to hide scholars based on language availability.
- [ ] `UI-903` **Scholar "Mode" Persistence**: Save preferred scholars to `localStorage` so they stick across chapters.
- [ ] `UI-904` **Interactive Tagging**: Implement the "Tag System" for links to reduce screen space usage.

---

## 🐘 BOOK: MAHABHARATA (MBH CORE)

### 🗺️ PRIORITY 5: THE MBH "HUGE BOOK" BLUEPRINT
*Goal: Replicate the Gita pipeline for a book 100x larger (18 Parvas, 100k+ verses).*

- [ ] `MBH-CORE-001` **Scale Ingestion Roadmap**: Audit all 18 Parvas (225-300+ adhyayas each) and create a phased ingestion schedule (Phase 1-Parvas 1-6, Phase 2-Parvas 7-12, Phase 3-Parvas 13-18).
- [ ] `MBH-CORE-002` **Process Replication**: Document the `docs/ingestion-runbook.md` specific to MBH scale (avoiding OOM during build, handling massive JSON shards).
- [ ] `MBH-CORE-003` **KMG Source Verification**: Clean the KMG (Kisari Mohan Ganguli) layers for parvas 1-18.
- [ ] `MBH-CORE-004` **MBH Metadata Foundation**: Research timeline and historical era specific to MBH for the Timeline component.
- [ ] `MBH-CORE-005` **Adhyaya Navigation Hardening**: Improve the `HierarchicalNav` to handle parvas with 300+ items efficiently (search-in-dropdown).

---

## 🔬 EPIC: VEDIC LABS & AI DISCOVERY

- [ ] `LAB-AI-001` **Gita Chapter Audit**: Run LLM pass to discover 50+ new lab opportunities.
- [ ] `LAB-AI-002` **Sankhya Logic Visualizer**: Gita Ch 13 interactive Discrimination UI. 

---

## 📜 HISTORICAL TASK ARCHIVE (Preservation Ledger)

### PHASE 0: DEPLOYMENT FOUNDATION
- [x] `DEPL-001` CI workflow — Done: 2026-04-09
- [x] `DEPL-002` Deploy workflow — Done: 2026-04-09
- [x] `DEPL-003` Env example — Done: 2026-04-09
- [x] `DEPL-004` Health route — Done: 2026-04-09
- [x] `DEPL-005` Sitemap — Done: 2026-04-09
- [x] `DEPL-006` Robots.txt — Done: 2026-04-09
- [x] `DEPL-007` Meta tags — Done: 2026-04-09
- [x] `DEPL-008` Security headers — Done: 2026-04-09
- [x] `DEPL-009` CSP fix — Done: 2026-04-10
- [x] `DEPL-010` Vercel Analytics — Done: 2026-04-10
- [x] `DEPL-011` Parva-1 Registration — Done: 2026-04-10
- [x] `DEPL-012` Health test — Done: 2026-04-09

### PHASE 1: BETA INFRASTRUCTURE
- [x] `BETA-001` FeedbackWidget — Done: 2026-04-09
- [x] `BETA-002` POST /api/feedback — Done: 2026-04-09
- [x] `BETA-003` Feedback tests — Done: 2026-04-09
- [x] `BETA-004` BetaBanner — Done: 2026-04-09
- [x] `BETA-005` Error boundary — Done: 2026-04-09
- [x] `BETA-006` Loading skeletons — Done: 2026-04-10
- [x] `BETA-007` 404 page — Done: 2026-04-10
- [x] `BETA-008` API error handling — Done: 2026-04-10
- [x] `BETA-009` FeedbackWidget tests — Done: 2026-04-10
- [x] `BETA-010` Reader feedback button — Done: 2026-04-10

### PHASE 2: CONTENT COMPLETENESS
- [x] `CONT-001` MBH available: true — Done: 2026-04-11
- [x] `CONT-002` Parva-1 shards — Done: 2026-04-11
- [x] `CONT-007` Isha available: true — Done: 2026-04-11
- [x] `CONT-008` Isha shards — Done: 2026-04-11
- [x] `CONT-010` Quality report script — Done: 2026-04-14
- [x] `STAB-701` Post-Launch Audit — Done: 2026-04-14
- [x] `STAB-702` undefined labels fix — Done: 2026-04-14
- [x] `STAB-703` Route protection — Done: 2026-04-14
- [x] `STAB-704` Isha Silver-to-Gold — Done: 2026-04-14

### EPIC 6: VEDIC LABS GITA
- [x] `APP-701` Gita Analysis — Done
- [x] `APP-702` Vedic Labs Registry — Done
- [x] `APP-703` Verse-to-App Linking — Done
- [x] `APP-704` Karma Yoga — Done
- [x] `APP-705` Jnana Yoga — Done
- [x] `APP-706` Bhakti Yoga — Done
- [x] `APP-707` Dharma Decision — Done
- [x] `APP-708` Time Wheel — Done
- [x] `APP-709` Divine Qualities — Done
- [x] `APP-712` Meditation State — Done
- [x] `LAB-801` Theme Consistency — Done
- [x] `LAB-806` Pranayama Enhancements — Done
- [x] `LAB-807` Akshauhini Context — Done
- [x] `UI-701` Lean Template Verification — Done

### EPIC 7-11: STABILITY & UI REFINEMENT
- [x] `STAB-601` Verification Audit — Done
- [x] `STAB-602` Placeholder Removal — Done
- [x] `STAB-603` Endpoint Hardening — Done
- [x] `STAB-604` UI Behavior Audit — Done
- [x] `STAB-605` Coverage Audit — Done
- [x] `STAB-606` Coverage Remediation — Done
- [x] `STAB-607` Doc Verification — Done
- [x] `STAB-608` Stability Gate — Done
- [x] `UI-601/604` Gita/MBH Parity — Done
- [x] `UI-701-713` Critical Refinements — Done
- [x] `UI-714-718` Reader Optimization — Done

---

*Last Updated: 2026-04-16 by Claude/Antigravity.*
