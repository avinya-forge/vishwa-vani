with open('lib/data-service.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("slug: //postface", "slug: //postface")

with open('lib/data-service.ts', 'w', encoding='utf-8') as f:
    f.write(content)
