import React, { useState } from 'react';
import VedicAppTemplate from './vedic-app-template';

type Path = 'karma' | 'bhakti' | 'jnana' | 'dhyana';

export default function MokshaPathNavigator() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Path, number>>({ karma: 0, bhakti: 0, jnana: 0, dhyana: 0 });
  const [result, setResult] = useState<Path | null>(null);

  const questions = [
    {
      text: "When faced with a difficult situation, you typically:",
      options: [
        { text: "Take immediate action to resolve it.", path: 'karma' as Path },
        { text: "Pray or seek comfort in a higher power.", path: 'bhakti' as Path },
        { text: "Analyze the root cause and seek understanding.", path: 'jnana' as Path },
        { text: "Step back, breathe, and find inner calm before acting.", path: 'dhyana' as Path }
      ]
    },
    {
      text: "What brings you the most profound sense of peace?",
      options: [
        { text: "Helping others and fulfilling your duties.", path: 'karma' as Path },
        { text: "Singing hymns, chanting, or feeling deep love.", path: 'bhakti' as Path },
        { text: "Reading philosophical texts and gaining clarity.", path: 'jnana' as Path },
        { text: "Meditating in silence away from distractions.", path: 'dhyana' as Path }
      ]
    },
    {
      text: "How do you view the concept of 'God' or the 'Ultimate Reality'?",
      options: [
        { text: "As the cosmic order that we must serve through right action.", path: 'karma' as Path },
        { text: "As a loving, personal deity to whom we can surrender.", path: 'bhakti' as Path },
        { text: "As the formless, infinite consciousness that we realize as our true Self.", path: 'jnana' as Path },
        { text: "As the profound stillness experienced in deep meditation.", path: 'dhyana' as Path }
      ]
    },
    {
      text: "What do you consider the biggest obstacle in life?",
      options: [
        { text: "Laziness, selfishness, and avoiding responsibility.", path: 'karma' as Path },
        { text: "Ego, pride, and lack of faith.", path: 'bhakti' as Path },
        { text: "Ignorance, delusion, and false identification.", path: 'jnana' as Path },
        { text: "Restlessness, distraction, and lack of focus.", path: 'dhyana' as Path }
      ]
    },
    {
      text: "Which statement resonates most with you?",
      options: [
        { text: "'Work is worship.'", path: 'karma' as Path },
        { text: "'Love is God.'", path: 'bhakti' as Path },
        { text: "'Knowledge is power.'", path: 'jnana' as Path },
        { text: "'Silence is golden.'", path: 'dhyana' as Path }
      ]
    }
  ];

  const handleAnswer = (path: Path) => {
    const newScores = { ...scores, [path]: scores[path] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      let maxScore = 0;
      let dominantPath: Path = 'karma'; // Default
      for (const [p, score] of Object.entries(newScores)) {
        if (score > maxScore) {
          maxScore = score;
          dominantPath = p as Path;
        }
      }
      setResult(dominantPath);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScores({ karma: 0, bhakti: 0, jnana: 0, dhyana: 0 });
    setResult(null);
  };

  const pathDetails: Record<Path, { name: string, interpretation: string, practice: string }> = {
    karma: {
      name: "Karma Yoga (The Path of Action)",
      interpretation: "You find liberation through selfless service and fulfilling your duties without attachment to the results. Your interpretation of BG 18.66 involves surrendering the fruits of all actions to the Divine.",
      practice: "Dedicate your daily work as an offering. Focus on the process, not just the outcome."
    },
    bhakti: {
      name: "Bhakti Yoga (The Path of Devotion)",
      interpretation: "Your path is one of deep love and surrender to a personal God. Your interpretation of BG 18.66 is a direct call to abandon all other dharmas and surrender completely to Him.",
      practice: "Engage in kirtan, prayer, or deity worship. Cultivate a constant loving remembrance of the Divine."
    },
    jnana: {
      name: "Jñāna Yoga (The Path of Knowledge)",
      interpretation: "You seek liberation through intellectual inquiry and realizing the non-dual nature of reality. Your interpretation of BG 18.66 is to abandon the 'dharmas' of false identification and rest in the true Self.",
      practice: "Study Vedantic texts. Practice self-inquiry ('Who am I?') to distinguish the eternal from the transient."
    },
    dhyana: {
      name: "Dhyāna Yoga (The Path of Meditation)",
      interpretation: "You find the ultimate truth by turning the mind inward and achieving profound stillness. Your interpretation of BG 18.66 involves transcending the active mind and merging into pure consciousness.",
      practice: "Establish a regular sitting meditation practice. Focus on breath or a mantra to steady the mind."
    }
  };

  return (
    <VedicAppTemplate
      title="Moksha Path Navigator"
      subtitle="Discover your liberation pathway"
      icon="🧭"
      footerNote="Based on Bhagavad Gita Chapter 18"
    >
      <div className="p-4 space-y-6">
        {!result ? (
          <div>
            <h4 className="text-xl font-bold mb-4">Question {currentQuestion + 1} of {questions.length}</h4>
            <p className="text-lg mb-6">{questions[currentQuestion].text}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.path)}
                  className="w-full text-left p-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              Your Primary Path: {pathDetails[result].name}
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-lg">BG 18.66 Interpretation</h5>
                <p className="text-stone-700 dark:text-stone-300 mt-1">{pathDetails[result].interpretation}</p>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Recommended Practice</h5>
                <p className="text-stone-700 dark:text-stone-300 mt-1">{pathDetails[result].practice}</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </VedicAppTemplate>
  );
}
