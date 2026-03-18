# Vishwa-Vani Constitution & Vision

## 🌟 North Star
Building the **Vedic Wikipedia**: A transcendent, multilingual, and friction-free digital sanctuary for exploring Vedic wisdom. Vishwa-Vani must provide an immersive, highly performant, and deeply interconnected experience of Shlokas, Mantras, and Sanskrit definitions across languages—English, Hindi, and Marathi—hosted for free on GitHub Pages.

## 🏔 Ideal State
- **Performance**: Sub-100ms LCP on all text-heavy routes, leveraging Next.js Static Export (SSG).
- **Aesthetic**: Minimalist, culturally resonant design focused on absolute readability (Sans-based Devanagari) and accessibility.
- **Data Integrity**: Absolute SSoT mapping between English transliterations, Devanagari script, and localized meanings via standardized JSON schemas.
- **Zero-Cost Infrastructure**: Optimized for free hosting providers without sacrificing structural integrity or security.

## ⚖️ Pipeline Laws
1. **Static-First Execution**: Default to Static Generation (`npm run build`). JSON data sharding is used for chapters to keep page loads fast.
2. **Framework Before Data**: The core architecture (routing, i18n, UI scale) must be rock-solid before massive content imports.
3. **Wikified Consistency**: Every scripture follows a uniform interface to ensure a seamless "Wikipedia-style" cross-reference experience.
4. **Adversarial Triad Review**:
    *   **Optimizer**: "Is this JSON sharded? Did we bloat the initial client bundle?"
    *   **Hardener**: "Is the fallback UI graceful for missing translations?"
    *   **Pragmatist**: "Is this overkill for a static site? Can we do this at build time?"
5. **Universal Security**: Even for static sites, implement client-side encryption or obfuscation where essential to protect proprietary aggregation.

## 🎯 Definition of Done (DoD)
- Code compiles locally without TS or ESLint errors (`npm run build`).
- Relevant `.md` documentation (vision, backlog, release notes) are synchronized to the current "Vedic Wikipedia" status.
- Version strings are bumped in the README and Release Notes.
- All temporary debugging files (logs, dumps) are removed from the root directory.

---
_Vishwa-Vani: Wisdom for the digital age._
