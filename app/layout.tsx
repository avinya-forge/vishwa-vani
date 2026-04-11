import { Inter, Noto_Serif_Devanagari, Outfit } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import LocaleProvider from '@/components/layout/locale-provider'
import SecurityShield from '@/components/layout/security-shield'
import { setRequestLocale } from 'next-intl/server'
import FeedbackWidget from '@/components/ui/feedback-widget'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSerifDevanagari = Noto_Serif_Devanagari({ 
    weight: ['400', '700', '900'],
    subsets: ['devanagari'],
    variable: '--font-devanagari'
})
const outfit = Outfit({ 
    subsets: ['latin'],
    variable: '--font-outfit'
})

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
      template: '%s | Vishwa-Vani',
      default: 'Vishwa-Vani | The Universal Voice of Vedic Wisdom'
    },
    description: 'A comprehensive, multi-language digital sanctuary for the Bhagavad Gita, Upanishads, and the 16 Samskaras.',
    openGraph: {
      title: 'Vishwa-Vani',
      description: 'The Universal Voice of Vedic Wisdom',
      url: 'https://vishwavani.app',
      siteName: 'Vishwa-Vani',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://vishwavani.app/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Vishwa-Vani - The Universal Repository of Vedic Wisdom'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Vishwa-Vani',
      description: 'The Universal Voice of Vedic Wisdom',
      creator: '@vishwavani',
      images: ['https://vishwavani.app/twitter-image.jpg']
    }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Hardcode 'en' as the default server-side baseline for static export.
  // The client side locale-provider will handle actual user preferences.
  setRequestLocale('en')
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#EA580C" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${notoSerifDevanagari.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 overflow-x-hidden`}>
        <FeedbackWidget />
        <LocaleProvider>
          <SecurityShield />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
        {/* Mute benign ResizeObserver error for cleaner showcase */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', e => {
                if (e.message === 'ResizeObserver loop completed with undelivered notifications') {
                  const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
                  const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
                  if (resizeObserverErr) resizeObserverErr.style.display = 'none';
                  if (resizeObserverErrDiv) resizeObserverErrDiv.style.display = 'none';
                  e.stopImmediatePropagation();
                }
              });
            `,
          }}
        />
        {/* Placeholder GA Measurement ID. Update before shipping. */}
        <GoogleAnalytics gaId="G-XXXXXX" />
        <Analytics />
      </body>
    </html>
  )
}
