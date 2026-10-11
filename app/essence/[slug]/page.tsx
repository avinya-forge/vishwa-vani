import React from 'react'
import { notFound } from 'next/navigation'
import { getTattvaDigestBySlug, getAllTattvaDigests } from '@/lib/speed-reader'
import { getChapterSummariesBySlug } from '@/lib/chapter-summaries'
import { getKnowledgeTokensByScripture } from '@/lib/vedic-science'
import AdaptiveEssenceReader from '@/components/essence/adaptive-essence-reader'

export async function generateStaticParams() {
  const digests = getAllTattvaDigests()
  return digests.map(d => ({ slug: d.slug }))
}

export default async function TattvaDetailPage({ params }: { params: { slug: string } }) {
  const digest = getTattvaDigestBySlug(params.slug)

  if (!digest) {
    notFound()
  }

  const chapterSummaries = getChapterSummariesBySlug(params.slug)
  const knowledgeTokens = getKnowledgeTokensByScripture(params.slug)

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-orange-500/30 pb-32 pt-16 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-10 left-0 w-[40vw] h-[40vw] bg-orange-100/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      <AdaptiveEssenceReader
        digest={digest}
        chapterSummaries={chapterSummaries}
        knowledgeTokens={knowledgeTokens}
      />
    </main>
  )
}
