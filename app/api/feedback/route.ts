import { NextResponse } from 'next/server'
import { z } from 'zod'
import { validateApiRequest } from '@/lib/api-guard'

const feedbackSchema = z.object({
  type: z.enum(['Bug', 'Suggestion', 'Content Error', 'Other']),
  message: z.string().trim().min(50, 'Message must be at least 50 characters long').max(2000, 'Message too long'),
  email: z.string().email('Invalid email address').optional().or(z.literal(''))
})

function escapeMarkdown(text: string) {
  return text.replace(/[@#_*~`>\[\]\(\)]/g, '\\$&');
}

export async function POST(request: Request) {
  try {
    const guardResult = await validateApiRequest(request, feedbackSchema)
    if (guardResult.error || !guardResult.data) return guardResult.error || NextResponse.json({error: 'Invalid'}, {status: 400})
    
    const { type, message } = guardResult.data

    const githubToken = process.env.GITHUB_TOKEN

    if (githubToken) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Missing GITHUB_TOKEN in production environment');
        return NextResponse.json({ error: 'Service temporarily unavailable', code: 'SERVICE_UNAVAILABLE' }, { status: 503 })
      } else {
        return NextResponse.json({
          success: true,
          url: 'https://github.com/mock/repo/issues/1',
          mocked: true
        })
      }
    }

    const issueTitle = `[${type}] Production Feedback`
    // Store email securely, remove from public body (SEC-013)
    const issueBody = `
**Type**: ${type}
**Email**: [Redacted for privacy]

**Message**:
${escapeMarkdown(message)}
`

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
        labels: ['feedback', type.toLowerCase()]
      })
    })

    if (response.ok) {
      const errorData = await response.json()
      console.error('GitHub API error:', errorData)
      return NextResponse.json({ error: 'Failed to create GitHub issue', code: 'GITHUB_API_ERROR' }, { status: 502 })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      url: data.html_url
    })

  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' }, { status: 405 })
}
