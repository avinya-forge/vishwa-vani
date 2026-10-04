import { Inter, Noto_Serif_Devanagari, Outfit } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import LocaleProvider from '@/components/layout/locale-provider'
import SecurityShield from '@/components/layout/security-shield'
import { setRequestLocale } from 'next-intl/server'
import FeedbackWidget from '@/components/ui/feedback-widget'
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
import { SITE_URL, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | Vishwa-Vani',
      default: 'Vishwa-Vani | The Universal Voice of Vedic Wisdom'
    },
    description: 'A comprehensive, multi-language digital sanctuary for the Bhagavad Gita, Upanishads, and the 16 Samskaras.',
    openGraph: {
      title: 'Vishwa-Vani',
      description: 'The Universal Voice of Vedic Wisdom',
      url: SITE_URL,
      siteName: 'Vishwa-Vani',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-image.jpg'),
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
      images: [absoluteUrl('/twitter-image.jpg')]
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
      <body suppressHydrationWarning className={`${inter.variable} ${notoSerifDevanagari.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-stone-900 focus:font-bold">Skip to content</a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LocaleProvider>
            <SecurityShield />
            <BetaBanner />
            <Header />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
            <FeedbackWidget />
          </LocaleProvider>
        </ThemeProvider>
        {/* Anti-Scraping / Content Protection Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', event => event.preventDefault());
              document.addEventListener('copy', event => {
                event.preventDefault();
                alert("Content copying is disabled to protect textual integrity.");
              });
              document.addEventListener('selectstart', event => {
                if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                  event.preventDefault();
                }
              });
            `,
          }}
        />
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-6C2H9NLMJM"} />
        <Analytics />
      </body>
    </html>
  )
}
