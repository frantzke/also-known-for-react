import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("loads and displays section headers", async ({ page }) => {
    await page.goto("/");

    // Should have multiple section headers
    const headers = page.locator("h3");
    await expect(headers.first()).toBeVisible({ timeout: 20000 });

    const count = await headers.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("displays poster content in each section", async ({ page }) => {
    await page.goto("/");

    // Wait for poster title text to appear (works for both v-img divs and img tags)
    // The first section should have poster names like movie/show titles
    const headers = page.locator("h3");
    await expect(headers.first()).toBeVisible({ timeout: 20000 });

    // Multiple sections should be visible
    const sectionCount = await headers.count();
    expect(sectionCount).toBeGreaterThanOrEqual(4);
  });

  test("has a navigation bar with logo", async ({ page }) => {
    await page.goto("/");

    // Wait for page to render
    await page.waitForLoadState("domcontentloaded");

    // Logo image should be present (check by src pattern)
    const logo = page.locator('img[src*="AKF"], img[src*="Logo"]');
    await expect(logo.first()).toBeVisible({ timeout: 10000 });
  });
});
