/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
var config = require('./jest.config');
config.rootDir = 'integration-tests';
config.globalSetup = './jest-global-setup.ts';
// config.globalTeardown = './jest-global-teardown.ts';
config.setupFilesAfterEnv = ['./setup-integration.ts'];
console.log('RUNNING INTEGRATION TESTS');
module.exports = config;
