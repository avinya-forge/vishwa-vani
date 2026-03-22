const fs = require('fs');
const path = require('path');

// PoC for 1903 AI Tagger Pipeline
// In a real environment, this script runs via CI/CD, feeding verses to an LLM to generate `ai_metadata`.

const DATA_DIR = path.join(__dirname, '../data');

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
console.log(`Running AI Tagger Pipeline on ${files.length} texts...`);

const VIZ_TYPES = ['astro_chart', 'genealogy', 'timeline', 'philosophy_graph', 'none'];
const TOPICS = ['dharma', 'karma', 'maya', 'bhakti', 'jnana', 'moksha', 'samsara', 'yoga', 'atman', 'brahman'];

let taggedCount = 0;

files.forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  const rawData = fs.readFileSync(filePath, 'utf8');
  let verses;
  try {
    verses = JSON.parse(rawData);
  } catch (e) {
    return;
  }

  // Mutate each verse to add mock AI metadata
  verses.forEach(v => {
    taggedCount++;
    v.ai_metadata = {
      topics: [
        TOPICS[Math.floor(Math.random() * TOPICS.length)],
        TOPICS[Math.floor(Math.random() * TOPICS.length)]
      ],
      viz_type: VIZ_TYPES[Math.floor(Math.random() * VIZ_TYPES.length)]
    };
  });

  // Re-save (or in production, write to an enriched dataset)
  fs.writeFileSync(filePath, JSON.stringify(verses, null, 2));
});

console.log(`Successfully tagged ${taggedCount} verses with concept/visual metadata. Ready for ingestion!`);
