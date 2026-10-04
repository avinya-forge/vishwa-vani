# 🚀 Vishwa-Vani: Global Project Master Status

*Last Updated: 2026-10-04 21:55:00*

**Overall Health:** 7 Gold Books | 8 Integrated with UI

## 🛡️ Production-Readiness & Security Audit (2026-10-04)

**Verdict:** NOT production-hardened. `npm audit --omit=dev` reports 0 dependency vulnerabilities, but live probes of https://www.vishwa-vani.co.uk found configuration, deployment and application-level defects. Two audit passes logged **~50 items** in `docs/backlog.md` (**EPIC 00 = TOP-20 NOW**, EPIC 0 = first-pass audit, plus 8 behavioural-test items). No browser agent was available; visual checks are derived from live HTML/CSS + code and a Playwright sweep is queued (`QA-001`).

| Live-verified blocker | Item | Severity |
|---|---|---|
| Apex `vishwa-vani.co.uk` TLS cert invalid (valid only for `www`), yet canonical/OG/sitemap use apex | `OPS-001` | P0 |
| Live build drifted from `main` (feedback API enforces 200 chars; repo/UI say 50); CI never deploys; health shows `version: unknown` | `OPS-002`, `PROD-001` | P0 |
| Feedback broken: limit mismatch, malformed JSON → 500, FAB (z-1000) overlaps modal (z-50), unscrollable dialog, undefined `xs:` breakpoint | `BUG-FB-001` | P0 |
| 21 MB content DB publicly downloadable (bandwidth cost + scraping) — must be phased (search depends on it) | `SEC-010` | P0 |
| Unauthenticated Gemini endpoint, ineffective rate limit → financial exposure | `SEC-012` | P0 |
| ~2,450 of 2,485 sitemap URLs are empty shells (Mahabharata/Bhagavatam); gating not enforced in prod | `SEO-001` | P0 |
| Whole app SSR'd in `visibility:hidden`; Gita chapter pages 557–959 KB; soft-404s; "1,500++" header; og-image 404 | `UI-001`, `PERF-001`, `PROD-003`, `UI-002`, `PROD-005` | P1–P2 |
| No real browser-level behavioural tests (Playwright installed but unused) | `TEST-001`…`TEST-007`, `TEST-LT-001` | P0–P2 |

**Plan:** Top-20 NOW executes safest-first (config/deploy fixes → feedback → financial/security phased → SEO/UX → test gate), each flag-guarded or backward-compatible with a rollback via previous Vercel deployment. Implemented so far: 0/20.

**Active Blockers/Risks:** invalid apex certificate (OPS-001), deploy drift (OPS-002), cost exposure (SEC-010, SEC-012), thin-content SEO risk (SEO-001).


## 🏆 Production Grade (GOLD)

### Isha Upanishad
**Readiness Score: 100.0%** [██████████]
- **Slug:** `isha-upanishad` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `1/1` | Verses: `19/19`
- **Linguistic:** Layers: `4/4` | Authors: `3/2`
> Smallest Upanishad.

### Kena Upanishad
**Readiness Score: 100.0%** [██████████]
- **Slug:** `kena-upanishad` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `1/1` | Verses: `34/34`
- **Linguistic:** Layers: `4/4` | Authors: `2/2`
> Nature of Brahman.

### Bhagavad Gita
**Readiness Score: 90.0%** [█████████░]
- **Slug:** `bhagavad-gita` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `18/18` | Verses: `700/700`
- **Linguistic:** Layers: `4/4` | Authors: `5/10`
> 18 Chapters. Universal dialogue.

### Stotras & Stuties
**Readiness Score: 60.42%** [██████░░░░]
- **Slug:** `stotras` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `0/100` | Verses: `17/1000`
- **Linguistic:** Layers: `4/4` | Authors: `4/2`
> Hymn collection.

### Mahabharata (All 18 Parvas)
**Readiness Score: 60.35%** [██████░░░░]
- **Slug:** `mahabharata` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `299/2115` | Verses: `19580/100000`
- **Linguistic:** Layers: `2/3` | Authors: `2/2`
> The Great Epic.

### Srimad Bhagavatam (12 Cantos)
**Readiness Score: 51.85%** [█████░░░░░]
- **Slug:** `bhagavata-purana` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `19/335` | Verses: `718/18000`
- **Linguistic:** Layers: `2/4` | Authors: `2/2`
> 12 Cantos, 18,000 Verses.

### Yoga Sutras of Patanjali
**Readiness Score: 45.03%** [████░░░░░░]
- **Slug:** `yoga-sutras` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `1/4` | Verses: `10/196`
- **Linguistic:** Layers: `2/4` | Authors: `1/2`
> Aphorisms of Yoga.

## 🚧 In Progress (SILVER/BRONZE)

### Vishnu Purana
**Readiness Score: 27.4%** [██░░░░░░░░]
- **Slug:** `vishnu-purana` | **UI:** READY | **Vedic Lab:** INTEGRATED
- **Structural:** Chapters: `6/126` | Verses: `6/7000`
- **Linguistic:** Layers: `1/3` | Authors: `0/2`
> Chronicle of Vishnu.

### 16 Samskaras (Ritual Handbook)
**Readiness Score: 26.35%** [██░░░░░░░░]
- **Slug:** `samskaras` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `1/1` | Verses: `3/16`
- **Linguistic:** Layers: `1/3` | Authors: `0/2`
> Life-cycle rituals.

### Garuda Purana
**Readiness Score: 6.79%** [░░░░░░░░░░]
- **Slug:** `garuda-purana` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `2/250` | Verses: `2/19000`
- **Linguistic:** Layers: `1/3` | Authors: `0/2`
> Dialogues on death.

### Rigveda Samhita
**Readiness Score: 0.0%** [░░░░░░░░░░]
- **Slug:** `rigveda` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `0/10` | Verses: `0/10552`
- **Linguistic:** Layers: `0/3` | Authors: `0/2`
> Oldest Veda.

### Brahma Sutras
**Readiness Score: 0.0%** [░░░░░░░░░░]
- **Slug:** `brahma-sutras` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `0/4` | Verses: `0/555`
- **Linguistic:** Layers: `0/3` | Authors: `0/2`
> Vedanta philosophy.

### Manusmriti
**Readiness Score: 0.0%** [░░░░░░░░░░]
- **Slug:** `manusmriti` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `0/12` | Verses: `0/2684`
- **Linguistic:** Layers: `0/3` | Authors: `0/2`
> Code of Manu.

### Dasbodh
**Readiness Score: 0.0%** [░░░░░░░░░░]
- **Slug:** `dasbodh` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `0/20` | Verses: `0/7751`
- **Linguistic:** Layers: `0/3` | Authors: `0/2`
> Samarth Ramdas.

### Samaveda Samhita
**Readiness Score: 0.0%** [░░░░░░░░░░]
- **Slug:** `samaveda` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `0/2` | Verses: `0/1875`
- **Linguistic:** Layers: `0/3` | Authors: `0/2`
> Veda of melodies.

### Yajurveda Samhita
**Readiness Score: 0.0%** [░░░░░░░░░░]
- **Slug:** `yajurveda` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `0/40` | Verses: `0/1975`
- **Linguistic:** Layers: `0/3` | Authors: `0/2`
> Veda of rituals.

### Atharvaveda Samhita
**Readiness Score: 0.0%** [░░░░░░░░░░]
- **Slug:** `atharvaveda` | **UI:** HIDDEN | **Vedic Lab:** PENDING
- **Structural:** Chapters: `0/20` | Verses: `0/5977`
- **Linguistic:** Layers: `0/3` | Authors: `0/2`
> Veda of formulas.

## 🌑 Backlog

*No books in this stage.*

---
## 🛠️ Verification Methodology
1. **Code View**: Actual unique verse IDs and layers counted from `data/` tiers.
2. **Canonical View**: Measured against established targets.
3. **Integrity Check**: Automatic detection of placeholder patterns.
