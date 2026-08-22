export type NVFLayerType = 'commentary' | 'translation' | 'meaning' | 'transliteration' | 'notes' | 'summary';

export type NVFLang = 'en' | 'hi' | 'mr' | 'sa' | 'san';

export interface NVFLayer {
  author: string;
  type: NVFLayerType;
  content: string;
  lang?: NVFLang | string;
  author_name?: string;
  author_bio?: string;
  author_label?: string;
  author_icon?: string;
}

export interface NVFVerse {
  id: string;
  text_slug: string;
  chapter: number;
  verse: number | string;
  original: string;
  transliteration?: string;
  translation?: string;
  meaning?: string;
  layers: NVFLayer[];
  ai_metadata?: {
    themes?: string[];
    philosophicalDepth?: number;
    crossReferences?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    emotionalTone?: string;
  };
}
