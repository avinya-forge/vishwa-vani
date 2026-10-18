/**
 * Ramayana Multiverse Comparative Synopsis Module
 * 
 * Provides structured access to the narrative episode graph comparing
 * the 5 major Ramayana traditions: Valmiki (Sanskrit), Ramcharitmanas (Awadhi),
 * Kamba Ramayanam (Tamil), Adhyatma Ramayana (Sanskrit Advaita), and
 * Bhavartha Ramayana (Marathi Ovi).
 */

import synopsisData from '../data/ontology/ramayana-synopsis.json'

export type RamayanaTraditionKey = 'valmiki' | 'tulsidas' | 'kamban' | 'adhyatma' | 'eknath'

export interface RamayanaTraditionDetail {
  textName: string
  language: string
  meter: string
  reference: string
  culturalNuance: string
  keyExcerpt: string
}

export interface RamayanaEpisode {
  id: string
  kanda: string
  titleEn: string
  titleHi: string
  titleMr: string
  synopsis: string
  philosophicalSignificance: string
  traditions: Record<RamayanaTraditionKey, RamayanaTraditionDetail>
}

export interface RamayanaSynopsisGraph {
  title: string
  description: string
  version: string
  episodes: RamayanaEpisode[]
}

export const RAMAYANA_TRADITION_METADATA: Record<RamayanaTraditionKey, { name: string; author: string; language: string; era: string }> = {
  valmiki: {
    name: 'Valmiki Ramayana (Root Adi Kavya)',
    author: 'Maharshi Valmiki',
    language: 'Sanskrit',
    era: 'Treta Yuga (~5000 BCE Traditional)'
  },
  tulsidas: {
    name: 'Sri Ramcharitmanas',
    author: 'Goswami Tulsidas',
    language: 'Awadhi (Bhakti Kal)',
    era: '16th Century CE (1574 CE)'
  },
  kamban: {
    name: 'Kamba Ramayanam (Iramavataram)',
    author: 'Kavichakravarthi Kamban',
    language: 'Classical Tamil',
    era: '12th Century CE'
  },
  adhyatma: {
    name: 'Adhyatma Ramayana',
    author: 'Veda Vyasa (Brahmanda Purana)',
    language: 'Sanskrit (Advaita Exegesis)',
    era: 'Classical Puranic'
  },
  eknath: {
    name: 'Bhavartha Ramayana',
    author: 'Sant Eknath Maharaj',
    language: 'Marathi (Warkari Ovi)',
    era: '16th Century CE'
  }
}

/**
 * Returns the complete Ramayana multiverse synopsis graph.
 */
export function getRamayanaSynopsisGraph(): RamayanaSynopsisGraph {
  return synopsisData as unknown as RamayanaSynopsisGraph
}

/**
 * Returns all narrative episodes.
 */
export function getRamayanaEpisodes(): RamayanaEpisode[] {
  return (synopsisData.episodes || []) as unknown as RamayanaEpisode[]
}

/**
 * Finds a specific narrative episode by its unique identifier.
 */
export function getRamayanaEpisodeById(id: string): RamayanaEpisode | undefined {
  return getRamayanaEpisodes().find(ep => ep.id.toLowerCase() === id.toLowerCase())
}

/**
 * Retrieves all narrative episodes within a designated Kanda (e.g. 'Bala Kanda', 'Aranya Kanda').
 */
export function getEpisodesByKanda(kandaName: string): RamayanaEpisode[] {
  const normalized = kandaName.toLowerCase().trim()
  return getRamayanaEpisodes().filter(ep => ep.kanda.toLowerCase().includes(normalized))
}

/**
 * Compares an episode across two or more designated traditions.
 */
export function compareTraditions(
  episodeId: string,
  traditionKeys: RamayanaTraditionKey[] = ['valmiki', 'tulsidas', 'kamban', 'adhyatma', 'eknath']
): {
  episode: RamayanaEpisode
  comparisons: Array<{ key: RamayanaTraditionKey; meta: typeof RAMAYANA_TRADITION_METADATA[RamayanaTraditionKey]; detail: RamayanaTraditionDetail }>
} | null {
  const episode = getRamayanaEpisodeById(episodeId)
  if (!episode) return null

  const comparisons = traditionKeys
    .filter(key => Boolean(episode.traditions[key]))
    .map(key => ({
      key,
      meta: RAMAYANA_TRADITION_METADATA[key],
      detail: episode.traditions[key]
    }))

  return {
    episode,
    comparisons
  }
}
