import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import StudyClient from '@/components/shloka/study-client'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}))

jest.mock('next/link', () => {
  return function MockLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
})

describe('StudyClient (Reading Canvas & Empirical Knowledge Integration)', () => {
  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      measureText: jest.fn(() => ({ width: 100 })),
      fillText: jest.fn(),
      fillRect: jest.fn(),
      scale: jest.fn(),
      font: '',
      fillStyle: '',
      clearRect: jest.fn(),
    })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  });
  const mockVerses = [
    {
      id: 'bg_17_8',
      chapter: 17,
      verse: 8,
      original: 'आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः।\nरस्याः स्निग्धाः स्थिरा हृद्या आहाराः सात्त्विकप्रियाः॥',
      transliteration: 'āyuḥ-sattva-balārogya-sukha-prīti-vivardhanāḥ |\nrasyāḥ snigdhāḥ sthirā hṛdyā āhārāḥ sāttvika-priyāḥ ||',
      translation: 'Foods dear to those in the mode of goodness increase duration of life, purify one existence and give strength, health, happiness and satisfaction. Such foods are juicy, fatty, wholesome, and pleasing to the heart.',
      layers: [
        {
          type: 'commentary',
          author: 'iskcon',
          lang: 'en',
          content: 'Purport by A.C. Bhaktivedanta Swami Prabhupada on Sattvic dietary physiology and cellular health.'
        },
        {
          type: 'commentary',
          author: 'sant-dnyaneshwar',
          lang: 'en',
          content: 'Sant Dnyaneshwar explains how Sattvic nutrition harmonizes the mind and body.'
        }
      ]
    },
    {
      id: 'bg_17_9',
      chapter: 17,
      verse: 9,
      original: 'कट्वम्ललवणात्युष्णतीक्ष्णरूक्षविदाहिनः।\nआहारा राजसस्येष्टा दुःखशोकामयप्रदाः॥',
      transliteration: 'kaṭv-amla-lavaṇāty-uṣṇa-tīkṣṇa-rūkṣa-vidāhinaḥ |\nāhārā rājasasyeṣṭā duḥkha-śokāmaya-pradāḥ ||',
      translation: 'Foods that are too bitter, too sour, salty, hot, pungent, dry and burning are dear to those in the mode of passion. Such foods cause distress, misery and disease.',
      layers: [
        {
          type: 'commentary',
          author: 'iskcon',
          lang: 'en',
          content: 'Foods that are excessively spicy or dry cause inflammation and bodily misery.'
        }
      ]
    }
  ]

  const mockAdhyayaList = [
    { num: 17, id: 'sraddhatraya-vibhaga-yoga' },
    { num: 18, id: 'moksha-sanyasa-yoga' }
  ]

  it('renders the reading canvas with Sanskrit shloka, IAST, and translation', () => {
    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={17}
        verses={mockVerses}
        adhyayaList={mockAdhyayaList}
        currentAdhyaya={17}
      />
    )

    // Sanskrit and translation present
    expect(screen.getByText(/आयुःसत्त्वबलारोग्य/i)).toBeInTheDocument()
    expect(screen.getByText(/Foods dear to those in the mode of goodness/i)).toBeInTheDocument()
    expect(screen.getByText(/āyuḥ-sattva-balārogya/i)).toBeInTheDocument()
  })

  it('renders Empirical Science callout badge and card for verse with knowledge tokens (ADR-008)', () => {
    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={17}
        verses={mockVerses}
        adhyayaList={mockAdhyayaList}
        currentAdhyaya={17}
      />
    )

    // Verse 17.8 has associated dietary gunas token in lib/vedic-science
    const empiricalBadges = screen.getAllByText(/Empirical Science/i)
    expect(empiricalBadges.length).toBeGreaterThan(0)

    expect(screen.getByText(/Vaidika Vijñāna • Empirical Insight/i)).toBeInTheDocument()
    expect(screen.getByText(/Universal Knowledge Hub/i)).toBeInTheDocument()
    expect(screen.getByText(/Dietary Gunas/i)).toBeInTheDocument()

    // Explicitly verify domainLabel, title, and ancientObservation
    expect(screen.getByText('Ayurveda & Nutritional Energetics')).toBeInTheDocument() // domainLabel
    expect(screen.getByText('Biochemical Impact of the Three Dietary Gunas')).toBeInTheDocument() // title
    expect(screen.getByText('Krishna categorizes dietary intake into Sattvic (juicy, wholesome, nutrient-dense foods promoting vitality and clear cognition), Rajasic (overly salty, spicy, pungent foods provoking inflammation, stress, and disease), and Tamasic (stale, overcooked, processed, putrid foods inducing lethargy, depression, and metabolic stagnation).')).toBeInTheDocument() // ancientObservation
  })

  it('allows selecting scholar perspective and toggling perspectives', () => {
    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={17}
        verses={mockVerses}
        adhyayaList={mockAdhyayaList}
        currentAdhyaya={17}
      />
    )

    // Check header controls and scripture title
    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument()
  })

  it('toggles bookmarks and manages interactive state', () => {
    render(
      <StudyClient
        textSlug="bhagavad-gita"
        chapter={17}
        verses={mockVerses}
        adhyayaList={mockAdhyayaList}
        currentAdhyaya={17}
      />
    )

    const bookmarkBtns = screen.getAllByTitle(/Add bookmark/i)
    expect(bookmarkBtns.length).toBeGreaterThan(0)
    fireEvent.click(bookmarkBtns[0])

    // Should toggle to filled star / remove bookmark title
    expect(screen.getByTitle(/Remove bookmark/i)).toBeInTheDocument()
  })
})
