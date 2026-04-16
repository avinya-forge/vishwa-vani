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

export interface EnrichedVerse {
  id: string;
  chapter: number;
  verse: string | number;
  original: string;
  transliteration?: string;
  translation?: string;
  layers: unknown[];
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
  private dataCache = new Map<string, ChapterData>();

  static getInstance(): VedicDataService {
    if (!VedicDataService.instance) {
      VedicDataService.instance = new VedicDataService();
    }
    return VedicDataService.instance;
  }

  /**
   * Load and enrich chapter data with AI context
   */
  async getChapterData(
    textSlug: string,
    chapterNumber: number,
    options?: {
      adhyaya?: number;
      includeAI?: boolean;
      language?: string;
    }
  ): Promise<ChapterData | null> {
    const cacheKey = `${textSlug}-${chapterNumber}-${options?.adhyaya || 0}`;
    if (this.dataCache.has(cacheKey)) {
      return this.dataCache.get(cacheKey) ?? null;
    }

    const textMetadata = VEDIC_LIBRARY.find(t => t.slug === textSlug);
    if (!textMetadata) return null;

    // Load raw verses
    let verses: unknown[] = [];
    if (textMetadata.storage === 'lake') {
      verses = await getVersesFromLakeServer(textSlug, chapterNumber, textMetadata.lakeFile);
    } else {
      verses = await this.loadFromJson(textSlug, chapterNumber, options?.adhyaya);
    }

    // Enrich verses with AI context and UI metadata
    const enrichedVerses = await this.enrichVerses(verses, options?.includeAI);

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
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
      const books = (manifest.books as Record<string, unknown>[]) || [];
      const bookManifest = books.find(b => b.book_id === textSlug || b.slug === textSlug); // Backward compat for slug

      let shardFile = `${textSlug}-chapter-${chapterNumber}.json`;

      if (bookManifest?.chapters || bookManifest?.shards) {
        const chapters = (bookManifest.chapters || bookManifest.shards) as Record<string, unknown>[];
        
        if (textSlug === 'mahabharata' && adhyaya) {
          const parvaShard = chapters.find(s =>
            s.file === `parva-${chapterNumber}/adhyaya-${adhyaya}.json`
          );
          if (parvaShard) shardFile = parvaShard.file as string;
        } else {
          const mappedShard = chapters[chapterNumber - 1];
          if (mappedShard) shardFile = mappedShard.file as string;
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
      const v = verse as Record<string, unknown>
      const enriched: EnrichedVerse = {
        id: (v.id || v.verse_id) as string,
        chapter: (v.chapter !== undefined ? v.chapter : v.chapter_id) as number,
        verse: (v.verse !== undefined ? v.verse : v.verse_num) as string | number,
        original: (v.original || v.original_sanskrit) as string,
        transliteration: v.transliteration as string | undefined,
        translation: (v.translation || v.meaning || ((v.layers as any[]) || []).find(l => l.type === 'translation')?.content) as string | undefined,
        layers: (v.layers || []) as unknown[],
        uiMetadata: {
          readingTime: this.calculateReadingTime(verse),
          complexityScore: this.calculateComplexity(verse),
          hasCommentary: ((v.layers as unknown[]) || []).some((l: unknown) => (l as Record<string, unknown>).type === 'commentary'),
          languageCount: this.countLanguages((v.layers as unknown[]) || [])
        }
      };

      if (includeAI) {
        enriched.aiContext = {
          themes: this.extractThemes(verse),
          philosophicalDepth: this.assessPhilosophicalDepth(verse),
          crossReferences: this.findCrossReferences(verse),
          difficulty: this.assessDifficulty(verse),
          emotionalTone: this.analyzeEmotionalTone(verse)
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

  // Helper methods for AI enrichment
  private calculateReadingTime(verse: unknown): number {
    const v = verse as Record<string, unknown>
    const text = (v.original || '') + ((v.transliteration || '') as string) +
                 ((v.layers as unknown[]) || []).map((l: unknown) => (l as Record<string, unknown>).content || '').join('');
    return Math.max(1, Math.ceil(String(text).length / 200)); // Rough estimate: 200 chars per minute
  }

  private calculateComplexity(verse: unknown): number {
    const v = verse as Record<string, unknown>
    let score = 0;
    if ((v.original as string)?.includes('ॐ')) score += 2; // Sacred symbols
    if (((v.layers as unknown[]) || []).length > 3) score += 1; // Multiple commentaries
    if ((v.transliteration as string)?.length > 100) score += 1; // Long verse
    return Math.min(10, Math.max(1, score));
  }

  private countLanguages(layers: unknown[]): number {
    const languages = new Set((layers || []).map((l: unknown) => (l as Record<string, unknown>).lang).filter(Boolean));
    return languages.size;
  }

  private extractThemes(verse: unknown): string[] {
    const v = verse as Record<string, unknown>
    const themes: string[] = [];
    const text = ((v.original || '') + ' ' + ((v.layers as unknown[]) || []).map((l: unknown) => (l as Record<string, unknown>).content).join(' ')).toLowerCase();

    if (text.includes('dharma') || text.includes('धर्म')) themes.push('Dharma');
    if (text.includes('karma') || text.includes('कर्म')) themes.push('Karma');
    if (text.includes('bhakti') || text.includes('भक्ति')) themes.push('Bhakti');
    if (text.includes('jnana') || text.includes('ज्ञान')) themes.push('Jnana');
    if (text.includes('yoga') || text.includes('योग')) themes.push('Yoga');

    return themes;
  }

  private assessPhilosophicalDepth(verse: unknown): number {
    const v = verse as Record<string, unknown>
    const layers = (v.layers as unknown[]) || [];
    return Math.min(10, layers.length * 2 + ((v.original as string)?.length > 50 ? 1 : 0));
  }

  private findCrossReferences(verse: unknown): string[] {
    // Simple cross-reference detection (can be enhanced)
    const v = verse as Record<string, unknown>
    const references: string[] = [];
    const text = (v.original as string)?.toLowerCase() || '';

    if (text.includes('krishna') || text.includes('कृष्ण')) references.push('Krishna');
    if (text.includes('arjuna') || text.includes('अर्जुन')) references.push('Arjuna');
    if (text.includes('veda') || text.includes('वेद')) references.push('Vedas');

    return references;
  }

  private assessDifficulty(verse: unknown): 'beginner' | 'intermediate' | 'advanced' {
    const complexity = this.calculateComplexity(verse);
    if (complexity <= 3) return 'beginner';
    if (complexity <= 7) return 'intermediate';
    return 'advanced';
  }

  private analyzeEmotionalTone(verse: unknown): string {
    const v = verse as Record<string, unknown>
    const text = (v.original as string)?.toLowerCase() || '';
    if (text.includes('fear') || text.includes('भय')) return 'contemplative';
    if (text.includes('love') || text.includes('प्रेम')) return 'devotional';
    if (text.includes('duty') || text.includes('कर्तव्य')) return 'ethical';
    return 'philosophical';
  }
}

// Export singleton instance
export const vedicDataService = VedicDataService.getInstance();
