/**
 * Vishwa-Vani: AI-Enhanced Data Service Layer
 *
 * This service provides structured, AI-enriched data access for optimal UI rendering.
 * It abstracts data loading complexity and adds contextual intelligence.
 */

import fs from 'fs';
import path from 'path';
import { VEDIC_LIBRARY, VedicText } from './texts';
import { getVersesFromLakeServer } from './server-lake';

export interface EnrichedVerse {
  id: string;
  original: string;
  transliteration?: string;
  layers: any[];
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
  private dataCache = new Map<string, any>();

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
      return this.dataCache.get(cacheKey);
    }

    const textMetadata = VEDIC_LIBRARY.find(t => t.slug === textSlug);
    if (!textMetadata) return null;

    // Load raw verses
    let verses: any[] = [];
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

  private async loadFromJson(textSlug: string, chapterNumber: number, adhyaya?: number): Promise<any[]> {
    try {
      const manifestPath = path.join(process.cwd(), 'data', 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const bookManifest = manifest.books.find((b: any) => b.slug === textSlug);

      let shardFile = `${textSlug}-chapter-${chapterNumber}.json`;

      if (bookManifest?.shards) {
        if (textSlug === 'mahabharata' && adhyaya) {
          const parvaShard = bookManifest.shards.find((s: any) =>
            s.file === `parva-${chapterNumber}/adhyaya-${adhyaya}.json`
          );
          if (parvaShard) shardFile = parvaShard.file;
        } else {
          const mappedShard = bookManifest.shards[chapterNumber - 1];
          if (mappedShard) shardFile = mappedShard.file;
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

  private async enrichVerses(verses: any[], includeAI: boolean = false): Promise<EnrichedVerse[]> {
    return verses.map(verse => {
      const enriched: EnrichedVerse = {
        id: verse.id || verse.verse_id,
        original: verse.original || verse.original_sanskrit,
        transliteration: verse.transliteration,
        layers: verse.layers || [],
        uiMetadata: {
          readingTime: this.calculateReadingTime(verse),
          complexityScore: this.calculateComplexity(verse),
          hasCommentary: (verse.layers || []).some((l: any) => l.type === 'commentary'),
          languageCount: this.countLanguages(verse.layers || [])
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
        slug: `${textMetadata.slug}/${currentChapter - 1}`,
        title: textMetadata.chapterNames?.[String(currentChapter - 1)] || `Chapter ${currentChapter - 1}`
      } : undefined,
      nextChapter: currentChapter < textMetadata.totalChapters ? {
        slug: `${textMetadata.slug}/${currentChapter + 1}`,
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
  private calculateReadingTime(verse: any): number {
    const text = verse.original + (verse.transliteration || '') +
                 (verse.layers || []).map((l: any) => l.content || '').join('');
    return Math.max(1, Math.ceil(text.length / 200)); // Rough estimate: 200 chars per minute
  }

  private calculateComplexity(verse: any): number {
    let score = 0;
    if (verse.original?.includes('ॐ')) score += 2; // Sacred symbols
    if ((verse.layers || []).length > 3) score += 1; // Multiple commentaries
    if (verse.transliteration?.length > 100) score += 1; // Long verse
    return Math.min(10, Math.max(1, score));
  }

  private countLanguages(layers: any[]): number {
    const languages = new Set(layers.map(l => l.lang).filter(Boolean));
    return languages.size;
  }

  private extractThemes(verse: any): string[] {
    const themes: string[] = [];
    const text = (verse.original + ' ' + (verse.layers || []).map((l: any) => l.content).join(' ')).toLowerCase();

    if (text.includes('dharma') || text.includes('धर्म')) themes.push('Dharma');
    if (text.includes('karma') || text.includes('कर्म')) themes.push('Karma');
    if (text.includes('bhakti') || text.includes('भक्ति')) themes.push('Bhakti');
    if (text.includes('jnana') || text.includes('ज्ञान')) themes.push('Jnana');
    if (text.includes('yoga') || text.includes('योग')) themes.push('Yoga');

    return themes;
  }

  private assessPhilosophicalDepth(verse: any): number {
    const layers = verse.layers || [];
    return Math.min(10, layers.length * 2 + (verse.original?.length > 50 ? 1 : 0));
  }

  private findCrossReferences(verse: any): string[] {
    // Simple cross-reference detection (can be enhanced)
    const references: string[] = [];
    const text = verse.original?.toLowerCase() || '';

    if (text.includes('krishna') || text.includes('कृष्ण')) references.push('Krishna');
    if (text.includes('arjuna') || text.includes('अर्जुन')) references.push('Arjuna');
    if (text.includes('veda') || text.includes('वेद')) references.push('Vedas');

    return references;
  }

  private assessDifficulty(verse: any): 'beginner' | 'intermediate' | 'advanced' {
    const complexity = this.calculateComplexity(verse);
    if (complexity <= 3) return 'beginner';
    if (complexity <= 7) return 'intermediate';
    return 'advanced';
  }

  private analyzeEmotionalTone(verse: any): string {
    const text = verse.original?.toLowerCase() || '';
    if (text.includes('fear') || text.includes('भय')) return 'contemplative';
    if (text.includes('love') || text.includes('प्रेम')) return 'devotional';
    if (text.includes('duty') || text.includes('कर्तव्य')) return 'ethical';
    return 'philosophical';
  }
}

// Export singleton instance
export const vedicDataService = VedicDataService.getInstance();