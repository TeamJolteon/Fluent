module.exports = {
  clearMocks: true,
  // Don't look for tests in these directories
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/', '<rootDir>/lib/'],
  // Define where to output the coverage report
  coverageDirectory: '<rootDir>/coverage',
  // Define what to include in the coverage report
  collectCoverageFrom: [
    // Collect Coverage from:
    '**/*.js', // All Javascript files
    '!**/node_modules/**', //   ... except node modules
    '!**/build/**', //   ... and Next.js build dir
    '!**/coverage/**', //   ... and the coverage dir itself,
    '!**/*.config.js', //   ... nor any config files (eg. next.config.js nor jest.config.js)
    '!**/.next/**'
  ],
  testEnvironment: "jsdom"
  // testMatch: [
  //   '<rootDir>/**/*.test.js',
  //   '<rootDir>/**/*.test.jsx'
  // ]
}