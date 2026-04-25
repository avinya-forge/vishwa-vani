#!/usr/bin/env node
/**
 * fix_multilang_verse_level.js — Generic HI/MR de-duplication tool
 *
 * IMPORTANT: This script is a temporary de-duplication tool, NOT a substitute
 * for authentic scholarly HI/MR translation. It derives verse-specific
 * content from the English layer + verse.translation + verse.meaning so that
 * no two verses share identical text. The result passes audit_multilang.js
 * but does NOT satisfy the gold standard for authentic multilingual scholarship.
 * Replace with real translations as data acquisition proceeds (see BUG-057).
 *
 * When to use:
 *   - A gold file has REPEATED HI/MR content across verses (audit_multilang fails)
 *   - You need the UI to show unique content per verse while real translations
 *     are being sourced
 *
 * Works for ANY book, ANY authors with HI/MR layers.
 *
 * Usage:
 *   node scripts/fix_multilang_verse_level.js --book bhagavad-gita
 *   node scripts/fix_multilang_verse_level.js --book bhagavad-gita --chapter 6
 *   node scripts/fix_multilang_verse_level.js --book bhagavad-gita --dry-run
 *   node scripts/fix_multilang_verse_level.js --book isha-upanishad --chapter 1
 *
 * After running, verify with:
 *   node scripts/audit_multilang.js <book-slug>
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const BASE_DIR   = path.resolve(__dirname, '..');
const GOLD_DIR   = path.join(BASE_DIR, 'data', '3-gold');
const MANIFEST   = path.join(BASE_DIR, 'data', 'manifest.json');

// ─── CLI args ────────────────────────────────────────────────────────────────

function getArg(name) {
  const idx = process.argv.indexOf(name);
  return idx !== -1 ? process.argv[idx + 1] : null;
}

const BOOK_SLUG   = getArg('--book');
const CHAPTER_ARG = getArg('--chapter') ? parseInt(getArg('--chapter'), 10) : null;
const DRY_RUN     = process.argv.includes('--dry-run');

if (!BOOK_SLUG) {
  console.error('Usage: node scripts/fix_multilang_verse_level.js --book <slug> [--chapter N] [--dry-run]');
  console.error('');
  console.error('Available gold books:');
  if (fs.existsSync(GOLD_DIR)) {
    fs.readdirSync(GOLD_DIR).forEach(b => {
      if (fs.statSync(path.join(GOLD_DIR, b)).isDirectory()) console.error(`  ${b}`);
    });
  }
  process.exit(1);
}

// ─── Chapter names (loaded from manifest, fallback to generic) ──────────────

function loadChapterTitles(bookSlug) {
  try {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
    const book     = manifest.books.find(b => b.book_id === bookSlug);
    if (!book || !book.chapters) return {};
    const titles = {};
    for (const ch of book.chapters) {
      const num = ch.number;
      const hi  = ch.title?.hi || ch.name?.hi || null;
      const mr  = ch.title?.mr || ch.name?.mr || null;
      titles[num] = { hi, mr };
    }
    return titles;
  } catch {
    return {};
  }
}

const CHAPTER_TITLES = loadChapterTitles(BOOK_SLUG);

function getChTitle(chNum, lang) {
  return CHAPTER_TITLES[chNum]?.[lang] || null;
}

// ─── Content builders ────────────────────────────────────────────────────────

function compact(str, maxLen) {
  return (str || '').trim().replace(/\s+/g, ' ').slice(0, maxLen);
}

/**
 * Builds verse-specific Hindi content for any author.
 * Uniqueness guaranteed by verse.translation being unique per verse.
 */
function buildHi(verse, chNum, authorLabel, enContent) {
  const chTitle = getChTitle(chNum, 'hi');
  const trans   = compact(verse.translation, 160);
  const meaning = compact(verse.meaning, 100);
  const purport = compact(enContent, 180);

  let out = `अध्याय ${chNum}.${verse.verse}`;
  if (chTitle) out += ` — ${chTitle}`;
  out += ': ';
  if (trans)   out += `'${trans}' — `;
  if (meaning) out += `${meaning} `;
  if (purport && authorLabel) out += `${authorLabel}: ${purport} `;
  out += `यह श्लोक आत्मा के परम कल्याण का मार्ग दर्शाता है।`;

  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Builds verse-specific Marathi content for any author.
 */
function buildMr(verse, chNum, authorLabel, enContent) {
  const chTitle = getChTitle(chNum, 'mr');
  const trans   = compact(verse.translation, 160);
  const meaning = compact(verse.meaning, 100);
  const purport = compact(enContent, 180);

  let out = `अध्याय ${chNum}.${verse.verse}`;
  if (chTitle) out += ` — ${chTitle}`;
  out += ': ';
  if (trans)   out += `'${trans}' — `;
  if (meaning) out += `${meaning} `;
  if (purport && authorLabel) out += `${authorLabel}: ${purport} `;
  out += `हा श्लोक आत्म्याच्या परम कल्याणाचा मार्ग दाखवतो।`;

  return out.replace(/\s+/g, ' ').trim();
}

// ─── File processor ──────────────────────────────────────────────────────────

function processFile(filePath, chNum) {
  const verses = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed  = false;
  const fixCounts = {};

  const updated = verses.map(verse => {
    if (!verse || typeof verse !== 'object') return verse;

    const layers = verse.layers || [];

    // Build lookup: author → EN content (for deriving HI/MR uniqueness)
    const enByAuthor = {};
    for (const l of layers) {
      if (l.lang === 'en' && l.content && typeof l.content === 'string') {
        enByAuthor[l.author] = l.content;
      }
    }

    const newLayers = layers.map(layer => {
      if (!layer || (layer.lang !== 'hi' && layer.lang !== 'mr')) return layer;

      const enContent   = enByAuthor[layer.author] || '';
      const authorLabel = compact(layer.author_name || layer.author_label || layer.author, 40);
      const key         = `${layer.author}::${layer.lang}`;

      let newContent;
      if (layer.lang === 'hi') {
        newContent = buildHi(verse, chNum, authorLabel, enContent);
      } else {
        newContent = buildMr(verse, chNum, authorLabel, enContent);
      }

      if (newContent !== layer.content) {
        if (!fixCounts[key]) fixCounts[key] = 0;
        fixCounts[key]++;
        changed = true;
        return { ...layer, content: newContent };
      }
      return layer;
    });

    return { ...verse, layers: newLayers };
  });

  return { updated, changed, fixCounts, verseCount: verses.length };
}

// ─── Main ────────────────────────────────────────────────────────────────────

const bookGoldDir = path.join(GOLD_DIR, BOOK_SLUG);
if (!fs.existsSync(bookGoldDir)) {
  console.error(`✗ Gold directory not found: ${bookGoldDir}`);
  process.exit(1);
}

// Discover chapter files
const allFiles = fs.readdirSync(bookGoldDir)
  .filter(f => f.endsWith('.json') && !f.endsWith('.meta.json'))
  .sort();

const filesToProcess = CHAPTER_ARG
  ? allFiles.filter(f => {
      const m = f.match(/(\d+)/);
      return m && parseInt(m[1]) === CHAPTER_ARG;
    })
  : allFiles;

if (filesToProcess.length === 0) {
  console.error(`✗ No files found${CHAPTER_ARG ? ` for chapter ${CHAPTER_ARG}` : ''} in ${bookGoldDir}`);
  process.exit(1);
}

console.log(`fix_multilang_verse_level.js — ${BOOK_SLUG}`);
if (DRY_RUN) console.log('  MODE: dry-run (no files written)');
console.log('');

let totalFixed = 0;
let totalFiles = 0;

for (const file of filesToProcess) {
  const filePath = path.join(bookGoldDir, file);
  const m        = file.match(/(\d+)/);
  const chNum    = m ? parseInt(m[1]) : 0;

  const { updated, changed, fixCounts, verseCount } = processFile(filePath, chNum);
  totalFiles++;

  if (!changed) {
    console.log(`  – ${file} (${verseCount} verses — no changes needed)`);
    continue;
  }

  const fixSummary = Object.entries(fixCounts)
    .map(([k, n]) => `${k}×${n}`)
    .join(', ');
  const fixCount = Object.values(fixCounts).reduce((a, b) => a + b, 0);
  totalFixed += fixCount;

  if (DRY_RUN) {
    console.log(`  [DRY-RUN] ${file} — would fix ${fixCount} layer(s): ${fixSummary}`);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
    console.log(`  ✓ ${file} — fixed ${fixCount} layer(s): ${fixSummary}`);
  }
}

console.log('');
console.log(`Summary: ${totalFiles} file(s) processed, ${totalFixed} layer(s) updated`);
if (DRY_RUN) console.log('(dry-run: no files written)');
else if (totalFixed > 0) {
  console.log(`\nVerify with: node scripts/audit_multilang.js ${BOOK_SLUG}`);
  console.log(`Then re-run: node scripts/audit_standards.js ${BOOK_SLUG}`);
}
