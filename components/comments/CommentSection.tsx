'use client'

import { useOptimistic, useRef } from 'react'
import { Comment } from '@/utils/services/comments'
import CommentItem from './CommentItem'
import { addComment } from '@/app/actions/comments'

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
  const formRef = useRef<HTMLFormElement>(null)

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    Comment[],
    Comment
  >(initialComments, (state, newComment) => [...state, newComment])

  const action = async (formData: FormData) => {
    const content = formData.get('content') as string

    if (!content || content.trim().length === 0 || !currentUserId) return

    // Add optimistic comment
    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      shloka_id: shlokaId,
      user_id: currentUserId,
      content: content.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    addOptimisticComment(optimisticComment)
    formRef.current?.reset()

    // Server action
    await addComment(shlokaId, formData)
  }

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
        <form ref={formRef} action={action} className="mt-8 flex flex-col gap-3">
          <textarea
            name="content"
            required
            rows={3}
            placeholder="Add your thoughts..."
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-y"
          />
          <button
            type="submit"
            className="self-end bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </form>
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
