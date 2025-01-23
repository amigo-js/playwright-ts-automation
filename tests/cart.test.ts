import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { ConsentPage } from "../pages/consent.page";
import { loadTestData } from "../utils/test-data";

test.describe("Cart Tests", () => {
  let homePage: HomePage;
  let shopPage: ShopPage;
  let cartPage: CartPage;
  let consentPage: ConsentPage;
  let market: string;
  let testData: any;

  test.beforeEach(async ({ page }, testInfo) => {
    consentPage = new ConsentPage(page);
    homePage = new HomePage(page);
    shopPage = new ShopPage(page);
    cartPage = new CartPage(page);

    market = testInfo.project.name.split(" ")[2];
    if (!market) {
      throw new Error("Market not defined in the project name");
    }

    testData = loadTestData(market);

    await page.goto("/");

    await consentPage.handleConsents();
  });

  test("Add product to cart", async ({ page }) => {
    await homePage.clickShop(market);
    await shopPage.openProductBySku(testData.sku);
    await cartPage.addToCart();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    expect(await cartPage.getCartCount()).toBe(1);
    expect(await cartPage.isProductInCart(testData.productName)).toBeTruthy();
  });

  test("Remove product from cart", async ({ page }) => {
    await homePage.clickShop(market);
    await shopPage.openProductBySku(testData.sku);
    await cartPage.addToCart();
    await cartPage.removeProduct();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    expect(
      await cartPage.isProductInCart("Ploom X Advanced Rose Shimmer")
    ).toBeFalsy();
    const basketProductCount = await cartPage.getBasketProductCount();
    expect(basketProductCount).toBe(0);
  });
});
