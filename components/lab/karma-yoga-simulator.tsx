import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Scenario {
  id: string
  situation: string
  options: {
    text: string
    karmaYoga: boolean
    explanation: string
  }[]
}

const SCENARIOS: Scenario[] = [
  {
    id: 'work-rejection',
    situation: 'Your project proposal was rejected by your manager, despite months of hard work.',
    options: [
      {
        text: 'Complain to colleagues and blame the manager',
        karmaYoga: false,
        explanation: 'This attaches you to the fruits of your work and creates negative karma through complaining.'
      },
      {
        text: 'Accept feedback, learn from it, and continue working diligently',
        karmaYoga: true,
        explanation: 'True karma yoga: perform your duty without attachment to results, using every experience as an opportunity for growth.'
      }
    ]
  },
  {
    id: 'success-recognition',
    situation: 'You receive public recognition and a bonus for your excellent work performance.',
    options: [
      {
        text: 'Feel proud and tell everyone about your achievement',
        karmaYoga: false,
        explanation: 'Attachment to praise creates ego and binds you to the fruits of action.'
      },
      {
        text: 'Accept the recognition gracefully and continue working with the same dedication',
        karmaYoga: true,
        explanation: 'Karma yoga: accept both success and failure equally, maintaining equanimity in all situations.'
      }
    ]
  },
  {
    id: 'difficult-task',
    situation: 'You are assigned a challenging task that seems beyond your current capabilities.',
    options: [
      {
        text: 'Try to delegate it or find excuses to avoid the responsibility',
        karmaYoga: false,
        explanation: 'Avoiding duty creates negative karma and prevents spiritual growth.'
      },
      {
        text: 'Accept the challenge, do your best, and surrender the results to divine will',
        karmaYoga: true,
        explanation: 'Perfect karma yoga: perform your duty with full effort while remaining detached from outcomes.'
      }
    ]
  }
]

export default function KarmaYogaSimulator() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    
    const option = SCENARIOS[currentScenario].options[optionIndex]
    if (option.karmaYoga) {
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

  const footerNote = "Gita 2.47: 'Your right is to work only, but never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction.'"

  if (showResult) {
    const percentage = Math.round((score / SCENARIOS.length) * 100)
    return (
      <VedicAppTemplate
        title="Karma Assessment"
        subtitle="Gita Ch. 3 • Detached Action"
        icon="⚖️"
        footerNote={footerNote}
      >
        <div className="text-center space-y-6">
          <div className="py-8">
            <div className="text-4xl font-black text-orange-600 dark:text-orange-500 mb-1">{percentage}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Detachment Level</div>
          </div>

          <div className="bg-stone-100 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-700/50">
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic font-serif">
              {percentage >= 80 
                ? "Excellent! You demonstrate strong understanding of karma yoga principles. Continue practicing detachment in daily life."
                : percentage >= 60
                ? "Good progress! Focus on maintaining equanimity in challenging situations and remember that results are not in your control."
                : "Keep practicing! Karma yoga requires consistent effort. Review the Bhagavad Gita's teachings on detached action."
              }
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20"
          >
            Reset Simulator
          </button>
        </div>
      </VedicAppTemplate>
    )
  }

  const scenario = SCENARIOS[currentScenario]

  return (
    <VedicAppTemplate
      title="Karma Yoga"
      subtitle="Gita Ch. 3 • Detached Action"
      icon="⚖️"
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
        ) : selectedOption !== null ? (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            <div className={`p-5 rounded-3xl border ${
              scenario.options[selectedOption].karmaYoga
                ? 'bg-green-500/5 border-green-500/30'
                : 'bg-red-500/5 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${scenario.options[selectedOption].karmaYoga ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {scenario.options[selectedOption].karmaYoga ? '✓' : '✗'}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${scenario.options[selectedOption].karmaYoga ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {scenario.options[selectedOption].karmaYoga ? 'Yogic Path' : 'Ego Motive'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                {scenario.options[selectedOption].explanation}
              </p>
            </div>

            <button
              onClick={nextScenario}
              className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl"
            >
              {currentScenario < SCENARIOS.length - 1 ? 'Next Step' : 'View Action Legacy'}
            </button>
          </div>
        ) : null}
      </div>
    </VedicAppTemplate>
  )
}