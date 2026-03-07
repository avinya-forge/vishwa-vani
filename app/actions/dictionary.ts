'use server'

import { getWordById } from '@/utils/services/dictionary'

export async function getWordDefinitionAction(wordId: string) {
    return getWordById(wordId)
}
