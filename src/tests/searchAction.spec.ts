import { expect, test } from "@playwright/test";
import { searchBar } from "../pages/searchBar";
import { utils } from "../utils/utils";

let utils_: utils;
let search: searchBar;

let searchPageUrl;
let blankSearchKeyword = "";
let spaceSearchKeyword = "   ";
let invalidSearchKeyword = "zxcv";
let validSearchKeyword = "Samsung";

test.describe("Ragistration Page", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    utils_ = new utils(page);
    await page.goto(baseURL + "");
    search = new searchBar(page);
    searchPageUrl = "https://test470.nop-station.com/search?q=";
  });
  test("Saerch with valid Input ", async ({ page, baseURL }) => {
    await search.waitForNotificationWindow();
    await search.declineNotification();
    await search.doSearch(validSearchKeyword);
    console.log(await page.title());
    expect(page.url()).toBe(baseURL + "search?q=" + validSearchKeyword);
  });

  test("Saerch with invalid Input ", async ({ page, baseURL }) => {
    await search.waitForNotificationWindow();
    await search.declineNotification();
    await search.doSearch(invalidSearchKeyword);
    console.log(await page.title());
    expect(page.url()).toBe(baseURL + "search?q=" + invalidSearchKeyword);
  });

  test("search with blank keyword", async ({ page, baseURL }) => {
    await search.waitForNotificationWindow();
    await search.declineNotification();
    let dialogMessage; // = await utils_.acceptDialog();
    page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await search.doSearch(blankSearchKeyword);
    console.log(await page.title());
    expect.soft(page.url()).toBe(baseURL);
    expect.soft(dialogMessage).toBe("Please enter some search keyword");
  });

  test("seach with only spaces", async ({ page, baseURL }) => {
    await search.waitForNotificationWindow();
    await search.declineNotification();
    await search.doSearch(spaceSearchKeyword);
    console.log(await page.title());
    expect.soft(page.url()).not.toBe(baseURL);
  });
});
