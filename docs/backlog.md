# 🚀 Vishwa-Vani: The Master Backlog

This is the consolidated roadmap and task list for Vishwa-Vani's journey from a framework to an **Autonomous Data Factory (ADF)** and a global **Vedic Wikipedia**.

---

## 🗺️ High-Level Roadmap

### 🏛️ Milestone 1: The Zero-Cost Framework (CURRENT)
*Target: Rock-solid architecture and hosting on GitHub Pages.*
1.  **Framework Core**: ✅ **DONE** (Next.js 15, static-export support).
2.  **Multilingual Engine (i18n)**: ✅ **DONE** (EN, HI, MR dictionaries).
3.  **Wiki Semantic Routing**: ✅ **DONE** (/[text]/[chapter] paths).
4.  **Chapter Navigation**: ✅ **DONE** (Next/Prev chapter buttons).
5.  **GitHub Pages Deployment**: ⏳ **IN PROGRESS** (Verifying static redirects and CI flow).
6.  **Codebase Hygiene**: 🔥 **HIGH PRIORITY** (Consolidation and folder cleanup).

### 🤖 Milestone 2: The AI Professor (UP NEXT)
*Target: Deep conceptual understanding through AI-assisted explanations.*
1.  **AI Explanation Module**: Build a server-less logic layer for "creative breakthroughs."
2.  **Handwritten Logic UI**: Specialized components to render flowcharts and notes.
3.  **Concept Tagging**: Organizing verses by philosophical concepts (Dharma, Karma, Atman).
4.  **Semantic Search (Vector Lite)**: Search that understands "the meaning" rather than just keywords.

### 🟨 Milestone 3: Massive Content Aggregation (Aggregator Phase)
*Target: Populating the "Wiki" with thousands of legal and diverse interpretations.*

---

## 🏗️ Technical Epics (ADF Pipeline)

### EPIC 1: ADF Ingest & Autonomous Discovery (ADF-INGEST)
*Target: "Input Book Name" -> "Processed NVF 1.0 JSON"*
- [ ] **ADF-101 (Source Discovery)**: Implement `vishwa.py discover` to search and rank sources across GitHub, Archive, and PDF-libraries.
- [ ] **ADF-102 (Creator Selection UI)**: 🔥 **TOP PRIORITY** CLI/UI view for "Author Options" approval.
- [ ] **ADF-103 (Multi-Lang Synthesis)**: Use LLMs to generate HI/MR layers for selected authors.

### EPIC 2: Dual-Audit & Hallucination Defense (ADF-HARDEN)
*Target: 100% Textual Accuracy.*
- [ ] **ADF-201 (Structural Audit)**: 🔥 **HIGH PRIORITY** Enhance `vishwa-audit.py` for schema compliance.
- [ ] **ADF-202 (Philosophical Audit)**: LLM-based audit vs source-texts.
- [ ] **ADF-203 (Manual Spot-check)**: 5% random verse audit for trust building.

### EPIC 3: Knowledge Graph & Cross-Scripture Linkage (ADF-LINK)
- [ ] **ADF-301 (Nested Slug Handler)**: 🔥 **HIGH PRIORITY** Parent/Child book relationships (e.g. Gita in Mahabharata).
- [ ] **ADF-302 (Universal Concept Tagging)**: Cross-book search functionality via shared tattvas.
- [ ] **ADF-303 (Genealogical Map)**: UI component for Vedic timeline placement.

### EPIC 4: UI consistency & UX Excellence (UI-ENG)
- [x] **UI-ENG-101 (Font Clipping)**: Fix Sanskrit text clipping in `ShlokaMask`.
- [x] **UI-ENG-102 (Global Scale-Up)**: Standardize font size at 13-14px.
- [ ] **UI-ENG-103 (Card Sync)**: Consistent card heights on Home/Lab.
- [x] **UI-ENG-104 (Redundancy Cleanup)**: Remove redundant author labels.

### EPIC 5: Developer Ecosystem & APIs (VANI-API)
- [ ] **AP-101 (Public API Spec)**: Design a secure, rate-limited GraphQL/REST API for scriptural retrieval (Read-only).
- [ ] **AP-102 (Developer SDK)**: Client library for integrating Vedic data into 3rd party apps.

---

## 📊 Book-Wise Ingestion Progress (NVF 1.0)

Every book must pass through 5 phases (P1: Ingest, P2: Harden, P3: Enrich, P4: Tag, P5: Verify).

### 1. 🕉️ Bhagavad Gita
- **Status**: ✅ **STABLE**
- **Tasks**: [X] 700 Verses, [X] UI Audit, [ ] AI Cross-Reference Tagging (High Priority).

### 2. 🕯️ Isha Upanishad
- **Status**: ⏳ **IN PROGRESS** (Phase 3: Multi-Layer Enrichment)
- **Tasks**: [X] P1, [X] P2, [ ] P3 (Add Adi Shankara), [ ] P4, [ ] P5.

### 3. ☸️ Yoga Sutras
- **Status**: 📅 **NEXT UP** (P1: Ingest 196 Sutras).

### 4. ⚖️ Manusmriti
- **Status**: 📅 **BACKLOG** (2694 verses fetch).

### 5. 🔱 Srimad Bhagavatam
- **Status**: 📅 **BACKLOG** (Long-term, Canto by Canto).

---

## 🧬 Special Constraints
- **Mahabharata First**: Prioritize parvas with linked essential sections (like Gitas).
- **Zero-Touch Ops**: Static auto-registration of books via directory scanning in Next.js.
- **NVF Compliance**: Sanskrit -> Translit -> Meaning -> HI/MR Layers.
- **NVF 1.3 Transition**: 🆕 Support for **Prose Narratives & Historical Prefaces** (Essential for Mahabharata transition narrative).

### 6. ⚔️ Mahabharata (Full 18 Parvas)
- **Status**: 🔥 **PHASE 1 (Ingest & Sourcing)**
- **Tasks**: 
  - [ ] **Sanskrit Sourcing**: Aggressively fetch BORI Critical Edition Sanskrit for all 18 Parvas (Reference: [Sourcing Roadmap](file:///d:/Code/avinya-forge/vishwa-vani/docs/mahabharata-sourcing-roadmap.md)).
  - [ ] **Dual-Language Ingest**: Ingest using **NVF 1.3 (Prose Support)** to preserve narrative flow.
  - [ ] **Link Gitas**: Cross-reference Bhishma Parva with Bhagavad Gita.
  - [x] **Prose Consolidation**: Initial consolidation of fragmented KMG narratives completed.

_This backlog acts as our Roadmap for the Autonomous Evolution of Vishwa-Vani._
