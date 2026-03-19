import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return [
    { text: 'bhagavad-gita' }
  ]
}

export async function GET(request: Request, { params }: { params: Promise<{ text: string }> }) {
  const { text } = await params

  if (text !== 'bhagavad-gita') {
    return NextResponse.json({ error: 'Text not found. Supported texts: bhagavad-gita' }, { status: 404 })
  }

  // Mocked list of chapters based on data directory
  const chapters = []
  for (let i = 1; i <= 18; i++) {
    chapters.push({
      id: `chapter-${i}`,
      title: `Chapter ${i}`
    })
  }

  return NextResponse.json({
    text: 'bhagavad-gita',
    title: 'Shrimad Bhagavad Gita',
    chapters: chapters
  })
}
