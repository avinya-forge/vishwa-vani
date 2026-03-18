# 🏛️ Vishwa-Vani: The Vedic Wikipedia

> **Vishwa-Vani** is a transcendent, multilingual, and highly performant digital sanctuary for exploring Vedic wisdom. This project aims to be the "Wikipedia for Vedas," providing an immersive experience for exploring Shlokas, Mantras, and Sanskrit definitions across languages—English, Hindi, and Marathi.

[![Version](https://img.shields.io/badge/version-v0.5.0-orange.svg)](./docs/release/release-notes.md)
[![Hosting](https://img.shields.io/badge/hosting-GitHub_Pages-black.svg)](https://github.com/vishwa-vani/vishwa-vani)

---

## 🏛️ Project Identity

Vishwa-Vani is built with a **Framework First** approach, ensuring absolute scalability and security before massive content aggregation. It is architected for **zero-cost hosting** on platforms like GitHub Pages using **Next.js Static Export (SSG)**.

- **Multilingual UI**: Native support for English (EN), Hindi (HI), and Marathi (MR) using `next-intl`.
- **Semantic Wiki Routing**: Clean URLs like `/[text]/[chapter]/[shloka]`.
- **AI Professor**: Layman-friendly explanations for complex Sanskrit concepts (Coming Soon).
- **Aggregated Commentary**: Philosophical insights from historical and modern sages (Sivananda, Chinmaya, etc.).

---

## 🏛️ Current Pulse (Milestone Framework)

| Milestone | Phase | Priority | Status | Progress |
| :--- | :--- | :--- | :--- | :--- |
| **M1** | Framework & i18n | P0 | ✅ **DONE** | 100% |
| **M2** | AI Professor Logic | P1 | ⏳ IN PROGRESS | 15% |
| **M3** | Data Aggregation | P2 | 📅 BACKLOG | 0% |
| **M4** | Wiki Crowdsourcing | P3 | 📅 BACKLOG | 0% |

---

## 🏛️ Technical Stack

- **Framework**: Next.js 15+ (App Router)
- **Internationalization**: `next-intl`
- **Styling**: Tailwind CSS
- **Storage Strategy**: Static JSON Sharding (Optimal for GitHub Pages)
- **Hosting**: GitHub Pages via `npm run build`

---

## 🛠️ Getting Started

### Installation
Ensure you have Node.js (v18+) installed.

```bash
git clone https://github.com/vishwa-vani/vishwa-vani.git
cd vishwa-vani
npm install
```

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```
This generates an `out/` folder ready to be pushed to your `gh-pages` branch.

---

## 🗺️ Documentation

- 🗺️ [Master Backlog](./docs/planning/backlog.md)
- 🏗️ [Vedic Registry](./lib/texts.ts)
- 🗺️ [Roadmap](./docs/planning/roadmap.md)

---
_Vishwa-Vani: Preserving Vedic wisdom for the digital age._
