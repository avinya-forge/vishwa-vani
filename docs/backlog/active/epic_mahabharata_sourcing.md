# Mahabharata Sanskrit Sourcing & Ingestion Roadmap

We are transforming the Mahabharata from a prose-only English translation into a scholarly-grade dual-language edition.

## 1. Digital Sources Identified
To gather the original Sanskrit (BORI Critical Edition), we will target the following repositories:

*   **Sanskrit Documents (Unicode)**: Available at `sanskritdocuments.org`. This is the gold standard for high-fidelity Unicode text.
*   **GRETIL**: Göttingen Register of Electronic Texts. Excellent for machine-readable raw text in ITRANS/Harvard-Kyoto formats.
*   **Tokunaga/John Smith Text**: The most widely cited electronic version of the BORI text, available at `mahabharata-resources.org`.

## 2. Ingestion Pipeline (NVF 1.3 - Dual Script)
All new data will follow the NVF 1.3 standard, which supports both shlokas and prose narrative blocks.

### Phase 1: Mangalacharana & Anchors (LATEST)
*   **Status**: COMPLETED for Parva 8 (Karna Parva).
*   **Action**: Ground the opening of each Parva with the sacred invocation (*Om! Narayanani Namaskritya...*).

### Phase 2: Automated Versification (ADF-INGEST-301)
*   **Action**: Use the `vishwa-fetch` tool (to be built) to scrape Parva-by-Parva Sanskrit and align with the KMG translation chapters.
*   **Goal**: 100,000 fragments across 18 Parvas.

### Phase 3: Scholarly Hardening (NVF-HARDEN)
*   **Action**: Audit each verse against the BORI critical apparatus.
*   **Tagging**: Add AI metadata for characters, locations (Kurukshetra), and philosophical themes (Dharma-Kshetra).

## 3. Current USP Metrics (Updated)
*   **Active Fragments**: 900+ (Consolidated Narrative Blocks)
*   **Archival Target**: 100,000+ (Full Mahabharata + Puranas)
*   **Validation**: 100% Machine Hardened

## 4. Next Physical Action
*   Begin systematic fetch of **Parva 1 (Adi Parva)** Sanskrit text from `sanskritdocuments.org` to replace the placeholders in `mahabharata-chapter-1.json`.

---

### [TASK_1] | [Status: READY]
- **Definition of Done**: Initial pipeline built for fetching Sanskrit text from sanskritdocuments.org.
- **Audit focus**: CUPID/SLAP - ensure fetch logic is simple and decoupled.
- **Technical Context**: `scripts/vishwa-fetch.py` (To be created)
- **Engineering Log**:
  - [Run 1]: [Decision: Create initial `vishwa-fetch.py` script] | [Counter-Argument: None, this is the foundational tool needed.]
