module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    "default",
    ["<rootDir>/node_modules/kelonio/out/plugin/jestReporter", {keepStateAtEnd: false, printReportAtEnd: true}]
  ],
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/kelonio/out/plugin/jestReporterSetup.js",
  ],
};
