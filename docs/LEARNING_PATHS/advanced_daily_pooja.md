# Advanced Daily Pooja (Kavishwar/Abhyankar Tradition)

**Status:** Programmatically defined based on current 3-gold repository matches.
**Objective:** Emulate the rigorous, powerful mantra sequences prescribed by stalwarts like Kavishwar Dutta Maharaj and Shankar Abhyankar.

## 1. Purvangam (Preparatory)
*   **Achamana & Sankalpa:** Sourced from `samskaras` (Chapter 1).
*   **Guru Vandana:** Sourced from `stotras` -> *Gita Dhyana Shlokas*.

## 2. Pradhana Pooja (Main Mantras)
*   **Agni Sukta:** Sourced from `rigveda` (Mandala 1, Sukta 1).
*   **Purusha Sukta:** *Pending Rigveda Mandala 10 ingestion.*
*   **Shri Sukta:** *Pending Rigveda Khilani ingestion.*
*   **Rudram:** *Pending Krishna Yajurveda (Taittiriya Samhita) ingestion.* (Current Yajurveda is Shukla Chapter 1).

## 3. Sahasranama & Stotras (Recitation)
*   **Vishnu Sahasranama:** Sourced from `mahabharata` (Anushasana Parva - Parva 13).
*   **Nirvana Shatkam:** Sourced from `stotras`.

## UI Integration Plan
The frontend `app/paths/daily-pooja` will dynamically query `vedic-lake.db` for these specific verse IDs and construct a seamless scrolling/chanting UI.
