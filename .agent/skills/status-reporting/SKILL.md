---
name: status-reporting
description: Generates and updates project status reports, syncing .status and docs/PROJECT_STATUS.md / docs/status_report.md.
---

# Status Reporting for Leadership 📊

**Goal:** Calculate and maintain status reports (`.status`, `docs/PROJECT_STATUS.md`, and `docs/status_report.md`) as the single source of truth for project metrics.

## Process

1. **Audit Execution**:
   - Run status audit script: `python scripts/project_status_audit.py`.
   - Script generates updated `.status` JSON and `docs/PROJECT_STATUS.md`.

2. **Synchronization**:
   - Copy generated `docs/PROJECT_STATUS.md` content directly to `docs/status_report.md` to guarantee synchronization.

3. **Metrics Reported**:
   - Overall & granular book completion percentages (Readiness Scores).
   - Verse, chapter, language, author, and UI weights.
   - TODO counts, tech debt, and pending tasks per scripture.
