#!/usr/bin/env node
/**
 * PIPE-001: Generic Silver-tier NVF Validator
 *
 * Usage:
 *   node scripts/validate_silver.js <book-slug>
 *   node scripts/validate_silver.js bhagavad-gita
 *   node scripts/validate_silver.js --all
 *
 * Exit codes: 0 = pass, 1 = failures found
 */

const fs = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────

const SILVER_DIR = path.join(__dirname, '..', 'data', '2-silver');
const MIN_COMMENTARY_LENGTH = 20;
const PLACEHOLDER_PATTERNS = [
  /^\[/,                     // any content starting with [
  /\[PLACEHOLDER_/i,
  /TBD_CONTENT/i,
  /TODO_LAYER/i,
  /LOREM IPSUM/i,
  /^\[SANSKRIT_/i,
  /^\[SUTRA_/i,
];

// ── NVF Required Fields ───────────────────────────────────────────────────────

const REQUIRED_VERSE_FIELDS = ['id', 'original', 'verse'];
const OPTIONAL_VERSE_FIELDS = ['transliteration', 'translation', 'meaning', 'layers'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isPlaceholder(str) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  return PLACEHOLDER_PATTERNS.some(p => p.test(trimmed));
}

function isValidContent(str) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (trimmed.length < MIN_COMMENTARY_LENGTH) return false;
  return !isPlaceholder(trimmed);
}

function validateVerse(verse, bookSlug, chapterNum) {
  const errors = [];
  const verseId = verse.id || `${bookSlug}_${chapterNum}_${verse.verse ?? '?'}`;

  // Required fields
  for (const field of REQUIRED_VERSE_FIELDS) {
    if (verse[field] === undefined || verse[field] === null || verse[field] === '') {
      errors.push(`${verseId}: missing required field '${field}'`);
    }
  }

  // original must not be placeholder
  if (verse.original && isPlaceholder(verse.original)) {
    errors.push(`${verseId}: 'original' is a placeholder: ${String(verse.original).slice(0, 60)}`);
  }

  // transliteration must not be placeholder when present
  if (verse.transliteration && isPlaceholder(verse.transliteration)) {
    errors.push(`${verseId}: 'transliteration' is a placeholder`);
  }

  // layers validation
  if (!verse.layers || !Array.isArray(verse.layers) || verse.layers.length === 0) {
    errors.push(`${verseId}: has no layers (at least 1 EN layer required)`);
  } else {
    const enLayers = verse.layers.filter(l => l.lang === 'en');
    if (enLayers.length === 0) {
      errors.push(`${verseId}: no English (lang:'en') layer found`);
    }

    let validLayerCount = 0;
    for (const layer of verse.layers) {
      if (!layer.author) {
        errors.push(`${verseId}: layer missing 'author' field`);
        continue;
      }
      if (!layer.lang) {
        errors.push(`${verseId}: layer from '${layer.author}' missing 'lang' field`);
      }
      if (!layer.content) {
        errors.push(`${verseId}: layer from '${layer.author}' has no 'content'`);
      } else if (isPlaceholder(layer.content)) {
        errors.push(`${verseId}: layer from '${layer.author}' (${layer.lang}) is a placeholder`);
      } else if (!isValidContent(layer.content)) {
        errors.push(`${verseId}: layer from '${layer.author}' content too short (${String(layer.content).trim().length} chars)`);
      } else {
        validLayerCount++;
      }
    }

    if (validLayerCount === 0) {
      errors.push(`${verseId}: all layers are invalid/placeholder — no real content`);
    }
  }

  return errors;
}

function validateFile(filePath, bookSlug, chapterNum) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
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

  let totalVerses = 0;
  let totalErrors = [];
  let filesWithErrors = 0;

  console.log(`\n── Validating ${bookSlug} (${files.length} file(s)) ──────────────────`);

  for (const file of files) {
    const filePath = path.join(bookDir, file);
    const chapterMatch = file.match(/(\d+)/);
    const chapterNum = chapterMatch ? parseInt(chapterMatch[1]) : 0;

    const { errors, verseCount } = validateFile(filePath, bookSlug, chapterNum);
    totalVerses += verseCount;

    if (errors.length > 0) {
      filesWithErrors++;
      console.log(`  ✗ ${file} (${verseCount} verses, ${errors.length} errors)`);
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
      fs.readdirSync(SILVER_DIR).forEach(b => console.log(`  ${b}`));
    }
    process.exit(0);
  }

  const booksToValidate = args[0] === '--all'
    ? fs.readdirSync(SILVER_DIR).filter(b => fs.statSync(path.join(SILVER_DIR, b)).isDirectory())
    : args;

  console.log('PIPE-001: validate_silver.js');
  console.log('Checking NVF compliance, placeholder content, and layer completeness.');

  let allPassed = true;
  for (const book of booksToValidate) {
    const passed = validateBook(book);
    if (!passed) allPassed = false;
  }

  console.log('\n' + (allPassed ? '✓ All books passed validation' : '✗ Some books failed — fix errors before promoting to Gold'));
  process.exit(allPassed ? 0 : 1);
}

main();
