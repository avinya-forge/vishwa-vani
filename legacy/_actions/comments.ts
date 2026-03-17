'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addComment(shlokaId: string, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to comment' }
  }

  const content = formData.get('content') as string

  if (!content || content.trim().length === 0) {
    return { error: 'Comment cannot be empty' }
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      shloka_id: shlokaId,
      user_id: user.id,
      content: content.trim(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding comment:', error)
    return { error: 'Failed to add comment' }
  }

  revalidatePath(`/shlokas/${shlokaId}`)

  return { success: true, data }
}
