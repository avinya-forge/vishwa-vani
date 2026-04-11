import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-900 mb-4">
        Page Not Found
      </h2>
      <p className="text-stone-600 mb-8 max-w-md">
        The verse, chapter, or book you are looking for could not be found.
        It may have been moved or does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
      >
        Return to Library
      </Link>
    </div>
  );
}
