# 🏗️ Vishwa-Vani: Architecture Blueprint

This document outlines the technical foundations, design patterns, and architectural decisions governing the Vishwa-Vani platform.

## 🏛️ System Architecture
Vishwa-Vani is a **Static-First, Data-Heavy** application designed for zero-cost hosting (GitHub Pages) with high-performance scriptural retrieval.

### 1. Hybrid Data Lake (Vedic Lake)
- **JSON Sharding**: Massive books (e.g., Mahabharata) are sharded by chapter: `data/<book-slug>/chapter-<n>.json`.
- **SQLite WASM**: For large-scale search and complex relational queries, we use a client-side SQLite database loaded into a Web Worker.
- **NVF 1.0 (Normalized Vedic Fragment)**: A standardized JSON schema ensuring interoperability between any scripture and the UI.
  - `verse_id`, `original_sanskrit`, `transliteration`, `primary_meaning`.
  - `layers`: Extensible array of commentaries/translations (HI/MR/EN).

### 2. Vedic Shield (Security Architecture)
- **ShlokaMask**: A canvas-based rendering engine to prevent easy DOM scraping of proprietary aggregated content.
- **AES-256-GCM**: Client-side decryption using WASM for sensitive or early-access datasets.
- **DevTools Prevention**: Script-based blocking of console inspection to safeguard the "Fortress of Wisdom."

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
