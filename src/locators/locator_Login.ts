import { Page, Locator } from "@playwright/test";

export class locator_Login {
  readonly logOutBtn: Locator;
  readonly loginButton: Locator;
  readonly login_PopWindow: Locator;
  readonly login_emailInput: Locator;
  readonly login_passwordInput: Locator;
  readonly login_RememberMeCheckBox: Locator;

  constructor(page: Page) {
    this.login_emailInput = page.getByLabel("Email:");
    this.loginButton = page.locator("//button[normalize-space()='Log in']");
    this.login_RememberMeCheckBox = page.locator("//input[@id='RememberMe']");
    this.login_PopWindow = page.locator("//button[normalize-space()='Log in']");
    this.login_passwordInput = page.getByLabel("Password:");
    this.logOutBtn = page.locator("//a[@class='ico-logout']");
  }
}
