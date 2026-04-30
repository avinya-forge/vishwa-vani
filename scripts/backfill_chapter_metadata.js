#!/usr/bin/env node
/**
 * backfill_chapter_metadata.js — STD-004
 *
 * Adds chapter-level metadata fields to data/manifest.json:
 *   - theme:         one-line philosophical summary of the chapter
 *   - yoga_type:     traditional yoga classification (Gita-specific; null for other books)
 *   - stotra_present: boolean — true if chapter contains an embedded stotra/mantra
 *
 * Currently backfills all 18 Bhagavad Gita chapters.
 * Safe to re-run — only adds missing fields, never overwrites existing values.
 *
 * Usage:
 *   node scripts/backfill_chapter_metadata.js
 *   node scripts/backfill_chapter_metadata.js --dry-run   # print changes only
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const MANIFEST_PATH = path.resolve(__dirname, '..', 'data', 'manifest.json');

// ─── Gita chapter metadata ───────────────────────────────────────────────────

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

// ─── Isha Upanishad chapter metadata ────────────────────────────────────────

const ISHA_CHAPTERS = {
  1: {
    theme: 'The Divine permeates all creation — renunciation, action, and the immortal Self across 18 mantras',
    yoga_type: null,
    stotra_present: true,  // entire text recited as daily upanishad-mantra
  },
};

// ─── Registry of all books to backfill ──────────────────────────────────────

const BOOK_METADATA = {
  'bhagavad-gita': GITA_CHAPTERS,
  'isha-upanishad': ISHA_CHAPTERS,
};

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const dryRun = process.argv.includes('--dry-run');
  const target = process.argv.slice(2).find(a => !a.startsWith('--'));

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('manifest.json not found at', MANIFEST_PATH);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const books = manifest.books;
  if (!Array.isArray(books)) {
    console.error('manifest.books is not an array');
    process.exit(1);
  }

  let totalAdded = 0;
  let totalSkipped = 0;

  for (const [bookId, chapterMeta] of Object.entries(BOOK_METADATA)) {
    if (target && target !== bookId) continue;

    const bookEntry = books.find(b => b.book_id === bookId || b.slug === bookId);
    if (!bookEntry) {
      console.log(`  — ${bookId}: not found in manifest, skipping`);
      continue;
    }

    console.log(`\n[${bookId}]`);
    let added = 0;
    let skipped = 0;

    for (const ch of (bookEntry.chapters || [])) {
      const meta = chapterMeta[ch.number];
      if (!meta) {
        console.log(`  ? Chapter ${ch.number}: no metadata defined — skipping`);
        continue;
      }

      let changed = false;
      if (!ch.theme)                          { ch.theme = meta.theme; changed = true; }
      if (!ch.yoga_type && meta.yoga_type)    { ch.yoga_type = meta.yoga_type; changed = true; }
      if (ch.stotra_present === undefined)    { ch.stotra_present = meta.stotra_present; changed = true; }

      if (changed) {
        added++;
        console.log(`  + Chapter ${ch.number}: ${meta.yoga_type || meta.theme.slice(0, 50)}`);
      } else {
        skipped++;
      }
    }

    console.log(`  ${added} chapters updated, ${skipped} already complete.`);
    totalAdded += added;
    totalSkipped += skipped;
  }

  console.log(`\nTotal: ${totalAdded} updated, ${totalSkipped} already complete.`);

  if (!dryRun && totalAdded > 0) {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('manifest.json saved.');
  } else if (dryRun) {
    console.log('[dry-run] No changes written.');
  }
}

main();
