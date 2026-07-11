import json
import os
import re
import subprocess

# Canonical Targets for Project Mastery
TARGETS = {
    'bhagavad-gita': {
        'chapters': 18,
        'verses': 700,
        'authors': 10,
        'langs': ['sa', 'en', 'hi', 'mr'],
        'description': '18 Chapters, 700 Shlokas. Primary focus: Yoga of Action, Devotion, and Knowledge.'
    },
    'bhagavata-purana': {
        'chapters': 19, # Target: Canto 1
        'verses': 718,
        'authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'],
        'description': 'Canto 1: 19 Chapters. The glories of the Lord and His devotees.'
    },
    'isha-upanishad': {
        'chapters': 1,
        'verses': 19,
        'authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'],
        'description': 'The shortest Upanishad, emphasizing the omnipresence of the Divine.'
    },
    'kena-upanishad': {
        'chapters': 1,
        'verses': 34,
        'authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'],
        'description': 'Focuses on the nature of the Brahman and the power behind the senses.'
    },
    'mahabharata': {
        'chapters': 18, # 18 Parvas
        'verses': 100000,
        'authors': 2,
        'langs': ['sa', 'en'],
        'description': 'The world’s longest epic. Currently targeting Parva 1 (Adi) and 3 (Vana).'
    },
    'yoga-sutras': {
        'chapters': 4,
        'verses': 196,
        'authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'],
        'description': 'Foundation of Raja Yoga. 4 Padas: Samadhi, Sadhana, Vibhuti, Kaivalya.'
    },
    'vishnu-purana': {
        'chapters': 6,
        'verses': 7000,
        'authors': 2,
        'langs': ['sa', 'en'],
        'description': 'One of the oldest Puranas, focusing on Vishnu as the Supreme.'
    },
    'garuda-purana': {
        'chapters': 2,
        'verses': 19000,
        'authors': 2,
        'langs': ['sa', 'en'],
        'description': 'Dialogues on life after death and the journey of the soul.'
    },
    'samskaras': {
        'chapters': 1,
        'verses': 16,
        'authors': 1,
        'langs': ['sa', 'hi', 'mr'],
        'description': 'The 16 life-cycle rites (Samskaras) of Hindu tradition.'
    },
    'stotras': {
        'chapters': 1,
        'verses': 70,
        'authors': 1,
        'langs': ['sa', 'en', 'hi', 'mr'],
        'description': 'A collection of devotional hymns (Sahasranamas, Shatakas).'
    },
    'rigveda': {'chapters': 10, 'verses': 10552, 'authors': 1, 'langs': ['sa', 'en'], 'description': 'The oldest Veda.'},
    'samaveda': {'chapters': 2, 'verses': 1875, 'authors': 1, 'langs': ['sa', 'en'], 'description': 'The Veda of melodies.'},
    'yajurveda': {'chapters': 40, 'verses': 1975, 'authors': 1, 'langs': ['sa', 'en'], 'description': 'The Veda of rituals.'},
    'atharvaveda': {'chapters': 20, 'verses': 5977, 'authors': 1, 'langs': ['sa', 'en'], 'description': 'The Veda of formulas.'},
    'manusmriti': {'chapters': 12, 'verses': 2684, 'authors': 1, 'langs': ['sa', 'en'], 'description': 'Social and legal code.'},
    'brahma-sutras': {'chapters': 4, 'verses': 555, 'authors': 2, 'langs': ['sa', 'en'], 'description': 'Synthesis of Upanishads.'},
    'dasbodh': {'chapters': 20, 'verses': 7751, 'authors': 1, 'langs': ['sa', 'mr'], 'description': 'Philosophical work of Samarth Ramdas.'}
}

SUSPICIOUS_PATTERNS = [
    "Meaning of the verse based on actual translation",
    "This is an authentic Hindi translation",
    "This is an authentic Marathi translation",
    "placeholder",
    "TODO"
]

def audit_file_quality(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            data = json.loads(content)

        verses = data if isinstance(data, list) else data.get('verses', [])
        if not verses: return set(), set(), 0, False

        langs = set()
        authors = set()
        is_placeholder = False

        for p in SUSPICIOUS_PATTERNS:
            if p in content:
                is_placeholder = True
                break

        for v in verses:
            if v.get('original'): langs.add('sa')
            if v.get('translation'): langs.add('en')

            layers = v.get('layers', [])
            for l in layers:
                if l.get('lang'): langs.add(l.get('lang'))
                if l.get('author'): authors.add(l.get('author'))

        return langs, authors, len(verses), is_placeholder
    except:
        return set(), set(), 0, False

def get_tech_debt():
    debt = []
    # Count TODOs in codebase
    try:
        todo_count = subprocess.check_output("grep -r 'TODO' . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git | wc -l", shell=True).decode().strip()
        debt.append(f"TODOs in codebase: {todo_count}")
    except: pass

    # Check for missing tests
    # ...

    # Check for lint issues (simulated)
    return debt

def run_audit():
    if not os.path.exists('lib/texts.ts'): return
    with open('lib/texts.ts', 'r') as f:
        lib_content = f.read()

    books_raw = re.findall(r'slug: \'(.*?)\',.*?name: \'(.*?)\',.*?available: (true|false)', lib_content, re.DOTALL)

    status_report = []

    for slug, name, available_str in books_raw:
        target = TARGETS.get(slug, {'chapters': 1, 'verses': 100, 'authors': 1, 'langs': ['sa', 'en'], 'description': ''})

        stats = {
            'actual_chapters': 0,
            'actual_verses': 0,
            'actual_authors': set(),
            'actual_langs': set(),
            'has_placeholders': False,
            'stage': 'NOT_STARTED'
        }

        # Check Gold
        gold_path = f'data/3-gold/{slug}'
        if os.path.exists(gold_path):
            stats['stage'] = 'GOLD'
            if slug == 'mahabharata':
                for p in ['parva-3']:
                    p_path = os.path.join(gold_path, p)
                    if os.path.exists(p_path):
                        stats['actual_chapters'] += 1
                        for f_name in os.listdir(p_path):
                            if f_name.endswith('.json') and f_name != 'book.meta.json':
                                langs, authors, v_count, ph = audit_file_quality(os.path.join(p_path, f_name))
                                stats['actual_langs'].update(langs)
                                stats['actual_authors'].update(authors)
                                stats['actual_verses'] += v_count
                                if ph: stats['has_placeholders'] = True
            else:
                for root, _, files in os.walk(gold_path):
                    for f_name in files:
                        if f_name.endswith('.json') and f_name != 'book.meta.json':
                            langs, authors, v_count, ph = audit_file_quality(os.path.join(root, f_name))
                            stats['actual_langs'].update(langs)
                            stats['actual_authors'].update(authors)
                            stats['actual_verses'] += v_count
                            stats['actual_chapters'] += 1
                            if ph: stats['has_placeholders'] = True

        # Check Silver if Gold is incomplete or missing
        silver_path = f'data/2-silver/{slug}'
        if os.path.exists(silver_path):
            if stats['stage'] == 'NOT_STARTED': stats['stage'] = 'SILVER'
            if slug == 'mahabharata':
                p1_path = os.path.join(silver_path, 'parva-1')
                if os.path.exists(p1_path):
                    stats['actual_chapters'] += 1
                    for f_name in os.listdir(p1_path):
                        if f_name.endswith('.json'):
                            _, _, v_count, ph = audit_file_quality(os.path.join(p1_path, f_name))
                            stats['actual_verses'] += v_count
                            if ph: stats['has_placeholders'] = True
            elif stats['stage'] == 'SILVER':
                for root, _, files in os.walk(silver_path):
                    for f_name in files:
                        if f_name.endswith('.json') and f_name != 'book.meta.json':
                            langs, authors, v_count, ph = audit_file_quality(os.path.join(root, f_name))
                            stats['actual_langs'].update(langs)
                            stats['actual_authors'].update(authors)
                            stats['actual_verses'] += v_count
                            stats['actual_chapters'] += 1
                            if ph: stats['has_placeholders'] = True

        # Check Bronze
        if stats['stage'] == 'NOT_STARTED':
            if os.path.exists(f'data/1-bronze/{slug}') or os.path.exists(f'data/1-bronze/mahabharata-adi-parva-mapping.tsv'):
                stats['stage'] = 'BRONZE/INGESTING'

        # Calculate Readiness
        v_score = min(stats['actual_verses'] / target['verses'], 1.0) if target['verses'] > 0 else 0
        c_score = min(stats['actual_chapters'] / target['chapters'], 1.0) if target['chapters'] > 0 else 0
        a_score = min(len(stats['actual_authors']) / target['authors'], 1.0) if target['authors'] > 0 else 0

        display_langs = {l for l in stats['actual_langs'] if l in ['sa', 'en', 'hi', 'mr']}
        l_score = (len(display_langs) / len(target['langs'])) if target['langs'] else 0

        ui_score = 1.0 if available_str == 'true' else 0.0

        # Weighted Composite Score
        score = (v_score * 0.3 + c_score * 0.2 + l_score * 0.2 + a_score * 0.2 + ui_score * 0.1) * 100
        if stats['has_placeholders']:
            score *= 0.85

        score = round(min(score, 100.0), 2)

        pending = []
        if stats['actual_chapters'] < target['chapters']: pending.append(f"Missing {target['chapters'] - stats['actual_chapters']} chapters")
        if stats['actual_verses'] < target['verses']: pending.append(f"Missing {target['verses'] - stats['actual_verses']} verses")
        if len(display_langs) < len(target['langs']):
            missing_langs = set(target['langs']) - display_langs
            pending.append(f"Missing languages: {', '.join(missing_langs)}")
        if len(stats['actual_authors']) < target['authors']: pending.append(f"Add {target['authors'] - len(stats['actual_authors'])} more authors")
        if stats['has_placeholders']: pending.append("Audit and replace placeholder/generated data with authentic scholarship")
        if available_str == 'false': pending.append("Integrate with UI (Reader/Index)")

        status_report.append({
            'name': name,
            'slug': slug,
            'score': score,
            'stage': stats['stage'],
            'ui': 'READY' if available_str == 'true' else 'HIDDEN',
            'progress': {
                'chapters': f"{stats['actual_chapters']}/{target['chapters']}",
                'verses': f"{stats['actual_verses']}/{target['verses']}",
                'langs': f"{len(display_langs)}/{len(target['langs'])}",
                'authors': f"{len(stats['actual_authors'])}/{target['authors']}"
            },
            'flags': {
                'placeholders': stats['has_placeholders'],
                'incomplete_structural': stats['actual_verses'] < target['verses']
            },
            'pending_tasks': pending,
            'description': target['description']
        })

    status_report.sort(key=lambda x: x['score'], reverse=True)

    project_metrics = {
        'total_books': len(status_report),
        'gold_books': len([b for b in status_report if b['stage'] == 'GOLD']),
        'silver_books': len([b for b in status_report if b['stage'] == 'SILVER']),
        'ui_ready_books': len([b for b in status_report if b['ui'] == 'READY']),
        'tech_debt': get_tech_debt()
    }

    final_report = {
        'last_updated': '2026-07-06',
        'metrics': project_metrics,
        'books': status_report
    }

    with open('.status', 'w') as f:
        json.dump(final_report, f, indent=2)

    print("Project Status Audit Complete. Generated .status")

if __name__ == '__main__':
    run_audit()
