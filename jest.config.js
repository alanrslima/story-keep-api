/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/", // 👈 this line tells Jest to ignore any test files in the 'dist' directory
  ],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
