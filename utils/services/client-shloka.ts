import { createClient } from '@/utils/supabase/browser'
import { DictionaryEntry } from './shloka'
export type { DictionaryEntry }

export async function getWordDefinitionClient(wordId: string): Promise<DictionaryEntry | null> {
    const supabase = createClient()
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
