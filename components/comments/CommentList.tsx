import { getCommentsByShlokaId } from '@/utils/services/comments'
import CommentItem from './CommentItem'

interface CommentListProps {
  shlokaId: string
}

export default async function CommentList({ shlokaId }: CommentListProps) {
  const comments = await getCommentsByShlokaId(shlokaId)

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        Comments
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </h3>

      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 italic bg-gray-50 rounded-lg">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  )
}
