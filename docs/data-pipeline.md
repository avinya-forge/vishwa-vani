# 🗄️ Data Pipeline & Onboarding

Our goal is to systematically digitize all major Vedic texts. We use a strict 3-tier pipeline to ensure the data is perfect before it reaches the UI.

## The 3-Tier Pipeline

1. **Bronze (Raw Ingestion)**
   * Gather raw Sanskrit text or English translations from public domain sources.
   * Save as raw text files in data/1-bronze/.

2. **Silver (Structuring)**
   * Use scripts to clean the text and structure it into basic JSON arrays (Chapter > Verse).
   * Save to data/2-silver/.

3. **Gold (Enrichment)**
   * Apply AI translation where needed.
   * Add multiple commentaries (e.g., Shankara, Ramanuja, Prabhupada).
   * Format strictly to the NVF 1.3 (New Vedic Format) schema.
   * Save to data/3-gold/.

## Rebuilding the Lake
Once the Gold JSON files are created, we run python rebuild_lake.py. This script takes all the JSON files and compiles them into a single, highly optimized SQLite database (public/vedic-lake.db) that the Next.js app queries at runtime.

## Planned Learning Paths
As we gather more books, we will extract specific themes to create learning paths for the UI:
*   **Daily Pooja Path:** Extracted from Stotras and Samskaras.
*   **Festivals & Calendar:** Extracted dynamically from the Puranas.
