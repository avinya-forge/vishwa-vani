'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

interface HeritageVerse {
  chapter: number
  chapterName: string
  ref: string
  sanskrit: string
  transliteration: string
  dnyaneshwariOvi: string
  modernMarathi: string
  culturalNote: string
  historicalContext: string
}

const VERSES: HeritageVerse[] = [
  {
    chapter: 2,
    chapterName: 'Sankhya Yoga',
    ref: 'BG 2.20 / Dnyaneshwari 2.358–361',
    sanskrit: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ',
    transliteration: 'Na jāyate mriyate vā kadācin — The soul is never born, never dies at any time.',
    dnyaneshwariOvi: 'जन्मासी नाहीं याचें मरणासीही नाहीं | उत्पत्तीचि नाहीं तेथ नाशाची काय गोष्टी || आकाश जैसें घटामाजीं | बाहेरही तैसेंचि रूप असे | घट फुटतां आकाश न फुटे | हे आत्म्याचें रूप ||',
    modernMarathi: 'या आत्म्याचा जन्म नाही, मृत्यू नाही. जसे घटात आकाश असते आणि घट फुटला तरी आकाश अखंड राहते — तसाच आत्मा सदा शुद्ध, सदा मुक्त.',
    culturalNote: 'Dnyaneshwar uses the pot-and-sky (ghaṭākāśa) metaphor — a central image of Advaita Vedanta adapted for Marathi villages. The pot breaks but the sky remains: liberation is recognising the sky was never confined.',
    historicalContext: 'Written in 1290 CE at Nevase on the Pravara river. Dnyaneshwar was 16 years old. The Dnyaneshwari is the first major philosophical text in Marathi and sparked the Warkari bhakti movement that shaped Maharashtra for 700 years.',
  },
  {
    chapter: 4,
    chapterName: 'Jnana Yoga',
    ref: 'BG 4.7 / Dnyaneshwari 4.100–104',
    sanskrit: 'yadā yadā hi dharmasya glānir bhavati bhārata',
    transliteration: 'Yadā yadā hi dharmasya glāniḥ — Whenever righteousness declines, O Arjuna.',
    dnyaneshwariOvi: 'जेव्हां धर्म दुबळा होतो | अधर्म बळकट होतो | तेव्हां मी अवतार घेतो | युगायुगातें ||  ज्ञानेश्वर म्हणे या वचनाचा अर्थ | प्रत्येक कालीं होत असे स्पष्ट | परमात्म्याची माया अखंडित | धर्म रक्षाया ||',
    modernMarathi: 'जेव्हा जेव्हा धर्माचा ऱ्हास होतो, अधर्माचा उदय होतो, तेव्हा परमात्मा स्वतः प्रकट होतो — प्रत्येक युगात, प्रत्येक रूपात.',
    culturalNote: 'This verse became the anthem of the Warkari movement: God is not absent from history. Every sant (Tukaram, Namdev, Eknath) was seen as a manifestation of this promise — the Divine appearing when dharma falters.',
    historicalContext: 'The Varkari pilgrimage to Pandharpur (Vitthal temple) has continued unbroken for 800+ years, twice yearly, with millions walking on foot. Dnyaneshwari\'s commentary on this verse gave theological foundation to the tradition of living sants.',
  },
  {
    chapter: 9,
    chapterName: 'Raja Vidya Yoga',
    ref: 'BG 9.26 / Dnyaneshwari 9.280–285',
    sanskrit: 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati',
    transliteration: 'Patraṁ puṣpaṁ phalaṁ toyam — A leaf, a flower, a fruit, or water — whoever offers with devotion.',
    dnyaneshwariOvi: 'पान फूल फळ उदक | हे जरी आणिलें भक्तीनें | तरी मी तें स्वीकारितों | प्रेमाच्या ओढीनें || अर्पण करितां ज्याचे भावें | भगवंत मिळे त्याचे स्वभावें | ज्ञानेश्वर म्हणे भक्ती हेचि | सर्वोत्तम योग ||',
    modernMarathi: 'पान, फूल, फळ, पाणी — भक्तीने अर्पण केलेली कोणतीही छोटी गोष्ट भगवान प्रेमाने स्वीकारतो. येथे वस्तूचे मूल्य नाही, भावाचे मूल्य आहे.',
    culturalNote: 'This verse defines the Warkari offering: the pilgrims walk to Pandharpur carrying only tulsi leaves and a water pot. The entire tradition of simple, poor pilgrims being equal before Vitthal flows from this verse.',
    historicalContext: 'Sant Tukaram (17th c.) composed thousands of abhangas (Marathi devotional songs) on this theme. His famous line: "देव आहे दयाळु, घेतो तुळशीपत्र" (God is merciful, He accepts even a tulsi leaf). The echo of Dnyaneshwari 700 years later.',
  },
  {
    chapter: 13,
    chapterName: 'Kshetra Kshetrajna Yoga',
    ref: 'BG 13.14 / Dnyaneshwari 13.420–425',
    sanskrit: 'sarvataḥ pāṇi-pādaṁ tat sarvato \'kṣi-śiro-mukham',
    transliteration: 'Sarvataḥ pāṇi-pādam — With hands and feet everywhere, with eyes, heads, and mouths everywhere.',
    dnyaneshwariOvi: 'सर्वत्र हात पाय असे | सर्वत्र नेत्र शिर मुख दिसे | हे परब्रह्माचें विश्वरूप | सर्वां ठायीं वसे || ज्ञानेश्वर म्हणे हे जाणतां | जीव ब्रह्मचि होतो तत्त्वतां | ज्ञाता ज्ञेय ज्ञान यांची एकता | हीच मुक्ती ||',
    modernMarathi: 'ब्रह्म सर्वत्र हात-पाय, डोळे, तोंड घेऊन आहे — म्हणजे सर्व विश्वातच परमात्मा आहे. हे जाणणे म्हणजेच मुक्ती.',
    culturalNote: 'Dnyaneshwar\'s vivid sensory language (hands, feet, eyes everywhere) was revolutionary — he made abstract Vedanta tangible for the villager. This democratisation of philosophy is the Warkari contribution to Indian thought.',
    historicalContext: 'Sanskrit philosophical texts were restricted to Brahmin scholars. Dnyaneshwar\'s Marathi commentary opened Vedanta to the farmer, the artisan, the untouchable. His disciple Muktabai (his sister, age 12) and the subsequent sant tradition carried this access forward.',
  },
  {
    chapter: 18,
    chapterName: 'Moksha Yoga',
    ref: 'BG 18.65 / Dnyaneshwari 18.1710–1715',
    sanskrit: 'man-manā bhava mad-bhakto mad-yājī māṁ namaskuru',
    transliteration: 'Man-manā bhava — Fix your mind on Me, be My devotee, worship Me, bow to Me.',
    dnyaneshwariOvi: 'मन माझें कर | माझा भक्त हो | मला यज करी | मला नमस्कार कर || ज्ञानेश्वर म्हणे हेंचि सर्व शास्त्राचें सार | हेंचि वेदाचें फळ | भक्तिभावें परमात्म्याचें दर्शन | हीच मुक्ती खरी ||',
    modernMarathi: 'मन माझ्यात रमव, माझा भक्त हो, माझी पूजा कर, मला नमस्कार कर — हेच सर्व शास्त्रांचे सार आहे. भक्तीतून होणारे परमात्म्याचे दर्शन — हीच खरी मुक्ती.',
    culturalNote: 'This is Dnyaneshwari\'s final benediction before the Pasaydan — the great prayer for all beings. The Pasaydan ("devo varam dene," grant a boon, O God) recited at the end of every Warkari gathering is Dnyaneshwar\'s own composition, the culmination of Chapter 18.',
    historicalContext: 'The Pasaydan is Maharashtra\'s most beloved prayer. Written by a 16-year-old in 1290 CE, it prays for the welfare of all beings in all worlds — remarkable universalism in the 13th century. Sung every Thursday at the samadhi in Alandi.',
  },
]

type Layer = 'sanskrit' | 'dnyaneshwari' | 'modern'

export default function MarathiHeritageExplorer() {
  const [idx, setIdx] = useState(0)
  const [layer, setLayer] = useState<Layer>('dnyaneshwari')
  const [showContext, setShowContext] = useState(false)
  const v = VERSES[idx]

  const layerLabels: Record<Layer, string> = {
    sanskrit: 'Sanskrit Original',
    dnyaneshwari: 'Dnyaneshwari Ovi (1290 CE)',
    modern: 'Modern Marathi',
  }

  const layerContent: Record<Layer, string> = {
    sanskrit: `${v.sanskrit}\n\n${v.transliteration}`,
    dnyaneshwari: v.dnyaneshwariOvi,
    modern: v.modernMarathi,
  }

  function next() { setIdx(i => (i + 1) % VERSES.length); setShowContext(false) }
  function prev() { setIdx(i => (i - 1 + VERSES.length) % VERSES.length); setShowContext(false) }

  return (
    <VedicAppTemplate
      title="Marathi Heritage Explorer"
      subtitle="Dnyaneshwari · 1290 CE · All Chapters"
      icon="🏛️"
      footerNote="Sant Dnyaneshwar wrote the Dnyaneshwari at age 16 in 1290 CE — the first major philosophical work in Marathi. It ignited the Warkari bhakti movement that shaped Maharashtra for 700 years."
    >
      <div className="space-y-4 text-sm text-stone-700 dark:text-stone-300">
        {/* Chapter nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-500"
            aria-label="Previous"
          >‹</button>
          <div className="text-center">
            <div className="font-black text-xs uppercase tracking-widest text-orange-600 dark:text-orange-500">
              Ch {v.chapter} — {v.chapterName}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">{v.ref}</div>
          </div>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-500"
            aria-label="Next"
          >›</button>
        </div>

        {/* Layer toggle */}
        <div className="flex rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 text-[10px] font-black uppercase tracking-widest">
          {(Object.keys(layerLabels) as Layer[]).map((l) => (
            <button
              key={l}
              onClick={() => setLayer(l)}
              className={`flex-1 py-2 transition-colors ${
                layer === l
                  ? 'bg-orange-500 text-white'
                  : 'bg-stone-50 dark:bg-stone-900 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {l === 'sanskrit' ? 'Sanskrit' : l === 'dnyaneshwari' ? '13th Century' : 'Modern'}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 px-4 py-3 min-h-[120px]">
          <div className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
            {layerLabels[layer]}
          </div>
          <p className={`leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-line ${
            layer === 'dnyaneshwari' ? 'font-serif text-[13px]' : 'text-[11px]'
          }`}>
            {layerContent[layer]}
          </p>
        </div>

        {/* Cultural context toggle */}
        <button
          onClick={() => setShowContext(c => !c)}
          className="w-full py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/30 text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
        >
          {showContext ? 'Hide Context' : 'Historical Context'}
        </button>

        {showContext && (
          <div className="rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-4 py-3 space-y-2">
            <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400">
              <span className="font-bold text-stone-700 dark:text-stone-300">Cultural: </span>
              {v.culturalNote}
            </p>
            <p className="text-[10px] leading-relaxed text-stone-600 dark:text-stone-400">
              <span className="font-bold text-stone-700 dark:text-stone-300">History: </span>
              {v.historicalContext}
            </p>
          </div>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-1.5 pt-1">
          {VERSES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setShowContext(false) }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-orange-500' : 'bg-stone-300 dark:bg-stone-700'}`}
              aria-label={`Verse ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </VedicAppTemplate>
  )
}
