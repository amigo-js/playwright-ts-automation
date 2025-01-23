import { BasePage } from "./base.page";
import { HOME_SELECTORS } from "../selectors/home.selectors";

export class HomePage extends BasePage {
  async clickShop(market: string) {
    let shopButtonLocator;

    if (market === "PL") {
      shopButtonLocator = HOME_SELECTORS.shopButtonPL;
    } else if (market === "UK") {
      shopButtonLocator = HOME_SELECTORS.shopButtonUK;
    } else {
      throw new Error(`Market ${market} not supported`);
    }

    const shopButton = this.page.locator(shopButtonLocator);
    if (await shopButton.isVisible()) {
      await shopButton.click();
      await this.page.mouse.move(0, 0);
    } else {
      throw new Error(`Shop button not visible for market ${market}`);
    }
  }
}
