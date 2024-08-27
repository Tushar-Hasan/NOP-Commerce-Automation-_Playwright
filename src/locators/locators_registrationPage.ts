import { Page, Locator } from "@playwright/test";

export class locs_registrationPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastname: Locator;
  readonly birthday: Locator;
  readonly birthYear: Locator;
  readonly Male_gender: Locator;
  readonly female_gender: Locator;
  readonly birthMonth: Locator;
  readonly email: Locator;
  readonly companyName: Locator;
  readonly newsLetterSubs: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly btn_register: Locator;

  //***********************    Message  *******************************/

  readonly fnameErroMessage: Locator;
  readonly emilErrorMessage: Locator;
  readonly lnameErrorMessage: Locator;
  readonly confirmationMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly existingEmailErrMessage: Locator;
  readonly passwordConfirmationErrMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Male_gender = page.locator("//input[@id='gender-male']");
    this.female_gender = page.locator("//input[@id='gender-female']");
    this.firstName = page.locator("//input[@id='FirstName']");
    this.lastname = page.locator("//input[@id='LastName']");
    this.birthday = page.locator("//select[@name='DateOfBirthDay']");
    this.birthMonth = page.locator("//select[@name='DateOfBirthMonth']");
    this.birthYear = page.locator("//select[@name='DateOfBirthYear']");
    this.email = page.locator("//div[@class='fieldset']//input[@id='Email']");
    this.companyName = page.locator("//input[@id='Company']");
    this.newsLetterSubs = page.locator("//input[@id='Newsletter']");
    this.password = page.locator(
      "//div[@class='fieldset']//input[@id='Password']"
    );
    this.confirmPassword = page.locator("//input[@id='ConfirmPassword']");
    this.btn_register = page.locator("//button[@id='register-button']");
    this.confirmationMessage = page.locator("//div[@class='result']");
    this.existingEmailErrMessage = page.locator(
      "//div[@class='page-body']//div[@class='message-error validation-summary-errors']/ul/li"
    );
    this.passwordConfirmationErrMessage = page.locator(
      "//span[@id='ConfirmPassword-error']"
    );
  }
}
