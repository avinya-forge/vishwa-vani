# Scripture Onboarding Playbook

This playbook defines the standardized, zero-hallucination workflow to ingest, parse, verify, and publish any ancient text (Bhagavad Gita, Upanishads, Puranas, etc.) to the Vishwa-Vani platform safely and accurately.

## 1. Preparation & Legal Clearance
*   **Rule:** 100% Public Domain sources only. No exceptions.
*   **Rule:** Every book MUST have commentaries by the absolute best, most famous scholars per region (e.g., 2 famous Marathi authors like Dnyaneshwar/Tilak, 2 Hindi authors, 2 Sanskrit authors like Shankara/Ramanuja). Do not just pick random authors for the sake of the count.
*   **Rule:** Every book MUST support at least 3 languages (English, Hindi, Marathi). NO 'All' option in the UI to prevent screen bloat.
*   **Action:** Verify copyright expiration (e.g., pre-1928 translations or explicitly open-sourced data like GRETIL).
*   **Action:** Add the book to `docs/backlog.md` under a dedicated Epic (e.g., `EPIC-ISHA-01`).

## 2. Ingestion (Bronze Phase)
*   **Rule:** Do not parse or clean data at this stage. Capture the raw HTML/TXT.
*   **Action:** Write a Python scraper (`scripts/data/ingest_[book]_bronze.py`) to hit the verified URLs.
*   **Action:** Save outputs to `data/1-bronze/[book-slug]/chapter-X/`.

## 3. Parsing (Silver Phase)
*   **Rule:** Strict verse-count enforcement. If the parser extracts 18 verses but the chapter has 19, the build MUST fail.
*   **Action:** Write regex/BS4 scripts (`scripts/data/parse_[book]_silver.py`) to clean the Bronze data.
*   **Action:** Map fields to `verse`, `sanskrit`, `transliteration`, `english`.
*   **Action:** Save outputs to `data/2-silver/[book-slug]/[book-slug]-chapter-X.json`.

## 4. Compilation & Layering (Gold Phase)
*   **Rule:** No mixing of English text in regional language wrappers. No placeholders.
*   **Action:** Run the compiler (`scripts/data/compile_[book]_gold.py`) to structure the Silver data into the frontend schema (`data/3-gold/...`).
*   **Action:** Append commentaries securely under the `layers` array.

## 5. Multi-Language AI Pass (MLG)
*   **Rule:** Use the Local LLM Queue Worker to prevent server OOM.
*   **Action:** Feed the Gold English baseline into the LLM worker.
*   **Action:** Generate `translation_hi`, `translation_mr`, `meaning_hi`, `meaning_mr`.
*   **Action:** Append the generated `ai_summary` for the chapter.

## 6. Final UI Validation & Toggling
*   **Action:** Run the Audit Script to verify 0 placeholders.
*   **Action:** Open `lib/texts.ts` and set `SCRIPTURE_READINESS_SCORES['[book-slug]'] = 100.0`.
*   **Action:** This globally bypasses the `isStrictDemoGatingEnabled()` check and instantly publishes the book to the frontend UI!

## 7. Search Integration & NLP Indexing
*   **Rule:** Every completed book MUST be natively indexed in the Vedic-Lake for natural language processing.
*   **Action:** Ensure the text boundaries and semantic meanings are compatible with the Semantic Q&A Search feature, generating 1-line AI summaries for user queries.

## 8. Vedic Labs Ideation
*   **Rule:** Every book must be evaluated for interactive, experiential learning.
*   **Action:** Analyze the core philosophy of the book and design an interactive 'Vedic Lab' (e.g., a cosmic timeline, a meditation timer, or a tattva map) if applicable.
