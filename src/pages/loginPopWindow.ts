import { Page } from "@playwright/test";
import { locator_Login } from "../locators/locator_Login";

export class loginPopUp {
  page: Page;
  locatorLogin: locator_Login;

  constructor(page: Page) {
    this.locatorLogin = new locator_Login(page);
  }
  async inputEmail(email: string) {
    this.locatorLogin.login_emailInput.fill(email);
  }
  async inputPassword(password: string) {
    this.locatorLogin.login_passwordInput.fill(password);
  }
  async clickOnLogin() {
    this.locatorLogin.loginButton.click();
  }
  async checkRememberMeCheckBox() {
    this.locatorLogin.login_RememberMeCheckBox.check();
  }
}
