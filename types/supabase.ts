export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            dictionary: {
                Row: {
                    id: string
                    root_word: string
                    meaning_en: string | null
                    meaning_hi: string | null
                    meaning_mr: string | null
                    metadata: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    root_word: string
                    meaning_en?: string | null
                    meaning_hi?: string | null
                    meaning_mr?: string | null
                    metadata?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    root_word?: string
                    meaning_en?: string | null
                    meaning_hi?: string | null
                    meaning_mr?: string | null
                    metadata?: Json
                    created_at?: string
                }
            }
            shlokas: {
                Row: {
                    id: string
                    deity: string
                    source_text: string
                    verse_index: number
                    sanskrit_text: string
                    word_mapping: Json // Array of { original_word: string, word_id_ref?: string }
                    created_at: string
                }
                Insert: {
                    id?: string
                    deity: string
                    source_text: string
                    verse_index: number
                    sanskrit_text: string
                    word_mapping?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    deity?: string
                    source_text?: string
                    verse_index?: number
                    sanskrit_text?: string
                    word_mapping?: Json
                    created_at?: string
                }
            }
        }
    }
}
