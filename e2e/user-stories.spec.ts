import { test, expect } from "@playwright/test";

test.describe("User Stories", () => {
  test("I want to see the CME that caused the March 2025 Aurora", async ({
    page,
  }) => {
    // Navigate to the app
    await page.goto("/");

    // I should see a list of CME events
    await expect(
      page.getByRole("heading", { name: /solar eruption monitor/i }),
    ).toBeVisible();

    // I scroll through and find the March 2025 Aurora Storm
    const march2025 = page.getByText("The March 2025 Aurora Storm");
    await expect(march2025).toBeVisible();

    // I click on it to see the 3D timelapse
    await march2025.click();

    // I should see the interactive viewer with the event details
    await expect(
      page.getByText("The March 2025 Aurora Storm"),
    ).toBeVisible();

    // I should see playback controls
    await expect(page.getByRole("slider")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /play/i }),
    ).toBeVisible();

    // I should see a back button to go back to the list
    await expect(
      page.getByRole("button", { name: /back/i }),
    ).toBeVisible();

    // When I click play, the play button changes to pause
    await page.getByRole("button", { name: /play/i }).click();
    await expect(
      page.getByRole("button", { name: /pause/i }),
    ).toBeVisible();

    // I can go back to browse other events
    // First pause
    await page.getByRole("button", { name: /pause/i }).click();

    // Then click back
    await page.getByRole("button", { name: /back/i }).click();

    // I'm back on the list
    await expect(
      page.getByRole("heading", { name: /solar eruption monitor/i }),
    ).toBeVisible();
  });

  test("I want to explore the 2003 Halloween solar storms", async ({
    page,
  }) => {
    await page.goto("/");

    // I can see the Halloween Storm events in the list
    await expect(
      page.getByText("Halloween Storm: The First Punch"),
    ).toBeVisible();
    await expect(
      page.getByText("Halloween Storm: The Second Blow"),
    ).toBeVisible();

    // I click on the first Halloween Storm
    await page.getByText("Halloween Storm: The First Punch").click();

    // I see the viewer with details about this X17.2 event
    await expect(page.getByText("X17.2")).toBeVisible();

    // I go back to view the second Halloween Storm
    await page.getByRole("button", { name: /back/i }).click();
    await page.getByText("Halloween Storm: The Second Blow").click();

    // I see the details about this X10 event
    await expect(page.getByText("X10")).toBeVisible();
  });

  test("I want to learn about the most powerful flare ever recorded", async ({
    page,
  }) => {
    await page.goto("/");

    // I look for the X28 event
    const x28Event = page.getByText(
      "The X28 — Most Powerful Flare Ever Recorded",
    );
    await expect(x28Event).toBeVisible();

    // I click on it
    await x28Event.click();

    // I see the viewer with details about this unprecedented event
    await expect(page.getByText("X28+")).toBeVisible();

    // I can see the time controls and interact with the timelapse
    await expect(page.getByRole("slider")).toBeVisible();
  });
});
