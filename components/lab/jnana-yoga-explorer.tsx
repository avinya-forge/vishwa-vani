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
        explanation: "Jnana Yoga insight: the Self (Kshetrajna) is Sat-Chit-Ananda — existence, consciousness, bliss — by its very nature. Meditation doesn't create peace; it reveals it."
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

  const footerNote = "Neti Neti — 'Not this, not this.' The path of knowledge discriminates Self from non-Self until only the witness remains."

  if (showResult) {
    const percentage = Math.round((score / QUESTIONS.length) * 100)
    return (
      <VedicAppTemplate
        title="Jnana Explorer"
        subtitle="Gita Ch. 13 • Discrimination"
        icon="🔍"
        footerNote={footerNote}
      >
        <div className="text-center space-y-6">
          <div className="py-8">
            <div className="text-4xl font-black text-orange-600 dark:text-orange-500 mb-1">{percentage}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Viveka Clarity</div>
          </div>

          <div className="bg-stone-100 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-700/50">
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic font-serif">
              {percentage >= 75
                ? 'Your viveka is sharp. You understand the core discrimination between Kshetra and Kshetrajna. Continue applying this awareness in daily life.'
                : percentage >= 50
                ? 'Good beginning. The discrimination between the observer and the observed takes practice. Return to Gita 13.1-3 for the foundational teaching.'
                : 'Keep inquiring. Jnana Yoga requires patient, repeated discrimination. Ask: \'Who is aware of this experience?\' with every arising thought.'
              }
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20"
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
      title="Jnana Inquirer"
      subtitle="Gita Ch. 13 • Discrimination"
      icon="🔍"
      footerNote={footerNote}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-400">
          <span>{currentQuestion + 1} / {QUESTIONS.length}</span>
          <span className="text-orange-600">Score: {score}</span>
        </div>

        <div className="bg-stone-100/50 dark:bg-stone-800/30 p-6 rounded-[2rem] border border-stone-200/50 dark:border-stone-700/50 min-h-[120px] flex flex-col justify-center">
          <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">{question.situation}</p>
        </div>

        {!showExplanation ? (
          <div className="space-y-3">
            {question.options.map((option, index) => (
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
              selectedOption !== null && question.options[selectedOption].correct
                ? 'bg-green-500/5 border-green-500/30'
                : 'bg-red-500/5 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${selectedOption !== null && question.options[selectedOption].correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {selectedOption !== null && question.options[selectedOption].correct ? '✓' : '✗'}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedOption !== null && question.options[selectedOption].correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {selectedOption !== null && question.options[selectedOption].correct ? 'Viveka Path' : 'Identification'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                {selectedOption !== null && question.options[selectedOption].explanation}
              </p>
            </div>

            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl"
            >
              {currentQuestion < QUESTIONS.length - 1 ? 'Next Step' : 'View Self Clarity'}
            </button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  )
}
