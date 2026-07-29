const fs = require('fs');
const path = require('path');

const silverMbhDir = path.join(__dirname, '../data/2-silver/mahabharata');

function auditParva(parvaDir) {
  if (!fs.existsSync(parvaDir)) return;
  const files = fs.readdirSync(parvaDir);
  for (const file of files) {
    if (!file.endsWith('.json') || file.endsWith('.meta.json')) continue;

    const filePath = path.join(parvaDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const translationCounts = new Map();

      for (const verse of data) {
        if (!verse.layers) continue;
        for (const layer of verse.layers) {
          if (layer.author === 'km_ganguli' && layer.lang === 'en' && layer.type === 'translation') {
            const content = layer.content.trim();
            if (content && content !== 'Translation pending alignment.') {
               translationCounts.set(content, (translationCounts.get(content) || 0) + 1);
            }
          }
        }
      }

      const duplicates = [];
      for (const [content, count] of translationCounts.entries()) {
        if (count > 1) {
          duplicates.push({ content: content.substring(0, 50) + '...', count });
        }
      }

      if (duplicates.length > 0) {
        console.log(`[MISALIGNMENT] File: ${path.join(path.basename(parvaDir), file)}`);
        console.log(`  Found ${duplicates.length} unique translations repeated across multiple verses.`);
        for (const dup of duplicates) {
          console.log(`    - Repeated ${dup.count} times: "${dup.content}"`);
        }
      }

    } catch(err) {
      console.error(`Error processing ${filePath}: ${err.message}`);
    }
  }
}

console.log("Starting KMG Translation Misalignment Audit on Silver Data (Mahabharata)...");
const parvas = ['parva-1', 'parva-2', 'parva-3'];
for (const parva of parvas) {
  auditParva(path.join(silverMbhDir, parva));
}
console.log("Audit complete.");
