'use client'

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

  if (showResult) {
    const percentage = Math.round((score / SCENARIOS.length) * 100)
    return (
      <VedicAppTemplate
        title="Karma Yoga Assessment"
        subtitle="Gita Ch. 3 • Nishkama Karma"
        icon="⚖️"
        darkMode={true}
        footerNote="Remember: Karma yoga is a practice, not a destination. Each moment offers a new opportunity to act with detachment."
      >
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-serif font-black text-white mb-4">Your Karma Yoga Score</h3>
          <div className="text-5xl font-black text-orange-400 mb-2">{percentage}%</div>
          <p className="text-stone-300 mb-6">
            You chose the path of detached action in {score} out of {SCENARIOS.length} situations.
          </p>
          
          <div className="bg-stone-800/50 p-6 rounded-2xl mb-6">
            <p className="text-stone-200 text-sm leading-relaxed">
              {percentage >= 80 
                ? "Excellent! You demonstrate strong understanding of karma yoga principles. Continue practicing detachment in daily life."
                : percentage >= 60
                ? "Good progress! Focus on maintaining equanimity in challenging situations and remember that results are not in your control."
                : "Keep practicing! Karma yoga requires consistent effort. Review the Bhagavad Gita's teachings on detached action regularly."
              }
            </p>
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

  const scenario = SCENARIOS[currentScenario]

  return (
    <VedicAppTemplate
      title="Karma Yoga Simulator"
      subtitle="Gita Ch. 3 • Detached Action"
      icon="⚖️"
      darkMode={true}
      footerNote="Based on Krishna's teachings in the Bhagavad Gita: 'Perform your duty without attachment to the results.'"
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
        ) : selectedOption !== null ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border-2 ${
              scenario.options[selectedOption].karmaYoga
                ? 'bg-green-900/20 border-green-600'
                : 'bg-red-900/20 border-red-600'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-lg ${scenario.options[selectedOption].karmaYoga ? 'text-green-400' : 'text-red-400'}`}>
                  {scenario.options[selectedOption].karmaYoga ? '✅' : '❌'}
                </span>
                <span className={`font-bold ${scenario.options[selectedOption].karmaYoga ? 'text-green-300' : 'text-red-300'}`}>
                  {scenario.options[selectedOption].karmaYoga ? 'Karma Yoga Path' : 'Attached Action'}
                </span>
              </div>
              <p className="text-stone-200 text-sm leading-relaxed">
                {scenario.options[selectedOption].explanation}
              </p>
            </div>

            <button
              onClick={nextScenario}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
            >
              {currentScenario < SCENARIOS.length - 1 ? 'Next Scenario' : 'View Results'}
            </button>
          </div>
        ) : null}
      </div>
    </VedicAppTemplate>
  )
}