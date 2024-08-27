import { test, expect } from "@playwright/test";
import { utils } from "../utils/utils";
import { homePage } from "../pages/homePage";
let homePage_;
let utils_;

test.describe("HomePageTest", () => {
  test.beforeEach("Go to HomePage", async ({ page, baseURL }) => {
    //await page.waitForTimeout(7000);
    await page.goto(baseURL + "");
    homePage_ = new homePage(page);
    utils_ = new utils(page);
  });
  test("Title Check", async ({ page }) => {
    await expect(page).toHaveTitle("Your store. Home page title");
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
  test("Checking headmer menu items", async ({ page }) => {
    let menus = await homePage_.getHeaderMenuCategories();
    expect.soft(menus.length).toBe(7);
    expect.soft(menus).toContain("Computers");
    expect.soft(menus).toContain("Electronics");
    expect.soft(menus).toContain("Digital downloads");
    expect.soft(menus).toContain("Books");
    expect.soft(menus).toContain("Jewelry");
    expect.soft(menus).toContain("Gift Cards");
    expect.soft(menus).toContain("Apparel");
  });
  test("Community poll voting with on registered user", async ({ page }) => {
    homePage_.doVote("Good");
    page.waitForTimeout(500);
    let errorMsg = await homePage_.getVoteErrorMessage();
    expect.soft(errorMsg).toBe("Only registered users can vote.");
    expect.soft(await homePage_.isVoteErrorMessageVisible()).toBeTruthy();
  });
  test("NewsLetter Subscribing with valid email", async ({}) => {
    let message = await homePage_.subscribeWithValidEmail("t@t.com");
    expect(message).toBe(
      "Thank you for signing up! A verification email has been sent. We appreciate your interest."
    );
  });
  test("NewsLetter Subscribing with invalid email", async ({ page }) => {
    let message = await homePage_.subscribeWithValidEmail("t@tcom");
    expect(message).toBe("Enter valid email");
  });
  test("NewsLetter Subscribing with blank input", async ({ page }) => {
    let message = await homePage_.subscribeWithValidEmail("t@tcom");
    expect(message).toBe("Enter valid email");
  });
});
