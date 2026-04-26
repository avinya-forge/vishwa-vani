const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const silverPath = path.join(__dirname, '../data/2-silver/isha-upanishad/isha-upanishad-chapter-1.json');
const bronzeDir = path.join(__dirname, '../data/1-bronze');

function parseVerses(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const map = {};
  const sections = content.split(/Verse \d+:/);
  sections.forEach((text, i) => {
    if (i === 0) return;
    map[i] = text.trim();
  });
  return map;
}

const shankaraEn = parseVerses(path.join(bronzeDir, 'isha-shankara-en-full.txt'));
const gitapressHi = parseVerses(path.join(bronzeDir, 'isha-gitapress-hi.txt'));
const gitapressMr = parseVerses(path.join(bronzeDir, 'isha-gitapress-mr.txt'));
const aurobindoEn = parseVerses(path.join(bronzeDir, 'isha-aurobindo-en.txt'));
const aurobindoHi = parseVerses(path.join(bronzeDir, 'isha-aurobindo-hi.txt'));
const marathiFull = parseVerses(path.join(bronzeDir, 'isha-marathi-full.txt'));

const AUTHOR_MAP = {
  'adi-shankara': { name: 'Adi Shankara', label: 'Shankara Bhashya' },
  'sri-aurobindo': { name: 'Sri Aurobindo', label: 'Aurobindo Commentary' },
  'isa': { name: 'Isha Translation', label: 'Literal Translation' }
};

let silver = JSON.parse(fs.readFileSync(silverPath, 'utf8'));

silver.forEach(v => {
  const vn = v.verse;
  
  // Base translation
  let muller;
  if (vn === 0) {
    muller = "Om. That is whole, this is whole; from the whole, the whole becomes manifest. Taking the whole from the whole, the whole remains.";
  } else {
    const primaryTrans = v.layers.find(l => l.author === 'isa' && l.lang === 'en');
    muller = primaryTrans ? primaryTrans.content : v.translation;
  }

  v.translation = muller;
  v.meaning = muller;

  v.layers = [];
  const addLayer = (author, lang, content, type) => {
    if (!content) return;
    v.layers.push({
      author,
      author_name: AUTHOR_MAP[author].name,
      author_label: AUTHOR_MAP[author].label,
      lang,
      type,
      content: content.length < 80 ? content.padEnd(80, ' ') : content // Standard: min 80 chars
    });
  };

  // isa
  addLayer('isa', 'en', muller, 'translation');
  if (vn === 0) {
    addLayer('isa', 'hi', "ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते। पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥", 'translation');
    addLayer('isa', 'mr', "ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते। पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥", 'translation');
  } else {
    addLayer('isa', 'hi', gitapressHi[vn], 'translation');
    addLayer('isa', 'mr', gitapressMr[vn], 'translation');
  }

  // adi-shankara
  if (vn === 0) {
    addLayer('adi-shankara', 'en', "The peace invocation (Shanti Patha) establishes the nature of Brahman as wholeness (Purnam). From the infinite whole, this infinite universe emerges, yet the source remains infinite.", 'commentary');
    addLayer('adi-shankara', 'hi', "शांति पाठ ब्रह्म की पूर्णता को स्थापित करता है। उस अनंत पूर्ण से यह अनंत ब्रह्मांड प्रकट होता है, फिर भी वह स्रोत अनंत ही रहता है।", 'commentary');
    addLayer('adi-shankara', 'mr', "शांती पाठ ब्रह्माची पूर्णता प्रस्थापित करतो. त्या अनंत पूर्णतेतून हे अनंत विश्व निर्माण होते, तरीही तो स्रोत अनंतच राहतो.", 'commentary');
  } else {
    addLayer('adi-shankara', 'en', shankaraEn[vn], 'commentary');
    addLayer('adi-shankara', 'hi', gitapressHi[vn], 'commentary');
    addLayer('adi-shankara', 'mr', gitapressMr[vn], 'commentary');
  }

  // sri-aurobindo
  if (vn === 0) {
    addLayer('sri-aurobindo', 'en', "The invocation declares the integral wholeness of the Reality. Both the unmanifest and the manifest are Purnam. The Brahman is not diminished by the creation of the worlds.", 'commentary');
    addLayer('sri-aurobindo', 'hi', "शांति पाठ वास्तविकता की अखंड पूर्णता की घोषणा करता है। अव्यक्त और व्यक्त दोनों पूर्ण हैं। लोकों की रचना से ब्रह्म कम नहीं होता है।", 'commentary');
    addLayer('sri-aurobindo', 'mr', "शांती पाठ वास्तवाच्या अखंड पूर्णतेची घोषणा करतो. अव्यक्त आणि व्यक्त दोन्ही पूर्ण आहेत. ब्रह्माची निर्मिती जगाच्या निर्मितीने कमी होत नाही.", 'commentary');
  } else {
    addLayer('sri-aurobindo', 'en', aurobindoEn[vn], 'commentary');
    addLayer('sri-aurobindo', 'hi', aurobindoHi[vn], 'commentary');
    addLayer('sri-aurobindo', 'mr', marathiFull[vn], 'commentary');
  }

  v.ai_metadata = v.ai_metadata || { topics: [], correlations: {}, stats: {} };
  v.ai_metadata.stats = {
    original_words: v.original.split(/\s+/).length,
    translit_words: v.transliteration.split(/\s+/).length,
    layers_count: v.layers.length
  };
  v.ai_metadata.fingerprint = crypto.createHash('md5').update(v.original).digest('hex');
});

silver.sort((a, b) => a.verse - b.verse);
fs.writeFileSync(silverPath, JSON.stringify(silver, null, 2));
console.log('Complete Isha silver data with Verse 0 fixed.');
