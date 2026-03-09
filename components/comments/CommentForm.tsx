'use client'

import { useRef } from 'react'
import { Comment } from '@/utils/services/comments'
import { addComment } from '@/app/actions/comments'

interface CommentFormProps {
  shlokaId: string
  currentUserId: string
  addOptimisticComment: (comment: Comment) => void
}

export default function CommentForm({
  shlokaId,
  currentUserId,
  addOptimisticComment,
}: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const action = async (formData: FormData) => {
    const content = formData.get('content') as string

    if (!content || content.trim().length === 0) return

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
  )
}
