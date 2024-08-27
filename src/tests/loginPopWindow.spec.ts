import { utils } from "../utils/utils";
import { homePage } from "../pages/homePage";
import * as data from "../data/test/loginCred.json";
import { LoginPage } from "../pages/loginPopWindow";
import { test, expect } from "@playwright/test";
import { faker, Faker } from "@faker-js/faker";

let utils_: utils;
let homePage_: homePage;

test.describe("Common SearchBar  Test", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    utils_ = new utils(page);
    await page.goto(baseURL + "");
    homePage_ = new homePage(page);
    homePage_.clickOnLogin();
  });
  test("Checking login functionality with valid credentials", async ({
    page,
  }) => {
    let login = new LoginPage(page);
    await login.inputEmail(data.userName);
    await login.inputPassword(data.password);
    await login.clickOnLogin();
    //await page.waitForTimeout(1000);
    expect(await login.isLoggedIn()).toBeTruthy();
  });
  test("Checking login functionality with invalid credentials", async ({
    page,
  }) => {
    let login = new LoginPage(page);
    await login.inputEmail(faker.internet.email());
    await login.inputPassword(faker.internet.password());
    await login.clickOnLogin();
    //await page.waitForTimeout(3000);
    expect(await login.isLoggedIn()).toBeFalsy();
  });
});
