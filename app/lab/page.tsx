import PranayamaTimer from '@/components/lab/pranayama-timer'
import AkshauhiniCalc from '@/components/lab/akshauhini-calc'
import VedicInstruments from '@/components/lab/vedic-instruments'

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
            </div>
        </div>
      </div>
    </main>
  )
}
