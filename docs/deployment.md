# Deployment and Domain Configuration

## Domain Configuration (PUB-001)

The production domain is configured to **vishwavani.app**.

### Vercel Integration
- **A Records**: Point `@` to `76.76.21.21`
- **CNAME**: Point `www` to `cname.vercel-dns.com`

## DNS & Security Layer (PUB-002)

Cloudflare is used as the DNS and CDN layer.

### Configuration
- **SSL/TLS**: Set to "Full (Strict)"
- **DDoS Protection**: Enabled (Under Attack Mode available)
- **Edge Caching**: Configured for static assets in `public/` and `_next/static/`
- **WAF Rules**: Basic SQL injection and XSS protection enabled

### CDN Settings
- **Brotli**: Enabled
- **Auto Minify**: HTML, CSS, and JS enabled
- **Rocket Loader**: Disabled (to avoid issues with Hydration)

---

## Future Zero-Cost Architecture Plan

To maintain a $0/mo footprint as scale increases, the following stack migration is planned:

| LAYER | TOOL | FREE LIMIT | PURPOSE |
|-------|------|------------|---------|
| **Hosting** | Cloudflare Pages | 100k requests/day | Edge-rendered Next.js via `@cloudflare/next-on-pages` |
| **Database** | Supabase / D1 | 500MB / 5M reads | Relational storage for user bookmarks and feedback |
| **Auth** | Clerk | 10k MAU | User authentication and persistence |
| **AI API** | Google Gemini Flash | 15 RPM / 1M TPM | Free-tier synthesis and analysis |

### Key Migration Steps:
1. Initialize Supabase/D1 for dynamic features (bookmarks, progress).
2. Integrate Clerk for auth.
3. Switch synthesis API from Anthropic/OpenAI to Gemini Flash.
4. Final migration of compute from Vercel to Cloudflare Workers/Pages.

---

## 🛠️ Step-by-Step Production Deployment Guide

Follow this guide to transition Vishwa-Vani from localhost/beta to a live, professional custom domain with a zero-cost CI/CD pipeline.

### Step 1: Register Your Custom Domain (Zero Markup Registrar)
We recommend using **Cloudflare Registrar** because they provide domain registration at cost (zero markup over registry wholesale price, typically ~$10/year for `.app` or `.com` domains).

1. **Sign Up / Log In**: Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and create an account.
2. **Search Domain**: Under the "Domain Registration" section, search for your desired domain name (e.g., `vishwavani.app` or a fun cheap alternative like `vishwavani.tech`).
3. **Purchase & Configure DNS**: Follow the checkout steps. Once purchased, Cloudflare automatically makes itself the DNS provider for your domain, which is crucial for edge CDN optimizations, WAF security, and edge caching.

---

### Step 2: Establish the CI/CD Pipeline on Vercel
Vercel is the premier, zero-cost-tier hosting platform for Next.js App Router applications, providing seamless continuous integration directly from GitHub.

1. **Log In to Vercel**: Visit [Vercel](https://vercel.com/) and log in using your GitHub account.
2. **Import Repository**: Click "Add New" ➔ "Project" and import your `vishwa-vani` repository.
3. **Configure Project Settings**:
   - **Framework Preset**: Select **Next.js**.
   - **Root Directory**: Select `./` (root).
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. **Configure Environment Variables**:
   In the "Environment Variables" section, add:
   - `GEMINI_API_KEY` = `your_actual_google_gemini_api_key` (Required for live AI synthesis in production).
   - `NEXT_TELEMETRY_DISABLED` = `1` (Recommended to speed up builds).
5. **Deploy**: Click **Deploy**. Vercel will automatically fetch the repo, run the build pipeline, run tests, and provision a temporary live URL (e.g., `vishwa-vani.vercel.app`).
6. **Automated CI/CD**: Going forward, every commit pushed to `main` will trigger a production deployment, and every Pull Request will trigger an isolated preview deployment to verify changes before merging!

---

### Step 3: Link Custom Domain to Vercel (Cloudflare DNS Proxying)
To route traffic from your newly registered domain (`vishwavani.app`) to your Vercel deployment:

1. **Add Domain in Vercel**:
   - Go to your Vercel project dashboard ➔ **Settings** ➔ **Domains**.
   - Type your domain name (e.g., `vishwavani.app`) and click **Add**.
   - Select the recommended redirect pattern (redirect `www.vishwavani.app` to `vishwavani.app` or vice-versa).
2. **Configure DNS Records in Cloudflare**:
   Vercel will show the required DNS records. In your Cloudflare Dashboard ➔ select your domain ➔ **DNS Records**:
   - **Apex Record (A)**:
     - Name: `@`
     - Type: `A`
     - Content: `76.76.21.21`
     - Proxy status: **Proxied (Orange Cloud)** (Recommended for DDoS and SSL handling, but Vercel can also handle direct traffic if set to "DNS Only").
   - **Subdomain Record (CNAME)**:
     - Name: `www`
     - Type: `CNAME`
     - Content: `cname.vercel-dns.com`
     - Proxy status: **Proxied (Orange Cloud)**.
3. **Verify Connection**:
   Return to Vercel and wait up to a few minutes for DNS propagation. Once the checkmark turns green, Vercel will automatically provision a free Let's Encrypt SSL certificate and your app will be live at your custom domain!

---

### Step 4: Configure Cloudflare Security & Performance Tuning
To ensure maximum speed and robust security:
1. **SSL/TLS Setting**: Under SSL/TLS, select **Full (Strict)**. This encrypts traffic both from the visitor to Cloudflare and from Cloudflare to Vercel.
2. **Speed Optimizations**: Under Speed ➔ Optimization:
   - Enable **Brotli** compression.
   - Enable **Auto Minify** for HTML, CSS, and Javascript.
   - Ensure **Rocket Loader** is **Disabled** (Next.js handles script loading natively; Rocket Loader can disrupt hydration).
3. **WAF Rules**: Under Security ➔ WAF, enable default rulesets to block common SQLi, XSS, and bot scrapers.

---

### Step 5: Post-Deployment Verification Checklist
Once live, verify these core production flows on your domain:
1. **SSG Page Pre-rendering**: Navigate to `/bhagavad-gita/1` and `/isha-upanishad/1` to verify they load instantly without client-side spinners.
2. **AI Synthesis (Live Gemini)**: Select two commentators and click "Synthesize" — confirm a fast, authentic AI summary returns from the production `gemini-2.0-flash` endpoint.
3. **Database Performance**: Use search bar (e.g., "yoga" or "dharma") to confirm client-side SQLite WASM queries resolve in under 10ms.

