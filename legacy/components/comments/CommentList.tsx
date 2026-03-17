import { getCommentsByShlokaId } from '@/utils/services/comments'
import { createClient } from '@/utils/supabase/server'
import CommentSection from './CommentSection'

interface CommentListProps {
  shlokaId: string
}

export default async function CommentList({ shlokaId }: CommentListProps) {
  const comments = await getCommentsByShlokaId(shlokaId)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        Comments
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </h3>

      <CommentSection
        initialComments={comments}
        shlokaId={shlokaId}
        currentUserId={user?.id || null}
      />
    </div>
  )
}
