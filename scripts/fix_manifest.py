import json
import os
import re

manifest_path = r'd:\Code\avinya-forge\vishwa-vani\data\manifest.json'

def fix_and_cleanup():
    with open(manifest_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Attempt to fix the broken JSON structure around line 264
    # It looks like:
    # 263:           "verse_count": 10
    # 264:         },
    # 265: 
    # 266:           "number": 301,
    
    # We want to remove all the ghost chapters anyway.
    # Let's use regex to find where the valid chapters end
    match = re.search(r'("file": "mahabharata-chapter-18\.json",\s+"verse_count": 10\s+})', content)
    if match:
        end_pos = match.end()
        # Find the next book or the end of the books array
        # The structure is: "chapters": [ {ch1}, ..., {ch18}, {ghost...} ], "completeness_score": 100.0, "status": "GOLD" }
        
        # Strip everything from end_pos until the end of the chapters array
        # We need to find the closing bracket of the chapters array for mahabharata
        # And the remaining book fields.
        
        # Let's just find the mahabharata closure
        new_suffix = '\n      ],\n      "completeness_score": 0.8,\n      "status": "SILVER"\n    }\n  ]\n}'
        # This assumes mahabharata is the last book. Is it?
        # Let's check.
    
    # Actually, let's just parse it line by line and skip the bad lines
    lines = content.splitlines()
    fixed_lines = []
    skip = False
    for i, line in enumerate(lines):
        if '"number": 301' in line and i > 250:
            skip = True
        if skip:
            if ']' in line and 'completeness_score' not in line: # End of chapters array
                 fixed_lines.append('      ],')
                 skip = False
                 continue
            continue
        fixed_lines.append(line)
        
    fixed_content = '\n'.join(fixed_lines)
    try:
        data = json.loads(fixed_content)
        # Now do the real cleanup
        for book in data['books']:
            if book['book_id'] == 'mahabharata':
                book['status'] = 'SILVER'
                book['completeness_score'] = 0.8
        
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Manifest fixed and cleaned successfully.")
    except Exception as e:
        print(f"Failed to parse fixed content: {e}")
        # If it fails, I'll at least have the fixed_content to debug
        with open(manifest_path + '.broken', 'w', encoding='utf-8') as f:
            f.write(fixed_content)

if __name__ == "__main__":
    fix_and_cleanup()
