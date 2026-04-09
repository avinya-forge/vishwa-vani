import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, message, email } = body

    if (!type || !message) {
      return NextResponse.json({ error: 'Type and message are required' }, { status: 400 })
    }

    if (message.length < 200) {
      return NextResponse.json({ error: 'Message must be at least 200 characters long' }, { status: 400 })
    }

    const githubToken = process.env.GITHUB_TOKEN

    // In test environment or if token is missing, simulate success
    if (!githubToken || process.env.NODE_ENV === 'test') {
      return NextResponse.json({
        success: true,
        url: 'https://github.com/mock/repo/issues/1',
        mocked: true
      })
    }

    // Call GitHub API to create an issue
    const issueTitle = `[${type}] Beta Feedback`
    const issueBody = `
**Type**: ${type}
**Email**: ${email || 'Not provided'}

**Message**:
${message}
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

    if (!response.ok) {
      const errorData = await response.json()
      console.error('GitHub API error:', errorData)
      return NextResponse.json({ error: 'Failed to create GitHub issue' }, { status: 502 })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      url: data.html_url
    })

  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
