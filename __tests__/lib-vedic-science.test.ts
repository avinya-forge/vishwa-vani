import {
  VEDIC_KNOWLEDGE_TOKENS,
  getAllKnowledgeTokens,
  getKnowledgeTokensByDomain,
  getKnowledgeTokensByScripture,
  getKnowledgeTokensByScriptureAndVerse,
  searchKnowledgeTokens,
  getAllDomainsList,
  getDomainMetadata,
  type ScientificDomain
} from '@/lib/vedic-science'

describe('Diamond Tier (💎) Vedic Science & Universal Knowledge Graph Engine (ADR-008)', () => {
  it('loads all empirical knowledge tokens successfully', () => {
    const tokens = getAllKnowledgeTokens()
    expect(tokens.length).toBeGreaterThanOrEqual(14)
    expect(tokens.length).toBe(VEDIC_KNOWLEDGE_TOKENS.length)
  })

  it('covers all 10 canonical empirical domains in the taxonomy', () => {
    const expectedDomains: ScientificDomain[] = [
      'astronomy',
      'ayurveda',
      'psychology',
      'cosmology',
      'governance',
      'mathematics',
      'ecology',
      'epistemology',
      'linguistics',
      'sociology'
    ]

    expectedDomains.forEach(domain => {
      const tokens = getKnowledgeTokensByDomain(domain)
      expect(tokens.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('provides metadata for all 10 domains with icons and descriptions', () => {
    const domainList = getAllDomainsList()
    expect(domainList.length).toBe(10)

    domainList.forEach(domain => {
      expect(domain.id).toBeDefined()
      expect(domain.label.length).toBeGreaterThan(0)
      expect(domain.sanskritLabel.length).toBeGreaterThan(0)
      expect(domain.icon.length).toBeGreaterThan(0)
      expect(domain.description.length).toBeGreaterThan(20)

      const directMeta = getDomainMetadata(domain.id)
      expect(directMeta).toEqual(domain)
    })
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

  it('verifies Statecraft & Governance tokens in Mahabharata and Dasbodh', () => {
    const governance = getKnowledgeTokensByDomain('governance')
    expect(governance.length).toBeGreaterThanOrEqual(2)

    const viduraToken = governance.find(t => t.id === 'gov-mbh-vidura-statecraft')
    expect(viduraToken).toBeDefined()
    expect(viduraToken?.scriptureSlug).toBe('mahabharata')
    expect(viduraToken?.sanskritTerm).toContain('विदुरनीति')

    const dasbodhToken = governance.find(t => t.id === 'gov-dasbodh-collective-stewardship')
    expect(dasbodhToken).toBeDefined()
    expect(dasbodhToken?.scriptureSlug).toBe('dasbodh')
    expect(dasbodhToken?.ancientObservation).toContain('Samarth Ramdas')
  })

  it('verifies Vedic Mathematics token covers powers of ten scale ($10^{12}$)', () => {
    const math = getKnowledgeTokensByDomain('mathematics')
    const decimalToken = math.find(t => t.id === 'math-yajur-decimal-powers')
    expect(decimalToken).toBeDefined()
    expect(decimalToken?.scriptureSlug).toBe('yajurveda')
    expect(decimalToken?.sanskritTerm).toContain('दशगुणोत्तर')
    expect(decimalToken?.ancientObservation).toContain('Parardha')
  })

  it('verifies Ecology & Environmental Ethics tokens in Atharvaveda and Manusmriti', () => {
    const ecology = getKnowledgeTokensByDomain('ecology')
    const bhumiToken = ecology.find(t => t.id === 'eco-atharva-bhumi-sukta')
    expect(bhumiToken).toBeDefined()
    expect(bhumiToken?.scriptureSlug).toBe('atharvaveda')

    const plantToken = ecology.find(t => t.id === 'eco-manu-plant-consciousness')
    expect(plantToken).toBeDefined()
    expect(plantToken?.scriptureSlug).toBe('manusmriti')
    expect(plantToken?.sanskritTerm).toContain('अन्तःसंज्ञा')
  })

  it('verifies Epistemology, Acoustic Phonetics, and Sociology tokens', () => {
    const epistemology = getKnowledgeTokensByDomain('epistemology')
    const pramanaToken = epistemology.find(t => t.id === 'epist-yoga-pramana-empiricism')
    expect(pramanaToken).toBeDefined()
    expect(pramanaToken?.sanskritTerm).toContain('प्रमाण')

    const linguistics = getKnowledgeTokensByDomain('linguistics')
    const svaraToken = linguistics.find(t => t.id === 'ling-sama-svara-acoustics')
    expect(svaraToken).toBeDefined()
    expect(svaraToken?.scriptureSlug).toBe('samaveda')

    const sociology = getKnowledgeTokensByDomain('sociology')
    const samskaraToken = sociology.find(t => t.id === 'soc-samskaras-neurodevelopment')
    expect(samskaraToken).toBeDefined()
    expect(samskaraToken?.tags).toContain('samskaras')
  })

  it('retrieves tokens by scripture, chapter, and verse accurately', () => {
    // Bhagavad Gita 17:8 has dietary gunas token
    const gitaTokens = getKnowledgeTokensByScriptureAndVerse('bhagavad-gita', 17, 8)
    expect(gitaTokens.length).toBe(1)
    expect(gitaTokens[0].id).toBe('ayur-gita-dietary-gunas')

    // Non-existent verse returns empty array
    const emptyTokens = getKnowledgeTokensByScriptureAndVerse('bhagavad-gita', 1, 999)
    expect(emptyTokens).toEqual([])
  })

  it('searches knowledge tokens accurately across keywords', () => {
    const eclipseResults = searchKnowledgeTokens('eclipse')
    expect(eclipseResults.length).toBeGreaterThanOrEqual(1)
    expect(eclipseResults.some(t => t.id === 'astro-mbh-eclipse-pair')).toBe(true)

    const doshaResults = searchKnowledgeTokens('tridosha')
    expect(doshaResults.length).toBeGreaterThanOrEqual(1)

    const allResults = searchKnowledgeTokens('')
    expect(allResults.length).toBe(VEDIC_KNOWLEDGE_TOKENS.length)
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

