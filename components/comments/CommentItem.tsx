import { Comment } from '@/utils/services/comments'

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  // Format the date
  const dateObj = new Date(comment.created_at)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)

  return (
    <div className="flex flex-col p-5 bg-orange-50/30 rounded-lg border border-orange-100 hover:border-orange-200 transition-colors shadow-sm relative group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {/* Avatar Placeholder */}
          <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-sm shadow-sm">
             {comment.user_id ? comment.user_id.substring(0, 2).toUpperCase() : '??'}
          </div>
          <div>
              <span className="font-semibold text-gray-800 text-sm">
                  User {comment.user_id.substring(0, 6)}
              </span>
              <span className="text-xs text-gray-500 block">
                  {formattedDate}
              </span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap pl-[2.5rem]">
        {comment.content}
      </p>
    </div>
  )
}
