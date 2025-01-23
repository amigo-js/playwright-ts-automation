import { Page } from "@playwright/test";

declare global {
  namespace PlaywrightTest {
    interface Page {
      testData: any;
    }
  }
}
