import json

with open('data/manifest.json', 'r') as f:
    m = json.load(f)

mbh = next(b for b in m['books'] if b['slug'] == 'mahabharata')
parva2 = [s for s in mbh['shards'] if s['file'].startswith('parva-2/')]
print('Total Sabha shards:', len(parva2))
print('Sample shards:')
for s in parva2[:5]:
    print(' ', s)

print()
print('Testing parse logic:')
for s in parva2[:5]:
    parts = s['file'].split('/')  # parva-2/adhyaya-1.json
    adhyaya_file = parts[1]        # adhyaya-1.json
    num = adhyaya_file.replace('adhyaya-', '').replace('.json', '')
    print(f"  file={s['file']} -> adhyaya_num={num}")

# Test the CURRENT code logic: s.file.split('-')[1].split('.')[0]
print()
print('Testing CURRENT (bugged?) code logic:')
for s in parva2[:5]:
    try:
        result = s['file'].split('-')[1].split('.')[0]
        print(f"  file={s['file']} -> split result={result}")
    except Exception as e:
        print(f"  ERROR: {e}")
