#!/usr/bin/env python3
"""
MBH-104: AI Enrichment Script for Mahabharata Adhyayas

Generates comprehensive metadata schema for all Mahabharata adhyayas.
Reads each adhyaya JSON file and computes rule-based metadata.

Rule-based enrichment (pending real LLM integration):
  - verse_count: number of fragments
  - has_sanskrit: whether original field is non-empty in majority
  - has_translation: whether meaning field is non-empty in majority
  - authors: list of unique author keys from layers
  - chapter_ref: parva + adhyaya number derived from filename
  - stub_themes: array of 2-3 generic placeholder strings (marked as STUB)
  - enrichment_version: "0.1-stub"
  - enrichment_date: today's date

Writes sidecar .meta.json files (one per adhyaya).
Safe to re-run (idempotent).

STUB: MBH-104 — pending real LLM enrichment (STAB-603)
"""

import json
import os
import glob
from datetime import datetime
from pathlib import Path


def get_adhyaya_metadata(adhyaya_path: str, parva_num: int, adhyaya_num: int) -> dict:
    """
    Read an adhyaya JSON file and compute rule-based metadata.

    Args:
        adhyaya_path: Full path to the adhyaya JSON file
        parva_num: Parva number (1, 2, 3, ...)
        adhyaya_num: Adhyaya number within the parva

    Returns:
        Dictionary of enriched metadata
    """
    try:
        with open(adhyaya_path, 'r', encoding='utf-8') as f:
            verses = json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"ERROR reading {adhyaya_path}: {e}")
        return None

    if not isinstance(verses, list) or len(verses) == 0:
        print(f"WARNING: Empty or invalid verses in {adhyaya_path}")
        return None

    # Count verses with Sanskrit original
    has_sanskrit_count = sum(
        1 for v in verses
        if isinstance(v, dict) and v.get('original') and v['original'].strip()
    )
    has_sanskrit = has_sanskrit_count > len(verses) / 2

    # Count verses with translation meaning
    has_translation_count = sum(
        1 for v in verses
        if isinstance(v, dict) and v.get('meaning') and v['meaning'].strip()
    )
    has_translation = has_translation_count > len(verses) / 2

    # Extract unique authors from all layers
    authors = set()
    for verse in verses:
        if isinstance(verse, dict) and 'layers' in verse:
            for layer in verse.get('layers', []):
                if isinstance(layer, dict) and 'author' in layer:
                    author_key = layer['author']
                    if author_key:
                        authors.add(author_key)

    # STUB: Generic placeholder themes pending LLM integration
    stub_themes = ["dharma", "epic-narrative", "character-arc"]

    # Build metadata dictionary
    metadata = {
        "chapter_ref": f"parva-{parva_num}-adhyaya-{adhyaya_num}",
        "parva": parva_num,
        "adhyaya": adhyaya_num,
        "verse_count": len(verses),
        "has_sanskrit": has_sanskrit,
        "has_translation": has_translation,
        "authors": sorted(list(authors)),
        "stub_themes": stub_themes,  # STUB: MBH-104 — pending real LLM enrichment (STAB-603)
        "enrichment_version": "0.1-stub",  # STUB: MBH-104 — pending real LLM enrichment (STAB-603)
        "enrichment_date": datetime.now().isoformat(),
        "_enrichment_note": "STUB: Placeholder metadata pending real LLM enrichment (STAB-603). Themes are generic until AI synthesis endpoint is implemented."
    }

    return metadata


def enrich_parva_1():
    """
    Enrich all adhyayas in Parva 1 (flat files at root).
    Files: mahabharata-parva-1-adhyaya-*.json
    """
    base_dir = "/sessions/amazing-optimistic-clarke/mnt/vishwa-vani/data/3-gold/mahabharata"
    pattern = os.path.join(base_dir, "mahabharata-parva-1-adhyaya-*.json")
    files = sorted(glob.glob(pattern))

    # Filter out .meta.json files (idempotency)
    files = [f for f in files if not f.endswith('.meta.json')]

    processed = 0
    errors = 0

    for filepath in files:
        # Extract adhyaya number from filename
        filename = os.path.basename(filepath)
        # Format: mahabharata-parva-1-adhyaya-N.json
        parts = filename.replace('.json', '').split('-')
        try:
            adhyaya_num = int(parts[-1])
        except (ValueError, IndexError):
            print(f"ERROR: Could not parse adhyaya number from {filename}")
            errors += 1
            continue

        metadata = get_adhyaya_metadata(filepath, parva_num=1, adhyaya_num=adhyaya_num)
        if metadata is None:
            errors += 1
            continue

        # Write sidecar .meta.json file
        meta_path = filepath.replace('.json', '.meta.json')
        try:
            with open(meta_path, 'w', encoding='utf-8') as f:
                json.dump(metadata, f, indent=2, ensure_ascii=False)
            processed += 1
        except IOError as e:
            print(f"ERROR writing metadata to {meta_path}: {e}")
            errors += 1

    return processed, errors


def enrich_parva(parva_num: int):
    """
    Enrich all adhyayas in Parva N (in subdirectory parva-N/).
    Files: parva-N/adhyaya-*.json
    """
    base_dir = f"/sessions/amazing-optimistic-clarke/mnt/vishwa-vani/data/3-gold/mahabharata/parva-{parva_num}"
    pattern = os.path.join(base_dir, "adhyaya-*.json")
    files = sorted(glob.glob(pattern))

    # Filter out .meta.json files (idempotency)
    files = [f for f in files if not f.endswith('.meta.json')]

    processed = 0
    errors = 0

    for filepath in files:
        # Extract adhyaya number from filename
        filename = os.path.basename(filepath)
        # Format: adhyaya-N.json
        parts = filename.replace('.json', '').split('-')
        try:
            adhyaya_num = int(parts[-1])
        except (ValueError, IndexError):
            print(f"ERROR: Could not parse adhyaya number from {filename}")
            errors += 1
            continue

        metadata = get_adhyaya_metadata(filepath, parva_num=parva_num, adhyaya_num=adhyaya_num)
        if metadata is None:
            errors += 1
            continue

        # Write sidecar .meta.json file
        meta_path = filepath.replace('.json', '.meta.json')
        try:
            with open(meta_path, 'w', encoding='utf-8') as f:
                json.dump(metadata, f, indent=2, ensure_ascii=False)
            processed += 1
        except IOError as e:
            print(f"ERROR writing metadata to {meta_path}: {e}")
            errors += 1

    return processed, errors


def main():
    """
    Main entry point: enrich all adhyayas across all parvas.
    """
    print("=" * 70)
    print("MBH-104: Mahabharata Adhyaya Enrichment")
    print("=" * 70)
    print(f"Start time: {datetime.now().isoformat()}")
    print()

    total_processed = 0
    total_errors = 0

    # Process Parva 1
    print("Processing Parva 1 (225 adhyayas)...")
    p1_processed, p1_errors = enrich_parva_1()
    total_processed += p1_processed
    total_errors += p1_errors
    print(f"  ✓ Processed: {p1_processed}, Errors: {p1_errors}")
    print()

    # Process Parva 2
    print("Processing Parva 2 (72 adhyayas)...")
    p2_processed, p2_errors = enrich_parva(2)
    total_processed += p2_processed
    total_errors += p2_errors
    print(f"  ✓ Processed: {p2_processed}, Errors: {p2_errors}")
    print()

    # Process Parva 3
    print("Processing Parva 3 (299 adhyayas)...")
    p3_processed, p3_errors = enrich_parva(3)
    total_processed += p3_processed
    total_errors += p3_errors
    print(f"  ✓ Processed: {p3_processed}, Errors: {p3_errors}")
    print()

    # Summary
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total processed: {total_processed}")
    print(f"Total errors:    {total_errors}")
    print(f"End time:        {datetime.now().isoformat()}")
    print()
    print("Note: All metadata marked as STUB pending real LLM enrichment (STAB-603)")
    print("      Original adhyaya JSON files remain unchanged.")
    print("=" * 70)


if __name__ == "__main__":
    main()
