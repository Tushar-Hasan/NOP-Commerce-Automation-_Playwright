import { Page } from "@playwright/test";
import { locator_Login } from "../locators/locator_Login";   // Import your locator_Login class
import { utils } from "../utils/utils";
import { loc_forgetPassword } from "../locators/loc_forgetPassword";

export class LoginPage {
  private locatorForgetPassword: loc_forgetPassword;
  private utils_: utils;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.locatorForgetPassword = new loc_forgetPassword(page);
    this.utils_ = new utils(page);
  }
}
