# 🛠️ Vishwa-Vani: Standards, Architecture, and UI Template

This file is the single source of truth for standards, architecture principles, UI template requirements, and document policy.

## 📁 Active Documentation Set
- `docs/vision.md` — Strategic direction and product intent.
- `docs/backlog.md` — The single active backlog and roadmap.
- `docs/release-notes.md` — Release history and completed work.
- `docs/standards.md` — Standards, architecture principles, UI template requirements, and document policy.

> If UI template details are required, use the UI Template section in this file; no separate UI template document is required.

---

## 1. Document Policy
- Only four active docs are tracked under `docs/`.
- New documentation may be added only by explicit approval.
- Planning lives in `docs/backlog.md`.
- Completed work is recorded in `docs/release-notes.md`.
- Vision stays in `docs/vision.md`.
- Standards and process rules live in `docs/standards.md`.

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

## 5. Architecture Principles
- **Static-first**: prefer SSG; client-side intelligence only when needed.
- **Sharded data**: use chapter-level JSON for large scriptures.
- **NVF compliance**: normalize and version data.
- **Data service**: use `lib/data-service.ts` for unified access.
- **Search**: prefer build-time indexes or lightweight local search.
- **Navigation**: auto-register books from filesystem metadata.

## 6. API Expectations
- `GET /v1/manifest` — list scriptures and metadata.
- `GET /v1/verse/{slug}/{chapter}/{verse}` — verse data with commentary layers.
- `POST /v1/search` — semantic search input.
- `POST /v1/synthesize` — AI synthesis using meaning plus up to 2 commentaries.
- Security: bearer tokens or OAuth2 where required.
- Rate limits should be defined per consumer tier.

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

_This consolidated standards file keeps the documentation set small while preserving the full implementation intent._
