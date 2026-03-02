'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getUserCollections() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { collections: data }
}

export async function createCollection(name: string, description?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('collections')
    .insert([
      { user_id: user.id, name, description }
    ])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/collections')
  return { collection: data }
}

export async function addItemToCollection(collectionId: string, itemType: string, itemId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('saved_items')
    .insert([
      { collection_id: collectionId, item_type: itemType, item_id: itemId }
    ])

  if (error) {
    // 23505 is unique violation
    if (error.code === '23505') {
       return { error: 'Item already in collection' }
    }
    return { error: error.message }
  }

  revalidatePath(`/collections/${collectionId}`)
  return { success: true }
}

export async function removeItemFromCollection(collectionId: string, itemId: string, itemType: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('saved_items')
    .delete()
    .match({ collection_id: collectionId, item_id: itemId, item_type: itemType })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/collections/${collectionId}`)
  return { success: true }
}
