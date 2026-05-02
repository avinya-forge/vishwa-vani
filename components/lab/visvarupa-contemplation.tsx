'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface VisionStage {
  id: number
  title: string
  verse: string
  vision: string
  arjunaReacts: string
  contemplation: string
  icon: string
}

const VISION_STAGES: VisionStage[] = [
  {
    id: 1,
    title: 'The Divine Eye Granted',
    verse: 'BG 11.8',
    vision: 'You cannot behold Me with these eyes of yours. I give you divine sight. Behold My mystic opulence.',
    arjunaReacts: 'Arjuna stands still, trembling, aware that ordinary perception is about to be shattered beyond recovery.',
    contemplation: 'Sit quietly. Close your eyes. Notice how you normally "see" — with expectation, with the filter of the known. Now imagine that filter dissolving. What would remain?',
    icon: '👁️',
  },
  {
    id: 2,
    title: 'Thousands of Forms Arise',
    verse: 'BG 11.10–11',
    vision: 'Arjuna sees thousands of divine forms — various colours and shapes, bearing celestial weapons, wearing celestial garlands and garments, anointed with celestial fragrances.',
    arjunaReacts: 'The mind cannot rest on any single form. Multiplicity without limit. The sheer abundance overwhelms every category.',
    contemplation: 'Bring to mind something vast — ocean, night sky, a crowd of faces. Notice how your mind tries to reduce it. Now resist that reduction. Stay with the vastness without naming it.',
    icon: '✨',
  },
  {
    id: 3,
    title: 'All the Universe in One Place',
    verse: 'BG 11.13',
    vision: 'At that time Arjuna could see in the universal form of the Lord the unlimited expansions of the universe situated in one place, although divided into many, many thousands.',
    arjunaReacts: 'The paradox of unity-in-diversity breaks the mind open. Past and future, near and distant — all simultaneous, all one body.',
    contemplation: 'Visualize your body. Now see it as one cell in a vast organism. Expand: the room, the city, the continent, the planet, the solar system — all one continuous whole. You are seeing, and you are seen.',
    icon: '🌌',
  },
  {
    id: 4,
    title: 'The Blazing Sun of Suns',
    verse: 'BG 11.12',
    vision: 'If hundreds of thousands of suns rose up at once into the sky, they might resemble the effulgence of the Supreme Person in that Universal Form.',
    arjunaReacts: 'Arjuna is simultaneously blinded and illuminated. The light does not come from outside — it radiates from the Form\'s own being.',
    contemplation: 'Imagine a light so complete that it casts no shadow — because there is no "outside" for the shadow to fall on. Sit in that imagined light. Who is the one perceiving it?',
    icon: '☀️',
  },
  {
    id: 5,
    title: 'Warriors Enter the Blazing Mouths',
    verse: 'BG 11.26–27',
    vision: 'All the sons of Dhritarashtra, along with their allied kings, and also Bhishma, Drona, Karna, and the other great warriors on our side, are rushing into Your mouths with terrible teeth.',
    arjunaReacts: 'Arjuna recognizes people he loves and fears being consumed in the jaws of time. The vision is terrible precisely because it is true.',
    contemplation: 'Consider something you are afraid to lose — a person, a stage of life, a version of yourself. Sit with the image of that thing being received back into the vast whole. Not destroyed — returned.',
    icon: '🌀',
  },
  {
    id: 6,
    title: 'The Form of Time',
    verse: 'BG 11.32',
    vision: 'I am mighty Time, the source of destruction that has come forth to annihilate the worlds. Even without your participation, all the warriors standing arrayed in the opposing armies shall cease to exist.',
    arjunaReacts: 'Arjuna understands: the outcome is not in his hands. Time itself has already moved. He is being asked only to be the instrument.',
    contemplation: 'Think of something in your life already decided — by time, by circumstance. Feel the weight of trying to control what has already moved. Now feel the release of becoming the instrument rather than the author.',
    icon: '⚡',
  },
  {
    id: 7,
    title: 'Arjuna Begs for the Human Form',
    verse: 'BG 11.45–46',
    vision: 'Seeing this huge form with many mouths and eyes, O mighty-armed, all the worlds are frightened, and so am I. I am disturbed and find no steadiness or peace. Please show me your four-handed form.',
    arjunaReacts: 'Having witnessed everything, Arjuna cannot bear the formless vastness. He longs for Krishna with a face, eyes, a smile — the beloved friend.',
    contemplation: 'After expanding into the vast, turn back to the small. A face you love. A specific gesture. The particular before the universal. Notice that the particular is not less — it is the universal wearing a face.',
    icon: '🙏',
  },
  {
    id: 8,
    title: 'The Gentle Return',
    verse: 'BG 11.50',
    vision: 'Sañjaya said: Vāsudeva, having spoken thus to Arjuna, revealed His own form again and the Supreme Person, appearing in a gentle form, pacified the frightened Arjuna.',
    arjunaReacts: 'Krishna is a person again. The same eyes. The same smile. But Arjuna has been changed by what he saw. He can never see the friend as merely human again.',
    contemplation: 'Return to ordinary perception. Look at a familiar object — a hand, a cup, a window. Let it be exactly what it is. And now let it be also infinite. Hold both. This is the state the Gita calls "seeing the Divine everywhere."',
    icon: '🌸',
  },
]

export default function VisvarupaContemplation() {
  const [stage, setStage] = useState(0)
  const [showContemplation, setShowContemplation] = useState(false)
  const current = VISION_STAGES[stage]

  function advance() {
    if (stage < VISION_STAGES.length - 1) {
      setStage(s => s + 1)
      setShowContemplation(false)
    }
  }
  function retreat() {
    if (stage > 0) {
      setStage(s => s - 1)
      setShowContemplation(false)
    }
  }

  return (
    <VedicAppTemplate
      title="Viśvarūpa Contemplation"
      subtitle="Chapter 11 — Journey through the Universal Form"
      icon="🌌"
      footerNote="Bhagavad Gita Chapter 11 — Vishvarupa Darshana Yoga"
    >
      {/* Stage progress */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {VISION_STAGES.map((s, i) => (
          <button key={s.id} onClick={() => { setStage(i); setShowContemplation(false) }}
            className={`w-7 h-2 rounded-full transition-all duration-300 ${
              i === stage ? 'bg-violet-500 scale-110' : i < stage ? 'bg-violet-300 dark:bg-violet-700' : 'bg-stone-200 dark:bg-stone-700'
            }`}
            title={`Stage ${s.id}: ${s.title}`}
          />
        ))}
      </div>

      {/* Vision stage header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{current.icon}</span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-500 dark:text-violet-400">Stage {current.id} of {VISION_STAGES.length}</p>
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">{current.title}</h3>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">{current.verse}</p>
        </div>
      </div>

      {/* Vision text */}
      <div className="rounded-xl border border-violet-200 dark:border-violet-800/40 bg-violet-50 dark:bg-violet-950/20 p-5 mb-4">
        <p className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">What Arjuna Sees</p>
        <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed italic">&ldquo;{current.vision}&rdquo;</p>
      </div>

      {/* Arjuna's reaction */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 p-4 mb-4">
        <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2">Arjuna's Response</p>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{current.arjunaReacts}</p>
      </div>

      {/* Contemplation */}
      {!showContemplation ? (
        <button onClick={() => setShowContemplation(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-violet-300 dark:border-violet-700 text-xs font-black uppercase tracking-widest text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all">
          Enter Contemplation
        </button>
      ) : (
        <div className="rounded-xl border-2 border-violet-200 dark:border-violet-700 bg-violet-50/80 dark:bg-violet-950/30 p-5">
          <p className="text-xs font-black uppercase tracking-widest text-violet-500 mb-3">Your Practice</p>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{current.contemplation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
        <button onClick={retreat} disabled={stage === 0} className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-violet-500 disabled:opacity-30 transition-colors">← Previous Vision</button>
        <span className="text-xs text-stone-400">{stage + 1} / {VISION_STAGES.length}</span>
        <button onClick={advance} disabled={stage === VISION_STAGES.length - 1} className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-violet-500 disabled:opacity-30 transition-colors">Next Vision →</button>
      </div>
    </VedicAppTemplate>
  )
}
