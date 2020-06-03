module.exports = {
  displayName: 'github-explorer',
  testURL: 'http://localhost',
  transformIgnorePatterns: ['/!node_modules\\/@material-ui/'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/cypress/'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^src(.*)$': '<rootDir>/src$1',
    '^test-setup(.*)$': '<rootDir>/test-setup$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test-setup/setupTests.js'],

  collectCoverageFrom: [
    '**/src/**/*.(js|jsx)',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
};
