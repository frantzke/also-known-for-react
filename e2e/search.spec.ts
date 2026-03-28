import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("search input is visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput.first()).toBeVisible({ timeout: 10000 });
  });

  test("typing in search shows results after debounce", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Wait for search input to be ready
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.click();
    await searchInput.fill("Batman");

    // Wait for debounce (500ms) + API response
    const results = page.getByText(/Batman/i);
    await expect(results.first()).toBeVisible({ timeout: 15000 });
  });
});
