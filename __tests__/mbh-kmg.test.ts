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

describe('Mahabharata Gold Data - KMG Translation', () => {
  const goldDir = path.join(process.cwd(), 'data/3-gold/mahabharata')

  it('contains Parvas 1, 2, and 3', () => {
    expect(fs.existsSync(path.join(goldDir, 'parva-1'))).toBe(true)
    expect(fs.existsSync(path.join(goldDir, 'parva-2'))).toBe(true)
    expect(fs.existsSync(path.join(goldDir, 'parva-3'))).toBe(true)
  })

  it('has valid KMG layers in Adi Parva Adhyaya 1', () => {
    const file = path.join(goldDir, 'parva-1/adhyaya-1.json')
    const adhyaya1: NVFFragment[] = JSON.parse(fs.readFileSync(file, 'utf-8'))
    expect(adhyaya1.length).toBeGreaterThan(0)
    const verse0 = adhyaya1.find((v: NVFFragment) => v.verse === 0)
    expect(verse0).toBeDefined()
    const kmgLayer = verse0?.layers.find((l: FragmentLayer) => l.author === 'km_ganguli')
    expect(kmgLayer).toBeDefined()
    expect(kmgLayer?.content).toContain('Translation pending alignment')
  })

  it('has valid KMG layers in Sabha Parva Adhyaya 1', () => {
    const file = path.join(goldDir, 'parva-2/adhyaya-1.json')
    const adhyaya1: NVFFragment[] = JSON.parse(fs.readFileSync(file, 'utf-8'))
    expect(adhyaya1.length).toBeGreaterThan(0)
    const verse1 = adhyaya1[0]
    const kmgLayer = verse1.layers.find((l: FragmentLayer) => l.author === 'km_ganguli')
    expect(kmgLayer).toBeDefined()
    expect(kmgLayer?.content.length).toBeGreaterThan(50)
  })
})
