#!/usr/bin/env node
/**
 * PIPE-001: Generic Silver-tier NVF Validator
 *
 * Validates any book's silver-tier JSON against the NVF 1.3 schema.
 * Blocks corrupted/mock data. Allows in-progress [PLACEHOLDER_*] markers.
 * Must exit 0 before promote_to_gold.js is run.
 *
 * Usage:
 *   node scripts/validate_silver.js <book-slug>
 *   node scripts/validate_silver.js bhagavad-gita
 *   node scripts/validate_silver.js --all
 *
 * Exit codes: 0 = pass, 1 = failures found
 */

'use strict';
const fs = require('fs');
const path = require('path');

const SILVER_DIR = path.join(__dirname, '..', 'data', '2-silver');
const MIN_COMMENTARY_LENGTH = 20;

// Blocked at ALL tiers — indicate corrupted/mock data, not real in-progress work
const CORRUPTED_PATTERNS = [
  /^Mock Verse/i,
  /^Mock Transliteration/i,
  /THIS IS A GENERIC PLACEHOLDER/i,
  /INSERTED TO SATISFY THE MINIMUM LENGTH/i,
];

// Blocked at silver — legitimate in-progress [PLACEHOLDER_*] bracket markers are allowed
// so we only block things that are definitively wrong (not work-in-progress)
const INVALID_ORIGINAL_PATTERNS = [
  ...CORRUPTED_PATTERNS,
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isCorrupted(str) {
  if (!str || typeof str !== 'string') return false;
  return CORRUPTED_PATTERNS.some(p => p.test(str.trim()));
}

function isValidContent(str) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (trimmed.length < MIN_COMMENTARY_LENGTH) return false;
  return !isCorrupted(trimmed);
}

function validateVerse(verse, bookSlug, chapterNum) {
  const errors = [];
  const verseId = verse.id || `${bookSlug}_${chapterNum}_${verse.verse ?? '?'}`;

  // Required fields
  for (const field of ['id', 'original', 'verse']) {
    if (verse[field] === undefined || verse[field] === null || verse[field] === '') {
      errors.push(`${verseId}: missing required field '${field}'`);
    }
  }

  // original must not be corrupted (bracket placeholders are OK at silver)
  if (verse.original && isCorrupted(verse.original)) {
    errors.push(`${verseId}: 'original' is corrupted mock data: "${String(verse.original).slice(0, 60)}"`);
  }
  if (verse.original && verse.original.trim().length < 5) {
    errors.push(`${verseId}: 'original' is too short (${verse.original.trim().length} chars, min 5)`);
  }

  // transliteration
  if (verse.transliteration && isCorrupted(verse.transliteration)) {
    errors.push(`${verseId}: 'transliteration' is corrupted mock data`);
  }

  // layers validation
  if (!verse.layers || !Array.isArray(verse.layers) || verse.layers.length === 0) {
    errors.push(`${verseId}: has no layers (at least 1 EN layer required)`);
  } else {
    const enLayers = verse.layers.filter(l => l.lang === 'en' && l.content && isValidContent(l.content));
    if (enLayers.length === 0) {
      errors.push(`${verseId}: no valid English (lang:'en') layer found`);
    }

    for (const layer of verse.layers) {
      if (!layer.author) {
        errors.push(`${verseId}: layer missing 'author' field`);
        continue;
      }
      if (!layer.lang) {
        errors.push(`${verseId}: layer from '${layer.author}' missing 'lang' field`);
      }
      // Only reject corrupted content — bracket placeholders are allowed at silver
      if (layer.content && isCorrupted(layer.content)) {
        errors.push(`${verseId}: layer from '${layer.author}' (${layer.lang}) has corrupted content: "${String(layer.content).slice(0, 60)}"`);
      }
    }
  }

  return errors;
}

function validateFile(filePath, bookSlug, chapterNum) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return { errors: [`${filePath}: invalid JSON — ${e.message}`], verseCount: 0 };
  }

  const verses = Array.isArray(data) ? data : (data.verses || []);
  if (verses.length === 0) {
    return { errors: [`${filePath}: no verses found`], verseCount: 0 };
  }

  const errors = [];
  for (const verse of verses) {
    errors.push(...validateVerse(verse, bookSlug, chapterNum));
  }

  return { errors, verseCount: verses.length };
}

function validateBook(bookSlug) {
  const bookDir = path.join(SILVER_DIR, bookSlug);
  if (!fs.existsSync(bookDir)) {
    console.error(`✗ No silver data found at: ${bookDir}`);
    return false;
  }

  const files = fs.readdirSync(bookDir)
    .filter(f => f.endsWith('.json') && !f.endsWith('.meta.json'))
    .sort();

  if (files.length === 0) {
    console.error(`✗ ${bookSlug}: no JSON files in silver directory`);
    return false;
  }

  let totalVerses  = 0;
  const totalErrors = [];
  let filesWithErrors = 0;

  console.log(`\n── Validating ${bookSlug} (${files.length} file(s)) ──────────────────`);

  for (const file of files) {
    const filePath   = path.join(bookDir, file);
    const chapterMatch = file.match(/(\d+)/);
    const chapterNum   = chapterMatch ? parseInt(chapterMatch[1]) : 0;

    const { errors, verseCount } = validateFile(filePath, bookSlug, chapterNum);
    totalVerses += verseCount;

    if (errors.length > 0) {
      filesWithErrors++;
      console.log(`  ✗ ${file} (${verseCount} verses, ${errors.length} error(s))`);
      errors.slice(0, 5).forEach(e => console.log(`    • ${e}`));
      if (errors.length > 5) console.log(`    … and ${errors.length - 5} more`);
      totalErrors.push(...errors);
    } else {
      console.log(`  ✓ ${file} (${verseCount} verses)`);
    }
  }

  console.log(`\n  Summary: ${totalVerses} verses, ${totalErrors.length} error(s) across ${files.length} file(s)`);

  if (totalErrors.length > 0) {
    console.log(`  ✗ FAIL — ${bookSlug} is NOT ready for Gold promotion`);
    return false;
  }

  console.log(`  ✓ PASS — ${bookSlug} is ready for Gold promotion`);
  return true;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/validate_silver.js <book-slug> | --all');
    console.log('');
    console.log('Available silver books:');
    if (fs.existsSync(SILVER_DIR)) {
      fs.readdirSync(SILVER_DIR).forEach(b => {
        if (fs.statSync(path.join(SILVER_DIR, b)).isDirectory()) console.log(`  ${b}`);
      });
    }
    process.exit(0);
  }

  const booksToValidate = args[0] === '--all'
    ? fs.readdirSync(SILVER_DIR).filter(b => fs.statSync(path.join(SILVER_DIR, b)).isDirectory())
    : args;

  console.log('PIPE-001: validate_silver.js');
  console.log('Checking NVF compliance, corrupted content, and layer completeness.');
  console.log('Note: [PLACEHOLDER_*] bracket markers are allowed at silver tier.\n');

  let allPassed = true;
  for (const book of booksToValidate) {
    const passed = validateBook(book);
    if (!passed) allPassed = false;
  }

  console.log('\n' + (allPassed
    ? '✓ All books passed validation — ready for promote_to_gold.js'
    : '✗ Some books failed — fix errors before promoting to Gold'));
  process.exit(allPassed ? 0 : 1);
}

main();
