import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'

export type DictionaryEntry = Database['public']['Tables']['dictionary']['Row']

export async function searchWords(query: string): Promise<DictionaryEntry[]> {
    if (!query) return []

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('dictionary')
        .select('*')
        .ilike('root_word', `%${query}%`)
        .order('root_word', { ascending: true })
        .limit(20)

    if (error) {
        console.error('Error searching words:', error)
        return []
    }
    return data || []
}

export async function getWordById(id: string): Promise<DictionaryEntry | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('dictionary')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error(`Error fetching word ${id}:`, error)
        return null
    }
    return data
}
