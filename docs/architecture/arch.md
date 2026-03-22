# Vishwa-Vani: The Vedic Wikipedia System Design

## 🔬 Core Architecture Overview
Vishwa-Vani is a **Static-First Multilingual Encyclopedia** built on Next.js 15. The system is designed to provide ultra-fast access to Vedic texts for global users while maintaining $0 implementation cost for hosting (using GitHub Pages).

### 📐 Key Components

1.  **Vedic Registry (lib/texts.ts)**:
    - The **Single Source of Truth (SSoT)** for the entire library metadata.
    - Contains text slugs, chapter titles (localized in EN, HI, MR), total counts, and availability status.
    - Used by `generateStaticParams` to build every localized page at compile time.

2.  **Multilingual Routing (next-intl)**:
    - Implementation of locale-based subpaths: `/`, `/hi`, `/mr`.
    - Localized message dictionaries in `/messages/*.json` for UI labels.
    - SSR-compatible `setRequestLocale` pattern for static exporting.

3.  **Data Sharding (data/*.json)**:
    - Scriptures are split into **atomic JSON shards** by chapter (e.g., `bhagavad_gita_chapter_1.json`).
    - This allows for incremental updates and keeps per-page data payload small even as the library grows to millions of verses.
    - Format: Standardized `GitaVerse` interface (extends to all future texts).

### 🗺️ System Data Flow
1.  **Build Time**: 
    - `getAllTextChapterPaths()` generates a manifest of all valid pages.
    - `StudyChapterPage` reads the localized chapter JSON from the filesystem.
    - Next.js exports thousands of static `.html` files for every combination of text, chapter, and language.
2.  **Runtime**:
    - User navigates to a static route.
    - `StudyClient` hydrates and applies user preferences (preferred commentary, text size).
    - `localStorage` persists user settings across sessions without a database.

### 🏁 Performance Targets
- **LCP**: < 300ms (Static hydration).
- **Bundle Size**: Optimized by avoiding large client-side data blobs; only the current chapter's JSON is server-rendered into the static HTML.
- **Hosting**: 100% Statics compatible (GitHub Pages, Vercel, Netlify).

---
_Vishwa-Vani: Design for Eternity._
