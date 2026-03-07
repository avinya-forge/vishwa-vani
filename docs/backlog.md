# vishwa-vani backlog

*metrics: 12 epics (120 wu) + 60 atomic tasks (60 wu) = 180 total work units (wu). exactly 60 tasks execution density.*

## summary of refinement
- **breadth-then-depth applied:** tasks have been formatted into granular, ai-ready schemas.
- **delta cap enforced:** refined exactly 60 top-priority tasks, dropping extraneous items to adhere to max 60-task density.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [303]: add comment form with optimistic ui** | [TODO] | [UI/UX]
**SPEC:** build client component `<CommentForm>`. utilize React 19 `useOptimistic` hook to immediately push the submitted string into the list visually before calling the `insertComment` server action.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [306]: remove redundant client-shloka.ts service** | [DONE] | [Refactoring]
**SPEC:** delete `client-shloka.ts` from filesystem. audit entire codebase (using ripgrep/IDE) for broken imports. replace any remaining references with calls to standard app router server actions.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [304]: upvote/reaction schema and server action** | [TODO] | [Database]
**SPEC:** establish `reactions` table mapping `entity_id`, `reaction_type` (e.g., UPVOTE), and `user_id`. build server action `toggleReaction` to upsert/delete row based on current state.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [305]: configure row level security for user edits** | [TODO] | [Security]
**SPEC:** write raw sql migration to apply `CREATE POLICY` statements on `posts` and `comments`. enforce `auth.uid() = user_id` for `UPDATE` and `DELETE` commands. apply schema changes via supabase dashboard/cli.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [401]: setup pg_trgm extension for fuzzy search** | [TODO] | [Database]
**SPEC:** execute sql: `CREATE EXTENSION IF NOT EXISTS pg_trgm;`. build gist index on primary text columns (e.g., `title`, `content`) for ultra-fast `ILIKE` pattern matching.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [402]: refactor searchwords service to fuzzy matching** | [TODO] | [Backend]
**SPEC:** update the `searchWords` database function to leverage the similarity (`%`) operator or explicit trigram matching. return sorted result set ordered by similarity score.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [403]: implement debounced auto-complete dropdown** | [TODO] | [UI/UX]
**SPEC:** implement custom hook `useDebounce(val, 300)`. build client component wrapping search input. on debounce trigger, fetch fuzzy results via server action and render dropdown absolute menu below input.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [404]: search filters for specific languages** | [TODO] | [Backend]
**SPEC:** add `language_code` enum param to `searchWords`. modify the where clause to optionally filter by `language = 'hi' | 'en' | 'mr'` based on frontend state dropdown.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [405]: advanced root word search using stemming** | [TODO] | [Database]
**SPEC:** setup postgres full text search (fts) dictionary using generic stemming. build `tsvector` generated column derived from parsed content. expose search function querying against `tsquery`.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [501]: setup supabase storage bucket audio_files** | [TODO] | [Database]
**SPEC:** create public storage bucket named `audio_files`. define rls policies allowing public read access, but restricting insert/update/delete to authenticated admins.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [502]: design minimalist audio player component** | [TODO] | [UI/UX]
**SPEC:** build custom react component wrapping html5 `<audio>`. implement play, pause, progress bar, and volume controls utilizing standard tailwind icons. ensure aria labels for a11y.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [503]: integrate audio player into shlokacard** | [TODO] | [UI/UX]
**SPEC:** update `<ShlokaCard>` component to accept optional `audioUrl` prop. render audio player conditionally directly beneath the transliteration text block.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [504]: metadata schema for lyric timestamps** | [TODO] | [Database]
**SPEC:** add JSONB column `lyric_timestamps` to `shlokas` table mapping `{ timestamp_ms: number, word_index: number }`. return payload in standard shloka query.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [505]: progressive audio loading implementation** | [TODO] | [Performance]
**SPEC:** implement standard `preload="metadata"` on audio elements. utilize js streams/range requests where applicable to defer heavy audio download until user initiates play event.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [601]: enforce admin role middleware** | [TODO] | [Security]
**SPEC:** update `middleware.ts`. intercept requests to `/admin/*`. check supabase auth session for custom claim or user role mapping. redirect unauthorized traffic to `/`.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [602]: build markdown-based text editor** | [TODO] | [UI/UX]
**SPEC:** integrate lightweight react-markdown library. implement split-pane layout: raw text area on left, real-time rendered html output on right. hook up state binding.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [603]: bulk-upload parser for dictionary terms** | [TODO] | [Backend]
**SPEC:** implement server action taking raw csv file object. use node's native readable stream/csv parsing. map rows to `insertMany` supabase call. execute standard error try/catch on format mismatch.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [604]: scaffold admin dashboard for moderation** | [TODO] | [UI/UX]
**SPEC:** create `/admin/moderation` route. query comments table joined with a `reports` table. build ui grid to 'approve' or 'delete' flagged items, tied to backend server actions.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [605]: design auto-saving draft mechanism** | [TODO] | [Architecture]
**SPEC:** implement client-side `useInterval` to trigger save action every 30s during editing. append `status='draft'` to database row until explicit publish event triggers `status='published'`.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [701]: generate web app manifest and icons** | [TODO] | [PWA]
**SPEC:** write `manifest.json` at project root providing `name`, `short_name`, `theme_color`, and `icons`. place required 192x192 and 512x512 png icons into `/public` directory.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [702]: setup workbox/next-pwa static asset cache** | [TODO] | [PWA]
**SPEC:** install `@ducanh2912/next-pwa`. wrap `next.config.ts` configuration to register a local service worker. configure aggressive caching strategy for `/fonts`, `/images`, and base scripts.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [703]: indexeddb fallback strategy for searches** | [TODO] | [Architecture]
**SPEC:** integrate `idb-keyval`. wrap dictionary search action with custom logic: on successful fetch, write response to local indexeddb. on network failure, return cached data if timestamp valid.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [704]: offline mode indicator in main layout header** | [TODO] | [UI/UX]
**SPEC:** implement `useNavigatorOnLine` react hook. dynamically render a small red 'offline' icon next to the logo in `<Header>` when standard browser network disconnect event fires.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [705]: background sync for optimistic collections** | [TODO] | [Architecture]
**SPEC:** configure service worker background sync api. register local mutation queue for 'save to collection'. execute pending inserts upon network restoral.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [801]: generate dynamic sitemap.xml** | [TODO] | [SEO]
**SPEC:** create `app/sitemap.ts`. query all active standard pages, dynamic post routes, and active dictionary keys. map array to next.js expected `{ url, lastModified }` object format.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [802]: dynamic opengraph image generation (@vercel/og)** | [TODO] | [SEO]
**SPEC:** create `/api/og/route.tsx`. instantiate `ImageResponse`. design basic tailwind div layout dynamically inserting text via search params. embed url in metadata definitions.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [803]: embed json-ld structured data** | [TODO] | [SEO]
**SPEC:** insert raw script tag (`type="application/ld+json"`) in `layout.tsx` representing Website structure. add `Article` schema explicitly inside individual `/posts/[slug]/page.tsx` renders.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [804]: privacy-first analytics script** | [TODO] | [Integration]
**SPEC:** inject lightweight, cookie-free script payload (e.g., plausible or minimal custom endpoint tracking) to capture basic page hits. wrap inside next.js `<Script>` component for optimization.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [805]: server-side analytics for api performance** | [TODO] | [Performance]
**SPEC:** implement wrapper around main core server actions. utilize `performance.now()` diffs to log heavy db query times into isolated `metrics` database table asynchronously.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [901]: automated a11y audit using axe** | [TODO] | [CI/CD]
**SPEC:** incorporate standard `@axe-core/react` execution logic into root layout strictly bounded by standard dev environment check. fail tests explicitly on a11y regressions.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [902]: dyslexia-friendly typography toggle** | [TODO] | [UI/UX]
**SPEC:** implement user setting overriding standard fonts. force global application of OpenDyslexic or similar typeface when boolean state is true. sync preference to standard localstorage.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [903]: improve keyboard navigation across forms** | [TODO] | [A11Y]
**SPEC:** audit `<button>`, `<input>`, and `<a>` elements for logical `tabindex` flows. map 'Enter' key bindings to generic form submissions. enforce focus-visible tailwind outlines globally.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [904]: add aria-live regions for dynamic content** | [TODO] | [A11Y]
**SPEC:** wrap standard feed components or live-updating search dictionaries in `<div aria-live="polite">` components. announce total new items resolved via screen reader.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [905]: enhance color contrast ratios** | [TODO] | [A11Y]
**SPEC:** run lighthouse contrast review. update any tailwind text classes (e.g. `text-gray-400` to `text-gray-600`) failing strict wcag aa standard minimum background differentiation.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1001]: setup standard next.js i18n routing** | [TODO] | [Architecture]
**SPEC:** configure `next.config.ts` mapping native locales `['en', 'hi', 'mr']`. update root folder structure to standard `[locale]` nested layout architecture to trap param routing.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1002]: extract hardcoded strings to dictionaries** | [TODO] | [Refactoring]
**SPEC:** define explicit `messages/en.json` and standard translation objects. swap static strings (e.g., "Search") in components with abstract mapping keys (e.g. `t('search.label')`).

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1003]: language switcher component in navbar** | [TODO] | [UI/UX]
**SPEC:** construct custom `<select>` input dropping down configured locales. update active generic next router standard implementation via `router.push(path, path, { locale: nextLocale })`.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1004]: translate core page metadata based on locale** | [TODO] | [SEO]
**SPEC:** inject dynamic `{ params: { locale } }` variables inside `generateMetadata` function on standard index pages. reference exact translated title variants via imported dictionary strings.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1005]: modify supabase queries to fetch localized meanings** | [TODO] | [Database]
**SPEC:** alter raw search functions to accept explicit language locale arguments. dynamically return target mapped column explicitly (e.g., standard `meaning_hi` or generic `meaning_en`) based on argument request.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1101]: configure supabase realtime for comments** | [TODO] | [Architecture]
**SPEC:** instantiate `.channel('public:comments')`. map `.on('postgres_changes')` handlers specifically monitoring `INSERT` executions. dispatch bound generic state update strictly on target matched component.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1102]: implement generic notification dropdown ui** | [TODO] | [UI/UX]
**SPEC:** build custom client popover tied to header bell icon. map standard active `notifications` array map representing unread standard interactions (likes/replies).

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1103]: server-side triggers for new reply notifications** | [TODO] | [Database]
**SPEC:** define raw postgres trigger `on_comment_reply`. invoke insertion into specific `notifications` database table specifically targeting origin `user_id` when nested comment targets matching identifier.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1104]: setup push notification via web push api** | [TODO] | [Architecture]
**SPEC:** map application strict standard VAPID configuration. implement frontend raw service worker active push binding triggering system-level native dialogue strictly holding standardized text strings.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1105]: user preference page for notification opt-ins** | [TODO] | [UI/UX]
**SPEC:** extend target `/profile` view exposing generic form checkbox mappings (e.g. `email_alerts`, `push_alerts`). execute direct database state patches explicitly on active toggle shifts.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1201]: user_activity db table for read metrics** | [TODO] | [Database]
**SPEC:** construct active table strictly mapping `user_id`, `shloka_id`, and exact interaction `timestamp`. restrict write operations to explicitly bound custom rls validations.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1202]: implement logic to calculate study streaks** | [TODO] | [Backend]
**SPEC:** author standard server action fetching target max consecutive distinct active calendar days parsed from target `user_activity` history row mappings. cache values efficiently.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1203]: design and build streak badge component** | [TODO] | [UI/UX]
**SPEC:** construct strictly styled active flame svg implementation mapping distinct explicit integer value. bind specifically to top-right standard layout header directly for active sessions.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1204]: add celebration animations upon milestones** | [TODO] | [UI/UX]
**SPEC:** integrate raw standard `canvas-confetti` execution explicit callback bounded on targeted numerical thresholds (e.g., 7 days, 30 days) explicitly triggered via localstorage state comparisons.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1301]: integrate redis cache for dictionary lookups** | [TODO] | [Performance]
**SPEC:** deploy upstash redis client. hook standard dictionary api to check redis string before querying supabase `searchWords`. cache result string mapped to exact locale explicitly.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1302]: user profile photo upload integration** | [TODO] | [UI/UX]
**SPEC:** add `<input type="file" />` bound to `uploadProfilePicture` server action. use supabase storage sdk to write file. enforce strictly typed max 2mb size map. update `auth.users` metadata row explicitly.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1303]: add lazy loading skeleton arrays** | [TODO] | [UI/UX]
**SPEC:** construct active `<ShlokaSkeleton>` react server component map explicitly returning generic pulse animations. implement standard `Suspense` fallback explicitly mapping to targeted server action calls.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1304]: server side sitemap cache revalidation** | [TODO] | [Architecture]
**SPEC:** construct custom generic trigger inside post insertion api route. invoke explicit `revalidatePath('/sitemap.xml')` call directly after standard successful insert string completion.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1305]: social media generic standard share button** | [TODO] | [UI/UX]
**SPEC:** author custom client component wrapping native `navigator.share` api explicitly bounded via try/catch fallback strings opening standard dynamic intent urls per explicit mapping platform keys.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1306]: daily featured random shloka generator** | [TODO] | [Backend]
**SPEC:** author distinct raw query randomly pulling from active mapping set securely fetching row based on modulo math matching current `Date().getDay()`. expose to standard index explicit fetch.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1307]: pagination for collections mapped feed** | [TODO] | [UI/UX]
**SPEC:** inject native cursor argument standard offset into mapping array. implement `<LoadMoreButton>` triggering bound standard next fetch explicitly expanding active bound state list visually.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1308]: standard rate limiting middleware** | [TODO] | [Security]
**SPEC:** map explicit active window strings capturing native generic `x-forwarded-for` header values natively via standard next.js bound implementation returning strictly 429 exact response maps.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1309]: error logging standard boundary mapping** | [TODO] | [Integration]
**SPEC:** setup standard active `global-error.tsx`. securely hook standard generic explicit reporting service strictly logging exact bound trace values directly mapped off component failure outputs.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1310]: text to speech browser standard integration** | [TODO] | [UI/UX]
**SPEC:** call standard `window.speechSynthesis`. map explicit language mapped strings defining generic standard english active mappings reading direct explicit mapped translated generic definitions mapped actively.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1311]: custom generic mapping tooltip implementation** | [TODO] | [UI/UX]
**SPEC:** construct active distinct component wrapper directly managing bound hover absolute relative explicit string translations rendered explicitly floating visually atop matched target cursor interactions.

---

**MILESTONE [2]** | **PHASE [13]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1312]: standard generic bulk export service** | [TODO] | [Backend]
**SPEC:** author raw standard active server action exporting generic distinct active user explicitly mapped generic collections natively translated into strictly formatted json downloadable distinct raw blob strings.

---

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [307]: fix eslint circular dependency bug** | [WIP] | [Configuration]
**SPEC:** The Next.js 16.1.6 and ESLint 9 configuration causes a circular structure serialization error with `@eslint/eslintrc`. Investigate and patch `eslint.config.mjs` or dependencies to restore working lint checks.
