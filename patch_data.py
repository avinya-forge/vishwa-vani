import os

with open('lib/data-service.ts', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace path.join with Array.join to bypass Turbopack trace
c = c.replace("const dataPath = path.join(process.cwd(), 'data', goldDir, textSlug, shardFile);", 
              "const dataPath = [process.cwd(), 'data', '3-gold', textSlug, shardFile].join(path.sep);")
c = c.replace("const fallbackPath = path.join(process.cwd(), 'data', goldDir, textSlug, ${textSlug}-chapter-.json);",
              "const fallbackPath = [process.cwd(), 'data', '3-gold', textSlug, ${textSlug}-chapter-.json].join(path.sep);")
# Also clean up the unused goldDir
c = c.replace("const goldDir = '3-' + 'gold';\n", "")

with open('lib/data-service.ts', 'w', encoding='utf-8') as f:
    f.write(c)

print('Patched data-service.ts')
