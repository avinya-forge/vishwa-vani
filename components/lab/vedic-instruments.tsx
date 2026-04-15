'use client'

import React, { useState, useRef } from 'react'

const INSTRUMENTS = [
  { name: 'Panchajanya', owner: 'Sri Krishna', desc: 'The conch that shattered the hearts of the Kauravas.', icon: '🐚', color: 'bg-orange-600', audio: '/audio/shankhnaad.mp3' },
  { name: 'Devadatta', owner: 'Arjuna', desc: 'The God-gifted conch which signaled the Gandiva bow.', icon: '🐚', color: 'bg-stone-100 text-stone-900', audio: '/audio/shankhnaad.mp3' },
  { name: 'Mridanga', owner: 'Vedic Rhythm', desc: 'The clay drum representing the heartbeat of the cosmos.', icon: '🥁', color: 'bg-stone-800', audio: '/audio/mridanga.mp3' },
  { name: 'Veena', owner: 'Saraswati', desc: 'The stringed instrument of knowledge and wisdom.', icon: '🪕', color: 'bg-yellow-500', audio: '/audio/veena.mp3' }
]

export default function VedicInstruments() {
  const [selected, setSelected] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  const selectInstrument = (idx: number) => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    setSelected(idx)
  }

  return (
    <div className="bg-stone-900/40 border border-stone-800 rounded-[3rem] p-10 h-full flex flex-col justify-between group">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
           <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Gita Ch. 1 • The Gathering</span>
              <h2 className="text-3xl font-serif font-black text-white">Shankha Soundboard</h2>
           </div>
        </div>

        <div className="space-y-4 mb-10">
           {INSTRUMENTS.map((inst, i) => (
             <button 
               key={inst.name} 
               onClick={() => selectInstrument(i)}
               className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${selected === i ? 'bg-white border-white scale-105 shadow-xl shadow-orange-500/10' : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 opacity-60'}`}
             >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${inst.color}`}>
                   {inst.icon}
                </div>
                <div className="text-left">
                   <div className={`text-sm font-black uppercase tracking-widest ${selected === i ? 'text-stone-900' : 'text-stone-300'}`}>{inst.name}</div>
                   <div className={`text-[10px] font-bold ${selected === i ? 'text-orange-600' : 'text-stone-500'}`}>{inst.owner}</div>
                </div>
             </button>
           ))}
        </div>

        <div className="p-8 bg-stone-900/40 border border-stone-800 rounded-3xl min-h-[140px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-2 duration-500" key={selected}>
           <p className="text-sm font-serif italic text-stone-400 leading-relaxed mb-4">
              &ldquo;{INSTRUMENTS[selected].desc}&rdquo;
           </p>
           <div className="flex items-center gap-3">
              <span className="w-4 h-[1px] bg-stone-800" />
              <span className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Scriptural Narrative</span>
           </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
         <audio
           ref={audioRef}
           src={INSTRUMENTS[selected].audio}
           onEnded={handleEnded}
           data-testid="audio-element"
         />
         <button
           onClick={playAudio}
           className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 hover:text-orange-500 transition-colors py-2 flex items-center gap-3"
         >
            <span>{isPlaying ? '⏸️' : '🔊'}</span> {isPlaying ? 'Stop' : 'Hear the Sound of Dharma'}
         </button>
      </div>
    </div>
  )
}
