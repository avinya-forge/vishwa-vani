import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#FDFBF7] dark:bg-[#0C0B0A] relative overflow-hidden">
      {/* 🌌 AMBIENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full p-10 bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-100 dark:border-stone-800 rounded-[3rem] shadow-2xl relative z-10">
        <div className="w-20 h-20 bg-stone-50 dark:bg-stone-800 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">
            🪔
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-900 dark:text-stone-100 mb-4 leading-tight">
          Shard Not Found
        </h2>
        <p className="text-stone-500 dark:text-stone-400 mb-10 text-sm leading-relaxed italic">
          &ldquo;The path you seek has not yet been inscribed in this library, or has been lost to time.&rdquo;
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-10 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-2xl hover:bg-orange-600 dark:hover:bg-orange-400 transition-all font-black uppercase text-[10px] tracking-[0.3em] shadow-xl active:scale-95 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return to Library
        </Link>
      </div>
    </div>
  );
}
