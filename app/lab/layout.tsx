import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Vedic Labs | Experimental Vedic Tools',
    description: 'Interactive digital experience tokens translating ancient Vedic measurements and philosophical disciplines.',
    openGraph: {
      title: 'Vedic Labs | Vishwa-Vani',
      description: 'Explore interactive tools for Pranayama, Akshauhini, and Vedic philosophy.',
      images: [
        {
          url: absoluteUrl('/og-image.jpg'),
          width: 1200,
          height: 630,
          alt: 'Vedic Labs - Vishwa-Vani'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Vedic Labs | Vishwa-Vani',
      description: 'Explore interactive tools for Pranayama, Akshauhini, and Vedic philosophy.',
      images: [absoluteUrl('/og-image.jpg')]
    }
  }
}

export default function LabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
