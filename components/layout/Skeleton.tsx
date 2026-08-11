import React from 'react'

export function LabSkeleton() {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 animate-pulse flex flex-col p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-stone-200 dark:bg-stone-800 rounded-lg" />
          <div className="h-3 w-32 bg-stone-100 dark:bg-stone-800/50 rounded-md" />
        </div>
        <div className="w-10 h-10 bg-stone-200 dark:bg-stone-800 rounded-xl" />
      </div>
      <div className="flex-grow space-y-4">
        <div className="h-4 w-full bg-stone-100 dark:bg-stone-800/50 rounded-md" />
        <div className="h-4 w-5/6 bg-stone-100 dark:bg-stone-800/50 rounded-md" />
        <div className="h-4 w-4/6 bg-stone-100 dark:bg-stone-800/50 rounded-md" />
      </div>
      <div className="h-12 w-full bg-stone-200 dark:bg-stone-800 rounded-xl" />
    </div>
  )
}
