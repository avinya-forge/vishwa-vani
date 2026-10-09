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

## Rebuilding the Lake & Syncing to Edge
Once the Gold JSON files are created, we run `python scripts/vishwa.py rebuild` to generate the local SQLite staging database. 
Finally, we run `node scripts/sync_turso.js` to batch-insert all updated rows into our Turso Edge Database. The Next.js React Server Components strictly query this remote Turso database at runtime to bypass Vercel serverless size limits.