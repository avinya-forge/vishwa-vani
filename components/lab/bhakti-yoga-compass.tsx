'use client'

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
    situation: 'You\'ve been meditating and chanting daily for months but feel no spiritual progress. How does a bhakta (devotee) respond?',
    options: [
      {
        text: 'Continue the practice with the same love, surrendering the expectation of progress to the Divine.',
        bhakti: true,
        explanation: 'Pure bhakti is unconditional — it doesn\'t require reciprocation or measurable results. Surrender of expectations is itself the highest devotion (Gita 12.16).'
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
        explanation: 'The ideal devotee described in Gita 12.15-19 is one who causes no agitation and is not agitated by others — \'sama-duḥkha-sukhaḥ\' (equal in pain and pleasure).'
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
        explanation: 'Gita 12.13: \'adveshṭā sarva-bhūtānāṁ\' — the devotee is free from hatred toward all beings. Devotion extends to every interaction, not just ritual time.'
      },
      {
        text: 'Compartmentalize — spiritual life is separate from daily interactions with difficult people.',
        bhakti: false,
        explanation: 'Compartmentalization shows that devotion hasn\'t penetrated the personality. Gita 12.13-14 describes the bhakta as kind and patient in all relationships, not just in formal worship.'
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
        explanation: 'Gita 12.11: \'sarva-karma-phala-tyāgaṁ\' — renunciation of all fruits of action offered to the Divine. This is the culmination of bhakti — total surrender of doership.'
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

  if (showResult) {
    const percentage = Math.round((score / SCENARIOS.length) * 100)
    return (
      <VedicAppTemplate
        title="Bhakti Yoga Compass"
        subtitle="Gita Ch. 12 • Devotion & Surrender"
        icon="🪷"
        darkMode={true}
        footerNote="Bhakti means loving surrender. The highest devotee (Gita 12.13-20) is equal in joy and sorrow, friend to all, content, patient, and free from ego."
      >
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🪷</div>
          <h3 className="text-2xl font-serif font-black text-white mb-4">Your Bhakti Compass Reading</h3>
          <div className="text-5xl font-black text-orange-400 mb-2">{percentage}%</div>
          <p className="text-stone-300 mb-6">
            Your response reflected genuine bhakti in {score} out of {SCENARIOS.length} situations.
          </p>

          <div className="bg-stone-800/50 p-6 rounded-2xl mb-6">
            <p className="text-stone-200 text-sm leading-relaxed">
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
            className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
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
      title="Bhakti Yoga Compass"
      subtitle="Gita Ch. 12 • Devotion & Surrender"
      icon="🪷"
      darkMode={true}
      footerNote="Bhakti means loving surrender. The highest devotee (Gita 12.13-20) is equal in joy and sorrow, friend to all, content, patient, and free from ego."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm text-stone-400">
          <span>Scenario {currentScenario + 1} of {SCENARIOS.length}</span>
          <span>Score: {score}/{SCENARIOS.length}</span>
        </div>

        <div className="bg-stone-800/30 p-6 rounded-2xl">
          <h4 className="text-lg font-serif font-bold text-white mb-4">Situation</h4>
          <p className="text-stone-200 leading-relaxed">{scenario.situation}</p>
        </div>

        {!showExplanation ? (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-300 uppercase tracking-widest">Choose your response:</h4>
            {scenario.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className="w-full text-left p-4 bg-stone-800/20 hover:bg-stone-700/30 border border-stone-700 rounded-xl transition-all"
              >
                <span className="text-stone-200">{option.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border-2 ${
              selectedOption !== null && scenario.options[selectedOption].bhakti
                ? 'bg-green-900/20 border-green-600'
                : 'bg-red-900/20 border-red-600'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-lg ${selectedOption !== null && scenario.options[selectedOption].bhakti ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedOption !== null && scenario.options[selectedOption].bhakti ? '✅' : '❌'}
                </span>
                <span className={`font-bold ${selectedOption !== null && scenario.options[selectedOption].bhakti ? 'text-green-300' : 'text-red-300'}`}>
                  {selectedOption !== null && scenario.options[selectedOption].bhakti ? 'Bhakti Path' : 'Ego-Driven Response'}
                </span>
              </div>
              <p className="text-stone-200 text-sm leading-relaxed">
                {selectedOption !== null && scenario.options[selectedOption].explanation}
              </p>
            </div>

            <button
              onClick={nextScenario}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
            >
              {currentScenario < SCENARIOS.length - 1 ? 'Next Scenario' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
