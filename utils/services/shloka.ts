import { supabase } from '@/utils/supabase/client'
import { Database } from '@/types/supabase'

export type Shloka = Database['public']['Tables']['shlokas']['Row']
export type DictionaryEntry = Database['public']['Tables']['dictionary']['Row']

export async function getShlokas(): Promise<Shloka[]> {
    const { data, error } = await supabase
        .from('shlokas')
        .select('*')
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching shlokas:', error)
        return []
    }
    return data || []
}

export async function getShlokaById(id: string): Promise<Shloka | null> {
    const { data, error } = await supabase
        .from('shlokas')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error(`Error fetching shloka ${id}:`, error)
        return null
    }
    return data
}

export async function getWordDefinition(wordId: string): Promise<DictionaryEntry | null> {
    const { data, error } = await supabase
        .from('dictionary')
        .select('*')
        .eq('id', wordId)
        .single()

    if (error) {
        console.error(`Error fetching definition ${wordId}:`, error)
        return null
    }
    return data
}
