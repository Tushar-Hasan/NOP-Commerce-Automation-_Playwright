import { locs_registrationPage } from "../locators/locators_registrationPage";
import { Page } from "@playwright/test";
import { homePage } from "./homePage";

export class RegistrationPage {
  page: Page;
  loc_registration: locs_registrationPage;
  //inputAndConfirmPassword(password01: string, password02: string): void;
  //inputAndConfirmPassword(password: string): void;

  constructor(page: Page) {
    this.loc_registration = new locs_registrationPage(page);
  }
  async naviageToRegistrationPage() {
    await new homePage(this.page).navigateToReg_Page();
  }
  async selectMaleGender() {
    await this.loc_registration.Male_gender.check();
  }
  async selectFemaleGender() {
    await this.loc_registration.female_gender.check();
    this.page.waitForTimeout(2000);
  }
  async inputFirstname(fname: string) {
    await this.loc_registration.firstName.clear();
    await this.loc_registration.firstName.fill(fname);
  }
  async inputLastname(lname: string) {
    await this.loc_registration.lastname.clear();
    await this.loc_registration.lastname.fill(lname);
  }
  async inputEmail(email: string) {
    await this.loc_registration.email.clear();
    await this.loc_registration.email.fill(email);
  }
  async inputAndConfirmPassword(password: string) {
    await this.inputPassword(password);
    await this.confirmInputPassword(password);
  }
  async clickOnRegistrationButton() {
    await this.loc_registration.btn_register.click();
  }
  async getRegisrationResultText() {
    let message = await this.loc_registration.confirmationMessage.textContent();
    return message;
  }
  async checkNewsLetter() {
    await this.loc_registration.newsLetterSubs.check();
  }
  async uncheckNewsLetter() {
    await this.loc_registration.newsLetterSubs.uncheck();
  }
  async lnameErrMsgVisibility() {
    return this.loc_registration.lnameErrorMessage.isVisible();
  }
  async emailErrMsgVisibility() {
    return this.loc_registration.emilErrorMessage.isVisible();
  }
  async passwordErrMsgVisibility() {
    return this.loc_registration.passwordErrorMessage.isVisible();
  }
  async fnameErrMsgVisibility() {
    return this.loc_registration.fnameErroMessage.isVisible();
  }
  async getExistingEmailErrorMessage() {
    return this.loc_registration.existingEmailErrMessage.textContent();
  }
  async inputPassword(password: string) {
    await this.loc_registration.password.clear();
    await this.loc_registration.password.fill(password);
  }
  async confirmInputPassword(password: string) {
    await this.loc_registration.confirmPassword.clear();
    await this.loc_registration.confirmPassword.fill(password);
  }
  async inputBirthDay(day: string) {
    await this.loc_registration.birthday.selectOption(day);
  }
  async inputBirthMonth(month: string) {
    await this.loc_registration.birthday.selectOption(month);
  }
  async inputBirthYear(year: string) {
    await this.loc_registration.birthday.selectOption(year);
  }
  async inputCompanyName(company: string) {
    await this.loc_registration.companyName.clear();
    await this.loc_registration.companyName.fill(company);
  }
  async getPasswordConfirmationErrMsg() {
    return await this.loc_registration.passwordConfirmationErrMessage.textContent();
  }
}
