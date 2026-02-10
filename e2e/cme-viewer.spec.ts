import { test, expect } from "@playwright/test";

test.describe("CME Viewer", () => {
  test("navigates to viewer when clicking a CME event", async ({ page }) => {
    await page.goto("/");

    // Click the Halloween Storm
    await page.getByText("Halloween Storm: The First Punch").click();

    // Should show the viewer with back button
    await expect(
      page.getByRole("button", { name: /back/i }),
    ).toBeVisible();

    // Should show event name in header
    await expect(
      page.getByText("Halloween Storm: The First Punch"),
    ).toBeVisible();

    // Should show the flare class
    await expect(page.getByText("X17.2")).toBeVisible();
  });

  test("shows loading indicator while imagery loads", async ({ page }) => {
    await page.goto("/");
    await page.getByText("The Bastille Day Storm").click();

    // Should show loading text
    await expect(page.getByText(/loading/i)).toBeVisible();
  });

  test("has playback controls", async ({ page }) => {
    await page.goto("/");
    await page.getByText("The Bastille Day Storm").click();

    // Should have play button
    await expect(
      page.getByRole("button", { name: /play/i }),
    ).toBeVisible();

    // Should have time slider
    await expect(page.getByRole("slider")).toBeVisible();
  });

  test("navigates back to list when back button is clicked", async ({
    page,
  }) => {
    await page.goto("/");

    // Go to viewer
    await page.getByText("The Bastille Day Storm").click();
    await expect(
      page.getByRole("button", { name: /back/i }),
    ).toBeVisible();

    // Go back
    await page.getByRole("button", { name: /back/i }).click();

    // Should be back on list
    await expect(
      page.getByRole("heading", { name: /solar eruption monitor/i }),
    ).toBeVisible();
  });

  test("play button toggles to pause when clicked", async ({ page }) => {
    await page.goto("/");
    await page.getByText("The Bastille Day Storm").click();

    const playBtn = page.getByRole("button", { name: /play/i });
    await expect(playBtn).toBeVisible();

    // Click play
    await playBtn.click();

    // Should now show pause
    await expect(
      page.getByRole("button", { name: /pause/i }),
    ).toBeVisible();
  });
});
