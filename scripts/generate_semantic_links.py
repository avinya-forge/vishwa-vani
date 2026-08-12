import json
import os
import glob
import re

def main():
    tattvas_file = "data/ontology/tattvas.json"

    with open(tattvas_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    tattvas = data.get("tattvas", {})

    # We will search the gold tier
    gold_dir = "data/3-gold"

    json_files = glob.glob(f"{gold_dir}/**/*.json", recursive=True)

    for tattva_id, tattva_data in tattvas.items():
        label = tattva_data.get("label", "").lower()
        synonyms = [s.lower() for s in tattva_data.get("synonyms", [])]
        search_terms = [label] + synonyms

        # Avoid empty strings
        search_terms = [term for term in search_terms if term]

        # Build regex for word boundary matching
        if not search_terms:
            continue

        # Create regex pattern for all terms
        pattern = re.compile(r'\b(' + '|'.join(map(re.escape, search_terms)) + r')\b', re.IGNORECASE)

        primary_sources = tattva_data.get("primarySources", [])
        cross_references = tattva_data.get("crossReferences", [])

        existing_targets = set()

        for source in primary_sources:
            existing_targets.add((source.get("textSlug"), source.get("chapter"), source.get("verse")))

        for ref in cross_references:
            target = ref.get("target", {})
            existing_targets.add((target.get("textSlug"), target.get("chapter"), target.get("verse")))

        for json_path in json_files:
            with open(json_path, "r", encoding="utf-8") as f:
                try:
                    book_data = json.load(f)
                except json.JSONDecodeError:
                    continue

            verses = []
            if isinstance(book_data, list):
                verses = book_data
            elif isinstance(book_data, dict):
                # could be wrapped
                if "verses" in book_data:
                    verses = book_data["verses"]
                else:
                    # just a dictionary? Let's assume list of verses if the file format is known
                    continue

            for verse_obj in verses:
                verse_text = verse_obj.get("original", "")
                translation = verse_obj.get("translation", "")

                # Check layers for english text
                layers = verse_obj.get("layers", [])
                english_text = ""
                for layer in layers:
                    if layer.get("lang") == "en":
                        english_text += layer.get("text", "") + " "

                combined_text = verse_text + " " + translation + " " + english_text

                # Check if it matches
                match = pattern.search(combined_text)
                if match:
                    # Found a match
                    book_id = verse_obj.get("book", "")
                    # Derive book id from path if missing
                    if not book_id:
                        # e.g., data/3-gold/bhagavad-gita/bhagavad-gita-chapter-1.json -> bhagavad-gita
                        parts = json_path.split(os.sep)
                        if len(parts) >= 3:
                            book_id = parts[2]

                    chapter = verse_obj.get("chapter")
                    verse_num = verse_obj.get("verse")

                    if book_id and chapter is not None and verse_num is not None:
                        # Ensure verse_num is integer or int-compatible
                        try:
                            verse_num = int(verse_num)
                            chapter = int(chapter)
                        except ValueError:
                            pass

                        # Avoid duplicates
                        if (book_id, chapter, verse_num) not in existing_targets:
                            # Add to cross references
                            preview_text = translation if translation else english_text.strip()
                            if len(preview_text) > 100:
                                preview_text = preview_text[:97] + "..."

                            new_ref = {
                                "target": {
                                    "textSlug": book_id,
                                    "chapter": chapter,
                                    "verse": verse_num,
                                    "preview": preview_text,
                                    "relevance": 0.8
                                },
                                "relationshipType": "references",
                                "rationale": "Auto-indexed based on keyword match."
                            }
                            cross_references.append(new_ref)
                            existing_targets.add((book_id, chapter, verse_num))

        # Update the tattva data
        tattvas[tattva_id]["crossReferences"] = cross_references

    data["tattvas"] = tattvas

    with open(tattvas_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully updated {tattvas_file} with semantic links.")

if __name__ == "__main__":
    main()
