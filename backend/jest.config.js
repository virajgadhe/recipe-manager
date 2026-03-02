const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: 'node',

  transform: {
    ...tsJestTransformCfg,
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
};
