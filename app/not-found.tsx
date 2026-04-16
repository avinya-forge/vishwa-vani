import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#FDFBF7] dark:bg-[#1C1917]">
      <div className="max-w-md w-full p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-900 dark:text-stone-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-8">
          The verse, chapter, or book you are looking for could not be found.
          It may have been moved or does not exist.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-orange-600/20 active:scale-95"
        >
          Return to Library
        </Link>
      </div>
    </div>
  );
}
