/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // Source imports use .js extensions for ESM output, so map them back to the .ts files
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
