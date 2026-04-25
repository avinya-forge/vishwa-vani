import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr'] as const
type Language = typeof SUPPORTED_LANGUAGES[number]

// Initialize Gemini if API key is present
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { verseId, contextTexts, language = 'en' } = body || {}

    if (!verseId || typeof verseId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid verseId.', code: 'INVALID_VERSE_ID' },
        { status: 400 }
      )
    }

    if (!Array.isArray(contextTexts) || contextTexts.length === 0) {
      return NextResponse.json(
        { error: 'No context text provided for synthesis.', code: 'NO_CONTEXT' },
        { status: 400 }
      )
    }

    if (!SUPPORTED_LANGUAGES.includes(language as Language)) {
      return NextResponse.json(
        { error: 'Unsupported language. Use en, hi, or mr.', code: 'UNSUPPORTED_LANGUAGE' },
        { status: 400 }
      )
    }

    const validTexts = (contextTexts as unknown[])
      .filter((t): t is string => typeof t === 'string' && (t).trim().length > 0)
      .map((t) => (t).trim())

    if (validTexts.length === 0) {
      return NextResponse.json(
        { error: 'Context texts were empty.', code: 'EMPTY_CONTEXT' },
        { status: 400 }
      )
    }

    const meaningText = validTexts[0]
    const commentarySnippets = validTexts.slice(1, 3)

    // REAL AI SYNTHESIS (GEMINI)
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
        
        const prompt = `
          As a Vedic scholar, synthesize the following verse meaning and commentaries into a concise, 
          profound 2-3 sentence summary in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}.
          Focus on the practical philosophical application of this wisdom.
          
          Verse Meaning: ${meaningText}
          Commentaries: ${commentarySnippets.join(' | ')}
          
          Provide only the summary, no introductory or concluding text.
        `

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini timeout after 10s')), 10_000)
        )
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise])
        const synthesis = result.response.text().trim()

        if (synthesis) {
          return NextResponse.json({
            success: true,
            synthesis,
            synthesisMode: 'generative-gemini',
            metadata: { verseId, language }
          })
        }
      } catch (aiError) {
        console.error('Gemini synthesis failure, falling back:', aiError)
      }
    }

    // FALLBACK: Concatenation (Free/Deterministic)
    const fallbackSynthesis = commentarySnippets.length > 0
        ? `${meaningText}\n\nSynthesis: ${commentarySnippets.join(' | ')}`
        : meaningText

    return NextResponse.json(
      {
        success: true,
        synthesis: fallbackSynthesis.substring(0, 2048),
        synthesisMode: 'concatenation-fallback',
        metadata: {
          verseId,
          language,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API synthesis error:', error)
    return NextResponse.json(
      { error: 'Synthesis service temporarily unavailable.', code: 'SERVICE_UNAVAILABLE' },
      { status: 503 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' }, { status: 405 })
}
