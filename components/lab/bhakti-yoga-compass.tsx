import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Scenario {
  id: string
  situation: string
  options: {
    text: string
    bhakti: boolean
    explanation: string
  }[]
}

const SCENARIOS: Scenario[] = [
  {
    id: 'no-progress',
    situation: "You've been meditating and chanting daily for months but feel no spiritual progress. How does a bhakta (devotee) respond?",
    options: [
      {
        text: 'Continue the practice with the same love, surrendering the expectation of progress to the Divine.',
        bhakti: true,
        explanation: "Pure bhakti is unconditional — it doesn't require reciprocation or measurable results. Surrender of expectations is itself the highest devotion (Gita 12.16)."
      },
      {
        text: 'Switch to a different practice that gives faster, more tangible results.',
        bhakti: false,
        explanation: 'Seeking results from devotion makes the Divine a means to an end. Bhakti asks: love the Divine for the Divine\'s own sake, not for what you receive (Gita 12.17-18).'
      }
    ]
  },
  {
    id: 'family-criticism',
    situation: 'A family member criticizes your daily puja practice, calling it superstition. A bhakta would:',
    options: [
      {
        text: 'Defend your practice passionately and show them the scriptures to prove them wrong.',
        bhakti: false,
        explanation: 'Reactive defensiveness shows attachment to the form of practice rather than its spirit. A devotee remains equanimous in praise and blame (Gita 12.17).'
      },
      {
        text: 'Listen calmly, remain undisturbed, and continue your practice with inner peace.',
        bhakti: true,
        explanation: "The ideal devotee described in Gita 12.15-19 is one who causes no agitation and is not agitated by others — 'sama-duḥkha-sukhaḥ' (equal in pain and pleasure)."
      }
    ]
  },
  {
    id: 'love-vs-irritation',
    situation: 'You feel a deep love for God during prayer. Later in the day, you feel irritated and impatient with people. What does Gita 12 suggest?',
    options: [
      {
        text: 'True bhakti expresses as loving kindness to all beings — seeing the Divine in everyone, not just in prayer time.',
        bhakti: true,
        explanation: "Gita 12.13: 'adveshṭā sarva-bhūtānāṁ' — the devotee is free from hatred toward all beings. Devotion extends to every interaction, not just ritual time."
      },
      {
        text: 'Compartmentalize — spiritual life is separate from daily interactions with difficult people.',
        bhakti: false,
        explanation: "Compartmentalization shows that devotion hasn't penetrated the personality. Gita 12.13-14 describes the bhakta as kind and patient in all relationships, not just in formal worship."
      }
    ]
  },
  {
    id: 'professional-achievement',
    situation: 'You achieve something significant professionally. As a practitioner of bhakti yoga, you:',
    options: [
      {
        text: 'Thank God for the blessing and feel special that the Divine chose to help you succeed.',
        bhakti: false,
        explanation: 'Feeling specially chosen by God can reinforce ego rather than dissolve it. True bhakti recognizes the Divine as the doer in all beings, not selectively in oneself.'
      },
      {
        text: 'Offer the achievement back to the Divine, recognizing it as grace operating through you, not personal accomplishment.',
        bhakti: true,
        explanation: "Gita 12.11: 'sarva-karma-phala-tyāgaṁ' — renunciation of all fruits of action offered to the Divine. This is the culmination of bhakti — total surrender of doership."
      }
    ]
  }
]

export default function BhaktiYogaCompass() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowExplanation(true)

    const option = SCENARIOS[currentScenario].options[optionIndex]
    if (option.bhakti) {
      setScore(score + 1)
    }
  }

  const nextScenario = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setCurrentScenario(0)
    setScore(0)
    setShowResult(false)
    setSelectedOption(null)
    setShowExplanation(false)
  }

  const footerNote = "Bhakti means loving surrender. The highest devotee (Gita 12.13-20) is equal in joy and sorrow, friend to all, content, patient, and free from ego."

  if (showResult) {
    const percentage = Math.round((score / SCENARIOS.length) * 100)
    return (
      <VedicAppTemplate
        title="Bhakti Compass"
        subtitle="Gita Ch. 12 • Devotion"
        icon="🪷"
        footerNote={footerNote}
      >
        <div className="text-center space-y-6">
          <div className="py-8">
            <div className="text-4xl font-black text-orange-600 dark:text-orange-500 mb-1">{percentage}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Devotional Alignment</div>
          </div>

          <div className="bg-stone-100 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-700/50">
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic font-serif">
              {percentage >= 75
                ? 'Your bhakti compass points true north — toward unconditional surrender. Continue embodying the qualities of Gita 12.13-20 in daily life.'
                : percentage >= 50
                ? 'Your devotion has a strong foundation. Study Gita 12.13-20 for the qualities of the ideal bhakta and practice applying them beyond formal worship.'
                : 'Bhakti begins where ego ends. Return to Gita 12.1-7 and ask: \'Am I serving the Divine or am I serving my idea of the Divine?\''
              }
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20"
          >
            Recalibrate Compass
          </button>
        </div>
      </VedicAppTemplate>
    )
  }

  const scenario = SCENARIOS[currentScenario]

  return (
    <VedicAppTemplate
      title="Bhakti Compass"
      subtitle="Gita Ch. 12 • Devotion"
      icon="🪷"
      footerNote={footerNote}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-400">
          <span>{currentScenario + 1} / {SCENARIOS.length}</span>
          <span className="text-orange-600">Score: {score}</span>
        </div>

        <div className="bg-stone-100/50 dark:bg-stone-800/30 p-6 rounded-[2rem] border border-stone-200/50 dark:border-stone-700/50 min-h-[120px] flex flex-col justify-center">
          <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">{scenario.situation}</p>
        </div>

        {!showExplanation ? (
          <div className="space-y-3">
            {scenario.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className="w-full text-left p-4 bg-white dark:bg-stone-900/40 hover:bg-orange-50 dark:hover:bg-orange-900/10 border border-stone-200 dark:border-stone-800 rounded-2xl transition-all group"
              >
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors leading-relaxed block">{option.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            <div className={`p-5 rounded-3xl border ${
              selectedOption !== null && scenario.options[selectedOption].bhakti
                ? 'bg-green-500/5 border-green-500/30'
                : 'bg-red-500/5 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${selectedOption !== null && scenario.options[selectedOption].bhakti ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {selectedOption !== null && scenario.options[selectedOption].bhakti ? '✓' : '✗'}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedOption !== null && scenario.options[selectedOption].bhakti ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {selectedOption !== null && scenario.options[selectedOption].bhakti ? 'Pure Path' : 'Ego Response'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                {selectedOption !== null && scenario.options[selectedOption].explanation}
              </p>
            </div>

            <button
              onClick={nextScenario}
              className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl"
            >
              {currentScenario < SCENARIOS.length - 1 ? 'Next Step' : 'View Core Alignment'}
            </button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
