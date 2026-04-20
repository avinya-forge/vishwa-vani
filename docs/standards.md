# 🛠️ Vishwa-Vani: Standards, Architecture, and UI Template

This file is the single source of truth for standards, UI template requirements, and document policy.

## 📁 Active Documentation Set (Flat — all files directly in docs/)
- `README.md` — Vision and project overview.
- `docs/vision.md` — Strategic direction and product intent.
- `docs/backlog.md` — The single active backlog and roadmap (append-only ledger).
- `docs/release-notes.md` — Release history and completed work.
- `docs/blueprint.md` — Architectural principles, zero-cost deployment, API expectations.
- `docs/standards.md` — Standards, UI template requirements, and document policy (this file).
- `docs/jules-prompt.md` — Schedulable Jules execution prompt for sprint automation.

> **FLAT DOCS RULE**: All documentation lives directly in `docs/`. No subdirectories (`docs/planning/`, `docs/architecture/`, `docs/rules/`) are permitted. If UI template details are needed, use the UI Template section in this file.

---

## 1. Document Policy
- Thirteen active docs are tracked in the documentation set.
- New documentation may be added only by explicit approval from Claude (The Architect).
- Hierarchical SSOT: `README.md` (Vision) > `docs/blueprint.md` (Architecture) > `docs/standards.md` (Process)
- Mandatory Trifecta: `README.md`, `docs/backlog.md`, and `docs/release-notes.md` must exist.
- Planning lives in `docs/backlog.md` — it is an append-only ledger; never overwrite or truncate.
- Completed work is recorded in `docs/release-notes.md`.
- Vision stays in `docs/vision.md`.
- Architecture stays in `docs/blueprint.md`.
- Standards and process rules live in `docs/standards.md` (this file).

## 2. Development Process
## 2. Development Process
### Data Pipeline (DP) Tiers & Promotion Criteria
Vishwa-Vani follows a strict three-tier data pipeline. Data must meet 100% of the criteria before promotion.

| Tier | Status | Criteria | UI Usage |
|------|--------|----------|-----------|
| **1-BRONZE** | Raw | Source text, OCR, or partial scrapes. Unstructured. | 🚫 Strictly Forbidden |
| **2-SILVER** | Processing | Structured (NVF), massaged, but potentially incomplete or unverified. | 🚫 Strictly Forbidden |
| **3-GOLD** | **UI-READY** | **Complete book**, 100% accurate, audited, scholarly-verified, final JSON/Lake format. | ✅ Production Ready |

**Promotion Rule**: A book only enters **3-GOLD** when it is **100% complete** (all chapters/verses). Partial books (e.g. "Chapter 1 only") must remain in **2-SILVER** until the entire work is processed.

- **Audit**: Run `python scripts/vishwa.py audit` before promotion to Gold.
- **Verification**: Spot-check 5% of verses against canonical editions.

### SDLC Release Flow
1. Pick the top unchecked task from `docs/backlog.md`.
2. Implement it. Run lint → build → test. Fix any failures before proceeding.
3. Mark the task `[x]` in the backlog.
4. Add a brief entry to `docs/release-notes.md` under the current version.
5. After completing an entire epic: run coverage report, verify thresholds, update release notes with an epic-complete summary.
6. No task is "done" until lint, build, and tests all pass.

### Stability Gate (STAB-608)
- EPIC 7 (STABILITY) tasks STAB-601 through STAB-607 must be 100% complete before any new feature epics begin.
- New feature work = EPIC 6, EPIC 9, EPIC 10, or any new APP-/LAB- tasks.

## 3. Coding Standards (Ultra-Lean)

### TypeScript
- **Strict mode** (`strict: true`) is non-negotiable. Never disable.
- **No `any`** without an explicit inline justification comment.
- Prefer `unknown` for external/unvalidated data; narrow with type guards.
- Use `interface` for object shapes, `type` for unions/aliases.
- No unused variables or imports (ESLint will catch these).
- `noUncheckedIndexedAccess` is recommended for array safety; enable when feasible.

### Naming & File Organization
- File names: `lowercase-kebab-case.tsx` / `.ts`
- Component names: `PascalCase`
- Hook names: `use-` prefix + `camelCase` (e.g., `useDebouncedSearch`)
- Module-level constants: `SCREAMING_SNAKE_CASE`
- Local constants: `camelCase`
- One component per file, default export for pages/components.
- Max ~300 lines per component file — extract when exceeded.
- Max ~50 lines per function — extract helpers when exceeded.

### React / Next.js Rules
- `'use client'` only when browser APIs, state, or event handlers are genuinely needed.
- Prefer Server Components and SSG by default.
- No `useEffect` for data that can be fetched at build time (SSG).
- All `localStorage` reads must happen inside `useEffect` to prevent hydration mismatches.
- `key` props must be stable identifiers — never use array index for dynamic lists.
- `console.log` is forbidden in committed code. Use `console.error` only for error logging.
- No `TODO` comments in code — convert to backlog tasks.

### API Routes
- Validate all request body fields before processing.
- Return consistent shape: `{ success: boolean, data?: T, message?: string }`.
- Wrap all async logic in `try/catch`. Log errors with `console.error`.
- No `TODO` comments — document stub status in code with a `// STUB:` comment + backlog reference.

### Git Hygiene
- Commit message format: `type(scope): description`
  - Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`
  - Example: `fix(study-client): enforce 2-author limit in toggle logic`
- No stray `logs/`, `dumps/`, `tmp/`, or `.bak` files committed.
- Remove all `console.log` calls before committing.

## 4. UI Template Standard — Lean Reading Interface
The Lean UI Template is the official UI standard for all scripture reading interfaces.

### Core Rules
- **Base layer**: Sanskrit + English meaning always visible.
- **Commentary hidden by default** — user must opt-in by selecting an author.
- **Max 2 authors** selected at once; selecting a 3rd replaces the oldest active author.
- **AI synthesis** includes meaning + up to 2 commentaries regardless of UI selection.
- **Language filter** applies to commentary only, not to the base layer.
- **Responsive toolbar**: inline on desktop, stacked on mobile.
- **Initial state**: `scholarSelection = []`, `languageSelection = 'all'`.

### Expected Behavior
- Author selector uses button-style controls (not dropdown).
- Commentary renders only when at least one author is selected.
- AI analysis is always available and uses the current context.
- User preferences persist via `localStorage` (`vishwa_scholar_pref`, `vishwa_continue_reading`).

### State Management
```typescript
scholarSelection: string[]          // max 2 items
languageSelection: string           // 'all' | 'en' | 'hi' | 'mr'
synthesisMap: Record<string, { text: string; loading: boolean }>
```

### Implementation Expectations
- Hide commentary when `scholarSelection.length === 0`.
- Keep meaning visible on initial load.
- Enforce 2-author rule in toggle logic.
- If UI template detail is needed, consult this section.

## 5. Lint & Build Quality Gates (Mandatory Before Every Commit)

```bash
npm run lint    # Must exit 0 — zero ESLint errors or warnings configured as errors
npm run build   # Must exit 0 — zero TypeScript errors, zero build errors
npm test        # All tests must pass — zero failures
```

These three gates are **blocking**. No commit proceeds if any of them fail.

### ESLint Configuration Requirements
- `@next/eslint-plugin-next` recommended + core-web-vitals rules (active).
- `@typescript-eslint` plugin with at minimum: `no-explicit-any`, `no-unused-vars`, `no-non-null-assertion`.
- All rules configured as errors, not warnings, for blocking quality.

### TypeScript Build Requirements
- `npm run build` must report zero TypeScript errors.
- Never use `// @ts-ignore` or `// @ts-nocheck` to suppress errors — fix the root cause.
- `skipLibCheck: true` is acceptable for third-party types only.

## 6. Quality & Testing Standards

### Coverage Targets
- **Enforced floor**: 80% statements, branches, functions, lines (via `jest.config.js` `coverageThreshold`).
- **Goal**: 95% for core product paths: `StudyClient`, `SearchClient`, `VedicDataService`, API synthesis.
- **Stability gate**: No new feature epics begin until core paths reach 80% floor.

### Test Requirements
- Every new component: render test + happy-path interaction test + at least one edge-case test.
- Every new API route: valid input test + each invalid input case + error path test.
- Every new utility function: unit tests for all code branches.
- Test files live in `__tests__/` mirroring the source path.
- Use `@testing-library/react` for component tests.
- Mock `next/navigation`, `next-intl`, and `localStorage` in component tests.
- No snapshot tests — use explicit assertions.
- No mocking the module under test — only mock external dependencies.

### Mock Policy
- PoC/placeholder code must be either:
  - Gated behind a feature flag, OR
  - Labeled clearly in the UI with a `// STUB: [BACKLOG-TASK-ID]` comment, OR
  - Replaced with a real implementation.
- Simulated/hardcoded "mock" responses in production components are not acceptable for release.

## 7. Data & Architecture Standards
- **Gold Standard Only**: The UI must NEVER hook into Bronze or Silver data. Only Gold-tier data is registered in `lib/texts.ts`.
- **Completeness Rule**: A book is either available in Gold (Full) or not available in the UI. No "Chapter 1 coming soon" placeholders in production.
- **NVF compliance**: Sanskrit → Transliteration → Meaning → HI/MR commentary layers.
- **Static-first**: SSG by default; client-side fetching only when unavoidable.
- **Sharded data**: Large scriptures use chapter-level JSON in `data/`.
- **Data service**: Always use `lib/data-service.ts` for data access — never bypass it.
- **Hydration safety**: Avoid browser-only APIs (`localStorage`, `window`) during first render.
- **Performance**: Initial bundle must stay small. No heavy libraries imported client-side without code splitting.
- **Schema validation**: All `data/` files must pass NVF schema validation before use.
- **Link integrity**: All internal shloka references must resolve.

## 8. Compliance & Legal
- Use only CC0 or explicitly permitted translations.
- Include `source_url` and `license_type` for all author commentary layers.
- Clearly label AI-generated metadata as such in the data and UI.

## 9. Hygiene
- Remove temporary files before merge.
- No stray `logs/`, `dumps/`, `tmp/`, or `.bak` files.
- Keep docs confined to the six active files listed in Section 1.
- The `coverage/` directory is gitignored — do not commit coverage reports.

---
# Book Integration Checklist (TMPL-903)

This checklist is the authoritative gate list for onboarding any new book into Vishwa-Vani. Every item must be ticked before the book is considered production-ready.

---

## Phase 1 — Data Pipeline (INGEST)

### 1.1 Raw Acquisition
- [ ] Source text obtained (BORI Critical Edition or equivalent public-domain edition)
- [ ] License verified: CC0 or explicitly permitted translation
- [ ] Raw file stored in `data/1-bronze/<book-slug>/`

### 1.2 NVF Normalisation
- [ ] Convert to NVF 1.3 schema: `id`, `original`, `transliteration`, `layers[]`
- [ ] Each verse has at least one `translation` layer (`lang: 'en'`)
- [ ] Sanskrit (`lang: 'sa'`) present in `original` field
- [ ] Transliteration present (ISO 15919 or Harvard-Kyoto)
- [ ] Silver files stored in `data/2-silver/<book-slug>/`

### 1.3 Schema Validation
- [ ] Run `python scripts/vishwa.py audit <book-slug>` — zero errors
- [ ] Verse count matches canonical edition count (within ±2%)
- [ ] No missing `id` fields; all IDs follow `<slug>_<chapter>_<verse>` format
- [ ] Gold files promoted to `data/3-gold/<book-slug>/`

### 1.4 Commentary Layers (if available)
- [ ] At least 2 scholarly commentaries per verse (or documented gap)
- [ ] Each commentary layer has: `author`, `author_name`, `author_bio`, `lang`, `content`
- [ ] Content length > 80 characters per layer (required by `isValidCommentaryContent`)
- [ ] `source_url` and `license_type` present on all author layers

### 1.5 AI Enrichment
- [ ] `ai_metadata.topics` populated for each verse
- [ ] Enrichment run and validated: no hallucinated author attributions
- [ ] Content flagged if AI-generated (label in `ai_metadata.generated_by`)

---

## Phase 2 — UI Implementation (INTERFACE)

### 2.1 Lean Template Compliance (mandatory)
- [ ] **Base layer visible by default**: Sanskrit `original` + English `meaning` always shown
- [ ] **Commentary hidden by default**: `scholarSelection` initialises as `[]`
- [ ] **Max 2 authors**: `toggleScholar` enforces replacement when > 2 selected
- [ ] **Language filter on commentary only**: meaning is never language-filtered
- [ ] **Initial state**: `scholarSelection = []`, `languageSelection = 'all'`
- [ ] **Author selector**: button-style, shows `0/2` counter

### 2.2 Navigation System
- [ ] Book registered in `lib/texts.ts` → `VEDIC_LIBRARY`
- [ ] `totalChapters` correct; `chapterNames` populated for all chapters
- [ ] Breadcrumb renders correctly: `← Library · <BookName> · Chapter N`
- [ ] Prev / Next chapter buttons work at boundary chapters (ch 1 and last)
- [ ] If parva/adhyaya structure: adhyaya sub-nav visible; URL uses `?adhyaya=N`

### 2.3 Responsive Design
- [ ] Toolbar collapses gracefully on mobile (≤ 375px)
- [ ] Long Sanskrit verses do not overflow their container (`max-w-full`, `break-words`)
- [ ] Commentary cards use `overflow-wrap: anywhere`

### 2.4 Accessibility
- [ ] Author selector buttons have `title` attribute (bio text)
- [ ] Language `<select>` has `aria-label` or `<label>` association
- [ ] AI Analysis button disabled state is visually distinct

---

## Phase 3 — API Integration (CONNECTIVITY)

### 3.1 Data Service
- [ ] `VedicDataService.getChapterData('<book-slug>', N)` returns non-null
- [ ] Navigation prev/next resolves correctly for all chapters
- [ ] Lake or JSON storage path configured in `VEDIC_LIBRARY` entry

### 3.2 Synthesis Endpoint
- [ ] `/api/synthesize` accepts `verseId` from this book — responds 200
- [ ] `synthesisMode` field present in response

### 3.3 Caching
- [ ] `dataCache` hit confirmed on second identical request (same object reference)

---

## Phase 4 — App Ecosystem (ENGAGEMENT)

- [ ] Key philosophical themes identified for this book
- [ ] At least 1 micro-app task filed in backlog referencing this book
- [ ] Verse-to-app links visible on at least one representative chapter

---

## Phase 5 — Quality Assurance (VALIDATION)

### 5.1 Tests
- [ ] `__tests__/lib-texts.test.ts` updated to assert new book exists in `VEDIC_LIBRARY`
- [ ] At least 2 integration tests covering lean template with this book's mock data
- [ ] All 54+ tests pass: `npx jest`

### 5.2 TypeScript
- [ ] `npx tsc --noEmit` exits 0 after adding the new book

### 5.3 Content Accuracy
- [ ] Spot-check: 5 random verses verified against source edition
- [ ] Author attributions cross-checked (no hallucinated commentators)

### 5.4 Release Notes
- [ ] New entry in `docs/release-notes.md` listing book name, chapter count, commentary count
- [ ] Backlog items for the book marked `[x]` with done notes
- [ ] Version bumped (patch for new book integration)

---

## Required Metadata Fields (per `VedicText` interface)

| Field | Required | Notes |
|-------|----------|-------|
| `slug` | ✅ | URL-safe, lowercase-kebab |
| `name` | ✅ | English display name |
| `nameHi` | ✅ | Hindi display name |
| `totalChapters` | ✅ | Exact count |
| `chapterNames` | ✅ | All chapter numbers as keys |
| `category` | ✅ | One of: itihas, upanishad, veda, purana, other |
| `available` | ✅ | `true` only when Phase 1–3 complete |
| `storage` | ✅ | `'lake'` or `'json'` |
| `description` | ✅ | 1–2 sentence summary |
| `lakeFile` | if lake | e.g. `'vedic-lake.db'` |
| `contextualInfo` | recommended | speaker, listener, era, themes |

---

_This checklist supersedes any informal book onboarding notes. See `docs/standards.md` §4 for the Lean UI Template rules._

---

_This consolidated standards file keeps the documentation set small while preserving the full implementation intent._
_Last updated: 2026-04-09_
