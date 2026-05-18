import fs from 'fs'
import path from 'path'

interface FragmentLayer {
  author: string
  content: string
}

interface NVFFragment {
  id: string
  verse: number
  layers: FragmentLayer[]
}

describe('Mahabharata Gold Data - Nilakantha Commentary', () => {
  const goldDir = path.join(process.cwd(), 'data/3-gold/mahabharata/parva-1')

  it('contains injected Nilakantha layers', () => {
    const file = path.join(goldDir, 'adhyaya-1.json')
    expect(fs.existsSync(file)).toBe(true)
    const adhyaya1: NVFFragment[] = JSON.parse(fs.readFileSync(file, 'utf-8'))
    expect(adhyaya1.length).toBeGreaterThan(0)

    // Find at least one verse with nilakantha
    const verseWithNilakantha = adhyaya1.find(v => v.layers && v.layers.some((l: FragmentLayer) => l.author === 'nilakantha'))
    expect(verseWithNilakantha).toBeDefined()

    const layer = verseWithNilakantha?.layers.find((l: FragmentLayer) => l.author === 'nilakantha')
    expect(layer?.content.length).toBeGreaterThan(5)
  })
})
