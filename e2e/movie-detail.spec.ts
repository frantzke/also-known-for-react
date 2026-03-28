import { test, expect } from "@playwright/test";

test.describe("Movie Detail Page", () => {
  // Use a well-known movie ID (550 = Fight Club)
  test("displays movie information", async ({ page }) => {
    await page.goto("/movie/550");

    // Should show the movie title containing "Fight Club"
    const heading = page.getByText(/Fight Club/i);
    await expect(heading.first()).toBeVisible({ timeout: 20000 });

    // Should show overview text
    const overview = page.getByText(/insomniac/i);
    await expect(overview.first()).toBeVisible({ timeout: 10000 });
  });

  test("displays genre chips", async ({ page }) => {
    await page.goto("/movie/550");

    // Should show at least one genre
    const genre = page.getByText(/Drama/i);
    await expect(genre.first()).toBeVisible({ timeout: 20000 });
  });

  test("loads cast section", async ({ page }) => {
    await page.goto("/movie/550");

    // Cast-related content should eventually appear (actor names or "Cast" heading)
    // Look for Brad Pitt who is in Fight Club
    const actor = page.getByText(/Brad Pitt|Edward Norton/i);
    await expect(actor.first()).toBeVisible({ timeout: 30000 });
  });
});
