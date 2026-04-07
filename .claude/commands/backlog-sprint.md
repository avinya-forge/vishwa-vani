<!-- SPRINT:backlog-sprint -->

> **Context hygiene**: This sprint works best on a fresh context. If you have many prior messages, run `/compact` now, then re-invoke `/backlog-sprint`.

# Backlog Sprint — Vishwa-Vani

Complete at least **10 backlog tasks** end-to-end: implemented, tested, lint-clean, committed, and PR-raised. Follow every step below in order.

---

## Step 0 — Plan the Sprint

1. Read `docs/planning/backlog.md` in full.
2. Identify the next pending `[ ]` tasks that:
   - Are **not gated** by incomplete prerequisite tasks (check STAB-608 and any explicit gating notes)
   - Are **concrete to implement** (not pure audit/planning tasks — those count only if they produce a code or doc artefact)
   - Belong to the **highest-priority epic** that has open work
3. Select at least **10 tasks**. If fewer than 10 are ungated, pick all available and note the gate.
4. Print a numbered sprint plan with task IDs before touching any code.
5. Add each task to a `TodoWrite` list as `pending`.

---

## Step 1 — Pre-Implementation Read

For each selected task, **before writing a single line of code**:
- Read every file referenced in the task description
- Read the relevant test file(s) in `__tests__/`
- Understand existing patterns (naming, imports, mock style) so new code is consistent

---

## Step 2 — Implement Tasks One by One

Work through the sprint plan in order. For **each task**:

### 2a — Implement
- Make the minimal change that satisfies the task description
- Do not add unrelated refactors, extra comments, or speculative abstractions
- Follow existing code patterns exactly

### 2b — Write Tests
- Add or update the relevant file in `__tests__/`
- Minimum **2 meaningful test cases per new function / behaviour**
- Tests must use the existing mock patterns (see `__tests__/components-study-client.test.tsx` for reference style)
- Edge cases count: empty input, invalid input, boundary values

### 2c — TypeScript Gate
Run after every task:
```
npx tsc --noEmit 2>&1 | head -30
```
Zero errors required before moving to the next task. Fix any type errors immediately.

### 2d — Mark Done
- In `docs/planning/backlog.md`: change `- [ ] **[TASK-ID]**` → `- [x] **[TASK-ID]**` and append a one-line done note: `**Done**: <what was changed>`.
- In your `TodoWrite` list: mark the task `completed`.

---

## Step 3 — Lint & Full Type Check

After **all** tasks are implemented:

```bash
npx tsc --noEmit
```

If a lint script exists (`npm run lint`), run it too. Fix every error before continuing. Zero warnings-treated-as-errors allowed.

---

## Step 4 — Update Release Notes

Add a new version entry to `docs/release-notes.md`:

```markdown
## [X.Y.Z] - YYYY-MM-DD (Backlog Sprint — [epic names])

### Tasks Completed
- [TASK-001]: <one-line summary>
- [TASK-002]: <one-line summary>
...

### Test Coverage
- X new test cases added
- TypeScript: zero errors

### Backlog
- All sprint items marked [x] in docs/planning/backlog.md
```

Bump the patch version from the current `*Current Version*` line at the top.

---

## Step 5 — Commit

Group tasks into **1–3 logical commits** (not one per task, not one giant blob):

```
feat(<epic-slug>): implement <N> tasks — <TASK-ID list>

<2–3 sentence summary of what changed and why>
```

Stage only files you actually changed. Never use `git add -A` blindly.

---

## Step 6 — Push & Raise PR

```bash
git push -u origin <current-branch>
```

Then create a PR via the GitHub MCP tools (`mcp__github__create_pull_request` or equivalent) with:

**Title**: `feat: backlog sprint — [task IDs]`

**Body**:
```markdown
## Sprint Summary

| Task ID | Description | Tests Added |
|---------|-------------|-------------|
| TASK-001 | ... | 2 |
...

## Quality Gates
- [ ] All tasks implemented
- [ ] Unit tests: N new cases
- [ ] TypeScript: `npx tsc --noEmit` exits 0
- [ ] Backlog: all items marked [x]
- [ ] Release notes updated
```

---

## Non-Negotiable Quality Gate

**Do not push or raise the PR unless every box is checked:**

- [ ] ≥ 10 tasks completed (or all ungated tasks if fewer exist)
- [ ] Every task has ≥ 2 unit test cases
- [ ] `npx tsc --noEmit` exits 0
- [ ] All sprint items marked `[x]` in `docs/planning/backlog.md`
- [ ] `docs/release-notes.md` updated with new version entry
- [ ] Commits are clean, descriptive, and scoped

If any gate fails, fix it before proceeding. Do not skip or defer.
