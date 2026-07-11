# 🛰️ Vishwa-Vani: Unified Library Tracker

This tracker provides a multi-dimensional view of library readiness, factoring in structural completeness (chapters/verses), linguistic coverage (languages), scholarly depth (authors), and UI integration (availability).

## 📊 Library Readiness Summary

| Book Name | Stage | UI | Score (%) | Chapters | Verses | Langs | Authors |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Kena Upanishad | GOLD | READY | **100.0%** | 1/1 | 34/34 | 4/4 | 2/2 |
| Bhagavad Gita | GOLD | READY | **82.16%** | 18/18 | 657/700 | 4/4 | 2/10 |
| Mahabharata (All 18 Parvas) | GOLD | READY | **54.32%** | 2/18 | 6977/100000 | 2/2 | 2/2 |
| 16 Samskaras (Ritual Handbook) | SILVER | HIDDEN | **32.29%** | 1/1 | 3/16 | 1/3 | 0/1 |
| Garuda Purana | SILVER | HIDDEN | **30.0%** | 2/2 | 2/19000 | 1/2 | 0/2 |
| Rigveda Samhita | BRONZE/INGESTING | HIDDEN | **0.0%** | 0/10 | 0/10552 | 0/2 | 0/1 |
| Dasbodh | BRONZE/INGESTING | HIDDEN | **0.0%** | 0/20 | 0/7751 | 0/2 | 0/1 |
| Samaveda Samhita | BRONZE/INGESTING | HIDDEN | **0.0%** | 0/2 | 0/1875 | 0/2 | 0/1 |

## 🔍 Granular Book Details

### Kena Upanishad (`kena-upanishad`)
- **Readiness Score:** 100.0%
- **Pipeline Stage:** GOLD
- **UI Integration:** READY
- **Structural Progress:**
  - Chapters: 1/1
  - Verses: 34/34
- **Linguistic Coverage:**
  - Actual: hi, mr, sa, en
  - Target: sa, en, hi, mr
- **Scholarly Depth:**
  - Authors Present: sri-aurobindo, max_muller
  - Target Author Count: 2

### Bhagavad Gita (`bhagavad-gita`)
- **Readiness Score:** 82.16%
- **Pipeline Stage:** GOLD
- **UI Integration:** READY
- **Structural Progress:**
  - Chapters: 18/18
  - Verses: 657/700
- **Linguistic Coverage:**
  - Actual: hi, mr, sa, en
  - Target: sa, en, hi, mr
- **Scholarly Depth:**
  - Authors Present: sant-dnyaneshwar, adi-shankara
  - Target Author Count: 10

### Mahabharata (All 18 Parvas) (`mahabharata`)
- **Readiness Score:** 54.32%
- **Pipeline Stage:** GOLD
- **UI Integration:** READY
- **Structural Progress:**
  - Chapters: 2/18
  - Verses: 6977/100000
- **Linguistic Coverage:**
  - Actual: sa, en
  - Target: sa, en
- **Scholarly Depth:**
  - Authors Present: km_ganguli, nilakantha
  - Target Author Count: 2

### 16 Samskaras (Ritual Handbook) (`samskaras`)
- **Readiness Score:** 32.29%
- **Pipeline Stage:** SILVER
- **UI Integration:** HIDDEN
- **Structural Progress:**
  - Chapters: 1/1
  - Verses: 3/16
- **Linguistic Coverage:**
  - Actual: sa
  - Target: sa, hi, mr
- **Scholarly Depth:**
  - Authors Present: None
  - Target Author Count: 1

### Garuda Purana (`garuda-purana`)
- **Readiness Score:** 30.0%
- **Pipeline Stage:** SILVER
- **UI Integration:** HIDDEN
- **Structural Progress:**
  - Chapters: 2/2
  - Verses: 2/19000
- **Linguistic Coverage:**
  - Actual: sa
  - Target: sa, en
- **Scholarly Depth:**
  - Authors Present: None
  - Target Author Count: 2

### Rigveda Samhita (`rigveda`)
- **Readiness Score:** 0.0%
- **Pipeline Stage:** BRONZE/INGESTING
- **UI Integration:** HIDDEN
- **Structural Progress:**
  - Chapters: 0/10
  - Verses: 0/10552
- **Linguistic Coverage:**
  - Actual: None
  - Target: sa, en
- **Scholarly Depth:**
  - Authors Present: None
  - Target Author Count: 1

### Dasbodh (`dasbodh`)
- **Readiness Score:** 0.0%
- **Pipeline Stage:** BRONZE/INGESTING
- **UI Integration:** HIDDEN
- **Structural Progress:**
  - Chapters: 0/20
  - Verses: 0/7751
- **Linguistic Coverage:**
  - Actual: None
  - Target: sa, mr
- **Scholarly Depth:**
  - Authors Present: None
  - Target Author Count: 1

### Samaveda Samhita (`samaveda`)
- **Readiness Score:** 0.0%
- **Pipeline Stage:** BRONZE/INGESTING
- **UI Integration:** HIDDEN
- **Structural Progress:**
  - Chapters: 0/2
  - Verses: 0/1875
- **Linguistic Coverage:**
  - Actual: None
  - Target: sa, en
- **Scholarly Depth:**
  - Authors Present: None
  - Target Author Count: 1

---
**Scoring Formula:** `30% Verses + 20% Chapters + 20% Languages + 20% Authors + 10% UI Readiness`

*Last Updated: 2026-07-06*