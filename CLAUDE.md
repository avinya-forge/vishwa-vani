# Vishwa Vani — Claude Code Project Memory

## Project Summary

Next.js 15 App Router project serving Sanskrit scripture (Mahabharata, Bhagavad Gita) with
transliteration, layered commentary, and AI synthesis. TypeScript strict mode throughout.

## Key Architecture

- **NVF (Normalized Vedic Fragment)** — core data schema: `{ id, original, transliteration, layers[] }`
- **VedicDataService** — singleton with in-memory cache; source of truth for chapter data
- **VEDIC_LABS_REGISTRY** — 10 micro-apps mapped to books/chapters/topics (`lib/vedic-labs-registry.ts`)
- **Lean UI Template** — commentary hidden by default; max 2 scholars; `scholarSelection=[]`; `languageSelection='all'`
- **API routes** — `GET /api/synthesize` returns `synthesisMode: 'concatenation-fallback'`; supported languages: `en`, `hi`, `mr`

## Content Filtering Rule

`isValidCommentaryContent()` rejects strings shorter than **80 characters**. Test fixtures must
use commentary strings ≥ 80 chars or they are silently filtered.

## Test Setup

- Jest + ts-jest; config in `jest.config.ts`
- Run: `npm test`
- Type check: `npx tsc --noEmit`
- 79 tests across 9 suites at v1.0.0

## Current Version

**v1.0.0** — all STAB stabilization tasks complete; feature epics APP/MBH/LAB/TMPL unlocked.
See `docs/planning/backlog.md` for next tasks and `docs/release-notes.md` for history.

## Sprint Command

`/backlog-sprint` — picks next 10 backlog tasks, implements, tests, commits in one session.

---

## Token Optimization Strategy

This project uses three tools to maximise Claude context efficiency:

### 1. caveman — Output Compression (~65% fewer output tokens)

Activate in any session:
- `/caveman` — compressed replies (drop filler, keep accuracy)
- `/caveman lite` — drop filler only, keep grammar
- `/caveman ultra` — telegraphic maximum compression
- `stop caveman` — back to normal
- `/caveman-compress CLAUDE.md` — rewrites this file in compressed form (~45% smaller), keeps `CLAUDE.original.md` as backup

**When to use:** Any session involving repetitive explanation, large diffs, or verbose code review feedback. The `/backlog-sprint` command benefits most — 10 tasks of output shrinks dramatically.

### 2. superpowers — Workflow Structure (reduces drift and hallucination)

Available skills (auto-triggered or invocable by name):
| Skill | When |
|---|---|
| `brainstorming` | Before starting a feature — diverge before converging |
| `writing-plans` | Architecture decisions; always plan before implement |
| `test-driven-development` | New components/functions — test first |
| `subagent-driven-development` | Tasks with 3+ independent sub-tasks — parallelize |
| `dispatching-parallel-agents` | Explicit parallel work (e.g. 3 files at once) |
| `systematic-debugging` | Bug investigation — hypothesis before mutation |
| `verification-before-completion` | Before closing a task — verify all acceptance criteria |
| `finishing-a-development-branch` | Before PR — lint, test, release notes |
| `requesting-code-review` / `receiving-code-review` | PR review cycles |
| `using-git-worktrees` | Long-running feature branches |

**When to use:** Invoke by name or let Claude detect the context. Subagent-driven development keeps each agent's context window small — a 10-task sprint dispatched as 10 subagents uses 10× less per-agent context than a single monolithic session.

### 3. claude-mem — Cross-Session Memory (eliminates re-explanation cost)

Automatically captures observations during sessions and injects relevant context into future ones.

**Progressive disclosure pattern (10× more efficient than loading full context):**
1. `search(query=..., limit=10)` → compact index (~50–100 tokens/result)
2. `timeline(observation_id=...)` → chronological context around a hit
3. `get_observations(ids=[...])` → full details only for what you need

**What it remembers:** file paths + decisions, test fixture requirements (the 80-char rule), API contracts, bug patterns, architecture trade-offs. After this session it will remember NVF schema, VedicDataService singleton pattern, etc.

**Viewer:** `npx claude-mem start` → open `http://localhost:37777`
**Search in session:** `/mem-search <query>`

### Recommended Session Opening

For any session working on this codebase:

```
Use caveman mode. Search memory for "vishwa-vani recent decisions". Then implement [task].
```

This single line saves ~2,000 tokens vs. the full context re-read approach.

### Combined Savings Estimate (per /backlog-sprint run)

| Layer | Saving |
|---|---|
| caveman output compression | ~65% of output tokens |
| caveman-compress on CLAUDE.md | ~45% of CLAUDE.md input tokens |
| claude-mem context injection (vs. manual re-explain) | ~3,000–5,000 tokens/session |
| superpowers subagent dispatch (10 tasks → 10 small contexts) | ~70% per-agent context reduction |

At Sonnet pricing, a full 10-task sprint session drops from ~$0.80 to ~$0.20 with all layers active.
