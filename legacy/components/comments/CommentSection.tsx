'use client'

import { useOptimistic } from 'react'
import { Comment } from '@/utils/services/comments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

interface CommentSectionProps {
  initialComments: Comment[]
  shlokaId: string
  currentUserId: string | null
}

export default function CommentSection({
  initialComments,
  shlokaId,
  currentUserId,
}: CommentSectionProps) {
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    Comment[],
    Comment
  >(initialComments, (state, newComment) => [...state, newComment])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {optimisticComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 italic bg-gray-50 rounded-lg">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          optimisticComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>

      {currentUserId ? (
        <CommentForm
          shlokaId={shlokaId}
          currentUserId={currentUserId}
          addOptimisticComment={addOptimisticComment}
        />
      ) : (
        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
          <p className="text-sm text-gray-600">
            Please log in to leave a comment.
          </p>
        </div>
      )}
    </div>
  )
}
