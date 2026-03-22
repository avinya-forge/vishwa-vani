# ⚖️ Vishwa-Vani: Legal & Copyright Compliance Audit

> **Objective**: Ensure 100% legal compliance for all data aggregated into the library. Respect the hard work of digital archivists and maintain mandatory attribution.

---

## 📜 Global Policy
Vishwa-Vani strictly ingests data only from **Public Domain** or **MIT/GPL/CC-BY** licensed sources. We do not host copyrighted proprietary translations without explicit permission.

---

## 🔍 Ingested Sources (Audit Trail)

| Source ID | Text | Origin / Path | License | Verified | Attribution Line |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SRC-001** | Bhagavad Gita | [vedicscriptures.github.io](https://vedicscriptures.github.io) | MIT | ✅ YES | "Sanskrit texts and translations provided by the Vedic Scriptures Open-Source Project (MIT)." |
| **SRC-002** | Mahabharata | [bhavykhatri/DharmicData](https://github.com/bhavykhatri/DharmicData) | ODbL | ✅ YES | "Epics aggregated from bhavykhatri's DharmicData project." |
| **SRC-003** | Puranas | [Akhilesh-Gogikar/Puranas](https://github.com/Akhilesh-Gogikar/Puranas) | Public Domain | ⏳ PENDING | "Puranic corpus digitized by Akhilesh Gogikar." |

---

## 🛡️ Attribution Hierarchy
To prevent 100s of footer links, Vishwa-Vani uses a **Multi-Tier Attribution System**:
1. **Tier A (Hub)**: All major contributors listed in the 'About' / 'Sources' page.
2. **Tier B (Fragment Footnote)**: Each shloka view includes a discrete "Source Info" toggle revealing specific digital archivist credits.
3. **Tier C (Metadata)**: The NVF `metadata` layer contains the `source_id` matching this audit log.

---

## 🏗️ Action Items
- [x] **1902.1**: Add "Source Context" button to `StudyClient` to show attribution per book.
- [x] **1902.2**: Audit `bhavykhatri` Mahabharata license headers.
- [x] **1902.3**: Contact `Akhilesh Gogikar` for explicit "Digitization Credit" preference.

_Last Updated: March 2026_
