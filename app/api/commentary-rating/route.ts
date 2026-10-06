import { NextResponse } from 'next/server'
import { z } from 'zod'
import { validateApiRequest } from '@/lib/api-guard'

const ratingSchema = z.object({
  scriptureId: z.string().trim().min(1).max(50),
  chapter: z.number().int().min(0).max(1000),
  verse: z.number().int().min(0).max(1000),
  scholarId: z.string().trim().min(1).max(50),
  rating: z.number().int().min(1).max(5),
  feedbackText: z.string().trim().max(1000).optional()
})

function escapeMarkdown(text: string) {
  return text.replace(/[@#_*~`>\[\]\(\)]/g, '\\$&');
}

export async function POST(request: Request) {
  try {
    const guardResult = await validateApiRequest(request, ratingSchema)
    if (guardResult.error) return guardResult.error
    
    const { scriptureId, chapter, verse, scholarId, rating, feedbackText } = guardResult.data!

    const githubToken = process.env.GITHUB_TOKEN

    // 2. Mocking response in development/test/missing token scenarios
    if (!githubToken) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Missing GITHUB_TOKEN in production environment');
        return NextResponse.json({ error: 'Service temporarily unavailable', code: 'SERVICE_UNAVAILABLE' }, { status: 503 })
      } else {
        return NextResponse.json({
          success: true,
          mocked: true,
          message: 'Commentary rating submitted successfully (mocked)'
        })
      }
    }

    // 3. Formulating GitHub Issue title and body for structured DB logging
    const issueTitle = `[Commentary Rating] ${escapeMarkdown(scholarId)} scored ${rating}/5 on /${escapeMarkdown(scriptureId)}/${chapter}/${verse}`
    const issueBody = `
**Scholar**: ${escapeMarkdown(scholarId)}
**Scripture Path**: /${escapeMarkdown(scriptureId)}/${chapter}/${verse}
**Rating**: ${rating} / 5 stars

**Qualitative Feedback**:
${feedbackText ? escapeMarkdown(feedbackText) : 'No qualitative comments provided.'}

---
*Telemetry submitted via Vishwa-Vani Crowd-Sourced Curation System*
`

    // 4. Submit to GitHub API
    const response = await fetch('https://api.github.com/repos/avinya-forge/vishwa-vani/issues', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ['commentary-rating', scholarId.toLowerCase().replace(/[^a-z0-9-]/g, ''), `rating:${rating}`]
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('GitHub API error during rating submission:', errorData)
      return NextResponse.json(
        { error: 'Failed to submit rating telemetry', code: 'GITHUB_API_ERROR' },
        { status: 502 }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      url: data.html_url
    })

  } catch (error) {
    console.error('Commentary Rating API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' }, { status: 405 })
}
