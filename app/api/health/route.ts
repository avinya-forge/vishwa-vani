import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  const lakePath = path.join(process.cwd(), 'public', 'vedic-lake.db');
  const isLakeReady = fs.existsSync(lakePath);

  if (!isLakeReady) {
    return NextResponse.json({
      status: 'error',
      message: 'Lake not ready',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }

  return NextResponse.json({
    status: 'ok',
    version: process.env.npm_package_version || 'unknown',
    lakeReady: isLakeReady,
    timestamp: new Date().toISOString()
  }, { status: 200 })
}
