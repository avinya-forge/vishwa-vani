---
name: using-aisdlc
description: Apply AI-assisted Software Development Lifecycle (AI-SDLC) methodology to plan and execute features in Vishwa-Vani — from requirements to shipped code.
---

# AI-SDLC Execution Framework

**Goal:** Apply a structured, multi-agent SDLC loop to ship features safely and traceably.

## The Four Agents

| Agent | Role | Skill |
|---|---|---|
| **ARCHITECT** | Design, ADRs, risk analysis | `@arch-critic` |
| **IMPLEMENTOR** | Write code, tests | `@implementer` + `@caveman-mode` |
| **TESTER** | Break things, log bugs | `@qa-expert` |
| **SCRUM MASTER** | Track backlog, enforce DoD | `@scrum-master` |

## Workflow Phases

### Phase 0: Pre-flight (Always run first)
\`\`\`
1. Read docs/backlog.md — identify the top unchecked task
2. Read docs/standards.md — recall lean template rules
3. Call @arch-critic: "Review this plan, find flaws"
\`\`\`

### Phase 1: Design
- Architect proposes minimal viable approach
- Outputs: interface types, component tree, data flow
- **Gate:** No code until arch-critic approves OR explicitly signs off on tradeoffs

### Phase 2: Implement
- `@caveman-mode` for code generation
- `@implementer` for verification loop:
  \`\`\`
  write code → npm run lint → npm run build → npm test → fix → repeat
  \`\`\`
- Max 150 LOC per commit — checkpoint and commit atomically

### Phase 3: QA
- `@qa-expert` runs:
  - Visual audit (layout, mobile 375px)
  - API audit (response shape, error codes)
  - Coverage check (must hit 80% floor, 95% goal)
- Any bug found → prepend to `docs/backlog.md` as Priority 0

### Phase 4: Ship
- Update `docs/release-notes.md`
- Mark task `[x]` in `docs/backlog.md`
- Commit: `type(scope): description`
- `git push` → CI must pass green

## Definition of Done (DoD)
A task is ONLY complete when ALL of the following are true:
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] `npm test` exits 0 with ≥80% coverage
- [ ] Visual QA passed on desktop + mobile
- [ ] `docs/backlog.md` updated
- [ ] `docs/release-notes.md` updated
- [ ] Commit pushed with conventional message

## Vishwa-Vani Specific Rules
- Never write placeholder content — real data only in Gold tier
- Never start task N+1 before task N passes DoD
- Stability Gate (STAB-608) blocks all new features until EPIC 7 completes
