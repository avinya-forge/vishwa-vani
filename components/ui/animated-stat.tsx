'use client'

import React, { useEffect, useState } from 'react'

export function AnimatedStat({ targetCount }: { targetCount: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    if (start === targetCount) return

    const totalDuration = 2000
    const incrementTime = (totalDuration / targetCount) * 5

    const timer = setInterval(() => {
      start += Math.ceil(targetCount / 100)
      if (start > targetCount) {
        setCount(targetCount)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [targetCount])

  return <span>{count.toLocaleString()}</span>
}
