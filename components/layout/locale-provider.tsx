'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'
import mr from '@/messages/mr.json'

const messagesMap = { en, hi, mr }

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const stored = localStorage.getItem('vishwa_lang')
    if (stored && ['en', 'hi', 'mr'].includes(stored)) {
      setLocale(stored)
    }

    // Listen for custom locale change events
    const handleLocaleChange = (e: unknown) => {
      setLocale((e as Record<string, unknown>).detail as string)
    }
    window.addEventListener('vishwa-locale-change', handleLocaleChange as EventListener)
    return () => window.removeEventListener('vishwa-locale-change', handleLocaleChange)
  }, [])

  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messagesMap[locale as keyof typeof messagesMap]}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  )
}

export function changeVishwaLocale(newLocale: string) {
  localStorage.setItem('vishwa_lang', newLocale)
  window.dispatchEvent(new CustomEvent('vishwa-locale-change', { detail: newLocale }))
}
