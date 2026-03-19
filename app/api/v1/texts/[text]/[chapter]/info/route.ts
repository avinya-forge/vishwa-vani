import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const params = []
  for (let c = 1; c <= 18; c++) {
    params.push({ text: 'bhagavad-gita', chapter: `chapter-${c}` })
  }
  return params
}

export async function GET(request: Request, { params }: { params: Promise<{ text: string, chapter: string }> }) {
  const { text, chapter } = await params

  if (text !== 'bhagavad-gita') {
    return NextResponse.json({ error: 'Text not found.' }, { status: 404 })
  }

  const chapterNumber = chapter.replace('chapter-', '')
  const dataPath = path.join(process.cwd(), 'data', `bhagavad_gita_chapter_${chapterNumber}.json`)

  if (!fs.existsSync(dataPath)) {
    return NextResponse.json({ error: 'Chapter not found.' }, { status: 404 })
  }

  try {
    const rawData = fs.readFileSync(dataPath, 'utf8')
    const verses = JSON.parse(rawData)
    return NextResponse.json({
      text,
      chapter,
      verses
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to parse chapter data.' }, { status: 500 })
  }
}
