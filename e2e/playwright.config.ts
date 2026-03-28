import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  timeout: 60000,
  retries: 1,
  use: {
    headless: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "old-app",
      use: {
        baseURL: "http://localhost:3000/also-known-for",
      },
    },
    {
      name: "new-app",
      use: {
        baseURL: "http://localhost:3001",
      },
    },
  ],
});
