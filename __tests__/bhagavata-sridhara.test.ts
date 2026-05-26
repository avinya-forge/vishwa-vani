import { SCHOLARS_REGISTRY } from '../lib/scholars'
import fs from 'fs'
import path from 'path'

describe('BHAG-SCH-01 Sridhara Svami Commentary', () => {
  it('has Sridhara Svami registered in scholars', () => {
    const scholar = SCHOLARS_REGISTRY.find(s => s.id === 'sridhara')
    expect(scholar).toBeDefined()
    expect(scholar?.displayName).toContain('Śrīdhara Svāmī')
    expect(scholar?.availableLanguages).toContain('hi')
  })

  it('has mock silver data promoted to gold with Sridhara layers for Chapter 1', () => {
    const manifestPath = path.join(__dirname, '..', 'data', 'manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    const bhagavata = manifest.books.find((b: any) => b.book_id === 'bhagavata-purana')
    expect(bhagavata.status).toBe('GOLD')

    const chapter1Path = path.join(__dirname, '..', 'data', '3-gold', 'bhagavata-purana', 'bhagavata-purana-chapter-1.json')
    const chapter1 = JSON.parse(fs.readFileSync(chapter1Path, 'utf8'))
    expect(chapter1).toBeDefined()
    expect(chapter1.length).toBeGreaterThan(0)

    const verse1 = chapter1.find((v: any) => v.verse === 1)
    expect(verse1).toBeDefined()

    const sridharaEn = verse1?.layers.find((l: any) => l.author === 'sridhara' && l.lang === 'en')
    expect(sridharaEn).toBeDefined()
    expect(sridharaEn?.content).toContain('Sridhara Svami explains')
  })
})
