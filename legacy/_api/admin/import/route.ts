import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Service Role Client (for writing data)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Note: SUPABASE_SERVICE_ROLE_KEY must be in .env.local for this to work
// If it's not there, this will fail. For MVP, we might need to tell the user to add it.

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const adminKey = request.headers.get('x-admin-key')

        // Simple Verification
        if (adminKey !== 'om-shanti') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!supabaseUrl || !serviceRoleKey) {
            return NextResponse.json({ error: 'Server misconfiguration: Missing Service Role Key' }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, serviceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })

        const { dictionary, shlokas } = body
        let dictCount = 0
        let shlokaCount = 0

        // 1. Insert Dictionary Entries
        if (dictionary && Array.isArray(dictionary)) {
            const { error } = await supabase.from('dictionary').upsert(dictionary, { onConflict: 'root_word' })
            if (error) throw error
            dictCount = dictionary.length
        }

        // 2. Insert Shlokas
        // Note: Shlokas might reference dictionary IDs. If the user provides raw IDs in JSON, great.
        // If they provide root_words, we'd need a lookup logic here.
        // For MVP Phase 4, we assume the JSON is pre-processed or uses UUIDs if they exist, 
        // OR we just insert shlokas and assume the mapping is correct in the JSON.
        if (shlokas && Array.isArray(shlokas)) {
            const { error } = await supabase.from('shlokas').insert(shlokas)
            if (error) throw error
            shlokaCount = shlokas.length
        }

        return NextResponse.json({
            message: `Imported ${dictCount} words and ${shlokaCount} shlokas.`
        })

    } catch (error) {
        console.error('Import error:', error)
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
