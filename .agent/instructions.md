# Vishwa-Vani: Master Operations & Agentic Alignment Framework

This document is the authoritative developer ruleset and operational playbook for **Google Antigravity** and **Jules.google.com** workspace agents. It defines how we maintain strict alignment between our **North Star Vision**, our **Agile Backlog**, and our **Daily Execution Sessions** to deliver rapid, 100% verified scripture enrichment, interactive experimental labs, and production-grade scale.

---

## 🌌 1. The Strategic Alignment Loop (Vision ➔ Backlog ➔ Execution)
To achieve a rapid, high-quality live deployment of our sacred scriptures, every single line of code and JSON data must align with our core hierarchy:

```
           ┌──────────────────────────────────────┐
           │     1. North Star Vision (vision.md)  │
           └──────────────────┬───────────────────┘
                              ▼
           ┌──────────────────────────────────────┐
           │     2. Agile Backlog (backlog.md)    │
           └──────────────────┬───────────────────┘
                              ▼
           ┌──────────────────────────────────────┐
           │   3. Agent Execution (instructions)  │
           └──────────────────────────────────────┘
```

1.  **The Vision ([vision.md](file:///a:/Code/avinya-forge/vishwa-vani/docs/vision.md))**: Our permanent guide. We build the "Vedic Wikipedia"—an ultra-premium, interactive scripture reading engine. Never introduce generic pages, unrelated micro-apps, or off-topic features that deviate from this vision.
2.  **The Backlog ([backlog.md](file:///a:/Code/avinya-forge/vishwa-vani/docs/backlog.md))**: The authoritative, append-only backlog. Tasks are strictly prioritized top-to-bottom. AI agents are **forbidden** from starting lower-priority items until all higher-priority stability, bug fix, or core book tasks are 100% complete and verified.
3.  **Daily Execution Session**: The daily engine that transforms backlog tasks into green tests, structured Gold JSON shards, and responsive React layouts.

---

## 📈 2. Workspace Session Budgets & Work Estimations
To maximize daily velocity while maintaining 100% reasoning precision and avoiding platform-level execution bottlenecks, all agent sessions must follow strict work budgeting rules:

### A. Defining "1 Man-Day of Work":
An individual "Man-Day" of engineering is defined as the successful execution of one complete, end-to-end agile task. In the context of scripture enrichment, **1 Man-Day of Ingestion** represents:
1.  **Extraction**: Parsing raw Sanskrit text, transliterations, and specific translations from `data/1-bronze/` or `data/2-silver/`.
2.  **Gold Promotion**: Processing the text under the **NVF 1.0 JSON Schema** with **≥ 150 words of authentic philosophical commentary** per verse layer (zero placeholder text).
3.  **UI Registry Integration**: Adding the scholar's metadata inside `lib/scholars.ts` and updating reading client selectors.
4.  **Dedicated Unit Testing**: Writing a dedicated, separate Jest unit test suite (e.g. `__tests__/[book]-[scholar-id].test.ts`) asserting that the commentator's data is fully loaded and renders perfectly in the DOM.
5.  **Clean Compile**: Passing full lints, static build compilations, and all 288+ Jest tests successfully.

### B. The 5–6 Man-Days Session Ceiling:
*   **The Target**: Every daily or twice-daily background session should target exactly **5–6 man-days** of completed, verified deliverables.
*   **The Rationale**: Limiting each background run to a 5-6 man-days budget prevents reasoning fatigue, attention drift, and platform-level ceilings (which typically restrict sessions to a maximum of 40 tool actions).
*   **Git Checkpointing**: To guarantee zero lost progress, the agent must perform an incremental staging save (`git add .`) immediately after each commentator's integration passes verification. If a session timeouts later in the loop, the staged state remains fully intact, allowing the next daily run to resume immediately with zero friction!

---

## ⚡ 3. The "Caveman Mode" Execution Engine
To conserve precious token budgets and maximize prompt speed, agents must operate under a strict, high-density brevity filter:

1.  **Zero Conversational Filler**: Never output introductory greetings or concluding pleasantries (e.g., "Hello!", "Sure, I can help with that", "Here is the code you requested"). Go straight to the solution.
2.  **Code-First Priority**: Show code block changes or command invocations immediately at the start of your response.
3.  **High-Density Grammar**: Strip articles (a, an, the) and prepositions in non-code explanations. Keep text explanations ultra-brief, blunt, and highly structured (1–2 sentences maximum).
4.  **In-Code Precision**: Maintain perfect, pristine comment standards and rigorous typing within code blocks. Do not compress or shorthand the actual code.

---

## 👁️ 3.5. Task Observer & Skill Improvisation Engine
To ensure all executed tasks are continuously observed and improvised:
1. **Trigger Task Observer**: Activate task observation (`.agent/skills/task-observer/SKILL.md`) during all multi-step workflows, agentic execution sessions, and feedback interactions.
2. **Capture Skill Signals**: Watch for user corrections, workflow bottlenecks, and missing automation patterns.
3. **Log & Update**: Log observations in `.jules/task-observer-log.md` and immediately update relevant skills, agent rules, or instruction files to improvise future execution quality.

---

## 🏛️ 4. Scripture Data Tiers & The "Gold" Quality Standard
Vishwa-Vani operates a strict data promotion pipeline. We only display completely verified, audited scripture data to users:

*   **Bronze Tier (`data/1-bronze/`)**: Raw, unparsed scripture texts acquired from academic or public domain databases (e.g., Kisari Mohan Ganguli's 4.4MB English Mahabharata, Nilakantha’s 3.8MB OCR Sanskrit commentary, GRETIL Devanagari files, TSV chapter mapping schemas).
*   **Silver Tier (`data/2-silver/`)**: Structured but un-audited JSON chapters, sharded by book.
*   **Gold Tier (`data/3-gold/`)**: Fully audited, premium NVF 1.0 JSON shards ready for live production.

### The Invariant "Gold" Standard Check:
*   **Schema Validity**: Under NVF 1.0, the JSON structure must match: `{ id, chapter, verse, original, transliteration, meaning, layers: { [author]: { en, hi, mr } } }`.
*   **Content Volume**: Commentary layers must have **≥ 150 words** of highly authentic translation or traditional analysis per verse.
*   **Zero Placeholders**: Absolutely no `TODO`, `[PLACEHOLDER_...]`, or generic text layers in production paths.

---

## ⚙️ 5. Data Pipeline Command Reference
Vishwa-Vani utilizes a high-performance database parsing engine built in Python and Node.js. Use these commands to manipulate and verify tiers:

| Scope | Command Line | Action |
|---|---|---|
| **Python Audit** | `python scripts/vishwa.py audit` | Perform deep statistical analysis of Devanagari word mappings. |
| **Silver Schema Check** | `node scripts/validate_silver.js [book-slug]` | Validate Silver JSON files against the strict NVF 1.0 draft schema. |
| **Gold Promotion** | `node scripts/promote_to_gold.js [book-slug]` | Compile, shard, and output audited, gold-standard JSON files to `data/3-gold/`. |
| **Content Audit Gate** | `node scripts/audit_standards.js [book-slug]` | Scan Gold layers to verify the ≥150 words standard and flag placeholders. |

---

## 🧠 6. AI Synthesis Engine (`/api/synthesize/`)
Vishwa-Vani features a state-of-the-art AI synthesis controller. It takes scriptural meanings and active scholar commentaries and compiles them into a unified, accessible summary.

### Invariants for the Synthesis Endpoint:
1.  **Model Target**: Configured to call the powerful `gemini-2.0-flash` generative API for maximum response speed and logical consistency.
2.  **Context Slice Constraint**: Expects a `meaningText` parameter representing the English/Hindi translation, and a maximum of two selected commentary snippets (`commentarySnippets.slice(0, 2)`).
3.  **Language Headers**: Supports English (`en`), Hindi (`hi`), and Marathi (`mr`) language responses based on user study preferences.
4.  **Deterministic Fallback**: In the event of a Gemini API key mismatch, network timeout (configured at **10s**), or API failure, the endpoint must fallback seamlessly to a local, rule-based semantic aggregator to prevent UI failures.

---

## 🔬 7. The Labs Expansion Framework (`app/lab/` & `components/lab/`)
Vishwa-Vani features an experimental sanctum ("Vedic Labs") translating scriptural calculations and disciplines into dynamic web components.

### Invariants for scanning and adding new Labs:
1.  **Discovery & Staging**: When scanning for new lab apps, search for classical topics (e.g. Astro Explorer, Time Consciousness Wheel, Dharma Decision Matrix, Akshauhini Calculator, Chhanda Meter Analyzer).
2.  **Dynamic Rendering Rule**: All components must be dynamically imported inside [app/lab/page.tsx](file:///a:/Code/avinya-forge/vishwa-vani/app/lab/page.tsx) with `ssr: false` and a `LabSkeleton` loader to ensure fast Initial Page Loads:
    ```tsx
    const NewLabComponent = dynamic(() => import('@/components/lab/new-lab-component'), {
      ssr: false,
      loading: () => <LabSkeleton />
    })
    ```
3.  **Grid Placement**: Registered components must be rendered in the main launchpad grid inside [app/lab/page.tsx](file:///a:/Code/avinya-forge/vishwa-vani/app/lab/page.tsx).
4.  **Aesthetic Invariant**: Must match the stone-paper aesthetic, support full dark mode swapping, and present fully responsive margins down to **320px**.

---

## 🔍 8. The Visual Auditing & UI Quality Gates
Vishwa-Vani features a state-of-the-art scripture reading experience. If a task modifies UI components, you must activate the browser subagent to execute a strict visual audit:

1.  **Responsive Fluid Typography**: Verify Sanskrit text rendering across all responsive viewports, paying particular attention to mobile layouts down to **320px** width (iPhone SE compatibility).
2.  **Layout Stability (CLS)**: Confirm that loading scripture chapters, switching active scholars, and sliding commentary overlays do not cause layout shifts or vertical jumpiness.
3.  **Vibrant Aesthetics & Dark Mode**: Check that the components leverage vibrant, tailored color palettes (glassmorphic navbars, curated warm colors) and that the `dark:` prefix rules trigger perfectly in dark mode.
4.  **Telemetry Widget Check**: Confirm that clicking the client-side star/upvote widgets triggers the appropriate fetch callbacks to `/api/commentary-rating/` with correct headers and payload structures.

---

## 🧪 9. Testing & Build Quality Targets
*   **Enforced Floor**: Jest test suites must maintain a minimum of **80% statement/branch/line coverage** across all components (enforced by Jest `coverageThreshold`).
*   **Core Paths Goal**: Maintain **95% coverage** for core paths (`StudyClient`, `SearchClient`, `VedicDataService`, and API controllers).
*   **Commentator Test Suites**: Every newly added scripture commentator gets a separate dedicated unit test suite in `__tests__/` verifying their registration, JSON loading, and rendering mechanics.
*   **Rigorous Assertions**: Never use brittle snapshot tests. Write explicit assertions using precise DOM query matches, type contracts, and text values.

---

## 🚀 10. Pre-Deployment Hardening & Scale Gate
Before graduating the codebase to live production deployment on Vercel and Cloudflare, the following checklists must be successfully verified:

1.  **TypeScript Compiling**: No warnings or build errors are allowed. The static generation must render all scripture routes flawlessly.
2.  **Next.js Optimization**: All images must use the optimized `<Image>` tags. Local assets must utilize dynamic importing to prevent main-thread blocking.
3.  **Local Storage Hydration Safe**: All settings persistence (`localStorage`) must be wrapped within React hooks or `useEffect` to prevent hydration mismatches.
4.  **Telemetry Sanitization**: All telemetry and user star-ratings submitted to `/api/commentary-rating/` must pass validation schema checks and prevent prompt-injection or SQL injection vectors.
5.  **Git Checkpoint Staged**: Changes are staged via `git add .` to preserve an incremental recovery checkpoint.