# Vishwa-Vani Constitution & Vision

## 🌟 North Star
Building the **Vedic Wikipedia**: A transcendent, multilingual, and friction-free digital sanctuary for exploring Vedic wisdom. Vishwa-Vani must provide an immersive, highly performant, and deeply interconnected experience of Shlokas, Mantras, and Sanskrit definitions across languages—English, Hindi, and Marathi—hosted for free on GitHub Pages.

## 🏔 Ideal State
- **Performance**: Sub-100ms LCP on all text-heavy routes, leveraging Next.js Static Export (SSG).
- **Aesthetic**: Minimalist, culturally resonant design focused on absolute readability (Sans-based Devanagari) and accessibility.
- **Vedic Lake Storage**: Hybrid binary storage (SQLite WASM) for massive scriptures with encrypted blobs to prevent scraping.
- **Normalized Vedic Fragment (NVF)**: An agile schema that allows infinite authors and translations per verse without changing the UI.
- **Security Shield (Vedic Shield Architecture)**: Multi-layered protection including AES-256-GCM data encryption and ShlokaMask Canvas rendering to prevent DOM crawling.
- **Zero-Cost Infrastructure**: Optimized for free hosting providers without sacrificing structural integrity or security.

## ⚖️ Pipeline Laws
1. **Static-First Execution**: Default to Static Generation (`npm run build`). JSON data sharding is used for chapters to keep page loads fast.
2. **Framework Before Data**: The core architecture (routing, i18n, UI scale) must be rock-solid before massive content imports.
3. **Wikified Consistency**: Every scripture follows a uniform interface to ensure a seamless "Wikipedia-style" cross-reference experience.
4. **Adversarial Triad Review**:
    *   **Optimizer**: "Is this JSON sharded? Did we bloat the initial client bundle?"
    *   **Hardener**: "Is the fallback UI graceful for missing translations?"
    *   **Pragmatist**: "Is this overkill for a static site? Can we do this at build time?"
5. **Universal Security (Vedic Shield)**: Even for static sites, implement client-side encryption (WASM/AES) and Canvas-masking to protect proprietary aggregation and prevent bot-crawling.
6. **NVF Agile Fragmenting**: All data must follow the Normalized Vedic Fragment (NVF) schema to allow for infinite multi-author commentary and future AI interpretation.

## 🎯 Definition of Done (DoD)
- Code compiles locally without TS or ESLint errors (`npm run build`).
- Relevant `.md` documentation (vision, backlog, release notes) are synchronized to the current "Vedic Wikipedia" status.
- Version strings are bumped in the README and Release Notes.
- All temporary debugging files (logs, dumps) are removed from the root directory.

---
_Vishwa-Vani: Wisdom for the digital age._
