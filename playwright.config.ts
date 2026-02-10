import { defineConfig } from "@playwright/test";

/**
 * Playwright configuration for API testing.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",

  /* Maximum time one test can run */
  timeout: 30_000,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Run tests in parallel */
  fullyParallel: true,

  /* Reporter configuration */
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        detail: true,
        suiteTitle: true,
      },
    ],
  ],

  /* Shared settings for all projects */
  use: {
    /* Base URL for API requests */
    baseURL: process.env.BASE_URL || "https://jsonplaceholder.typicode.com",

    /* Collect trace on first retry */
    trace: "on-first-retry",

    /* Extra HTTP headers */
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "api-tests",
      testDir: "./tests",
    },
  ],
});
