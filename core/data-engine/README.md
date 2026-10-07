# ⚙️ Vishwa-Vani Autonomous Data Engine

**Core Mandate:** Continuously discover, parse, synthesize, and onboard Vedic literature completely autonomously, adhering to strict multi-layer JSON schemas (Bronze -> Silver -> Gold).

## 1. Trifold Ingestion Pipeline Rules
Every execution of the data engine must strictly follow:
1. **Bronze Rule (Acquisition):** Sourced ONLY from verified public domain repositories. Scraped data is cached in `data/1-bronze/{text-slug}/`.
2. **Silver Rule (Normalization):** Regex parsing normalizes the text into `verse`, `sanskrit`, and `transliteration` fields.
3. **Gold Rule (Layered Synthesis):** 
   - Base translation is fetched.
   - At least **2 copyright-free commentaries** are mapped per verse.
   - Local LLM queue generates `translation_hi`, `translation_mr`, and an `ai_summary` for the chapter.

## 2. Integrity & QA Protocol
- The `shloka_auditor.py` acts as the final gate. No book passes to `100.0%` readiness until the auditor verifies that the English translation semantically matches the Sanskrit base.
- Empty layers or `[Pending Translation]` tags explicitly block the book from entering the UI.

## 3. Subagent Orchestration
- The Data Engine is powered by parallel subagents executing the `DATA-GITA`, `DATA-MBH`, `DATA-BHAG` routines. 
- Agents are strictly isolated to prevent out-of-memory (OOM) crashes during generation.
