import React, { useState } from 'react';
import VedicAppTemplate from './vedic-app-template';
import { Eye, Ear, Mic, Brain, Sparkles, RefreshCcw, BookOpen } from 'lucide-react';

export default function KenaSensoryInquiry() {
  const [stage, setStage] = useState<'intro' | 'inquiry' | 'revelation'>('intro');
  const [currentSense, setCurrentSense] = useState(0);

  const senses = [
    {
      id: 'mind',
      name: 'The Mind (Manas)',
      icon: <Brain size={32} className="text-purple-500" />,
      question: "By whose will does the mind function and desire?",
      inquiry: "Observe your next thought. Did you create it, or did it simply appear? Who is the witness of this thought?",
      upanishadInsight: "That which one cannot think with the mind, but by which they say the mind is thought — know That alone as Brahman."
    },
    {
      id: 'speech',
      name: 'Speech (Vāc)',
      icon: <Mic size={32} className="text-blue-500" />,
      question: "Who directs the tongue to speak?",
      inquiry: "Speak a word aloud. Before the sound was made, where did the intention to speak come from? What power activates the vocal cords?",
      upanishadInsight: "That which cannot be expressed by speech, but by which speech is expressed — know That alone as Brahman."
    },
    {
      id: 'sight',
      name: 'Sight (Cakṣu)',
      icon: <Eye size={32} className="text-emerald-500" />,
      question: "Who is the unseen seer behind the eye?",
      inquiry: "Look at an object in front of you. The eye acts as a lens, but who is actually perceiving the image? What is the 'Eye of the eye'?",
      upanishadInsight: "That which one cannot see with the eye, but by which the eyes see — know That alone as Brahman."
    },
    {
      id: 'hearing',
      name: 'Hearing (Śrotra)',
      icon: <Ear size={32} className="text-amber-500" />,
      question: "Who is the true hearer behind the ear?",
      inquiry: "Listen to the sounds around you. Sound waves hit the eardrum, but who translates this into the experience of hearing? What is the 'Ear of the ear'?",
      upanishadInsight: "That which one cannot hear with the ear, but by which the ear hears — know That alone as Brahman."
    }
  ];

  const handleNextSense = () => {
    if (currentSense < senses.length - 1) {
      setCurrentSense(prev => prev + 1);
    } else {
      setStage('revelation');
    }
  };

  const renderIntro = () => (
    <div className="space-y-6">
      <div className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700">
        <p className="text-xl font-serif text-stone-900 dark:text-stone-100 italic leading-relaxed text-center">
          "Keneṣitaṁ patati preṣitaṁ manaḥ? <br/>
          Kena prāṇaḥ prathamaḥ praiti yuktaḥ?"
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-4 text-center">
          "By whom willed and directed does the mind light on its objects? <br/>
          By whom commanded does the first breath move?"
        </p>
      </div>

      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
        The Kena Upanishad begins with a profound question: What is the underlying power that animates our senses and our mind? It introduces the concept of the <strong>Eye of the eye</strong>, the <strong>Ear of the ear</strong>, and the <strong>Mind of the mind</strong>.
      </p>

      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
        This lab will guide you through a systematic inquiry into your own sensory experience to discover the Witness behind the instruments.
      </p>

      <button
        onClick={() => setStage('inquiry')}
        className="w-full sm:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg mt-4 flex items-center justify-center gap-2 mx-auto"
      >
        <Sparkles size={18} />
        Begin the Inquiry
      </button>
    </div>
  );

  const renderInquiry = () => {
    const sense = senses[currentSense];
    const isLast = currentSense === senses.length - 1;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-center mb-8">
          <div className="flex gap-2">
            {senses.map((s, idx) => (
              <div
                key={s.id}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentSense ? 'bg-orange-500 w-6' :
                  idx < currentSense ? 'bg-orange-300 dark:bg-orange-800' : 'bg-stone-200 dark:bg-stone-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center shadow-inner">
            {sense.icon}
          </div>

          <h3 className="text-3xl font-bold text-stone-900 dark:text-white">{sense.name}</h3>

          <p className="text-xl font-medium text-orange-600 dark:text-orange-400">
            {sense.question}
          </p>
        </div>

        <div className="bg-white/60 dark:bg-stone-800/60 p-6 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm">
          <h4 className="font-semibold text-stone-900 dark:text-stone-200 mb-2 uppercase tracking-wider text-sm">Practice:</h4>
          <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
            {sense.inquiry}
          </p>
        </div>

        <div className="bg-orange-50/80 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/30">
          <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 uppercase tracking-wider text-sm flex items-center gap-2">
            <BookOpen size={16} /> Upanishad Insight:
          </h4>
          <p className="text-lg font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
            "{sense.upanishadInsight}"
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleNextSense}
            className="px-8 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            {isLast ? "Realize the Source" : "Contemplate the Next Sense"}
          </button>
        </div>
      </div>
    );
  };

  const renderRevelation = () => (
    <div className="space-y-8 text-center animate-in fade-in zoom-in-95 duration-1000">
      <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 mb-6">
        <Sparkles size={40} className="text-white" />
      </div>

      <h3 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white leading-tight">
        The Unseen Seer
      </h3>

      <div className="space-y-6 text-lg text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
        <p>
          You have systematically negated the mind, speech, sight, and hearing as the ultimate subject. They are merely instruments—objects of perception.
        </p>

        <div className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700 my-8">
          <p className="font-serif italic text-xl">
            "That which is the hearing of the ear, the thought of the mind, the voice of speech, as also the breathing of the breath, and the sight of the eye... <br/><br/>
            Past these escaping, the wise, on departing from this world, become immortal."
          </p>
          <p className="text-sm text-stone-500 mt-4">— Kena Upanishad 1.2</p>
        </div>

        <p>
          That which cannot be objectified, which illuminates all experiences but is never the experienced—That is pure Consciousness (Brahman). <strong>That art Thou.</strong>
        </p>
      </div>

      <div className="pt-8">
        <button
          onClick={() => {
            setStage('intro');
            setCurrentSense(0);
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-medium rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <RefreshCcw size={16} />
          Begin Inquiry Again
        </button>
      </div>
    </div>
  );

  return (
    <VedicAppTemplate
      title="Kena Sensory Inquiry"
      subtitle="The Eye of the Eye"
      icon="👁️"
      footerNote="Based on Kena Upanishad, Khanda 1"
    >
      <div className="p-2 sm:p-4 min-h-[400px] flex flex-col justify-center">
        {stage === 'intro' && renderIntro()}
        {stage === 'inquiry' && renderInquiry()}
        {stage === 'revelation' && renderRevelation()}
      </div>
    </VedicAppTemplate>
  );
}

// Add this mock to prevent Lucide icons from causing test errors if not properly configured in jest
// The mock would normally go in a setup file, but we can do a quick check here if needed.
// For now, we assume the previous `npm install lucide-react` fixed any issues.
