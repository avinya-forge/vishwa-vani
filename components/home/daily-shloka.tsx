'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface ScholarCommentary {
  scholar: string
  lineage: string
  icon: string
  content: string
}

interface DailyVerse {
  id: string
  bookSlug: string
  bookName: string
  bookNameDevanagari: string
  chapter: number
  verse: number
  theme: string
  category: string
  sanskrit: string
  transliteration: string
  translation: string
  commentaries: ScholarCommentary[]
}

const WISDOM_CORPUS: DailyVerse[] = [
  {
    id: 'bg-2-47',
    bookSlug: 'bhagavad-gita',
    bookName: 'Bhagavad Gītā',
    bookNameDevanagari: 'श्रीमद्भगवद्गीता',
    chapter: 2,
    verse: 47,
    theme: 'Karma Yoga · Nishkama Karma',
    category: 'Itihāsa',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
    translation: 'You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to inaction.',
    commentaries: [
      {
        scholar: 'Sant Dnyaneshwar',
        lineage: 'Warkari / Bhakti (Dnyaneshwari)',
        icon: '🌺',
        content: 'O Arjuna, attend solely to your dharma without letting the desire for fruits touch your heart. Like an obedient gardener who tends the tree with pure love leaving the ripening of fruits to the divine seasons, so must you offer all actions unto the supreme without claiming ownership over their harvest.'
      },
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Advaita Vedānta',
        icon: '🕉️',
        content: 'Action alone belongs to the domain of the qualified aspirant; anxiety for fruits generates bondage and rebirth. When actions are executed as an offering to Ishvara without selfish thirst, they cleanse the intellect (chitta-shuddhi) and prepare the seeker for ultimate non-dual Knowledge.'
      },
      {
        scholar: 'A.C. Bhaktivedanta Swami Prabhupada',
        lineage: 'Gauḍīya Vaiṣṇava',
        icon: '📿',
        content: 'Prescribed duties must be executed as a matter of devotional duty without expecting personal sense enjoyment. When one acts for the pleasure of Krishna, one is freed from the karmic reactions of both virtue and vice.'
      }
    ]
  },
  {
    id: 'isha-1',
    bookSlug: 'isha-upanishad',
    bookName: 'Īśā Upaniṣad',
    bookNameDevanagari: 'ईशोपनिषद्',
    chapter: 1,
    verse: 1,
    theme: 'Brahman · Sacred Renunciation',
    category: 'Upaniṣad',
    sanskrit: 'ॐ ईशा वास्यमिदँ सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
    transliteration: 'oṁ īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||',
    translation: 'All this, whatever moves in this moving world, is enveloped by the Supreme Lord. Find your joy through self-renunciation; covet not anyone’s wealth.',
    commentaries: [
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Advaita Vedānta',
        icon: '🕉️',
        content: 'Everything mutable in this universe is pervaded by Ishvara, the pure Supreme Self. Recognizing that the divine alone is real, one casts away the false illusion of personal possessiveness and enjoys inner tranquility without coveting ephemeral worldly riches.'
      },
      {
        scholar: 'Swami Vivekananda',
        lineage: 'Practical Vedānta',
        icon: '✨',
        content: 'See God in everything. When you realize that the divine spirit permeates your neighbour, your friend, and every atom in the cosmos, selfishness melts away and infinite freedom takes its place.'
      }
    ]
  },
  {
    id: 'ys-1-2',
    bookSlug: 'yoga-sutras',
    bookName: 'Yoga Sūtras of Patañjali',
    bookNameDevanagari: 'पातञ्जलयोगसूत्राणि',
    chapter: 1,
    verse: 2,
    theme: 'Citta-Vṛtti-Nirodha · Samādhi',
    category: 'Darśana',
    sanskrit: 'योगश्चित्तवृत्तिनिरोधः ॥',
    transliteration: 'yogaś citta-vṛtti-nirodhaḥ ||',
    translation: 'Yoga is the stilling of the fluctuations, modifications, and whirlpools of the mind-stuff.',
    commentaries: [
      {
        scholar: 'Maharishi Vyāsa',
        lineage: 'Sāṅkhya-Yoga Bhāṣya',
        icon: '🧘',
        content: 'The mind-field (citta) possesses three qualities—Sattva, Rajas, and Tamas. When the modifications of consciousness are calmed through dispassionate practice (abhyāsa) and detachment (vairāgya), the seer rests in its pure, radiant true nature.'
      },
      {
        scholar: 'Swami Sivananda',
        lineage: 'Divine Life Society',
        icon: '🌿',
        content: 'Control of the mind is the supreme victory. When the waters of the lake of the mind are completely quiet without thought-waves, the jewel of the Atman at the bottom shines forth in spotless splendor.'
      }
    ]
  },
  {
    id: 'kena-1-2',
    bookSlug: 'kena-upanishad',
    bookName: 'Kena Upaniṣad',
    bookNameDevanagari: 'केनोपनिषद्',
    chapter: 1,
    verse: 2,
    theme: 'Transcendent Consciousness · Brahman',
    category: 'Upaniṣad',
    sanskrit: 'श्रोत्रस्य श्रोत्रं मनसो मनो यद्वाचो ह वाचं स उ प्राणस्य प्राणः ।\nचक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥',
    transliteration: 'śrotrasya śrotraṁ manaso mano yad vāco ha vācaṁ sa u prāṇasya prāṇaḥ |\ncakṣuṣaś cakṣur atimucya dhīrāḥ pretyāsmāl lokād amṛtā bhavanti ||',
    translation: 'It is the Ear of the ear, the Mind of the mind, the Speech of speech, the Life of life, and the Eye of the eye. The wise, giving up identification with sensory instruments, transcend this world and attain immortality.',
    commentaries: [
      {
        scholar: 'Adi Shankaracharya',
        lineage: 'Advaita Vedānta',
        icon: '🕉️',
        content: 'The senses and intellect cannot operate by their own power; they are inert without the conscious light of Brahman. Brahman is the ultimate witnessing consciousness that empowers hearing to hear and seeing to see, remaining forever beyond sensory limitation.'
      }
    ]
  },
  {
    id: 'bg-18-66',
    bookSlug: 'bhagavad-gita',
    bookName: 'Bhagavad Gītā',
    bookNameDevanagari: 'श्रीमद्भगवद्गीता',
    chapter: 18,
    verse: 66,
    theme: 'Śaraṇāgati · Supreme Liberation',
    category: 'Itihāsa',
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
    translation: 'Abandoning all varieties of duty, surrender unto Me alone. I shall deliver you from all sinful reactions; do not grieve.',
    commentaries: [
      {
        scholar: 'Ramanujacharya',
        lineage: 'Viśiṣṭādvaita',
        icon: '🪷',
        content: 'This is the Carama Shloka—the crowning gem of divine compassion. When the soul realizes its inability to cross the ocean of Samsara through mere intellectual discipline, total unreserved self-surrender (prapatti) to the Supreme Lord instantly grants liberation.'
      },
      {
        scholar: 'Sant Dnyaneshwar',
        lineage: 'Warkari / Bhakti (Dnyaneshwari)',
        icon: '🌺',
        content: 'When the river merges into the vast ocean, does it maintain separate duties as a stream? Lay down the burden of righteousness and unrighteousness at the feet of the Beloved; I take complete responsibility for your being.'
      }
    ]
  }
]

export default function DailyShloka() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedScholarIndex, setSelectedScholarIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  // Rotate verse on mount based on day-of-year or randomize gracefully
  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const initialIndex = dayOfYear % WISDOM_CORPUS.length
    setCurrentIndex(initialIndex)
  }, [])

  // Reset scholar index on verse change
  useEffect(() => {
    setSelectedScholarIndex(0)
  }, [currentIndex])

  const verse = WISDOM_CORPUS[currentIndex]
  const activeCommentary = verse.commentaries[selectedScholarIndex] || verse.commentaries[0]

  const nextVerse = () => {
    setCurrentIndex(prev => (prev + 1) % WISDOM_CORPUS.length)
  }

  const prevVerse = () => {
    setCurrentIndex(prev => (prev - 1 + WISDOM_CORPUS.length) % WISDOM_CORPUS.length)
  }

  const copyToClipboard = async () => {
    const textToCopy = `${verse.bookName} ${verse.chapter}.${verse.verse}\n\n${verse.sanskrit}\n\n${verse.transliteration}\n\nTranslation: ${verse.translation}\n\nSource: Vishwa-Vani Universal Library`
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-16 sm:my-24">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-2xl pointer-events-none -z-10" />

      {/* Main Study Card */}
      <div className="bg-white/90 backdrop-blur-xl border border-amber-200/80 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-800">
                दैनिक श्लोक · Daily Shloka
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-full border border-amber-200">
                {verse.theme}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevVerse}
              className="p-1.5 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 bg-white text-stone-500 transition-colors text-xs font-bold"
              title="Previous Shloka"
              aria-label="Previous Shloka"
            >
              &larr;
            </button>
            <button
              onClick={nextVerse}
              className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 bg-white text-stone-600 transition-colors text-xs font-bold flex items-center gap-1"
              title="Cycle to next Shloka"
            >
              <span>✦</span>
              <span className="hidden sm:inline">Next Shloka</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1.5 px-2.5 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 bg-white text-stone-600 transition-colors text-xs font-bold"
              title="Copy Shloka text"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <Link
              href={`/${verse.bookSlug}/${verse.chapter}`}
              className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
            >
              <span>Study</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Shloka Scripture Title Banner */}
        <div className="px-6 sm:px-10 pt-6 pb-2 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-stone-400">
            {verse.category} · {verse.bookName}
          </p>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 mt-1">
            {verse.bookNameDevanagari} · {verse.chapter}.{verse.verse}
          </h3>
        </div>

        {/* Devanagari Sanskrit */}
        <div className="px-6 sm:px-12 py-6 text-center">
          <p className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-stone-900 leading-[1.8] sm:leading-[1.9] tracking-normal select-text whitespace-pre-line drop-shadow-sm">
            {verse.sanskrit}
          </p>

          {/* IAST Transliteration */}
          <p className="mt-6 text-stone-600 font-serif italic text-base sm:text-lg leading-[1.8] max-w-2xl mx-auto whitespace-pre-line">
            {verse.transliteration}
          </p>
        </div>

        {/* Universal Translation */}
        <div className="px-6 sm:px-10 py-6 border-t border-amber-100/80 bg-stone-50/50">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-2.5 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-orange-500 rounded-full" />
            Universal Translation
          </p>
          <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-serif">
            &ldquo;{verse.translation}&rdquo;
          </p>
        </div>

        {/* Multi-Scholar Commentary Section */}
        {verse.commentaries && verse.commentaries.length > 0 && (
          <div className="px-6 sm:px-10 py-6 border-t border-amber-100/80 bg-orange-50/20">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                Commentary Perspectives ({verse.commentaries.length})
              </p>
              
              {/* Scholar selector tabs */}
              <div className="flex flex-wrap gap-1.5">
                {verse.commentaries.map((c, i) => (
                  <button
                    key={c.scholar}
                    onClick={() => setSelectedScholarIndex(i)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedScholarIndex === i
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-white border border-stone-200 text-stone-600 hover:border-orange-300'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.scholar}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Commentary Box */}
            <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{activeCommentary.icon}</span>
                <span className="text-xs font-black uppercase tracking-wider text-orange-900">
                  {activeCommentary.scholar}
                </span>
                <span className="text-[10px] text-stone-400 font-serif italic">
                  ({activeCommentary.lineage})
                </span>
              </div>
              <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed font-serif">
                {activeCommentary.content}
              </p>
            </div>
          </div>
        )}

        {/* Card Footer with Direct Study Link */}
        <div className="px-6 sm:px-10 py-4 bg-stone-50/80 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-400 font-serif italic">
            Verse {currentIndex + 1} of {WISDOM_CORPUS.length} curated timeless gems
          </span>
          <Link
            href={`/${verse.bookSlug}/${verse.chapter}`}
            className="font-bold text-orange-700 hover:text-orange-800 transition-colors flex items-center gap-1"
          >
            <span>Read Complete Chapter {verse.chapter} in Study Canvas</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
