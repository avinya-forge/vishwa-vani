# 🚀 Vishwa-Vani: The Master Backlog [SDLC v3.0]

This is the single active backlog for Vishwa-Vani. It replaces all legacy planning variants and is the authoritative source for prioritized work, roadmap direction, and task context.

---

## 🗺️ High-Level Roadmap (The Rollout)

### 🏛️ Milestone 1: The Autonomous Data Factory (CRITICAL PRIORITY)
*Phase: Alpha | Target: 100% Ingestion for 5 Core Books.*
**[✅ COMPLETED]** All core ingestion, audit, and data pipeline tasks finished.

### 🤖 Milestone 2: The AI Professor (BETA READY)
*Phase: Beta | Target: AI-assisted conceptual maps.*
1. **[SM] Phase Orchestration**: Arrange "AI Explanation" tasks into 2-week sprints.
2. **[DEV] Semantic Search**: Implement Vector Lite for philosophical concept indexing.
3. **[QA] Hallucination Audit**: End-to-end verification of AI-generated commentaries.

### 🌍 Milestone 3: Global Public Release (GOLD)
*Phase: Rollout | Target: Public-facing API and Multi-language UI.*

---

## 🏗️ Technical Epics (SDLC Lifecycle)

### EPIC 6: UI Parity & Page-Level Audit (UI-MASTER)
- [x] **[UI-601] Gita Template Parity**: Use Bhagavad Gita as the base UI reference for Mahabharata and all major texts.
- [x] **[UI-604] Mahabharata Parva Routing**: Confirm parva/adhyaya mapping in `manifest` and add validation/fallback.

### EPIC 7: Chapter-Level Micro-Apps & Educational Content (VEDIC-LABS-EXT)
- [x] **[APP-701] Gita Analysis**: Analyze Gita chapters and recommend micro-apps based on content themes.
- [ ] **[APP-702] Vedic Labs Registry**: Build registry mapping each app to book/chapter/verse.
- [ ] **[APP-703] Verse-to-App Linking**: Add optional micro-app links on verse cards.
- [x] **[APP-704] Karma Yoga Simulator**: Interactive tool for practicing detached action (Ch. 3).
- [ ] **[APP-705] Jnana Yoga Explorer**: Self-inquiry framework with discrimination exercises (Ch. 13).
- [ ] **[APP-706] Bhakti Yoga Compass**: Devotional practice tracker with surrender exercises (Ch. 12).
- [ ] **[APP-707] Dharma Decision Matrix**: Ethical decision-making framework (Ch. 2, 16).
- [ ] **[APP-708] Time Consciousness Wheel**: Understanding past/present/future in Vedic terms (Ch. 8, 10).
- [ ] **[APP-709] Divine Qualities Assessment**: Self-evaluation of daivi vs asuri qualities (Ch. 16).
- [ ] **[APP-710] Sankhya Philosophy Visualizer**: Interactive nature/spirit discrimination (Ch. 13).
- [ ] **[APP-711] Cosmic Vision Simulator**: Understanding universal form concepts (Ch. 11).
- [ ] **[APP-712] Meditation State Tracker**: Progress tracking for dhyana yoga practices (Ch. 6).
- [ ] **[APP-713] Moksha Path Navigator**: Interactive journey through liberation paths (Ch. 8, 12, 13).
- [x] **[LAB-801] UI Theme Consistency**: Resolve light/dark theme inconsistency in lab components.
- [ ] **[LAB-802] Chhanda Analyzer Algorithm**: Implement real Sanskrit meter analysis (replace placeholder).
- [ ] **[LAB-803] Grammar Tokenizer Parser**: Build proper Paninian grammar analysis (replace mock).
- [ ] **[LAB-804] Vedic Instruments Audio**: Add conch sound playback functionality.
- [ ] **[LAB-805] Astro Explorer Algorithm**: Improve numerology with proper Vedic calculations.
- [ ] **[LAB-806] Pranayama Enhancements**: Add session tracking and customizable intervals.
- [ ] **[LAB-807] Akshauhini Context**: Add historical comparisons and export features.
- [ ] **[UI-701] Lean Template Verification**: Audit all text implementations for lean template compliance.
- [ ] **[UI-702] Verse App Integration**: Add contextual app suggestions in verse UI.
- [ ] **[UI-703] Lab Navigation Enhancement**: Improve discoverability of relevant apps from reading interface.

### EPIC 8: Mahabharata Data Optimization (MBH-OPTIMIZE)
- [ ] **[MBH-801] Content Audit**: Audit parva/adhyaya chapters for word density.
- [ ] **[MBH-802] Lazy Loading**: Enable adhyaya-level lazy loading and verse pagination for long chapters.
- [ ] **[MBH-803] Metadata Card**: Create per-adhyaya summary cards.
- [ ] **[MBH-804] Glossary Layer**: Add Mahabharata-specific terms and cross-references.

### EPIC 9: Template Consistency & Book Rollout (TEMPLATE-STD)
- [x] **[TMPL-902] Mahabharata Lean Template**: Apply the lean UI template to Mahabharata.
- [ ] **[TMPL-903] Book Checklist**: Document the lean UI template spec for future books.
- [ ] **[TMPL-904] New Book Rollout**: Onboard the next book using the standard template pattern.
- [ ] **[TMPL-905] AI Data Cleaning**: Add AI quality metrics for commentary and author mapping.
- [ ] **[TMPL-906] App-Task Generator**: Auto-generate UI micro-app tasks from semantic topics.

---

## 📊 Book-Wise Ingestion Progress (NVF 1.0)

Every book must pass through 5 phases (P1: Ingest, P2: Harden, P3: Enrich, P4: Tag, P5: Verify).

### 1. 🕉️ Bhagavad Gita
- **Status**: ✅ **STABLE**
- **Tasks**: [X] 700 verses, [X] UI audit, [ ] feasibility check for 10+ commentary integration.
- [x] **[DEV]** Add `footer` metadata that displays name/author/language filter on verse pages.
- [x] **[DEV]** Enforce 2-author lean filter for Gita and Mahabharata.
- [x] **[DEV]** Keep base template meaning visible by default.
- [x] **[QA]** Verify multi-language selector behavior for commentaries.

### 2. 🐘 Mahabharata
- **Status**: ⚠️ **PARTIAL (Parva ingestion + adhyaya routing only)**
- [x] **[DEV]** Stabilize `adhyaya` URL parsing and first-subchapter fallback.
- [x] **[DEV]** Add UI indicator for current book/chapter/adhyaya counts.
- [x] **[QA]** Validate inbound data for parva-specific commentary variants.

### 3. 🕯️ Isha Upanishad
- **Status**: ⏳ **IN PROGRESS**
- [x] P1
- [x] P2
- [ ] **[DEV]** P3 (Add Adi Shankara Bhasya)
- [ ] **[QA]** P5 (Validation)

---

## 📍 Mahabharata Ingestion Roadmap

### Phase 1: Foundation (Q1 2026)
- **Adi Parva** (Parva 1): ✅ Complete - 19 Adhyayas
- **Sabha Parva** (Parva 2): ✅ Complete - 72 Adhyayas
- **Vana Parva** (Parva 3): ✅ Complete - 267 Adhyayas

### Phase 2: Core Conflict (Q2 2026)
- **Virata Parva** (Parva 4): ✅ Complete - 67 Adhyayas
- **Udyoga Parva** (Parva 5): ✅ Complete - 186 Adhyayas
- **Bhishma Parva** (Parva 6): ✅ Complete - 117 Adhyayas

### Phase 3: Climax (Q3 2026)
- **Drona Parva** (Parva 7): ✅ Complete - 170 Adhyayas
- **Karna Parva** (Parva 8): ✅ Complete - 69 Adhyayas
- **Shalya Parva** (Parva 9): ✅ Complete - 57 Adhyayas

### Phase 4: Resolution (Q4 2026)
- **Sauptika Parva** (Parva 10): ✅ Complete - 16 Adhyayas
- **Stri Parva** (Parva 11): ✅ Complete - 23 Adhyayas
- **Shanti Parva** (Parva 12): ✅ Complete - 334 Adhyayas
- **Anushasana Parva** (Parva 13): ✅ Complete - 154 Adhyayas
- **Ashvamedhika Parva** (Parva 14): ✅ Complete - 92 Adhyayas
- **Ashramavasika Parva** (Parva 15): ✅ Complete - 35 Adhyayas
- **Mausala Parva** (Parva 16): ✅ Complete - 7 Adhyayas
- **Mahaprasthanika Parva** (Parva 17): ✅ Complete - 3 Adhyayas
- **Svargarohana Parva** (Parva 18): ✅ Complete - 5 Adhyayas

---

## 🧬 Special Constraints
- **Zero-Touch Ops**: Static auto-registration of books via directory scanning in Next.js.
- **NVF Compliance**: Sanskrit → Transliteration → Meaning → HI/MR Layers.

_This backlog is the authoritative planning document for Vishwa-Vani._
