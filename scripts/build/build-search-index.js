const fs = require('fs');
const path = require('path');

// Simple static index generator (PoC for 1707 fallback search)
// Generates a lightweight reverse-index for all ingested Vedas

const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DIR = path.join(__dirname, '../public');
const INDEX_PATH = path.join(PUBLIC_DIR, 'static_search_fallback.json');

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
console.log(`Building Static Search Index (Fallback) for ${files.length} texts...`);

const reverseIndex = {};
let totalVerses = 0;

files.forEach(file => {
  const rawData = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
  let verses;
  try {
    verses = JSON.parse(rawData);
  } catch (e) {
    return;
  }

  verses.forEach(v => {
    totalVerses++;
    const text = [(v.slok || ''), (v.transliteration || ''), ...(v.layers || []).map(l => l.content)].join(' ');
    const tokens = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 3);
    
    // Inverted index
    tokens.forEach(token => {
      if (!reverseIndex[token]) reverseIndex[token] = [];
      const id = `${file}_${v.verse}`;
      if (!reverseIndex[token].includes(id)) {
        reverseIndex[token].push(id);
      }
    });
  });
});

fs.writeFileSync(INDEX_PATH, JSON.stringify(reverseIndex));
console.log(`Static Search Index built successfully! Indexed ${Object.keys(reverseIndex).length} unique tokens across ${totalVerses} verses.`);
