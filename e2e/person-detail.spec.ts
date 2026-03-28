import { test, expect } from "@playwright/test";

test.describe("Person Detail Page", () => {
  // Use a well-known actor ID (287 = Brad Pitt)
  test("displays person information", async ({ page }) => {
    await page.goto("/person/287");

    const heading = page.getByText(/Brad Pitt/i);
    await expect(heading.first()).toBeVisible({ timeout: 20000 });

    // Should show biography
    const bio = page.getByText(/William Bradley|Oklahoma/i);
    await expect(bio.first()).toBeVisible({ timeout: 10000 });
  });

  test("displays filmography credits", async ({ page }) => {
    await page.goto("/person/287");

    // Should show credits section (named differently in old vs new app)
    const credits = page.getByText(/Cast Credits|credits/i);
    await expect(credits.first()).toBeVisible({ timeout: 20000 });
  });
});
