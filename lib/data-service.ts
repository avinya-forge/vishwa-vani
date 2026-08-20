/**
 * Vishwa-Vani: AI-Enhanced Data Service Layer
 *
 * This service provides structured, AI-enriched data access for optimal UI rendering.
 * It abstracts data loading complexity and adds contextual intelligence.
 */

import fs from 'fs';
import path from 'path';
import type { VedicText } from './texts';
import { VEDIC_LIBRARY } from './texts';
import { getVersesFromLakeServer } from './server-lake';
import type { NVFLayer, NVFVerse } from '../types/nvf';

export interface EnrichedVerse extends Omit<NVFVerse, 'layers'> {
  layers: NVFLayer[];
  // AI-enriched fields
  aiContext?: {
    themes: string[];
    philosophicalDepth: number;
    crossReferences: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    emotionalTone: string;
  };
  uiMetadata?: {
    readingTime: number; // in minutes
    complexityScore: number;
    hasCommentary: boolean;
    languageCount: number;
  };
}

export interface ChapterData {
  metadata: VedicText;
  verses: EnrichedVerse[];
  navigation: {
    prevChapter?: { slug: string; title: string };
    nextChapter?: { slug: string; title: string };
    totalChapters: number;
    currentChapter: number;
  };
  aiInsights?: {
    chapterSummary: string;
    keyThemes: string[];
    philosophicalProgression: string;
  };
}

export class VedicDataService {
  private static instance: VedicDataService;
  private dataCache: Map<string, ChapterData> = new Map();

  private constructor() {}

  public static getInstance(): VedicDataService {
    if (!VedicDataService.instance) {
      VedicDataService.instance = new VedicDataService();
    }
    return VedicDataService.instance;
  }

  // Pre-validate JSON payload integrity
  private isBookGoldTier(textSlug: string, storageStrategy: string = 'json'): boolean {
    // If it's lake-based (like Mahabharata), the data presence itself is the gate
    if (storageStrategy === 'lake') return true;

    try {
      const manifestPath = path.join(process.cwd(), 'data', 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const bookManifest = manifest.books.find((b: Record<string, unknown>) => b.book_id === textSlug || b.slug === textSlug);

      return !!bookManifest && bookManifest.status === "GOLD";
    } catch {
      return false;
    }
  }

  // Limit Max 2 Authors globally to prevent over-fetching
  private prunePayload(verses: EnrichedVerse[]): EnrichedVerse[] {
    return verses.map(verse => {
      const allowedAuthors = new Set<string>();
      const prunedLayers: NVFLayer[] = [];

      for (const layer of verse.layers) {
        if (!layer.author) {
          prunedLayers.push(layer as unknown as NVFLayer);
          continue;
        }

        if (allowedAuthors.has(layer.author)) {
          prunedLayers.push(layer as unknown as NVFLayer);
        } else if (allowedAuthors.size < 2) {
          allowedAuthors.add(layer.author);
          prunedLayers.push(layer as unknown as NVFLayer);
        }
      }
      return { ...verse, layers: prunedLayers };
    });
  }

  public async getEnrichedVerse(textSlug: string, chapterNumber: number, verseNumber: number | string, options?: { adhyaya?: number }): Promise<EnrichedVerse | null> {
      const chapterData = await this.getChapterData(textSlug, chapterNumber, options);
      if (!chapterData) return null;
      return chapterData.verses.find(v => String(v.verse) === String(verseNumber)) || null;
  }


  public async getChapterData(textSlug: string, chapterNumber: number, options?: {
    adhyaya?: number,
    includeAI?: boolean,
    language?: 'en' | 'hi' | 'mr' | 'all'
  }): Promise<ChapterData | null> {
    const cacheKey = `${textSlug}-${chapterNumber}-${options?.adhyaya || 'default'}-${options?.includeAI}`;
    if (this.dataCache.has(cacheKey)) {
      return this.dataCache.get(cacheKey) ?? null;
    }

    const textMetadata = VEDIC_LIBRARY.find(t => t.slug === textSlug);
    if (!textMetadata) return null;

    // GOLD-GATE: refuse to serve data for unknown book not promoted to Gold tier
    if (!this.isBookGoldTier(textSlug, textMetadata.storage)) {
      console.warn(`[VedicDataService] GOLD-GATE blocked: '${textSlug}' is not GOLD in manifest.json`);
      return null;
    }

    // Load raw verses
    let verses: unknown[] = [];
    if (textMetadata.storage === 'lake') {
      verses = await getVersesFromLakeServer(textSlug, chapterNumber, textMetadata.lakeFile);
    } else {
      verses = await this.loadFromJson(textSlug, chapterNumber, options?.adhyaya);
    }

    // Enrich verses with AI context and UI metadata
    let enrichedVerses = await this.enrichVerses(verses, options?.includeAI);

    // Dynamically prune layers to enforce Max 2 limits before sending payload to UI
    enrichedVerses = this.prunePayload(enrichedVerses);

    // Generate navigation data
    const navigation = this.generateNavigation(textMetadata, chapterNumber);

    // Generate AI insights for the chapter
    const aiInsights = options?.includeAI ? await this.generateChapterInsights(enrichedVerses) : undefined;

    const chapterData: ChapterData = {
      metadata: textMetadata,
      verses: enrichedVerses,
      navigation,
      aiInsights
    };

    // Cache the result
    this.dataCache.set(cacheKey, chapterData);
    return chapterData;
  }

  private async loadFromJson(textSlug: string, chapterNumber: number, adhyaya?: number): Promise<unknown[]> {
    try {
      const manifestPath = path.join(process.cwd(), 'data', 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const books = manifest.books || [];
      const bookManifest = books.find((b: Record<string, unknown>) => b.book_id === textSlug || b.slug === textSlug); // Backward compat for slug

      let shardFile = `${textSlug}-chapter-${chapterNumber}.json`;

      if (bookManifest?.chapters || bookManifest?.shards) {
        const chapters = (bookManifest.chapters || bookManifest.shards);
        
        if (textSlug === 'mahabharata' && adhyaya) {
          const parvaShard = chapters.find((s: Record<string, unknown>) =>
            s.file === `parva-${chapterNumber}/adhyaya-${adhyaya}.json`
          );
          if (parvaShard) shardFile = (parvaShard as Record<string, unknown>).file as string;
        } else {
          const mappedShard = chapters[chapterNumber - 1];
          if (mappedShard) shardFile = (mappedShard as Record<string, unknown>).file as string;
        }
      }

      const dataPath = path.join(process.cwd(), 'data', '3-gold', textSlug, shardFile);
      if (fs.existsSync(dataPath)) {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(rawData);
      }

      // Fallback
      const fallbackPath = path.join(process.cwd(), 'data', '3-gold', textSlug, `${textSlug}-chapter-${chapterNumber}.json`);
      if (fs.existsSync(fallbackPath)) {
        const rawData = fs.readFileSync(fallbackPath, 'utf8');
        return JSON.parse(rawData);
      }
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
    return [];
  }

  private async enrichVerses(verses: unknown[], includeAI: boolean = false): Promise<EnrichedVerse[]> {
    return verses.map(verse => {
      const v = verse as Record<string, unknown>;
      const enriched: EnrichedVerse = {
        id: (v.id || v.verse_id) as string,
        text_slug: (v.text_slug as string) || '',
        chapter: (v.chapter !== undefined ? v.chapter : v.chapter_id) as number,
        verse: (v.verse !== undefined ? v.verse : v.verse_num) as string | number,
        original: (v.original || v.original_sanskrit) as string,
        transliteration: v.transliteration as string | undefined,
        translation: (v.translation || v.meaning || ((v.layers as Record<string, unknown>[]) || []).find((l: unknown) => (l as Record<string, unknown>).type === 'translation')?.content) as string | undefined,
        layers: this.pruneLayersToTwoAuthors((v.layers as Record<string, unknown>[]) || []),
        uiMetadata: {
          readingTime: this.calculateReadingTime(verse as Record<string, unknown>),
          complexityScore: this.calculateComplexity(verse as Record<string, unknown>),
          hasCommentary: ((v.layers as Record<string, unknown>[]) || []).some((l: unknown) => (l as Record<string, unknown>).type === 'commentary'),
          languageCount: this.countLanguages((v.layers as Record<string, unknown>[]) || [])
        }
      };

      if (includeAI) {
        enriched.aiContext = {
          themes: this.extractThemes(v),
          philosophicalDepth: this.assessPhilosophicalDepth(v),
          crossReferences: this.findCrossReferences(v),
          difficulty: this.assessDifficulty(v),
          emotionalTone: this.analyzeEmotionalTone(v)
        };
      }

      return enriched;
    });
  }

  private generateNavigation(textMetadata: VedicText, currentChapter: number) {
    return {
      prevChapter: currentChapter > 1 ? {
        slug: `/${textMetadata.slug}/${currentChapter - 1}`,
        title: textMetadata.chapterNames?.[String(currentChapter - 1)] || `Chapter ${currentChapter - 1}`
      } : undefined,
      nextChapter: currentChapter < textMetadata.totalChapters ? {
        slug: `/${textMetadata.slug}/${currentChapter + 1}`,
        title: textMetadata.chapterNames?.[String(currentChapter + 1)] || `Chapter ${currentChapter + 1}`
      } : undefined,
      totalChapters: textMetadata.totalChapters,
      currentChapter
    };
  }

  private async generateChapterInsights(verses: EnrichedVerse[]) {
    // Simple AI insights generation (can be enhanced with real AI)
    const allThemes = verses.flatMap(v => v.aiContext?.themes || []);
    const uniqueThemes = [...new Set(allThemes)];

    return {
      chapterSummary: `This chapter contains ${verses.length} verses exploring ${uniqueThemes.slice(0, 3).join(', ')}.`,
      keyThemes: uniqueThemes.slice(0, 5),
      philosophicalProgression: 'From inquiry to wisdom'
    };
  }

  // Prunes layers to enforce the 2-author limit (Lean UI principle)
  private pruneLayersToTwoAuthors(layers: Record<string, unknown>[]): NVFLayer[] {
    const allowedAuthors = new Set<string>();
    const prunedLayers: NVFLayer[] = [];

    for (const layer of layers) {
      if (!layer.author) {
          prunedLayers.push(layer as unknown as NVFLayer);
          continue;
      }
      const author = String(layer.author);
      if (allowedAuthors.has(author)) {
        prunedLayers.push(layer as unknown as NVFLayer);
      } else if (allowedAuthors.size < 2) {
        allowedAuthors.add(author);
        prunedLayers.push(layer as unknown as NVFLayer);
      }
    }

    return prunedLayers;
  }

  // Helper methods for AI enrichment
  private calculateReadingTime(verse: Record<string, unknown>): number {
    const text = String(verse.original || '') + String(verse.transliteration || '') +
                 ((verse.layers as Record<string, unknown>[]) || []).map((l: unknown) => (l as Record<string, unknown>).content || '').join('');
    return Math.max(1, Math.ceil(String(text).length / 200)); // Rough estimate: 200 chars per minute
  }

  private calculateComplexity(verse: Record<string, unknown>): number {
    let score = 0;
    if (String(verse.original || '').includes('ॐ')) score += 2; // Sacred symbols
    if (((verse.layers as Record<string, unknown>[]) || []).length > 3) score += 1; // Multiple commentaries
    if (String(verse.transliteration || '').length > 100) score += 1; // Long verse
    return Math.min(10, Math.max(1, score));
  }

  private countLanguages(layers: unknown[]): number {
    const languages = new Set(((layers as Record<string, unknown>[]) || []).map((l: unknown) => (l as Record<string, unknown>).lang).filter(Boolean));
    return languages.size;
  }

  private extractThemes(verse: Record<string, unknown>): string[] {
    const themes: string[] = [];
    const text = ((verse.original || '') + ' ' + ((verse.layers as Record<string, unknown>[]) || []).map((l: unknown) => (l as Record<string, unknown>).content).join(' ')).toLowerCase();

    if (text.includes('dharma') || text.includes('धर्म')) themes.push('Dharma');
    if (text.includes('karma') || text.includes('कर्म')) themes.push('Karma');
    if (text.includes('bhakti') || text.includes('भक्ति')) themes.push('Bhakti');
    if (text.includes('jnana') || text.includes('ज्ञान')) themes.push('Jnana');
    if (text.includes('yoga') || text.includes('योग')) themes.push('Yoga');

    return themes;
  }

  private assessPhilosophicalDepth(verse: Record<string, unknown>): number {
    const layers = (verse.layers as Record<string, unknown>[]) || [];
    return Math.min(10, layers.length * 2 + (String(verse.original || '').length > 50 ? 1 : 0));
  }

  private findCrossReferences(verse: Record<string, unknown>): string[] {
    // Simple cross-reference detection (can be enhanced)
    const references: string[] = [];
    const text = String(verse.original || '').toLowerCase();

    if (text.includes('krishna') || text.includes('कृष्ण')) references.push('Krishna');
    if (text.includes('arjuna') || text.includes('अर्जुन')) references.push('Arjuna');
    if (text.includes('veda') || text.includes('वेद')) references.push('Vedas');

    return references;
  }

  private assessDifficulty(verse: Record<string, unknown>): 'beginner' | 'intermediate' | 'advanced' {
    const complexity = this.calculateComplexity(verse as Record<string, unknown>);
    if (complexity <= 3) return 'beginner';
    if (complexity <= 7) return 'intermediate';
    return 'advanced';
  }

  private analyzeEmotionalTone(verse: Record<string, unknown>): string {
    const text = String(verse.original || '').toLowerCase();
    if (text.includes('fear') || text.includes('भय')) return 'contemplative';
    if (text.includes('love') || text.includes('प्रेम')) return 'devotional';
    if (text.includes('duty') || text.includes('कर्तव्य')) return 'ethical';
    return 'philosophical';
  }
}

// Export singleton instance
export const vedicDataService = VedicDataService.getInstance();
