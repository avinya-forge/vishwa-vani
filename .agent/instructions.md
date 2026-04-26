# Project Intelligence
## Vision
Reference `vision.md` for the North Star goal. Never implement features that deviate from this vision.
## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Style: Tailwind CSS

## Execution Rules
- Always run `npm run build` & `npm run lint` before committing.
- Always use `@caveman-mode` for all small fixes to save tokens and all request and responses.
- For architectural changes, trigger `@arch-critic` first.
- If a file is > 500 lines, do not read the whole thing; use `grep` or `sed` to find relevant parts first.
- NO NEW FEATURES until all high-priority bugs in `backlog.md` are resolved.
- Follow Ultra-Lean Architecture: Minimize dependencies, maximize reusability.

## Role Workflow
1. **Architect/PO**: Updates `backlog.md` (Prioritized Top -> Bottom).
2. **Implementer**: Picks top task, codes, lints, and runs tests.
3. **Tester**: Audits code and visual UI. Logs bugs as #1 priority in backlog.

# Agent Execution Protocol
- **Single Command Entry:** Use `/startcycle` to trigger the full multi-role pipeline.
- **Dynamic Role Switching:** You are authorized to "Shift Context" between Architect, Implementer, and QA roles as defined in the lifecycle workflow.
- **Automatic Setup:** On folder open, initialize the workspace by reading `docs/vision.md`.
- **Token Efficiency:** Always use **Gemini 3 Flash** for implementation and cleanup; only use **Claude 4.6 Thinking** for the "Architect" and "QA Audit" phases.