'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Dilemma {
  id: string
  situation: string
  options: {
    text: string
    dharmic: boolean
    explanation: string
  }[]
}

const DILEMMAS: Dilemma[] = [
  {
    id: 'colleague-credit',
    situation:
      'You discover a colleague has been taking credit for your team\'s work in reports to senior management. Your dharmic response according to Gita 2:',
    options: [
      {
        text: 'Address the issue directly and honestly with the colleague first, then escalate if needed — without personal animosity.',
        dharmic: true,
        explanation:
          'Dharma requires truth (satya) and courage (abhaya — freedom from fear, Gita 16.1). Speaking truth without anger is the svadharma of one in a position of responsibility.',
      },
      {
        text: 'Let it go to avoid conflict — peaceful non-confrontation is more spiritual.',
        dharmic: false,
        explanation:
          'Gita 2.33: "If you refuse this righteous battle, then having abandoned your own dharma and fame, you will incur sin." Avoiding necessary truth-speaking is adharma, not ahimsa.',
      },
    ],
  },
  {
    id: 'misleading-data',
    situation:
      'Your company asks you to present data in a way that technically isn\'t false but creates a misleading impression. You:',
    options: [
      {
        text: 'Comply — it\'s legal, others do it, and refusing could cost you your position.',
        dharmic: false,
        explanation:
          'Gita 16.4 lists aversion to truth as an asuri quality. Rationalized dishonesty — even when legal — belongs to the asuri category.',
      },
      {
        text: 'Raise your concern to decision-makers, and if overruled, refuse and accept the consequences of integrity.',
        dharmic: true,
        explanation:
          'Gita 16.1-3 — daivi qualities include fearlessness, truthfulness, and non-deception. Dharma sometimes demands personal cost. Gita 2.38: equal in pain and pleasure, act for dharma\'s sake.',
      },
    ],
  },
  {
    id: 'friend-referral',
    situation:
      'You can help a friend get a job at your company — they are qualified but another candidate is slightly more qualified. What is the dharmic action?',
    options: [
      {
        text: 'Recommend your friend honestly while disclosing the relationship; let the decision-makers decide with full information.',
        dharmic: true,
        explanation:
          'This is satya (truth) in action — supporting someone you care about while ensuring transparency. It honors both relationship-dharma and institutional fairness.',
      },
      {
        text: 'Don\'t mention your friendship and advocate strongly for your friend — the outcome is better for them.',
        dharmic: false,
        explanation:
          'Concealing a conflict of interest is deception (dambha — hypocrisy — listed in Gita 16.4 as an asuri quality). Good intentions don\'t purify adharmic means.',
      },
    ],
  },
  {
    id: 'own-mistake',
    situation: 'You realize you made a significant mistake at work. Dharmic action according to Gita:',
    options: [
      {
        text: 'Cover it up if possible — the mistake can be fixed quietly and admitting it serves no one.',
        dharmic: false,
        explanation:
          'Concealment involves deceit (dambha) and cowardice (abhaya abandoned), both asuri qualities (Gita 16.4). The desire to protect image over truth is ego-preservation, not dharma.',
      },
      {
        text: 'Acknowledge it immediately, own full responsibility, and focus energy on the solution.',
        dharmic: true,
        explanation:
          'Gita 16.1: abhayam (fearlessness), satya (truthfulness), and asteya (non-stealing — which includes not hiding error). Accountability is a daivi quality.',
      },
    ],
  },
]

export default function DharmaDecisionMatrix() {
  const [currentDilemma, setCurrentDilemma] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    if (DILEMMAS[currentDilemma].options[optionIndex].dharmic) {
      setScore(score + 1)
    }
  }

  const nextDilemma = () => {
    if (currentDilemma < DILEMMAS.length - 1) {
      setCurrentDilemma(currentDilemma + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setCurrentDilemma(0)
    setScore(0)
    setShowResult(false)
    setSelectedOption(null)
    setShowExplanation(false)
  }

  if (showResult) {
    const percentage = Math.round((score / DILEMMAS.length) * 100)
    const message =
      percentage >= 75
        ? 'Your dharmic compass is well calibrated. You understand that dharma requires both integrity and courage — not comfort. Continue applying Gita 16\'s daivi qualities in professional life.'
        : percentage >= 50
        ? 'Good foundation. Study Gita 16.1-3 (daivi qualities) and 16.4 (asuri qualities) for sharper discrimination. Dharma often requires uncomfortable honesty.'
        : 'Dharma is not what is easy but what is right. Return to Gita 2.31-38 — "Better is one\'s own dharma, though imperfectly performed, than the dharma of another well performed."'

    return (
      <VedicAppTemplate
        title="Dharma Assessment"
        subtitle="Gita Ch. 2 & 16 • Ethical Discernment"
        icon="🏛️"
        darkMode={true}
        footerNote="Dharma is not rule-following but the courageous, truthful action aligned with one's role. Gita 16 distinguishes daivi from asuri qualities — honesty, fearlessness, and transparency define the former."
      >
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🏛️</div>
          <h3 className="text-2xl font-serif font-black text-white mb-4">Dharma Score</h3>
          <div className="text-5xl font-black text-orange-400 mb-2">{percentage}%</div>
          <p className="text-stone-300 mb-6">
            Chose the dharmic path in {score} of {DILEMMAS.length} dilemmas.
          </p>
          <div className="bg-stone-800/50 p-6 rounded-2xl mb-6">
            <p className="text-stone-200 text-sm leading-relaxed">{message}</p>
          </div>
          <button
            onClick={reset}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
          >
            Practice Again
          </button>
        </div>
      </VedicAppTemplate>
    )
  }

  const dilemma = DILEMMAS[currentDilemma]

  return (
    <VedicAppTemplate
      title="Dharma Decision Matrix"
      subtitle="Gita Ch. 2 & 16 • Ethical Discernment"
      icon="🏛️"
      darkMode={true}
      footerNote="Dharma is not rule-following but the courageous, truthful action aligned with one's role. Gita 16 distinguishes daivi from asuri qualities — honesty, fearlessness, and transparency define the former."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm text-stone-400">
          <span>Dilemma {currentDilemma + 1} of {DILEMMAS.length}</span>
          <span>Score: {score}/{DILEMMAS.length}</span>
        </div>

        <div className="bg-stone-800/30 p-6 rounded-2xl">
          <h4 className="text-lg font-serif font-bold text-white mb-4">Ethical Dilemma</h4>
          <p className="text-stone-200 leading-relaxed">{dilemma.situation}</p>
        </div>

        {!showExplanation ? (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-300 uppercase tracking-widest">Choose the dharmic action:</h4>
            {dilemma.options.map((option, index) => (
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
              selectedOption !== null && dilemma.options[selectedOption].dharmic
                ? 'bg-green-900/20 border-green-600'
                : 'bg-red-900/20 border-red-600'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-lg ${selectedOption !== null && dilemma.options[selectedOption].dharmic ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedOption !== null && dilemma.options[selectedOption].dharmic ? '✅' : '❌'}
                </span>
                <span className={`font-bold ${selectedOption !== null && dilemma.options[selectedOption].dharmic ? 'text-green-300' : 'text-red-300'}`}>
                  {selectedOption !== null && dilemma.options[selectedOption].dharmic ? 'Daivi — Dharmic Action' : 'Asuri — Ego-Driven Action'}
                </span>
              </div>
              <p className="text-stone-200 text-sm leading-relaxed">
                {selectedOption !== null && dilemma.options[selectedOption].explanation}
              </p>
            </div>
            <button
              onClick={nextDilemma}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
            >
              {currentDilemma < DILEMMAS.length - 1 ? 'Next Dilemma' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
