import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ShopPage } from "../pages/shop.page";
import { loadTestData } from "../utils/test-data";
import { ConsentPage } from "../pages/consent.page";

test.describe("Check broken links and images", () => {
  let homePage: HomePage;
  let shopPage: ShopPage;
  let testData: any;
  let market: string;
  let consentPage: ConsentPage;

  test.beforeEach(async ({ page }, testInfo) => {
    homePage = new HomePage(page);
    shopPage = new ShopPage(page);
    consentPage = new ConsentPage(page);

    market = testInfo.project.name.split(" ")[2];
    if (!market) {
      throw new Error("Market not defined in the project name");
    }

    testData = loadTestData(market);

    await page.goto("/");

    await consentPage.handleConsents();
  });

  test("Validate all links and images", async ({ page, baseURL }) => {
    await homePage.clickShop(market);
    await shopPage.openProductBySku(testData.sku);

    const links = await page.$$("a");
    for (const link of links) {
      const href = await link.getAttribute("href");

      if (!href) {
        throw new Error("Invalid link: Empty href attribute");
      }

      try {
        if (href.startsWith("http://") || href.startsWith("https://")) {
          const response = await page.request.get(href);
          expect(response.status()).toBeLessThan(400);
        } else if (href.startsWith("tel:") || href.startsWith("mailto:")) {
          console.log(`Skipped unsupported protocol: ${href}`);
        } else {
          const resolvedUrl = new URL(href, baseURL).toString();
          const response = await page.request.get(resolvedUrl);
          expect(response.status()).toBeLessThan(400);
        }
      } catch (error) {
        console.error(`Broken link: ${href}`, error);
        throw error;
      }
    }

    const images = await page.$$("img");
    for (const img of images) {
      const src = await img.getAttribute("src");

      if (!src) {
        throw new Error("Invalid image: Empty src attribute");
      }

      try {
        if (src.startsWith("http://") || src.startsWith("https://")) {
          const response = await page.request.get(src);
          expect(response.status()).toBeLessThan(400);
        } else {
          const resolvedUrl = new URL(src, baseURL).toString();
          const response = await page.request.get(resolvedUrl);
          expect(response.status()).toBeLessThan(400);
        }
      } catch (error) {
        console.error(`Broken image: ${src}`, error);
        throw error;
      }
    }
  });
});
