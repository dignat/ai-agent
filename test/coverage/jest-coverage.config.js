/**
 * Jest Coverage Configuration
 *
 * Configuration for comprehensive test coverage reporting
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/__mocks__/**',
    '!src/index.ts',
    '!src/cli/main.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'src/architecture/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'src/nlp/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    'src/input-parser/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'validation/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    'diagrams/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'docs/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/dist/',
    '/coverage/',
    '/demo/',
    '/examples/',
  ],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};