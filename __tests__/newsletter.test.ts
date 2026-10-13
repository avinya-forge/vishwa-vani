jest.mock('next/server', () => ({
  NextResponse: class MockNextResponse {
    status: number;
    headers: Record<string, string>;
    private body: unknown;

    constructor(body?: unknown, init?: { status?: number; headers?: Record<string, string> }) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = init?.headers || {};
    }

    static json(data: unknown, options?: { status?: number; headers?: Record<string, string> }) {
      return {
        status: options?.status || 200,
        headers: options?.headers || {},
        json: async () => data,
      };
    }

    async text() {
      return typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
    }

    async json() {
      return typeof this.body === 'object' ? this.body : JSON.parse(String(this.body));
    }
  },
}));

import { addSubscriber, getAllSubscribers, getSubscribersCount } from '@/lib/server-lake';
import { GET as exportGet } from '@/app/api/newsletter/export/route';
import type { NextRequest } from 'next/server';

describe('Newsletter & Subscriber Operations', () => {
  it('adds and retrieves subscribers with resilient in-memory fallback', async () => {
    const testEmail = `test_${Date.now()}@example.com`;
    const res = await addSubscriber({
      email: testEmail,
      language: 'hi',
      scripturePreference: 'bhagavad-gita',
    });

    expect(res.success).toBe(true);

    const all = await getAllSubscribers();
    const found = all.find(s => s.email === testEmail);
    expect(found).toBeDefined();
    expect(found?.language).toBe('hi');
    expect(found?.scripturePreference).toBe('bhagavad-gita');

    const count = await getSubscribersCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  it('handles duplicate subscription updates gracefully', async () => {
    const testEmail = `test_dup_${Date.now()}@example.com`;
    const res1 = await addSubscriber({ email: testEmail, language: 'en' });
    expect(res1.success).toBe(true);

    const res2 = await addSubscriber({ email: testEmail, language: 'mr' });
    expect(res2.success).toBe(true);

    const all = await getAllSubscribers();
    const found = all.find(s => s.email === testEmail);
    expect(found?.language).toBe('mr');
  });

  it('exports subscribers in JSON format', async () => {
    const mockReq = {
      url: 'http://localhost:3000/api/newsletter/export?format=json',
    } as unknown as NextRequest;

    const res = await exportGet(mockReq);
    expect(res.status).toBe(200);
    const json = await (res as unknown as { json: () => Promise<{ success: boolean; subscribers: unknown[] }> }).json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.subscribers)).toBe(true);
  });

  it('exports subscribers in CSV format', async () => {
    const mockReq = {
      url: 'http://localhost:3000/api/newsletter/export?format=csv',
    } as unknown as NextRequest;

    const res = await exportGet(mockReq);
    expect(res.status).toBe(200);
    const text = await (res as unknown as { text: () => Promise<string> }).text();
    expect(text).toContain('id,email,language');
  });
});
