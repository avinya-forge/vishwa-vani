import { getShlokaById } from '@/utils/services/shloka'
import ShlokaCard from '@/components/shloka/ShlokaCard'
import { notFound } from 'next/navigation'
import CommentList from '@/components/comments/CommentList'

export const dynamic = 'force-dynamic'

export default async function ShlokaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const shloka = await getShlokaById(id)

  if (!shloka) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-amber-50/30 py-12 px-4 selection:bg-orange-100">
      <div className="max-w-5xl mx-auto">
        <ShlokaCard shloka={shloka} />
        <CommentList shlokaId={shloka.id} />
      </div>
    </main>
  )
}
