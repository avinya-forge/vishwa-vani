# Vishwa Vani — Claude Project Architecture Memory

## Project Summary
Next.js 16 App Router project serving Sanskrit scripture (Mahabharata, Bhagavad Gita) with transliteration, layered commentary, and AI synthesis. TypeScript strict mode throughout.

## 🤖 Agentic Roles & Responsibilities

Vishwa-Vani follows a strict multi-agent separation of concerns:

### 🧠 Claude (The Architect & Planner)
Claude is solely responsible for **Architectural Blueprinting & Planning**. 
- **Domain**: `docs/vision.md`, `docs/backlog.md`, `docs/release-notes.md`, `docs/blueprint.md`, and high-level structural decisions.
- **Rules**: Claude maps out the roadmap, structures the milestones, governs the SDLC rules, and analyzes feature feasibility. Claude **does not write feature code**.

### ⚡ Jules & Antigravity (The Execution Agents)
Jules and Antigravity are responsible for **Implementation & Code Execution**.
- **Domain**: All `/app`, `/components`, `/lib`, `/data`, `/scripts`, and `__tests__` directories.
- **Rules**: They pick up the exact tasks mapped out in `docs/backlog.md` by Claude, implement them according to the `docs/standards.md`, run tests, and commit code. 

## Key Architecture
- **NVF (Normalized Vedic Fragment)** — core data schema: `{ id, original, transliteration, layers[] }`
- **VedicDataService** — singleton with in-memory cache; source of truth for chapter data
- **VEDIC_LABS_REGISTRY** — micro-apps mapped to books/chapters/topics (`lib/vedic-labs-registry.ts`)
- **Lean UI Template** — commentary hidden by default; max 2 scholars; `scholarSelection=[]`; `languageSelection='all'`
- **API routes** — `GET /api/synthesize` returns `synthesisMode: 'concatenation-fallback'`; supported languages: `en`, `hi`, `mr`

## Content Filtering Rule
`isValidCommentaryContent()` rejects strings shorter than **80 characters**. Test fixtures must use commentary strings ≥ 80 chars.

## Current Version
**v1.2.0** — Feature Epics APP/MBH/LAB/TMPL unlocked. See `docs/backlog.md` for active tasks.

---

## 🛠️ Claude's Optimizer Toolkit

When acting as the Architect, Claude must optimally utilize the following plugins and skills:

### 1. superpowers — Workflow Structure (reduces drift and hallucination)
Claude should use specific skills to define perfect architectural plans before Jules/Antigravity execute:
- `brainstorming`: To structure new epics in the backlog.
- `writing-plans`: For defining new micro-app data models or database schemas before handing them to the developer agents.

### 2. claude-mem — Cross-Session Planning Memory
Claude should memorize long-term strategic decisions across sessions.
- **What it remembers**: Architectural constraints, backlog priorities passed from one epic to another, unresolved API contracts.
- **Viewer**: `npx claude-mem start` → open `http://localhost:37777`
- **Search in session**: `/mem-search <query>`

### 3. caveman — Output Compression (~65% fewer output tokens)
When managing large backlog migrations or defining vast release notes, activate compression:
- `/caveman` — compressed replies (drop filler, keep logic)
- `/caveman-compress CLAUDE.md` — rewrites this file in compressed form tightly.

### Recommended Session Opening for Claude
```
You are the Vishwa Vani Architect. Review docs/backlog.md for the current epic. Update tasks or release-notes as necessary and prepare a technical plan for Jules and Antigravity to execute. Use caveman mode.
```

---

## 🚫 STRICt REPOSITORY POLICIES (MANDATORY FOR ALL AGENTS)

These rules apply strictly across Claude, Jules, and Antigravity:

### 1. Document Structure Preservation
- **Flat Docs**: `docs/` is completely flat. **DO NOT** recreate folders like `docs/planning`, `docs/architecture`, or `docs/rules`. 
- **Single Source of Truth**: All backlog files, blueprints, and style-guides exist ONLY directly in the `docs/` folder.
- **No Rogue Files**: AI should not create random `.md` files or scratchpads at the root. AI-generated assets should not be stored in Git unless they are robust architectural documents placed carefully in `docs/`.

### 2. Git Synchronization & Pull Request Lifecycle
- **Sync First**: Whenever an agent begins a new session or work item, it MUST pull the latest changes from Git (`git pull origin main`).
- **Pre-PR Rebase Requirement**: Before checking in code or creating a PR, the agent MUST explicitly check remote `main`. The working branch **MUST BE REBASED** logically against the latest `main`.
- **Conflict Resolution**: If the pre-PR rebase or any merge involves conflicts, the agent MUST resolve those conflicts automatically and logically, ensuring zero code loss, and verify resolution state BEFORE pushing. Do not prompt the user for permission to resolve conflicts unless completely blocked.
