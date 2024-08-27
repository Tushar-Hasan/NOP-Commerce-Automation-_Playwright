import { Page } from "@playwright/test";
import { locator_Login } from "../locators/locator_Login"; // Import your locator_Login class
import { utils } from "../utils/utils";

export class LoginPage {
  private page: Page;
  private locatorLogin: locator_Login;
  private utils_: utils;

  constructor(page: Page) {
    this.page = page;
    this.locatorLogin = new locator_Login(page);
    this.utils_ = new utils(page);
  }

  async inputEmail(email: string) {
    let emailInput = this.locatorLogin.login_emailInput;
    await emailInput.waitFor({ state: "visible" });
    await emailInput.fill(email);
  }

  async inputPassword(password: string) {
    // await this.page.waitForSelector(
    //   this.locatorLogin.login_passwordInput.selector
    // ); // Wait for password input to be visible
    await this.locatorLogin.login_passwordInput.fill(password);
  }

  async clickOnLogin() {
    // await this.page.waitForSelector(this.locatorLogin.loginButton.selector); // Wait for login button to be visible
    await this.locatorLogin.loginButton.click();
  }

  async checkRememberMeCheckBox() {
    // await this.page.waitForSelector(
    //   this.locatorLogin.login_RememberMeCheckBox.); // Wait for checkbox to be visible
    await this.locatorLogin.login_RememberMeCheckBox.check();
  }
  async isLoggedIn() {
    let element = await this.locatorLogin.logOutBtn;
    return this.utils_.waitForElemetToBeVisible(element);
  }
}
