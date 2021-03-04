module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupJest.ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/jestSetup.ts',
    '<rootDir>/node_modules/',
    '.module.ts',
    '.html'
  ],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest'
  },
  globals: {
    'ts - jest': {
      tsConfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html'
    }
  },
  moduleNameMapper: {
    '^@mdm/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1'
  },
  reporters: [
    'default',
    'jest-junit',
    ['jest-html-reporter', { pageTitle: 'Test Report' }],
     ['jest-sonar',{outputDirectory: 'test-report'}]
  ],
  watchPathIgnorePatterns: [
    'test-report/',
    'junit.xml'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)' // Ignore files inside node_modules folder
  ]
};
