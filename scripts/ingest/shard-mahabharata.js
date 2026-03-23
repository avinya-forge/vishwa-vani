const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../data/mahabharata_full.json');
const OUTPUT_DIR = path.join(__dirname, '../data');

if (!fs.existsSync(INPUT_FILE)) {
    console.error('Mahabharata full data not found.');
    process.exit(1);
}

const raw = fs.readFileSync(INPUT_FILE, 'utf8');
const data = JSON.parse(raw);

// The data is an object with numeric keys. We want to group by book
const parvas = {};

Object.values(data).forEach(v => {
    const book = v.book;
    const chapter = v.chapter;
    
    if (!parvas[book]) parvas[book] = {};
    if (!parvas[book][chapter]) parvas[book][chapter] = [];
    
    parvas[book][chapter].push({
        verse: v.shloka,
        original: "", // KMG doesn't usually have Shloka in JSON
        transliteration: "",
        layers: [
            {
                type: 'translation',
                lang: 'en',
                author: 'kmg',
                content: v.text.replace(/\[\w+\]\n/, '') // Remove [h] or [Vai] tags
            }
        ]
    });
});

// Now write out the files
Object.entries(parvas).forEach(([book, chapters]) => {
    // Note: The app currently treats each 'Parva' as a 'chapter' in a single 'mahabharata' text
    // OR we can treat it as chapters within that book.
    // In texts.ts, Mahabharata has 18 chapters (one for each Parva).
    // Let's combine all chapters of a Parva into one file for that Parva.
    
    const parvaVerses = [];
    Object.entries(chapters).forEach(([chapNum, verses]) => {
        verses.sort((a, b) => a.verse - b.verse);
        // We'll prefix the verse with Chap number to keep it unique while flat
        verses.forEach(v => {
            parvaVerses.push({
                ...v,
                verse_id: `${chapNum}.${v.verse}`,
                id: `mahabharata_${book}_${chapNum}_${v.verse}`
            });
        });
    });

    const outFile = path.join(OUTPUT_DIR, `mahabharata-chapter_${book}.json`);
    fs.writeFileSync(outFile, JSON.stringify(parvaVerses, null, 2));
    console.log(`Wrote Parva ${book} with ${parvaVerses.length} segments.`);
});

console.log('Sharding complete.');
