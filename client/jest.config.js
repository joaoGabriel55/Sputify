/**
 * For a detailed explanation regarding each configuration property, visit:
 * https:
 */

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",

  testMatch: [
    "**/__tests__/**/*.?([mc])[jt]s?(x)",
    "**/?(*.)+(test).?([mc])[jt]s?(x)",
  ],

  transformIgnorePatterns: ["/node_modules/(?!swiper|ssr-window|dom7)"],

  transform: {
    "^.+\\.(ts|tsx|js)$": "babel-jest", // this is probably something you already had, if using ts-jest, it's probably fine to leave as ts-jest
    // "^.+\\.(css)$": "<rootDir>/config/jest/fileTransform.js", // add this to fix css import issues
  },
};

module.exports = config;
