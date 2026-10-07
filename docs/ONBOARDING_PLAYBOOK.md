# 🕉️ Vishwa-Vani: Unified Data Onboarding Playbook

This document is the absolute single source of truth for onboarding new texts into the Vishwa-Vani system, maintaining codebase hygiene, ensuring zero placeholders, and integrating texts with the UI.

It incorporates all critical historical learnings, anti-patterns, and guardrails discovered during the scaling of the platform to ensure foolproof execution by AI agents and human developers.

---

## 🚨 CRITICAL HISTORICAL LEARNINGS & GUARDRAILS

1. **The Subagent Hallucination Trap (Data vs. UI)**
   * **Issue:** Agents frequently attempt to "complete" a book by only changing SCRIPTURE_READINESS_SCORES = 100.0 in lib/texts.ts without actually scraping, parsing, or generating the underlying JSON data.
   * **Fix:** You MUST physically generate and verify the JSON files in data/3-gold/ *before* touching UI readiness toggles.

2. **Vercel CI/CD Native Binding Crashes (EBADPLATFORM)**
   * **Issue:** Running standard 
pm install on Windows sometimes strictly locks OS-specific packages (e.g., @swc/core-win32-x64-msvc) in package-lock.json. Vercel’s Linux runners will then crash during build.
   * **Fix:** Never manually install OS-specific SWC bindings. If poisoned, delete package-lock.json and regenerate it cleanly.

3. **OOM (Out-of-Memory) Crashes during AI Generation**
   * **Issue:** Processing thousands of verses (e.g., Mahabharata) simultaneously through local LLMs crashes the server RAM.
   * **Fix:** Always use queue-based asynchronous workers (e.g., syncio.Queue in Python) to throttle and manage translation/summarization pipelines.

4. **UI Test Drift & Pipeline Blocking**
   * **Issue:** Overhauling the UI (e.g., adopting Apple Glassmorphism and removing legacy buttons) causes older Jest tests to fail, blocking deployment.
   * **Fix:** If a UI component is fundamentally redesigned, immediately update its corresponding .test.tsx queries. If a fast CI unblock is required, temporarily rename the failing test file to .test.tsx.obsolete.

5. **TypeScript Strictness in Next.js APIs**
   * **Issue:** AI Model pipelines (like @xenova/transformers) often lack strict typings, causing Next.js API routes to fail 
pm run build.
   * **Fix:** Safely utilize /* eslint-disable @typescript-eslint/no-explicit-any */ and structured 	ry-catch blocks at the top of edge-case AI routes (e.g., pp/api/lake/route.ts) to preserve build integrity.

---

## 🏗️ THE 10-STEP ONBOARDING PROCESS

### 0. Backlog & Triage (Start Here)
*   **Action:** Update docs/backlog.md with explicit EPICs for the target book. Break it down into granular tasks (Bronze Acquisition, Silver Parsing, Gold Compilation, MLG Generation, UI Integration, QA Audit).
*   **Rule:** Never start coding or executing subagents without explicit tasks tracked in the backlog.

### 1. Bronze Phase (Raw Acquisition)
*   **Rule:** NO manually copy-pasted data. Every book must have a reproducible python acquisition script (scripts/scraping/ingest_[book]_bronze.py).
*   **Action:** Verify the source is authentic and strictly **Public Domain (no copyright violations)**.
*   **Action:** Target the absolute best scholars (e.g., Dnyaneshwar, Ramanuja).
*   **Action:** Run the script and deposit raw .json, .txt, or .html into data/1-bronze/.

### 2. Silver Phase (Structural Normalization)
*   **Rule:** Ensure strict JSON structures matching the VedicText interfaces.
*   **Action:** Write regex/BS4 scripts (scripts/data/parse_[book]_silver.py) to clean the Bronze data.
*   **Action:** Map fields precisely to erse, sanskrit, 	ransliteration, and english.
*   **Action:** Save outputs to data/2-silver/.

### 3. Gold Phase (Compilation & Layering)
*   **Rule:** No mixing of English text in regional language wrappers. No missing verse numbers.
*   **Action:** Run the compiler (scripts/data/compile_[book]_gold.py) to structure the Silver data into data/3-gold/.
*   **Action:** Append regional commentaries securely under the layers array.

### 4. Multi-Language AI Pass (MLG)
*   **Rule:** Execute locally using the queue-worker to avoid API rate limits and OOM crashes.
*   **Action:** Feed the Gold English baseline into the LLM worker.
*   **Action:** Generate 	ranslation_hi, 	ranslation_mr, meaning_hi, meaning_mr (Target: English, Hindi, Marathi minimum).
*   **Action:** Append the generated i_summary for the chapter.

### 5. QA Audit & NLP Verification Loop
*   **Rule:** We strictly forbid placeholders (e.g., [Pending Translation], [TBD]) in production.
*   **Rule:** Every Shloka MUST correctly link to its English translation, and semantic meaning must match the Sanskrit base.
*   **Action:** Run python core/brain/shloka_auditor.py on the 3-gold JSON files to verify meaning matching, hunt for empty layers, and auto-correct semantic drift.
*   **Rule:** We strictly forbid placeholders (e.g., [Pending Translation], [TBD]) in production.
*   **Action:** Run the Bug Hunter / QA auditor script on the 3-gold JSON files to aggressively scan for missing layers, incorrect tags, or placeholders.
*   **Action:** If placeholders exist, the book is NOT done. Route back to Step 4.

### 6. Search Integration & NLP Indexing
*   **Rule:** Every completed book MUST be natively indexed in the Vedic-Lake for semantic search.
*   **Action:** Ensure the text boundaries are mapped for the local NLP model so the platform can answer natural language user queries with accurate 1-line summaries.

### 7. UI Integration, Counters & Toggling
*   **Rule:** The UI must reflect exactly what is physically available in the database.
*   **Action:** Open lib/texts.ts and set SCRIPTURE_READINESS_SCORES['[book-slug]'] = 100.0.
*   **Action:** Update Global Shloka Counters in the UI state so that animations dynamically reflect the newly ingested counts.
*   **Rule:** Only execute this step if physical files exist in 3-gold/ and Step 5 passed.
*   **Action:** Open lib/texts.ts and set SCRIPTURE_READINESS_SCORES['[book-slug]'] = 100.0.
*   **Action:** This globally bypasses the isStrictDemoGatingEnabled() check and instantly publishes the book to the frontend UI.

### 8. Vedic Labs Ideation
*   **Rule:** Every book must be evaluated for interactive, experiential learning integration.
*   **Action:** Analyze the core philosophy of the book and design an interactive 'Vedic Lab' (e.g., a cosmic timeline for Vishnu Purana, a meditation timer for Yoga Sutras, or a chanting trainer).

### 9. Cleanup & Codebase Maintenance (Mandatory)
*   **Rule:** The codebase must remain completely pristine after every onboarding sprint.
*   **Action:** Delete any temporary scratch scripts in scripts/scraping/ or the root directory.
*   **Action:** Remove legacy or duplicate .md documentation files to maintain this playbook as the SSOT (Single Source of Truth).
*   **Action:** Run 
pm run lint and 
pm run test (or 
px tsc --noEmit) locally to verify zero regressions.
*   **Action:** Update docs/status_report.md with new completion metrics.
*   **Action:** Commit cleanly with explicit scopes (e.g., eat(rigveda): completed end-to-end onboarding).

