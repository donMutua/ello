export default {
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/__mocks__/fileMock.js",
  },
};
