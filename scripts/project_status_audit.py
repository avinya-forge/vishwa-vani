import json
import os
import re
from datetime import datetime

# ==============================================================================
# CANONICAL TARGETS (Standardized with Min 2 Authors & Min 3 Languages)
# ==============================================================================
CANONICAL_TARGETS = {
    'bhagavad-gita': {
        'total_chapters': 18, 'total_verses': 700, 'target_authors': 10,
        'langs': ['sa', 'en', 'hi', 'mr'], 'description': '18 Chapters. Universal dialogue.'
    },
    'bhagavata-purana': {
        'total_chapters': 335, 'total_verses': 18000, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'], 'description': '12 Cantos, 18,000 Verses.'
    },
    'isha-upanishad': {
        'total_chapters': 1, 'total_verses': 19, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'], 'description': 'Smallest Upanishad.'
    },
    'kena-upanishad': {
        'total_chapters': 1, 'total_verses': 34, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'], 'description': 'Nature of Brahman.'
    },
    'mahabharata': {
        'total_chapters': 2115, 'total_verses': 100000, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi'], 'description': 'The Great Epic.'
    },
    'yoga-sutras': {
        'total_chapters': 4, 'total_verses': 196, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'], 'description': 'Aphorisms of Yoga.'
    },
    'vishnu-purana': {
        'total_chapters': 126, 'total_verses': 7000, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi'], 'description': 'Chronicle of Vishnu.'
    },
    'garuda-purana': {
        'total_chapters': 250, 'total_verses': 19000, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi'], 'description': 'Dialogues on death.'
    },
    'samskaras': {
        'total_chapters': 1, 'total_verses': 16, 'target_authors': 2,
        'langs': ['sa', 'hi', 'mr'], 'description': 'Life-cycle rituals.'
    },
    'stotras': {
        'total_chapters': 100, 'total_verses': 1000, 'target_authors': 2,
        'langs': ['sa', 'en', 'hi', 'mr'], 'description': 'Hymn collection.'
    },
    'rigveda': {'total_chapters': 10, 'total_verses': 10552, 'target_authors': 2, 'langs': ['sa', 'en', 'hi'], 'description': 'Oldest Veda.'},
    'samaveda': {'total_chapters': 2, 'total_verses': 1875, 'target_authors': 2, 'langs': ['sa', 'en', 'hi'], 'description': 'Veda of melodies.'},
    'yajurveda': {'total_chapters': 40, 'total_verses': 1975, 'target_authors': 2, 'langs': ['sa', 'en', 'hi'], 'description': 'Veda of rituals.'},
    'atharvaveda': {'total_chapters': 20, 'total_verses': 5977, 'target_authors': 2, 'langs': ['sa', 'en', 'hi'], 'description': 'Veda of formulas.'},
    'manusmriti': {'total_chapters': 12, 'total_verses': 2684, 'target_authors': 2, 'langs': ['sa', 'en', 'hi'], 'description': 'Code of Manu.'},
    'brahma-sutras': {'total_chapters': 4, 'total_verses': 555, 'target_authors': 2, 'langs': ['sa', 'en', 'hi'], 'description': 'Vedanta philosophy.'},
    'dasbodh': {'total_chapters': 20, 'total_verses': 7751, 'target_authors': 2, 'langs': ['sa', 'mr', 'hi'], 'description': 'Samarth Ramdas.'}
}

VEDIC_LAB_INTEGRATIONS = {
    'bhagavad-gita': True,
    'mahabharata': True,
    'bhagavata-purana': True,
    'isha-upanishad': True,
    'kena-upanishad': True,
    'yoga-sutras': True,
    'vishnu-purana': True,
    'stotras': True,
    'samskaras': False,
    'garuda-purana': False,
    'rigveda': False,
    'samaveda': False,
    'yajurveda': False,
    'atharvaveda': False,
    'manusmriti': False,
    'brahma-sutras': False,
    'dasbodh': False,
}

SUSPICIOUS_PATTERNS = [
    "Meaning of the verse based on actual translation",
    "This is an authentic Hindi translation",
    "This is an authentic Marathi translation",
    "placeholder", "TODO"
]

def audit_file_quality(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            data = json.loads(content)
        verses = data if isinstance(data, list) else data.get('verses', [])
        if not verses: return set(), set(), 0, False, set()
        langs, authors, verse_ids, is_placeholder = set(), set(), set(), False
        for p in SUSPICIOUS_PATTERNS:
            if p in content:
                is_placeholder = True
                break
        for v in verses:
            v_id = v.get('id')
            if v_id: verse_ids.add(v_id)
            if v.get('original'): langs.add('sa')
            if v.get('translation'): langs.add('en')
            for l in v.get('layers', []):
                if l.get('lang'): langs.add(l.get('lang'))
                if l.get('author'): authors.add(l.get('author'))
        return langs, authors, len(verses), is_placeholder, verse_ids
    except: return set(), set(), 0, False, set()

def get_progress_bar(percent):
    filled = int(percent / 10)
    return "[" + "█" * filled + "░" * (10 - filled) + "]"

def run_audit():
    with open('lib/texts.ts', 'r') as f:
        lib_content = f.read()
    books_raw = re.findall(r'slug: \'(.*?)\',.*?name: \'(.*?)\',.*?available: (true|false)', lib_content, re.DOTALL)
    report = []
    for slug, name, available_str in books_raw:
        target = CANONICAL_TARGETS.get(slug, {'total_chapters': 1, 'total_verses': 100, 'target_authors': 2, 'langs': ['sa', 'en', 'hi'], 'description': ''})
        stats = {'chapters_found': set(), 'unique_verses': set(), 'authors': set(), 'langs': set(), 'placeholders': False, 'stage': 'NOT_STARTED'}
        for tier in ['3-gold', '2-silver']:
            path = f'data/{tier}/{slug}'
            if os.path.exists(path):
                stats['stage'] = 'GOLD' if 'gold' in tier else ('SILVER' if stats['stage'] == 'NOT_STARTED' else stats['stage'])
                for root, _, files in os.walk(path):
                    for f_name in files:
                        if f_name.endswith('.json') and f_name != 'book.meta.json':
                            match = re.search(r'chapter-(\d+)', f_name) or re.search(r'adhyaya-(\d+)', f_name)
                            if match: stats['chapters_found'].add(match.group(1))
                            l, a, v_count, ph, v_ids = audit_file_quality(os.path.join(root, f_name))
                            stats['langs'].update(l); stats['authors'].update(a); stats['unique_verses'].update(v_ids)
                            if ph: stats['placeholders'] = True
        if stats['stage'] == 'NOT_STARTED' and (os.path.exists(f'data/1-bronze/{slug}') or os.path.exists('data/1-bronze/mahabharata-adi-parva-mapping.tsv')):
            stats['stage'] = 'BRONZE'
        display_langs = {l for l in stats['langs'] if l in ['sa', 'en', 'hi', 'mr']}
        v_score = min(len(stats['unique_verses']) / target['total_verses'], 1.0) if target['total_verses'] > 0 else 0
        c_score = min(len(stats['chapters_found']) / target['total_chapters'], 1.0) if target['total_chapters'] > 0 else 0
        l_score = (len(display_langs) / len(target['langs'])) if target['langs'] else 0
        a_score = min(len(stats['authors']) / target['target_authors'], 1.0) if target['target_authors'] > 0 else 0
        ui_score = 1.0 if available_str == 'true' else 0.0
        lab_score = 1.0 if VEDIC_LAB_INTEGRATIONS.get(slug, False) else 0.0

        # Weighted composite score including Vedic Lab integration:
        # Verses: 25%, Chapters: 15%, Languages (min 3 target): 20%, Authors (min 2 target): 20%, UI: 10%, Vedic Lab: 10%
        composite = (v_score * 0.25 + c_score * 0.15 + l_score * 0.20 + a_score * 0.20 + ui_score * 0.10 + lab_score * 0.10) * 100
        if stats['placeholders']: composite *= 0.85
        composite = round(min(composite, 100.0), 2)
        report.append({
            'name': name, 'slug': slug, 'score': composite, 'stage': stats['stage'], 'ui': 'READY' if available_str == 'true' else 'HIDDEN',
            'lab': 'INTEGRATED' if VEDIC_LAB_INTEGRATIONS.get(slug, False) else 'PENDING',
            'progress': {'chapters': f"{len(stats['chapters_found'])}/{target['total_chapters']}", 'verses': f"{len(stats['unique_verses'])}/{target['total_verses']}", 'langs': f"{len(display_langs)}/{len(target['langs'])}", 'authors': f"{len(stats['authors'])}/{target['target_authors']}"},
            'has_placeholders': stats['placeholders'], 'description': target['description']
        })
    report.sort(key=lambda x: x['score'], reverse=True)
    lines = ['# 🚀 Vishwa-Vani: Global Project Master Status', '', f"*Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*", '', f"**Overall Health:** {len([b for b in report if b['stage'] == 'GOLD'])} Gold Books | {len([b for b in report if b['ui'] == 'READY'])} Integrated with UI\n"]
    for cat, stages in [('🏆 Production Grade (GOLD)', ['GOLD']), ('🚧 In Progress (SILVER/BRONZE)', ['SILVER', 'BRONZE']), ('🌑 Backlog', ['NOT_STARTED'])]:
        lines.append(f"## {cat}\n")
        books = [b for b in report if b['stage'] in stages]
        if not books: lines.append("*No books in this stage.*\n")
        for b in books:
            alert = " ⚠️ (Contains Placeholders)" if b['has_placeholders'] else ""
            lines.append(f"### {b['name']} {alert}\n**Readiness Score: {b['score']}%** {get_progress_bar(b['score'])}\n- **Slug:** `{b['slug']}` | **UI:** {b['ui']} | **Vedic Lab:** {b['lab']}\n- **Structural:** Chapters: `{b['progress']['chapters']}` | Verses: `{b['progress']['verses']}`\n- **Linguistic:** Layers: `{b['progress']['langs']}` | Authors: `{b['progress']['authors']}`\n> {b['description']}\n")
    lines.append('---\n## 🛠️ Verification Methodology\n1. **Code View**: Actual unique verse IDs and layers counted from `data/` tiers.\n2. **Canonical View**: Measured against established targets.\n3. **Integrity Check**: Automatic detection of placeholder patterns.\n')
    with open('docs/PROJECT_STATUS.md', 'w') as f: f.write('\n'.join(lines))
    with open('.status', 'w') as f: json.dump(report, f, indent=2)
    print("Enhanced Project Status Audit Complete.")

if __name__ == '__main__': run_audit()
