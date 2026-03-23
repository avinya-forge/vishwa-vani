
import os
import json
import argparse
from pathlib import Path

# Base configuration
BASE_DIR = Path(os.path.dirname(os.path.abspath(__file__))).parent
DATA_DIR = BASE_DIR / "data"

def run_audit(book="bhagavad_gita", authors=["sankar", "rams", "siva"]):
    """Audits the given book for missing or placeholder data for key authors."""
    print(f"Auditing {book} for authors: {authors}...")
    
    report = []
    # Identify files for this book
    # For Gita, it's bhagavad_gita_chapter_*.json
    # Assume 18 chapters for Gita
    if book == "bhagavad_gita":
        chapters = range(1, 19)
        file_pattern = "bhagavad_gita_chapter_{}.json"
    else:
        # Generic book audit (TBD)
        print("Generic audit not yet implemented. Use bhagavad_gita.")
        return

    for ch in chapters:
        filename = file_pattern.format(ch)
        filepath = DATA_DIR / filename
        
        if not filepath.exists():
            report.append(f"Chapter {ch}: MISSING FILE ({filename})")
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        num_verses = len(data)
        report.append(f"--- Chapter {ch} ({num_verses} verses) ---")
        
        for verse_data in data:
            v_id = verse_data.get('id')
            layers = verse_data.get('layers', [])
            authors_present = set([l.get('author') for l in layers])
            
            missing = [a for a in authors if a not in authors_present]
            
            # Check for placeholders
            placeholders = []
            for l in layers:
                content = l.get('content', '')
                if any(x in content for x in ["[Placeholder", "did not comment", "No such translation"]):
                    placeholders.append(l.get('author'))
            
            if missing or placeholders:
                report.append(f"Verse {v_id}: Missing {missing}, Placeholders {placeholders}")

    report_path = BASE_DIR / f"audit_report_{book}.txt"
    with open(report_path, "w", encoding='utf-8') as f:
        f.write("\n".join(report))
    print(f"Audit complete. Report saved to {report_path}")

def run_refine(book="bhagavad_gita", primary_authors=["sankar", "rams", "siva"]):
    """Refines the book data: cleans placeholders, filters to primary authors, and standardizes structure."""
    print(f"Refining {book} data to target primary authors: {primary_authors}...")
    
    output_temp_dir = BASE_DIR / "data_refined_temp"
    if not output_temp_dir.exists():
        os.makedirs(output_temp_dir)

    if book == "bhagavad_gita":
        chapters = range(1, 19)
        file_pattern = "bhagavad_gita_chapter_{}.json"
    else:
        print("Generic refinement not yet implemented.")
        return

    for ch in chapters:
        filename = file_pattern.format(ch)
        filepath = DATA_DIR / filename
        
        if not filepath.exists():
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        refined_data = []
        
        for verse_data in data:
            new_v = {
                "id": verse_data.get("id"),
                "text_slug": verse_data.get("text_slug"),
                "chapter": verse_data.get("chapter"),
                "verse": verse_data.get("verse"),
                "original": verse_data.get("original"),
                "transliteration": verse_data.get("transliteration"),
            }
            
            layers = verse_data.get("layers", [])
            
            # Identify high-quality translation
            meaning_layer = next((l for l in layers if l.get("author") == "siva" and l.get("type") == "translation"), None)
            if not meaning_layer:
                 meaning_layer = next((l for l in layers if l.get("author") in ["gambir", "rams"] and l.get("type") == "translation"), None)
            
            if meaning_layer:
                new_v["meaning"] = meaning_layer.get("content")
                
            selected_layers = []
            
            # Selection Logic (Top 2 Indian Commentaries)
            # 1. Shankara (if real)
            sankar_comm = next((l for l in layers if l.get("author") == "sankar"), None)
            is_sankar_valid = sankar_comm and not any(x in sankar_comm.get("content", "") for x in ["did not comment", "No such translation"])
            
            # 2. Ramsukhdas (Modern Standard)
            rams_comm = next((l for l in layers if l.get("author") == "rams"), None)
            
            # 3. Sivananda (Fallback English)
            siva_comm = next((l for l in layers if l.get("author") == "siva"), None)

            if is_sankar_valid:
                selected_layers.append(sankar_comm)
                if rams_comm: selected_layers.append(rams_comm)
            else:
                if siva_comm: selected_layers.append(siva_comm)
                if rams_comm: selected_layers.append(rams_comm)
            
            new_v["layers"] = selected_layers
            new_v["ai_metadata"] = verse_data.get("ai_metadata", {})
            refined_data.append(new_v)
            
        output_path = output_temp_dir / filename
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(refined_data, f, ensure_ascii=False, indent=2)

    print(f"Refinement complete. Refined files in {output_temp_dir}")
    print("Run with --apply to overwrite production data.")

def main():
    parser = argparse.ArgumentParser(description="Vishwa-Vani Data Management Tool")
    parser.add_argument("command", choices=["audit", "refine"], help="Action to perform")
    parser.add_argument("--book", default="bhagavad_gita", help="Book to target (e.g. bhagavad_gita)")
    parser.add_argument("--apply", action="store_true", help="Apply refined data to production directory")
    
    args = parser.parse_args()
    
    if args.command == "audit":
        run_audit(book=args.book)
    elif args.command == "refine":
        run_refine(book=args.book)
        if args.apply:
            # Code to copy temp to production
            src = BASE_DIR / "data_refined_temp"
            for filename in os.listdir(src):
                if filename.endswith(".json"):
                    os.replace(src / filename, DATA_DIR / filename)
            print("Production data updated.")

if __name__ == "__main__":
    main()
