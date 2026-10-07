# Vishwa-Vani: Global Architecture

The Vishwa-Vani ecosystem is strictly organized into **three primary categories** to ensure seamless automation, clean separation of concerns, and intelligent data processing. 

## 1. 🧠 The Brain (`core/brain/`)
The absolute center of operations. This is our **AI Analysis Model** and decision-making JVM (Just-in-Time Virtual Mind).
*   **Role:** Processes natural language, cross-references texts, and generates high-level articles (e.g., Jyotish/Astrology, Shastra deep-dives).
*   **Stack:** Lightweight local models (AirLLM, Xenova/Transformers, quantized SLMs). 
*   **Integration:** Ingests Gold-tier data from the Data Engine and serves real-time synthesis to the UI.

## 2. ⚙️ Data Engines (`core/data-engine/`)
The autonomous, relentless data pipeline.
*   **Role:** Gathers, cleans, and structures raw scriptural text into highly organized JSON arrays.
*   **Pipeline Tiers:**
    1.  **Bronze (Scraping):** Raw HTML/Text gathering.
    2.  **Silver (Parsing):** Regex normalization, structural validation.
    3.  **Gold (Compilation):** AI-translation passes, layers, commentary mappings.
*   **Output:** Pristine `.json` files in `data/3-gold/` and SQLite sync to `public/vedic-lake.db`.

## 3. 🌐 UI Layer (`app/`, `components/`)
The seamless representation layer.
*   **Role:** Exposes the vast, structured knowledge base and AI brain to the end-user via a premium Apple Glassmorphism interface.
*   **Stack:** Next.js 14+ (App Router), Tailwind CSS, React.
*   **Components:** Search interfaces (hitting `/api/lake`), Vedic Labs (interactive learning), and the Shloka Study Client.

---
**Development Rule:** Every new feature MUST cleanly map to one of these three pillars. Do not mix Data Engine scraping logic with the Brain's inference logic, or the UI's rendering logic.
