'use strict';
const fs   = require('fs');
const path = require('path');

const MANIFEST_PATH = path.resolve(__dirname, '..', 'data', 'manifest.json');

const GITA_CHAPTERS = {
  1:  { theme: "Arjuna's grief on the battlefield of Kurukshetra", yoga_type: 'Arjuna Vishada Yoga',            stotra_present: false },
  2:  { theme: 'Sankhya philosophy and the eternal Self explained by Krishna', yoga_type: 'Sankhya Yoga',        stotra_present: false },
  3:  { theme: 'Selfless action as the path of duty and liberation', yoga_type: 'Karma Yoga',                   stotra_present: false },
  4:  { theme: 'Knowledge, renunciation, and the Divine descent', yoga_type: 'Jnana-Karma-Sanyasa Yoga',        stotra_present: false },
  5:  { theme: 'True renunciation through knowledge and detachment', yoga_type: 'Karma-Sanyasa Yoga',           stotra_present: false },
  6:  { theme: 'Meditation, mind-mastery, and the path of inner yoga', yoga_type: 'Dhyana Yoga',                stotra_present: false },
  7:  { theme: 'Knowledge of Brahman and the four types of devotees', yoga_type: 'Jnana-Vijnana Yoga',          stotra_present: false },
  8:  { theme: 'The imperishable Brahman and the path at death', yoga_type: 'Akshara-Brahma Yoga',              stotra_present: false },
  9:  { theme: 'The royal secret of devotion and the sovereign science', yoga_type: 'Raja-Vidya-Raja-Guhya Yoga', stotra_present: false },
  10: { theme: 'Divine manifestations and the infinite glories of Krishna', yoga_type: 'Vibhuti Yoga',          stotra_present: false },
  11: { theme: "Arjuna's vision of Krishna's Universal Form", yoga_type: 'Vishvarupa-Darshana Yoga',           stotra_present: false },
  12: { theme: 'Devotion as the highest and most accessible path', yoga_type: 'Bhakti Yoga',                    stotra_present: false },
  13: { theme: 'The field, the knower of the field, and self-knowledge', yoga_type: 'Kshetra-Kshetrajna Vibhaga Yoga', stotra_present: false },
  14: { theme: 'The three Gunas — Sattva, Rajas, Tamas — and transcendence', yoga_type: 'Gunatraya-Vibhaga Yoga', stotra_present: false },
  15: { theme: 'The Purushottama — the Supreme Person beyond perishable and imperishable', yoga_type: 'Purushottama Yoga', stotra_present: true },
  16: { theme: 'Divine and demonic natures and the supremacy of scripture', yoga_type: 'Daivasura-Sampad-Vibhaga Yoga', stotra_present: false },
  17: { theme: 'The three-fold faith in worship, austerity, and charity', yoga_type: 'Shraddhatraya-Vibhaga Yoga', stotra_present: false },
  18: { theme: 'The supreme secret — surrender to Krishna as the ultimate liberation', yoga_type: 'Moksha-Sanyasa Yoga', stotra_present: false },
};

const ISHA_CHAPTERS = {
  1: { theme: 'The Divine permeates all creation — renunciation, action, and the immortal Self across 18 mantras', yoga_type: null, stotra_present: true },
};

const KENA_CHAPTERS = {
  1: { theme: 'Sensory inquiry: By whom is the mind and breath directed?', yoga_type: null, stotra_present: true },
};

const YOGA_CHAPTERS = {
  1: { theme: 'Samādhi Pāda: The nature of concentration and the definition of Yoga.', yoga_type: 'Ashtanga Yoga', stotra_present: false },
};

const BHAGAVATA_CHAPTERS = {
  1: { theme: 'Questions by the Sages', yoga_type: null, stotra_present: false },
  2: { theme: 'Divinity and Divine Service', yoga_type: null, stotra_present: false },
  3: { theme: 'Krishna is the Source of All Incarnations', yoga_type: null, stotra_present: false },
  4: { theme: 'The Appearance of Sri Narada', yoga_type: null, stotra_present: false },
  5: { theme: "Narada's Instructions on Srimad-Bhagavatam for Vyasadeva", yoga_type: null, stotra_present: false },
  6: { theme: 'Conversation Between Narada and Vyasadeva', yoga_type: null, stotra_present: false },
  7: { theme: "The Son of Drona Punished", yoga_type: null, stotra_present: false },
  8: { theme: 'Prayers by Queen Kunti and Pariksit Saved', yoga_type: null, stotra_present: true },
  9: { theme: "The Passing Away of Bhismadeva in the Presence of Lord Krishna", yoga_type: null, stotra_present: true },
  10: { theme: "Departure of Lord Krishna for Dwaraka", yoga_type: null, stotra_present: false },
  11: { theme: "Lord Krishna's Entrance into Dwaraka", yoga_type: null, stotra_present: false },
  12: { theme: "Birth of Emperor Pariksit", yoga_type: null, stotra_present: false },
  13: { theme: "Dhritarashtra Quits Home", yoga_type: null, stotra_present: false },
  14: { theme: "The Disappearance of Lord Krishna", yoga_type: null, stotra_present: false },
  15: { theme: "The Pandavas Retire Timely", yoga_type: null, stotra_present: false },
  16: { theme: "How Pariksit Received the Age of Kali", yoga_type: null, stotra_present: false },
  17: { theme: "Punishment and Reward of Kali", yoga_type: null, stotra_present: false },
  18: { theme: "Maharaja Pariksit Cursed by a Brahmana Boy", yoga_type: null, stotra_present: false },
  19: { theme: "The Appearance of Sukadeva Gosvami", yoga_type: null, stotra_present: false },
};

const BOOK_METADATA = {
  'bhagavad-gita': GITA_CHAPTERS,
  'isha-upanishad': ISHA_CHAPTERS,
  'kena-upanishad': KENA_CHAPTERS,
  'yoga-sutras': YOGA_CHAPTERS,
  'bhagavata-purana': BHAGAVATA_CHAPTERS,
};

function main() {
  const dryRun = process.argv.includes('--dry-run');
  const target = process.argv.slice(2).find(a => !a.startsWith('--'));

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('manifest.json not found');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const books = manifest.books;

  for (const [bookId, chapterMeta] of Object.entries(BOOK_METADATA)) {
    if (target && target !== bookId) continue;
    const bookEntry = books.find(b => b.book_id === bookId || b.slug === bookId);
    if (!bookEntry) {
       console.log(`  — ${bookId}: not found in manifest`);
       continue;
    }

    console.log(`\n[${bookId}]`);
    for (const ch of (bookEntry.chapters || [])) {
      const meta = chapterMeta[ch.number];
      if (!meta) continue;
      ch.theme = meta.theme;
      ch.yoga_type = meta.yoga_type;
      ch.stotra_present = meta.stotra_present;
      console.log(`  + Chapter ${ch.number}: ${meta.theme}`);
    }
  }

  if (!dryRun) {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('manifest.json saved.');
  }
}
main();
