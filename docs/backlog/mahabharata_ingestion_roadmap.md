# Mahabharata Ingestion Roadmap

## Overview
Parva-by-parva ingestion of the Mahabharata using BORI Critical Edition as the primary source.

## Schedule

### Phase 1: Foundation (Q1 2026)
- **Adi Parva** (Parva 1): Complete - 19 Adhyayas
- **Sabha Parva** (Parva 2): In Progress - 72 Adhyayas
- **Vana Parva** (Parva 3): Planned - 267 Adhyayas

### Phase 2: Core Conflict (Q2 2026)
- **Virata Parva** (Parva 4): Planned - 67 Adhyayas
- **Udyoga Parva** (Parva 5): Planned - 186 Adhyayas
- **Bhishma Parva** (Parva 6): Planned - 117 Adhyayas

### Phase 3: Climax (Q3 2026)
- **Drona Parva** (Parva 7): Planned - 170 Adhyayas
- **Karna Parva** (Parva 8): Planned - 69 Adhyayas
- **Shalya Parva** (Parva 9): Planned - 57 Adhyayas

### Phase 4: Resolution (Q4 2026)
- **Sauptika Parva** (Parva 10): Planned - 16 Adhyayas
- **Stri Parva** (Parva 11): Planned - 23 Adhyayas
- **Shanti Parva** (Parva 12): Planned - 334 Adhyayas
- **Anushasana Parva** (Parva 13): Planned - 154 Adhyayas
- **Ashvamedhika Parva** (Parva 14): Planned - 92 Adhyayas
- **Ashramavasika Parva** (Parva 15): Planned - 35 Adhyayas
- **Mausala Parva** (Parva 16): Planned - 7 Adhyayas
- **Mahaprasthanika Parva** (Parva 17): Planned - 3 Adhyayas
- **Svargarohana Parva** (Parva 18): Planned - 5 Adhyayas

## Source: BORI Critical Edition
- Primary: Bhandarkar Oriental Research Institute Critical Edition
- Backup: KM Ganguli English Translation
- Sanskrit: Devanagari script with IAST transliteration

## Automation
- Use `scripts/vishwa.py data ingest mahabharata --parva <n>` for automated ingestion
- OCR verification via `scripts/vishwa.py data verify mahabharata --parva <n>`