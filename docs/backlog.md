# 🕉️ Vishwa-Vani: Aligned Master Backlog [SDLC v8.2 – Retention & User Experience]

## EPIC 00: LIVE PRODUCTION STABILISATION - TOP-20 NOW (2026-10-04, verified against https://www.vishwa-vani.co.uk) - Priority 0
> **Method:** read-only probes of the live site (HEAD/GET, plus invalid-input POSTs that cannot create issues) + source review. No browser agent was available in this session, so visual/pixel checks are derived from live HTML/CSS and code; a full Playwright screenshot sweep is queued as `QA-001`. **Rule for this sprint:** every item must be backward-compatible, flag-guarded or config-only where possible, with rollback noted - *no change may break reading, search or feedback, add recurring cost, or widen security exposure.* Items are in execution order (safest/highest-impact first).

### TOP-20 NOW (ranked)
- [ ] `OPS-001` **[NOW #1][P0-CRITICAL] Apex domain has an invalid TLS certificate**: `https://vishwa-vani.co.uk` fails with *"certificate is valid for www.vishwa-vani.co.uk, not vishwa-vani.co.uk"*; `http://vishwa-vani.co.uk` 308-redirects to that broken HTTPS apex. Yet `SITE_URL`, canonical/OG URLs, the `robots.txt` sitemap pointer and all 2,485 sitemap URLs use the **apex** -> browsers warn, crawlers/social scrapers fail. *Fix (config-only, zero code risk):* add apex to the Vercel project + correct DNS (A `76.76.21.21`) so a cert is issued, **or** set `NEXT_PUBLIC_SITE_URL=https://www.vishwa-vani.co.uk` and redirect apex->www. *AC:* `curl -I https://vishwa-vani.co.uk` valid; canonical host == served host.
- [ ] `OPS-002` **[NOW #2][P0-CRITICAL] Live build has drifted from `main`** (root-cause class of "feedback is broken"): live `/api/feedback` returns *"Message must be at least **200** characters"* while `main` enforces **50** (route + widget). Auto-deploy is disabled (`vercel.json: git.deploymentEnabled=false`), CI never deploys (see `PROD-001`), and `/api/health` reports `version: "unknown"`. *Fix:* deploy `main` through CI after `PROD-001`; expose commit SHA via `VERCEL_GIT_COMMIT_SHA` in `/api/health`; add post-deploy smoke check. *AC:* health SHA == `git rev-parse origin/main`.
- [ ] `BUG-FB-001` **[NOW #3][P0-HIGH] Feedback flow defects (user-reported)**: (a) client/server limits diverge (UI says 50, live server 200 -> users see a raw server error after the UI said they passed); (b) malformed/`null` JSON body -> HTTP 500 (verified live) instead of 400; (c) floating button `z-[1000]` sits **above** the modal overlay `z-50`, covering the Submit/Cancel area on small screens; (d) modal has no `max-h`/`overflow-y-auto` -> Submit unreachable on short viewports; (e) label uses undefined Tailwind breakpoint `xs:` (not in the v4 theme) so the "Feedback" text never renders; (f) no Esc-to-close, focus trap, `role="dialog"`/`aria-modal`; (g) success links to a GitHub issue URL users may not be able to open; (h) mocked `success:true` when `GITHUB_TOKEN` is missing (absorbs `PROD-015`) - silent data loss. *Fix:* shared `lib/feedback-config.ts` (MIN/MAX lengths) used by both sides, try/catch JSON -> 400, z-index scale (FAB < modal), scrollable dialog, a11y dialog semantics, prod returns 503 not mock, fallback `mailto:`/retry UI. *AC:* behavioural test `TEST-002` passes at 360px and 1280px.
- [ ] `SEC-010` **[NOW #4][P0-CRITICAL][PHASED] 21 MB `vedic-lake.db` publicly downloadable (verified live: 200, 21,663,744 bytes)** - content scraping + Vercel bandwidth cost per download. **Do NOT simply delete: client search (`lib/lake.ts` worker) depends on it.** *Phase 1 (safe, immediate):* Vercel WAF/edge rate rule on `/vedic-lake.db`, long-lived `Cache-Control` + ETag, bot rules. *Phase 2:* server-side search API over a gated shard (`INFRA-002`), then remove the file from `public/` and `git rm --cached`. *AC:* search works after each phase; bandwidth alert configured.
- [ ] `SEC-012` **[NOW #5][P0-CRITICAL] Financial exposure: unauthenticated Gemini endpoint + ineffective rate limit.** Per-instance in-memory limiter + spoofable XFF. *Fix:* distributed limiter (Vercel KV/Upstash or WAF), per-route budgets, **hard daily cap/kill-switch env flag** (`SYNTHESIS_ENABLED`), set a **budget/quota alert and cap in Google Cloud** for the key; deterministic fallback already exists. *AC:* test proves 429 + cap behaviour.
- [ ] `SEC-013` **[NOW #6][P0-HIGH] GitHub issue injection + PII**: sanitise/allow-list `type`, `scholarId`; length caps; escape `@mentions`/markdown; remove email from the public issue body (store privately / mask); integer rating. Implemented through the shared guard in `SEC-017`.
- [ ] `SEC-011` **[NOW #7][P0-HIGH][PHASED] Hardcoded AES key** in `lib/server-lake.ts`. *Phase 1:* read key from `LAKE_KEY` env with the identical current value (no data change, no breakage), fail closed when absent in prod. *Phase 2:* rotate key + re-encrypt lake, remove literal from repo (and history if needed). *AC:* decrypt tests; no literal in tree.
- [ ] `PROD-001` **[NOW #8][P0-CRITICAL] CI never triggers on push/PR** (monthly cron + manual only) - enables `OPS-002` drift. Add `pull_request` + `push: main` triggers; keep deploy job gated on `main`. *AC:* PR shows lint/tsc/jest/build.
- [ ] `SEO-001` **[NOW #9][P0-HIGH] ~98% of sitemap URLs are empty shells**: of 2,485 URLs, 2,115 are `mahabharata/*` and 335 `bhagavata-purana/*`; sampled pages (`/mahabharata/1500`, `/bhagavata-purana/200`) render "Parva 1500 / 0 Scholars / 0/2" with no verse content (and mislabel Mahabharata chapters as "Parva 1500"). The `SEC-005` gating is **not enforced in production** (`STRICT_DEMO_GATING` unset). Thin-content penalty risk + wasted serverless cost. *Fix:* restrict sitemap/`generateStaticParams` to chapters with real content, `noindex` + friendly "not yet available" for the rest, default gating to **fail-closed in production**. *AC:* sitemap lists only verified-content URLs.
- [ ] `PROD-003` **[NOW #10][P1-HIGH] Soft-404s & lax routing (verified live)**: `/isha-upanishad/1/abc`, `/isha-upanishad/99/1`, `/isha-upanishad/0` return **HTTP 200** with "Verse Not Found" shells; `/BHAGAVAD-GITA/1` returns 200 with not-found content (case-sensitive slug, no redirect). *Fix:* validate params (`^\d+$`), call `notFound()`, lowercase-redirect slugs. *AC:* 404 for invalid; 308 for case variants.
- [ ] `PERF-001` **[NOW #11][P1-HIGH] Oversized pages (verified live)**: `/bhagavad-gita/1` ~557 KB and `/bhagavad-gita/18` ~**959 KB** of HTML (all verses + commentaries inlined in the RSC payload) -> slow on mobile data and high egress cost. *Fix:* paginate/virtualise verses, defer commentary layers to on-demand fetch, split `study-client.tsx` (1,019 lines). *AC:* chapter HTML < 250 KB; LCP budget in CI.
- [ ] `UI-001` **[NOW #12][P1-HIGH] Entire app SSR'd inside `visibility:hidden`** (live HTML: `<div style="visibility:hidden">` wrapping header/main/footer, set by `LocaleProvider` until hydration) -> blank page until JS runs, bad LCP/CLS, invisible to no-JS crawlers/readers, flash on slow devices. *Fix:* render visible server-side with the default locale; apply the stored locale after mount without hiding. *AC:* SSR HTML has no `visibility:hidden` wrapper; covered by `TEST-001`.
- [ ] `UI-002` **[NOW #13][P1-MEDIUM] Visible content/polish defects**: header stat renders **"1,500++"** (template appends `+` to a value that already has one, `Header.tsx:184`); footer hard-coded fake status "Verse Archive: Active"; stats ("8 texts", "1,500+ verses") hard-coded vs data; Bhagavatam card says "335 chapters" while only Canto 1 exists; footer GitHub links point to `github.com/vishwa-vani` while issues go to `avinya-forge/vishwa-vani` (verify/fix); duplicate `italic italic` class; custom `.max-wide` class; mobile spacing/edge review. *AC:* values derived from data; visual snapshot approved.
- [ ] `A11Y-001` **[NOW #14][P1-HIGH] Anti-copy "SecurityShield" + inline script**: blocks selection/copy/context-menu/F12 (WCAG 2.1 failure, hostile to screen readers, trivially bypassed, `alert()` on copy). Remove client blocking; rely on `SEC-010/012` server protections. *AC:* keyboard & AT users can select/copy.
- [ ] `SEC-015` **[NOW #15][P1-HIGH][SAFE ROLLOUT] Weak CSP** (`unsafe-inline`/`unsafe-eval`; missing `object-src`, `base-uri`, `form-action`, `frame-ancestors`). *Rollout:* ship as `Content-Security-Policy-Report-Only` first with nonce, monitor, then enforce - avoids breaking GA/fonts/workers.
- [ ] `SEC-017` **[NOW #16][P1-HIGH] API guard**: zod schemas, body-size cap (413), content-type check (415), malformed JSON -> 400 (live currently 500), same-origin check, integer coercion; shared by all `/api/*` routes.
- [ ] `PROD-008` **[NOW #17][P1-HIGH][LEGAL/FINANCIAL] Analytics without consent** (UK GDPR/PECR; `.co.uk`): GA4 + Vercel Analytics load unconditionally with a hard-coded fallback ID. Add consent banner, env-only ID, privacy policy. Fines are a financial risk.
- [ ] `PROD-004` **[NOW #18][P1-HIGH] Error handling & observability**: add `app/global-error.tsx`, show error digest, ship errors to a free-tier tracker, structured logs; alert on 5xx. Pairs with `OPS-002` health SHA.
- [ ] `PROD-005` **[NOW #19][P2-MEDIUM] Broken social previews (verified live)**: `og:image` `/og-image.jpg` -> **404**, `twitter:image` `/twitter-image.jpg` missing; no manifest/icons; `og:url` points to the broken-cert apex (see `OPS-001`). Generate `opengraph-image`, add `manifest.webmanifest`. *AC:* all referenced assets 200.
- [ ] `TEST-001` **[NOW #20][P0-HIGH] Behavioural (BDD) end-to-end test framework - short-term smoke suite as release gate.** `playwright` is already a dependency but unused; the current `e2e-smoke.test.ts` only asserts library data (not real browser behaviour - which is how drift/z-index/hidden-render bugs shipped). Add `@playwright/test`, an `e2e/` folder, projects for Chromium mobile (360x740), tablet (768), desktop (1280), light+dark; run against `next start` in CI and as a **read-only post-deploy check against production**. Scenarios (Given/When/Then naming): reader opens home -> content visible without hydration; reader opens chapter -> verses render; invalid verse -> 404; search "dharma" -> results; feedback dialog fits viewport, submit reachable, validation messages match server, success + failure paths (route mocked); theme toggle persists; language switch persists; apex/www cert + redirect check; health SHA matches. *AC:* suite < 5 min, required check on PRs.

### Behavioural / Test-Framework Items (short-term, high priority)
- [ ] `TEST-002` **[P0-HIGH]** Feedback journey behavioural tests (open -> fill < min chars -> error -> fill valid -> submit -> success; server 400/429/502/503 -> inline error + retry; FAB never overlaps dialog at 360px; Esc closes; focus returns to FAB).
- [ ] `TEST-003` **[P1]** Reading journey: home -> library -> chapter -> verse -> next/prev; bookmarks/"continue reading" survive reload; corrupted `localStorage` does not crash (`PROD-007`).
- [ ] `TEST-004` **[P1]** Search journey incl. worker-load failure fallback, empty/long/special-character queries, `?q=` deep links.
- [ ] `TEST-005` **[P1]** Responsive & visual regression matrix (all routes x 360/768/1280 x light/dark) with Playwright screenshots + axe-core assertions; fails on horizontal scroll, overlap of fixed elements, console errors.
- [ ] `TEST-006` **[P1]** API contract tests: every `/api/*` route with malformed/oversized/wrong-type/unicode bodies must return 4xx JSON (never 500), plus rate-limit behaviour.
- [ ] `TEST-007` **[P1]** Production synthetic monitor (scheduled GitHub Action, GET-only): homepage 200 + visible `<h1>`, valid cert on apex+www, sitemap parses, no asset 404s (og image, manifest), `/api/health` SHA; notify on failure.
- [ ] `QA-001` **[P1]** Page-by-page manual+automated walkthrough of every route (`/`, `/search`, `/lab` + each lab app, `/roadmap`, `/acknowledgments`, `/tattvas/*`, `/<text>/<chapter>[/<verse>]`, 404/error states) capturing screenshots at 3 viewports; file each defect as a `UI-xxx` item. (`/developer` exists in the repo but is 404 in production - decide: publish or remove links.)
- [ ] `TEST-LT-001` **[P2 long-term]** Adopt **playwright-bdd** (Gherkin `.feature` files bound to Playwright steps) once core journeys stabilise so product/curation stakeholders can read and author scenarios; keep Jest for unit/component tests; add visual-regression baseline storage and a flaky-test quarantine policy. Rationale: Playwright is already installed, avoids a second runner (Cypress/Cucumber-JS), and gives traces/videos for failed production checks.

### Re-prioritisation notes (first-pass audit -> NOW)
- Promoted: `PROD-001` (enables `OPS-002`), `SEC-012` (financial); `SEC-010`/`SEC-011` are now **phased** to avoid breaking search/data. `PROD-015` merged into `BUG-FB-001`.
- Demoted out of the Top-20 (still queued): `SEC-014` (mitigated by `SEC-012` caps + `SEC-017` limits), `PROD-007`, `PROD-006`, `PROD-011`, `SEC-016`, `PROD-012`.
- Correction to `PROD-002`: live `/robots.txt` currently serves `Allow: /` (app route wins), but a conflicting tracked `public/robots.txt` (`Disallow: /`) still exists and could flip behaviour on a build/config change -> downgraded to **P2 cleanup** (delete the static file).
- Safe-change protocol for every item: branch -> unit + behavioural test -> Vercel preview URL check -> deploy via CI -> post-deploy smoke (`TEST-007`) -> rollback = redeploy previous deployment.

## EPIC 0: UI Production-Readiness & Security Audit (2026-10-04) — Priority 0 (AUDIT-1 — superseded by TOP-20 NOW above)
> Source: full UI/API audit (app/, components/, lib/, middleware.ts, next.config.ts, CI). Items marked **[AUDIT-1 #n]** were the first-pass ranking; the committed sprint order is now **TOP-20 NOW** above. Related existing items: `SEC-008` (superseded by SEC-015/SEC-017), `SEC-004` (regressed, see PROD-002), `SEC-002` (conflicts with A11Y-001), `INFRA-002` (see PROD-011).

### Top-20 Items (ranked)
- [ ] `PROD-001` **[AUDIT-1 #1][P0-CRITICAL] CI/CD never runs on push/PR**: `.github/workflows/ci-cd.yml` only has `schedule` (monthly) + `workflow_dispatch` triggers, contradicting its header comment. No lint/test/build gate on PRs and the deploy job (`main` only) never fires on merge. *Fix:* add `push: [main]` and `pull_request` triggers; verify gates run. *AC:* PR shows lint/tsc/jest/build checks.
- [ ] `SEC-010` **[AUDIT-1 #2][P0-CRITICAL] Full content DB publicly downloadable & committed**: `public/vedic-lake.db` (21 MB) is git-tracked and served at `/vedic-lake.db`, bypassing the 100%-completion gating (SEC-005) and anti-scraping. *Fix:* move out of `public/`, `git rm --cached`, serve only via authenticated/rate-limited API or gated shard; purge from history if content is licensed/unreleased. *AC:* `GET /vedic-lake.db` → 404; search still works.
- [ ] `SEC-011` **[AUDIT-1 #3][P0-CRITICAL] Hardcoded AES-256 key in source**: `lib/server-lake.ts` embeds the "SECRET_KEY" literal; silent fallback returns raw ciphertext on decrypt failure. *Fix:* load from env (`LAKE_KEY`), rotate key, fail closed, re-encrypt data; document that client-side shard encryption is obfuscation only. *AC:* no key literal in repo; test for missing-key failure.
- [ ] `SEC-012` **[AUDIT-1 #4][P0-CRITICAL] Ineffective rate limiting / unauthenticated LLM cost abuse**: `middleware.ts` uses a per-instance in-memory `Map` (resets on every cold start/edge isolate) and trusts spoofable `x-forwarded-for`; `/api/synthesize` calls Gemini unauthenticated. *Fix:* distributed limiter (Upstash/Vercel KV or Vercel WAF), use `request.ip`/first XFF hop, stricter per-route budgets (synthesize 5/min, feedback 3/min), daily Gemini quota with fallback. *AC:* test proves 429 after budget across instances.
- [ ] `SEC-013` **[AUDIT-1 #5][P0-HIGH] GitHub issue injection & PII leak via feedback APIs**: `/api/feedback` and `/api/commentary-rating` interpolate unsanitised `type`, `message`, `email`, `scholarId`, `feedbackText` into issue title/body/labels (label injection, `@mention` spam, markdown/HTML injection, no max length) and publish user email in a public repo issue. *Fix:* allowlist `type`/`scholarId`, length caps (message ≤ 2000), escape markdown & mentions, drop email from public body (store privately), integer rating. *AC:* unit tests for each injection vector.
- [ ] `PROD-002` **[AUDIT-1 #6][P0-HIGH] Site de-indexed: `public/robots.txt` = `Disallow: /`** overrides `app/robots.ts` (`allow: /`) and sitemap; SEC-004 regressed. *Fix:* delete static file, define one policy (allow content, disallow `/api/`, AI-crawler rules). *AC:* `/robots.txt` returns app/robots.ts output.
- [ ] `SEC-014` **[AUDIT-1 #7][P1-HIGH] Prompt injection & unbounded input in `/api/synthesize`**: `contextTexts` unbounded in count/size; user text concatenated directly into the Gemini prompt; fallback echoes arbitrary client text (reflected content). *Fix:* cap array (≤3) & chars (≤2000 each), separate instructions from data, strip control chars, cap output, verify `verseId` exists server-side and build context from server data instead of client payload. *AC:* tests with 1 MB body & injection strings.
- [ ] `SEC-017` **[AUDIT-1 #8][P1-HIGH] API input validation & CSRF**: `request.json()` malformed → 500 not 400; `typeof` checks accept `NaN`/floats; no `Content-Type`/body-size checks; no Origin check on POST. *Fix:* shared `lib/api-guard.ts` with zod schemas, 413/415/400 handling, same-origin check. *AC:* ≥ 90% branch coverage on guard + routes.
- [ ] `SEC-015` **[AUDIT-1 #9][P1-HIGH] Weak CSP**: `script-src 'unsafe-inline' 'unsafe-eval'`, missing `object-src 'none'`, `base-uri`, `form-action`, `frame-ancestors`; unnecessary `api.github.com` in `connect-src`; inline `<script dangerouslySetInnerHTML>` in `app/layout.tsx`. *Fix:* nonce-based CSP via middleware, remove inline scripts, enable Report-Only first then enforce. *AC:* no CSP violations in smoke run.
- [ ] `PROD-003` **[AUDIT-1 #10][P1-HIGH] Soft-404s & unvalidated route params**: `app/[text]/[chapter]/[verse]/page.tsx` renders "Text/Verse Not Found" with HTTP 200; `parseInt` of chapter unchecked (NaN). *Fix:* validate `^\d+$`, call `notFound()`, add `generateStaticParams`/`dynamicParams=false` where possible. *AC:* tests assert 404 for bad slug/chapter/verse.
- [ ] `PROD-004` **[AUDIT-1 #11][P1-HIGH] Incomplete error handling & no monitoring**: no `app/global-error.tsx` (root layout crashes show default page); `app/error.tsx` logs raw error to console only; no error tracking. *Fix:* add `global-error.tsx`, structured client error reporter (Sentry free tier or `/api/log` with limit), show `digest` ID to users. *AC:* simulated layout error renders branded fallback.
- [ ] `A11Y-001` **[AUDIT-1 #12][P1-HIGH] Anti-copy "SecurityShield" harms accessibility and gives no real protection**: `components/layout/security-shield.tsx` + inline script in layout block context menu, F12/Ctrl+U, text selection and copy (with `alert()`), violating WCAG 2.1 (keyboard/AT access, user control) and duplicating handlers; trivially bypassed. *Fix:* remove client blocking; keep `user-select` only on decorative UI; rely on server-side rate limiting/gating (SEC-010/012); keep share/copy button with attribution. *AC:* screen-reader & keyboard users can select/copy; tests updated.
- [ ] `PROD-015` **[AUDIT-1 #13][P1-HIGH] Silent data loss: APIs return `success: true, mocked: true` when `GITHUB_TOKEN` missing** (feedback + ratings) — in production a misconfigured env drops all user feedback while UI shows success. *Fix:* mock only when `NODE_ENV !== 'production'`; in prod return 503 and log. *AC:* test for prod missing token.
- [ ] `PROD-007` **[AUDIT-1 #14][P1-MEDIUM] Unguarded `localStorage` access & `JSON.parse`**: `Header.tsx`, `study-client.tsx`, `reading-progress.tsx`, `suggest-edit-modal.tsx`, `locale-provider.tsx`, `roadmap/page.tsx` crash on corrupted data, quota errors, or Safari private mode. *Fix:* `utils/safe-storage.ts` (try/catch, zod-validated reads, versioned keys), replace all call sites. *AC:* tests with corrupt JSON.
- [ ] `PROD-008` **[AUDIT-1 #15][P1-MEDIUM] Analytics without consent + hardcoded GA ID**: `app/layout.tsx` loads GA4 + Vercel Analytics unconditionally with fallback `G-6C2H9NLMJM` — UK GDPR/PECR consent required for a `.co.uk` site. *Fix:* consent banner gating GA, env-only ID, privacy policy page. *AC:* no GA request before consent.
- [ ] `PROD-006` **[AUDIT-1 #16][P1-MEDIUM] Fake submissions mislead users**: `components/ui/coming-soon-form.tsx` simulates registration (`setTimeout`, localStorage) yet tells users their email "has been cleared"; `suggest-edit-modal.tsx` similarly only stores locally. *Fix:* wire to real endpoint (double-opt-in) or relabel/remove; email validation beyond `includes('@')`. *AC:* honest copy or persisted server record.
- [ ] `PROD-005` **[AUDIT-1 #17][P2-MEDIUM] Broken social/PWA assets**: metadata references `/og-image.jpg` and `/twitter-image.jpg`, neither exists in `public/`; no web manifest/app icons. *Fix:* generate images (or `opengraph-image.tsx`), add `manifest.webmanifest`. *AC:* 200 for all referenced assets (test scans metadata).
- [ ] `PROD-011` **[AUDIT-1 #18][P1-HIGH] Server lake unsafe on Vercel serverless**: `lib/server-lake.ts` opens `better-sqlite3` from `process.cwd()/public`, swallows all errors and returns `[]` (blank verses, no alert); native module/file-tracing not guaranteed. *Fix:* `outputFileTracingIncludes`, explicit error surfacing + health check, or finish INFRA-002 migration. *AC:* production-build smoke test loads chapter content.
- [ ] `SEC-016` **[AUDIT-1 #19][P2-MEDIUM] Middleware hygiene**: `NEXT_LOCALE` cookie lacks `Secure/SameSite/Path/Max-Age`; matcher also runs on static assets; `X-Vishwa-Vani-Tier` header leaks internals; rate-limit headers inaccurate. *Fix:* harden cookie, narrow matcher, drop internal headers. *AC:* middleware unit tests.
- [ ] `PROD-012` **[AUDIT-1 #20][P2-MEDIUM] CI/supply-chain hygiene**: `npm install -g vercel@latest` unpinned; actions not SHA-pinned; no `npm audit --omit=dev` or coverage gate (≥80%); Dependabot lists unused `pip`/`gomod` ecosystems with 1-PR limit. *Fix:* pin versions, add audit + coverage steps, tune Dependabot. *AC:* CI fails under 80% coverage.

### Additional Findings (queued after Top-20)
- [ ] `PROD-009` **[P2]** Shallow `/api/health` (no data/lake readiness check; exposes version). Add readiness probe + uptime monitor.
- [ ] `PROD-010` **[P2]** Performance: `components/shloka/study-client.tsx` is a 1,019-line monolith; 21 MB DB loaded for search; `images.unoptimized: true`. Split components, lazy-load Lab apps, enable image optimisation, lake range requests/caching.
- [ ] `A11Y-002` **[P2]** Only 7 `aria-`/`alt` attributes in study-client; modals (feedback, suggest-edit, semantic drawer) lack focus trap/Escape handling; add `prefers-reduced-motion`; run axe in CI.
- [ ] `SEC-019` **[P2]** Add `SECURITY.md` + `/.well-known/security.txt`, COOP/CORP headers, remove redundant `X-Frame-Options` in favour of `frame-ancestors`.
- [ ] `SEC-020` **[P1]** Secret hygiene: confirm `GITHUB_TOKEN` is a fine-grained PAT (issues:write on one repo only), rotate Vercel/Gemini keys, ensure `.env.local` never committed, add gitleaks to CI.
- [ ] `PROD-013` **[P3]** Sitemap: `lastModified: new Date()` on every build, priority 1 for all static routes, no verse URLs, no canonical/hreflang.
- [ ] `PROD-014` **[P3]** `<html lang="en">` hard-coded though UI serves `hi`/`mr`; update `lang` client-side/by route for SEO and screen readers.
- [ ] `PROD-016` **[P3]** Replace scattered `console.error` with a structured logger carrying request IDs (pairs with PROD-004).

### Top-20 Implementation Plan (Batches)
| Batch | Items | Theme | Est. |
|---

## EPIC 00: TOP-20 LIVE PRODUCTION FIXES (Priority 0 - URGENT)
*Critical production stability, security, and compliance fixes identified during live audit.*

- [x] \SEC-012\ **Gemini API Financial Guard**: Added hard limits to \/api/synthesize\ to prevent unbounded billing from massive context arrays.
- [x] \BUG-FB-001\ **Feedback Widget Validation Sync**: Fixed CI/CD to deploy on push, ensuring UI and API validation rules (50 chars) are in sync. Fixed mobile scrolling/z-index issues.
- [x] \COMP-001\ **UK GDPR / Cookie Compliance**: Built and deployed a Cookie Consent Banner preventing Google Analytics from loading until explicit opt-in is granted, avoiding £17.5m fines.
- [x] \SEC-013\ **Hardcoded AES Key Removal**: Removed the hardcoded \SECRET_KEY\ from \lib/server-lake.ts\ and replaced it with a \process.env.LAKE_SECRET_KEY\ fallback.
- [ ] \SEO-001\ **Apex Domain TLS & Redirection (MANUAL STEP FOR USER)**: 
  - **Why**: Currently \ishwa-vani.co.uk\ has a broken TLS certificate, breaking SEO ranking and crawler accessibility.
  - **Step 1**: Log in to your Domain Registrar (where you bought the domain).
  - **Step 2**: Go to DNS Management.
  - **Step 3**: Add an \A\ record for \@\ (or \ishwa-vani.co.uk\) pointing to >.76.21.21\ (Vercel's IP).
  - **Step 4**: Go to your Vercel Project Settings -> Domains -> ensure \ishwa-vani.co.uk\ is added and wait for the SSL certificate to provision.
- [ ] \ARCH-001\ **Vedic-Lake Server-Side Search Migration**: \edic-lake.db\ (21MB) is currently public to allow client-side searching. To protect our scripture data from scraping, we must rewrite \lib/lake.ts\ to run SQLite queries on a Next.js server route instead of a Web Worker.
- [ ] \BUG-UI-002\ **Footer Contrast**: Enhance footer contrast for accessibility on mobile devices.

---
|---|---|---|
| A | PROD-001, PROD-002, SEC-010, SEC-011 | Stop-the-bleed: CI gate, indexing, data exposure, key | 1 PR |
| B | SEC-017, SEC-013, PROD-015, SEC-014, SEC-012 | API hardening via shared `lib/api-guard.ts` + limiter | 1–2 PRs |
| C | SEC-015, SEC-016, A11Y-001, PROD-003, PROD-004 | Headers/CSP, middleware, a11y, errors/404s | 1–2 PRs |
| D | PROD-007, PROD-008, PROD-006, PROD-005, PROD-011, PROD-012 | Client robustness, privacy, assets, infra, CI hygiene | 1–2 PRs |
Each item follows the 8-stage lifecycle with ≥80% coverage on touched files; 3-strike circuit breaker applies.

This backlog is organized strictly by Priority and aligned to the **Vishwa-Vani Vision**. Following our successful deployment to Vercel, the priorities have been restructured to focus on **Security, Content Gating, Customer Experience, Retention, and Pipeline Visibility**. 

**5-CHAPTER AUDIT RULE**: After every 5 chapters of any book are processed, an explicit 'Bug Hunting & System Audit' phase MUST take place. All identified issues must be categorized and added to Priority 0 before continuing.

**DEPLOYMENT GATE RULE**: We only move to subsequent priorities or new items *after* completing a successful deployment.

---

## EPIC 6: UI Redesign & UX Simplification (Priority 1)
*Modernize the interface, remove excessive styling, and fix critical scrolling layout bugs.*

- [ ] `UX-007` **Landing Page Simplification**: Strip out excessive styling. Keep fundamental modern UI techniques, reduce heavy shadows, eliminate visual clutter.
- [ ] `UX-008` **Reading Page Redesign**: Complete page-by-page UI overhaul starting with the core reading experience. Remove complex navigation layers and fix fundamental layout constraints.
- [ ] `BUG-085` **IntersectionObserver Cleanup**: Finalize performance audits on scroll tracking; ensure single firing events per verse.

## EPIC 7: Vedic Labs UI/UX Evolution (Priority 2)
*Transform the Experimental Sanctum from a static grid into a fluid, dynamic, and curiosity-sparking interactive experience using modern front-end techniques.*

- [ ] `UX-009` **Bento-Grid Layout**: Replace the basic grid layout (`grid-cols-1 md:grid-cols-2`) with an asymmetric, fluid Bento Grid (using tools like Framer Motion). Different labs should take up different aspect ratios based on importance.
- [ ] `UX-010` **Cosmic Micro-Interactions**: Integrate hover-state WebGL/Three.js particle effects or Canvas animations that respond to cursor movement to reflect the "Experimental Sanctum" theme.
- [ ] `UX-011` **Progressive Disclosure & Onboarding**: Instead of showing the full interactive lab immediately inside the grid, show a "teaser" card with dynamic data (e.g., current cosmic time, spinning chakra, breathing circle). Clicking expands it into a modal or full-page immersive view.
- [ ] `UX-012` **Soundscapes & Haptics**: Integrate subtle spatial audio (Om resonances, wind, soft chimes) when interacting with labs (Pranayama, Meditation) and use the Web Vibration API for mobile devices.
- [ ] `UX-013` **Fluid Typography & Glassmorphism**: Upgrade the aesthetic with heavy Glassmorphism (background blurs, translucent borders) and dynamic fluid typography that scales seamlessly across device dimensions.

## EPIC 1: Security, Hardening & Content Protection (Priority 0)
*Crucial to ensure a safe, robust, and reliable live platform without exposed vulnerabilities or easily scraped content.*

- [x] `SEC-001` **SAST / DAST Vulnerability Fixes**: Run `npm audit fix` and patch critical Next.js/PostCSS vulnerabilities in the lockfile to resolve Vercel edge/runtime security warnings.
- [x] `SEC-002` **Anti-Scraping / Content Protection**: Add `user-select: none` to CSS and block context menu/copy actions via JS to prevent automated crawling and manual copy-pasting of proprietary translations.
- [x] `SEC-003` **Hardcoded Token Sweep**: Audit the repository for any exposed API keys or Vercel OIDC tokens (Verified clear; only local `.vercel` config exists).
- [x] `SEC-004` **Robots.txt & Crawling Prevention**: Deploy a `robots.txt` that restricts aggressive crawler bot access to the API and text content.
- [x] `SEC-005` **Gating Incomplete Content**: Enforced strict gating in `lib/texts.ts` so that *only* 100% completed scripture tiers are available to the UI. Anything incomplete is hidden from the live deployment.
- [ ] `SEC-006` **Zero-Warning Dependency Audit**: Deep update of all npm packages to eliminate deprecation warnings (e.g., glob, inflight, abab) and patch remaining transitive vulnerabilities via forced updates or overrides.
- [ ] `SEC-007` **Package Unification & Dependency Workflow**: Remove `axios` and standardize entirely on Next.js native `fetch`. Implement an automated Dependabot workflow to ensure dependencies remain current without breaking builds.
- [ ] `SEC-008` **Security Hardening (Hack-Proofing)**: Implement strict HTTP Security Headers in `next.config.ts`, add `zod` for strict API input validation, and integrate rate limiting (e.g., Redis via `@upstash/ratelimit`) to protect against DDoS.
- [ ] `SEC-009` **Web Scraping Resilience**: Upgrade internal crawler scripts (`crawlee`/`playwright`) with stealth plugins, human emulation, and proxy rotation to prevent data acquisition blocks.
- [x] `SEC-DEP-001` **NPM Audit Mitigation (Micromatch/Braces)**: Resolve 32 high-severity vulnerabilities affecting `jest`, `@next/eslint-plugin-next`, and `fast-glob` by forcing resolution of `braces` and `micromatch` to patched versions (via overrides in package.json) or upgrading testing dependencies. Run unit tests post-fix to verify stability.

---

## EPIC 2: Live Operations, Feedback & Analytics (Priority 0 - IMMEDIATE)
*The site is LIVE. We must capture every visitor's data and feedback immediately using 100% FREE tools to stay within the zero-budget constraint.*

- [x] `UX-005` **Google Analytics Integration (Zero Cost)**: Integrate GA4 using `@next/third-parties/google`. Google Analytics is completely free forever. This will capture anonymous traffic, most-read verses, and drop-offs.
- [x] `UX-003` **User Feedback Channel**: Create a non-intrusive feedback widget. To keep it free, we will store feedback directly in our existing local database or route it to a free Discord webhook/email (Resend free tier).
- [ ] `UX-006` **UI/UX Audit & Clutter Reduction**: Perform a deep review of the landing page and reading UI to eliminate visual clutter and maximize the visibility of 100% completed (Gold) texts.
- [ ] `UX-004` **Interactive Roadmap & Feature Voting**: Create a well-categorized roadmap display where users can upvote features. We will use our existing free database to track IP hashes to prevent spam, avoiding paid KV stores.
- [x] `UX-001` **Pipeline Visibility UI**: Display a visually appealing "Pipeline Data Status" tracker on the landing page showing what texts are currently live and what is coming next.
- [x] `UX-002` **Console Error Resolution**: Clean up benign hydration and layout errors (e.g., ResizeObserver loop) in `app/layout.tsx` to keep the console clean for technical visitors.
- [x] `BUG-081` **Search Page Performance Jitter**: Client-side filtering lag during multi-scripture queries; optimize rendering loops and filter states.
- [x] `BUG-082` **Dark Mode Contrast for Skeletons**: Auditing layout skeletons inside Vedic Lab view for low contrast ratio in dark theme mode.
- [x] `BUG-083` **Intersection Observer Threshold Polish**: Address minor lag in the reader progress bar synchronization during rapid scroll.

---

## EPIC 5: User Identity, Auth & Progress Tracking (Priority 1)
*Scaling the platform using 100% free open-source tools (Auth.js) and generous free-tier databases.*

- [ ] `FEAT-AUTH-001` **Optional Authentication Setup**: Integrate NextAuth.js (Auth.js) with Google. This is completely free and requires no paid third-party auth providers like Auth0.
- [ ] `FEAT-AUTH-002` **Resume Reading & Learning Guide**: Build a "Continue Reading" tracking system. Use `localStorage` for anonymous users (free) and migrate to the Database once a user signs in.
- [ ] `INFRA-002` **Production Database Migration (Free Tier)**: Migrate away from local `better-sqlite3` to a production-ready serverless database. We will use Turso (SQLite) or Vercel Postgres, both of which have extremely generous free tiers.

---

## EPIC 3: Core Content Pipeline (Priority 2)
*Completing the actual scripture data acquisition and processing for our most impactful books.*

- **Bhagavad Gita [Readiness Score: 90.0%] (GOLD | UI VISIBLE)**
  - [x] `GITA-SCH-01` **Acquire Sankaracharya Bhashya**: Sourced and structured for all 700 verses.
  - [x] `GITA-SCH-02` **Acquire Prabhupada Purports**: Sourced and structured for all 700 verses.
  - [ ] `GITA-SCH-03` to `GITA-SCH-10`: Acquire remaining commentary layers (Tilak, Ramanuja, Madhva, etc.) to achieve 100% completion.

- **Mahabharata [Readiness Score: 60.35%] (GOLD | UI HIDDEN)**
  - [x] `MBH-PARV1-PROM` to `MBH-PARV3-PROM`: Adi, Sabha, and Vana Parvas acquired and promoted to Gold.
  - [ ] `MBH-PARV4-ACQ` **Acquire Virata Parva**: Retrieve core verses, transliterations, and KMG translation layers.
  - [ ] `MBH-PARV5-ACQ` to `MBH-PARV18-ACQ`: Acquire remaining 14 Parvas sequentially.

- **Bhagavata Purana (Srimad Bhagavatam) [Readiness Score: 51.85%] (GOLD | UI HIDDEN)**
  - [x] `BHAG-CANTO1-PROM` to `BHAG-CANTO6-PROM`: Cantos 1 through 6 acquired and mapped.
  - [ ] `BHAG-CANTO7-ACQ` **Acquire Canto 7**: Parse dialogues of Prahlada Maharaja.
  - [ ] `BHAG-CANTO8-ACQ` to `BHAG-CANTO12-ACQ`: Acquire remaining cantos.

---

## EPIC 4: Structural Architecture & Enhancements (Priority 3)
*Advanced features to organize and surface the Vedic knowledge.*

- [x] `FEAT-SEM-001` **Define Tattva Ontology Schema**: Define a JSON schema (`types/ontology.ts`) for global semantic concepts (Tattvas) such as "Dharma", "Brahman", "Atman", and "Karma".
- [x] `FEAT-SEM-002` **Static Ontology Seed Mapping**: Create `data/ontology/tattvas.json` containing initial hand-curated linkages across Bhagavad Gita and Upanishads.
- [ ] `FEAT-SEM-004` **Dynamic Concept Cloud UI**: Build a visualization graph in the Vedic Lab allowing users to explore Tattvas and jump directly to connected verses.

---

## 🛑 Pending Human Decision Backlog
- `MBH-DATA-GAP`: Blocked on gathering complete Mahabharata Parva 1 data due to unknown target source.
- `GITA-SCH-03` to `GITA-SCH-10`: Blocked on gathering complete data for Tilak, Aurobindo, Bhave, Ramanuja, Madhva, Abhinavagupta, Savarkar, Gita Press.
- `BHAG-GATHER-FULL`: Blocked on gathering complete Bhagavata Purana data due to unknown target source.
- [ ] `BUG-084` **Lucide Icons**: Upgrade `lucide-react` dependency and address `Github` and `Linkedin` missing icon export issue without changing the variable names arbitrarily.
