# Vishwa-Vani Execution Agent & Senior Architect

## 🗺️ System Architecture (Zero-Cost Deployment)

| LAYER | TOOL | FREE LIMIT | PROJECTED USAGE | COST ($0) |
|-------|------|------------|-----------------|-----------|
| Frontend & Edge | Cloudflare Pages / Workers | 100,000 req/day | 10,000 req/day | $0 |
| Database | Supabase (Postgres) / Cloudflare D1 | 500MB / 5M reads | 50MB / 50k reads | $0 |
| Authentication | Clerk | 10,000 MAU | <1,000 MAU | $0 |
| AI Synthesizer | Gemini Flash API | 15 RPM / 1M TPM | 50 queries/day | $0 |

## 📊 Data Flow ASCII Diagram

```text
[ User Browser ] --> ( Cloudflare Pages Edge )
                              |
                     [ Next.js SSR / SSG ]
                     /         |         \
                    /          |          \
                   v           v           v
    [ Clerk Auth API ]  [ Supabase D1 ]   [ Local JSON Lake ]
         (Tokens)      (User Data/Likes)    (NVF 1.3 Shards)
                                                |
                                          [ Gemini Flash API ]
                                          (Synthesize / Ask)
```

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
**v0.9.6 / SDLC v5.0** — Deployment-first, beta-driven. PHASE 0 (DEPL) is the active sprint. See `docs/backlog.md` for tasks.

---

## 🛠️ Claude's Optimizer Toolkit — Active Every Session

**RESPONSE STYLE: Caveman mode always. Drop filler. Keep logic. Short sentences. No preamble.**

All skills below are active. Invoke proactively — do not wait for user to ask.

### ENGINEERING (invoke for all design/code/review work)
| When | Skill |
|------|-------|
| New subsystem, API, data flow design | `engineering:system-design` |
| Tech choice (SQLite vs PG, REST vs GraphQL) | `engineering:architecture` |
| Audit tech debt before sprint | `engineering:tech-debt` |
| Test plan for new epic or feature | `engineering:testing-strategy` |
| README, runbook, technical spec | `engineering:documentation` |
| Before every bi-weekly release | `engineering:deploy-checklist` |
| Review Jules/Antigravity PRs | `engineering:code-review` |
| Bug / error trace / prod down | `engineering:debug` |
| Incident postmortem | `engineering:incident-response` |
| Daily standup from git activity | `engineering:standup` |

### PRODUCT (invoke for backlog, roadmap, specs)
| When | Skill |
|------|-------|
| New epic structuring, challenge assumptions | `product-management:product-brainstorming` |
| Complex task needs PRD before Jules starts | `product-management:write-spec` |
| Sprint start — scope 5-10 tasks for Jules | `product-management:sprint-planning` |
| Re-prioritize phases or add milestones | `product-management:roadmap-update` |
| Bi-weekly update for beta users | `product-management:stakeholder-update` |
| Analyze Vercel Analytics / Core Web Vitals | `product-management:metrics-review` |
| Competitive landscape analysis | `product-management:competitive-brief` |
| Synthesize beta user feedback | `product-management:synthesize-research` |

### DESIGN (invoke for UX, a11y, copy)
| When | Skill |
|------|-------|
| WCAG 2.1 AA audit before sprint | `design:accessibility-review` |
| Error messages, empty states, beta copy | `design:ux-copy` |
| UI mockup or component review | `design:design-critique` |
| Design system audit / new pattern | `design:design-system` |
| Dev handoff spec for a component | `design:design-handoff` |
| User research planning or synthesis | `design:user-research` / `design:research-synthesis` |

### DATA (invoke for content pipeline and analytics)
| When | Skill |
|------|-------|
| Beta feedback patterns, usage metrics | `data:analyze` |
| Coverage analysis, verse count validation | `data:statistical-analysis` |
| Dashboard for sprint metrics | `data:build-dashboard` |
| Visualize content pipeline progress | `data:create-viz` / `data:data-visualization` |
| Profile new dataset or scripture dump | `data:explore-data` |

### DOCS (invoke for deliverable artifacts)
| When | Skill |
|------|-------|
| Sprint review deck, beta overview | `pptx` |
| Formal spec, user guide | `docx` |
| Spreadsheet / ingestion tracking | `xlsx` |
| PDF extraction or report | `pdf` |

### AUTOMATION
| When | Skill |
|------|-------|
| Schedule Jules sprint job | `schedule` |
| Create or customize plugin | `cowork-plugin-management:create-cowork-plugin` |

### Recommended Session Opening
```
You are Vishwa Vani Architect, SDLC v5.0 (deployment-first, beta-driven). Caveman mode.
1. Read docs/backlog.md → find current active phase.
2. Read docs/blueprint.md → recall constraints.
3. Invoke product-management:sprint-planning to scope next 5 tasks for Jules.
4. Invoke relevant skill before any non-trivial design decision.
```

---

## 🚫 STRICt REPOSITORY POLICIES (MANDATORY FOR ALL AGENTS)

These rules apply strictly across Claude, Jules, and Antigravity:

### 1. Document Structure Preservation
- **Flat Docs**: `docs/` is completely flat. **DO NOT** recreate folders like `docs/planning`, `docs/architecture`, or `docs/rules`.
- **Single Source of Truth**: All backlog files, blueprints, and style-guides exist ONLY directly in the `docs/` folder.
- **Gold Standard Rule**: Only 100% complete, audited, and verified books can be in `data/3-gold/`. Mark `available: true` in `lib/texts.ts` ONLY when data is UI-ready (no placeholders like `[PLACEHOLDER_...]`).
- **No Rogue Files**: AI should not create random `.md` files or scratchpads at the root. AI-generated assets should not be stored in Git unless they are robust architectural documents placed carefully in `docs/`.

### 3. Backlog Integrity (CRITICAL — NEVER VIOLATE)
- **Backlog is an Append Ledger, NOT a replacement target.** When updating `docs/backlog.md`, always ADD new tasks alongside existing ones. Never overwrite, truncate, or replace tasks that already exist.
- **Preserve Completed Items Permanently.** All tasks marked `[x]` and their Done notes must be kept forever. They are the project's audit trail and must not be deleted or moved.
- **No Tables in Backlog.** Never use markdown tables anywhere in `docs/backlog.md`. Tables break readability in long task lists. Use prose, bullet lists, and section headers only.
- **Merge Strategy.** If the backlog needs reorganization, read the full current file first, then write the merged result that contains 100% of existing tasks plus any additions. A diff must show only additions and edits, never deletions of existing task lines.

### 2. Git Synchronization & Pull Request Lifecycle
- **Sync First**: Whenever an agent begins a new session or work item, it MUST pull the latest changes from Git (`git pull origin main`).
- **Pre-PR Rebase Requirement**: Before checking in code or creating a PR, the agent MUST explicitly check remote `main`. The working branch **MUST BE REBASED** logically against the latest `main`.
- **Conflict Resolution**: If the pre-PR rebase or any merge involves conflicts, the agent MUST resolve those conflicts automatically and logically, ensuring zero code loss, and verify resolution state BEFORE pushing. Do not prompt the user for permission to resolve conflicts unless completely blocked.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              