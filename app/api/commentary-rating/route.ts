import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { scriptureId, chapter, verse, scholarId, rating, feedbackText } = body

    // 1. Inputs validation
    if (!scriptureId || typeof chapter !== 'number' || typeof verse !== 'number' || !scholarId || typeof rating !== 'number') {
      return NextResponse.json(
        { error: 'scriptureId, chapter, verse, scholarId, and rating are required', code: 'MISSING_FIELDS' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5', code: 'INVALID_RATING' },
        { status: 400 }
      )
    }

    const githubToken = process.env.GITHUB_TOKEN

    // 2. Mocking response in development/test/missing token scenarios
    if (!githubToken || process.env.NODE_ENV === 'test') {
      return NextResponse.json({
        success: true,
        mocked: true,
        message: 'Commentary rating submitted successfully (mocked)'
      })
    }

    // 3. Formulating GitHub Issue title and body for structured DB logging
    const issueTitle = `[Commentary Rating] ${scholarId} scored ${rating}/5 on /${scriptureId}/${chapter}/${verse}`
    const issueBody = `
**Scholar**: ${scholarId}
**Scripture Path**: /${scriptureId}/${chapter}/${verse}
**Rating**: ${rating} / 5 stars

**Qualitative Feedback**:
${feedbackText || 'No qualitative comments provided.'}

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
        labels: ['commentary-rating', scholarId, `rating:${rating}`]
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
