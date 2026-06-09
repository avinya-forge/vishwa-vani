import fs from 'fs'
import path from 'path'

describe('Yoga Sutras Silver Tier Coverage', () => {
  const silverPath = path.join(process.cwd(), 'data', '2-silver', 'yoga-sutras', 'yoga-sutras-chapter-1.json')

  it('should have chapter 1 silver file', () => {
    expect(fs.existsSync(silverPath)).toBe(true)
  })

  it('should have basic verse structure', () => {
    const data = JSON.parse(fs.readFileSync(silverPath, 'utf8'))
    const firstVerse = data[0]

    expect(firstVerse.chapter).toBe(1)
    expect(firstVerse.verse).toBe(1)
  })
})
