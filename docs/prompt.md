> SYSTEM: Execute Antigravity and jules.google.com auto-mode. Assume roles: PO, Architect, BA, Developer, Tester, Engineer, Scrum Master, Delivery Lead. Target: Polished product, zero bugs.

### 1. IDE CLEANUP
Delete non-Antigravity/non-Jules configuration files.
Purge third-party skills. Retain native Antigravity and jules.google.com integrations.

### 2. MEMORY-BINDER SKILL
Create workflow `.agents/workflows/memory-binder.md`:
- Scan codebase. Map architecture, dependencies, standards.
- Store context `.agents/memory-state.json`.
- Load state consecutive sessions.
Execute `memory-binder`.

### 3. PROJECT STATE ENFORCEMENT
Verify documentation trifecta:
- `vision.md`: North Star.
- `backlog.md`: Granular tasks. Strict priority (1. Bugs, 2. Feature components, 3. Unstarted features).
- `release-notes.md`: Completed tasks.
Update files. Move completed tasks `release-notes.md`.

### 4. GIT CONSOLIDATION
Checkout `main`. Pull latest.
Create branch `consolidation-main`.
Iterate remote branches:
- Squash-merge into `consolidation-main`.
- Resolve conflicts. Preserve logic.
- Commit changes granularly per branch.
- Delete remote branch.
Push `consolidation-main`.
Raise PR. Require zero conflicts.

### 5. CI/CD & QA
Verify `.github/workflows/` (build, lint, test). Optimize free tier limits.
Trigger local CI validation.
Trigger Jules Critic adversarial review.
Fix flagged errors. Create topmost priority `backlog.md` tasks resolving failures.

---

<mission>
Engineer autonomous codebase lifecycle. Execute multi-agent loop. Transform Bronze-Silver-Gold data layers. Enforce 500 source-code LOC target (excluding raw data gathering/ingestion files). Maximize production output. Prevent context collapse.
</mission>

<variables>
- STACK: [TypeScript/Node.js/Next.js]
- TARGET_LOC: 500
- CURRENT_LOC: 0
- DATA_TARGETS: [Bhagavad_Gita, Mahabharata, Bhagavata_Purana, Ramayana]
</variables>

<rules>
- MEASURE WORK: Track git diff size. Loop until CURRENT_LOC >= TARGET_LOC. CRITICAL EXCLUSION: Exclude all line changes inside `/data/1-bronze/` and `/data/2-silver/` from the CURRENT_LOC calculation. Only engineering mutations (TypeScript files, tests, and Gold NVF 1.0 JSON outputs inside `/data/3-gold/`) increment CURRENT_LOC.
- CONTEXT LIMIT: Halt task, trigger checkpoint if a single engineering commit exceeds 150 LOC. Prevent LLM drift.
- FLAT SSOT: Store documentation inside `/docs/`. Forbid subfolders.
- ATOMICITY & CHECKPOINT: Test, validate granular tasks. Execute `git add .` post-validation. Prevent token timeout data loss.
- BYPASS AMBIGUITY: Do not stall. Log engineering blockers to `/docs/backlog.md` under `## Pending Human Decision`. Cache state, skip task, continue execution.
- ZERO HALLUCINATION: Generate complete, high-fidelity NVF 1.0 JSON schemas. Forbid placeholders. Trace operations to physical filesystem nodes.
- QUALITY GATES: Require >95% coverage, 0 lint issues, 0 build warnings.
</rules>

<data_lifecycle>
- BRONZE: Ingest raw OCR/text data. Store inside `/data/1-bronze/`. (LOC changes excluded from metrics).
- SILVER: Map raw text to structured objects. Clean noise. Store inside `/data/2-silver/`. (LOC changes excluded from metrics).
- GOLD: Validate against NVF 1.0 JSON Schema `{ id, chapter, verse, original, transliteration, meaning, layers }`. Store inside `/data/3-gold/[book-slug]/[book-slug]-chapter-[N].json`. (LOC changes included in metrics).
</data_lifecycle>

<agents>
- GATHERER: Scan sources. Acquire raw text data for DATA_TARGETS. Inject Bronze/Silver processing tasks into `/docs/backlog.md`.
- ARCHITECT: Design Silver-to-Gold mapping pipelines. Plan Next.js UI integration (`lib/scholars.ts`). Inject optimization/refactor tasks into `/docs/backlog.md`.
- IMPLEMENTOR: Pop backlog task. Execute schema transforms and engineering mutations. Write UI implementation code.
- TESTER: Generate Jest scenarios. Execute validation suites. Inject failed scenarios into the backlog as priority bugs.
</agents>

<workflow>
PHASE 0: PRE-FLIGHT
1. Validate filesystem (`/docs/`, `/data/1-bronze/`, `/data/2-silver/`, `/data/3-gold/` present).
2. Verify commands (`npm test`, `npm run lint`, `npm run build`). Abort on configuration failure.

PHASE 1: SANITIZATION & DATA SEEDING
1. Update active dependencies. Run baseline regression suites.
2. AST Scrub: Delete unused assets, dead code, or orphaned modules.
3. [GATHERER]: Run initial bulk extraction routines. Populate `/data/1-bronze/` and `/data/2-silver/` paths. 

PHASE 2: MULTI-AGENT COMPILATION LOOP
Condition: WHILE CURRENT_LOC < TARGET_LOC
1. [ARCHITECT]: Scan data layers and codebase architecture. Append structural refactor and UI integration tasks to backlog.
2. [IMPLEMENTOR]: Pop 1 task from `/docs/backlog.md`. Apply atomic change (Data mapping or UI mutation). Refactor for efficiency (DRY).
3. [TESTER]: Execute `node scripts/validate_silver.js [book-slug]`. Generate `__tests__/[book-slug]-[scholar-id].test.ts`. Run verification.
4. IF testing fails: Revert state to previous checkpoint. Prepend bug to index 0 of backlog.
5. IF testing succeeds: Call PHASE 3 (Quality Gate Subroutine).
6. Post-Gate: Execute `git add .`. Calculate diff size excluding `/data/1-bronze/` and `/data/2-silver/`. Add validated lines to CURRENT_LOC. Commit and move task to `/docs/release_notes.md`.

PHASE 3: QUALITY GATE (SUBROUTINE)
1. Execute `npm run build`. Enforce 0 warnings.
2. Execute `npm run lint`. Correct formatting and programmatic violations.
3. Execute `npm test`. Enforce >95% system test coverage. Inject any missing test gaps into backlog index 0.

PHASE 4: DOC ALIGNMENT
1. Flatten `/docs/`. Validate against baseline rules.
2. Map completed backlog items across `vision.md` and `architecture.md`.

PHASE 5: RELEASE
1. Increment SemVer depending on change scope.
2. Stage all remaining verified elements. Instantiate `gh pr create`.
3. Write final `.state` file containing metrics (CURRENT_LOC, V-Score). Exit.
</workflow>

<output_report>
1. METRICS: Total Engineering LOC generated (Target: 500). Raw data lines gathered (Excluded from target calculation). Total man-days executed.
2. ARTIFACTS: Clickable filesystem links to generated Gold JSON and UI components.
3. TELEMETRY: Lint, test, and build exit codes and test coverage metrics.
4. ESCALATIONS: List `## Pending Human Decision` elements blocked during the run.
5. NEXT BATCH: Staged tasks ready for subsequent processing cycles.
</output_report>
