# 🛠️ Vishwa-Vani: Standards, Architecture, and UI Template

This file is the single source of truth for standards, UI template requirements, and document policy.

## 📁 Active Documentation Set
- `README.md` — Vision and Pulse-Table.
- `docs/vision.md` — Strategic direction and product intent.
- `docs/planning/backlog.md` — The single active backlog and roadmap.
- `docs/release-notes.md` — Release history and completed work.
- `docs/architecture/blueprint.md` — Architectural principles and API expectations.
- `docs/rules/standards.md` — Standards, UI template requirements, and document policy.

> If UI template details are required, use the UI Template section in this file; no separate UI template document is required.

---

## 1. Document Policy
- Only six active docs are tracked in the documentation set.
- New documentation may be added only by explicit approval.
- Hierarchical SSOT: `README.md` (Vision) > `docs/architecture/blueprint.md` (Blueprints) > `docs/rules/standards.md`
- Mandatory Trifecta: `README.md`, `docs/planning/backlog.md`, and `docs/release-notes.md` must exist.
- Planning lives in `docs/planning/backlog.md`.
- Completed work is recorded in `docs/release-notes.md`.
- Vision stays in `docs/vision.md`.
- Architecture stays in `docs/architecture/blueprint.md`.
- Standards and process rules live in `docs/rules/standards.md`.

## 2. Development Process
### ADF Workflow: Data Tiers
- **BRONZE**: Raw source text and OCR.
- **SILVER**: Structured NVF drafts and staging.
- **GOLD**: Audited, sharded NVF 1.0 in `data/`.
- **Audit**: Run `python scripts/vishwa.py audit` before promotion.
- **Build**: Use `npm run build`; deploy only from GOLD data.

### Release Flow
- Backlog → implementation → release notes.
- No extra tracked documents are required.

## 3. Coding Standards
- Enable TypeScript strict mode.
- Avoid `any` without documented justification.
- File names: `lowercase-kebab-case.tsx`.
- Component names: `PascalCase`.
- Data hooks: `use-` prefix.
- Keep components and logic small and testable.
- Prefer vanilla JS/CSS or WASM for small tasks.

## 4. UI Template Standard
The Lean UI Template is the official UI standard.

### Core rules
- **Base layer**: Sanskrit + English meaning always visible.
- **Commentary hidden by default**.
- **Max 2 authors** selected at once.
- **AI synthesis** includes meaning + up to 2 commentaries.
- **Language filter** applies to commentary only.
- **Responsive toolbar**: inline on desktop, stacked on mobile.
- **Initial state**: `scholarSelection = []`, `languageSelection = 'all'`.

### Expected behavior
- Author selector uses button-style controls.
- Selecting a third author replaces the oldest active author.
- Commentary renders only with selected authors.
- AI analysis is always available and uses current context.
- User preferences persist via localStorage.

### State management
- `scholarSelection: string[]`
- `languageSelection: string`
- `synthesisMap: Record<string, {text:string; loading:boolean}>`

### Implementation expectations
- Hide commentary when no authors are selected.
- Keep meaning visible on initial load.
- Enforce the 2-author rule in toggle logic.
- If UI template detail is needed, consult this section.

## 7. Quality & Testing
- **Textual hardening**: Sanskrit and transliteration must align.
- **Hydration safety**: avoid browser-only logic during first render.
- **Performance**: initial bundle should stay small.
- **Schema validation**: CI verifies `data/` against NVF.
- **Link integrity**: all internal shloka references resolve.
- **Testing**: new work requires corresponding tests.
- **Coverage target**: maintain at least 95% unit test coverage for core product code before greenlighting new feature epics.
- **Stability gate**: existing product fix work and coverage remediation must complete before significant new feature development begins.

## 8. Compliance & Legal
- Use only CC0 or explicitly permitted translations.
- Include `source_url` and `license_type` for author layers.
- Clearly label AI-generated metadata.

## 9. Hygiene
- Remove temporary files before merge.
- No stray `logs/`, `dumps/`, `tmp/`, or `.bak` files.
- Keep docs confined to the four active files.

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

_This checklist supersedes any informal book onboarding notes. See `docs/rules/standards.md` §4 for the Lean UI Template rules._

---

_This consolidated standards file keeps the documentation set small while preserving the full implementation intent._
