import { NextResponse } from 'next/server'

const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr'] as const
type Language = typeof SUPPORTED_LANGUAGES[number]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { verseId, contextTexts, language = 'en' } = body || {}

    if (!verseId || typeof verseId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid verseId.', message: 'Missing or invalid verseId.', code: 'INVALID_VERSE_ID' },
        { status: 400 }
      )
    }

    if (!Array.isArray(contextTexts) || contextTexts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No context text provided for synthesis.', message: 'No context text provided for synthesis.', code: 'NO_CONTEXT' },
        { status: 400 }
      )
    }

    if (!SUPPORTED_LANGUAGES.includes(language as Language)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported language. Use en, hi, or mr.', message: 'Unsupported language. Use en, hi, or mr.', code: 'UNSUPPORTED_LANGUAGE' },
        { status: 400 }
      )
    }

    const validTexts = (contextTexts as unknown[])
      .filter((t): t is string => typeof t === 'string' && (t).trim().length > 0)
      .map((t) => (t).trim())

    if (validTexts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'All context texts were empty or invalid.', message: 'All context texts were empty or invalid.', code: 'EMPTY_CONTEXT' },
        { status: 400 }
      )
    }

    const meaningText = validTexts[0]
    const commentarySnippets = validTexts.slice(1, 3)

    const synthesisText =
      commentarySnippets.length > 0
        ? `${meaningText}\n\nContext: ${commentarySnippets.join(' | ')}`
        : meaningText

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
      { success: false, error: 'Synthesis service temporarily unavailable.', message: 'Synthesis service temporarily unavailable.', code: 'SERVICE_UNAVAILABLE' },
      { status: 503 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ success: false, error: 'Method not allowed', message: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' }, { status: 405 })
}
