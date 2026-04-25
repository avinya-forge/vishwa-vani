#!/usr/bin/env node
/**
 * PIPE-002: Generic Silver → Gold Promotion Script
 *
 * Runs validate_silver.js first — refuses to promote if validation fails.
 * On success: copies shards to data/3-gold/{book}/ and updates manifest.json.
 * Works for ANY book slug — not just Bhagavad Gita.
 *
 * Usage:
 *   node scripts/promote_to_gold.js <book-slug>
 *   node scripts/promote_to_gold.js --force <book-slug>   # skip validation gate
 *
 * Exit codes: 0 = success, 1 = blocked or error
 */

'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SILVER_DIR  = path.join(__dirname, '..', 'data', '2-silver');
const GOLD_DIR    = path.join(__dirname, '..', 'data', '3-gold');
const MANIFEST    = path.join(__dirname, '..', 'data', 'manifest.json');
const VALIDATE_JS = path.join(__dirname, 'validate_silver.js');

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

function saveManifest(manifest) {
  manifest.last_audit = new Date().toISOString().split('T')[0];
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

function countVerses(filePath) {
  const data   = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const verses = Array.isArray(data) ? data : (data.verses || []);
  return verses.length;
}

function deriveChapterNumber(filename) {
  const m = filename.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function collectJsonFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      results.push(...collectJsonFiles(full).map(r => ({ ...r, rel: path.join(entry, r.rel) })));
    } else if (entry.endsWith('.json')) {
      results.push({ full, rel: entry });
    }
  }
  return results;
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
    console.log('\nStep 1: Running PIPE-001 validation gate (validate_silver.js)...');
    try {
      execFileSync('node', [VALIDATE_JS, bookSlug], { stdio: 'inherit' });
      console.log('  ✓ Validation passed');
    } catch {
      console.error('\n✗ BLOCKED: Validation failed. Fix all errors before promoting.');
      console.error('  To skip the gate (not recommended for production): --force');
      process.exit(1);
    }
  } else {
    console.log('\nStep 1: Validation gate SKIPPED (--force flag — do not use on production data)');
  }

  // ── Step 2: Copy shards to Gold ────────────────────────────────────────────
  console.log('\nStep 2: Copying shards to Gold tier...');
  const goldBookDir = path.join(GOLD_DIR, bookSlug);
  if (!fs.existsSync(goldBookDir)) {
    fs.mkdirSync(goldBookDir, { recursive: true });
    console.log(`  Created: ${goldBookDir}`);
  }

  const silverFiles = collectJsonFiles(silverBookDir);
  const chapterMeta = [];

  for (const { full: src, rel } of silverFiles) {
    const dest = path.join(goldBookDir, rel);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);

    const verseCount  = countVerses(dest);
    const chapterNum  = deriveChapterNumber(rel);

    if (chapterNum !== null && !rel.endsWith('.meta.json')) {
      chapterMeta.push({ number: chapterNum, file: rel, verse_count: verseCount });
      console.log(`  ✓ ${rel} (${verseCount} verses)`);
    } else {
      console.log(`  ✓ ${rel} (metadata)`);
    }
  }

  // ── Step 3: Update manifest.json ──────────────────────────────────────────
  console.log('\nStep 3: Updating manifest.json...');
  const manifest     = loadManifest();
  const existing     = manifest.books.find(b => b.book_id === bookSlug);
  const totalVerses  = chapterMeta.reduce((sum, c) => sum + c.verse_count, 0);
  const sortedChapters = chapterMeta.sort((a, b) => a.number - b.number);

  const entry = {
    book_id: bookSlug,
    total_chapters: sortedChapters.length,
    total_verses: totalVerses,
    chapters: sortedChapters,
    completeness_score: 100,
    status: 'GOLD',
    last_promoted: new Date().toISOString().split('T')[0],
    ...(existing?.title    ? { title: existing.title }       : {}),
    ...(existing?.authors  ? { authors: existing.authors }   : {}),
    ...(existing?.languages ? { languages: existing.languages } : {}),
  };

  if (existing) {
    Object.assign(existing, entry);
    console.log(`  Updated manifest entry for ${bookSlug}`);
  } else {
    manifest.books.push(entry);
    console.log(`  Added manifest entry for ${bookSlug}`);
  }

  saveManifest(manifest);

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log(`\n✓ ${bookSlug} promoted to Gold tier`);
  console.log(`  ${totalVerses} total verses across ${sortedChapters.length} chapter(s)`);
  console.log(`\nNext steps:`);
  console.log(`  1. node scripts/audit_gold.js ${bookSlug}`);
  console.log(`  2. node scripts/audit_standards.js ${bookSlug}`);
  console.log(`  3. node scripts/audit_multilang.js ${bookSlug}`);
  console.log(`  4. If all pass: set available:true in lib/texts.ts and verify in reader UI`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/promote_to_gold.js [--force] <book-slug>');
    console.log('');
    console.log('Available silver books:');
    if (fs.existsSync(SILVER_DIR)) {
      fs.readdirSync(SILVER_DIR).forEach(b => {
        if (fs.statSync(path.join(SILVER_DIR, b)).isDirectory()) console.log(`  ${b}`);
      });
    }
    process.exit(0);
  }

  const force    = args[0] === '--force';
  const bookSlug = force ? args[1] : args[0];

  if (!bookSlug) {
    console.error('✗ No book slug provided');
    process.exit(1);
  }

  promoteBook(bookSlug, force);
}

main();
