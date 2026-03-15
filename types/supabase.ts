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
            comments: {
                Row: {
                    id: string
                    shloka_id: string
                    user_id: string
                    content: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    shloka_id: string
                    user_id: string
                    content: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    shloka_id?: string
                    user_id?: string
                    content?: string
                    created_at?: string
                    updated_at?: string
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
                    lyric_timestamps: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    deity: string
                    source_text: string
                    verse_index: number
                    sanskrit_text: string
                    word_mapping?: Json
                    lyric_timestamps?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    deity?: string
                    source_text?: string
                    verse_index?: number
                    sanskrit_text?: string
                    word_mapping?: Json
                    lyric_timestamps?: Json
                    created_at?: string
                }
            }
        }
    }
}
