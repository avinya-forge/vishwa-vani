'use client'
import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

type Guna = 'sattva' | 'rajas' | 'tamas'

interface VerseTag {
  ref: string
  text: string
  guna: Guna
  why: string
}

interface ChapterProfile {
  chapter: number
  name: string
  theme: string
  sattva: number
  rajas: number
  tamas: number
  arc: string
  keyVerses: VerseTag[]
}

const PROFILES: ChapterProfile[] = [
  {
    chapter: 14,
    name: 'Gunatraya Vibhaga Yoga',
    theme: 'The three modes of material nature',
    sattva: 60,
    rajas: 25,
    tamas: 15,
    arc: 'Chapter 14 teaches the framework. Krishna defines all three Gunas with clinical precision before pointing to what transcends them. Sattva dominates because the chapter\'s purpose is to reveal the path of elevation — but Tamas and Rajas are described without dismissal, as necessary parts of the whole.',
    keyVerses: [
      { ref: 'BG 14.6', guna: 'sattva', text: 'Sattva, being pure, illuminating, and free from all sinful reactions, binds the conditioned soul by attachment to knowledge and happiness.', why: 'Sattva itself is described in sattvic language — purity, illumination, freedom — yet even Sattva is a chain.' },
      { ref: 'BG 14.7', guna: 'rajas', text: 'The mode of passion arises from unlimited desires and longings, O son of Kunti, and because of this the embodied living entity is bound to material fruitive actions.', why: 'Rajasic language: desire, longing, binding. The verse moves with urgency — characteristic of Rajas.' },
      { ref: 'BG 14.8', guna: 'tamas', text: 'O son of Bharata, know that the mode of darkness, born of ignorance, is the delusion of all embodied living entities. The results of this mode are madness, indolence, and sleep.', why: 'Tamas described with heavy, obscuring words: delusion, madness, indolence, sleep. The language mirrors the quality.' },
      { ref: 'BG 14.26', guna: 'sattva', text: 'One who serves Me with unfailing devotional service, rising above the three modes of material nature, is fit to be merged in the Brahman.', why: 'The culminating verse transcends the Guna framework itself — pointing to what lies beyond all three.' },
    ],
  },
  {
    chapter: 15,
    name: 'Purushottama Yoga',
    theme: 'The Supreme Person beyond the tree of existence',
    sattva: 70,
    rajas: 15,
    tamas: 15,
    arc: 'Chapter 15 is the most elevated in Guna quality — predominantly Sattvic. The language is cosmic, transcendent, and still. Krishna describes the inverted Ashvattha tree, the soul\'s journey, and ultimately His own nature as Purushottama. Even Tamas and Rajas appear only to be left behind.',
    keyVerses: [
      { ref: 'BG 15.1', guna: 'sattva', text: 'There is a banyan tree which has its roots upward and its branches down, and the Vedic hymns are its leaves. One who knows this tree is the knower of the Vedas.', why: 'The cosmic metaphor — inverted tree with Vedic leaves — is Sattvic: it elevates the mind toward a trans-temporal vision.' },
      { ref: 'BG 15.5', guna: 'sattva', text: 'Those who are free from false prestige, illusion, and false association, who understand the eternal, who are done with material lust, who are freed from duality — such persons go to that eternal kingdom.', why: 'The verse enumerates freedom from Rajasic and Tamasic qualities as the path. Sattva describes transcendence.' },
      { ref: 'BG 15.11', guna: 'tamas', text: 'The unintelligent cannot understand how a living entity can quit his body, nor can they understand what sort of body he enjoys under the spell of the modes. But one whose eyes are trained in knowledge can see all this.', why: 'The "unintelligent" are those governed by Tamas — ignorance prevents perception of this truth. Contrast creates the teaching.' },
      { ref: 'BG 15.18', guna: 'sattva', text: 'Because I am transcendental, beyond both the fallible and the infallible, and because I am the greatest, I am celebrated both in the world and in the Vedas as that Supreme Person — Purushottama.', why: 'The summit of Chapter 15 — pure Sattva transcending itself into the Divine. The language is quiet, certain, and vast.' },
    ],
  },
  {
    chapter: 16,
    name: 'Daivasura Sampad Vibhaga Yoga',
    theme: 'Divine and demoniac natures',
    sattva: 40,
    rajas: 30,
    tamas: 30,
    arc: 'Chapter 16 is the most Rajasic and Tamasic in feel because it must describe these qualities directly. Krishna catalogues the demoniac nature in stark, sometimes brutal detail. The equal presence of all three Gunas reflects the chapter\'s purpose: to distinguish with precision, not to elevate. The Sattvic teaching sits at the beginning and end — the demoniac detail is sandwiched in the middle.',
    keyVerses: [
      { ref: 'BG 16.1–3', guna: 'sattva', text: 'Fearlessness, purification of one\'s existence, cultivation of spiritual knowledge, charity, self-control, sacrifice, study of the Vedas, austerity, simplicity... these are the divine qualities.', why: 'The enumeration of Daivi qualities is itself Sattvic — the list elevates, clarifies, and inspires.' },
      { ref: 'BG 16.10', guna: 'rajas', text: 'Taking shelter of insatiable lust and absorbed in the conceit of pride and false prestige, the demoniac, thus illusioned, are always sworn to unclean work, attracted by the impermanent.', why: 'The verse seethes with Rajasic energy — insatiable desire, pride, and frenzied activity toward impermanent goals.' },
      { ref: 'BG 16.16', guna: 'tamas', text: 'Thus perplexed by various anxieties and bound by a network of illusions, they become too strongly attached to sense enjoyment and fall down into hell.', why: 'Tamasic quality: perplexity, entrapment in illusion, downward movement. The heaviness of the verse mirrors the state it describes.' },
      { ref: 'BG 16.24', guna: 'sattva', text: 'One should therefore understand what is duty and what is not duty by the regulations of the scriptures. Knowing such rules and regulations, one should act so that one may gradually be elevated.', why: 'The closing teaching returns to Sattva — the light of scripture provides clarity after the chapter\'s vivid description of darkness.' },
    ],
  },
  {
    chapter: 17,
    name: 'Shraddhatraya Vibhaga Yoga',
    theme: 'Three types of faith — in food, sacrifice, austerity, and charity',
    sattva: 50,
    rajas: 28,
    tamas: 22,
    arc: 'Chapter 17 applies the Guna framework to daily life — food, worship, charity, speech. The structure is architecturally Sattvic: each Guna\'s expression is examined systematically before being transcended. The famous "Om Tat Sat" closing raises the entire chapter from analysis into devotion. Balanced Guna distribution because the chapter makes all three visible for practical recognition.',
    keyVerses: [
      { ref: 'BG 17.8', guna: 'sattva', text: 'Foods in the mode of goodness increase the duration of life, purify one\'s existence, and give strength, health, happiness, and satisfaction. Such foods are juicy, fatty, wholesome, and pleasing to the heart.', why: 'Sattvic description of Sattvic food: the language itself is soft, nourishing, and pleasant.' },
      { ref: 'BG 17.9', guna: 'rajas', text: 'Foods that are too bitter, too sour, salty, hot, pungent, dry, and burning are dear to those in the mode of passion. Such foods cause distress, misery, and disease.', why: 'Rajasic language describing Rajasic food: sharp, intense, disruptive — the verse almost burns as you read it.' },
      { ref: 'BG 17.10', guna: 'tamas', text: 'Food prepared more than three hours before being eaten, food that is tasteless, decomposed, and putrid, and food consisting of remnants and untouchable things is dear to those in the mode of darkness.', why: 'The heaviness, staleness, and decay in the description mirror Tamasic quality itself.' },
      { ref: 'BG 17.28', guna: 'sattva', text: 'Anything performed as sacrifice, charity, or penance without faith in the Supreme, O Arjuna, is impermanent. It is called asat and is useless both in this life and the next.', why: 'The chapter closes by locating the measure of all Gunas in the quality of faith — Sattvic resolution that transcends the analysis.' },
    ],
  },
]

const GUNA_CONFIG: Record<Guna, { label: string; color: string; bar: string; dot: string }> = {
  sattva: { label: 'Sattva', color: 'text-teal-600 dark:text-teal-400', bar: 'bg-teal-400 dark:bg-teal-500', dot: 'bg-teal-400' },
  rajas: { label: 'Rajas', color: 'text-orange-500 dark:text-orange-400', bar: 'bg-orange-400 dark:bg-orange-500', dot: 'bg-orange-400' },
  tamas: { label: 'Tamas', color: 'text-stone-500 dark:text-stone-400', bar: 'bg-stone-400 dark:bg-stone-500', dot: 'bg-stone-400' },
}

export default function VerseGunaAnalyzer() {
  const [chapter, setChapter] = useState<number | null>(null)
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null)

  const profile = PROFILES.find(p => p.chapter === chapter)

  return (
    <VedicAppTemplate
      title="Verse Guṇa Analyzer"
      subtitle="Chapters 14–17 — Track the modes through Krishna's language"
      icon="🔮"
      footerNote="Bhagavad Gita Chapters 14–17 — Guna Vibhaga"
    >
      {/* Chapter selector */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {PROFILES.map(p => (
          <button
            key={p.chapter}
            onClick={() => { setChapter(chapter === p.chapter ? null : p.chapter); setSelectedVerse(null) }}
            className={`py-2 rounded-xl border-2 text-xs font-black text-center transition-all duration-200 ${
              chapter === p.chapter
                ? 'border-teal-400 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300'
                : 'border-stone-200 dark:border-stone-700 text-stone-400 hover:border-teal-200 dark:hover:border-teal-800'
            }`}
          >
            Ch {p.chapter}
          </button>
        ))}
      </div>

      {profile ? (
        <div className="space-y-4">
          {/* Chapter header */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-teal-500 mb-0.5">{profile.name}</p>
            <p className="text-sm font-bold text-stone-800 dark:text-stone-200">{profile.theme}</p>
          </div>

          {/* Guna bars */}
          <div className="space-y-2">
            {(['sattva', 'rajas', 'tamas'] as Guna[]).map(g => {
              const val = profile[g]
              const cfg = GUNA_CONFIG[g]
              return (
                <div key={g}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={`font-black uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
                    <span className="text-stone-400">{val}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${cfg.bar}`} style={{ width: `${val}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Arc */}
          <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Chapter Arc</p>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{profile.arc}</p>
          </div>

          {/* Verse tags */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Key Verses by Guna</p>
            <div className="space-y-2">
              {profile.keyVerses.map(v => {
                const cfg = GUNA_CONFIG[v.guna]
                const isSelected = selectedVerse === v.ref
                return (
                  <button
                    key={v.ref}
                    onClick={() => setSelectedVerse(isSelected ? null : v.ref)}
                    className="w-full text-left p-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                      <span className="text-xs font-black text-amber-500 dark:text-amber-400">{v.ref}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic line-clamp-2">{v.text}</p>
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Why {cfg.label}</p>
                        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{v.why}</p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs text-stone-400 text-center py-8">Select a chapter to see its Guna profile.</p>
      )}
    </VedicAppTemplate>
  )
}
