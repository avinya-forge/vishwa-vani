'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type ResponseMode = 'warrior' | 'knowledge' | 'devotion'

interface Doubt {
  id: number
  verse: string
  arjunaSays: string
  doubt: string
  responses: Record<ResponseMode, { teaching: string; gitaRef: string; insight: string }>
}

const ARJUNA_DOUBTS: Doubt[] = [
  {
    id: 1,
    verse: 'BG 1.28',
    arjunaSays: 'dṛṣṭvemaṃ svajanaṃ kṛṣṇa yuyutsuṃ samupasthitam',
    doubt: 'Seeing all my kinsmen arrayed for battle, O Krishna, my limbs fail and my mouth is parched. I cannot stand here any longer.',
    responses: {
      warrior: {
        teaching: 'A Kshatriya who retreats from a righteous battle incurs sin, not glory. The battlefield is your altar of duty — to flee is the greater dishonour.',
        gitaRef: 'BG 2.33',
        insight: 'Duty (Dharma) supersedes personal emotion. The warrior path sees sacred obligation where the heart sees grief.',
      },
      knowledge: {
        teaching: 'You grieve for those who should not be grieved for. The wise grieve neither for the living nor the dead — the soul is eternal, beyond the sword.',
        gitaRef: 'BG 2.11',
        insight: 'The Jnana path dissolves grief by revealing its cause: identification with the perishable body rather than the immortal Self.',
      },
      devotion: {
        teaching: 'Surrender all your actions to Me. I am the refuge for all living beings. Fix your mind on Me and you will cross over all difficulties by My grace.',
        gitaRef: 'BG 18.66',
        insight: 'Bhakti transforms the battlefield: the devotee fights not for victory but as an act of love, leaving outcome entirely to the Divine.',
      },
    },
  },
  {
    id: 2,
    verse: 'BG 1.36',
    arjunaSays: 'nihatya dhārtarāṣṭrān naḥ kā prītiḥ syāj janārdana',
    doubt: 'What pleasure shall we find in killing the sons of Dhritarashtra? Sin will overcome us if we slay these aggressors.',
    responses: {
      warrior: {
        teaching: 'When Dharma is at stake, inaction itself becomes the greater sin. A surgeon causes pain to heal — so the warrior causes pain to restore righteousness.',
        gitaRef: 'BG 3.8',
        insight: 'The warrior understands that righteous action, even painful, upholds the cosmic order. Inaction in the face of adharma is itself adharma.',
      },
      knowledge: {
        teaching: 'Actions bind only when done with the sense of "I am the doer." Know yourself as the witness — the Atman neither kills nor is killed.',
        gitaRef: 'BG 2.19',
        insight: 'From the Jnana lens: the Self is beyond agency. "Sin" arises from ego-identification with action, not from the action itself in service of truth.',
      },
      devotion: {
        teaching: 'I am the source of all actions. Offer every act to Me without attachment to results. You become an instrument of the Divine will, free from sin.',
        gitaRef: 'BG 9.27',
        insight: 'Bhakti dissolves the doer: when you offer action to God, the question of personal sin becomes irrelevant — you are His instrument, not the agent.',
      },
    },
  },
  {
    id: 3,
    verse: 'BG 1.40',
    arjunaSays: 'kulakṣaye praṇaśyanti kuladharmāḥ sanātanāḥ',
    doubt: 'With the destruction of dynasty, the eternal family traditions are destroyed. When tradition is lost, irreligion corrupts the whole family.',
    responses: {
      warrior: {
        teaching: 'A corrupted dynasty sustained by cowardice is already destroyed inwardly. It is better for a family to uphold Dharma in one great act than to linger in adharma.',
        gitaRef: 'BG 2.40',
        insight: 'The warrior path judges family honour not by bloodline survival but by the quality of action — a righteous fall is greater than a cowardly continuation.',
      },
      knowledge: {
        teaching: 'Traditions are upheld in consciousness, not in bodies. The Atman of your ancestors, being eternal, is never destroyed — only your attachment to form creates this fear.',
        gitaRef: 'BG 2.20',
        insight: 'Jnana reveals that what is truly "eternal" in tradition cannot be destroyed by a sword. The fear of losing tradition is the ego fearing its own impermanence.',
      },
      devotion: {
        teaching: 'I am the protector of those who take refuge in Me. The true lineage is one of love and devotion — this survives all dynasties and all battles.',
        gitaRef: 'BG 9.22',
        insight: 'Bhakti reframes lineage: the true family tradition is the chain of devotion linking souls to God. This lineage cannot be broken by war.',
      },
    },
  },
  {
    id: 4,
    verse: 'BG 1.45',
    arjunaSays: 'yadi mām apratīkāram aśastraṃ śastrapāṇayaḥ',
    doubt: 'It would be better if the sons of Dhritarashtra, weapons in hand, should kill me unarmed and unresisting. That I could better bear.',
    responses: {
      warrior: {
        teaching: 'This sentiment is noble but confused. A warrior who lays down arms without cause does not attain peace — he abandons his post and invites adharma to triumph.',
        gitaRef: 'BG 2.3',
        insight: 'The warrior path distinguishes genuine non-violence from disguised weakness. True ahimsa is not the refusal to act — it is acting without hatred.',
      },
      knowledge: {
        teaching: 'This wish to be killed reveals attachment to the idea of personal purity. True wisdom cares neither for praise nor blame — it acts from understanding, not emotion.',
        gitaRef: 'BG 2.14',
        insight: 'Jnana sees through this impulse: it is ego seeking to escape moral complexity by martyrdom. The wise face complexity with equanimity, not flight.',
      },
      devotion: {
        teaching: 'Do not yield to unmanliness, Arjuna. This does not befit you. Stand up and fight — your natural duty calls, and I am with you in every breath.',
        gitaRef: 'BG 2.3',
        insight: "Krishna's love for Arjuna is stern here: a true friend does not let you collapse into self-pity. Bhakti gives the courage to fulfil duty because the Beloved walks beside you.",
      },
    },
  },
  {
    id: 5,
    verse: 'BG 1.47',
    arjunaSays: 'evam uktvārjunaḥ saṃkhye rathopastha upāviśat',
    doubt: 'Having spoken thus, Arjuna cast aside his bow and arrows and sat down on the chariot in the midst of the battlefield, his mind overwhelmed with grief.',
    responses: {
      warrior: {
        teaching: 'Even the greatest warriors face the moment of collapse. What defines them is not the collapse but the rising. This is not your end — it is your beginning.',
        gitaRef: 'BG 11.33',
        insight: 'Collapse before rising is often the pattern of true heroism. The warrior code does not shame the moment of doubt — it honours the courage to continue.',
      },
      knowledge: {
        teaching: 'This silence is profound. In dropping the bow, you created the space for the Gita to speak. The mind that thinks it knows never learns — the empty hand can receive wisdom.',
        gitaRef: 'BG 4.34',
        insight: 'Jnana traditions honour this moment of cognitive surrender: the ego must exhaust its arguments before the Self can speak. Arjuna\'s grief is the gateway to the Gita.',
      },
      devotion: {
        teaching: 'You have surrendered to Me, Arjuna — perhaps without knowing it. In casting down your weapons and sitting in grief before Me, you have already taken the first step of Bhakti.',
        gitaRef: 'BG 2.7',
        insight: 'The devotional eye sees Arjuna\'s collapse as the most intimate moment in the Gita: the soul finally still enough to hear God\'s voice. Surrender precedes all teaching.',
      },
    },
  },
]

const MODE_CONFIG: Record<ResponseMode, { label: string; icon: string; color: string; desc: string }> = {
  warrior: {
    label: 'Warrior Ethics',
    icon: '⚔️',
    color: 'border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/20',
    desc: 'Duty, Dharma, righteous action',
  },
  knowledge: {
    label: 'Path of Knowledge',
    icon: '🪔',
    color: 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20',
    desc: 'Jnana, Sankhya, eternal Self',
  },
  devotion: {
    label: 'Path of Devotion',
    icon: '🌺',
    color: 'border-orange-200 dark:border-orange-800/50 bg-orange-50 dark:bg-orange-950/20',
    desc: 'Bhakti, surrender, grace',
  },
}

export default function ArjunasCrisisCounselor() {
  const [doubtIndex, setDoubtIndex] = useState(0)
  const [selectedMode, setSelectedMode] = useState<ResponseMode | null>(null)

  const doubt = ARJUNA_DOUBTS[doubtIndex]
  const response = selectedMode ? doubt.responses[selectedMode] : null

  return (
    <VedicAppTemplate
      title="Arjuna's Crisis Counselor"
      subtitle="Chapter 1 — Play Krishna. Choose your response path."
      icon="⚔️"
      footerNote="Bhagavad Gita Chapter 1 — Arjuna Visada Yoga"
    >
      {/* Progress pills */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {ARJUNA_DOUBTS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => { setDoubtIndex(i); setSelectedMode(null) }}
            className={`w-8 h-2 rounded-full transition-all duration-200 ${
              i === doubtIndex
                ? 'bg-orange-500'
                : i < doubtIndex
                  ? 'bg-orange-200 dark:bg-orange-800'
                  : 'bg-stone-200 dark:bg-stone-700'
            }`}
            title={`Doubt ${d.id}: ${d.verse}`}
          />
        ))}
      </div>

      {/* Arjuna's doubt */}
      <div className="mb-6 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-widest text-stone-400">Arjuna speaks</span>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">{doubt.verse}</span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic font-mono mb-3">{doubt.arjunaSays}</p>
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{doubt.doubt}</p>
      </div>

      {/* Mode selector */}
      <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-3">
        How does Krishna respond?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {(Object.keys(MODE_CONFIG) as ResponseMode[]).map(mode => {
          const cfg = MODE_CONFIG[mode]
          const active = selectedMode === mode
          return (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                active
                  ? cfg.color + ' border-opacity-100 scale-[1.02]'
                  : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
              }`}
            >
              <div className="text-xl mb-1">{cfg.icon}</div>
              <div className="text-sm font-bold text-stone-800 dark:text-stone-200">{cfg.label}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{cfg.desc}</div>
            </button>
          )
        })}
      </div>

      {/* Krishna's response */}
      {response && selectedMode && (
        <div className={`rounded-xl border-2 p-5 transition-all duration-300 ${MODE_CONFIG[selectedMode].color}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{MODE_CONFIG[selectedMode].icon}</span>
            <span className="text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Krishna responds — {MODE_CONFIG[selectedMode].label}
            </span>
          </div>
          <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed mb-4">
            &ldquo;{response.teaching}&rdquo;
          </p>
          <div className="border-t border-stone-200 dark:border-stone-700 pt-3 mt-3">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mr-2">{response.gitaRef}</span>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-1 italic">{response.insight}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
        <button
          onClick={() => { setDoubtIndex(Math.max(0, doubtIndex - 1)); setSelectedMode(null) }}
          disabled={doubtIndex === 0}
          className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-orange-500 disabled:opacity-30 transition-colors"
        >
          ← Previous Doubt
        </button>
        <span className="text-xs text-stone-400">{doubtIndex + 1} / {ARJUNA_DOUBTS.length}</span>
        <button
          onClick={() => { setDoubtIndex(Math.min(ARJUNA_DOUBTS.length - 1, doubtIndex + 1)); setSelectedMode(null) }}
          disabled={doubtIndex === ARJUNA_DOUBTS.length - 1}
          className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-orange-500 disabled:opacity-30 transition-colors"
        >
          Next Doubt →
        </button>
      </div>
    </VedicAppTemplate>
  )
}
