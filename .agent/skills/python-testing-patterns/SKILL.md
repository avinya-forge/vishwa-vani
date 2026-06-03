---
name: python-testing-patterns
description: Write robust Python tests for data pipeline scripts — NVF validators, silver parsers, and scraping utilities in the Vishwa-Vani project.
---

# Python Testing Patterns

**Goal:** Every Python script in `scripts/` has full test coverage with `pytest`.

## Scope
- NVF 1.0 JSON validators (`validate_silver.py`, `audit_gold.py`)
- Scraping scripts in `scripts/scraping/`
- Bronze→Silver parsers and transformers
- Any Python utility used in the data pipeline

## Test File Convention
- Mirror the source path: `scripts/foo.py` → `tests/test_foo.py`
- Use `pytest` (not `unittest`)
- Use `pytest-mock` for external dependencies (HTTP, filesystem)

## Core Patterns

### 1. NVF Schema Validation Tests
\`\`\`python
import pytest, json
from scripts.validate_silver import validate_nvf_record

VALID_RECORD = {
    "id": "bg-1-1", "chapter": 1, "verse": 1,
    "original": "धृतराष्ट्र उवाच...", "transliteration": "dhrtarastra uvaca...",
    "meaning": "Dhritarashtra said...",
    "layers": [{"author": "shankara", "lang": "en", "type": "commentary", "content": "..."}]
}

def test_valid_record_passes():
    assert validate_nvf_record(VALID_RECORD) is True

def test_missing_original_fails():
    bad = {**VALID_RECORD, "original": ""}
    with pytest.raises(ValueError, match="original"):
        validate_nvf_record(bad)

def test_layer_content_too_short_fails():
    bad = {**VALID_RECORD, "layers": [{"author": "x", "lang": "en", "content": "short"}]}
    with pytest.raises(ValueError, match="80 chars"):
        validate_nvf_record(bad)
\`\`\`

### 2. Scraping Script Tests (Mock HTTP)
\`\`\`python
from unittest.mock import patch, MagicMock
from scripts.scraping.fetch_gita import fetch_verse

def test_fetch_verse_returns_text(mock_response):
    with patch("scripts.scraping.fetch_gita.requests.get") as mock_get:
        mock_get.return_value = MagicMock(status_code=200, text="<verse>...</verse>")
        result = fetch_verse(chapter=1, verse=1)
    assert result["original"] != ""
\`\`\`

### 3. Pipeline Fixture Pattern
\`\`\`python
@pytest.fixture
def sample_bronze_file(tmp_path):
    """Create a minimal bronze JSON fixture."""
    data = [{"adhyaya": 1, "shloka": 1, "text": "धृतराष्ट्र उवाच..."}]
    f = tmp_path / "adhyaya-1.json"
    f.write_text(json.dumps(data))
    return f
\`\`\`

## Quality Gates
- `pytest` must exit 0 before any pipeline script is considered complete
- Coverage target: 80% minimum, 95% goal for validators
- Run with: `pytest tests/ -v --tb=short`
