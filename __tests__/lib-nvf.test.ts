import { migrateToNVF } from '@/lib/nvf'

describe('migrateToNVF', () => {
  it('migrates legacy fields (original, slok, transliteration, chapter, verse)', () => {
    const legacyData = {
      id: 'bg-1-1',
      chapter: 1,
      verse: 1,
      original: 'test original',
      transliteration: 'test transliteration'
    }

    const nvf = migrateToNVF(legacyData, 'gita', 1)

    expect(nvf.id).toBe('bg-1-1')
    expect(nvf.text_slug).toBe('gita')
    expect(nvf.chapter).toBe(1)
    expect(nvf.verse).toBe(1)
    expect(nvf.original).toBe('test original')
    expect(nvf.transliteration).toBe('test transliteration')
    expect(nvf.layers).toHaveLength(0)
  })

  it('migrates slok fallback if original is not present', () => {
    const legacyData = {
      slok: 'test slok fallback',
    }

    const nvf = migrateToNVF(legacyData, 'gita', 2)
    expect(nvf.original).toBe('test slok fallback')
    expect(nvf.chapter).toBe(2)
  })

  it('maps AUTHOR_KEYS to correct layer types', () => {
    const legacyData = {
      sankar: {
        et: 'English translation by Sankar',
        ec: 'English commentary by Sankar',
        ht: 'Hindi translation by Sankar',
        hc: 'Hindi commentary by Sankar',
        sc: 'Sanskrit commentary by Sankar'
      }
    }

    const nvf = migrateToNVF(legacyData, 'gita')

    expect(nvf.layers).toHaveLength(5)

    expect(nvf.layers).toEqual(expect.arrayContaining([
      { author: 'sankar', lang: 'en', type: 'translation', content: 'English translation by Sankar' },
      { author: 'sankar', lang: 'en', type: 'commentary', content: 'English commentary by Sankar' },
      { author: 'sankar', lang: 'hi', type: 'translation', content: 'Hindi translation by Sankar' },
      { author: 'sankar', lang: 'hi', type: 'commentary', content: 'Hindi commentary by Sankar' },
      { author: 'sankar', lang: 'sa', type: 'commentary', content: 'Sanskrit commentary by Sankar' }
    ]))
  })

  it('preserves existing layers if they exist', () => {
    const legacyData = {
      layers: [
        { author: 'prabhu', lang: 'en', type: 'translation', content: 'Existing layer' }
      ]
    }

    const nvf = migrateToNVF(legacyData, 'gita')
    expect(nvf.layers).toHaveLength(1)
    expect(nvf.layers[0].author).toBe('prabhu')
    expect(nvf.layers[0].content).toBe('Existing layer')
  })

  it('maps anvaya/word_meanings correctly', () => {
    const legacyData1 = {
      anvaya: [{ san: 'a', trn: 'a', en: 'a' }]
    }
    const legacyData2 = {
      word_meanings: [{ san: 'b', trn: 'b', en: 'b' }]
    }

    const nvf1 = migrateToNVF(legacyData1, 'gita')
    expect(nvf1.anvaya).toEqual([{ san: 'a', trn: 'a', en: 'a' }])

    const nvf2 = migrateToNVF(legacyData2, 'gita')
    expect(nvf2.anvaya).toEqual([{ san: 'b', trn: 'b', en: 'b' }])
  })
})
