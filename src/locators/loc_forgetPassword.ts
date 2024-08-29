import { Page, Locator } from "@playwright/test";

export class loc_forgetPassword {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly recoveryButton: Locator;
  readonly recoveryPromtMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(
      "//div[@class='fieldset']//input[@id='Email']"
    );
    this.recoveryPromtMessage = page.locator("//p[@class='tooltip']");
    this.recoveryButton = page.locator("//button[@name='send-email']");
  }
}
