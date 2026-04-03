# 🏗️ Vishwa-Vani: Architecture Blueprint

This document outlines the technical foundations, design patterns, and architectural decisions governing the Vishwa-Vani platform.

## 🏛️ System Architecture
Vishwa-Vani is a **Static-First, Data-Heavy** application designed for zero-cost hosting (GitHub Pages) with high-performance scriptural retrieval.

### 1. AI-Enhanced Data Lake (Vedic Lake)
- **JSON Sharding**: Massive books (e.g., Mahabharata) are sharded by chapter: `data/<book-slug>/chapter-<n>.json`.
- **SQLite WASM**: For large-scale search and complex relational queries, we use a client-side SQLite database loaded into a Web Worker.
- **NVF 1.3 (Normalized Vedic Fragment)**: A standardized JSON schema ensuring interoperability between any scripture and the UI.
  - `verse_id`, `original_sanskrit`, `transliteration`, `primary_meaning`.
  - `layers`: Extensible array of commentaries/translations (HI/MR/EN).
- **AI Context Enrichment**: Each verse is enriched with AI-generated metadata including themes, philosophical depth, cross-references, difficulty assessment, and emotional tone analysis.

### 2. Vedic Data Service Layer
- **Centralized Data Access**: `VedicDataService` provides unified access to all scriptural data with AI enrichment.
- **Smart Caching**: Intelligent caching of enriched data to improve performance.
- **UI-Optimized Structure**: Data is structured specifically for optimal rendering in React components.
- **Navigation Intelligence**: Automatic generation of chapter navigation with contextual links.

### 4. AI-Enhanced Data Organization
- **Contextual Intelligence**: Every verse includes AI-generated metadata for themes, philosophical depth, cross-references, and difficulty assessment.
- **Emotional Tone Analysis**: Automatic detection of devotional, ethical, contemplative, or philosophical tones.
- **Reading Time Estimation**: Calculated based on text complexity and length.
- **Complexity Scoring**: Multi-factor assessment including sacred symbols, commentary density, and verse length.
- **Thematic Clustering**: Automatic grouping of verses by core Vedic concepts (Dharma, Karma, Bhakti, Jnana, Yoga).

### 3. Frontend & i18n
- **Next.js 15 (App Router)**: Utilizing Static Site Generation (SSG) for all reading routes.
- **next-intl**: Global state-based language switching between English, Hindi, and Marathi.
- **Immersive 1600px UI**: A wide-canvas layout designed for scholarly research, featuring Knowledge Side-Panels.

## 🛠️ Key Architectural Decisions (ADRs)

### ADR-001: Static Export over Edge Runtime
- **Context**: Need zero-cost hosting on GitHub Pages.
- **Decision**: Avoid dynamic server-side logic; move all intelligence (search, AI summaries) to client-side WASM or build-time pre-processing.

### ADR-002: Sharding vs. Large Blobs
- **Context**: Loading a 10MB JSON for one verse is inefficient.
- **Decision**: Shard all content by Chapter. A single chapter rarely exceeds 500KB, ensuring sub-100ms LCP.

### ADR-003: Sub-grid for Card Consistency
- **Context**: Book cards varied in height due to description length.
- **Decision**: Use CSS `grid-template-rows: subgrid` to ensure title and metadata lines align across cards.

## 🧬 Evolutionary Roadmap
- **WASM Semantic Search**: Local vector embeddings for meaning-based search.
- **Zero-Touch Registry**: Next.js `generateStaticParams` to auto-scan `data/` folder and register new scriptures without code changes.

---
_Reference Docs: [Vision](./vision.md) | [Backlog](./backlog.md)_
