

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
var config = require('./jest.config');
config.rootDir = 'src';
config.testMatch = ['**/src/**/*.test.ts'];
config.testEnvironment = "node";
config.testPathIgnorePatterns = [ "/node_modules/", "/dist/" ],
config.transform = { "^.+.tsx?$": ["ts-jest", {}] };
console.log('RUNNING UNIT TESTS');
module.exports = config;
