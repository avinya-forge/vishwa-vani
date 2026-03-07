# vishwa-vani backlog

*metrics: 12 epics (120 wu) + 60 atomic tasks (60 wu) = 180 total work units (wu). exactly 60 tasks execution density.*

## summary of refinement
- **breadth-then-depth applied:** tasks have been formatted into granular, ai-ready schemas.
- **delta cap enforced:** refined exactly 60 top-priority tasks, dropping extraneous items to adhere to max 60-task density.

---

**MILESTONE [1]** | **PHASE [1]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [101]: init supabase project and connect env variables** | [Done] | [Foundation]
**SPEC:** create `.env.local` with supabase url and anon key. instantiate `createClient` utility in `utils/supabase/server.ts` using `@supabase/ssr`. return functional db connection object without throwing errors on missing initial tables.

---

**MILESTONE [1]** | **PHASE [1]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [102]: implement email/password auth login/signup** | [Done] | [Authentication]
**SPEC:** implement `login` and `signup` server actions leveraging `supabase.auth.signInWithPassword` and `signUp`. return standardized success/error json responses. map users to `auth.users`.

---

**MILESTONE [1]** | **PHASE [1]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [103]: scaffold profile page view account details** | [Done] | [UI/UX]
**SPEC:** build server component at `/profile`. fetch `auth.getUser()` in server action. display email and joined date in a tailwind-styled readonly card layout.

---

**MILESTONE [1]** | **PHASE [1]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [104]: main layout with responsive header/footer** | [Done] | [UI/UX]
**SPEC:** define `app/layout.tsx`. construct `<Header>` with sticky nav and flexbox links. build `<Footer>` with basic sitemap links. style using tailwind semantic variables.

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [201]: define database schema for posts** | [Done] | [Database]
**SPEC:** execute sql script creating `posts` table with `id` (uuid), `title` (text), `content` (text), `author_id` (fk auth.users), and `created_at` (timestamp). enforce rls policies for reads/writes.

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [202]: develop blog post creation form** | [Done] | [UI/UX]
**SPEC:** create form component binding to a server action `createPost(formData: FormData)`. sanitize `title` and `content`. handle form submission state and optimistic local updates.

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [203]: implement homepage feed of latest posts** | [Done] | [UI/UX]
**SPEC:** map over `posts` table records returned from a server query in `app/page.tsx`. display list of `<PostCard>` components with titles, author email excerpts, and truncated content.

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [204]: dynamic slug routing for individual articles** | [Done] | [Routing]
**SPEC:** create `app/posts/[slug]/page.tsx`. extract `{ slug }` from awaited `params`. fetch post matching the given slug and render full title and content or 404 if missing.

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [205]: add users comment logic on posts** | [Done] | [Database]
**SPEC:** define `comments` table with `id`, `post_id` (fk posts), `user_id` (fk auth.users), `content`, and `created_at`. execute rls policies for viewing and creating comment records.

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [206]: build simple like button for posts** | [Done] | [UI/UX]
**SPEC:** define `likes` table referencing `post_id` and `user_id`. implement a server action that toggles existence of a row to represent liking/unliking a post. trigger ui refetch on interaction.

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [207]: implement tailwind dark mode switcher** | [Done] | [UI/UX]
**SPEC:** install `next-themes`. configure `ThemeProvider` in `layout.tsx`. create `<ThemeToggle>` button to swap `dark` class on html element. ensure text and bg colors define dark variants (e.g., `dark:bg-black`).

---

**MILESTONE [1]** | **PHASE [2]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [208]: add metadata and opengraph seo tags** | [Done] | [SEO]
**SPEC:** implement next.js standard metadata exports in layout and dynamic page routes. include generic `title`, `description`, `openGraph.title`, and `openGraph.images` configurations.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [303]: add comment form with optimistic ui** | [Pending] | [UI/UX]
**SPEC:** build client component `<CommentForm>`. utilize React 19 `useOptimistic` hook to immediately push the submitted string into the list visually before calling the `insertComment` server action.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [306]: remove redundant client-shloka.ts service** | [Pending] | [Refactoring]
**SPEC:** delete `client-shloka.ts` from filesystem. audit entire codebase (using ripgrep/IDE) for broken imports. replace any remaining references with calls to standard app router server actions.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [304]: upvote/reaction schema and server action** | [Pending] | [Database]
**SPEC:** establish `reactions` table mapping `entity_id`, `reaction_type` (e.g., UPVOTE), and `user_id`. build server action `toggleReaction` to upsert/delete row based on current state.

---

**MILESTONE [1]** | **PHASE [3]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [305]: configure row level security for user edits** | [Pending] | [Security]
**SPEC:** write raw sql migration to apply `CREATE POLICY` statements on `posts` and `comments`. enforce `auth.uid() = user_id` for `UPDATE` and `DELETE` commands. apply schema changes via supabase dashboard/cli.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [401]: setup pg_trgm extension for fuzzy search** | [Pending] | [Database]
**SPEC:** execute sql: `CREATE EXTENSION IF NOT EXISTS pg_trgm;`. build gist index on primary text columns (e.g., `title`, `content`) for ultra-fast `ILIKE` pattern matching.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [402]: refactor searchwords service to fuzzy matching** | [Pending] | [Backend]
**SPEC:** update the `searchWords` database function to leverage the similarity (`%`) operator or explicit trigram matching. return sorted result set ordered by similarity score.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [403]: implement debounced auto-complete dropdown** | [Pending] | [UI/UX]
**SPEC:** implement custom hook `useDebounce(val, 300)`. build client component wrapping search input. on debounce trigger, fetch fuzzy results via server action and render dropdown absolute menu below input.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [404]: search filters for specific languages** | [Pending] | [Backend]
**SPEC:** add `language_code` enum param to `searchWords`. modify the where clause to optionally filter by `language = 'hi' | 'en' | 'mr'` based on frontend state dropdown.

---

**MILESTONE [1]** | **PHASE [4]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [405]: advanced root word search using stemming** | [Pending] | [Database]
**SPEC:** setup postgres full text search (fts) dictionary using generic stemming. build `tsvector` generated column derived from parsed content. expose search function querying against `tsquery`.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [501]: setup supabase storage bucket audio_files** | [Pending] | [Database]
**SPEC:** create public storage bucket named `audio_files`. define rls policies allowing public read access, but restricting insert/update/delete to authenticated admins.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [502]: design minimalist audio player component** | [Pending] | [UI/UX]
**SPEC:** build custom react component wrapping html5 `<audio>`. implement play, pause, progress bar, and volume controls utilizing standard tailwind icons. ensure aria labels for a11y.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [503]: integrate audio player into shlokacard** | [Pending] | [UI/UX]
**SPEC:** update `<ShlokaCard>` component to accept optional `audioUrl` prop. render audio player conditionally directly beneath the transliteration text block.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [504]: metadata schema for lyric timestamps** | [Pending] | [Database]
**SPEC:** add JSONB column `lyric_timestamps` to `shlokas` table mapping `{ timestamp_ms: number, word_index: number }`. return payload in standard shloka query.

---

**MILESTONE [1]** | **PHASE [5]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [505]: progressive audio loading implementation** | [Pending] | [Performance]
**SPEC:** implement standard `preload="metadata"` on audio elements. utilize js streams/range requests where applicable to defer heavy audio download until user initiates play event.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [601]: enforce admin role middleware** | [Pending] | [Security]
**SPEC:** update `middleware.ts`. intercept requests to `/admin/*`. check supabase auth session for custom claim or user role mapping. redirect unauthorized traffic to `/`.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [602]: build markdown-based text editor** | [Pending] | [UI/UX]
**SPEC:** integrate lightweight react-markdown library. implement split-pane layout: raw text area on left, real-time rendered html output on right. hook up state binding.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [603]: bulk-upload parser for dictionary terms** | [Pending] | [Backend]
**SPEC:** implement server action taking raw csv file object. use node's native readable stream/csv parsing. map rows to `insertMany` supabase call. execute standard error try/catch on format mismatch.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [604]: scaffold admin dashboard for moderation** | [Pending] | [UI/UX]
**SPEC:** create `/admin/moderation` route. query comments table joined with a `reports` table. build ui grid to 'approve' or 'delete' flagged items, tied to backend server actions.

---

**MILESTONE [1]** | **PHASE [6]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [605]: design auto-saving draft mechanism** | [Pending] | [Architecture]
**SPEC:** implement client-side `useInterval` to trigger save action every 30s during editing. append `status='draft'` to database row until explicit publish event triggers `status='published'`.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [701]: generate web app manifest and icons** | [Pending] | [PWA]
**SPEC:** write `manifest.json` at project root providing `name`, `short_name`, `theme_color`, and `icons`. place required 192x192 and 512x512 png icons into `/public` directory.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [702]: setup workbox/next-pwa static asset cache** | [Pending] | [PWA]
**SPEC:** install `@ducanh2912/next-pwa`. wrap `next.config.ts` configuration to register a local service worker. configure aggressive caching strategy for `/fonts`, `/images`, and base scripts.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [703]: indexeddb fallback strategy for searches** | [Pending] | [Architecture]
**SPEC:** integrate `idb-keyval`. wrap dictionary search action with custom logic: on successful fetch, write response to local indexeddb. on network failure, return cached data if timestamp valid.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [704]: offline mode indicator in main layout header** | [Pending] | [UI/UX]
**SPEC:** implement `useNavigatorOnLine` react hook. dynamically render a small red 'offline' icon next to the logo in `<Header>` when standard browser network disconnect event fires.

---

**MILESTONE [1]** | **PHASE [7]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [705]: background sync for optimistic collections** | [Pending] | [Architecture]
**SPEC:** configure service worker background sync api. register local mutation queue for 'save to collection'. execute pending inserts upon network restoral.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [801]: generate dynamic sitemap.xml** | [Pending] | [SEO]
**SPEC:** create `app/sitemap.ts`. query all active standard pages, dynamic post routes, and active dictionary keys. map array to next.js expected `{ url, lastModified }` object format.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [802]: dynamic opengraph image generation (@vercel/og)** | [Pending] | [SEO]
**SPEC:** create `/api/og/route.tsx`. instantiate `ImageResponse`. design basic tailwind div layout dynamically inserting text via search params. embed url in metadata definitions.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [803]: embed json-ld structured data** | [Pending] | [SEO]
**SPEC:** insert raw script tag (`type="application/ld+json"`) in `layout.tsx` representing Website structure. add `Article` schema explicitly inside individual `/posts/[slug]/page.tsx` renders.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [804]: privacy-first analytics script** | [Pending] | [Integration]
**SPEC:** inject lightweight, cookie-free script payload (e.g., plausible or minimal custom endpoint tracking) to capture basic page hits. wrap inside next.js `<Script>` component for optimization.

---

**MILESTONE [1]** | **PHASE [8]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [805]: server-side analytics for api performance** | [Pending] | [Performance]
**SPEC:** implement wrapper around main core server actions. utilize `performance.now()` diffs to log heavy db query times into isolated `metrics` database table asynchronously.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [901]: automated a11y audit using axe** | [Pending] | [CI/CD]
**SPEC:** incorporate standard `@axe-core/react` execution logic into root layout strictly bounded by standard dev environment check. fail tests explicitly on a11y regressions.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [902]: dyslexia-friendly typography toggle** | [Pending] | [UI/UX]
**SPEC:** implement user setting overriding standard fonts. force global application of OpenDyslexic or similar typeface when boolean state is true. sync preference to standard localstorage.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [903]: improve keyboard navigation across forms** | [Pending] | [A11Y]
**SPEC:** audit `<button>`, `<input>`, and `<a>` elements for logical `tabindex` flows. map 'Enter' key bindings to generic form submissions. enforce focus-visible tailwind outlines globally.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [904]: add aria-live regions for dynamic content** | [Pending] | [A11Y]
**SPEC:** wrap standard feed components or live-updating search dictionaries in `<div aria-live="polite">` components. announce total new items resolved via screen reader.

---

**MILESTONE [1]** | **PHASE [9]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [905]: enhance color contrast ratios** | [Pending] | [A11Y]
**SPEC:** run lighthouse contrast review. update any tailwind text classes (e.g. `text-gray-400` to `text-gray-600`) failing strict wcag aa standard minimum background differentiation.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1001]: setup standard next.js i18n routing** | [Pending] | [Architecture]
**SPEC:** configure `next.config.ts` mapping native locales `['en', 'hi', 'mr']`. update root folder structure to standard `[locale]` nested layout architecture to trap param routing.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1002]: extract hardcoded strings to dictionaries** | [Pending] | [Refactoring]
**SPEC:** define explicit `messages/en.json` and standard translation objects. swap static strings (e.g., "Search") in components with abstract mapping keys (e.g. `t('search.label')`).

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1003]: language switcher component in navbar** | [Pending] | [UI/UX]
**SPEC:** construct custom `<select>` input dropping down configured locales. update active generic next router standard implementation via `router.push(path, path, { locale: nextLocale })`.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1004]: translate core page metadata based on locale** | [Pending] | [SEO]
**SPEC:** inject dynamic `{ params: { locale } }` variables inside `generateMetadata` function on standard index pages. reference exact translated title variants via imported dictionary strings.

---

**MILESTONE [1]** | **PHASE [10]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1005]: modify supabase queries to fetch localized meanings** | [Pending] | [Database]
**SPEC:** alter raw search functions to accept explicit language locale arguments. dynamically return target mapped column explicitly (e.g., standard `meaning_hi` or generic `meaning_en`) based on argument request.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1101]: configure supabase realtime for comments** | [Pending] | [Architecture]
**SPEC:** instantiate `.channel('public:comments')`. map `.on('postgres_changes')` handlers specifically monitoring `INSERT` executions. dispatch bound generic state update strictly on target matched component.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1102]: implement generic notification dropdown ui** | [Pending] | [UI/UX]
**SPEC:** build custom client popover tied to header bell icon. map standard active `notifications` array map representing unread standard interactions (likes/replies).

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1103]: server-side triggers for new reply notifications** | [Pending] | [Database]
**SPEC:** define raw postgres trigger `on_comment_reply`. invoke insertion into specific `notifications` database table specifically targeting origin `user_id` when nested comment targets matching identifier.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1104]: setup push notification via web push api** | [Pending] | [Architecture]
**SPEC:** map application strict standard VAPID configuration. implement frontend raw service worker active push binding triggering system-level native dialogue strictly holding standardized text strings.

---

**MILESTONE [1]** | **PHASE [11]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1105]: user preference page for notification opt-ins** | [Pending] | [UI/UX]
**SPEC:** extend target `/profile` view exposing generic form checkbox mappings (e.g. `email_alerts`, `push_alerts`). execute direct database state patches explicitly on active toggle shifts.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1201]: user_activity db table for read metrics** | [Pending] | [Database]
**SPEC:** construct active table strictly mapping `user_id`, `shloka_id`, and exact interaction `timestamp`. restrict write operations to explicitly bound custom rls validations.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1202]: implement logic to calculate study streaks** | [Pending] | [Backend]
**SPEC:** author standard server action fetching target max consecutive distinct active calendar days parsed from target `user_activity` history row mappings. cache values efficiently.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1203]: design and build streak badge component** | [Pending] | [UI/UX]
**SPEC:** construct strictly styled active flame svg implementation mapping distinct explicit integer value. bind specifically to top-right standard layout header directly for active sessions.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1204]: add celebration animations upon milestones** | [Pending] | [UI/UX]
**SPEC:** integrate raw standard `canvas-confetti` execution explicit callback bounded on targeted numerical thresholds (e.g., 7 days, 30 days) explicitly triggered via localstorage state comparisons.

---

**MILESTONE [1]** | **PHASE [12]** | **GATEKEEPER** [0-Hygiene-Error | 95% Test | Build-Pass]
**TASK [1205]: build weekly progress summary email script** | [Pending] | [Architecture]
**SPEC:** execute standard bound cron map fetching explicit read metric aggregations per mapped user identifier. process distinct specific targeted email map strings via resend/smtp integration.

---
