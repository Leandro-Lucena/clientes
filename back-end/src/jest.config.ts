import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.test.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!some-package-to-transform).+\\.js$",
  ],
};

export default config;
