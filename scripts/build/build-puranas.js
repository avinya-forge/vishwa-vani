const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Generates structural JSON sharding for the 18 Maha Puranas (PoC Data generation for 2004)
const PURANAS = [
  { prefix: 'vishnu_purana', chapters: 6, title: 'Vishnu Purana' },
  { prefix: 'bhagavata_purana', chapters: 12, title: 'Srimad Bhagavatam' },
  { prefix: 'garuda_purana', chapters: 2, title: 'Garuda Purana' }
];

PURANAS.forEach(p => {
  for(let c=1; c<=p.chapters; c++) {
    const file = path.join(DATA_DIR, `${p.prefix}_chapter_${c}.json`);
    const mockData = [
      {
        verse: 1,
        slok: `ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते (Mock ${p.title} ${c}.1)`,
        transliteration: `Om purnamadah purnamidam (Mock ${p.title} ${c}.1)`,
        layers: [
          { type: 'translation', lang: 'en', author: 'vyasa', content: `This is a synthesized structural block for ${p.title} Chapter ${c}, Verse 1.` }
        ]
      }
    ];
    fs.writeFileSync(file, JSON.stringify(mockData, null, 2));
  }
});

console.log('Maha Purana structural JSONs generated successfully!');
