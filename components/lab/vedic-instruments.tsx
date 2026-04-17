'use client'

import React, { useState, useRef, useEffect } from 'react'
import VedicAppTemplate from './vedic-app-template'

const CONCHES = [
  { name: 'Panchajanya', owner: 'Sri Krishna', origin: 'BG 1.15', desc: 'The transcendental conch whose sound shattered the hearts of the unrighteous.', icon: '🐚', freq: 440, type: 'triangle', detune: 0 },
  { name: 'Devadatta', owner: 'Arjuna', origin: 'BG 1.15', desc: 'The God-gifted conch which announced the beginning of the great dharma-yuddha.', icon: '🐚', freq: 493.88, type: 'triangle', detune: 200 },
  { name: 'Paundra', owner: 'Bhima', origin: 'BG 1.15', desc: 'The enormous conch blown by the voracious eater and performer of Herculean tasks.', icon: '🐚', freq: 329.63, type: 'triangle', detune: -400 },
  { name: 'Anantavijaya', owner: 'Yudhisthira', origin: 'BG 1.16', desc: 'The conch of "Infinite Victory" blown by the son of Kunti.', icon: '🐚', freq: 392, type: 'triangle', detune: 100 },
  { name: 'Sughosa', owner: 'Nakula', origin: 'BG 1.16', desc: 'The "Melodious" conch signifying balance and grace.', icon: '🐚', freq: 523.25, type: 'triangle', detune: 300 },
  { name: 'Manipushpaka', owner: 'Sahadeva', origin: 'BG 1.16', desc: 'The "Jeweled" conch of the youngest Pandava.', icon: '🐚', freq: 587.33, type: 'triangle', detune: 500 },
]

export default function VedicInstruments() {
  const [selected, setSelected] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContext = useRef<AudioContext | null>(null)
  const oscillator = useRef<OscillatorNode | null>(null)
  const _gainNode = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (oscillator.current) {
        oscillator.current.stop()
      }
    }
  }, [])

  const playSynthesizedSound = async () => {
    try {
      if (!audioContext.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) {
          console.error("Web Audio API not supported");
          return;
        }
        audioContext.current = new AudioCtx();
      }
      
      const ctx = audioContext.current;
      
      // Mandatory resume for browser security policies
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      if (isPlaying) {
        if (oscillator.current) {
          oscillator.current.stop();
          oscillator.current = null;
        }
        setIsPlaying(false);
        return;
      }

      const inst = CONCHES[selected];
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const noise = ctx.createBufferSource();
      const noiseFilter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const mainFilter = ctx.createBiquadFilter();

      // Create Brown Noise for the 'breeze/air' in the shell
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // volume
      }
      noise.buffer = noiseBuffer;
      noise.loop = true;

      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(400, ctx.currentTime);
      
      osc.type = 'triangle'; // Richer than sine
      osc.frequency.setValueAtTime(inst.freq as number, ctx.currentTime);
      osc.detune.setValueAtTime(inst.detune as number, ctx.currentTime);
      
      sub.type = 'sine';
      sub.frequency.setValueAtTime((inst.freq as number) / 2, ctx.currentTime);
      sub.detune.setValueAtTime(inst.detune as number, ctx.currentTime);
      
      mainFilter.type = 'lowpass';
      mainFilter.frequency.setValueAtTime(1200, ctx.currentTime);
      mainFilter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(mainFilter);
      sub.connect(mainFilter);
      noise.connect(noiseFilter);
      noiseFilter.connect(mainFilter);
      
      mainFilter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      sub.start();
      noise.start();
      
      osc.stop(ctx.currentTime + 2.5);
      sub.stop(ctx.currentTime + 2.5);
      noise.stop(ctx.currentTime + 2.5);

      oscillator.current = osc;
      setIsPlaying(true);

      osc.onended = () => {
        setIsPlaying(false);
        oscillator.current = null;
      };
    } catch (err) {
      console.error("Audio playback error:", err);
      setIsPlaying(false);
    }
  }

  return (
    <VedicAppTemplate
      title="Shankha Soundboard"
      subtitle="Gita Ch. 1 • The Gathering"
      icon="🐚"
      footerNote="The blowing of these specific conches marked the onset of the war at Kurukshetra."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {CONCHES.map((inst, i) => (
            <button 
              key={inst.name} 
              onClick={() => setSelected(i)}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${selected === i ? 'bg-orange-500/10 border-orange-500 dark:border-orange-500/50 shadow-lg shadow-orange-500/5' : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-60 hover:opacity-100'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center text-xl shadow-inner">
                {inst.icon}
              </div>
              <div className="text-left overflow-hidden">
                <div className={`text-[10px] font-black uppercase tracking-widest truncate ${selected === i ? 'text-orange-600 dark:text-orange-500' : 'text-stone-400 dark:text-stone-500'}`}>{inst.name}</div>
                <div className={`text-[9px] font-bold truncate ${selected === i ? 'text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-600'}`}>{inst.owner}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-5 bg-stone-50/50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800 rounded-3xl min-h-[100px] flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500" key={selected}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-widest px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 rounded-md">{CONCHES[selected].origin}</span>
          </div>
          <p className="text-xs font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
            &ldquo;{CONCHES[selected].desc}&rdquo;
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={playSynthesizedSound}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${isPlaying ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900' : 'bg-orange-600 text-white shadow-xl shadow-orange-600/20 hover:scale-105 active:scale-95'}`}
          >
            <span>{isPlaying ? '⏸️' : '🔊'}</span> {isPlaying ? 'Sounding...' : 'Blast the Sound of Dharma'}
          </button>
        </div>
      </div>
    </VedicAppTemplate>
  )
}
