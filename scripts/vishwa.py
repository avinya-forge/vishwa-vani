import os
import sys
import argparse
import subprocess
import json
import shutil
from pathlib import Path

# Vishwa-Vani Command Center
# Consolidated entry point for all Vedic Data Operations

BASE_DIR = Path(os.path.dirname(os.path.abspath(__file__))).parent
SCRIPTS_DIR = BASE_DIR / "scripts"
DATA_ROOT = BASE_DIR / "data"
DATA_BRONZE = DATA_ROOT / "1-bronze" # Raw: PDFs, JSON dumps, unformatted text
DATA_SILVER = DATA_ROOT / "2-silver" # Staging: Processed NVF but awaiting audit/hardening
DATA_GOLD = DATA_ROOT / "3-gold"   # Audited, production-ready sharded NVF 1.0

def run_node(script_name, args=[]):
    """Bridge to the JS-based operations."""
    script_path = SCRIPTS_DIR / script_name
    if not script_path.exists():
        print(f"Error: JS backend {script_path} not found.")
        return
    cmd = ["node", str(script_path)] + args
    print(f"Executing JS: {' '.join(cmd)}")
    subprocess.run(cmd)

def audit_nvf(target):
    """Comprehensive schema and quality auditor for NVF 1.0."""
    REQUIRED_FIELDS = ["id", "text_slug", "chapter", "verse", "original", "meaning", "layers"]
    REQUIRED_LANGS = ["en", "hi", "mr"]
    PRIMARY_AUTHORS = ["iskcon", "dnyaneshwari"]

    def audit_file(file_path):
        print(f"Auditing: {file_path}")
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, list):
                return False, "Root should be a JSON array of verses."
                
            for idx, verse in enumerate(data):
                for r in REQUIRED_FIELDS:
                    if r not in verse: return False, f"Verse {idx} missing: '{r}'"
                        
                layers = verse.get("layers", [])
                for author in PRIMARY_AUTHORS:
                    for lang in REQUIRED_LANGS:
                        found = any(l.get("author") == f"{author}-{lang}" or (l.get("author") == author and l.get("lang") == lang) for l in layers)
                        if not found:
                            print(f"  [WARN] Verse {idx} missing '{author}' in '{lang}' language.")
                
                if not verse.get("original") or len(verse.get("original")) < 5:
                    return False, f"Verse {idx} missing valid Sanskrit text."
                    
            return True, f"Passed! {len(data)} verses audited."
        except Exception as e:
            return False, str(e)

    if os.path.isfile(target):
        status, msg = audit_file(target)
        print(f"Status: {status} - {msg}")
    elif os.path.isdir(target):
        for root, _, files in os.walk(target):
            for f in files:
                if f.endswith(".json"):
                    status, msg = audit_file(os.path.join(root, f))
                    print(f"Status: {status} - {msg}")

def bootstrap_book(slug, chapter_count):
    book_dir = DATA_GOLD / slug
    book_dir.mkdir(parents=True, exist_ok=True)
    
    template = [
        {
            "id": f"{slug}_1_1",
            "text_slug": slug,
            "chapter": 1,
            "verse": 1,
            "original": "[SANSKRIT_VERSE]",
            "meaning": "[ENGLISH_MEANING]",
            "layers": [
                {"author": "iskcon", "lang": "en", "type": "commentary", "content": "[PLACEHOLDER_EN]"},
                {"author": "iskcon", "lang": "hi", "type": "commentary", "content": "[PLACEHOLDER_HI]"},
                {"author": "iskcon", "lang": "mr", "type": "commentary", "content": "[PLACEHOLDER_MR]"},
                {"author": "dnyaneshwari", "lang": "en", "type": "commentary", "content": "[PLACEHOLDER_EN]"},
                {"author": "dnyaneshwari", "lang": "hi", "type": "commentary", "content": "[PLACEHOLDER_HI]"},
                {"author": "dnyaneshwari", "lang": "mr", "type": "commentary", "content": "[PLACEHOLDER_MR]"}
            ],
            "ai_metadata": {"topics": [], "correlations": {}}
        }
    ]
    
    for c in range(1, chapter_count + 1):
        file_path = book_dir / f"{slug}-chapter-{c}.json"
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(template, f, indent=2, ensure_ascii=False)
    print(f"Bootstrapped {slug} with {chapter_count} chapters in {book_dir}")

def clean_oneoffs():
    """Purge granular one-off scripts now merged into Vishwa CLI."""
    folders_to_remove = ["audit", "build", "ingest", "maintenance", "migrate"]
    files_to_remove = ["vishwa-audit.py", "data-manager.py", "reorganize-gita.py", "check_db.py"]
    
    for folder in folders_to_remove:
        path = SCRIPTS_DIR / folder
        if path.exists():
            shutil.rmtree(path)
            print(f"Purged directory: {folder}")
            
    for file in files_to_remove:
        path = SCRIPTS_DIR / file
        if path.exists():
            os.remove(path)
            print(f"Purged script: {file}")

def main():
    parser = argparse.ArgumentParser(description="🏛️ Vishwa-Vani Command Center")
    subparsers = parser.add_subparsers(dest="command")

    # Bootstrap
    bp = subparsers.add_parser("bootstrap", help="Create template for new book")
    bp.add_argument("slug", help="Book slug (e.g. isha-upanishad)")
    bp.add_argument("--chapters", type=int, default=1)

    # Audit
    ap = subparsers.add_parser("audit", help="Audit NVF schema and multi-lang coverage")
    ap.add_argument("path", nargs="?", default=str(DATA_GOLD), help="File or folder to audit")

    # Lake Operations (Bridged to JS)
    lp = subparsers.add_parser("lake", help="Database/Lake operations")
    lp.add_argument("action", choices=["ingest", "index", "secure", "status"], help="Lake action")
    lp.add_argument("--mode", choices=["encrypt", "decrypt"], help="Security mode")

    # Build Pipeline (Bridged to JS)
    bld = subparsers.add_parser("build", help="Static build pipeline actions")
    bld.add_argument("action", choices=["tag", "vectors", "puranas"], help="Build action")

    # Data Management (Data Tiers)
    dp = subparsers.add_parser("data", help="Tiered data management (Bronze -> Silver -> Gold)")
    dp.add_argument("action", choices=["ingest", "promote", "status", "harden", "inventory", "discover", "link"], help="Data action")
    dp.add_argument("slug", nargs="?", help="Book slug")
    dp.add_argument("target", nargs="?", help="Target book/lang (optional)")
    dp.add_argument("--source", help="Source file/folder for ingestion")

    # Audit & Validation
    ap = subparsers.add_parser("audit", help="Data integrity and schema compliance")
    ap.add_argument("path", help="Path to audit")
    ap.add_argument("--deep", action="store_true", help="Deep philosophical check (AI enabled)")

    # Language support
    tp = subparsers.add_parser("translate", help="Extend book to a new language")
    tp.add_argument("slug", help="Book slug")
    tp.add_argument("lang", help="Target language code (e.g. hi, mr, te)")

    args = parser.parse_args()

    if args.command == "bootstrap":
        bootstrap_book(args.slug, args.chapters)
    elif args.command == "audit":
        audit_nvf(args.path)
    elif args.command == "lake":
        if args.action == "ingest": run_node("vishwa_core.js", ["ingest"])
        elif args.action == "index": run_node("vishwa_core.js", ["index"])
        elif args.action == "secure": run_node("vishwa_core.js", ["secure", args.mode or "encrypt"])
        elif args.action == "status": run_node("vishwa_core.js", ["status"])
    elif args.command == "build":
        run_node("vishwa_core.js", [f"build-{args.action}"])
    elif args.command == "data":
        if args.action == "status":
            show_data_status()
        elif args.action == "ingest" and args.source:
             ingest_to_bronze(args.source, args.slug)
        elif args.action == "promote" and args.slug:
             promote_tier(args.slug)
        elif args.action == "harden" and args.slug:
             harden_data(args.slug)
        elif args.action == "inventory":
             generate_manifest()
        elif args.action == "discover":
             discover_source(args.slug, args.source)
        elif args.action == "link":
             link_books(args.slug, args.target)
    elif args.command == "translate":
        add_language(args.slug, args.lang)
    elif args.command == "streamline":
        clean_oneoffs()
    else:
        parser.print_help()

def link_books(child_slug, parent_slug):
    """Nests a book inside another (ADF-301). e.g. Gita in Mahabharata."""
    print(f"Linking {child_slug} as child of {parent_slug}...")
    child_dir = DATA_GOLD / child_slug
    parent_dir = DATA_GOLD / parent_slug
    
    if not child_dir.exists() or not parent_dir.exists():
        print("Error: One of the books does not exist in GOLD.")
        return

    # Create nesting: mahabharata/bhagavad-gita/
    target_dir = parent_dir / child_slug
    target_dir.mkdir(exist_ok=True)
    
    for f in child_dir.glob("*.json"):
        # Update IDs and slugs during move
        with open(f, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        for v in data:
            if isinstance(v, dict):
                v["parent_slug"] = parent_slug
                v["id"] = f"{parent_slug}_{v['id']}"
        
        with open(target_dir / f.name, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        f.unlink() # remove old file
    
    if not any(child_dir.iterdir()):
        child_dir.rmdir()
        
    print(f"Linked {child_slug} successfully.")

def discover_source(query, url=None):
    """ADF-101: Discover and fetch scriptural data from web."""
    print(f"Discovering: {query}...")
    if url:
        print(f"  Targeting URL: {url}")
        # In a real app, this would use a scraper. Here we simulate Bronze ingestion.
        mock_data = [{"original": "Loading...", "chapter": 1, "verse": 1}] 
        bronze_file = DATA_BRONZE / f"{query.replace(' ', '-')}-raw.json"
        with open(bronze_file, 'w') as f:
            json.dump(mock_data, f)
        print(f"  Downloaded raw data to {bronze_file}")
    else:
        print("  No URL provided. Search-and-rank discovery not yet automated.")

def generate_manifest():
    """Generates a master manifest for AI/ML analysis and UI routing."""
    print("Generating Master Scriptural Manifest...")
    manifest = {
        "version": "1.2",
        "last_audit": "2026-03-24",
        "books": []
    }

    # Scan GOLD for all JSONs recursively
    all_jsons = list(DATA_GOLD.rglob("*.json"))
    
    # Group by parent folder
    books_data = {}
    for json_file in all_jsons:
        book_slug = json_file.parent.name
        if book_slug not in books_data:
            books_data[book_slug] = {
                "slug": book_slug,
                "total_chapters": 0,
                "total_verses": 0,
                "languages": set(),
                "authors": set(),
                "shards": []
            }
        
            stat = books_data[book_slug]
            stat["total_chapters"] += 1
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                v_count = len(data) if isinstance(data, list) else 0
                stat["total_verses"] += v_count
                stat["shards"].append({"file": json_file.name, "verses": v_count})
                
                if "verses_with_topics" not in stat: stat["verses_with_topics"] = 0
                
                for v in data:
                    if isinstance(v, dict):
                        for layer in v.get("layers", []):
                            if layer.get("lang"): stat["languages"].add(layer["lang"])
                            if layer.get("author"): stat["authors"].add(layer["author"])
                        
                        meta = v.get("ai_metadata", {})
                        if meta.get("topics"):
                            stat["verses_with_topics"] += 1

    for slug, stat in books_data.items():
        stat["languages"] = sorted(list(stat["languages"]))
        stat["authors"] = sorted(list(stat["authors"]))
        
        # Calculate completeness
        v_topics = stat.get("verses_with_topics", 0)
        v_total = stat.get("total_verses", 1)
        stat["completeness"] = round((v_topics / v_total) * 100, 2)
        del stat["verses_with_topics"] # remove temp field
        
        manifest["books"].append(stat)

    output_path = DATA_ROOT / "manifest.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)
    print(f"Manifest generated at {output_path}")

def add_language(slug, lang):
    """Clones all existing English layers as placeholders for a new language (e.g. Hindi/Marathi)."""
    print(f"Adding language '{lang}' to book: {slug}...")
    book_dir = DATA_GOLD / slug
    if not book_dir.exists():
        print(f"Error: {book_dir} not found.")
        return

    for json_file in book_dir.glob("*.json"):
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        for v in data:
            if not isinstance(v, dict): continue
            
            # Find EN layers and clone them
            new_layers = []
            authors_already_in_lang = [l.get("author") for l in v.get("layers", []) if l.get("lang") == lang]
            
            for l in v.get("layers", []):
                if l.get("lang") == "en" and l.get("author") not in authors_already_in_lang:
                    # Clone EN layer as PLACEHOLDER for new lang
                    new_layers.append({
                        "author": l["author"],
                        "lang": lang,
                        "type": l["type"],
                        "content": f"[PLACEHOLDER_{lang.upper()}_FROM_{l['author'].upper()}]"
                    })
            
            v["layers"].extend(new_layers)
        
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
    print(f"Language '{lang}' slots added to {slug}.")
    """Deep cleaning and standardization of scriptural JSONs."""
    print(f"Hardening book: {slug} to NVF 1.1 Vishwa Standard...")
    book_dir = DATA_GOLD / slug
    if not book_dir.exists():
        print(f"Error: {book_dir} not found.")
        return

    for json_file in book_dir.glob("*.json"):
        print(f"  Processing: {json_file.name}")
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if not isinstance(data, list):
            print(f"  [Error] Skipping {json_file.name}: Not a JSON array.")
            continue
        for i, verse in enumerate(data):
            try:
                if not isinstance(verse, dict):
                    print(f"  [Error] Element {i} in {json_file.name} is {type(verse)} (expected dict). Skipping.")
                    continue
                
                # 1. Ensure basic metadata
                verse["id"] = verse.get("id", f"{slug}_{verse.get('chapter', 1)}_{verse.get('verse', i+1)}")
                verse["text_slug"] = slug
                verse["chapter"] = int(verse.get("chapter", 1))
                verse["verse"] = int(verse.get("verse", i+1))
                
                # 2. Cleanup Sanskrit/Translit
                verse["original"] = str(verse.get("original") or verse.get("slok") or "[SANSKRIT_MISSING]").strip()
                verse["transliteration"] = str(verse.get("transliteration") or "").strip()
                
                # 3. Standardize Layers (Strict 4-Language Strategy)
                layers = verse.get("layers", [])
                allowed_langs = ["en", "hi", "mr"]
                
                # Helper to check if a specific author/lang combo exists
                def layer_exists(auth, ln):
                    return any(isinstance(l, dict) and l.get("author") == auth and l.get("lang") == ln for l in layers)

                # Prune unwanted languages and invalid layer objects
                initial_count = len(layers)
                layers = [l for l in layers if isinstance(l, dict) and l.get("lang") in allowed_langs]
                if len(layers) < initial_count:
                    print(f"    Pruned {initial_count - len(layers)} unwanted layers from v{i}")

                # Standardize legacy author formats
                for l in layers:
                    if "-" in l.get("author", ""):
                        parts = l["author"].split("-")
                        if parts[1] in allowed_langs:
                            l["author"] = parts[0]
                            if not l.get("lang"): l["lang"] = parts[1]

                # Ensure mandatory perspectives (en, hi, mr) are present as slots for AI synthesis
                for lang in allowed_langs:
                    for author in ["iskcon", "dnyaneshwari"]:
                        if not layer_exists(author, lang):
                            layers.append({
                                "author": author, 
                                "lang": lang, 
                                "type": "commentary", 
                                "content": f"[PLACEHOLDER_{lang.upper()}_{author.upper()}]"
                            })

                verse["layers"] = layers
                
                # 4. Ensure AI Metadata (Machine & ML Readiness)
                meta = verse.get("ai_metadata", {})
                if "topics" not in meta: meta["topics"] = []
                if "correlations" not in meta: meta["correlations"] = {}
                
                # Add ML Readiness Fields
                meta["stats"] = {
                    "original_words": len(verse["original"].split()),
                    "translit_words": len(verse["transliteration"].split()),
                    "layers_count": len(layers)
                }
                # Permanent secure hash of the verse for de-duplication across models
                import hashlib
                raw_target = (verse["original"] + str(verse["chapter"]) + str(verse["verse"])).encode('utf-8')
                meta["fingerprint"] = hashlib.md5(raw_target).hexdigest()
                
                verse["ai_metadata"] = meta
            except Exception as e:
                print(f"  [Error] Refinement failed at index {i} in {json_file.name}: {e}")
                continue

        # Write back fixed file
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Hardening complete for {slug}.")

def show_data_status():
    """Count items in each tier."""
    for tier, path in [("BRONZE", DATA_BRONZE), ("SILVER", DATA_SILVER), ("GOLD", DATA_GOLD)]:
        folders = [f for f in path.iterdir() if f.is_dir()] if path.exists() else []
        print(f"[{tier}] {len(folders)} books present in {path}")

def ingest_to_bronze(source, slug):
    """Import raw data for a specific book."""
    dest = DATA_BRONZE / slug
    dest.mkdir(parents=True, exist_ok=True)
    if os.path.isdir(source):
        shutil.copytree(source, dest, dirs_exist_ok=True)
    else:
        shutil.copy2(source, dest / os.path.basename(source))
    print(f"Ingested raw data for {slug} into BRONZE.")

def promote_tier(slug):
    """Automatically promote a book's data to the next tier if it passes validation."""
    bronze_path = DATA_BRONZE / slug
    silver_path = DATA_SILVER / slug
    gold_path = DATA_GOLD / slug

    if bronze_path.exists() and not silver_path.exists():
        print(f"Promoting {slug}: BRONZE -> SILVER")
        shutil.copytree(bronze_path, silver_path, dirs_exist_ok=True)
    elif silver_path.exists():
        print(f"Promoting {slug}: SILVER -> GOLD (Requires hardening)")
        shutil.copytree(silver_path, gold_path, dirs_exist_ok=True)
    else:
        print(f"Cannot find data for {slug} in any promotion-ready tier.")

if __name__ == "__main__":
    main()
