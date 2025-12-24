export default {
  testEnvironment: "node",
  testMatch: ["**/tests/e2e/**/*.test.js"],
  setupFilesAfterEnv: [],
  globalSetup: "<rootDir>/tests/e2e/setup.cjs",
  globalTeardown: "<rootDir>/tests/e2e/teardown.cjs",
  testTimeout: 20000,
};
