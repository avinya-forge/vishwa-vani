import { Inter, Noto_Serif_Devanagari, Outfit } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LocaleProvider from '@/components/layout/locale-provider'

import { setRequestLocale } from 'next-intl/server'
import { getDynamicLibraryStats } from '@/lib/server-lake'
import FeedbackWidget from '@/components/ui/feedback-widget'
import CookieConsent from '@/components/ui/cookie-consent'
import AnalyticsManager from '@/components/layout/analytics-manager'
import { ThemeProvider } from '@/components/theme-provider'
import BetaBanner from '@/components/ui/beta-banner'
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
import { SITE_URL, } from '@/lib/site'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | Vishwa-Vani',
      default: 'Vishwa-Vani | The Universal Voice of Vedic Wisdom'
    },
    description: 'A comprehensive, multi-language digital sanctuary for 17 sacred Vedic scriptures, including the Bhagavad Gita, Upanishads, Vedas, Puranas, and Darshanas.',
    openGraph: {
      title: 'Vishwa-Vani',
      description: 'The Universal Voice of Vedic Wisdom',
      url: SITE_URL,
      siteName: 'Vishwa-Vani',
      locale: 'en_US',
      type: 'website',
      
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Vishwa-Vani',
      description: 'The Universal Voice of Vedic Wisdom',
      creator: '@vishwavani',
      
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
  const stats = await getDynamicLibraryStats()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#EA580C" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${notoSerifDevanagari.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-stone-900 focus:font-bold">Skip to content</a>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <LocaleProvider>
            
            <BetaBanner />
            <Header stats={stats} />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
            <FeedbackWidget />
          </LocaleProvider>
        </ThemeProvider>

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
        {/* GA Measurement ID — set NEXT_PUBLIC_GA_ID env var to enable */}
        <CookieConsent />
        <AnalyticsManager />
      </body>
    </html>
  )
}
