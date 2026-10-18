import ramcharitmanasSpec from '../data/specs/ramcharitmanas.json'

describe('Ramcharitmanas Spec (data/specs/ramcharitmanas.json)', () => {
  test('conforms to canonical scripture spec schema', () => {
    const spec = ramcharitmanasSpec.spec
    expect(spec).toBeDefined()
    expect(spec.slug).toBe('ramcharitmanas')
    expect(spec.name).toBe('Sri Ramcharitmanas')
    expect(spec.nameDevanagari).toBe('श्रीरामचरितमानस')
    expect(spec.nameHi).toBe('श्रीरामचरितमानस')
    expect(spec.nameMr).toBe('श्रीरामचरितमानस')
    expect(spec.category).toBe('itihas')
    expect(spec.totalChapters).toBe(7)
  })

  test('contains complete bilingual chapter names across all 7 Kandas (Sopanas)', () => {
    const spec = ramcharitmanasSpec.spec
    expect(Object.keys(spec.chapterNames)).toHaveLength(7)
    expect(Object.keys(spec.chapterNamesHi)).toHaveLength(7)
    expect(Object.keys(spec.chapterNamesMr)).toHaveLength(7)

    expect(spec.chapterNames['1']).toContain('Bal Kand')
    expect(spec.chapterNames['5']).toContain('Sundar Kand')
    expect(spec.chapterNames['7']).toContain('Uttar Kand')

    expect(spec.chapterNamesHi['1']).toContain('बालकाण्ड')
    expect(spec.chapterNamesMr['5']).toContain('सुंदरकांड')
  })

  test('defines authentic author and exegesis lineages', () => {
    const authors = ramcharitmanasSpec.spec.authors
    expect(authors).toHaveLength(2)
    const tulsidas = authors.find(a => a.id === 'goswami-tulsidas')
    expect(tulsidas).toBeDefined()
    expect(tulsidas?.name).toBe('Goswami Tulsidas')
    expect(tulsidas?.lineage).toContain('Ramanandi Sampradaya')

    const gitaPress = authors.find(a => a.id === 'gita-press-gorakhpur')
    expect(gitaPress).toBeDefined()
    expect(gitaPress?.work).toContain('Kalyana Ramayana')
  })

  test('contains valid raw seed verses with multilingual commentary layers', () => {
    const verses = ramcharitmanasSpec.rawVerses
    expect(verses.length).toBeGreaterThanOrEqual(3)

    for (const v of verses) {
      expect(v.chapter).toBeGreaterThan(0)
      expect(v.verse).toBeGreaterThan(0)
      expect(v.original).toBeTruthy()
      expect(v.transliteration).toBeTruthy()
      expect(v.translation).toBeTruthy()
      expect(v.meaning).toBeTruthy()

      expect(v.layers).toBeDefined()
      expect(v.layers['goswami-tulsidas']).toBeDefined()
      expect(v.layers['goswami-tulsidas'].en).toBeTruthy()
      expect(v.layers['goswami-tulsidas'].hi).toBeTruthy()
      expect(v.layers['goswami-tulsidas'].mr).toBeTruthy()

      expect(v.layers['gita-press-gorakhpur']).toBeDefined()
      expect(v.layers['gita-press-gorakhpur'].en).toBeTruthy()
      expect(v.layers['gita-press-gorakhpur'].hi).toBeTruthy()
      expect(v.layers['gita-press-gorakhpur'].mr).toBeTruthy()
    }
  })
})
