# ADR-004: Root Cause Analysis & Data Architecture Strategy

## 1. The True Problem Statement
We are experiencing cascading deployment failures (GitHub 100MB limit rejections and Vercel 50MB Lambda size limits). 

While the symptom is "the database is too big," the **root cause** is an architectural mismatch: We are tightly coupling a stateful, monolithic, multi-gigabyte dataset (`vedic-lake.db`) into stateless, ephemeral Serverless Edge functions. By bundling the database directly into the Next.js frontend repository, we are forcing the UI deployment pipeline to carry the weight of the entire data layer. 

## 2. Deep Dive: What is Referenced and Where?
The local SQLite architecture currently works as follows:
1. **The File:** `public/vedic-lake.db` (Currently 272 MB).
2. **The Driver:** `lib/server-lake.ts` uses the `better-sqlite3` Node module to open the file.
3. **The Consumers:** 
   - Server-Side React Components (`app/[text]/[chapter]/page.tsx`) query the DB to render verse pages.
   - API Routes (`app/api/search/route.ts`) query the DB for full-text search.
4. **The Breaking Mechanism:** During `npm run build`, Next.js uses `@vercel/nft` (Node File Trace) to determine what files an API route needs to execute. It detects `fs.readFileSync` calls targeting `vedic-lake.db` and physically copies the 272MB file into the `.next/server/` deployment zip. Vercel strictly rejects any zipped lambda over 50MB, causing fatal deployment failures.

## 3. Historical Context: Why SQLite Initially?
In the initial phases of Vishwa-Vani, the dataset was limited to the Bhagavad Gita and minor Stotras (under 15 MB). 
We chose local SQLite because:
- **Zero Cost & Zero Infrastructure:** No Postgres servers to provision, monitor, or pay for.
- **Latency:** Reading a local SQLite file in a serverless function yields microsecond response times.
- **Relational Integrity:** It allowed us to easily map complex relationships (Texts -> Parvas -> Chapters -> Verses -> Commentaries) using SQL joins instead of parsing nested JSON files.

## 4. Growth Analysis & Projections
The architecture was built for 15MB, but it grew rapidly because of **flattened data multiplication**. A single Sanskrit verse is small, but when we add English translations, Hindi translations, and extensive multi-layered commentaries (Shankara, Ramanuja), the data footprint explodes.

**Current Size:** ~100,000 verses (Mahabharata) = **272 MB**.

**Backlog Projection (Future Size):**
- **The Vedas:** ~20,000 verses.
- **The 18 Major Puranas:** ~400,000 verses.
- **Ramayana:** ~24,000 verses.
- **Projected Text Data:** ~1.5 GB to 2.5 GB.
- **AI Vector Embeddings (P1 Backlog):** Adding 768-dimensional float arrays to enable semantic search across 1,000,000+ total verses will add an estimated **4 GB to 8 GB** of dense data.

*Conclusion:* The dataset will easily reach **10 GB** within the next year. Shifting to an external provider with a 500MB or even 9GB free tier (like Turso) is merely a temporary band-aid that delays the inevitable. We will hit the ceiling again.

## 5. Better Strategies (Addressing the Root Cause)
To permanently solve this without increasing vendor dependencies or racking up costs, we must decouple the data layer from the Next.js frontend bundle.

### Strategy A: True Backend Decoupling (The "Own Your Metal" Approach)
Move the SQLite database and search logic entirely out of the Next.js frontend repository.
*   **How:** Host a dedicated lightweight API (Node.js or Python FastAPI) on an **Oracle Cloud "Always Free" Tier instance**. Oracle permanently provides a free ARM compute instance with 24GB of RAM, 4 CPUs, and 200GB of storage. 
*   **Result:** The Next.js app on Vercel shrinks to < 5MB. It fetches data via HTTP from your Oracle API. 
*   **Pros:** Absolute ownership. 200GB of completely free space. Can easily handle 10GB+ vector embeddings in RAM.

### Strategy B: HTTP Range Requests via Static CDN (The "Serverless" Hack)
Host the massive `vedic-lake.db` on a pure static file host (like Cloudflare R2 or GitHub Releases).
*   **How:** Use `sql.js-httpvfs` in our Next.js application. Instead of downloading the 10GB database, the frontend issues HTTP Range requests to the CDN, downloading *only the specific 4KB bytes* required to fulfill the SQL query.
*   **Result:** Zero active backend servers required. Storage costs on Cloudflare R2 are virtually zero.
*   **Pros:** Infinite scale, no backend to maintain, completely sidesteps Vercel limits.

### Strategy C: 100% Static CDN + Client-Side Search (The "Jamstack" Approach)
Abandon SQLite for production runtime. Our local pipeline builds the data, but we export everything as thousands of static `.json` files.
*   **How:** We upload these JSON files to a free CDN (Cloudflare Pages or AWS S3). Next.js fetches `https://cdn.vishwa-vani/mahabharata/1/1.json` dynamically. For search, we pre-build inverted index files (PageRank style) that the client downloads.
*   **Result:** No databases, no limits.
*   **Pros:** Ultimate simplicity and caching.

## 6. Architect's Recommendation
You are completely correct: moving to Turso is a temporary band-aid that introduces vendor lock-in.

If we want a **permanent, scalable, zero-cost architecture** that retains our powerful SQL query capabilities without modifying our current data structures, **Strategy A (True Backend Decoupling on Oracle Always Free)** is the most robust engineering choice. It gives us 200GB of breathing room, perfect for vectorizing the Gold Data (P1 Backlog), while keeping the Next.js frontend incredibly lightweight.
