import { BasePage } from "./base.page";
import { CART_SELECTORS } from "../selectors/cart.selectors";

export class CartPage extends BasePage {
  async addToCart() {
    await this.page.click(CART_SELECTORS.addToCartButton);
  }

  async getCartCount(): Promise<number> {
    const textContent = await this.page.textContent(CART_SELECTORS.cartCount);
    return parseInt(textContent || "0", 10);
  }

  async removeProduct() {
    await this.page.click(CART_SELECTORS.removeProductButton);
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const productLocator = this.page.locator(CART_SELECTORS.miniCartList);
    const productTexts = await productLocator.allInnerTexts();
    return productTexts.some((text) => text.includes(productName));
  }

  async getBasketProductCount(): Promise<number> {
    const textContent = await this.page.textContent(
      CART_SELECTORS.emptyBasketCount
    );
    const count = textContent?.match(/\d+/)?.[0];
    return count ? parseInt(count, 10) : 0;
  }
}
