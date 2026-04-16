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
      "You discover a colleague has been taking credit for your team's work in reports to senior management. Your dharmic response according to Gita 2:",
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
      "Your company asks you to present data in a way that technically isn't false but creates a misleading impression. You:",
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

  const footerNote = "Dharma is not rule-following but the courageous, truthful action aligned with one's role. Gita 16 distinguishes daivi from asuri qualities — honesty, fearlessness, and transparency define the former."

  if (showResult) {
    const percentage = Math.round((score / DILEMMAS.length) * 100)
    return (
      <VedicAppTemplate
        title="Dharma Assessment"
        subtitle="Gita Ch. 2 & 16 • Ethics"
        icon="⚖️"
        footerNote={footerNote}
      >
        <div className="text-center space-y-6">
          <div className="py-8">
            <div className="text-4xl font-black text-orange-600 dark:text-orange-500 mb-1">{percentage}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Ethical Discernment</div>
          </div>

          <div className="bg-stone-100 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-700/50">
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic font-serif">
               {percentage >= 75
                ? 'Your dharmic compass is well calibrated. You understand that dharma requires both integrity and courage. Continue applying Gita 16\'s daivi qualities.'
                : percentage >= 50
                ? 'Good foundation. Study Gita 16.1-3 (daivi qualities) and 16.4 (asuri qualities) for sharper discrimination. Dharma often requires uncomfortable honesty.'
                : 'Dharma is not what is easy but what is right. Return to Gita 2.31-38 — "Better is one\'s own dharma, though imperfectly performed."'
              }
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20"
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
      title="Dharma Matrix"
      subtitle="Gita Ch. 2 & 16 • Ethics"
      icon="⚖️"
      footerNote={footerNote}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-400">
          <span>{currentDilemma + 1} / {DILEMMAS.length}</span>
          <span className="text-orange-600">Score: {score}</span>
        </div>

        <div className="bg-stone-100/50 dark:bg-stone-800/30 p-6 rounded-[2rem] border border-stone-200/50 dark:border-stone-700/50 min-h-[120px] flex flex-col justify-center">
          <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">{dilemma.situation}</p>
        </div>

        {!showExplanation ? (
          <div className="space-y-3">
            {dilemma.options.map((option, index) => (
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
              selectedOption !== null && dilemma.options[selectedOption].dharmic
                ? 'bg-green-500/5 border-green-500/30'
                : 'bg-red-500/5 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${selectedOption !== null && dilemma.options[selectedOption].dharmic ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {selectedOption !== null && dilemma.options[selectedOption].dharmic ? '✓' : '✗'}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedOption !== null && dilemma.options[selectedOption].dharmic ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {selectedOption !== null && dilemma.options[selectedOption].dharmic ? 'Daivi Path' : 'Asuri Action'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                {selectedOption !== null && dilemma.options[selectedOption].explanation}
              </p>
            </div>

            <button
              onClick={nextDilemma}
              className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl"
            >
              {currentDilemma < DILEMMAS.length - 1 ? 'Next Step' : 'View Core Alignment'}
            </button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
