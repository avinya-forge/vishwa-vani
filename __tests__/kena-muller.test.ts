import { SCHOLARS_REGISTRY } from '../lib/scholars'
import fs from 'fs'
import path from 'path'

describe('Kena Upanishad Gold Tier Coverage', () => {
  const goldPath = path.join(process.cwd(), 'data', '3-gold', 'kena-upanishad', 'kena-upanishad-chapter-1.json')

  it('should have chapter 1 gold file', () => {
    expect(fs.existsSync(goldPath)).toBe(true)
  })

  it('should have Max Muller translation and mandatory metadata', () => {
    const data = JSON.parse(fs.readFileSync(goldPath, 'utf8'))
    const firstVerse = data[0]

    expect(firstVerse.chapter).toBe(1)
    expect(firstVerse.verse).toBe(1)
    expect(firstVerse.layers.some((l: any) => l.author === 'max_muller')).toBe(true)

    const mmLayer = firstVerse.layers.find((l: any) => l.author === 'max_muller')
    expect(mmLayer.author_name).toBeDefined()
    expect(mmLayer.author_label).toBeDefined()
    expect(mmLayer.content.length).toBeGreaterThan(80)
  })
})
