import React, { useState } from 'react';
import VedicAppTemplate from './vedic-app-template';

export default function YogaMindControl() {
  const [stage, setStage] = useState<'intro' | 'abhyasa' | 'vairagya' | 'conclusion'>('intro');
  const [abhyasaScore, setAbhyasaScore] = useState(0);
  const [vairagyaScore, setVairagyaScore] = useState(0);

  const abhyasaQuestions = [
    {
      text: "How often do you dedicate time to a specific practice (like meditation, study, or physical yoga)?",
      options: [
        { text: "Rarely or inconsistently", value: 1 },
        { text: "A few times a week", value: 2 },
        { text: "Daily, without fail", value: 3 }
      ]
    },
    {
      text: "When faced with obstacles in your practice, you:",
      options: [
        { text: "Give up and try something else", value: 1 },
        { text: "Take a break and try again later", value: 2 },
        { text: "Persist and find a way through", value: 3 }
      ]
    },
    {
      text: "Your focus during practice is:",
      options: [
        { text: "Easily distracted by surroundings", value: 1 },
        { text: "Generally focused, but wanders occasionally", value: 2 },
        { text: "Intensely concentrated on the object of practice", value: 3 }
      ]
    }
  ];

  const vairagyaQuestions = [
    {
      text: "How do you react when you don't get something you really wanted?",
      options: [
        { text: "Upset and dwell on it for a long time", value: 1 },
        { text: "Disappointed but move on eventually", value: 2 },
        { text: "Accept it calmly and remain unaffected", value: 3 }
      ]
    },
    {
      text: "Your relationship with material possessions is:",
      options: [
        { text: "Strongly attached, constantly wanting more", value: 1 },
        { text: "Appreciative but willing to let go if needed", value: 2 },
        { text: "Detached, recognizing them as temporary tools", value: 3 }
      ]
    },
    {
      text: "When someone praises or criticizes you, you feel:",
      options: [
        { text: "Deeply affected (elated by praise, crushed by criticism)", value: 1 },
        { text: "Slightly moved, but try to maintain perspective", value: 2 },
        { text: "Equanimous, understanding it's just their perception", value: 3 }
      ]
    }
  ];

  const handleAbhyasaAnswer = (value: number, index: number) => {
    setAbhyasaScore(prev => prev + value);
    if (index === abhyasaQuestions.length - 1) {
      setStage('vairagya');
    }
  };

  const handleVairagyaAnswer = (value: number, index: number) => {
    setVairagyaScore(prev => prev + value);
    if (index === vairagyaQuestions.length - 1) {
      setStage('conclusion');
    }
  };

  const renderIntro = () => (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
        Patanjali defines Yoga as <span className="italic font-medium">"Yogaś citta vṛtti nirodhaḥ"</span> (Yoga is the cessation of the modifications of the mind).
      </p>
      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
        To achieve this state of mind control, two core practices are required:
        <strong className="text-orange-600 dark:text-orange-400"> Abhyāsa (Constant Practice)</strong> and
        <strong className="text-orange-600 dark:text-orange-400"> Vairāgya (Detachment)</strong>.
      </p>
      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
        Let's explore your current balance of these two essential elements.
      </p>
      <button
        onClick={() => setStage('abhyasa')}
        className="w-full sm:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
      >
        Begin Exploration
      </button>
    </div>
  );

  type Question = { text: string; options: { text: string; value: number }[] };
  const renderQuestions = (
    title: string,
    description: string,
    questions: Question[],
    handleAnswer: (val: number, idx: number) => void
  ) => {
    return (
      <div className="space-y-8">
        <div>
          <h4 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">{title}</h4>
          <p className="text-stone-600 dark:text-stone-400">{description}</p>
        </div>
        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-white/50 dark:bg-stone-800/50 p-6 rounded-2xl border border-stone-100 dark:border-stone-700">
              <p className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">{q.text}</p>
              <div className="space-y-3">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswer(opt.value, qIdx)}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-orange-50 dark:bg-stone-900 dark:hover:bg-orange-900/30 border border-stone-200 dark:border-stone-700 transition-colors"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderConclusion = () => {
    const abhyasaPct = Math.round((abhyasaScore / (abhyasaQuestions.length * 3)) * 100);
    const vairagyaPct = Math.round((vairagyaScore / (vairagyaQuestions.length * 3)) * 100);

    let advice = "";
    if (abhyasaPct > vairagyaPct + 20) {
      advice = "You have strong discipline (Abhyāsa) but may lack detachment (Vairāgya). Focus on letting go of the results of your practice to avoid burnout or frustration.";
    } else if (vairagyaPct > abhyasaPct + 20) {
      advice = "You have good detachment (Vairāgya) but may lack consistent discipline (Abhyāsa). Strengthen your commitment to a regular, dedicated practice to ground your detachment.";
    } else if (abhyasaPct > 70 && vairagyaPct > 70) {
      advice = "Excellent balance! You combine strong, dedicated practice with a healthy sense of detachment. This is the ideal state for mind control in Yoga.";
    } else {
      advice = "You are developing both Abhyāsa and Vairāgya. Continue to cultivate a consistent practice while gently observing and releasing attachments in your daily life.";
    }

    return (
      <div className="space-y-8">
        <h4 className="text-2xl font-bold text-stone-900 dark:text-white">Your Yoga Balance</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/30">
            <h5 className="font-bold text-xl text-orange-800 dark:text-orange-300 mb-2">Abhyāsa (Practice)</h5>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1 h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${abhyasaPct}%` }}
                />
              </div>
              <span className="font-bold">{abhyasaPct}%</span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400">Consistent, dedicated effort over time.</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <h5 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-2">Vairāgya (Detachment)</h5>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1 h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${vairagyaPct}%` }}
                />
              </div>
              <span className="font-bold">{vairagyaPct}%</span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400">Letting go of attachment to results and external validation.</p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-stone-800/70 p-6 rounded-2xl border border-stone-200 dark:border-stone-700">
          <h5 className="font-bold text-lg mb-3 text-stone-900 dark:text-stone-100">Guidance</h5>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{advice}</p>
        </div>

        <button
          onClick={() => {
            setStage('intro');
            setAbhyasaScore(0);
            setVairagyaScore(0);
          }}
          className="w-full sm:w-auto px-6 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-medium rounded-xl transition-all"
        >
          Retake Exploration
        </button>
      </div>
    );
  };

  return (
    <VedicAppTemplate
      title="Yoga Mind Control Explorer"
      subtitle="Abhyāsa and Vairāgya"
      icon="🧘"
      footerNote="Based on Yoga Sutras of Patanjali, Chapter 1"
    >
      <div className="p-2 sm:p-4">
        {stage === 'intro' && renderIntro()}
        {stage === 'abhyasa' && renderQuestions("Abhyāsa", "Evaluating your dedicated, consistent practice.", abhyasaQuestions, handleAbhyasaAnswer)}
        {stage === 'vairagya' && renderQuestions("Vairāgya", "Evaluating your detachment and non-attachment.", vairagyaQuestions, handleVairagyaAnswer)}
        {stage === 'conclusion' && renderConclusion()}
      </div>
    </VedicAppTemplate>
  );
}
