import { test, expect } from "@playwright/test";

test.describe("CME List View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays the Solar Eruption Monitor heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /solar eruption monitor/i }),
    ).toBeVisible();
  });

  test("shows a scrollable list of CME events", async ({ page }) => {
    const list = page.getByRole("list");
    await expect(list).toBeVisible();

    // Check that multiple events are listed
    const items = page.getByRole("listitem");
    await expect(items).toHaveCount(12);
  });

  test("each event shows name, date, flare class, and description", async ({
    page,
  }) => {
    // Check the Bastille Day Storm entry
    await expect(page.getByText("The Bastille Day Storm")).toBeVisible();
    await expect(page.getByText("2000-07-14")).toBeVisible();
    await expect(page.getByText("X5.7")).toBeVisible();
  });

  test("shows the March 2025 Aurora event", async ({ page }) => {
    await expect(
      page.getByText("The March 2025 Aurora Storm"),
    ).toBeVisible();
    await expect(page.getByText("2025-03-23")).toBeVisible();
  });

  test("events have source attribution links", async ({ page }) => {
    const sourceLinks = page.locator(".cme-item-source a");
    const count = await sourceLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
