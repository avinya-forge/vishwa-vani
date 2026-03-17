import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'

export type Comment = Database['public']['Tables']['comments']['Row']

export async function getCommentsByShlokaId(shlokaId: string): Promise<Comment[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('shloka_id', shlokaId)
        .order('created_at', { ascending: true })

    if (error) {
        console.error(`Error fetching comments for shloka ${shlokaId}:`, error)
        return []
    }
    return data || []
}
