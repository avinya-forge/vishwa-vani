import { NextResponse } from 'next/server'

/**
 * POST /api/synthesize
 *
 * Body: { verseId: string, contextTexts: string[], language?: 'en'|'hi'|'mr' }
 *
 * 200: { success: true, synthesis: string, synthesisMode: 'concatenation-fallback', metadata: {...} }
 * 400: { success: false, message: string }   — invalid / missing input
 * 503: { success: false, message: string }   — unexpected server error
 *
 * synthesisMode switches to 'llm' when a real inference engine is wired.
 */

const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr'] as const
type Language = typeof SUPPORTED_LANGUAGES[number]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { verseId, contextTexts, language = 'en' } = body || {}

    if (!verseId || typeof verseId !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Missing or invalid verseId.' },
        { status: 400 }
      )
    }

    if (!Array.isArray(contextTexts) || contextTexts.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No context text provided for synthesis.' },
        { status: 400 }
      )
    }

    if (!SUPPORTED_LANGUAGES.includes(language as Language)) {
      return NextResponse.json(
        { success: false, message: 'Unsupported language. Use en, hi, or mr.' },
        { status: 400 }
      )
    }

    // Logic: Multi-layered context synthesis.
    // Aggregates meaning and scholarly context snippets.
    const validTexts = (contextTexts as unknown[])
      .filter((t): t is string => typeof t === 'string' && (t).trim().length > 0)
      .map((t) => (t).trim())

    if (validTexts.length === 0) {
      return NextResponse.json(
        { success: false, message: 'All context texts were empty or invalid.' },
        { status: 400 }
      )
    }

    const meaningText = validTexts[0]
    const commentarySnippets = validTexts.slice(1, 3)

    const synthesisText =
      commentarySnippets.length > 0
        ? `${meaningText}\n\nContext: ${commentarySnippets.join(' | ')}`
        : meaningText

    // Limit response size to prevent token bloat in downstream consumers
    const synthesis = synthesisText.substring(0, 2048)

    return NextResponse.json(
      {
        success: true,
        synthesis,
        synthesisMode: 'concatenation-fallback',
        metadata: {
          verseId,
          language,
          contextId: Buffer.from(contextTexts.join('|')).toString('base64').substring(0, 16),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API synthesis error:', error)
    return NextResponse.json(
      { success: false, message: 'Synthesis service temporarily unavailable.' },
      { status: 503 }
    )
  }
}
