import { VEDIC_LIBRARY } from '@/lib/texts';

jest.mock('@/lib/schema', () => {
    return {
        db: {
            select: jest.fn(() => ({
                from: jest.fn(() => ({
                    where: jest.fn(() => Promise.resolve([])),
                    execute: jest.fn(() => Promise.resolve([]))
                }))
            })),
            insert: jest.fn(() => ({
                values: jest.fn(() => ({
                    onConflictDoNothing: jest.fn(() => Promise.resolve())
                }))
            }))
        },
        verses: {},
        searchIndex: {}
    }
});

describe('Vedic Library', () => {
   it('should contain yoga-sutras', () => {
       const text = VEDIC_LIBRARY.find(v => v.slug === 'yoga-sutras');
       expect(text).toBeDefined();
   })
});
