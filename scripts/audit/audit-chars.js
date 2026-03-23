const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

const issues = [];

files.forEach(file => {
    try {
        const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
        content.forEach((verse, vIdx) => {
            const check = (text, field) => {
                if (!text) return;
                // Check for common broken characters like Ã, Â, etc (UTF-8 interpreted as Latin1)
                if (text.match(/[ÃÂ]\s|[ÃÂ][\u0080-\u00BF]|\uFFFD|\?\?/)) {
                    issues.push({ file, verse: verse.verse, field, text: text.substring(0, 50) + '...' });
                }
                // Check for unescaped HTML entities or weird placeholders
                if (text.match(/&[a-z]+;/i) || text.match(/\[object Object\]/)) {
                    issues.push({ file, verse: verse.verse, field, text: text.substring(0, 50) + '...' });
                }
            };

            check(verse.original, 'original');
            check(verse.transliteration, 'transliteration');
            if (verse.layers) {
                verse.layers.forEach((layer, lIdx) => {
                    check(layer.content, `layer[${lIdx}].content`);
                });
            }
        });
    } catch (e) {
        console.error(`Error reading ${file}: ${e.message}`);
    }
});

if (issues.length === 0) {
    console.log("No encoding or special character issues found in the core dataset.");
} else {
    console.log(`Found ${issues.length} potential character issues:`);
    console.log(JSON.stringify(issues.slice(0, 10), null, 2));
    if (issues.length > 10) console.log(`... and ${issues.length - 10} more.`);
}
