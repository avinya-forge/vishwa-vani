import re
with open('lib/texts.ts', 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r"(slug: 'samskaras',.*?available: )false", r"\g<1>true", content, flags=re.DOTALL)
with open('lib/texts.ts', 'w', encoding='utf-8') as f:
    f.write(content)
