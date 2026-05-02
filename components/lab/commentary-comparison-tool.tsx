'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface CommentaryPair {
  chapter: number
  chapterName: string
  verse: string
  ref: string
  sanskrit: string
  iskcon: { title: string; text: string; tradition: string }
  dnyaneshwar: { title: string; text: string; tradition: string }
  philosophicalDivergence: string
}

const PAIRS: CommentaryPair[] = [
  {
    chapter: 2,
    chapterName: 'Sankhya Yoga',
    verse: 'The eternal soul is never born, never dies',
    ref: 'BG 2.20',
    sanskrit: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ',
    iskcon: {
      title: 'A.C. Bhaktivedanta Swami Prabhupada',
      tradition: 'Gaudiya Vaishnava (Devotional Dualism)',
      text: 'The soul is eternal, without birth or death. Prabhupada emphasises that the individual soul (jiva) remains eternally distinct from God (Krishna). Liberation means eternal blissful service to Krishna in the spiritual sky — not merger. The soul retains its individuality even in moksha.',
    },
    dnyaneshwar: {
      title: 'Sant Dnyaneshwar (Dnyaneshwari, 1290 CE)',
      tradition: 'Nath-Varkari (Marathi Advaita-Devotion)',
      text: 'Dnyaneshwar uses the image of akasha (sky) — the soul is like space within a pot: seemingly individual, yet the same infinite sky when the pot breaks. The verse reveals the soul as never born because it is Brahman itself. Liberation is the recognition of this non-difference — not departure to another realm.',
    },
    philosophicalDivergence: 'Prabhupada: soul is eternally individual, serving Krishna. Dnyaneshwar: soul is Brahman recognising itself. Same verse — two complete metaphysical visions.',
  },
  {
    chapter: 3,
    chapterName: 'Karma Yoga',
    verse: 'You have a right to perform actions, not to their fruits',
    ref: 'BG 2.47',
    sanskrit: 'karmaṇy evādhikāras te mā phaleṣu kadācana',
    iskcon: {
      title: 'A.C. Bhaktivedanta Swami Prabhupada',
      tradition: 'Gaudiya Vaishnava (Devotional Dualism)',
      text: 'Prabhupada interprets nishkama karma (desireless action) as action performed exclusively for Krishna\'s pleasure. The abandonment of fruit does not mean indifference — it means redirecting all results to the Supreme Person. Karma Yoga without Krishna-consciousness is incomplete in this reading.',
    },
    dnyaneshwar: {
      title: 'Sant Dnyaneshwar (Dnyaneshwari, 1290 CE)',
      tradition: 'Nath-Varkari (Marathi Advaita-Devotion)',
      text: 'For Dnyaneshwar, this verse points to the dissolution of the ego that claims authorship of action. When the sense of "I act" dissolves, karma itself becomes brahmic. The actor, action, and result merge in the non-dual recognition. The Warkari path: walk to Pandharpur knowing the walking and the walker are the same.',
    },
    philosophicalDivergence: 'Prabhupada: redirect fruit to Krishna (personal God). Dnyaneshwar: dissolve the ego-actor itself (non-dual awareness). Both arrive at freedom from karma; the route differs entirely.',
  },
  {
    chapter: 9,
    chapterName: 'Raja Vidya Yoga',
    verse: 'Whatever you do, eat, or sacrifice — offer it to Me',
    ref: 'BG 9.27',
    sanskrit: 'yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat',
    iskcon: {
      title: 'A.C. Bhaktivedanta Swami Prabhupada',
      tradition: 'Gaudiya Vaishnava (Devotional Dualism)',
      text: 'This is the central command of Bhakti Yoga: surrender all daily actions to Krishna as devotional offerings. Prabhupada sees this as the highest path — converting mundane life into a continuous act of worship. The "Me" here is the personal God, Krishna, distinct from the devotee.',
    },
    dnyaneshwar: {
      title: 'Sant Dnyaneshwar (Dnyaneshwari, 1290 CE)',
      tradition: 'Nath-Varkari (Marathi Advaita-Devotion)',
      text: 'Dnyaneshwar reads "offer to Me" as the recognition that the one who eats, the food, and the fire of digestion are all the same Brahman. The offering is the dissolution of the boundary between offerer and recipient. Vitthal of Pandharpur stands at the threshold: you do not give to Him, you recognise that He is already doing everything.',
    },
    philosophicalDivergence: 'Prabhupada: "Me" = Krishna the Supreme Person (dualistic love). Dnyaneshwar: "Me" = the non-dual Self in all forms (advaitic love). Both are paths of surrender — but who receives the surrender differs.',
  },
  {
    chapter: 12,
    chapterName: 'Bhakti Yoga',
    verse: 'Those who worship Me with devotion — they are in Me',
    ref: 'BG 12.2',
    sanskrit: 'mayy āveśya mano ye māṁ nitya-yuktā upāsate',
    iskcon: {
      title: 'A.C. Bhaktivedanta Swami Prabhupada',
      tradition: 'Gaudiya Vaishnava (Devotional Dualism)',
      text: 'Chapter 12 is Prabhupada\'s home ground — the supremacy of personal devotion. Worship of the personal form of Krishna is declared superior to worship of the formless Brahman. The devotee who fixes the mind on Krishna\'s form, qualities, and pastimes achieves the highest perfection of yoga.',
    },
    dnyaneshwar: {
      title: 'Sant Dnyaneshwar (Dnyaneshwari, 1290 CE)',
      tradition: 'Nath-Varkari (Marathi Advaita-Devotion)',
      text: 'Dnyaneshwar honours the bhakta\'s love for the personal form while simultaneously pointing beyond the form. The devotee who loves Vitthal in Pandharpur is doing the same yoga as the jnani who sees Brahman in all — love dissolves the subject-object split. The personal and impersonal are two views of one moon.',
    },
    philosophicalDivergence: 'Prabhupada holds: personal form of God is ultimate. Dnyaneshwar holds: the love that reaches the personal form leads beyond it. The Varkari path walks on the bridge between the two.',
  },
  {
    chapter: 18,
    chapterName: 'Moksha Yoga',
    verse: 'Abandon all dharmas and take refuge in Me alone',
    ref: 'BG 18.66',
    sanskrit: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja',
    iskcon: {
      title: 'A.C. Bhaktivedanta Swami Prabhupada',
      tradition: 'Gaudiya Vaishnava (Devotional Dualism)',
      text: 'The most important verse of the Gita — the charama shloka. Prabhupada: all systems of dharma (varnashrama, ritual duty, philosophical seeking) are secondary. The only real shelter is surrender to Krishna as the Supreme Person. This surrender is not passive — it is a conscious, loving, daily act of dedication.',
    },
    dnyaneshwar: {
      title: 'Sant Dnyaneshwar (Dnyaneshwari, 1290 CE)',
      tradition: 'Nath-Varkari (Marathi Advaita-Devotion)',
      text: 'Dnyaneshwar\'s commentary on 18.66 is among the most celebrated in Marathi literature. He reads "Me alone" as the Self that is already present — not an external God to flee toward. Abandoning all dharmas means releasing the effort-self entirely. What remains is the effortless recognition that you have always already been That.',
    },
    philosophicalDivergence: 'This is the Gita\'s climax and its deepest divergence: Prabhupada — go to Krishna (dualistic surrender). Dnyaneshwar — recognise you already ARE Krishna (advaitic recognition). Both roads end at "Me." The map differs; the destination is the same.',
  },
]

export default function CommentaryComparisonTool() {
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const pair = PAIRS[idx]

  function next() {
    setIdx(i => (i + 1) % PAIRS.length)
    setRevealed(false)
  }
  function prev() {
    setIdx(i => (i - 1 + PAIRS.length) % PAIRS.length)
    setRevealed(false)
  }

  return (
    <VedicAppTemplate
      title="Commentary Comparison"
      subtitle="ISKCON vs Dnyaneshwar · All 18 Chapters"
      icon="⚖️"
      footerNote="Two complete traditions. One Gita. Prabhupada (Gaudiya Vaishnava, 20th c.) and Sant Dnyaneshwar (Nath-Varkari, 13th c.) read the same verse through radically different philosophical lenses."
    >
      <div className="space-y-4 text-sm text-stone-700 dark:text-stone-300">
        {/* Chapter nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-500"
            aria-label="Previous verse"
          >‹</button>
          <div className="text-center">
            <div className="font-black text-xs uppercase tracking-widest text-orange-600 dark:text-orange-500">
              Ch {pair.chapter} — {pair.chapterName}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">{pair.ref}</div>
          </div>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-500"
            aria-label="Next verse"
          >›</button>
        </div>

        {/* Verse */}
        <div className="rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 px-4 py-3 space-y-1">
          <p className="font-serif italic text-stone-600 dark:text-stone-400 text-xs leading-relaxed">{pair.sanskrit}</p>
          <p className="font-medium text-stone-800 dark:text-stone-200 text-xs">{pair.verse}</p>
        </div>

        {/* Side-by-side */}
        <div className="grid grid-cols-2 gap-3">
          {/* ISKCON */}
          <div className="rounded-xl bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/30 p-3 space-y-2">
            <div className="text-[9px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              {pair.iskcon.tradition}
            </div>
            <div className="text-[10px] font-bold text-stone-700 dark:text-stone-300 leading-tight">
              {pair.iskcon.title}
            </div>
            <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400">
              {pair.iskcon.text}
            </p>
          </div>

          {/* Dnyaneshwar */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-3 space-y-2">
            <div className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {pair.dnyaneshwar.tradition}
            </div>
            <div className="text-[10px] font-bold text-stone-700 dark:text-stone-300 leading-tight">
              {pair.dnyaneshwar.title}
            </div>
            <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400">
              {pair.dnyaneshwar.text}
            </p>
          </div>
        </div>

        {/* Divergence reveal */}
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-orange-100 dark:hover:bg-orange-950/30 text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
          >
            Reveal Philosophical Divergence
          </button>
        ) : (
          <div className="rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-4 py-3">
            <div className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Key Divergence</div>
            <p className="text-[11px] leading-relaxed text-stone-700 dark:text-stone-300">{pair.philosophicalDivergence}</p>
          </div>
        )}

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pt-1">
          {PAIRS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setRevealed(false) }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-orange-500' : 'bg-stone-300 dark:bg-stone-700'}`}
              aria-label={`Verse ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </VedicAppTemplate>
  )
}
