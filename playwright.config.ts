import { defineConfig, devices } from "@playwright/test";

const MARKETS = ["UK", "PL"];

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 1,
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: MARKETS.map((market) => ({
    name: `Tests for ${market}`,
    use: {
      baseURL: getBaseUrlForMarket(market),
    },
  })),
  reporter: [["list"], ["allure-playwright"]],
});

function getBaseUrlForMarket(market: string): string {
  switch (market) {
    case "UK":
      return "https://www.ploom.co.uk/en";
    case "PL":
      return "https://www.ploom.pl/pl";
    default:
      throw new Error(`Unknown market: ${market}`);
  }
}
