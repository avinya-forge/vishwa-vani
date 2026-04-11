import SkeletonVerse from '@/components/ui/skeleton-verse'
import SkeletonCommentary from '@/components/ui/skeleton-commentary'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <header className="bg-white border-b border-stone-100 pt-6 pb-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="w-48 h-6 bg-stone-200 rounded animate-pulse mb-4"></div>
          <div className="w-64 h-10 bg-stone-200 rounded animate-pulse"></div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-8">
        <div className="space-y-12">
          <SkeletonVerse />
          <SkeletonCommentary />
          <SkeletonVerse />
          <SkeletonCommentary />
        </div>
      </main>
    </div>
  )
}
