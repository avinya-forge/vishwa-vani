import astro-explorer from '@/components/lab/astro-explorer'
import chhanda-analyzer from '@/components/lab/chhanda-analyzer'
import grammar-tokenizer from '@/components/lab/grammar-tokenizer'

export default function VedicLabPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100/60 pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-widest text-stone-900 mb-4">Vedic Calculation Hub</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            A modular utility suite for calculating basic Vedic planetary hours, Tithi approximations, and celestial constants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <astro-explorer />
            <chhanda-analyzer />
            <grammar-tokenizer />
        </div>
      </div>
    </main>
  )
}
