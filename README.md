# 🏛️ Vishwa-Vani: The Vedic Wikipedia

> **Vishwa-Vani** is a transcendent, multilingual, and highly performant digital sanctuary for exploring Vedic wisdom. This project aims to be the "Wikipedia for Vedas," providing an immersive experience for exploring Shlokas, Mantras, and Sanskrit definitions across languages—English, Hindi, and Marathi.

[![Version](https://img.shields.io/badge/version-v0.6.0-orange.svg)](./docs/release-notes.md)
[![Hosting](https://img.shields.io/badge/hosting-GitHub_Pages-black.svg)](https://github.com/vishwa-vani/vishwa-vani)

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

## 🛠️ Getting Started

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
