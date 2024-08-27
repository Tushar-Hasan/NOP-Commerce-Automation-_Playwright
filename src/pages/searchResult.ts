import { Page } from "@playwright/test";
import { loc_searchResult } from "../locators/loc_searchResult";

export class SearchResult {
  locs_search: loc_searchResult;
  constructor(page: Page) {
    this.locs_search = new loc_searchResult(page);
  }
  async clickOnSearchBtn() {
    await this.locs_search.searchButton.click();
  }
  async NoResultMsgVisibilty() {
    return await this.locs_search.noSearchResultMsg.isVisible();
  }
  async clickOnAdvanceSearchBox() {
    await this.locs_search.advancedSearchCheckBox.waitFor({ state: "visible" });
    await this.locs_search.advancedSearchCheckBox.check();
  }
  async getTotalCategoryNumber() {
    if (!(await this.locs_search.advancedSearchCheckBox.isVisible())) {
      await this.locs_search.advancedSearchCheckBox.check();
    }
    return await this.locs_search.category.count();
  }
  async getTotalmanufacturerNumber() {
    if (!(await this.locs_search.advancedSearchCheckBox.isVisible())) {
      await this.locs_search.advancedSearchCheckBox.check();
    }
    return await this.locs_search.manufacturer.count();
  }
  async getCategoryNames() {
    let categorySection = this.locs_search.category;
    let categories: string[] = [];
    let numberOfCategories = await categorySection.count();
    for (let i = 0; i < numberOfCategories; i++) {
      const textContent = await this.locs_search.category.nth(i).textContent();
      categories.push(textContent?.trim() || "");
    }
    return categories;
  }
  async getmanufacturerNames() {
    let manufacurerSection = this.locs_search.manufacturer;
    let manufacturers: string[] = [];
    let numberOfmanufacturers = await manufacurerSection.count();
    for (let i = 0; i < numberOfmanufacturers; i++) {
      const textContent = await this.locs_search.manufacturer
        .nth(i)
        .textContent();
      manufacturers.push(textContent?.trim() || "");
    }
    return manufacturers;
  }
  async isCategoryVisible() {
    return await this.locs_search.category.isVisible();
  }
  async isManufacturerVisible() {
    return await this.locs_search.manufacturer.isVisible();
  }

  async checkSearchInProductDescrp() {
    await this.locs_search.searchInProductDescp.check();
  }
  async checkAutoSearchSubCategory() {
    await this.locs_search.autoSearchSubCategory.check();
  }
  async doSearch(keyword: string) {
    await this.locs_search.pageSearchOption.clear();
    await this.locs_search.pageSearchOption.fill(keyword);
    await this.locs_search.searchButton.click();
  }
  async getSearchResutItems() {
    let items: string[] = [];
    let numberOfItems = await this.locs_search.searchResultItems.count();
    for (let i = 0; i < numberOfItems; i++) {
      let itemName = await this.locs_search.searchResultItems
        .nth(i)
        .textContent();
      items.push(itemName?.trim() || "");
    }
    return items;
  }
}
