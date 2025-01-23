import { BasePage } from "./base.page";
import { CONSENT_SELECTORS } from "../selectors/consent.selectors";

export class ConsentPage extends BasePage {
  async handleConsents() {
    await this.page.waitForLoadState("domcontentloaded");

    if (await this.page.isVisible(CONSENT_SELECTORS.acceptCookiesButton)) {
      await this.page.click(CONSENT_SELECTORS.acceptCookiesButton, {
        force: true,
      });
    }

    if (await this.page.isVisible(CONSENT_SELECTORS.ageConfirmationButton)) {
      await this.page.evaluate((selector) => {
        const element = document.querySelector(selector) as HTMLElement;
        element?.click();
      }, CONSENT_SELECTORS.ageConfirmationButton);
    }

    await this.page.waitForSelector(CONSENT_SELECTORS.ageConfirmationButton, {
      state: "hidden",
      timeout: 5000,
    });
    await this.page.waitForSelector(CONSENT_SELECTORS.acceptCookiesButton, {
      state: "hidden",
      timeout: 5000,
    });
  }
}
