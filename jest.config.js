module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testPathIgnorePatterns: ["/node_modules/", "/plopTemplates"],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ["<rootDir>src/test/setup.ts"]
}
