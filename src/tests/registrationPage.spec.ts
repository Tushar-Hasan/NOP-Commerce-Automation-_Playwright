import { expect, test } from "@playwright/test";
import { RegistrationPage } from "../pages/registrationPage";
import { homePage } from "../pages/homePage";
import { faker } from "@faker-js/faker";
import { utils } from "../utils/utils";
const fs = require("node:fs");

let regPage: RegistrationPage;
test.describe("Ragistration Page", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL + "");
    const homePage_ = new homePage(page);
    await homePage_.navigateToReg_Page();
    regPage = new RegistrationPage(page);
  });
  test("Page Title Check", async ({ page }) => {
    //await console.log(await page.title())
    await expect(page).toHaveTitle("Your store. Register");
  });
  test("Cheking Registration with only required field", async ({ page }) => {
    //await regPage.selectMaleGender();
    await regPage.inputFirstname(faker.person.firstName());
    await regPage.inputLastname(faker.person.lastName());
    await regPage.inputEmail(faker.internet.email());
    await regPage.inputAndConfirmPassword(faker.internet.password());
    await regPage.clickOnRegistrationButton();
    expect(await regPage.getRegisrationResultText()).toBe(
      "Your registration completed"
    );
  });

  test("Checking Registration with All valid  Input", async ({ page }) => {
    await regPage.inputFirstname(faker.person.firstName());
    await regPage.inputLastname(faker.person.lastName());
    await regPage.inputEmail(faker.internet.email());
    await regPage.inputCompanyName(faker.company.name());
    await regPage.inputAndConfirmPassword(faker.internet.password());
    await regPage.clickOnRegistrationButton();
    expect(await regPage.getRegisrationResultText()).toBe(
      "Your registration completed"
    );
  });

  test("Checking with blank firstName", async ({ page }) => {
    await regPage.inputFirstname(faker.person.firstName());
    await regPage.inputLastname(faker.person.lastName());
    await regPage.inputEmail(faker.internet.email());
    await regPage.inputAndConfirmPassword(faker.internet.password());
    await regPage.clickOnRegistrationButton();
    expect(page.url).not.toBe(
      "https://demo.nopcommerce.com/register?returnUrl=%2F"
    );
  });
  test("checking registration with registared email", async ({ page }) => {
    await regPage.inputFirstname(faker.person.firstName());
    await regPage.inputLastname(faker.person.lastName());
    await regPage.inputEmail("kaiser@mamun.com");
    await regPage.inputAndConfirmPassword(faker.internet.password());
    await regPage.clickOnRegistrationButton();
    await page.waitForTimeout(2000);
    expect(await regPage.getExistingEmailErrorMessage()).toBe(
      "The specified email already exists"
    );
  });
  test("Checking for broken links", async ({ page }) => {
    const util = new utils(page);
    let brokenLinks = await util.invalidLinks();
    expect(brokenLinks.length).toBe(0);
  });
  test("Checking for broken Images", async ({ page }) => {
    const util = new utils(page);
    let brokenImages = await util.invalidLinks();
    expect(brokenImages.length).toBe(0);
  });
  test("Checking successful registration naviagted to a confirmation page", async ({
    page,
  }) => {
    await regPage.inputFirstname(faker.person.firstName());
    await regPage.inputLastname(faker.person.lastName());
    await regPage.inputEmail("kaiser@mamun.com");
    await regPage.inputAndConfirmPassword(faker.internet.password());
    await regPage.clickOnRegistrationButton();
    expect(page.url).not.toBe(
      "https://demo.nopcommerce.com/register?returnUrl=%2F"
    );
  });
  test("chekcing with differenct password for password and confirm password field", async ({
    page,
  }) => {
    await regPage.inputFirstname(faker.person.firstName());
    await regPage.inputLastname(faker.person.lastName());
    await regPage.inputEmail(faker.internet.email());
    await regPage.inputCompanyName(faker.company.name());
    await regPage.inputPassword(faker.internet.password());
    await regPage.confirmInputPassword(faker.internet.password());
    await regPage.clickOnRegistrationButton();
    let expectedErrMessage =
      "The password and confirmation password do not match.";
    let actualErrMessage = await regPage.getPasswordConfirmationErrMsg();
    await page.waitForTimeout(3000)
    expect(actualErrMessage).toBe(expectedErrMessage);
  });

  // -------- end -------
});
