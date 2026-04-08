'use client'

import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface Question {
  id: string
  situation: string
  options: {
    text: string
    correct: boolean
    explanation: string
  }[]
}

const QUESTIONS: Question[] = [
  {
    id: 'witness-confusion',
    situation: "In meditation, you notice a thought: 'I am confused about this problem.' Which statement reflects Jnana Yoga understanding?",
    options: [
      {
        text: 'The awareness witnessing the thought of confusion is not itself confused.',
        correct: true,
        explanation: 'The Kshetrajna (knower of the field) witnesses all mental states without being affected. Confusion belongs to the mind (Kshetra), not the Self.'
      },
      {
        text: 'I should remove the confusion to experience the Self.',
        correct: false,
        explanation: 'The Self is never absent. Seeking to remove mental states mistakes the Kshetra (field) for the Kshetrajna (knower).'
      }
    ]
  },
  {
    id: 'witness-anger',
    situation: 'During a difficult conversation, you feel anger rising. A Jnana Yoga practitioner would recognize:',
    options: [
      {
        text: 'Anger is bad; I must suppress it through willpower.',
        correct: false,
        explanation: 'Suppression still identifies with the Kshetra. Jnana yoga is discrimination, not suppression.'
      },
      {
        text: 'Anger is an event in the field; the witness-Self remains untouched.',
        correct: true,
        explanation: 'Perfect viveka: recognizing that emotional states arise in the body-mind complex (Kshetra) while Kshetrajna, pure awareness, remains unaffected.'
      }
    ]
  },
  {
    id: 'witness-change',
    situation: "Your friend says: 'You've changed so much over the years!' Jnana Yoga perspective:",
    options: [
      {
        text: 'The body, personality, and beliefs changed. The awareness that witnesses all change is changeless.',
        correct: true,
        explanation: 'This is viveka — discriminating between the mutable Kshetra (body, mind, personality) and the immutable Kshetrajna (the witnessing Self).'
      },
      {
        text: 'I should work on improving myself continuously.',
        correct: false,
        explanation: 'The Self (Kshetrajna) is already whole and complete — it requires no improvement. Only the Kshetra (personality/habits) undergoes change.'
      }
    ]
  },
  {
    id: 'witness-peace',
    situation: 'You experience deep peace in meditation. A Jnana Yoga practitioner understands this as:',
    options: [
      {
        text: 'I have achieved a spiritual state — I should maintain this peace at all times.',
        correct: false,
        explanation: 'Clinging to the peaceful state still identifies with the Kshetra (experiential states). Even peace is an experience in the field.'
      },
      {
        text: 'Peace was always my nature. The meditation removed the mental noise that obscured it.',
        correct: true,
        explanation: 'Jnana Yoga insight: the Self (Kshetrajna) is Sat-Chit-Ananda — existence, consciousness, bliss — by its very nature. Meditation doesn\'t create peace; it reveals it.'
      }
    ]
  }
]

export default function JnanaYogaExplorer() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowExplanation(true)

    const option = QUESTIONS[currentQuestion].options[optionIndex]
    if (option.correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedOption(null)
    setShowExplanation(false)
  }

  if (showResult) {
    const percentage = Math.round((score / QUESTIONS.length) * 100)
    return (
      <VedicAppTemplate
        title="Jnana Yoga Explorer"
        subtitle="Gita Ch. 13 • Kshetra & Kshetrajna"
        icon="🔍"
        darkMode={true}
        footerNote="Neti Neti — 'Not this, not this.' The path of knowledge discriminates Self from non-Self until only the witness remains."
      >
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-serif font-black text-white mb-4">Your Viveka Score</h3>
          <div className="text-5xl font-black text-orange-400 mb-2">{percentage}%</div>
          <p className="text-stone-300 mb-6">
            You identified the Kshetrajna correctly in {score} out of {QUESTIONS.length} inquiries.
          </p>

          <div className="bg-stone-800/50 p-6 rounded-2xl mb-6">
            <p className="text-stone-200 text-sm leading-relaxed">
              {percentage >= 75
                ? 'Your viveka is sharp. You understand the core discrimination between Kshetra and Kshetrajna. Continue applying this awareness in daily life — every experience becomes an inquiry.'
                : percentage >= 50
                ? 'Good beginning. The discrimination between the observer and the observed takes practice. Return to Gita 13.1-3 for the foundational teaching.'
                : 'Keep inquiring. Jnana Yoga requires patient, repeated discrimination. Ask: \'Who is aware of this experience?\' with every arising thought or feeling.'
              }
            </p>
          </div>

          <button
            onClick={reset}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
          >
            Inquire Again
          </button>
        </div>
      </VedicAppTemplate>
    )
  }

  const question = QUESTIONS[currentQuestion]

  return (
    <VedicAppTemplate
      title="Jnana Yoga Explorer"
      subtitle="Gita Ch. 13 • Kshetra & Kshetrajna"
      icon="🔍"
      darkMode={true}
      footerNote="Neti Neti — 'Not this, not this.' The path of knowledge discriminates Self from non-Self until only the witness remains."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm text-stone-400">
          <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
          <span>Score: {score}/{QUESTIONS.length}</span>
        </div>

        <div className="bg-stone-800/30 p-6 rounded-2xl">
          <h4 className="text-lg font-serif font-bold text-white mb-4">Inquiry</h4>
          <p className="text-stone-200 leading-relaxed">{question.situation}</p>
        </div>

        {!showExplanation ? (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-300 uppercase tracking-widest">Which reflects Jnana Yoga understanding?</h4>
            {question.options.map((option, index) => (
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
              question.options[selectedOption!].correct
                ? 'bg-green-900/20 border-green-600'
                : 'bg-red-900/20 border-red-600'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-lg ${question.options[selectedOption!].correct ? 'text-green-400' : 'text-red-400'}`}>
                  {question.options[selectedOption!].correct ? '✅' : '❌'}
                </span>
                <span className={`font-bold ${question.options[selectedOption!].correct ? 'text-green-300' : 'text-red-300'}`}>
                  {question.options[selectedOption!].correct ? 'Kshetrajna Recognised' : 'Kshetra Mistaken for Self'}
                </span>
              </div>
              <p className="text-stone-200 text-sm leading-relaxed">
                {question.options[selectedOption!].explanation}
              </p>
            </div>

            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
            >
              {currentQuestion < QUESTIONS.length - 1 ? 'Next Inquiry' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
