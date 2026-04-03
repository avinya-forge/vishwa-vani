# 🏛️ Vishwa-Vani: The Vedic Wikipedia

> **Vishwa-Vani** is a transcendent, multilingual, and highly performant digital sanctuary for exploring Vedic wisdom. This project aims to be the "Wikipedia for Vedas," providing an immersive experience for exploring Shlokas, Mantras, and Sanskrit definitions across languages—English, Hindi, and Marathi.

[![Version](https://img.shields.io/badge/version-v0.8.0-orange.svg)](./docs/release-notes.md)
[![Hosting](https://img.shields.io/badge/hosting-Vercel%20%7C%20Netlify%20%7C%20GitHub_Pages-blue.svg)](https://github.com/vishwa-vani/vishwa-vani)

---

## 🏛️ Project Identity

Vishwa-Vani is built with a **Framework First** approach, ensuring absolute scalability and security before massive content aggregation. It is architected for **zero-cost hosting** on platforms like GitHub Pages using **Next.js Static Export (SSG)**.

- **Multilingual UI**: Native support for English (EN), Hindi (HI), and Marathi (MR) using `next-intl`.
- **Vedic Lake Storage**: Hybrid binary storage (SQLite WASM) for massive scriptures (Mahabharata, Puranas) with indexed $O(1)$ retrieval.
- **Security Shield**: Multi-layered protection (CSP + Console Blocking) to safeguard the "Fortress of Wisdom."
- **Immersive 1600px UI**: A wide-canvas reading experience optimized for both mobile "one-screen" shlokas and desktop "Knowledge Side-Panels."
- **Interactive Vedic Lab**: Astrology-aware and gamified modules to make learning fun and non-boring.
- **Aggregated Commentary**: Philosophical insights from historical and modern sages.

---

## 🏛️ Current Pulse (Milestone Framework)

| Milestone | Phase | Status | Progress | Highlights |
| :--- | :--- | :--- | :--- | :--- |
| **M1** | The Autonomous Data Factory | ✅ **DONE** | 100% | SQLite WASM, i18n, Security Shield |
| **M2** | The AI Professor | ⏳ IN PROGRESS | 35% | Astro Module, 1600px UI, WebLLM |
| **M3** | Massive Aggregation | 📅 BACKLOG | 0% | Mahabharata, Vedas, Puranas |
| **M4** | Wiki Crowdsourcing | 📅 BACKLOG | 0% | Community Edit Protocols |

---

## 🏛️ Technical Stack

- **Framework**: Next.js 15+ (App Router)
- **Internationalization**: `next-intl`
- **Data Engine**: **The Vedic Lake** (SQLite WASM + JSON Sharding)
- **Security**: **Vedic Shield Architecture** (CSP + DevTools Prevention)
- **Styling**: Tailwind CSS (Immersive Wider Layout)
- **Hosting**: GitHub Pages (Full Static SSG)

---

## � Deployment

Vishwa-Vani supports multiple free hosting options:

### Option 1: Vercel (Recommended)
1. **Connect Repository**: Link your GitHub repo to [Vercel](https://vercel.com)
2. **Auto-Deploy**: Vercel automatically detects Next.js and deploys
3. **Custom Domain**: Add your domain (free .vercel.app subdomain available)
4. **Analytics**: Built-in analytics and performance monitoring

### Option 2: Netlify
1. **Connect Repository**: Link to [Netlify](https://netlify.com)
2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `.next`
3. **Deploy**: Automatic deployments on push

### Option 3: GitHub Pages
1. **Enable Pages**: Go to repository Settings → Pages
2. **Source**: GitHub Actions
3. **Workflow**: Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .next
```

### Environment Variables
For production deployment, set these environment variables:
- `NODE_ENV=production`
- `NEXT_PUBLIC_APP_URL=https://your-domain.com`

---

### Installation
Ensure you have Node.js (v18+) installed.

```bash
git clone https://github.com/vishwa-vani/vishwa-vani.git
cd vishwa-vani
npm install
```

### Build & Ingest
```bash
# Ingest data into the Vedic Lake (SQLite shards)
python scripts/vishwa.py lake ingest

# Build Search Index
python scripts/vishwa.py lake index

# Build for Production
npm run build
```
This generates an `out/` folder ready for static hosting.

---

## 🗺️ Documentation

- 🏛️ [Vishwa-Vani Vision](./docs/vision.md)
- 🚀 [Master Backlog](./docs/planning/backlog.md)
- 📦 [Release Notes](./docs/release-notes.md)
- 🏗️ [Architecture Blueprint](./docs/architecture/blueprint.md)
- 🛠️ [Engineering & Operations](./docs/rules/standards.md)

---
_Vishwa-Vani: Turning Vedic Knowledge into an Interactive Journey._
