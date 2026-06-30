jest.mock('@/lib/lake', () => {
    return {
        queryLake: jest.fn(),
        initLake: jest.fn(),
        searchLake: jest.fn(),
        getLakeDB: jest.fn(() => null),
        lake: {
            init: jest.fn()
        },
        __esModule: true
    };
});

import * as lakeModule from '@/lib/lake';

describe('lake.ts', () => {
    it('should export queryLake and initLake', () => {
        expect(typeof lakeModule.queryLake).toBe('function');
        expect(typeof lakeModule.initLake).toBe('function');
    });
});
