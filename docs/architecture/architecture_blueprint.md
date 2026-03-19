# 🏛️ Vishwa-Vani Architecture Blueprint: The Digital Sanctuary

## 📐 1. Three-Layer Scaling Strategy
To handle millions of verses and multi-author commentaries with high agility, we move from "Static JSON" to a **Hybrid Edge-Lake** model.

### Layer A: Immersive UI (Static Edge)
- **Tech**: Next.js (Static Export), Tailwind 4.0, WASM Decryptor.
- **Role**: High-performance rendering, mobile-first experience, state-based i18n.
- **Security**: Data is never stored in plain text in the repo; it is hydrated from the "Lake" or "Middleware".

### Layer B: Middleware Proxy (The Gatekeeper)
- **Tech**: Go or Node.js (Serverless/Edge Functions).
- **Role**: Rate-limiting, API Monetization (Stripe/Crypto), Bot Detection via Fingerprinting.
- **Analytics**: Tracks "Verse Popularity" and user learning paths for AI fine-tuning.

### Layer C: The Vedic Lake (Storage)
- **Tech**: Distributed SQLite (sharded by topic: Gita-Lake, Purana-Lake, Veda-Lake).
- **Format**: **Normalized Vedic Fragment (NVF)**.
- **NVF Schema**:
  ```json
  {
    "id": "bg_1_1",
    "scriptures": { "sanskrit": "...", "translit": "..." },
    "layers": [
      { "author": "sankar", "lang": "hi", "type": "commentary", "content": "..." },
      { "author": "abhyankar", "lang": "mr", "type": "analysis", "content": "..." }
    ],
    "ai_metadata": { "topics": ["duty", "dharma"], "viz_type": "lineage_chart" }
  }
  ```

---

## 🛡️ 2. Security & Anti-Crawling Design
"Securing the Wisdom" requires moving beyond standard web protection.

1. **WASM-Edge Decryption**: 
   - Data stored in the public `lake` files is encrypted (AES-256). 
   - A proprietary WASM module (C++/Rust) handles decryption in the browser. 
   - Standard scrapers see encrypted binary blobs; deep inspection is required to extract text.
2. **Honeypot Verses**:
   - Inject "Ghost Verses" only visible to bots (detected via CSS hidden fields). If a IP hits a ghost verse, it is globally blacklisted in Middleware Layer B.
3. **Canvas-Masking (Optional)**:
   - For premium commentaries, render text on a `<canvas>` instead of DOM strings to prevent text selection and basic DOM crawling.

---

## 🤖 3. AI Interpretation & Runtime Visualization
Data should not just be read; it should be *interpreted*.

- **AI Tagger**: A build-time process that runs verses through an LLM to generate `ai_metadata`.
- **Dynamic Component Mounting**: If a verse contains `viz_type: astro_chart`, the `StudyClient` dynamically lazy-loads a `VedicAstro` component.
- **Run-time Insight**: Use WebLLM (local) to allow users to ask questions like "Summarize all references to 'Agni' across these 3 Puranas" without hitting a server.

---

## 💰 4. API & Monetization Roadmap
1. **Free Tier**: First 10,000 requests/month (Public Library).
2. **Professional Tier**: High-speed access for researchers/apps ($0.001 per call).
3. **Data-as-a-Service**: Verified, OCR-corrected Devanagari datasets for NLP training.

---

## ✅ 5. Design Decisions (ADRs)

| ADR ID | Decision | Rationale |
| :--- | :--- | :--- |
| **ADR-001** | **Hybrid SQLite WASM** | Allows GBs of data to stay "Static" while providing SQL query power in-browser. |
| **ADR-002** | **WASM Decryption** | Prevents easy crawling and protects proprietary data organization. |
| **ADR-003** | **Normalized Fragment Schema** | Ensures a single UI component can render *any* scripture (Gita or Veda) without code changes. |
| **ADR-004** | **State-based i18n** | Better UX than URL-prefixes; avoids search engine duplication of content versions. |
| **ADR-005** | **Middleware Proxy** | Essential for future monetization and advanced security that GitHub Pages cannot provide. |

---
_Blueprint v1.1 | March 2026_
