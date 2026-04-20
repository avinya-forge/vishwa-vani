#!/usr/bin/env node
/**
 * PIPE-002: Generic Silver → Gold Promotion Script
 *
 * Runs validate_silver.js first — refuses to promote if validation fails.
 * On success: copies shards to data/3-gold/{book}/ and updates manifest.json.
 *
 * Usage:
 *   node scripts/promote_to_gold.js <book-slug>
 *   node scripts/promote_to_gold.js --force <book-slug>   # skip validation gate
 *
 * Exit codes: 0 = success, 1 = blocked or error
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SILVER_DIR = path.join(__dirname, '..', 'data', '2-silver');
const GOLD_DIR   = path.join(__dirname, '..', 'data', '3-gold');
const MANIFEST   = path.join(__dirname, '..', 'data', 'manifest.json');

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

function countVerses(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const verses = Array.isArray(data) ? data : (data.verses || []);
  return verses.length;
}

function deriveChapterNumber(filename) {
  // Handles patterns like: book-chapter-1.json, pada-1.json, adhyaya-001.json
  const m = filename.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// ── Core ──────────────────────────────────────────────────────────────────────

function promoteBook(bookSlug, force = false) {
  console.log(`\nPIPE-002: promote_to_gold.js — ${bookSlug}`);

  const silverBookDir = path.join(SILVER_DIR, bookSlug);
  if (!fs.existsSync(silverBookDir)) {
    console.error(`✗ Silver directory not found: ${silverBookDir}`);
    process.exit(1);
  }

  // ── Step 1: Validation gate ────────────────────────────────────────────────
  if (!force) {
    console.log('\nStep 1: Running PIPE-001 validation gate...');
    try {
      execSync(`node ${path.join(__dirname, 'validate_silver.js')} ${bookSlug}`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });
    } catch {
      console.error('\n✗ BLOCKED: Validation failed. Fix all errors before promoting.');
      console.error('  To skip the gate (not recommended): --force');
      process.exit(1);
    }
  } else {
    console.log('\nStep 1: Validation gate SKIPPED (--force)');
  }

  // ── Step 2: Copy shards to Gold ────────────────────────────────────────────
  console.log('\nStep 2: Copying shards to Gold tier...');
  const goldBookDir = path.join(GOLD_DIR, bookSlug);
  if (!fs.existsSync(goldBookDir)) {
    fs.mkdirSync(goldBookDir, { recursive: true });
    console.log(`  Created: ${goldBookDir}`);
  }

  const silverFiles = fs.readdirSync(silverBookDir)
    .filter(f => f.endsWith('.json'))
    .sort();

  const chapterMeta = [];

  for (const file of silverFiles) {
    const src  = path.join(silverBookDir, file);
    const dest = path.join(goldBookDir, file);
    fs.copyFileSync(src, dest);

    const verseCount = countVerses(dest);
    const chapterNum = deriveChapterNumber(file);

    if (chapterNum !== null && !file.endsWith('.meta.json')) {
      chapterMeta.push({ number: chapterNum, file, verse_count: verseCount });
      console.log(`  ✓ ${file} (${verseCount} verses) → ${dest}`);
    } else {
      console.log(`  ✓ ${file} (metadata) → ${dest}`);
    }
  }

  // ── Step 3: Update manifest.json ──────────────────────────────────────────
  console.log('\nStep 3: Updating manifest.json...');
  const manifest = loadManifest();

  const existing = manifest.books.find(b => b.book_id === bookSlug);
  const totalVerses = chapterMeta.reduce((sum, c) => sum + c.verse_count, 0);
  const sortedChapters = chapterMeta.sort((a, b) => a.number - b.number);

  const entry = {
    book_id: bookSlug,
    total_chapters: sortedChapters.length,
    total_verses: totalVerses,
    chapters: sortedChapters,
    completeness_score: 100,
    status: 'GOLD',
    last_promoted: new Date().toISOString().split('T')[0],
    ...(existing && existing.title ? { title: existing.title } : {}),
    ...(existing && existing.authors ? { authors: existing.authors } : {}),
    ...(existing && existing.languages ? { languages: existing.languages } : {}),
  };

  if (existing) {
    Object.assign(existing, entry);
    console.log(`  Updated existing manifest entry for ${bookSlug}`);
  } else {
    manifest.books.push(entry);
    console.log(`  Added new manifest entry for ${bookSlug}`);
  }

  saveManifest(manifest);

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log(`\n✓ ${bookSlug} promoted to Gold`);
  console.log(`  ${totalVerses} total verses across ${sortedChapters.length} chapter(s)`);
  console.log(`\nNext steps:`);
  console.log(`  1. Update lib/texts.ts: set storage:'json' for ${bookSlug} (keep available:false)`);
  console.log(`  2. Run full test suite: npm test`);
  console.log(`  3. After tests pass: set available:true and test in reader UI`);
  console.log(`  4. Run: node scripts/audit_gold.js ${bookSlug}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/promote_to_gold.js [--force] <book-slug>');
    console.log('');
    console.log('Available silver books:');
    if (fs.existsSync(SILVER_DIR)) {
      fs.readdirSync(SILVER_DIR).forEach(b => console.log(`  ${b}`));
    }
    process.exit(0);
  }

  const force = args[0] === '--force';
  const bookSlug = force ? args[1] : args[0];

  if (!bookSlug) {
    console.error('✗ No book slug provided');
    process.exit(1);
  }

  promoteBook(bookSlug, force);
}

main();
