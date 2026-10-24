import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { VishwaVaniEngine } from '@/lib/engine/orchestrator';
import type { BookSpec, RawVerseInput, PipelineResult } from '@/lib/engine/types';
import { COMPLETED_BOOKS_SLUGS, VEDIC_LIBRARY } from '@/lib/texts';

export async function GET() {
  try {
    const specsDir = path.join(process.cwd(), 'data', 'specs');
    let candidateSpecs: Array<{ slug: string; name: string; category: string; chapters: number; existsInGold: boolean }> = [];

    if (fs.existsSync(specsDir)) {
      const files = fs.readdirSync(specsDir).filter(f => f.endsWith('.json'));
      candidateSpecs = files.map(file => {
        try {
          const raw = fs.readFileSync(path.join(specsDir, file), 'utf8');
          const data = JSON.parse(raw);
          const s: BookSpec = data.spec || data;
          const isGold = (COMPLETED_BOOKS_SLUGS as readonly string[]).includes(s.slug);
          return {
            slug: s.slug,
            name: s.name,
            category: s.category,
            chapters: s.totalChapters,
            existsInGold: isGold,
          };
        } catch {
          return null;
        }
      }).filter((item): item is NonNullable<typeof item> => item !== null);
    }

    // Check lake database
    const lakePath = path.join(process.cwd(), 'public', 'vedic-lake.db');
    const lakeExists = fs.existsSync(lakePath);
    let lakeSizeMb = 0;
    if (lakeExists) {
      lakeSizeMb = Math.round((fs.statSync(lakePath).size / (1024 * 1024)) * 10) / 10;
    }

    return NextResponse.json({
      status: 'active',
      completedBooksCount: COMPLETED_BOOKS_SLUGS.length,
      completedSlugs: COMPLETED_BOOKS_SLUGS,
      candidateBooks: candidateSpecs,
      totalVedicLibraryCount: VEDIC_LIBRARY.length,
      lake: {
        exists: lakeExists,
        filename: 'vedic-lake.db',
        sizeMb: lakeSizeMb,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const terminalLogs: string[] = [];
  const log = (msg: string) => {
    const timestamp = new Date().toISOString().substring(11, 23);
    terminalLogs.push(`[${timestamp}] ${msg}`);
  };

  try {
    const body = await request.json().catch(() => ({}));
    const slug: string | undefined = body.slug;
    const slugs: string[] | undefined = body.slugs;
    const isDryRun: boolean = body.dryRun ?? false;
    const maxRetries: number = body.maxRetries ?? 3;

    const targetSlugs: string[] = [];
    if (Array.isArray(slugs) && slugs.length > 0) {
      targetSlugs.push(...slugs);
    } else if (typeof slug === 'string' && slug.trim().length > 0) {
      targetSlugs.push(slug.trim());
    } else {
      return NextResponse.json(
        { error: 'Please specify a scripture "slug" or array of "slugs" to onboard.' },
        { status: 400 }
      );
    }

    log(`======================================================================`);
    log(`☸ VISHWA-VANI UNIVERSAL AUTONOMOUS ONBOARDING ENGINE v2.0`);
    log(`Execution Target: ${targetSlugs.join(', ')} | Mode: ${isDryRun ? 'DRY-RUN' : 'LIVE GOLD ELEVATION'}`);
    log(`======================================================================`);

    const engine = new VishwaVaniEngine({ rootDir: process.cwd() });
    const results: PipelineResult[] = [];

    for (const targetSlug of targetSlugs) {
      log(`----------------------------------------------------------------------`);
      log(`▶ INITIATING ONBOARDING: ${targetSlug}`);
      log(`----------------------------------------------------------------------`);

      const specFile = path.join(process.cwd(), 'data', 'specs', `${targetSlug}.json`);
      let spec: BookSpec;
      let rawVerses: RawVerseInput[] | undefined;

      if (fs.existsSync(specFile)) {
        log(`✓ Spec discovered in data/specs/${targetSlug}.json`);
        const parsed = JSON.parse(await fs.promises.readFile(specFile, 'utf8'));
        spec = parsed.spec || parsed;
        rawVerses = parsed.rawVerses;
      } else {
        log(`⚠ Spec file not found. Generating default canonical spec for '${targetSlug}'...`);
        spec = {
          slug: targetSlug,
          name: targetSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          nameDevanagari: targetSlug,
          nameHi: targetSlug,
          nameMr: targetSlug,
          category: 'other',
          totalChapters: 1,
          description: `Canonical scripture ${targetSlug}`,
          chapterNames: { '1': `${targetSlug} Chapter 1` },
        };
      }

      const result = await engine.processBookEndToEnd(spec, rawVerses, {
        dryRun: isDryRun,
        autoPromote: !isDryRun,
        syncToLake: !isDryRun,
        extractDiamondTier: true,
        maxRetries,
        onProgress: (message: string) => {
          log(message);
        },
      });

      results.push(result);

      if (result.success) {
        log(`✓ SUCCESS: ${targetSlug} elevated to Gold! Verses: ${result.totalVerses}, Shards: ${result.shardsCount}, Tokens: ${result.extractedTokensCount || 0}`);
      } else {
        log(`✗ FAILURE: ${targetSlug} encountered quality gate block: ${result.error}`);
      }
    }

    log(`======================================================================`);
    const successfulCount = results.filter(r => r.success).length;
    log(`🏁 BATCH COMPLETE: ${successfulCount}/${results.length} Scriptures successfully promoted.`);
    log(`======================================================================`);

    return NextResponse.json({
      success: successfulCount === results.length,
      successfulCount,
      totalRequested: results.length,
      results,
      terminalLogs,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    log(`CRITICAL ENGINE EXCEPTION: ${errorMsg}`);
    return NextResponse.json({
      success: false,
      error: errorMsg,
      terminalLogs,
    }, { status: 500 });
  }
}
