'use server'

import { createClient } from '@/utils/supabase/server'

export async function toggleReaction(entityId: string, reactionType: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to react' }
  }

  // Check if reaction already exists
  const { data: existingReaction, error: fetchError } = await supabase
    .from('reactions')
    .select('id')
    .eq('entity_id', entityId)
    .eq('user_id', user.id)
    .eq('reaction_type', reactionType)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
    console.error('Error checking reaction:', fetchError)
    return { error: 'Failed to check reaction status' }
  }

  if (existingReaction) {
    // Delete the reaction if it exists
    const { error: deleteError } = await supabase
      .from('reactions')
      .delete()
      .eq('id', existingReaction.id)

    if (deleteError) {
      console.error('Error deleting reaction:', deleteError)
      return { error: 'Failed to remove reaction' }
    }

    // We don't know the exact route, but maybe we shouldn't hardcode revalidatePath here,
    // or we can revalidate based on the entity.
    // Assuming entityId could be anything (shloka, comment, etc.).
    // revalidatePath(`/shlokas/${entityId}`) - This might be too specific if it's a comment.
    // But for now let's just return success

    return { success: true, action: 'deleted' }
  } else {
    // Insert new reaction if it doesn't exist
    const { data, error: insertError } = await supabase
      .from('reactions')
      .insert({
        entity_id: entityId,
        user_id: user.id,
        reaction_type: reactionType,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error adding reaction:', insertError)
      return { error: 'Failed to add reaction' }
    }

    return { success: true, action: 'inserted', data }
  }
}
