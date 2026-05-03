#!/usr/bin/env node
/**
 * SCHOLAR-004: Scholar Bhāṣya parser scaffold
 *
 * Reusable streaming parser that consumes a bronze source file and
 * emits per-chapter silver shards in NVF format, stamped with scholar
 * metadata from lib/scholars.ts. Built to be re-runnable as soon as
 * a bronze file lands — does not require the network.
 *
 * Supports two bronze source formats:
 *   - GRETIL TEI XML / HTML (Sanskrit Bhāṣyas — Śaṅkara, Rāmānuja,
 *     Madhva, Abhinavagupta)
 *   - Plain-text / paragraph-tagged HTML (Tilak Marathi/EN,
 *     Aurobindo EN, Gandhi HI/GU)
 *
 * Usage:
 *   node scripts/parse_scholar_bhasya.js \
 *     --scholar adi-shankara \
 *     --book bhagavad-gita \
 *     --bronze data/1-bronze/sankara-gita-bhasya.html \
 *     --format gretil-tei \
 *     [--dry-run]
 *
 * Output: data/2-silver/{book}/scholar-{scholar-id}-chapter-N.json
 *         (one file per chapter; merged into existing chapter shards
 *         by a separate enrichment step — this script writes the
 *         scholar layer in isolation, not the full chapter shard)
 *
 * Exit codes: 0 = parse complete, 1 = error (bronze missing,
 *             scholar not in registry, format unrecognised, etc.)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Read scholar metadata via a runtime-safe load of the compiled JSON
// description. lib/scholars.ts is TypeScript; the runtime registry is
// duplicated here to avoid forcing ts-node at parse-time. Keep in sync
// with lib/scholars.ts via a CI check (TODO in audit_standards.js).
const SCHOLAR_METADATA = {
  'adi-shankara': {
    author: 'adi-shankara',
    author_name: 'Ādi Śaṅkarācārya',
    author_label: 'Advaita Vedānta — 8th century CE — Gītā Bhāṣya',
    primaryLanguage: 'sa',
    singleLanguage: false,
  },
  'ramanuja': {
    author: 'ramanuja',
    author_name: 'Rāmānuja',
    author_label: 'Viśiṣṭādvaita — 11th–12th century CE — Gītā Bhāṣya',
    primaryLanguage: 'sa',
    singleLanguage: true,
  },
  'madhva': {
    author: 'madhva',
    author_name: 'Madhvācārya',
    author_label: 'Dvaita — 13th–14th century CE — Gītā Bhāṣya',
    primaryLanguage: 'sa',
    singleLanguage: true,
  },
  'abhinavagupta': {
    author: 'abhinavagupta',
    author_name: 'Abhinavagupta',
    author_label: 'Kashmir Śaiva (Trika) — 10th–11th century CE — Gītārtha-saṅgraha',
    primaryLanguage: 'sa',
    singleLanguage: true,
  },
  'tilak-gita-rahasya': {
    author: 'tilak-gita-rahasya',
    author_name: 'Bal Gangādhar Tilak',
    author_label: 'Karma-yoga modern — 1915 — Gītā Rahasya',
    primaryLanguage: 'mr',
    singleLanguage: false,
  },
  'sri-aurobindo': {
    author: 'sri-aurobindo',
    author_name: 'Sri Aurobindo',
    author_label: 'Integral Yoga — 1922 — Essays on the Gītā',
    primaryLanguage: 'en',
    singleLanguage: false,
  },
  'gandhi-anasakti-yoga': {
    author: 'gandhi-anasakti-yoga',
    author_name: 'Mahatma Gandhi',
    author_label: 'Karma-yoga modern — 1929 — Anāsakti-yoga',
    primaryLanguage: 'gu',
    singleLanguage: false,
  },
  'gita-press-gorakhpur': {
    author: 'gita-press-gorakhpur',
    author_name: 'Gita Press Gorakhpur',
    author_label: 'Sanātana synthesis — 1923+ — Śrīmadbhagavadgītā (Goyandka HI)',
    primaryLanguage: 'hi',
    singleLanguage: false,
  },
};

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1];
      if (val !== undefined && !val.startsWith('--')) {
        args[key] = val;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

// Format-specific extractors. Each returns an array of
// { chapter, verse, content } records. Streaming where possible.
const EXTRACTORS = {
  'gretil-tei': async function extractGretil(bronzePath) {
    // Streaming line-based scan for verse markers in GRETIL TEI/HTML.
    // GRETIL convention: <div type="adhyaya" n="N"> ... <l n="V">text</l>
    // The script collects text between markers without building a DOM.
    const stream = fs.createReadStream(bronzePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

    const records = [];
    let currentChapter = null;
    let currentVerse = null;
    let currentText = [];

    const flush = () => {
      if (currentChapter !== null && currentVerse !== null && currentText.length) {
        records.push({
          chapter: currentChapter,
          verse: currentVerse,
          content: currentText.join(' ').replace(/\s+/g, ' ').trim(),
        });
      }
      currentText = [];
      currentVerse = null;
    };

    for await (const line of rl) {
      const chMatch = line.match(/type=["']adhyaya["']\s+n=["'](\d+)["']/);
      if (chMatch) { flush(); currentChapter = Number(chMatch[1]); continue; }
      const verseMatch = line.match(/<l\s+n=["'](\d+)["']>(.*?)<\/l>/);
      if (verseMatch) {
        flush();
        currentVerse = Number(verseMatch[1]);
        currentText.push(verseMatch[2].replace(/<[^>]+>/g, ''));
        flush();
        continue;
      }
      // continuation line within an open <l>
      if (currentVerse !== null && !line.includes('<')) {
        currentText.push(line.trim());
      }
    }
    flush();
    return records;
  },

  'plain-paragraph': async function extractPlain(bronzePath) {
    // For Tilak / Aurobindo / Gandhi style HTML where each commentary
    // block is a paragraph following a "Verse N." heading.
    const stream = fs.createReadStream(bronzePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
    const records = [];
    let currentChapter = null;
    let currentVerse = null;
    let buffer = [];

    const flush = () => {
      if (currentChapter !== null && currentVerse !== null && buffer.length) {
        const content = buffer.join(' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (content.length >= 80) {
          records.push({ chapter: currentChapter, verse: currentVerse, content });
        }
      }
      buffer = [];
    };

    for await (const line of rl) {
      const chap = line.match(/Chapter\s+(\d+)|Adhyaya\s+(\d+)|अध्याय\s+(\d+)/);
      if (chap) {
        flush();
        currentChapter = Number(chap[1] ?? chap[2] ?? chap[3]);
        currentVerse = null;
        continue;
      }
      const verse = line.match(/(?:Verse|Sloka|Shloka|श्लोक)\s+(\d+)/);
      if (verse) {
        flush();
        currentVerse = Number(verse[1]);
        continue;
      }
      if (currentVerse !== null) buffer.push(line);
    }
    flush();
    return records;
  },
};

async function main() {
  const args = parseArgs(process.argv);
  if (!args.scholar) fail('Missing --scholar (e.g. --scholar adi-shankara)');
  if (!args.book) fail('Missing --book (e.g. --book bhagavad-gita)');
  if (!args.bronze) fail('Missing --bronze <path>');
  if (!args.format) fail('Missing --format (gretil-tei | plain-paragraph)');

  const scholar = SCHOLAR_METADATA[args.scholar];
  if (!scholar) fail(`Unknown scholar: ${args.scholar}. Known: ${Object.keys(SCHOLAR_METADATA).join(', ')}`);

  const extractor = EXTRACTORS[args.format];
  if (!extractor) fail(`Unknown format: ${args.format}. Known: ${Object.keys(EXTRACTORS).join(', ')}`);

  if (!fs.existsSync(args.bronze)) fail(`Bronze file not found: ${args.bronze}`);

  console.log(`SCHOLAR-004 parser`);
  console.log(`  scholar: ${scholar.author_name} (${args.scholar})`);
  console.log(`  book:    ${args.book}`);
  console.log(`  bronze:  ${args.bronze}`);
  console.log(`  format:  ${args.format}`);
  console.log(`  lang:    ${scholar.primaryLanguage}${scholar.singleLanguage ? ' (single-language)' : ''}`);

  const records = await extractor(args.bronze);
  console.log(`\n  extracted ${records.length} verse records`);

  if (records.length === 0) {
    console.warn('  ⚠ no records extracted — verify bronze format matches --format');
    process.exit(1);
  }

  // group by chapter
  const byChapter = {};
  for (const r of records) {
    if (!byChapter[r.chapter]) byChapter[r.chapter] = [];
    byChapter[r.chapter].push(r);
  }

  const outDir = path.join(__dirname, '..', 'data', '2-silver', args.book);
  if (!args['dry-run']) fs.mkdirSync(outDir, { recursive: true });

  for (const [chapter, verses] of Object.entries(byChapter)) {
    const layer = {
      author: scholar.author,
      author_name: scholar.author_name,
      author_label: scholar.author_label,
      lang: scholar.primaryLanguage,
      type: 'commentary',
      ...(scholar.singleLanguage ? { single_language: true } : {}),
    };
    const shard = {
      _scholar_layer_only: true,
      _note: `SCHOLAR-004 parser output. To merge into the chapter's main silver shard, run scripts/enrich_chapter_with_scholar.js (TODO).`,
      scholar: scholar.author,
      chapter: Number(chapter),
      verses: verses.map(v => ({
        id: `${args.book}-${chapter}-${v.verse}-${scholar.author}`,
        verse: v.verse,
        layer: { ...layer, content: v.content },
      })),
    };
    const outFile = path.join(outDir, `scholar-${scholar.author}-chapter-${chapter}.json`);
    if (args['dry-run']) {
      console.log(`  [dry-run] would write ${outFile} (${verses.length} verses)`);
    } else {
      fs.writeFileSync(outFile, JSON.stringify(shard, null, 2), 'utf-8');
      console.log(`  ✓ wrote ${outFile} (${verses.length} verses)`);
    }
  }

  console.log(`\n  Done. Next: run scripts/validate_silver.js ${args.book} to verify NVF compliance.`);
}

main().catch(e => { console.error(e); process.exit(1); });
