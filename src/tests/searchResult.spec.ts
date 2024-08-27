import { expect, test } from "@playwright/test";
import { SearchResult } from "../pages/searchResult";
import { utils } from "../utils/utils";
import { searchBar } from "../pages/searchBar";

let searchResut: SearchResult;
let searchBar_: searchBar;
let invalidSearchKeyword = "xyz";
let validSearchKeyword = "book";
let numberOfCategories = 17;
let numberOfmanufacturers = 5;

test.describe("Search Result page", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL + "");
    searchBar_ = new searchBar(page);
    searchResut = new SearchResult(page);
    await searchBar_.doSearch(invalidSearchKeyword);
    await page.waitForTimeout(3000);
  });
  test("Checking total number of categories", async ({ page }) => {
    let totalCategories = await searchResut.getTotalCategoryNumber();
    console.log(totalCategories);
    expect(totalCategories).toBe(numberOfCategories);
  });
  test("Checking all categories names", async ({}) => {
    let actualArray = (await searchResut.getCategoryNames()).sort();
    let expectedArray = [
      "All",
      "Apparel",
      "Apparel >> Accessories",
      "Apparel >> Clothing",
      "Apparel >> Shoes",
      "Books",
      "Computers",
      "Computers >> Desktops",
      "Computers >> Notebooks",
      "Computers >> Software",
      "Digital downloads",
      "Electronics",
      "Electronics >> Camera & photo",
      "Electronics >> Cell phones",
      "Electronics >> Others",
      "Gift Cards",
      "Jewelry",
    ].sort();
    console.log(actualArray);
    expect(actualArray).toEqual(expectedArray);
  });
  test("Checking if advanced search reveals other options", async ({
    page,
  }) => {
    await searchResut.clickOnAdvanceSearchBox();
    expect.soft(await searchResut.isCategoryVisible).toBeTruthy();
    expect(await searchResut.isManufacturerVisible()).toBeTruthy();
  });
  test("Checking total number of manufacturer", async ({ page }) => {
    let totalmanufacturers = await searchResut.getTotalmanufacturerNumber();
    expect(totalmanufacturers).toBe(numberOfmanufacturers);
  });
  test("Checking all manufacturer names", async ({ page }) => {
    let actualArray = (await searchResut.getmanufacturerNames()).sort();
    let expectedArray = ["All", "Nike", "Apple", "HP", "Pran"].sort();
    //console.log(actualArray)
    expect(actualArray).toEqual(expectedArray);
  });
  test("Checking the search items", async () => {
    await searchResut.doSearch(validSearchKeyword);
    let items = await searchResut.getSearchResutItems();
    //console.log(items);
    // for (let item of items) {
    //   expect.soft(item).toContain(validSearchKeyword);
    // }
  });
});
