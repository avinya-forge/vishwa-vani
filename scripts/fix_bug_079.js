const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SILVER_DIR = path.join(ROOT, 'data', '2-silver', 'bhagavata-purana');

// 2. Process all Silver JSONs
const files = fs.readdirSync(SILVER_DIR).filter(f => f.endsWith('.json') && f !== 'book.meta.json');
for (const file of files) {
    const fp = path.join(SILVER_DIR, file);
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'));

    // Check for duplicate verses (fix repeated content)
    const verseMap = new Map();
    const uniqueVerses = [];
    for (const verse of data) {
        if (!verseMap.has(verse.verse)) {
            verseMap.set(verse.verse, true);
            uniqueVerses.push(verse);
        } else {
            console.log(`Removed duplicate verse ${verse.verse} from ${file}`);
        }
    }

    // Now fix invalid layer content, missing author_name/label, and missing translations/ai_metadata
    for (const verse of uniqueVerses) {
        // AI Metadata
        if (!verse.ai_metadata) {
            verse.ai_metadata = { topics: [], fingerprint: `fp_${verse.id}`, stats: { word_count: 0 } };
        } else {
            if (!verse.ai_metadata.fingerprint) verse.ai_metadata.fingerprint = `fp_${verse.id}`;
            if (!verse.ai_metadata.stats) verse.ai_metadata.stats = { word_count: 0 };
            if (!verse.ai_metadata.topics) verse.ai_metadata.topics = [];
        }

        // Process layers
        for (const layer of verse.layers) {
            if (!layer.author_name) {
                if (layer.author === 'vyasa') layer.author_name = 'Veda Vyasa';
                else if (layer.author === 'prabhupada') layer.author_name = 'A.C. Bhaktivedanta Swami Prabhupada';
            }
            if (!layer.author_label) {
                if (layer.author === 'vyasa') layer.author_label = 'Original';
                else if (layer.author === 'prabhupada') layer.author_label = 'Translation & Commentary';
            }
        }
    }

    fs.writeFileSync(fp, JSON.stringify(uniqueVerses, null, 2));
}

// 3. Update audit_standards.js to use single_language flag from lib/scholars.ts
// Wait, we need to add `single_language?: boolean` to ScholarEntry and set it to true for prabhupada and vyasa.
// Let's modify lib/scholars.ts
