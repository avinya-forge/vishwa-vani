import {
  VEDIC_KNOWLEDGE_TOKENS,
  getAllKnowledgeTokens,
  getKnowledgeTokensByDomain,
  getKnowledgeTokensByScripture
} from '@/lib/vedic-science'

describe('Diamond Tier (💎) Vedic Science & Empirical Knowledge Engine (ADR-007)', () => {
  it('loads all empirical knowledge tokens successfully', () => {
    const tokens = getAllKnowledgeTokens()
    expect(tokens.length).toBeGreaterThanOrEqual(8)
    expect(tokens.length).toBe(VEDIC_KNOWLEDGE_TOKENS.length)
  })

  it('covers major empirical domains (Astronomy, Ayurveda, Psychology, Cosmology)', () => {
    const astronomy = getKnowledgeTokensByDomain('astronomy')
    const ayurveda = getKnowledgeTokensByDomain('ayurveda')
    const psychology = getKnowledgeTokensByDomain('psychology')
    const cosmology = getKnowledgeTokensByDomain('cosmology')

    expect(astronomy.length).toBeGreaterThanOrEqual(2)
    expect(ayurveda.length).toBeGreaterThanOrEqual(2)
    expect(psychology.length).toBeGreaterThanOrEqual(2)
    expect(cosmology.length).toBeGreaterThanOrEqual(2)
  })

  it('verifies astronomy tokens have historical observations and modern corroborations', () => {
    const astronomy = getKnowledgeTokensByDomain('astronomy')
    
    // Check 13-day eclipse sequence
    const eclipseToken = astronomy.find(t => t.id === 'astro-mbh-eclipse-pair')
    expect(eclipseToken).toBeDefined()
    expect(eclipseToken?.scriptureSlug).toBe('mahabharata')
    expect(eclipseToken?.sanskritTerm).toContain('ग्रहण')
    expect(eclipseToken?.ancientObservation).toContain('Trayodashi')
    expect(eclipseToken?.modernCorroboration).toContain('NASA')
    expect(eclipseToken?.empiricalFact.length).toBeGreaterThan(20)

    // Check Ramayana planetary alignment
    const ramaToken = astronomy.find(t => t.id === 'astro-ramayana-planetary-chart')
    expect(ramaToken).toBeDefined()
    expect(ramaToken?.scriptureSlug).toBe('ramayana')
    expect(ramaToken?.sanskritTerm).toContain('पञ्चग्रह')
    expect(ramaToken?.tags).toContain('exaltation')
  })

  it('verifies Ayurveda tokens include dietary energetics and tridosha principles', () => {
    const ayurveda = getKnowledgeTokensByDomain('ayurveda')
    
    const dietToken = ayurveda.find(t => t.id === 'ayur-gita-dietary-gunas')
    expect(dietToken).toBeDefined()
    expect(dietToken?.scriptureSlug).toBe('bhagavad-gita')
    expect(dietToken?.chapter).toBe(17)

    const tridoshaToken = ayurveda.find(t => t.id === 'ayur-tridosha-constitutional-balance')
    expect(tridoshaToken).toBeDefined()
    expect(tridoshaToken?.scriptureSlug).toBe('atharvaveda')
    expect(tridoshaToken?.sanskritTerm).toContain('त्रिदोष')
  })

  it('verifies Cognitive Psychology tokens include Patanjali vrittis and Mandukya consciousness states', () => {
    const psychology = getKnowledgeTokensByDomain('psychology')
    
    const vrittiToken = psychology.find(t => t.id === 'psych-citta-vritti-neuroregulation')
    expect(vrittiToken).toBeDefined()
    expect(vrittiToken?.scriptureSlug).toBe('yoga-sutras')
    expect(vrittiToken?.tags).toContain('patanjali')

    const mandukyaToken = psychology.find(t => t.id === 'psych-mandukya-four-states')
    expect(mandukyaToken).toBeDefined()
    expect(mandukyaToken?.scriptureSlug).toBe('mandukya-upanishad')
    expect(mandukyaToken?.sanskritTerm).toContain('चतुष्पाद')
  })

  it('verifies Cosmology tokens include Paramanu atomic theory and billions-year Kalpa time scales', () => {
    const cosmology = getKnowledgeTokensByDomain('cosmology')
    
    const atomToken = cosmology.find(t => t.id === 'cosmo-paramanu-atomic-theory')
    expect(atomToken).toBeDefined()
    expect(atomToken?.scriptureSlug).toBe('brahma-sutras')

    const kalpaToken = cosmology.find(t => t.id === 'cosmo-time-dilation-cosmic-cycles')
    expect(kalpaToken).toBeDefined()
    expect(kalpaToken?.scriptureSlug).toBe('vishnu-purana')
    expect(kalpaToken?.empiricalFact).toContain('billions of years')
  })

  it('filters knowledge tokens correctly by scripture slug', () => {
    const gitaTokens = getKnowledgeTokensByScripture('bhagavad-gita')
    expect(gitaTokens.length).toBeGreaterThanOrEqual(1)
    gitaTokens.forEach(t => expect(t.scriptureSlug).toBe('bhagavad-gita'))

    const nonExistentTokens = getKnowledgeTokensByScripture('non-existent-slug')
    expect(nonExistentTokens).toEqual([])
  })

  it('ensures every empirical knowledge token has valid citations, URLs, and Devanagari Sanskrit', () => {
    const allTokens = getAllKnowledgeTokens()
    allTokens.forEach(token => {
      expect(token.id).toBeDefined()
      expect(token.title.length).toBeGreaterThan(5)
      expect(token.sanskritTerm.length).toBeGreaterThan(2)
      expect(token.ancientObservation.length).toBeGreaterThan(20)
      expect(token.modernCorroboration.length).toBeGreaterThan(20)
      expect(token.empiricalFact.length).toBeGreaterThan(20)
      expect(token.keyCitations.length).toBeGreaterThan(0)
      expect(token.tags.length).toBeGreaterThan(0)

      token.keyCitations.forEach(citation => {
        expect(citation.sanskrit.length).toBeGreaterThan(5)
        expect(citation.transliteration.length).toBeGreaterThan(5)
        expect(citation.translation.length).toBeGreaterThan(10)
        expect(citation.verseUrl).toMatch(/^\/[a-z0-9-]+/i)
      })
    })
  })
})
