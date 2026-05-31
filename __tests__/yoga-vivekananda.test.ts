import fs from 'fs'
import path from 'path'

describe('Yoga Sutras Gold Tier Coverage', () => {
  const goldPath = path.join(process.cwd(), 'data', '3-gold', 'yoga-sutras', 'yoga-sutras-chapter-1.json')

  it('should have chapter 1 gold file', () => {
    expect(fs.existsSync(goldPath)).toBe(true)
  })

  it('should have Vivekananda translation and mandatory metadata', () => {
    const data = JSON.parse(fs.readFileSync(goldPath, 'utf8'))
    const firstVerse = data[0]

    expect(firstVerse.chapter).toBe(1)
    expect(firstVerse.verse).toBe(1)
    expect(firstVerse.layers.some((l: any) => l.author === 'vivekananda')).toBe(true)

    const vLayer = firstVerse.layers.find((l: any) => l.author === 'vivekananda')
    expect(vLayer.author_name).toBeDefined()
    expect(vLayer.author_label).toBeDefined()
    expect(vLayer.content.length).toBeGreaterThan(80)
  })
})
