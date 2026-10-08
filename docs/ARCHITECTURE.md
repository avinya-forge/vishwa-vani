# 🏗️ Vishwa-Vani: Architecture & Vision

Vishwa-Vani is a high-performance platform designed to make ancient Vedic literature accessible, searchable, and easy to understand. 

The project is divided into three simple, core pillars:

## 1. 🧠 The Brain (core/brain/)
This is the intelligence layer. It uses lightweight, local AI models (like @xenova/transformers) to understand user questions, search the scriptures, and provide simple, synthesized answers without relying on expensive cloud APIs.

## 2. ⚙️ Data Engines (core/data-engine/)
This is our data processing pipeline. It autonomously gathers ancient texts and converts them into structured JSON data. It operates in three steps:
*   **Bronze:** Raw text gathering from public domain sources.
*   **Silver:** Cleaning and organizing the text structure.
*   **Gold:** Finalizing the data with English translations and multiple philosophical commentaries.
*   **Storage:** The final Gold data is stored in data/3-gold/ and compiled into a fast SQLite database (public/vedic-lake.db).

## 3. 🖥️ User Interface (pp/, components/)
This is the Next.js frontend. It is designed to be extremely fast, visually clean (using Apple Glassmorphism), and lightweight. It includes features like reading views, search interfaces, and interactive learning modules (Vedic Labs).

---
**Core Rule:** Keep things simple. Do not mix data gathering code with UI code, and do not over-complicate the AI models.
