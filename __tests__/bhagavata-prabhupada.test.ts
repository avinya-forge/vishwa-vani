import { SCHOLARS_REGISTRY } from '../lib/scholars'
import fs from 'fs'
import path from 'path'

describe('BHAG Prabhupada Commentary', () => {
  it('has Prabhupada registered in scholars', () => {
    const scholar = SCHOLARS_REGISTRY.find(s => s.id === 'prabhupada')
    expect(scholar).toBeDefined()
    expect(scholar?.displayName).toContain('Bhaktivedanta')
    expect(scholar?.availableLanguages).toContain('en')
  })

  it('has scraped silver data promoted to gold with Prabhupada layers for Chapter 1', () => {
    const manifestPath = path.join(__dirname, '..', 'data', 'manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    const bhagavata = manifest.books.find((b: { book_id: string; status: string }) => b.book_id === 'bhagavata-purana')
    expect(bhagavata.status).toBe('GOLD')
    expect(bhagavata.total_verses).toBe(718)

    const chapter1Path = path.join(__dirname, '..', 'data', '3-gold', 'bhagavata-purana', 'bhagavata-purana-chapter-1.json')
    const chapter1 = JSON.parse(fs.readFileSync(chapter1Path, 'utf8'))
    expect(chapter1).toBeDefined()
    expect(chapter1.length).toBeGreaterThan(0)

    const verse1 = chapter1.find((v: { verse: number; layers: { author: string; lang: string; content: string }[] }) => v.verse === 1)
    expect(verse1).toBeDefined()

    const prabhupadaEn = verse1?.layers.find((l: { author: string; lang: string; content: string }) => l.author === 'prabhupada' && l.lang === 'en')
    expect(prabhupadaEn).toBeDefined()
    expect(prabhupadaEn?.content).toContain('Obeisances')
  })
})
