# Vishwa-Vani Core Architecture

This directory houses the three primary processing and intelligence engines of the Vishwa-Vani platform.

## 1. 🧠 Brain (`core/brain/`)
The **Brain** is the decision-making and analysis center.
- **Components:** Local LLMs, AI integrations (e.g., AirLLM, Xenova/Transformers, lightweight SLMs).
- **Purpose:** 
  - NLP semantic search and intelligent synthesis.
  - Generating dynamic articles, astrological insights (Jyotish), and deep dives into the shastras.
  - Making automated QA and auditing decisions based on incoming data.

## 2. ⚙️ Data Engine (`core/data-engine/`)
The **Data Engine** handles the end-to-end automated pipeline for scriptures.
- **Bronze:** Raw data gathering and scraping.
- **Silver:** Regex structural normalization and cleaning.
- **Gold:** Highly structured, layered JSON compilation ready for the UI and semantic indexing.
- **Automation:** Scripts here operate in a loop to systematically gather knowledge without manual intervention.

## 3. 🌐 UI (`app/`, `components/`)
The **UI** is the seamless representation layer.
- **Components:** Next.js App Router, Tailwind CSS, Glassmorphism design system.
- **Purpose:** Present the deeply structured knowledge from the Gold tier and the dynamic insights from the Brain in an intuitive, premium interface.
