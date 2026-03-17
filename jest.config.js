/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^react-markdown$': '<rootDir>/components/editor/__mocks__/react-markdown.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
