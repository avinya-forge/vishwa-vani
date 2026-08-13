import os
import json
import re

def create_snippet(text, keyword, window_size=50):
    if not text:
        return ""
    text = text.replace('\n', ' ')
    match = re.search(re.escape(keyword), text, re.IGNORECASE)
    if match:
        start = max(0, match.start() - window_size)
        end = min(len(text), match.end() + window_size)
        snippet = text[start:end].strip()
        if start > 0:
            snippet = "..." + snippet
        if end < len(text):
            snippet = snippet + "..."
        return snippet
    return text[:100] + "..." if len(text) > 100 else text

def main():
    tattvas_path = os.path.join("data", "ontology", "tattvas.json")
    gold_dir = os.path.join("data", "3-gold")

    with open(tattvas_path, "r", encoding="utf-8") as f:
        tattvas_data = json.load(f)

    tattvas = tattvas_data.get("tattvas", {})
    links_added = 0

    # Build search patterns for each tattva
    search_patterns = {}
    for t_id, t_data in tattvas.items():
        sanskrit_pattern = re.compile(r'\b' + re.escape(t_data["sanskritLabel"]) + r'\b', re.IGNORECASE) if t_data.get("sanskritLabel") else None

        synonyms = t_data.get("synonyms", []).copy()
        if t_data.get("label"):
            synonyms.append(t_data["label"])

        # English patterns, match words
        en_patterns = []
        for syn in synonyms:
            en_patterns.append(re.compile(r'\b' + re.escape(syn) + r'\b', re.IGNORECASE))

        search_patterns[t_id] = {
            "sanskrit": sanskrit_pattern,
            "english": en_patterns
        }

    # Iterate over all gold json files
    for root, _, files in os.walk(gold_dir):
        for file in files:
            if file.endswith(".json"):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        data = json.load(f)
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")
                    continue

                if isinstance(data, dict):
                    # For cases like book.meta.json
                    continue

                verses = data

                for verse in verses:
                    if not isinstance(verse, dict):
                        continue

                    verse_id = verse.get("id")
                    text_slug = verse.get("text_slug")

                    if not text_slug:
                        # Some files like gita-dhyana-shlokas.json don't have text_slug inside the verse,
                        # try to deduce from the directory or just skip.
                        parent_dir = os.path.basename(root)
                        text_slug = parent_dir

                    chapter = verse.get("chapter")
                    if chapter is None:
                        # fallback chapter 1 for stotras without chapters
                        chapter = 1

                    verse_num = verse.get("verse")
                    original = verse.get("original", "")
                    translation = verse.get("translation", "")
                    meaning = verse.get("meaning", "")

                    if verse_num is None:
                        continue

                    combined_en = translation + " " + meaning

                    for t_id, patterns in search_patterns.items():
                        tattva = tattvas[t_id]

                        # Check if already in primary sources or cross references
                        existing = False
                        for src in tattva.get("primarySources", []):
                            if src.get("textSlug") == text_slug and src.get("chapter") == chapter and src.get("verse") == verse_num:
                                existing = True
                                break
                        if existing:
                            continue

                        for ref in tattva.get("crossReferences", []):
                            target = ref.get("target", {})
                            if target.get("textSlug") == text_slug and target.get("chapter") == chapter and target.get("verse") == verse_num:
                                existing = True
                                break
                        if existing:
                            continue

                        # Check for matches
                        matched = False
                        preview = ""

                        if patterns["sanskrit"] and patterns["sanskrit"].search(original):
                            matched = True
                            preview = create_snippet(original, tattva["sanskritLabel"])

                        if not matched:
                            for p, syn in zip(patterns["english"], tattva.get("synonyms", []) + [tattva.get("label")]):
                                if p.search(combined_en):
                                    matched = True
                                    preview = create_snippet(translation if p.search(translation) else meaning, syn)
                                    break

                        if matched:
                            if "crossReferences" not in tattva:
                                tattva["crossReferences"] = []

                            new_ref = {
                                "target": {
                                    "textSlug": text_slug,
                                    "chapter": chapter,
                                    "verse": verse_num,
                                    "preview": preview,
                                    "relevance": 0.8
                                },
                                "relationshipType": "references",
                                "rationale": f"Automated keyword match for Tattva: {tattva.get('label')}"
                            }
                            tattva["crossReferences"].append(new_ref)
                            links_added += 1

    if links_added > 0:
        with open(tattvas_path, "w", encoding="utf-8") as f:
            json.dump(tattvas_data, f, indent=2, ensure_ascii=False)
        print(f"Successfully added {links_added} semantic links.")
    else:
        print("No new semantic links found.")

if __name__ == "__main__":
    main()
