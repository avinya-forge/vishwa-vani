import re

with open('lib/data-service.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r"\{ slug: //postface, title: 'Post-Context & Impact' \}"
replacement = r"{ slug: //postface, title: 'Post-Context & Impact' }"

content = content.replace(pattern, replacement)

with open('lib/data-service.ts', 'w', encoding='utf-8') as f:
    f.write(content)
