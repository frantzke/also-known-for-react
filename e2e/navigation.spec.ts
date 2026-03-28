import { test, expect } from "@playwright/test";

test.describe("Navigation Flow", () => {
  test("navigate from home to detail page via poster click", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait for section headers to appear (data loaded)
    const headers = page.locator("h3");
    await expect(headers.first()).toBeVisible({ timeout: 20000 });

    // Find a clickable poster area — look for poster name text, then click its parent
    // Both apps render poster names as text near the poster image
    const posterText = page
      .locator("p, .subtitle-1")
      .filter({
        hasNotText: /Trending|Now Playing|Popular|Upcoming|Top Rated|Search/i,
      });
    await expect(posterText.first()).toBeVisible({ timeout: 20000 });
    await posterText.first().click();

    // Should navigate to a detail page
    await page.waitForURL(/\/(movie|tv|person)\/\d+/, { timeout: 15000 });
  });

  test("clicking logo navigates home", async ({ page }) => {
    await page.goto("/movie/550");

    // Wait for page content
    const content = page.getByText(/Fight Club/i);
    await expect(content.first()).toBeVisible({ timeout: 20000 });

    // Click the logo
    const logo = page.locator('img[src*="AKF"], img[src*="Logo"]');
    await logo.first().click();

    // Should be back on home
    await page.waitForURL(/\/$/, { timeout: 10000 });
  });
});
