// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sputify/);
});

test("renders all tracks", async ({ page }) => {
  await page.route("*/**/songs", async (route) => {
    const json = [
      {
        id: 1,
        title: "Come Together",
        artist: "The Beatles",
      },
      {
        id: 2,
        title: "Something",
        artist: "The Beatles",
      },
    ];
    await route.fulfill({ json });
  });

  await page.goto("http://localhost:3000/");

  await expect(page.getByText("Come Together")).toBeVisible();
  await expect(page.getByText("Something")).toBeVisible();
});
