import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  const lakeReady = process.env.TURSO_DATABASE_URL ? true : fs.existsSync(path.join(process.cwd(), 'public', 'vedic-lake.db'));

  if (!lakeReady) {
    return NextResponse.json({
      status: 'error',
      message: 'Database not ready',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }

  return NextResponse.json({
    status: 'ok',
    version: process.env.npm_package_version || 'unknown',
    lakeReady: true,
    mode: process.env.TURSO_DATABASE_URL ? 'turso-edge' : 'local-sqlite',
    timestamp: new Date().toISOString()
  }, { status: 200 })
}
