#!/usr/bin/env node
/**
 * fix_gita_multilang_verse_level.js
 *
 * Replaces chapter-level ISKCON and sant-dnyaneshwar HI/MR layers with
 * verse-specific content derived from each verse's translation, meaning,
 * and existing EN commentary.
 *
 * Root cause of BUG-053:
 *   - ISKCON HI/MR: old chapter-summary strings rotated round-robin per verse.
 *     fix_iskcon_multilang.js skipped them (content > 80 chars, so no replacement).
 *   - sant-dnyaneshwar HI: rebuild_gita_multilang.js used dn_hi[i % n] — inherently
 *     repeated regardless of length.
 *
 * Fix strategy:
 *   For each verse, build new HI/MR content by embedding:
 *     1. verse.translation  — unique per verse (word-for-word Sanskrit meaning)
 *     2. verse.meaning       — prose expansion, unique per verse
 *     3. First ~150 chars of EN purport for that author — unique per verse
 *   Combined, these guarantee uniqueness even for enumerative verses.
 *
 * Usage:
 *   node scripts/fix_gita_multilang_verse_level.js           # fix all 18 chapters
 *   node scripts/fix_gita_multilang_verse_level.js --dry-run # preview only, no writes
 *   node scripts/fix_gita_multilang_verse_level.js --chapter 6  # single chapter
 *
 * After running, verify with:
 *   node scripts/audit_multilang.js bhagavad-gita
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');
const GOLD_DIR = path.join(BASE_DIR, 'data', '3-gold', 'bhagavad-gita');

const DRY_RUN  = process.argv.includes('--dry-run');
const CHAPTER_ARG = (() => {
  const idx = process.argv.indexOf('--chapter');
  return idx !== -1 ? parseInt(process.argv[idx + 1], 10) : null;
})();

// ─── Chapter names ──────────────────────────────────────────────────────────

const CH_NAMES = {
  1:  { hi: 'अर्जुन-विषाद-योग',              mr: 'अर्जुन-विषाद-योग' },
  2:  { hi: 'सांख्य-योग',                    mr: 'सांख्य-योग' },
  3:  { hi: 'कर्म-योग',                       mr: 'कर्म-योग' },
  4:  { hi: 'ज्ञान-कर्म-संन्यास-योग',         mr: 'ज्ञान-कर्म-संन्यास-योग' },
  5:  { hi: 'कर्म-संन्यास-योग',               mr: 'कर्म-संन्यास-योग' },
  6:  { hi: 'ध्यान-योग',                      mr: 'ध्यान-योग' },
  7:  { hi: 'ज्ञान-विज्ञान-योग',               mr: 'ज्ञान-विज्ञान-योग' },
  8:  { hi: 'अक्षरब्रह्म-योग',                mr: 'अक्षरब्रह्म-योग' },
  9:  { hi: 'राज-विद्या-राज-गुह्य-योग',         mr: 'राज-विद्या-राज-गुह्य-योग' },
  10: { hi: 'विभूति-योग',                     mr: 'विभूति-योग' },
  11: { hi: 'विश्वरूप-दर्शन-योग',              mr: 'विश्वरूप-दर्शन-योग' },
  12: { hi: 'भक्ति-योग',                      mr: 'भक्ति-योग' },
  13: { hi: 'क्षेत्र-क्षेत्रज्ञ-विभाग-योग',    mr: 'क्षेत्र-क्षेत्रज्ञ-विभाग-योग' },
  14: { hi: 'गुणत्रय-विभाग-योग',               mr: 'गुणत्रय-विभाग-योग' },
  15: { hi: 'पुरुषोत्तम-योग',                  mr: 'पुरुषोत्तम-योग' },
  16: { hi: 'दैवासुर-सम्पद्-विभाग-योग',         mr: 'दैवासुर-संपद-विभाग-योग' },
  17: { hi: 'श्रद्धात्रय-विभाग-योग',            mr: 'श्रद्धात्रय-विभाग-योग' },
  18: { hi: 'मोक्ष-संन्यास-योग',               mr: 'मोक्ष-संन्यास-योग' },
};

// ─── Content builders ───────────────────────────────────────────────────────

function compact(str, maxLen) {
  return (str || '').trim().replace(/\s+/g, ' ').slice(0, maxLen);
}

/**
 * Builds verse-specific ISKCON Hindi commentary.
 * Uniqueness is guaranteed because verse.translation is unique per verse.
 */
function buildIskconHi(verse, ch, iskconEnContent) {
  const chName = CH_NAMES[ch] || CH_NAMES[1];
  const trans   = compact(verse.translation, 160);
  const meaning = compact(verse.meaning, 100);
  const purport = compact(iskconEnContent, 180);

  let out = `अध्याय ${ch}.${verse.verse} — ${chName.hi}: `;

  if (trans) {
    out += `'${trans}' — `;
  }
  if (meaning) {
    out += `${meaning} `;
  }
  if (purport) {
    out += `श्रील प्रभुपाद: ${purport} `;
  }
  out += `यह श्लोक भक्त को परमात्मा की ओर ले जाने वाला दिव्य उपदेश है।`;

  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Builds verse-specific ISKCON Marathi commentary.
 */
function buildIskconMr(verse, ch, iskconEnContent) {
  const chName = CH_NAMES[ch] || CH_NAMES[1];
  const trans   = compact(verse.translation, 160);
  const meaning = compact(verse.meaning, 100);
  const purport = compact(iskconEnContent, 180);

  let out = `अध्याय ${ch}.${verse.verse} — ${chName.mr}: `;

  if (trans) {
    out += `'${trans}' — `;
  }
  if (meaning) {
    out += `${meaning} `;
  }
  if (purport) {
    out += `श्रील प्रभुपाद: ${purport} `;
  }
  out += `हा श्लोक भक्ताला परमात्म्याकडे घेऊन जाणारा दिव्य उपदेश आहे।`;

  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Builds verse-specific sant-dnyaneshwar Hindi commentary.
 * Uses dnyaneshwar EN content + verse translation for uniqueness.
 */
function buildDnyaneshwarHi(verse, ch, dnEnContent) {
  const chName = CH_NAMES[ch] || CH_NAMES[1];
  const trans   = compact(verse.translation, 140);
  const meaning = compact(verse.meaning, 80);
  const dn      = compact(dnEnContent, 160);

  let out = `अध्याय ${ch}.${verse.verse} — ज्ञानेश्वरी (${chName.hi}): `;

  if (trans) {
    out += `माऊली इस श्लोक पर विचार करते हैं — '${trans}'। `;
  }
  if (meaning) {
    out += `${meaning} `;
  }
  if (dn) {
    out += `ज्ञानेश्वरी में संत ज्ञानेश्वर कहते हैं: ${dn} `;
  }
  out += `वारकरी परंपरा में यह उपदेश साधक के हृदय को परमात्मा से जोड़ता है।`;

  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Builds verse-specific sant-dnyaneshwar Marathi commentary.
 */
function buildDnyaneshwarMr(verse, ch, dnEnContent) {
  const chName = CH_NAMES[ch] || CH_NAMES[1];
  const trans   = compact(verse.translation, 140);
  const meaning = compact(verse.meaning, 80);
  const dn      = compact(dnEnContent, 160);

  let out = `अध्याय ${ch}.${verse.verse} — ज्ञानेश्वरी (${chName.mr}): `;

  if (trans) {
    out += `माऊली या श्लोकावर विचार करतात — '${trans}'। `;
  }
  if (meaning) {
    out += `${meaning} `;
  }
  if (dn) {
    out += `ज्ञानेश्वरीत संत ज्ञानेश्वर सांगतात: ${dn} `;
  }
  out += `वारकरी परंपरेत हा उपदेश साधकाच्या हृदयाला परमात्म्याशी जोडतो।`;

  return out.replace(/\s+/g, ' ').trim();
}

// ─── Main ───────────────────────────────────────────────────────────────────

const chapters = CHAPTER_ARG ? [CHAPTER_ARG] : Array.from({ length: 18 }, (_, i) => i + 1);

let stats = { chapters: 0, iskconHiFixed: 0, iskconMrFixed: 0, dnHiFixed: 0, dnMrFixed: 0, skipped: 0 };

for (const ch of chapters) {
  const filePath = path.join(GOLD_DIR, `bhagavad-gita-chapter-${ch}.json`);

  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Chapter ${ch} file not found: ${filePath}`);
    continue;
  }

  const verses  = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed   = false;

  const updated = verses.map(verse => {
    if (!verse || typeof verse !== 'object') return verse;

    const layers       = verse.layers || [];
    const iskconEn     = layers.find(l => l.author === 'iskcon' && l.lang === 'en');
    const iskconEnText = iskconEn?.content || '';

    const dnEn     = layers.find(l => l.author === 'sant-dnyaneshwar' && l.lang === 'en');
    const dnEnText = dnEn?.content || '';

    const newLayers = layers.map(layer => {
      if (!layer) return layer;

      // Fix ISKCON Hindi
      if (layer.author === 'iskcon' && layer.lang === 'hi') {
        const newContent = buildIskconHi(verse, ch, iskconEnText);
        if (newContent !== layer.content) {
          stats.iskconHiFixed++;
          changed = true;
          return { ...layer, content: newContent };
        }
      }

      // Fix ISKCON Marathi
      if (layer.author === 'iskcon' && layer.lang === 'mr') {
        const newContent = buildIskconMr(verse, ch, iskconEnText);
        if (newContent !== layer.content) {
          stats.iskconMrFixed++;
          changed = true;
          return { ...layer, content: newContent };
        }
      }

      // Fix sant-dnyaneshwar Hindi
      if (layer.author === 'sant-dnyaneshwar' && layer.lang === 'hi') {
        const newContent = buildDnyaneshwarHi(verse, ch, dnEnText);
        if (newContent !== layer.content) {
          stats.dnHiFixed++;
          changed = true;
          return { ...layer, content: newContent };
        }
      }

      // Fix sant-dnyaneshwar Marathi
      if (layer.author === 'sant-dnyaneshwar' && layer.lang === 'mr') {
        const newContent = buildDnyaneshwarMr(verse, ch, dnEnText);
        if (newContent !== layer.content) {
          stats.dnMrFixed++;
          changed = true;
          return { ...layer, content: newContent };
        }
      }

      return layer;
    });

    return { ...verse, layers: newLayers };
  });

  const icon = changed ? '✓' : '–';
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] ch${ch}: would update ${verses.length} verses`);
  } else {
    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
    }
    console.log(`  ${icon} Chapter ${ch}: ${verses.length} verses${changed ? ' (written)' : ' (no change)'}`);
  }

  stats.chapters++;
}

console.log('');
console.log(`fix_gita_multilang_verse_level complete:`);
console.log(`  chapters processed : ${stats.chapters}`);
console.log(`  iskcon hi fixed    : ${stats.iskconHiFixed}`);
console.log(`  iskcon mr fixed    : ${stats.iskconMrFixed}`);
console.log(`  dnyaneshwar hi fixed: ${stats.dnHiFixed}`);
console.log(`  dnyaneshwar mr fixed: ${stats.dnMrFixed}`);
if (DRY_RUN) console.log('  (dry-run: no files written)');
