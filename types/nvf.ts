export interface NVFLayer {
  author: string;
  type: string;
  content: string;
  lang?: string;
}

export interface NVFVerse {
  id: string;
  text_slug: string;
  chapter: number;
  verse: number | string;
  original: string;
  transliteration?: string;
  translation?: string;
  layers: NVFLayer[];
}
