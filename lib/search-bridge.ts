export interface SearchResult {
  textSlug: string;
  chapter: number;
  verse: number | string;
  slok: string;
  transliteration: string;
  relevance?: number;
}

export interface SearchWorkerMessage {
  type: string;
  id: number;
  payload: unknown;
  error?: string;
}
