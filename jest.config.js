/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^react-markdown$': '<rootDir>/components/editor/__mocks__/react-markdown.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Coverage collection — run with: npm test -- --coverage
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    '!**/__mocks__/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!app/globals.css',
    '!app/favicon.ico',
  ],
  // Coverage thresholds — enforced to prevent regression.
  // The 80%+ target applies to core tested product paths.
  // Backlog items tracked in docs/backlog.md for expanding remaining components to >=80%.
  coverageThreshold: {
    global: {
      statements: 4,
      branches: 3,
      functions: 5,
      lines: 4,
    },
    // Core tested libraries — enforced floors
    './lib/vedic-science.ts': {
      statements: 95,
      branches: 90,
      functions: 95,
      lines: 95,
    },
    './lib/chapter-summaries.ts': {
      statements: 95,
      branches: 90,
      functions: 95,
      lines: 95,
    },
    './lib/daily-shloka.ts': {
      statements: 95,
      branches: 50,
      functions: 95,
      lines: 95,
    },
    './lib/data-service.ts': {
      statements: 75,
      branches: 60,
      functions: 85,
      lines: 80,
    },
    './lib/texts.ts': {
      statements: 70,
      branches: 15,
      functions: 80,
      lines: 75,
    },
  },
};
