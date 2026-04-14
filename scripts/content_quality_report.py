import os
import json
import sqlite3
from pathlib import Path

# Vishwa-Vani: Content Quality Reporter
# Fulfills task CONT-010

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
GOLD_DIR = DATA_DIR / "3-gold"
MANIFEST_PATH = DATA_DIR / "manifest.json"
REPORT_PATH = BASE_DIR / "docs" / "content-quality-report.md"

def load_manifest():
    if not MANIFEST_PATH.exists():
        print(f"Error: Manifest not found at {MANIFEST_PATH}")
        return None
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def check_json_shard(book_slug, shard_file):
    shard_path = GOLD_DIR / book_slug / shard_file
    if not shard_path.exists():
        # Try relative to GOLD_DIR if book_slug is part of it
        shard_path = GOLD_DIR / shard_file 
        if not shard_path.exists():
            return {"exists": False, "error": f"Missing: {shard_file}"}

    try:
        with open(shard_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if not isinstance(data, list):
            return {"exists": True, "error": "Not a JSON array"}

        stats = {
            "exists": True,
            "verse_count": len(data),
            "with_original": 0,
            "with_transliteration": 0,
            "langs": {"en": 0, "hi": 0, "mr": 0},
            "quality_commentaries": 0, # > 80 chars
            "total_layers": 0
        }

        for verse in data:
            if verse.get("original"): stats["with_original"] += 1
            if verse.get("transliteration"): stats["with_transliteration"] += 1
            
            layers = verse.get("layers", [])
            stats["total_layers"] += len(layers)
            for layer in layers:
                lang = layer.get("lang")
                if lang in stats["langs"]:
                    stats["langs"][lang] += 1
                
                content = layer.get("content", "")
                if isinstance(content, str) and len(content) >= 80:
                    stats["quality_commentaries"] += 1

        return stats
    except Exception as e:
        return {"exists": True, "error": f"Parse Error: {str(e)}"}

def generate_report():
    manifest = load_manifest()
    if not manifest:
        return

    report = [
        "# 📊 Vishwa-Vani: Content Quality Report",
        f"Generated on: {Path(os.curdir).absolute()}",
        "",
        "| Book | Status | Verses | Shards | EN Coverage | HI Coverage | MR Coverage | Quality % |",
        "|------|--------|--------|--------|-------------|-------------|-------------|-----------|",
    ]

    for book in manifest.get("books", []):
        book_id = book.get("book_id")
        status = book.get("status", "UNKNOWN")
        total_verses = 0
        total_shards = 0
        missing_shards = 0
        en_count = 0
        hi_count = 0
        mr_count = 0
        quality_count = 0
        total_layers = 0

        shards = book.get("shards") or book.get("chapters", [])
        for shard in shards:
            total_shards += 1
            shard_file = shard.get("file")
            res = check_json_shard(book_id, shard_file)
            
            if not res["exists"]:
                missing_shards += 1
                continue
            
            if "error" in res:
                continue
            
            total_verses += res["verse_count"]
            en_count += res["langs"]["en"]
            hi_count += res["langs"]["hi"]
            mr_count += res["langs"]["mr"]
            quality_count += res["quality_commentaries"]
            total_layers += res["total_layers"]

        # Calculate Percentages
        en_pct = f"{(en_count / total_verses * 100):.1f}%" if total_verses > 0 else "0%"
        hi_pct = f"{(hi_count / total_verses * 100):.1f}%" if total_verses > 0 else "0%"
        mr_pct = f"{(mr_count / total_verses * 100):.1f}%" if total_verses > 0 else "0%"
        quality_pct = f"{(quality_count / total_layers * 100):.1f}%" if total_layers > 0 else "0%"

        book_status = status
        if missing_shards > 0:
            book_status = f"⚠️ {status} ({missing_shards} missing)"

        report.append(f"| {book_id} | {book_status} | {total_verses} | {total_shards} | {en_pct} | {hi_pct} | {mr_pct} | {quality_pct} |")

    report.append("\n## 🔍 Deep Audit Findings")
    for book in manifest.get("books", []):
        book_id = book.get("book_id")
        report.append(f"\n### {book_id}")
        shards = book.get("shards") or book.get("chapters", [])
        for shard in shards:
            shard_file = shard.get("file")
            res = check_json_shard(book_id, shard_file)
            if not res["exists"]:
                report.append(f"- ❌ **{shard_file}**: Missing file")
            elif "error" in res:
                report.append(f"- ⚠️ **{shard_file}**: {res['error']}")

    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        f.write("\n".join(report))
    
    print(f"Quality report generated at {REPORT_PATH}")

if __name__ == "__main__":
    generate_report()
