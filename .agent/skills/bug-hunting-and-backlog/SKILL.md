---
name: bug-hunting-and-backlog
description: Identifies bugs, assesses severity, formats bug reports, and updates docs/backlog.md at priority 0.
---

# Bug Hunting & Backlog Management 🐛📋

**Goal:** Detect application bugs, prioritize fixes (bugs are Priority 0), and update backlog and state trackers.

## Process

1. **Detection & Triage**:
   - Inspect build outputs, tests, or runtime logs for errors.
   - Categorize severity (Critical / High / Medium / Low). Bugs are absolute Priority 0.

2. **Format Report**:
   - Title: `[BUG] <Short description>`
   - Description: Steps to reproduce, expected vs actual behavior.
   - Tag / Priority: Assigned based on impact.

3. **Backlog & State Sync**:
   - Append or prepend bug entry to `docs/backlog.md`.
   - Update `.status` file and `docs/PROJECT_STATUS.md` via `python scripts/project_status_audit.py`.
