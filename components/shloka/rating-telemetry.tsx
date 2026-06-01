'use client'

import React, { useState } from 'react'

interface RatingTelemetryProps {
  verseId: string
  scholarId: string
  language: string
}

export default function RatingTelemetry({ verseId, scholarId, language }: RatingTelemetryProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRating = async (value: number) => {
    setRating(value)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/commentary-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verseId,
          scholarId,
          language,
          rating: value
        })
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Failed to submit rating:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center text-xs text-stone-500 dark:text-stone-400 italic">
        <span>Thank you for your feedback.</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400">
      <span>Rate this translation:</span>
      <div className={`flex items-center space-x-1 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setRating(star)}
            onMouseLeave={() => setRating(null)}
            className={`transition-colors duration-200 ${
              (rating !== null && star <= rating)
                ? 'text-orange-500 dark:text-orange-400'
                : 'text-stone-300 dark:text-stone-600 hover:text-orange-400 dark:hover:text-orange-300'
            }`}
            aria-label={`Rate ${star} stars`}
            data-testid={`rate-${star}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}
