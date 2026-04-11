import React from 'react';

export default function SkeletonCommentary() {
  return (
    <div className="bg-stone-50 rounded-xl border border-stone-100 p-6 md:p-8 animate-pulse">
      {/* Author Info Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded bg-stone-200"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/4 bg-stone-200 rounded"></div>
          <div className="h-3 w-1/3 bg-stone-200 rounded"></div>
        </div>
        <div className="w-20 h-8 rounded bg-stone-200"></div>
      </div>

      {/* Content Text Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-stone-200 rounded"></div>
        <div className="h-4 w-full bg-stone-200 rounded"></div>
        <div className="h-4 w-11/12 bg-stone-200 rounded"></div>
        <div className="h-4 w-full bg-stone-200 rounded"></div>
        <div className="h-4 w-4/5 bg-stone-200 rounded"></div>
      </div>
    </div>
  );
}
