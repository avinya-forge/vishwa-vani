const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../data/mahabharata_full.json');
const outputDir = path.join(__dirname, '../data');

if (!fs.existsSync(inputPath)) {
  console.error('Input file not found');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// KMG Parva to Index mapping
const PARVA_MAP = {
  'ADI PARVA': 1,
  'SABHA PARVA': 2,
  'VANA PARVA': 3,
  'ARANYAKA PARVA': 3, // Alternative name
  'VIRATA PARVA': 4,
  'UDYOGA PARVA': 5,
  'BHISHMA PARVA': 6,
  'DRONA PARVA': 7,
  'KARNA PARVA': 8,
  'SHALYA PARVA': 9,
  'SAUPTIKA PARVA': 10,
  'STRI PARVA': 11,
  'SHANTI PARVA': 12,
  'ANUSHASANA PARVA': 13,
  'ASHWAMEDHIKA PARVA': 14,
  'ASHRAMAVASIKA PARVA': 15,
  'MAUSALA PARVA': 16,
  'MAHAPRASTHANIKA PARVA': 17,
  'SWARGAROHANA PARVA': 18
};

let currentBook = 0;
let currentChapter = 1;
let verseIndex = 0;
const chapters = {};

console.log('Starting sharding Mahabharata...');

data.forEach((text, i) => {
  // Logic to detect Book switch
  const bookMatch = text.match(/BOOK (\d+)/i) || text.match(/(ADI|SABHA|VANA|ARANYAKA|VIRATA|UDYOGA|BHISHMA|DRONA|KARNA|SHALYA|SAUPTIKA|STRI|SHANTI|ANUSHASANA|ASHWAMEDHIKA|ASHRAMAVASIKA|MAUSALA|MAHAPRASTHANIKA|SWARGAROHANA) PARVA/i);
  
  if (bookMatch) {
    let bookName = '';
    if (bookMatch[1] && !isNaN(bookMatch[1])) {
       currentBook = parseInt(bookMatch[1]);
    } else {
       bookName = bookMatch[0].toUpperCase();
       if (PARVA_MAP[bookName]) {
         currentBook = PARVA_MAP[bookName];
       }
    }
    console.log(`Detected Book ${currentBook} at item ${i}`);
  }

  if (currentBook > 0) {
    if (!chapters[currentBook]) chapters[currentBook] = [];
    
    // Detect Section
    const sectionMatch = text.match(/SECTION ([I|V|X|L|C]+|\d+)/i);
    let sectionLabel = '';
    if (sectionMatch) {
      sectionLabel = sectionMatch[0];
    }

    chapters[currentBook].push({
      id: `mahabharata_${currentBook}_${verseIndex++}`,
      chapter: currentBook,
      verse: verseIndex,
      original: `[${sectionLabel || 'Continuation'}]`,
      transliteration: '',
      ai_metadata: { topics: [] },
      layers: [
        {
          author: 'kmg',
          lang: 'en',
          type: 'translation',
          content: text.trim()
        }
      ]
    });
  }
});

Object.keys(chapters).forEach(bookId => {
  const outputPath = path.join(outputDir, `mahabharata_chapter_${bookId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(chapters[bookId], null, 2));
  console.log(`Wrote ${chapters[bookId].length} chunks to Chapter ${bookId}`);
});

console.log('Sharding complete.');
