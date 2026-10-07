'use client'

import React, { useEffect, useState } from 'react'

interface ShlokaCounterProps {
  targetCount: number;
  label?: string;
  className?: string;
}

export function ShlokaCounter({ targetCount, label = "Shlokas Indexed", className = "" }: ShlokaCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = targetCount
    if (start === end) return

    const totalDuration = 2000 // 2 seconds
    const incrementTime = (totalDuration / end) * 5

    const timer = setInterval(() => {
      start += Math.ceil(end / 100)
      if (start > end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [targetCount])

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl ${className}`}>
      <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-orange-600 drop-shadow-sm">
        {count.toLocaleString()}
      </span>
      <span className="text-xs md:text-sm font-medium text-slate-400 mt-2 tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}
