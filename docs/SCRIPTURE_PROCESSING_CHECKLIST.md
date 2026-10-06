# Scripture Processing Checklist & Ruleset

This generic checklist ensures that any ancient text (Bhagavad Gita, Upanishads, Puranas) added to Vishwa-Vani maintains 100% authenticity, perfect alignment, and is properly formatted for the UI. It is designed to be executed **chapter by chapter**.

## Core Ruleset
1. **Zero Hallucination Tolerance:** Never use LLMs to guess Sanskrit slokas or translations. Authentic sources only.
2. **Public Domain Only:** All source texts and commentaries must be copyright-free (e.g., pre-1928 English translations, GRETIL Sanskrit).
3. **Verse Count Assertions:** Every step of the pipeline must assert the exact total number of verses in the chapter. If the count drops by even 1, the build fails.
4. **No UI Bleed:** Commentaries must never mix English text inside a Hindi or Marathi wrapper.

---

## Chapter-by-Chapter Execution Checklist

### [ ] Phase 1: Bronze (Sourcing & Ingestion)
- [ ] Identify Public Domain URLs for the specific chapter (Sanskrit, English Translation, Commentaries).
- [ ] Download raw HTML/TXT into `data/1-bronze/[book-slug]/chapter-[X]/`.
- [ ] Verify manual spot-check of verse 1 and the final verse of the chapter.

### [ ] Phase 2: Silver (Parsing & Normalization)
- [ ] Run parser script to extract raw text into intermediate JSON: `{verse: 1, original: "...", transliteration: "...", english_meaning: "..."}`.
- [ ] Ensure array length exactly matches the accepted scholarly verse count for that chapter.
- [ ] Save to `data/2-silver/[book-slug]/[book-slug]-chapter-[X].json`.

### [ ] Phase 3: Gold (Assembly & Layering)
- [ ] Run builder script to merge the Silver core text with Silver commentaries.
- [ ] Enforce the `3-gold` schema (root verse fields + `layers` array for commentaries).
- [ ] Assert that there are 0 placeholders (e.g., "spiritual principle or aspect").

### [ ] Phase 4: Localization (MLG)
- [ ] Run translation scripts (with rate-limiting/backoff) to generate `translation_hi`, `translation_mr`, `meaning_hi`, `meaning_mr` natively from the Gold English base.
- [ ] Audit the JSON to ensure no English text leaked into the localized fields.

### [ ] Phase 5: Local AI Summarization (AirLLM / Small Model)
- [ ] Pass the Gold JSON through the local small-RAM LLM pipeline to generate a consolidated, simple-language summary of the chapter/shlokas.
- [ ] For chapters > 15 shlokas, limit summary generation to the first 15 shlokas as defined by resource constraints.
- [ ] Inject the `ai_summary` object into the Gold JSON.

### [ ] Phase 6: UI & Layout Verification
- [ ] Load the chapter in the local UI (`/[book-slug]/[chapter]`).
- [ ] Verify responsive grid behaves correctly on mobile and desktop.
- [ ] Verify Vedic Labs sidebar does not collapse or create scroll traps.
- [ ] Verify switching languages strictly updates the translation and meanings without visual bugs.
