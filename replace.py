import re

with open('lib/data-service.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r"(nextChapter: currentChapter < textMetadata\.totalChapters \? \{.*?\}) : undefined,"
replacement = r"\1 : textMetadata.hasPostface ? { slug: //postface, title: 'Post-Context & Impact' } : undefined,"

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('lib/data-service.ts', 'w', encoding='utf-8') as f:
    f.write(content)
