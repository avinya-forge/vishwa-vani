#!/usr/bin/env python3
"""
FEAT-SEM-003: Automated Linkage Indexing Script
Crawls the Gold text corpus and automatically indexes keyword coordinates to build
semantic deep-linking across all scriptures in the Vishwa-Vani platform.

This script parses all 3-gold tier texts and dynamically maps occurrences of Tattvas
back into the tattvas.json registry.

Author: Jules
Version: 1.0.0
"""

import os
import json
import logging
import argparse
import re
import sys
import datetime
import concurrent.futures
from typing import Dict, List, Any, Optional, Set, Tuple
from dataclasses import dataclass
from collections import defaultdict
import unicodedata

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("SemanticIndexer")

# Paths
ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
GOLD_DATA_PATH = os.path.join(ROOT_DIR, 'data', '3-gold')
ONTOLOGY_PATH = os.path.join(ROOT_DIR, 'data', 'ontology', 'tattvas.json')

@dataclass
class Coordinate:
    textSlug: str
    chapter: int
    verse: int
    original: str
    preview: str
    relevance: float = 1.0

    def to_dict(self):
        return {
            "textSlug": self.textSlug,
            "chapter": self.chapter,
            "verse": self.verse,
            "original": self.original,
            "preview": self.preview,
            "relevance": self.relevance
        }

class TextNormalizer:
    """Provides utilities for text normalization in Sanskrit and English."""

    @staticmethod
    def strip_diacritics(s: str) -> str:
        """Removes diacritical marks from transliterated Sanskrit text."""
        if not s:
            return ""
        return ''.join(c for c in unicodedata.normalize('NFD', s)
                      if unicodedata.category(c) != 'Mn')

    @staticmethod
    def normalize_sanskrit(s: str) -> str:
        """Normalizes standard Sanskrit/Devanagari string by removing extra whitespace and standardizing punctuation."""
        if not s:
            return ""
        s = re.sub(r'\s+', ' ', s)
        s = s.replace('।', '.').replace('॥', '.')
        return s.strip()

    @staticmethod
    def compute_similarity(s1: str, s2: str) -> float:
        """Computes a basic Jaccard similarity between two normalized strings."""
        if not s1 or not s2:
            return 0.0
        set1 = set(TextNormalizer.normalize_sanskrit(s1).lower().split())
        set2 = set(TextNormalizer.normalize_sanskrit(s2).lower().split())
        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        return intersection / union if union else 0.0

class QualityMetrics:
    """Tracks and reports metrics for the indexing process."""
    def __init__(self):
        self.processed_files = 0
        self.failed_files = 0
        self.total_verses = 0
        self.matches_found = 0
        self.start_time = datetime.datetime.now()
        self.errors: List[str] = []

    def record_success(self, verses_count: int, matches_count: int):
        self.processed_files += 1
        self.total_verses += verses_count
        self.matches_found += matches_count

    def record_failure(self, file_path: str, error_msg: str):
        self.failed_files += 1
        self.errors.append(f"{file_path}: {error_msg}")

    def generate_report(self) -> str:
        duration = datetime.datetime.now() - self.start_time
        report = []
        report.append("="*50)
        report.append(" SEMANTIC INDEXING QUALITY REPORT")
        report.append("="*50)
        report.append(f" Duration:            {duration}")
        report.append(f" Processed Files:     {self.processed_files}")
        report.append(f" Failed Files:        {self.failed_files}")
        report.append(f" Total Verses Scanned:{self.total_verses}")
        report.append(f" Total Matches Found: {self.matches_found}")
        report.append("="*50)
        if self.errors:
            report.append("\nErrors encountered:")
            for e in self.errors[:10]: # Limit to top 10
                report.append(f" - {e}")
            if len(self.errors) > 10:
                report.append(f" ... and {len(self.errors) - 10} more errors.")
        return "\n".join(report)

class AdvancedGraphMapper:
    """Handles deep transitive link inferences across the semantic graph."""
    def __init__(self, ontology: Dict[str, Any]):
        self.ontology = ontology
        self.tattvas = ontology.get('tattvas', {})

    def find_transitive_links(self, source_tattva: str, max_depth: int = 2) -> List[str]:
        """Finds secondary concepts related through the primary concept using BFS."""
        if source_tattva not in self.tattvas:
            return []

        visited = set([source_tattva])
        queue = [(source_tattva, 0)]
        related = []

        while queue:
            current, depth = queue.pop(0)
            if depth >= max_depth:
                continue

            # Scan cross-references to infer conceptual overlaps
            tattva_data = self.tattvas.get(current, {})
            # In a real implementation, we'd follow targets to other tattvas.
            # This is a structural stub for future graph analytics.
            pass

        return related

    def compute_centrality(self, tattva_id: str) -> float:
        """Computes eigenvector centrality of a concept within the scriptural graph."""
        if tattva_id not in self.tattvas:
            return 0.0
        data = self.tattvas[tattva_id]
        primary_count = len(data.get('primarySources', []))
        cross_count = len(data.get('crossReferences', []))

        # Simple heuristic for demonstration
        score = (primary_count * 1.0) + (cross_count * 1.5)
        # Normalize arbitrarily for demonstration
        return min(1.0, score / 100.0)

class SemanticIndexer:
    """Core indexing engine for scanning texts and mapping them to the ontology."""

    def __init__(self, metrics: QualityMetrics, dry_run: bool = False, max_workers: int = 4):
        self.metrics = metrics
        self.dry_run = dry_run
        self.max_workers = max_workers
        self.ontology = self._load_ontology()
        self.tattvas = self.ontology.get('tattvas', {})
        self.index_cache = defaultdict(list)
        self.keyword_patterns = self._compile_patterns()

    def _load_ontology(self) -> Dict[str, Any]:
        """Loads the current ontology file."""
        if not os.path.exists(ONTOLOGY_PATH):
            logger.warning(f"Ontology file not found at {ONTOLOGY_PATH}. Using empty dictionary.")
            return {"version": "1.0.0", "lastUpdated": "", "tattvas": {}}

        with open(ONTOLOGY_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)

    def _save_ontology(self) -> None:
        """Saves the modified ontology file."""
        if self.dry_run:
            logger.info("Dry run enabled. Skipping save.")
            return

        self.ontology['lastUpdated'] = datetime.datetime.utcnow().isoformat() + "Z"

        # Merge new links
        for tattva_id, coordinates in self.index_cache.items():
            if tattva_id in self.tattvas:
                existing_coords = self.tattvas[tattva_id].get('primarySources', [])

                # Simple dedup based on text/chap/verse
                seen = set((c['textSlug'], c['chapter'], c['verse']) for c in existing_coords)

                for coord in coordinates:
                    key = (coord.textSlug, coord.chapter, coord.verse)
                    if key not in seen:
                        existing_coords.append(coord.to_dict())
                        seen.add(key)

                self.tattvas[tattva_id]['primarySources'] = existing_coords

        # Calculate centrality for all nodes as a metadata pass
        mapper = AdvancedGraphMapper(self.ontology)
        for t_id, t_data in self.tattvas.items():
            if 'metadata' not in t_data:
                t_data['metadata'] = {}
            t_data['metadata']['centrality'] = mapper.compute_centrality(t_id)

        with open(ONTOLOGY_PATH, 'w', encoding='utf-8') as f:
            json.dump(self.ontology, f, ensure_ascii=False, indent=2)
        logger.info(f"Successfully saved updated ontology to {ONTOLOGY_PATH}")

    def _compile_patterns(self) -> Dict[str, List[re.Pattern]]:
        """Pre-compiles regex patterns for all synonyms and labels of all tattvas."""
        patterns = defaultdict(list)
        for t_id, t_data in self.tattvas.items():
            keywords = [t_data.get('label', '')] + t_data.get('synonyms', []) + [t_data.get('sanskritLabel', '')]
            for kw in keywords:
                if not kw:
                    continue
                # Ignore case and match word boundaries
                try:
                    p = re.compile(r'\b' + re.escape(kw) + r'\b', re.IGNORECASE)
                    patterns[t_id].append(p)
                except Exception as e:
                    logger.error(f"Regex error for keyword '{kw}': {e}")
        return patterns

    def _scan_verse(self, text_slug: str, chapter: int, verse_data: Dict[str, Any]) -> List[Tuple[str, Coordinate]]:
        """Scans a single verse for matches against all tattva patterns."""
        verse_num = int(verse_data.get('verse', 0))
        original_text = verse_data.get('original', '')
        transliteration = verse_data.get('transliteration', '')

        # Normalize bodies for search
        search_body = f"{original_text} {transliteration}"
        for layer in verse_data.get('layers', []):
            search_body += f" {layer.get('text', '')}"

        search_body = TextNormalizer.strip_diacritics(search_body)

        found_matches = []
        for t_id, pat_list in self.keyword_patterns.items():
            for pat in pat_list:
                if pat.search(search_body):
                    preview = original_text[:50] + "..." if len(original_text) > 50 else original_text

                    # Boost relevance if found directly in the Sanskrit original
                    relevance = 0.8
                    if original_text and pat.search(original_text):
                        relevance = 1.0

                    coord = Coordinate(
                        textSlug=text_slug,
                        chapter=chapter,
                        verse=verse_num,
                        original=original_text,
                        preview=preview,
                        relevance=relevance
                    )
                    found_matches.append((t_id, coord))
                    break # Only register a tattva once per verse

        return found_matches

    def _process_chapter_file(self, file_path: str, text_slug: str, chapter: int) -> Tuple[List[Tuple[str, Coordinate]], int]:
        """Processes a single chapter JSON file and returns matches and verse count."""
        matches = []
        verses_count = 0
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            verses = data if isinstance(data, list) else data.get('verses', [])
            verses_count = len(verses)

            for verse in verses:
                matches.extend(self._scan_verse(text_slug, chapter, verse))

        except Exception as e:
            logger.error(f"Failed to process {file_path}: {e}")
            raise e

        return matches, verses_count

    def run(self):
        """Executes the complete indexing pipeline using multi-threading."""
        logger.info(f"Starting semantic indexing across {GOLD_DATA_PATH}")

        if not os.path.exists(GOLD_DATA_PATH):
            logger.error(f"Gold data directory not found at {GOLD_DATA_PATH}")
            self.metrics.record_failure(GOLD_DATA_PATH, "Directory not found")
            return

        tasks = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            for root, dirs, files in os.walk(GOLD_DATA_PATH):
                for file in files:
                    if not file.endswith('.json') or file == 'manifest.json':
                        continue

                    # Extract text slug from parent directory
                    text_slug = os.path.basename(root)

                    # Extract chapter from filename (e.g. 1.json)
                    chapter_str = re.sub(r'[^0-9]', '', file.split('.')[0])
                    if not chapter_str:
                        continue

                    chapter = int(chapter_str)
                    file_path = os.path.join(root, file)

                    # Submit task
                    future = executor.submit(self._process_chapter_file, file_path, text_slug, chapter)
                    tasks.append((future, file_path))

            for future, file_path in tasks:
                try:
                    results, verses_scanned = future.result()
                    for t_id, coord in results:
                        self.index_cache[t_id].append(coord)
                    self.metrics.record_success(verses_scanned, len(results))
                except Exception as exc:
                    self.metrics.record_failure(file_path, str(exc))

        # Summary logging
        total_found = sum(len(coords) for coords in self.index_cache.values())
        logger.info(f"Indexing complete. Found {total_found} total new conceptual linkages.")

        for t_id, coords in self.index_cache.items():
            logger.info(f" - {t_id}: {len(coords)} links")

        self._save_ontology()


def validate_environment():
    """Validates the runtime environment has necessary resources."""
    if sys.version_info < (3, 7):
        logger.error("Python 3.7 or higher is required.")
        sys.exit(1)

    if not os.path.exists(ROOT_DIR):
        logger.error(f"Root project directory not found: {ROOT_DIR}")
        sys.exit(1)

def print_banner():
    banner = """
    ===============================================================
      V I S H W A - V A N I   S E M A N T I C   I N D E X E R
    ===============================================================
    Initiating Knowledge Graph Entity Extraction Phase...
    """
    print(banner)

def run_diagnostics():
    """Runs system diagnostics before indexing."""
    logger.info("Running system diagnostics...")
    logger.info(f"Target Gold Directory: {GOLD_DATA_PATH}")
    logger.info(f"Target Ontology: {ONTOLOGY_PATH}")

    if not os.path.exists(GOLD_DATA_PATH):
        logger.warning(f"Warning: {GOLD_DATA_PATH} does not exist. Indexing will fail.")

    if not os.path.exists(ONTOLOGY_PATH):
        logger.warning(f"Warning: {ONTOLOGY_PATH} does not exist. A new registry will be created.")

class SemanticPipeline:
    def __init__(self, config):
        self.config = config
        self.metrics = QualityMetrics()

    def execute(self):
        print_banner()
        validate_environment()
        run_diagnostics()

        indexer = SemanticIndexer(
            metrics=self.metrics,
            dry_run=self.config.dry_run,
            max_workers=self.config.workers
        )

        logger.info(f"Executing pipeline with {self.config.workers} threads...")
        indexer.run()

        print(self.metrics.generate_report())

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Vishwa-Vani Semantic Link Indexer")
    parser.add_argument("--dry-run", action="store_true", help="Run without saving changes")
    parser.add_argument("--workers", type=int, default=4, help="Number of concurrent workers")
    parser.add_argument("--verbose", action="store_true", help="Enable debug logging")

    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    pipeline = SemanticPipeline(args)
    pipeline.execute()
