const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

let totalFixed = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(path.join(dataDir, file), 'utf8');
        let data = JSON.parse(content);
        let changed = false;

        data.forEach(v => {
            const fix = (text) => {
                if (!text) return text;
                let original = text;
                // 1. Replace '?' between words with ':' (Word? meaning -> Word: meaning)
                // Using regex that looks for non-ascii followed by '?' followed by space/ascii
                text = text.replace(/([^\x00-\x7F])\?\s/g, '$1: ');
                
                // 2. Remove broken unicode replacement chars
                text = text.replace(/\uFFFD/g, '');

                // 3. Normalize non-breaking spaces
                text = text.replace(/\u00A0/g, ' ');

                if (text !== original) changed = true;
                return text;
            };

            v.original = fix(v.original);
            v.transliteration = fix(v.transliteration);
            if (v.layers) {
                v.layers.forEach(l => {
                    l.content = fix(l.content);
                });
            }
        });

        if (changed) {
            fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));
            totalFixed++;
            console.log(`[Cleaned] ${file}`);
        }
    } catch (e) {
        console.error(`Error cleaning ${file}: ${e.message}`);
    }
});

console.log(`Cleaned up ${totalFixed} files.`);
