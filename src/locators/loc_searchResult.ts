import { Page, Locator } from "@playwright/test";

export class loc_searchResult {
  readonly searchField: Locator;
  readonly searchButton: Locator;
  readonly advancedSearchCheckBox: Locator;
  readonly noSearchResultMsg: Locator;
  readonly category: Locator;
  readonly manufacturerList: Locator;
  readonly manufacturer: Locator;
  readonly autoSearchSubCategory: Locator;
  readonly searchInProductDescp: Locator;
  readonly searchResultItems: Locator;
  readonly pageSearchOption: Locator;

  constructor(page: Page) {
    this.searchField = page.locator("//input[@id='q']");
    this.searchButton = page.locator(
      "//button[@class='button-1 search-button']"
    );
    this.advancedSearchCheckBox = page.getByLabel("Advanced search");
    this.noSearchResultMsg = page.locator("//div[@class='no-result']");
    this.category = page.locator("//select[@id='cid']/option");
    this.manufacturerList = page.locator("//select[@id='mid']/option");
    this.manufacturerList = page.locator("//select[@id='mid']");
    this.autoSearchSubCategory = page.getByLabel("Automatically search sub");
    this.searchInProductDescp = page
      .locator("#advanced-search-block div")
      .filter({ hasText: "Search In product descriptions" });
    this.searchResultItems = page.locator(
      "//div[@class='item-grid']//div[@class='item-box']//div[@class='details']//a"
    );
    this.pageSearchOption = page.locator("//input[@id='q']");
  }
}
