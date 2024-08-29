import { utils } from "../utils/utils";
import { homePage } from "../pages/homePage";
import * as data from "../data/test/loginCred.json";
import { LoginPage } from "../pages/loginPopWindow";
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let utils_: utils;
let homePage_: homePage;
let login: LoginPage;
const forgetPasswordLink = "https://test470.nop-station.com/passwordrecovery";

test.describe("Common SearchBar  Test", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    utils_ = new utils(page);
    await page.goto(baseURL + "");
    login = new LoginPage(page);
    homePage_ = new homePage(page);
    homePage_.clickOnLogin();
  });
  test("Checking login functionality with valid credentials", async ({
    page,
  }) => {
    await login.inputEmail(data.userName);
    await login.inputPassword(data.password);
    await login.clickOnLogin();
    //await page.waitForTimeout(1000);
    expect(await login.isLoggedIn()).toBeTruthy();
  });
  test("Checking login functionality with invalid credentials", async ({
    page,
  }) => {
    await login.inputEmail(faker.internet.email());
    await login.inputPassword(faker.internet.password());
    await login.clickOnLogin();
    expect(await login.isLoggedIn()).toBeFalsy();
  });
  test("Checking login functionality with invalid username", async ({
    page,
  }) => {
    await login.inputEmail(faker.internet.email());
    await login.inputPassword(data.password);
    await login.clickOnLogin();
    expect(await login.isLoggedIn()).toBeFalsy();
  });

  test("Checking login functionality with invalid password", async ({
    page,
  }) => {
    await login.inputEmail(data.userName);
    await login.inputPassword(faker.internet.password());
    await login.clickOnLogin();
    expect(await login.isLoggedIn()).toBeFalsy();
  });
  test("Checking login with 'Remember me?' checked ", async ({ page }) => {
    await login.inputEmail(data.userName);
    await login.inputPassword(data.password);
    await login.checkRememberMeCheckBox();
    await login.clickOnLogin();
    expect(await login.isLoggedIn()).toBeTruthy();
  });
  test("Checking login without 'Remember me?' checked ", async ({ page }) => {
    await login.inputEmail(data.userName);
    await login.inputPassword(faker.internet.password());
    await login.checkRememberMeCheckBox();
    await login.clickOnLogin();
    expect(await login.isLoggedIn()).toBeFalsy();
  });
  test("Check for Broken Link", async ({ page }) => {
    let links = await utils_.invalidLinks();
    expect(links.length).toEqual(0);
  });
  test("Check for Broken Images", async ({ page }) => {
    let images = await utils_.brokenImages();
    expect(images.length).toBe(0);
  });
  test("Check forget password functionality", async ({ page }) => {
    let actualTitle = await login.getForgetPasswordPageUrl();
    expect(forgetPasswordLink).toBe(actualTitle);
  });
  test("", async({page})=>{
    await page.goto('')
  }) 
});
