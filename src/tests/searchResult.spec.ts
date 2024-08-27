import { expect, test } from "@playwright/test";
import { SearchResult } from "../pages/searchResult";
import { searchBar } from "../pages/searchBar";

let searchResut: SearchResult;
let searchBar_: searchBar;
let invalidSearchKeyword = "xyz";
let validSearchKeyword = "book";
let numberOfCategories = 17;
let numberOfmanufacturers = 5;
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
];

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
    expect(totalCategories).toBe(numberOfCategories);
  });
  test("Checking all categories names", async ({}) => {
    let actualArray = (await searchResut.getCategoryNames()).sort();
    expect(actualArray).toEqual(expectedArray.sort());
  });
  test("Checking if advanced search reveals other options", async ({
    page,
  }) => {
    await searchResut.clickOnAdvanceSearchBox();
    expect.soft(searchResut.isCategoryVisible).toBeTruthy();
    expect(await searchResut.isManufacturerVisible()).toBeTruthy();
  });
  test("Checking total number of manufacturer", async ({ page }) => {
    let totalmanufacturers = await searchResut.getTotalmanufacturerNumber();
    expect(totalmanufacturers).toBe(numberOfmanufacturers);
  });
  test("Checking all manufacturer names", async ({ page }) => {
    let actualArray = (await searchResut.getmanufacturerNames()).sort();
    let expectedArray = ["All", "Nike", "Apple", "HP", "Pran"].sort();
    expect(actualArray).toEqual(expectedArray);
  });
  test("Checking the search items", async () => {
    await searchResut.doSearch(validSearchKeyword);
    let items = await searchResut.getSearchResutItems();
    for (let item of items) {
      expect
        .soft(item.toLowerCase())
        .toContain(validSearchKeyword.toLowerCase());
    }
  });
});
