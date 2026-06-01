# Scrapling Data Acquisition & Legality Analysis

## Goal
Evaluate whether the Python `Scrapling` framework can legally and technically acquire all missing data required to advance our current text pipelines (Mahabharata, Kena Upanishad, Bhagavata Purana, Vishnu Purana) to the Gold standard.

## Constraints
1.  **Legality**: The project strictly enforces a public-domain or Creative Commons (CC0 / CC-BY) mandate for base translations and scholarly commentaries to avoid copyright infringement.
2.  **Schema Match**: The data must be parseable into the NVF 1.0 JSON format (verse-by-verse alignment, ≥80 chars/layer).
3.  **Pipeline Integration**: The scraped output must drop directly into `data/1-bronze/` or `data/2-silver/` and successfully pass `validate_silver.js`.

## Book-by-Book Analysis

### 1. Kena Upanishad (Currently Blocked at Silver)
*   **Blocked Requirement**: Max Müller English translation (SBE Vol 1) and Shankara Bhashya.
*   **Legality**: Max Müller's SBE Vol 1 (published 1879) is firmly in the public domain.
*   **Scrapling Viability**: **HIGH**. The text is hosted on `sacred-texts.com` (e.g., `sbe01166.htm`). Our previous `crawlee` attempts were blocked by 403s. Our `Scrapling` test script successfully bypassed this block. `Scrapling` can easily extract the `<p>` tags from the HTML and map them to verses.

### 2. Mahabharata (Parvas 1-10 Blocked Pre-Pipeline)
*   **Blocked Requirement**: Author 1 Hindi Layer (Gita Press), Author 1 Marathi Layer (Gita Press/Sukthankar), Author 2 English Layer (Bibek Debroy or equivalent Public Domain), Author 2 Marathi/Hindi (Tilak).
*   **Legality**:
    *   *Bibek Debroy* (published 2010s) is under strict copyright. We *cannot* legally scrape this. We must revert to an older public-domain translation (e.g., Manmatha Nath Dutt or a CC-licensed modern work) for the second English author.
    *   *Gita Press Hindi/Marathi*: Early 20th-century editions (Ramanarayana Datta Shastri) are often considered public domain in India (60+ years post-death), but online textual representations (like on Wisdomlib) might assert database rights. If sourced from archive.org scans, it's legal but requires OCR.
*   **Scrapling Viability**: **MEDIUM**. If the public domain texts are available as HTML on domains like Wisdomlib or Wikisource, `Scrapling` can fetch them, bypassing blocks. However, if the only public-domain versions are scanned PDFs on archive.org, `Scrapling` is useless; we would need an OCR pipeline instead.

### 3. Bhagavata Purana (Blocked at Canto 1)
*   **Blocked Requirement**: Missing translations, meanings, and layered data (vyasa, sant-dnyaneshwar equivalents, sridhara).
*   **Legality**: Prabhupada's translations (Bhaktivedanta Book Trust) are heavily copyrighted, though often scraped by others. Using them risks DMCA takedowns (as seen with the ISKCON Gita layers we had to excise). We must identify older public-domain translations (e.g., J.M. Sanyal, 1895, or Burnouf) or find explicitly CC-licensed Gaudiya texts.
*   **Scrapling Viability**: **HIGH** (technically), **LOW** (legally). We can easily scrape Vedabase or similar sites with `Scrapling`, but doing so violates the project's legal mandate. If we locate a public-domain HTML source (e.g., Wisdomlib's hosting of Sanyal), `Scrapling` is the perfect tool to acquire it.

### 4. Vishnu Purana (Missing Pipeline)
*   **Blocked Requirement**: Full text, translation, meaning, and layered commentary.
*   **Legality**: H.H. Wilson's translation (1840) is completely public domain.
*   **Scrapling Viability**: **HIGH**. Wilson's translation is hosted on `sacred-texts.com` and `wisdomlib.org`. `Scrapling` can fetch and parse this immediately.

## Conclusion & Action Plan
`Scrapling` is highly capable of fetching the necessary texts by bypassing the 403 blocks that currently plague our Node.js toolchain.

**Immediate Next Steps**:
1.  Use `Scrapling` to build a complete ingestion script for the **Kena Upanishad** (Max Müller translation from `sacred-texts.com`), as it is 100% legally clear and easily parsed.
2.  Use `Scrapling` to ingest the **Vishnu Purana** (H.H. Wilson translation from `sacred-texts.com/wisdomlib`).
3.  For Mahabharata and Bhagavata Purana, we must first locate *legally clear HTML sources* before deploying `Scrapling`. We cannot scrape copyrighted translations like Bibek Debroy.
