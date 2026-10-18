import {
  getRamayanaSynopsisGraph,
  getRamayanaEpisodes,
  getRamayanaEpisodeById,
  getEpisodesByKanda,
  compareTraditions,
  RAMAYANA_TRADITION_METADATA
} from '../lib/ramayana-synopsis'
import type { RamayanaTraditionKey } from '../lib/ramayana-synopsis'

describe('Ramayana Multiverse Synopsis Graph (lib/ramayana-synopsis)', () => {
  test('loads complete synopsis graph with metadata', () => {
    const graph = getRamayanaSynopsisGraph()
    expect(graph).toBeDefined()
    expect(graph.title).toContain('Ramayana')
    expect(graph.version).toBe('1.0.0')
    expect(Array.isArray(graph.episodes)).toBe(true)
    expect(graph.episodes.length).toBeGreaterThanOrEqual(7)
  })

  test('every episode contains all 5 canonical traditions with excerpts', () => {
    const episodes = getRamayanaEpisodes()
    const requiredTraditions: RamayanaTraditionKey[] = ['valmiki', 'tulsidas', 'kamban', 'adhyatma', 'eknath']

    for (const ep of episodes) {
      expect(ep.id).toBeTruthy()
      expect(ep.kanda).toBeTruthy()
      expect(ep.titleEn).toBeTruthy()
      expect(ep.titleHi).toBeTruthy()
      expect(ep.titleMr).toBeTruthy()
      expect(ep.synopsis).toBeTruthy()
      expect(ep.philosophicalSignificance).toBeTruthy()

      for (const tradKey of requiredTraditions) {
        const trad = ep.traditions[tradKey]
        expect(trad).toBeDefined()
        expect(trad.textName).toBeTruthy()
        expect(trad.language).toBeTruthy()
        expect(trad.reference).toBeTruthy()
        expect(trad.culturalNuance).toBeTruthy()
        expect(trad.keyExcerpt).toBeTruthy()
      }
    }
  })

  test('getRamayanaEpisodeById retrieves existing episode case-insensitively', () => {
    const ep = getRamayanaEpisodeById('PUTRAKAMESHTI-YAJNA')
    expect(ep).toBeDefined()
    expect(ep?.titleEn).toContain('Putrakameshti')

    const missing = getRamayanaEpisodeById('non-existent-episode')
    expect(missing).toBeUndefined()
  })

  test('getEpisodesByKanda filters episodes correctly', () => {
    const balaEpisodes = getEpisodesByKanda('Bala Kanda')
    expect(balaEpisodes.length).toBeGreaterThanOrEqual(3)

    const aranyaEpisodes = getEpisodesByKanda('Aranya')
    expect(aranyaEpisodes.length).toBeGreaterThanOrEqual(2)

    const missingKanda = getEpisodesByKanda('NonExistentKanda')
    expect(missingKanda.length).toBe(0)
  })

  test('compareTraditions provides structured side-by-side comparative views', () => {
    const comparison = compareTraditions('vibhishana-sharanagati', ['valmiki', 'tulsidas', 'kamban'])
    expect(comparison).not.toBeNull()
    expect(comparison?.episode.id).toBe('vibhishana-sharanagati')
    expect(comparison?.comparisons.length).toBe(3)

    const valmikiComp = comparison?.comparisons.find(c => c.key === 'valmiki')
    expect(valmikiComp?.meta.name).toContain('Valmiki Ramayana')
    expect(valmikiComp?.detail.keyExcerpt).toContain('सकृदेव प्रपन्नाय')

    const kambanComp = comparison?.comparisons.find(c => c.key === 'kamban')
    expect(kambanComp?.meta.language).toContain('Tamil')
    expect(kambanComp?.detail.culturalNuance).toContain('seven brothers')
  })

  test('compareTraditions returns null for invalid episode id', () => {
    const result = compareTraditions('invalid-id')
    expect(result).toBeNull()
  })

  test('RAMAYANA_TRADITION_METADATA contains correct attribution for all traditions', () => {
    expect(RAMAYANA_TRADITION_METADATA.valmiki.author).toBe('Maharshi Valmiki')
    expect(RAMAYANA_TRADITION_METADATA.tulsidas.author).toBe('Goswami Tulsidas')
    expect(RAMAYANA_TRADITION_METADATA.kamban.language).toBe('Classical Tamil')
    expect(RAMAYANA_TRADITION_METADATA.adhyatma.author).toContain('Veda Vyasa')
    expect(RAMAYANA_TRADITION_METADATA.eknath.language).toContain('Marathi')
  })
})
