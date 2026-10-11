# 🕉️ Vishwa-Vani: Vision & Architecture Vision

## Core Vision
To digitize, normalize, and preserve 18 canonical scriptures (~291,000+ verses) across 4 classical languages (Sanskrit, English, Hindi, Marathi) with zero hallucinations and authentic multi-scholar commentary. Provide a high-performance, open-source digital sanctuary for exploring the vast depth of Vedic literature, philosophy, and empirical heritage.

## The 4-Tier Scriptural Maturity Model
1. **Bronze Tier (Raw Harvest)**: Systematic ingestion of public-domain Sanskrit editions and authoritative translations (BORI, Nirnaya Sagar, Sacred Books of the East, Gita Press).
2. **Silver Tier (Schema Normalization)**: Automated parsing into normalized NVF 1.3 JSON shards with standard Devanagari Unicode, IAST transliteration, and chapter/verse keys.
3. **Gold Tier (Scholarly Authentication & Multilingual Commentary)**: 100% complete coverage with zero placeholders, verified word meanings, and multi-lineage commentaries (Shankara, Ramanuja, Madhva, Prabhupada, Dnyaneshwar).
4. **Diamond Tier (💎 Empirical Knowledge Graph & Multi-Granularity Exegesis)**:
   - **4-Tier Adaptive Summaries**: Very Short (Sūtra), Short (Tattva Saṁgraha), Long (Chapter Exegesis), and Very Long (Master Exegesis) with dynamic word-count reading time calculation.
   - **Vaidika Vijñāna (Scientific Knowledge Extraction)**: Cross-scriptural extraction of empirical facts across Astronomy (*Khagola*), Ayurveda & Health (*Śārīra & Cikitsā*), Cognitive Psychology (*Manovijñāna*), and Cosmology & Physics (*Padārtha Vijñāna*).

## Technical Architecture
- **Framework**: Next.js 16 App Router (React 19, Turbopack, Server Components).
- **Database**: SQLite Edge Database via `@libsql/client` (Turso LibSQL local and edge replication).
- **Edge AI & Search**: In-Browser WebGPU WebLLM (Qwen-2.5-0.5B / SmolLM-135M) for zero-server compute load, paired with `@xenova/transformers` for 768-dimensional local vector embeddings.
- **Static Ingestion Pre-Bake**: Pre-computed multi-tier chapter digests and knowledge graphs for sub-50ms edge rendering and 100% citation reliability.
- **Strict Quality Gates**: 100% TypeScript type safety, ESLint zero-warning policy, and comprehensive Jest test coverage (>95%).
