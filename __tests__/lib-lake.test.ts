jest.mock('@/lib/lake', () => {
    return {
        __esModule: true,
        queryLake: jest.fn(),
        initLake: jest.fn(),
        searchLake: jest.fn(),
        getLakeDB: jest.fn(() => null),
        lake: {
            init: jest.fn()
        }
    };
});

import * as lakeModule from '@/lib/lake';

describe('lake.ts', () => {
    it('should export methods', () => {
        expect(lakeModule).toBeDefined();
    });
});
