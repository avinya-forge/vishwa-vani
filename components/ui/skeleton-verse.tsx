import React from 'react';

export default function SkeletonVerse() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 md:p-8 animate-pulse mb-8">
      {/* Verse Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-200"></div>
          <div className="h-4 w-24 bg-stone-200 rounded"></div>
        </div>
        <div className="h-4 w-16 bg-stone-200 rounded"></div>
      </div>

      {/* Sanskrit Text Skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-6 w-3/4 bg-stone-200 rounded mx-auto"></div>
        <div className="h-6 w-2/3 bg-stone-200 rounded mx-auto"></div>
        <div className="h-6 w-3/4 bg-stone-200 rounded mx-auto"></div>
        <div className="h-6 w-1/2 bg-stone-200 rounded mx-auto"></div>
      </div>

      {/* Transliteration Skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 w-2/3 bg-stone-100 rounded mx-auto"></div>
        <div className="h-4 w-1/2 bg-stone-100 rounded mx-auto"></div>
      </div>

      <div className="h-px bg-stone-100 w-full my-6"></div>

      {/* Meaning Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-stone-100 rounded"></div>
        <div className="h-4 w-full bg-stone-100 rounded"></div>
        <div className="h-4 w-4/5 bg-stone-100 rounded"></div>
      </div>
    </div>
  );
}
