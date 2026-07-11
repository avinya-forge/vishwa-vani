import json
import os
import re

# Comprehensive Target Mapping
# Based on canonical sources and project scope
TARGETS = {
    'bhagavad-gita': {
        'chapters': 18,
        'verses': 700,
        'authors': 10, # Tilak, Aurobindo, Bhave, Ramanuja, Madhva, Abhinavagupta, Savarkar, Gita Press, Shankara, Dnyaneshwar
        'langs': ['sa', 'en', 'hi', 'mr']
    },
    'bhagavata-purana': {
        'chapters': 19, # Canto 1 only for now
        'verses': 718,
        'authors': 2, # Vyasa, Prabhupada
        'langs': ['sa', 'en', 'hi', 'mr']
    },
    'isha-upanishad': {
        'chapters': 1,
        'verses': 19,
        'authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr']
    },
    'kena-upanishad': {
        'chapters': 1,
        'verses': 34,
        'authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr']
    },
    'mahabharata': {
        'chapters': 18, # Parvas
        'verses': 100000,
        'authors': 2, # KMG, Nilakantha
        'langs': ['sa', 'en']
    },
    'yoga-sutras': {
        'chapters': 4, # Padas
        'verses': 196,
        'authors': 2, # Patanjali, Vivekananda
        'langs': ['sa', 'en', 'hi', 'mr']
    },
    'vishnu-purana': {
        'chapters': 6, # Amshas
        'verses': 7000,
        'authors': 2,
        'langs': ['sa', 'en']
    },
    'garuda-purana': {
        'chapters': 2,
        'verses': 19000,
        'authors': 2,
        'langs': ['sa', 'en']
    },
    'samskaras': {
        'chapters': 1,
        'verses': 16,
        'authors': 1,
        'langs': ['sa', 'hi', 'mr']
    },
    'stotras': {
        'chapters': 1,
        'verses': 70,
        'authors': 1,
        'langs': ['sa', 'en', 'hi', 'mr']
    },
    'rigveda': {'chapters': 10, 'verses': 10552, 'authors': 1, 'langs': ['sa', 'en']},
    'brahma-sutras': {'chapters': 4, 'verses': 555, 'authors': 2, 'langs': ['sa', 'en']},
    'manusmriti': {'chapters': 12, 'verses': 2684, 'authors': 1, 'langs': ['sa', 'en']},
    'dasbodh': {'chapters': 20, 'verses': 7751, 'authors': 1, 'langs': ['sa', 'mr']},
    'samaveda': {'chapters': 2, 'verses': 1875, 'authors': 1, 'langs': ['sa', 'en']},
    'yajurveda': {'chapters': 40, 'verses': 1975, 'authors': 1, 'langs': ['sa', 'en']},
    'atharvaveda': {'chapters': 20, 'verses': 5977, 'authors': 1, 'langs': ['sa', 'en']},
}

def analyze_json_layers(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)

        verses = data if isinstance(data, list) else data.get('verses', [])
        if not verses: return set(), set(), 0

        langs = set()
        authors = set()

        for v in verses:
            if v.get('original'): langs.add('sa')
            if v.get('translation'): langs.add('en')

            layers = v.get('layers', [])
            for l in layers:
                if l.get('lang'): langs.add(l.get('lang'))
                if l.get('author'): authors.add(l.get('author'))

        return langs, authors, len(verses)
    except:
        return set(), set(), 0

def run():
    if not os.path.exists('data/manifest.json'):
        print("Manifest missing")
        return

    with open('data/manifest.json', 'r') as f:
        manifest = json.load(f)

    with open('lib/texts.ts', 'r') as f:
        lib_content = f.read()

    # Extract all books from registry
    books_raw = re.findall(r'slug: \'(.*?)\',.*?name: \'(.*?)\',.*?available: (true|false),.*?totalChapters: (\d+)', lib_content, re.DOTALL)

    tracker = []

    for slug, name, available_str, total_ch_str in books_raw:
        target = TARGETS.get(slug, {'verses': 100, 'authors': 1, 'chapters': 1, 'langs': ['sa', 'en']})

        actual_verses = 0
        actual_authors = set()
        actual_langs = set()
        actual_chapters = 0
        stage = 'NOT_STARTED'

        # Priority: GOLD > SILVER
        found_in_gold = False
        gold_path = f'data/3-gold/{slug}'
        if os.path.exists(gold_path):
            found_in_gold = True
            stage = 'GOLD'
            # For Mahabharata, we need to be careful with parvas
            if slug == 'mahabharata':
                # Parva 3 is in Gold
                parva3_path = 'data/3-gold/mahabharata/parva-3'
                if os.path.exists(parva3_path):
                    for root, _, files in os.walk(parva3_path):
                        for f in files:
                            if f.endswith('.json') and f != 'book.meta.json':
                                langs, authors, v_count = analyze_json_layers(os.path.join(root, f))
                                actual_langs.update(langs)
                                actual_authors.update(authors)
                                actual_verses += v_count
                actual_chapters = 1 # Just Parva 3
            else:
                for root, _, files in os.walk(gold_path):
                    for f in files:
                        if f.endswith('.json') and f != 'book.meta.json':
                            langs, authors, v_count = analyze_json_layers(os.path.join(root, f))
                            actual_langs.update(langs)
                            actual_authors.update(authors)
                            actual_verses += v_count
                            actual_chapters += 1

        # Check Silver if not complete in Gold
        silver_path = f'data/2-silver/{slug}'
        if os.path.exists(silver_path):
            if stage == 'NOT_STARTED': stage = 'SILVER'

            # For Mahabharata, Parva 1 is in Silver
            if slug == 'mahabharata':
                parva1_path = 'data/2-silver/mahabharata/parva-1'
                if os.path.exists(parva1_path):
                    actual_chapters += 1 # Parva 1
                    for root, _, files in os.walk(parva1_path):
                        for f in files:
                            if f.endswith('.json') and f != 'book.meta.json':
                                langs, authors, v_count = analyze_json_layers(os.path.join(root, f))
                                actual_langs.update(langs)
                                actual_authors.update(authors)
                                actual_verses += v_count
            else:
                # Normal books, avoid double counting if already in Gold
                if not found_in_gold:
                    for root, _, files in os.walk(silver_path):
                        for f in files:
                            if f.endswith('.json') and f != 'book.meta.json':
                                langs, authors, v_count = analyze_json_layers(os.path.join(root, f))
                                actual_langs.update(langs)
                                actual_authors.update(authors)
                                actual_verses += v_count
                                actual_chapters += 1

        # Check Bronze for 'Started'
        if stage == 'NOT_STARTED':
            if os.path.exists(f'data/1-bronze/{slug}') or os.path.exists(f'data/1-bronze/mahabharata-adi-parva-mapping.tsv'): # MBH special
                stage = 'BRONZE/INGESTING'

        # Filter target languages
        display_langs = {l for l in actual_langs if l in ['sa', 'en', 'hi', 'mr']}

        # Scores
        v_score = min(actual_verses / target['verses'], 1.0) if target['verses'] > 0 else 0
        a_score = min(len(actual_authors) / target['authors'], 1.0) if target['authors'] > 0 else 0
        l_score = (len(display_langs) / len(target['langs'])) if target['langs'] else 0
        c_score = min(actual_chapters / target['chapters'], 1.0) if target['chapters'] > 0 else 0
        ui_score = 1.0 if available_str == 'true' else 0.0

        # Composite Weightage
        composite = (v_score * 0.3 + c_score * 0.2 + l_score * 0.2 + a_score * 0.2 + ui_score * 0.1) * 100
        composite = min(round(composite, 2), 100.0)

        tracker.append({
            'name': name,
            'slug': slug,
            'stage': stage,
            'ui': 'READY' if available_str == 'true' else 'HIDDEN',
            'verses': f"{actual_verses}/{target['verses']}",
            'chapters': f"{actual_chapters}/{target['chapters']}",
            'langs_list': list(display_langs),
            'target_langs': target['langs'],
            'authors_list': list(actual_authors),
            'target_authors_count': target['authors'],
            'score': composite
        })

    tracker.sort(key=lambda x: x['score'], reverse=True)

    # Generate Markdown
    lines = [
        '# 🛰️ Vishwa-Vani: Unified Library Tracker',
        '',
        'This tracker provides a multi-dimensional view of library readiness, factoring in structural completeness (chapters/verses), linguistic coverage (languages), scholarly depth (authors), and UI integration (availability).',
        '',
        '## 📊 Library Readiness Summary',
        '',
        '| Book Name | Stage | UI | Score (%) | Chapters | Verses | Langs | Authors |',
        '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |'
    ]

    for b in tracker:
        langs_summary = f"{len(b['langs_list'])}/{len(b['target_langs'])}"
        authors_summary = f"{len(b['authors_list'])}/{b['target_authors_count']}"
        lines.append(f"| {b['name']} | {b['stage']} | {b['ui']} | **{b['score']}%** | {b['chapters']} | {b['verses']} | {langs_summary} | {authors_summary} |")

    lines.append('\n## 🔍 Granular Book Details\n')

    for b in tracker:
        lines.append(f"### {b['name']} (`{b['slug']}`) ")
        lines.append(f"- **Readiness Score:** {b['score']}%")
        lines.append(f"- **Pipeline Stage:** {b['stage']}")
        lines.append(f"- **UI Integration:** {b['ui']}")
        lines.append(f"- **Structural Progress:**")
        lines.append(f"  - Chapters: {b['chapters']}")
        lines.append(f"  - Verses: {b['verses']}")
        lines.append(f"- **Linguistic Coverage:**")
        lines.append(f"  - Actual: {', '.join(b['langs_list']) or 'None'}")
        lines.append(f"  - Target: {', '.join(b['target_langs'])}")
        lines.append(f"- **Scholarly Depth:**")
        lines.append(f"  - Authors Present: {', '.join(b['authors_list']) or 'None'}")
        lines.append(f"  - Target Author Count: {b['target_authors_count']}")
        lines.append("")

    lines.append('---')
    lines.append('**Scoring Formula:** `30% Verses + 20% Chapters + 20% Languages + 20% Authors + 10% UI Readiness`')
    lines.append('')
    lines.append('*Last Updated: 2026-07-06*')

    with open('docs/library_tracker.md', 'w') as f:
        f.write("\n".join(lines))

    with open('docs/library_tracker.json', 'w') as f:
        json.dump(tracker, f, indent=2)

    print("Tracker generated at docs/library_tracker.md and .json")

if __name__ == '__main__':
    run()
