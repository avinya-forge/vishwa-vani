const fs = require('fs');
const path = require('path');

// Mock a minimal version of migrateToNVF for the migration script
function migrateToNVFMinimal(legacy, textSlug, fallbackChapter) {
  const AUTHOR_KEYS = ['siva', 'rams', 'chinmay', 'sankar', 'prabhu', 'tej', 'gambir', 'raman', 'abhyankar'];
  const layers = [];

  const chapter = legacy.chapter || fallbackChapter || 0;
  const verse = legacy.verse || 0;
  const original = legacy.slok || legacy.original || "";
  const transliteration = legacy.transliteration || "";

  AUTHOR_KEYS.forEach(key => {
    if (legacy[key]) {
      const item = legacy[key];
      if (item.et) layers.push({ author: key, lang: 'en', type: 'translation', content: item.et });
      if (item.ec) layers.push({ author: key, lang: 'en', type: 'commentary', content: item.ec });
      if (item.ht) layers.push({ author: key, lang: 'hi', type: 'translation', content: item.ht });
      if (item.hc) layers.push({ author: key, lang: 'hi', type: 'commentary', content: item.hc });
      if (item.sc) layers.push({ author: key, lang: 'sa', type: 'commentary', content: item.sc });
    }
  });

  return {
    id: `${textSlug}_${chapter}_${verse}`,
    text_slug: textSlug,
    chapter,
    verse,
    original,
    transliteration,
    anvaya: legacy.anvaya || legacy.word_meanings || undefined,
    layers,
    ai_metadata: { topics: [] }
  };
}

const dataDir = path.join(process.cwd(), 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const match = file.match(/^(.+)_chapter_(\d+)\.json$/);
  if (!match) return;

  const textSlug = match[1].replace(/_/g, '-');
  const chapter = parseInt(match[2]);

  try {
    const rawData = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    if (!Array.isArray(rawData)) return;

    // Check if it's already NVF (heuristic)
    if (rawData.length > 0 && rawData[0].id && rawData[0].layers) {
        console.log(`[Skipping] ${file} (already NVF)`);
        return;
    }

    const migratedData = rawData.map(v => migrateToNVFMinimal(v, textSlug, chapter));
    
    fs.writeFileSync(path.join(dataDir, file), JSON.stringify(migratedData, null, 2));
    console.log(`[Migrated] ${file} to NVF format.`);
  } catch (e) {
    console.error(`Failed to migrate ${file}: ${e.message}`);
  }
});

console.log('Batch migration complete. System is now NVF-compliant.');
