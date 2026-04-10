'use client'

import dynamic from 'next/dynamic'
import { LabSkeleton } from '@/components/layout/Skeleton'

const PranayamaTimer = dynamic(() => import('@/components/lab/pranayama-timer'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const AkshauhiniCalc = dynamic(() => import('@/components/lab/akshauhini-calc'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const VedicInstruments = dynamic(() => import('@/components/lab/vedic-instruments'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const KarmaYogaSimulator = dynamic(() => import('@/components/lab/karma-yoga-simulator'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const JnanaYogaExplorer = dynamic(() => import('@/components/lab/jnana-yoga-explorer'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const BhaktiYogaCompass = dynamic(() => import('@/components/lab/bhakti-yoga-compass'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const DharmaDecisionMatrix = dynamic(() => import('@/components/lab/dharma-decision-matrix'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const TimeConsciousnessWheel = dynamic(() => import('@/components/lab/time-consciousness-wheel'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const DivineQualitiesAssessment = dynamic(() => import('@/components/lab/divine-qualities-assessment'), {
  ssr: false,
  loading: () => <LabSkeleton />
})
const MeditationStateTracker = dynamic(() => import('@/components/lab/meditation-state-tracker'), {
  ssr: false,
  loading: () => <LabSkeleton />
})

export default function VedicLabPage() {
  return (
    <main className="min-h-screen bg-[#0C0B0A] text-stone-200 selection:bg-orange-500/30 pb-32 pt-20 relative overflow-hidden">
      {/* 🌌 COSMIC BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#2A1A0A_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl space-y-4">
             <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500">Experimental Sanctum</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-serif font-black text-white leading-none tracking-tighter">Vedic Labs</h1>
             <p className="text-stone-400 text-lg md:text-xl font-medium leading-relaxed italic">
                Translating ancient scriptural measurements and philosophical disciplines into interactive digital experience tokens.
             </p>
          </div>
          <div className="flex gap-4 p-2 bg-stone-900/50 rounded-2xl border border-stone-800">
             <div className="px-6 py-3 bg-orange-600 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg">New Shards</div>
             <div className="px-6 py-3 text-xs font-black uppercase tracking-widest text-stone-500">Archives</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
               <PranayamaTimer />
            </div>
            <div className="space-y-8">
               <AkshauhiniCalc />
               <VedicInstruments />
               <KarmaYogaSimulator />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <JnanaYogaExplorer />
            <BhaktiYogaCompass />
            <DharmaDecisionMatrix />
            <TimeConsciousnessWheel />
            <DivineQualitiesAssessment />
            <MeditationStateTracker />
        </div>
      </div>
    </main>
  )
}
