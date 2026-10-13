import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAllSubscribers } from '@/lib/server-lake';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = (searchParams.get('format') || 'json').toLowerCase();

    const subscribers = await getAllSubscribers();

    if (format === 'csv') {
      const headers = ['id', 'email', 'language', 'scripture_preference', 'status', 'created_at'];
      const rows = subscribers.map(s => [
        `"${(s.id || '').replace(/"/g, '""')}"`,
        `"${(s.email || '').replace(/"/g, '""')}"`,
        `"${(s.language || 'en').replace(/"/g, '""')}"`,
        `"${(s.scripturePreference || 'all').replace(/"/g, '""')}"`,
        `"${(s.status || 'active').replace(/"/g, '""')}"`,
        `"${(s.createdAt || '').replace(/"/g, '""')}"`,
      ].join(','));

      const csvContent = [headers.join(','), ...rows].join('\n');

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="vishwa-vani-subscribers-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error('API Error in GET /api/newsletter/export:', error);
    return NextResponse.json(
      { error: 'Failed to export subscriber telemetry.' },
      { status: 500 }
    );
  }
}
