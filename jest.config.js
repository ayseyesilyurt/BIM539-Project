export default {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!src/server.js"],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"]
};