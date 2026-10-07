# Vishwa-Vani: Unified Data Onboarding Playbook

This document is the absolute single source of truth for onboarding new texts into the Vishwa-Vani system, maintaining codebase hygiene, ensuring zero placeholders, and integrating texts with the UI.

## 0. Backlog & Triage (Start Here)
*   **Action:** Update docs/backlog.md with explicit EPICs for the target book. Break it down into granular tasks (Bronze Acquisition, Silver Parsing, Gold Compilation, MLG Generation, UI Integration, QA Audit).
*   **Rule:** Never start coding without explicit tasks tracked in the backlog.

## 1. Bronze Phase (Raw Acquisition)
*   **Rule:** NO manually copy-pasted data. Every book must have a reproducible python acquisition script (scripts/scraping/ingest_[book]_bronze.py).
*   **Action:** Verify the source is authentic and strictly Public Domain (no copyright).
*   **Action:** Run script and deposit .json, .txt, or .html into data/1-bronze/.

## 2. Silver Phase (Structural Normalization)
*   **Rule:** Ensure strict JSON structures matching the VedicText interfaces.
*   **Action:** Write regex/BS4 scripts (scripts/data/parse_[book]_silver.py) to clean the Bronze data.
*   **Action:** Map fields to erse, sanskrit, 	ransliteration, english.
*   **Action:** Save outputs to data/2-silver/.

## 3. Gold Phase (Compilation & Layering)
*   **Rule:** No mixing of English text in regional language wrappers. No placeholders.
*   **Action:** Run the compiler (scripts/data/compile_[book]_gold.py) to structure the Silver data into data/3-gold/.
*   **Action:** Append commentaries securely under the layers array.

## 4. Multi-Language AI Pass (MLG)
*   **Rule:** Use the Local LLM Queue Worker to prevent server OOM.
*   **Action:** Feed the Gold English baseline into the LLM worker.
*   **Action:** Generate 	ranslation_hi, 	ranslation_mr, meaning_hi, meaning_mr.
*   **Action:** Append the generated i_summary for the chapter.

## 5. QA Audit & Zero Placeholders Rule
*   **Rule:** We strictly forbid placeholders (e.g. [Pending Translation]) in production.
*   **Action:** Run the Bug Hunter/QA auditor script on the 3-gold JSON files to scan for missing layers, incorrect tags, or placeholders.
*   **Action:** If placeholders exist, route back to Step 4.

## 6. UI Integration & Toggling
*   **Action:** Open lib/texts.ts and set SCRIPTURE_READINESS_SCORES['[book-slug]'] = 100.0.
*   **Action:** This globally bypasses the isStrictDemoGatingEnabled() check and instantly publishes the book to the frontend UI.

## 7. Search Integration & NLP Indexing
*   **Rule:** Every completed book MUST be natively indexed in the Vedic-Lake for semantic search.
*   **Action:** Run the indexing scripts to ensure text boundaries are mapped for local NLP models.

## 8. Vedic Labs Ideation
*   **Rule:** Every book must be evaluated for interactive, experiential learning.
*   **Action:** Analyze the core philosophy of the book and design an interactive 'Vedic Lab' (e.g., a cosmic timeline, a meditation timer, or a tattva map).

## 9. Cleanup & Codebase Maintenance (Mandatory)
*   **Rule:** The codebase must remain completely pristine after every onboarding.
*   **Action:** Delete any temporary scratch scripts in scripts/scraping/ or root directory.
*   **Action:** Remove legacy or duplicate .md documentation files. Ensure this playbook remains the only source of truth.
*   **Action:** Run 
pm run lint and 
pm run test locally to verify zero regressions.
*   **Action:** Update docs/status_report.md with new metrics.
*   **Action:** Commit cleanly with explicit scopes (eat([book]): completed end-to-end onboarding).
