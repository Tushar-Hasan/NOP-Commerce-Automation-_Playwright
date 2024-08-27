import { Page, Locator } from "@playwright/test";

export class locator_Login {
  readonly loginButton: Locator;
  readonly login_PopWindow: Locator;
  readonly login_emailInput: Locator;
  readonly login_passwordInput: Locator;
  readonly login_RememberMeCheckBox: Locator;

  constructor(page: Page) {
    this.login_emailInput = page.locator("//input[@id='Email']");
    this.loginButton = page.locator("//button[normalize-space()='Log in']");
    this.login_RememberMeCheckBox = page.locator("//input[@id='RememberMe']");
    this.login_PopWindow = page.locator("//button[normalize-space()='Log in']");
  }
}
