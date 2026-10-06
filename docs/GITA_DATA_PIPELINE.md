# Bhagavad Gita: End-to-End Data Pipeline

This document outlines the strict, granular methodology required to achieve 100% completion and authenticity for the Bhagavad Gita text within the Vishwa-Vani platform.

## 1. The Core Problem
The initial `3-gold` JSON data generated for the Bhagavad Gita contained severe hallucinations (e.g., mismatched translations, looping placeholder text like "the spiritual principle or aspect", and corrupted multilang layers). To maintain scriptural integrity, we must discard the hallucinated data and rebuild the Gita using the established Bronze -> Silver -> Gold pipeline.

## 2. Pipeline Phases

### Phase 1: Identification & Sourcing (1-Bronze)
All sources must be strictly **Public Domain (Copyright-Free)** to ensure legal compliance.
*   **Original Sanskrit (Mula) & Transliteration (IAST):** Source from GRETIL (Göttingen Register of Electronic Texts in Indian Languages) or Wikisource.
*   **English Universal Translation:** Source from older, copyright-free editions (e.g., Swami Vivekananda, Edwin Arnold, or early Gita Press public domain editions).
*   **Adi Shankara Commentary (Bhashya):** Source English translation by Alladi Mahadeva Sastri (1897 - Public Domain).
*   **Sant Dnyaneshwar (Dnyaneshwari):** Source original Marathi (13th Century - Public Domain) and English translation by Manu Subedar (1928 - Public Domain).

**Action:** Write scrapers (Python + BeautifulSoup) to pull raw HTML/text into `data/1-bronze/bhagavad-gita/`.

### Phase 2: Structuring & Parsing (2-Silver)
Raw text is messy and unstructured. We need intermediate parsing scripts.
*   **Process:** Create regex-based Python parsers for each source text.
*   **Output:** Clean JSON structures in `data/2-silver/bhagavad-gita/` mapped precisely by Chapter (1-18) and Verse (1-700).
*   **Validation:** The parser MUST verify exactly 700 verses. If the count drifts, the parser fails.

### Phase 3: Assembly (3-Gold)
The frontend UI (`StudyClient.tsx`) expects a highly specific layered schema.
*   **Process:** Create a compiler script (e.g., `scripts/compile_gita_gold.py`) to merge all Silver datasets into the final Gold schema.
*   **Schema Requirements:**
    *   Root fields: `verse`, `original`, `transliteration`, `translation`, `meaning`.
    *   Layers array: Objects with `type: "commentary"`, `author`, `lang`, and `content`.

### Phase 4: Multilingual Word-Meanings (MLG)
The Universal Translation is English. We need native Hindi and Marathi direct meanings for the UI.
*   **Process:** Run a safe, rate-limited translation script (`scripts/translate_shlokas_slow.py`) on the newly minted Gold data to generate `translation_hi`, `translation_mr`, `meaning_hi`, and `meaning_mr` directly on the root verse objects.
*   **Validation:** LLM-assisted verification to ensure no untranslated English chunks leak into the Hindi/Marathi fields.

### Phase 5: Verification & UI Audit
*   **Programmatic QA:** Run an audit script to parse all 18 JSON files checking for:
    *   0 occurrences of known placeholders (e.g., "spiritual principle").
    *   Non-empty arrays for layers.
    *   Valid structure.
*   **Visual QA:** Check `StudyClient.tsx` rendering on desktop and mobile to ensure the grid layouts and Vedic Labs sidebar render the authentic data beautifully.

## 3. Execution Strategy
This epic will be executed via background subagents:
1.  **Scraper Agent:** Finds sources and writes `1-bronze` ingestion scripts.
2.  **Data Engineer Agent:** Writes the `2-silver` parsers and `3-gold` compiler.
3.  **QA Auditor Agent:** Runs the final validation checks.
