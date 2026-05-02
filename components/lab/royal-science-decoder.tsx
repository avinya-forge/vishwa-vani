'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Secret {
  number: number
  verse: string
  title: string
  secret: string
  practice: string
  icon: string
}

const ROYAL_SECRETS: Secret[] = [
  {
    number: 1,
    verse: 'BG 9.2',
    title: 'The King of All Knowledge',
    secret: 'This knowledge is the sovereign of all sciences and the most secret of all secrets. It is the best of all purifiers and it gives direct perception of the Self. It is the perfection of religion and is joyfully performed.',
    practice: 'Read the Gita not as history but as direct transmission. Each verse is a mirror. Ask: "What in me is this pointing to?" Do this with one verse today.',
    icon: '👑',
  },
  {
    number: 2,
    verse: 'BG 9.4–5',
    title: 'All is in Me; I am Not in All',
    secret: 'By Me — in My unmanifested form — this entire universe is pervaded. All beings are in Me, but I am not in them. And yet everything that exists is in Me.',
    practice: 'Choose an object. See it as sustained by a sustaining presence that does not depend on it. The object exists within something — what is that something? Stay with the silence behind the object.',
    icon: '🌊',
  },
  {
    number: 3,
    verse: 'BG 9.6',
    title: 'As Wind Moves in Space',
    secret: 'As the mighty wind, blowing everywhere, rests always in ethereal space, know that in the same manner all beings rest in Me.',
    practice: 'Breathe. Notice that breath moves through you but does not belong to you. The breath is the wind; you are the space. Sit with this for three breaths.',
    icon: '💨',
  },
  {
    number: 4,
    verse: 'BG 9.10',
    title: 'Material Nature is My Womb',
    secret: 'This material nature, which is one of My energies, is working under My direction, O son of Kunti, producing all moving and non-moving beings. Under its rule this manifestation is created and annihilated again and again.',
    practice: 'Observe one cycle today: breath in and out, tide in and out, thought arising and dissolving. Each cycle is a universe being born and reabsorbed. You are watching the cosmic pattern in miniature.',
    icon: '♾️',
  },
  {
    number: 5,
    verse: 'BG 9.14',
    title: 'The Great Souls Always Sing',
    secret: 'The great souls, O son of Pṛthā, who are not deluded, are under the protection of the divine nature. They are fully engaged in devotional service, singing My glories.',
    practice: 'Sing one verse of the Gita today — even silently, even imperfectly. Or find a name of God and repeat it while doing one ordinary task. This is the mahātmā\'s practice simplified for daily life.',
    icon: '🎶',
  },
  {
    number: 6,
    verse: 'BG 9.22',
    title: 'I Carry What They Lack and Preserve What They Have',
    secret: 'To those who are constantly devoted to serving Me with love, I give the understanding by which they can come to Me. Out of compassion for them, I, dwelling in their hearts, destroy with the shining lamp of knowledge the darkness born of ignorance.',
    practice: 'Notice where you feel unsupported today. Turn toward that feeling rather than away from it. Ask: "What understanding am I being given in this difficulty?" Wait for the answer.',
    icon: '🕯️',
  },
  {
    number: 7,
    verse: 'BG 9.26',
    title: 'Even a Leaf, Given With Devotion',
    secret: 'If one offers Me with devotion a leaf, a flower, a fruit, or even water, I will accept it. Whatever you do, whatever you eat, whatever you offer or give away, whatever austerities you perform — do that as an offering to Me.',
    practice: 'Before your next meal, pause for one second and offer it. The offering takes no time — only the shift of attention. Notice whether the meal tastes different after.',
    icon: '🌿',
  },
  {
    number: 8,
    verse: 'BG 9.29',
    title: 'I Am Equal to All; None Are My Favorites',
    secret: 'I envy no one, nor am I partial to anyone. I am equal to all. But whoever renders service unto Me in devotion is a friend, is in Me, and I am also a friend to them.',
    practice: 'Today, extend equal goodwill to one person you find difficult and one person you naturally love. Hold both in the same quality of attention for one minute. This is the imitation of divine equanimity.',
    icon: '⚖️',
  },
  {
    number: 9,
    verse: 'BG 9.34',
    title: 'Fix Your Mind on Me — This is the Summit',
    secret: 'Engage your mind always in thinking of Me, become My devotee, offer obeisances to Me. Worshipping Me thus, you will come to Me without fail. I promise you this because you are My very dear friend.',
    practice: 'At the end of today, bring one image of Krishna — or whatever form of the Divine you relate to — to mind. Hold it for 30 seconds before sleep. This is the summit practice in its simplest form.',
    icon: '🌅',
  },
]

export default function RoyalScienceDecoder() {
  const [revealed, setRevealed] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const current = selected !== null ? ROYAL_SECRETS[selected] : null

  return (
    <VedicAppTemplate
      title="Royal Science Decoder"
      subtitle="Chapter 9 — Unlock the 9 Secrets of Rāja Vidyā"
      icon="👑"
      footerNote="Bhagavad Gita Chapter 9 — Raja Vidya Raja Guhya Yoga"
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-black uppercase tracking-widest text-amber-500">{revealed} of 9 secrets revealed</span>
        <div className="flex gap-1">
          {ROYAL_SECRETS.map((s, i) => (
            <div key={s.number} className={`w-3 h-3 rounded-full transition-all ${i < revealed ? 'bg-amber-400 dark:bg-amber-500' : 'bg-stone-200 dark:bg-stone-700'}`} />
          ))}
        </div>
      </div>

      {/* Secret list */}
      <div className="space-y-2 mb-5">
        {ROYAL_SECRETS.map((s, i) => {
          const unlocked = i < revealed
          const isSelected = selected === i
          return (
            <div key={s.number}>
              {unlocked ? (
                <button
                  onClick={() => setSelected(isSelected ? null : i)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30'
                      : 'border-stone-200 dark:border-stone-700 hover:border-amber-200 dark:hover:border-amber-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{s.verse}</span>
                      </div>
                      <p className="text-sm font-bold text-stone-800 dark:text-stone-200 truncate">{s.title}</p>
                    </div>
                    <span className="text-stone-300 dark:text-stone-600 text-xs">{isSelected ? '▲' : '▼'}</span>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800/40">
                      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3 italic">&ldquo;{s.secret}&rdquo;</p>
                      <div className="bg-stone-50 dark:bg-stone-900/50 rounded-lg p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Today's Practice</p>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{s.practice}</p>
                      </div>
                    </div>
                  )}
                </button>
              ) : (
                <div className="p-3 rounded-xl border border-dashed border-stone-200 dark:border-stone-800 opacity-40">
                  <div className="flex items-center gap-3">
                    <span className="text-lg grayscale">🔒</span>
                    <p className="text-sm text-stone-400">Secret {s.number} — locked</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Reveal button */}
      {revealed < ROYAL_SECRETS.length ? (
        <button
          onClick={() => { setRevealed(r => r + 1); setSelected(revealed) }}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-widest transition-colors shadow-sm"
        >
          Reveal Secret {revealed + 1} →
        </button>
      ) : (
        <div className="text-center py-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">All 9 Secrets Revealed</span>
        </div>
      )}
    </VedicAppTemplate>
  )
}
