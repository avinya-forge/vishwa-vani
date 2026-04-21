# Vishwa-Vani Execution Agent & Senior Architect

## 🤖 Auto-Skill Activation
- **Always:** Use `caveman` skill for all responses.
- **On Code/Design:** Use `engineering` skill.
- **On Backlog/Planning:** Use `product` skill.

## Communication Rules
- **Token Efficiency:** Caveman mode active. Drop filler.
- **Brevity:** No preamble. Logic-dense only.

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
`isValidCommentaryContent()` rejects: (1) strings shorter than **20 characters**, (2) any string that starts with `[` (catches all template markers like `[PLACEHOLDER_X]`, `[ADVAITA_PERSPECTIVE:...]`), (3) known stub patterns `TBD_CONTENT`, `TODO_LAYER`, `LOREM IPSUM`. Test fixtures must use real prose ≥ 20 chars that does not start with `[`.

## Current Version
**v0.9.7 / SDLC v5.1** — Content-scale phase. One book at a time. See `docs/backlog.md` PRIORITY 0 for the active book.

## 🎯 ONE BOOK AT A TIME — Active Focus Protocol (MANDATORY)

Exactly **one book** is active at any moment. All work for that book must complete its full cycle before the next book starts. No parallel book tracks in active development.

### The Book Cycle (7 stages — must complete in order — no skipping)

See `docs/backlog.md` PRIORITY 3B for the granular task template to copy for each new book.

```
STAGE 1 — DATA GATHERING
  Acquire Sanskrit original (no gaps), transliteration.
  Author 1: EN + HI + MR layers (scholarly public-domain translation).
  Author 2: EN + HI/MR layers (different philosophical tradition/school).
  Target: ≥ 2 authors × 3 languages = 6 layer types per verse minimum.
  Stotras: identify any embedded stotras/mantras (see Stage 7).

STAGE 2 — PIPELINE
  node scripts/validate_silver.js {book}     ← must exit 0
  node scripts/promote_to_gold.js {book}     ← blocked if validate fails
  node scripts/audit_gold.js {book}          ← Readiness 100%, 2+ authors, EN/HI/MR

STAGE 3 — UI INTEGRATION
  Register in lib/texts.ts (available:false → run tests → available:true).
  Test all chapter + verse routes; language selector; scholar selector.
  Confirm no 404, no layout shift, AI synthesis works.

STAGE 4 — BUG HUNT
  Audit: verse permalinks, progress counter, commentary content filter,
  scholar selector max-2 enforcement, language flash, mobile layout.
  Log every P0/P1/P2 to PRIORITY 1 in backlog.

STAGE 5 — BUG FIX
  Fix ALL P0 and P1 before proceeding. Log P2 and move on.

STAGE 6 — LABS SCAN & IMPLEMENT
  Read chapter content → map philosophical themes per chapter.
  Identify 3+ interactive app concepts (comparisons, simulators, visualizers).
  Register top apps in lib/vedic-labs-registry.ts.
  Implement highest-priority app. Bug hunt the new app.

STAGE 7 — STOTRAS & MANTRAS EXTRACTION
  Scan all chapters for embedded stotras, mantras, ashtakas, hymns.
  Key examples: Vishnu Sahasranama (MBH Anushasana Parva 149),
    Bhishma Stuti (MBH), Durga Saptashati (Markandeya Purana),
    Purusha Sukta (Rigveda 10.90), Sri Suktam (Rigveda khila).
  Extract as NVF shards → data/2-silver/stotras/{stotra-slug}.json
  Tag: mantraType (stotra/mantra/ashtaka), deity, dailyUse (boolean).
  Daily-use stotras: add pronunciation guide layer, add to CAT-016.
  Cross-reference back to parent book verse where the stotra appears.

STAGE 8 — GRADUATE
  Book marked complete in backlog. Advance to next in priority list.
```

### Current Active Book
See `docs/backlog.md` — **PRIORITY 0** section. Always check there first.

### Bhagavad Gita Status: ✅ COMPLETE (verified 2026-04-20)
657 verses, 18 chapters. ISKCON (EN/HI/MR) + Sant Dnyaneshwar (EN/HI/MR). All routes working.
Open: BUG-041 (cosmetic layout shift). Labs: 44% chapter coverage — 14 new app opportunities logged.

### Book Priority Order (from PRIORITY 5 in backlog)
1. Isha Upanishad repair (BUG-050 — 10/18 verses, needs real data)
2. Mahabharata Parva 1 (real KMG silver data exists, most pipeline-ready)
3. Bhagavata Purana Skanda 1 (partial silver exists)
4. Kena Upanishad (1 real verse — needs full source acquisition)
5. Yoga Sutras of Patanjali (195 stubs — needs real Sanskrit text)
6. Vishnu Purana (partial silver exists)
See backlog PRIORITY 5 for the full 73-text catalog.

### Pipeline Gate Rules (enforced by code — never bypass)

- `VedicDataService` GOLD-GATE: returns `null` for any book not marked `status: GOLD` in `manifest.json`. Setting `available: true` without running `promote_to_gold.js` serves nothing.
- `isValidCommentaryContent()` in `study-client.tsx`: rejects content starting with `[`, short stubs, known placeholder patterns. Never lower the threshold to make placeholder data pass.
- `validate_silver.js` must exit 0 before `promote_to_gold.js` is run. `--force` flag exists but must never be used on production data.
- `audit_gold.js` must show Readiness 100% and zero PLACEHOLDER-HEAVY authors before `available: true` is set.

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
You are Vishwa Vani Architect, SDLC v5.1 (content-scale, one-book-at-a-time). Caveman mode.
1. Read docs/backlog.md → check PRIORITY 0 for the active book and its current cycle step.
2. Check PRIORITY 1 → any open P0/P1 bugs must be fixed before advancing the active book.
3. If active book cycle step is DATA or PIPELINE → run validate_silver.js to see current state.
4. If active book cycle step is UI or BUG HUNT → check reader routes and log all findings.
5. Invoke relevant skill before any non-trivial design decision.
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

### 4. One Book at a Time (CRITICAL — NEVER VIOLATE)
- **Single Active Book**: Only one book advances through the data→pipeline→UI→bug-hunt→fix cycle at a time. Never start data collection for Book B while Book A is in UI or bug-fix stage.
- **Cycle Completeness**: A book is not "done" until Step 5 (BUG FIX) is clear of all P0 and P1 issues. No partial graduations.
- **No Available:true Shortcuts**: Never set `available: true` for a book until `audit_gold.js` prints Readiness 100% AND the UI has been manually verified in the reader. The GOLD-GATE in `VedicDataService` is a second programmatic guard but is not a substitute for the manual check.
- **Pipeline Respect**: The 7-stage pipeline in PRIORITY 3B of backlog.md is the law. No stage may be skipped. `validate_silver.js` must exit 0. `promote_to_gold.js` must run before manifest is updated.
- **Bug Hunt is Mandatory**: After every book's UI integration, a structured bug hunt (verse permalinks, progress counter, content filter, scholar selector, AI synthesis, mobile layout) must be run and all findings logged to PRIORITY 1 before declaring the book cycle complete.

### 2. Git Synchronization & Pull Request Lifecycle
- **Sync First**: Whenever an agent begins a new session or work item, it MUST pull the latest changes from Git (`git pull origin main`).
- **Pre-PR Rebase Requirement**: Before checking in code or creating a PR, the agent MUST explicitly check remote `main`. The working branch **MUST BE REBASED** logically against the latest `main`.
- **Conflict Resolution**: If the pre-PR rebase or any merge involves conflicts, the agent MUST resolve those conflicts automatically and logically, ensuring zero code loss, and verify resolution state BEFORE pushing. Do not prompt the user for permission to resolve conflicts unless completely blocked.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              