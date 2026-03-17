'use server'

import { getWordById } from '@/utils/services/dictionary'

export async function getWordDefinitionAction(wordId: string) {
    return getWordById(wordId)
}

import { searchWords } from '@/utils/services/dictionary'

export async function searchWordsAction(query: string, language?: string) {
    return searchWords(query, language)
}
