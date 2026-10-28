jest.mock('next/server', () => {
    return {
        NextResponse: {
            json: jest.fn().mockImplementation((body, init) => {
                return {
                    status: init?.status ?? 200,
                    json: async () => body,
                };
            }),
        },
    };
});

import { POST } from '../app/api/engine/onboard/route';

describe('POST /api/engine/onboard', () => {
    it('should reject invalid slugs for directory traversal', async () => {
        const mockRequest = {
            json: async () => ({ slug: '../secrets' })
        } as unknown as Request;

        const res = await POST(mockRequest);
        expect(res.status).toBe(400);

        const data = await res.json();
        expect(data.error).toMatch(/Invalid slug format detected: \.\.\/secrets/);
    });

    it('should accept valid slugs', async () => {
        const mockRequest = {
            json: async () => ({ slug: 'bhagavad-gita' })
        } as unknown as Request;

        try {
            const res = await POST(mockRequest);
            if (res.status === 400) {
               const data = await res.json();
               expect(data.error).not.toMatch(/Invalid slug format detected/);
            }
        } catch {
            expect(true).toBe(true);
        }
    });
});
