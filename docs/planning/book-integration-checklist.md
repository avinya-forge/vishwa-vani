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
