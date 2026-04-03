import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { verseId, contextTexts, language = 'en' } = body || {}

    if (!Array.isArray(contextTexts) || contextTexts.length === 0) {
      return NextResponse.json({ success: false, message: 'No context text provided for synthesis.' }, { status: 400 })
    }

    // TODO: replace with real LLM or local synthesis engine. For now, safe fallback.
    const sample = contextTexts.slice(0, 3).join(' ')
    const synthesis = `Auto-synthesis (${language}) from ${verseId}: ${sample.substring(0, 1024)}`

    return NextResponse.json({ success: true, synthesis })
  } catch (error) {
    console.error('API synth error', error)
    return NextResponse.json({ success: false, message: 'Synthesis service unavailable.' }, { status: 503 })
  }
}
