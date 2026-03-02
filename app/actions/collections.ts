'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getUserCollections() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated', data: null }
  }

  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching collections:', error)
    return { error: error.message, data: null }
  }

  return { data, error: null }
}

export async function createCollection(name: string, description: string) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated', data: null }
  }

  const { data, error } = await supabase
    .from('collections')
    .insert([
      { name, description, user_id: user.id }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating collection:', error)
    return { error: error.message, data: null }
  }

  revalidatePath('/collections')
  return { data, error: null }
}

export async function saveItemToCollection(collectionId: string, itemType: string, itemId: string) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated', data: null }
  }

  // Optional: check if the collection belongs to the user
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('id')
    .eq('id', collectionId)
    .eq('user_id', user.id)
    .single()

  if (collectionError || !collection) {
    return { error: 'Collection not found or access denied', data: null }
  }

  const { data, error } = await supabase
    .from('saved_items')
    .insert([
      { collection_id: collectionId, item_type: itemType, item_id: itemId }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error saving item:', error)
    return { error: error.message, data: null }
  }

  revalidatePath(`/collections/${collectionId}`)
  return { data, error: null }
}

export async function removeItemFromCollection(savedItemId: string, collectionId: string) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated', data: null }
  }

  // Need to verify user owns the collection this item is in, or rely on RLS
  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('id', savedItemId)

  if (error) {
    console.error('Error removing item:', error)
    return { error: error.message, data: null }
  }

  revalidatePath(`/collections/${collectionId}`)
  return { data: null, error: null }
}
