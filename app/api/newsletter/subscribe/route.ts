import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { addSubscriber, getSubscribersCount } from '@/lib/server-lake';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { email, language, visitorId, scripturePreference } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length < 5 || trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email format' },
        { status: 400 }
      );
    }

    // Supported languages
    const validLanguages = ['en', 'hi', 'mr', 'sa', 'all'];
    const sanitizedLanguage = typeof language === 'string' && validLanguages.includes(language.toLowerCase())
      ? language.toLowerCase()
      : 'en';

    const sanitizedVisitorId = typeof visitorId === 'string' && visitorId.length <= 128
      ? visitorId
      : undefined;

    const sanitizedPreference = typeof scripturePreference === 'string' && scripturePreference.length <= 64
      ? scripturePreference.trim().toLowerCase()
      : 'all';

    const result = await addSubscriber({
      email: trimmedEmail,
      language: sanitizedLanguage,
      visitorId: sanitizedVisitorId,
      scripturePreference: sanitizedPreference,
    });

    return NextResponse.json({
      success: true,
      isNew: result.isNew,
      message: result.message,
    });
  } catch (error) {
    console.error('API Error in /api/newsletter/subscribe:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing subscription.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await getSubscribersCount();
    return NextResponse.json({
      success: true,
      activeSubscribers: count,
    });
  } catch (error) {
    console.error('API Error in GET /api/newsletter/subscribe:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve subscriber telemetry.' },
      { status: 500 }
    );
  }
}
