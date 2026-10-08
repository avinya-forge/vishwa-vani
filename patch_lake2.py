import os

with open('lib/server-lake.ts', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace db opening/closing with a cached connection using regex to handle line endings
import re

c = re.sub(
    r'export async function getVersesFromLakeServer.*?\n.*?const dbPath = path\.join.*?try \{\n\s*const db = new Database.*?db\.close\(\);',
    '''let cachedDb: Database.Database | null = null;

export async function getVersesFromLakeServer(textSlug: string, chapter: number, lakeFile: string = 'vedic-lake.db'): Promise<NVFFragment[]> {
  const dbPath = path.join(process.cwd(), 'public', lakeFile);
  
  try {
    if (!cachedDb) {
      cachedDb = new Database(dbPath, { readonly: true });
    }
    const query = SELECT content FROM verses WHERE text_slug = ? AND chapter = ? ORDER BY verse ASC;
    const rows = cachedDb.prepare(query).all(textSlug, chapter);''',
    c,
    flags=re.DOTALL
)

with open('lib/server-lake.ts', 'w', encoding='utf-8') as f:
    f.write(c)

print('Patched server-lake.ts')
