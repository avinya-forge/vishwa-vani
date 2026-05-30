#!/usr/bin/env node
/**
 * strip_placeholders.js — Remove bracket-placeholder layers from any data tier
 *
 * Strips layers whose content:
 *   - Starts with '[' (bracket-prefix markers like [PLACEHOLDER_*], [YOGA_SUTRA_*])
 *   - Matches known filler patterns (THIS IS A GENERIC PLACEHOLDER, etc.)
 *
 * Also removes verses whose 'original' is a placeholder pattern.
 *
 * Usage:
 *   node scripts/strip_placeholders.js --tier silver [book-slug | --all]
 *   node scripts/strip_placeholders.js --tier gold [book-slug | --all]
 *   node scripts/strip_placeholders.js --tier silver --all --dry-run
 *
 * Exit codes: 0 = success, 1 = error
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');
const SILVER_DIR = path.join(BASE_DIR, 'data', '2-silver');
const GOLD_DIR = path.join(BASE_DIR, 'data', '3-gold');

const PLACEHOLDER_CONTENT_PATTERNS = [
  /^\[/,
  /THIS IS A GENERIC PLACEHOLDER/i,
  /INSERTED TO SATISFY THE MINIMUM LENGTH/i,
  /A beautiful verse demonstrating the glories of the Supreme Lord/i,
  /^Mock Verse/i,
  /^Mock Transliteration/i,
];

const PLACEHOLDER_ORIGINAL_PATTERNS = [
  /^\[SANSKRIT/i,
  /^\[ORIGINAL/i,
  /^Mock Verse/i,
];

function isPlaceholderContent(str) {
  if (!str || typeof str !== 'string') return false;
  const t = str.trim();
  return PLACEHOLDER_CONTENT_PATTERNS.some(p => p.test(t));
}

function isPlaceholderOriginal(str) {
  if (!str || typeof str !== 'string') return false;
  const t = str.trim();
  return PLACEHOLDER_ORIGINAL_PATTERNS.some(p => p.test(t));
}

function stripFile(filePath, dryRun) {
  let verses;
  try {
    verses = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`  ✗ Parse error: ${path.basename(filePath)}: ${e.message}`);
    return { changed: false, removedLayers: 0, removedVerses: 0 };
  }
  if (!Array.isArray(verses)) return { changed: false, removedLayers: 0, removedVerses: 0 };

  let removedLayers = 0;
  let removedVerses = 0;

  const cleaned = verses.filter(verse => {
    if (!verse || typeof verse !== 'object') return true;
    if (isPlaceholderOriginal(verse.original)) {
      removedVerses++;
      return false;
    }
    return true;
  }).map(verse => {
    const beforeCount = (verse.layers || []).length;
    const newLayers = (verse.layers || []).filter(l => {
      return !isPlaceholderContent(l.content);
    });
    removedLayers += (beforeCount - newLayers.length);
    return { ...verse, layers: newLayers };
  });

  const changed = removedLayers > 0 || removedVerses > 0;

  if (changed && !dryRun) {
    fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), 'utf8');
  }

  return { changed, removedLayers, removedVerses };
}

function processDir(dir, dryRun) {
  if (!fs.existsSync(dir)) return { files: 0, removedLayers: 0, removedVerses: 0 };

  const entries = fs.readdirSync(dir);
  let totalFiles = 0, totalRemovedLayers = 0, totalRemovedVerses = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const sub = processDir(fullPath, dryRun);
      totalFiles += sub.files;
      totalRemovedLayers += sub.removedLayers;
      totalRemovedVerses += sub.removedVerses;
    } else if (entry.endsWith('.json') && !entry.endsWith('.meta.json')) {
      const { changed, removedLayers, removedVerses } = stripFile(fullPath, dryRun);
      totalFiles++;
      if (changed) {
        const label = dryRun ? '[DRY-RUN]' : '✓';
        console.log(`  ${label} ${path.relative(BASE_DIR, fullPath)}: -${removedLayers} layers, -${removedVerses} verses`);
        totalRemovedLayers += removedLayers;
        totalRemovedVerses += removedVerses;
      }
    }
  }
  return { files: totalFiles, removedLayers: totalRemovedLayers, removedVerses: totalRemovedVerses };
}

function main() {
  const args = process.argv.slice(2);
  const tierIdx = args.indexOf('--tier');
  const tier = tierIdx !== -1 ? args[tierIdx + 1] : null;
  const dryRun = args.includes('--dry-run');
  const allBooks = args.includes('--all');
  const bookSlug = args.find(a => !a.startsWith('--') && a !== tier);

  if (!tier || !['silver', 'gold'].includes(tier)) {
    console.error('Usage: node scripts/strip_placeholders.js --tier <silver|gold> [book-slug | --all] [--dry-run]');
    process.exit(1);
  }

  const baseDir = tier === 'silver' ? SILVER_DIR : GOLD_DIR;

  if (!fs.existsSync(baseDir)) {
    console.error(`✗ Directory not found: ${baseDir}`);
    process.exit(1);
  }

  const books = allBooks
    ? fs.readdirSync(baseDir).filter(b => fs.statSync(path.join(baseDir, b)).isDirectory())
    : bookSlug ? [bookSlug] : [];

  if (books.length === 0) {
    console.error('✗ No books specified. Use --all or provide a book slug.');
    process.exit(1);
  }

  console.log(`strip_placeholders.js — tier:${tier}${dryRun ? ' (DRY-RUN)' : ''}`);
  console.log('');

  let grandLayers = 0, grandVerses = 0;
  for (const book of books) {
    const bookDir = path.join(baseDir, book);
    if (!fs.existsSync(bookDir)) {
      console.log(`  ✗ ${book}: directory not found`);
      continue;
    }
    console.log(`Book: ${book}`);
    const { removedLayers, removedVerses } = processDir(bookDir, dryRun);
    if (removedLayers === 0 && removedVerses === 0) {
      console.log(`  – no placeholders found`);
    } else {
      grandLayers += removedLayers;
      grandVerses += removedVerses;
    }
    console.log('');
  }

  console.log(`Total: removed ${grandLayers} placeholder layer(s), ${grandVerses} placeholder verse(s)`);
  if (dryRun) console.log('(dry-run: no files written)');
}

main();
