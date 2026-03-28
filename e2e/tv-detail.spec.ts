import { test, expect } from "@playwright/test";

test.describe("TV Detail Page", () => {
  // Use a well-known TV show ID (1396 = Breaking Bad)
  test("displays TV show information", async ({ page }) => {
    await page.goto("/tv/1396");

    const heading = page.getByText(/Breaking Bad/i);
    await expect(heading.first()).toBeVisible({ timeout: 20000 });
  });

  test("loads cast section", async ({ page }) => {
    await page.goto("/tv/1396");

    // Look for Bryan Cranston who is in Breaking Bad
    const actor = page.getByText(/Bryan Cranston|Aaron Paul/i);
    await expect(actor.first()).toBeVisible({ timeout: 30000 });
  });
});
