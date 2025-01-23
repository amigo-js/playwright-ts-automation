import { BasePage } from "./base.page";
import { SHOP_SELECTORS } from "../selectors/shop.selectors";

export class ShopPage extends BasePage {
  async openProductBySku(sku: string) {
    await this.page.click(SHOP_SELECTORS.productBySku(sku));
  }
}
