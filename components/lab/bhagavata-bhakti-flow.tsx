import React, { useState } from 'react';
import VedicAppTemplate from './vedic-app-template';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function BhagavataBhaktiFlow() {
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    {
      num: 1,
      title: "Questions by the Sages",
      theme: "The quest for ultimate welfare",
      description: "In the forest of Naimisharanya, the sages led by Saunaka ask Suta Gosvami six fundamental questions about the absolute truth, the purpose of life, and the incarnations of God.",
      keyInsight: "True spiritual inquiry begins not with seeking power, but with a sincere desire for the ultimate welfare of all beings."
    },
    {
      num: 2,
      title: "Divinity and Divine Service",
      theme: "The definition of pure devotion",
      description: "Suta Gosvami answers the sages. He defines the supreme occupation (dharma) as that which leads to unmotivated, uninterrupted loving service to the transcendent Lord.",
      keyInsight: "Dharma is not just morality or ritual; its highest expression is causeless, continuous love for the Supreme."
    },
    {
      num: 3,
      title: "Krishna Is the Source of All Incarnations",
      theme: "The fountainhead of divinity",
      description: "A description of the various avatars (incarnations) of the Lord, culminating in the declaration that 'krishnas tu bhagavan svayam' — Krishna is the original Supreme Personality of Godhead.",
      keyInsight: "While the Divine manifests in many forms for different purposes, the original source is full of eternal bliss and knowledge."
    },
    {
      num: 4,
      title: "The Appearance of Sri Narada",
      theme: "The dissatisfaction of the author",
      description: "Vyasadeva, despite compiling all the Vedas and Puranas, feels despondent. His spiritual master, Narada Muni, arrives to diagnose the cause of his dissatisfaction.",
      keyInsight: "Academic knowledge and material duties, even when perfectly executed, cannot satisfy the soul without direct glorification of the Divine."
    },
    {
      num: 5,
      title: "Narada's Instructions on Srimad-Bhagavatam",
      theme: "The cure for despondency",
      description: "Narada instructs Vyasa to write the Srimad Bhagavatam, exclusively focusing on the transcendental pastimes of Krishna to cure his despondency and uplift humanity.",
      keyInsight: "The only remedy for the miseries of material existence is to sing and hear the glories of the Supreme Lord."
    },
    {
      num: 6,
      title: "Conversation Between Narada and Vyasadeva",
      theme: "The power of association",
      description: "Narada recounts his previous life as a maidservant's son. By serving pure devotees and hearing their chants, he was transformed into a great sage.",
      keyInsight: "Spiritual advancement is catalyzed most powerfully by the association and service of pure-hearted devotees."
    },
    {
      num: 7,
      title: "The Son of Drona Punished",
      theme: "Divine protection",
      description: "Ashvatthama releases a nuclear weapon (brahmastra) to kill the last heir of the Pandavas in the womb. Krishna protects the child, Parikshit, within the womb.",
      keyInsight: "The Lord's protection of His devotees is absolute, reaching even into the womb to save the defenseless."
    },
    {
      num: 8,
      title: "Prayers by Queen Kunti and Parikshit Saved",
      theme: "Seeing grace in adversity",
      description: "Queen Kunti offers profound prayers, famously asking for calamities to happen again and again, because they ensure her constant remembrance of Krishna.",
      keyInsight: "Adversity can be a blessing if it drives us to take shelter in the Divine, while prosperity often breeds forgetfulness."
    },
    {
      num: 9,
      title: "The Passing Away of Bhishmadeva",
      theme: "The perfect departure",
      description: "The grand patriarch Bhishma, lying on a bed of arrows, instructs King Yudhishthira on duties, and finally fixes his mind entirely on Krishna as he leaves his body.",
      keyInsight: "The perfection of life is to remember the Lord at the time of death, transcending physical pain through spiritual absorption."
    },
    {
      num: 10,
      title: "Departure of Lord Krishna for Dvaraka",
      theme: "The pangs of separation",
      description: "Krishna leaves Hastinapura for Dvaraka. The residents of Hastinapura, especially the women, express deep sorrow and offer prayers of separation.",
      keyInsight: "Spiritual separation (viraha) is not ordinary grief; it is an intense form of ecstatic love that deeply connects the soul to God."
    },
    {
      num: 11,
      title: "Lord Krishna's Entrance into Dvaraka",
      theme: "The joy of reunion",
      description: "Krishna arrives in Dvaraka to a jubilant reception. The city's opulence and the citizens' ecstatic love are described in detail.",
      keyInsight: "The kingdom of God is characterized by reciprocal, ever-increasing love between the Lord and His devotees."
    },
    {
      num: 12,
      title: "Birth of Emperor Parikshit",
      theme: "The ideal king",
      description: "Parikshit is born. The brahmanas predict his great qualities, noting he will be a pure devotee and will die a glorious death listening to the Bhagavatam.",
      keyInsight: "A true leader is defined not just by administrative skill, but by deep spiritual character and devotion."
    },
    {
      num: 13,
      title: "Dhritarashtra Quits Home",
      theme: "Renunciation of the old",
      description: "Vidura returns and cuts through Dhritarashtra's family attachments with harsh truths, prompting the blind old king to leave home for the forest to attain liberation.",
      keyInsight: "Family attachment in old age is a trap. One must eventually sever worldly ties to prepare the soul for its onward journey."
    },
    {
      num: 14,
      title: "The Disappearance of Lord Krishna",
      theme: "Ominous signs",
      description: "Yudhishthira observes terrible omens. Arjuna returns from Dvaraka, heartbroken, carrying the news of Krishna's departure from the mortal world.",
      keyInsight: "Without the presence of the Divine, the world loses its luster and becomes fraught with anxiety and inauspiciousness."
    },
    {
      num: 15,
      title: "The Pandavas Retire Timely",
      theme: "Knowing when to leave",
      description: "Hearing of Krishna's departure, the Pandavas enthrone Parikshit and leave for the Himalayas, renouncing the world completely.",
      keyInsight: "Wisdom lies in knowing when one's part in the cosmic play is over and gracefully exiting to focus on the Supreme."
    },
    {
      num: 16,
      title: "How Parikshit Received the Age of Kali",
      theme: "The onset of degradation",
      description: "King Parikshit tours his kingdom and encounters the personality of Kali (the age of quarrel) torturing the bull of Dharma and the cow of the Earth.",
      keyInsight: "In the age of Kali, the four pillars of dharma (austerity, cleanliness, mercy, truthfulness) are systematically destroyed by vice."
    },
    {
      num: 17,
      title: "Punishment and Reward of Kali",
      theme: "Containing the darkness",
      description: "Parikshit is about to kill Kali, but spares him when he surrenders. He restricts Kali to places of gambling, intoxication, prostitution, and animal slaughter.",
      keyInsight: "While darkness cannot be entirely eliminated in this age, a strong leader can restrict its influence by curbing specific vices."
    },
    {
      num: 18,
      title: "Maharaja Parikshit Cursed",
      theme: "The catalyst for the Bhagavatam",
      description: "Parikshit, thirsty and fatigued, places a dead snake on a meditating sage. The sage's son curses the king to die by snakebite in seven days.",
      keyInsight: "Even a momentary lapse in judgment by a great soul is orchestrated by the Divine to set a grander spiritual plan in motion."
    },
    {
      num: 19,
      title: "The Appearance of Sukadeva Gosvami",
      theme: "The stage is set",
      description: "Accepting his curse as a blessing, Parikshit renounces his kingdom and sits by the Ganges to fast until death. The youthful, naked sage Sukadeva Gosvami arrives.",
      keyInsight: "The imminence of death is the ultimate clarion call. When one is ready to hear the absolute truth, the perfect teacher appears."
    }
  ];

  const currentData = chapters.find(c => c.num === currentChapter) || chapters[0];

  return (
    <VedicAppTemplate
      title="Bhāgavata Bhakti Flow"
      subtitle="Canto 1 Journey"
      icon="🦚"
      footerNote="Navigate through the 19 chapters of Srimad Bhagavatam Canto 1."
    >
      <div className="flex flex-col h-full space-y-6">

        {/* Progress Bar */}
        <div className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden flex">
          {chapters.map((c) => (
            <div
              key={c.num}
              onClick={() => setCurrentChapter(c.num)}
              className={`flex-1 h-full cursor-pointer transition-colors border-r border-white/20 dark:border-stone-900/20 last:border-0 ${
                c.num === currentChapter
                  ? 'bg-orange-500'
                  : c.num < currentChapter
                    ? 'bg-orange-300 dark:bg-orange-800'
                    : 'bg-transparent hover:bg-stone-300 dark:hover:bg-stone-600'
              }`}
              title={`Chapter ${c.num}`}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white/60 dark:bg-stone-800/60 rounded-2xl p-6 border border-stone-100 dark:border-stone-700 shadow-sm relative overflow-hidden">
          {/* Decorative chapter number background */}
          <div className="absolute -right-6 -bottom-10 text-[180px] font-black text-stone-100 dark:text-stone-700/30 select-none z-0 leading-none">
            {currentChapter}
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm font-semibold mb-2">
              <BookOpen size={16} />
              Chapter {currentChapter}
            </div>

            <h3 className="text-3xl font-bold text-stone-900 dark:text-white leading-tight">
              {currentData.title}
            </h3>

            <p className="text-xl font-serif text-orange-600 dark:text-orange-400 italic">
              "{currentData.theme}"
            </p>

            <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed pt-2">
              {currentData.description}
            </p>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-stone-900 dark:to-orange-900/10 border border-orange-100 dark:border-orange-800/30">
              <div className="flex items-start gap-3">
                <Sparkles className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-200 mb-1">Key Insight</h4>
                  <p className="text-stone-700 dark:text-stone-400 italic leading-relaxed">
                    {currentData.keyInsight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setCurrentChapter(prev => Math.max(1, prev - 1))}
            disabled={currentChapter === 1}
            className="px-4 py-2 rounded-lg font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="text-sm font-medium text-stone-500">
            {currentChapter} / 19
          </div>

          <button
            onClick={() => setCurrentChapter(prev => Math.min(19, prev + 1))}
            disabled={currentChapter === 19}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {currentChapter === 19 ? 'Complete' : 'Next'}
            {currentChapter !== 19 && <ArrowRight size={16} />}
          </button>
        </div>

      </div>
    </VedicAppTemplate>
  );
}
