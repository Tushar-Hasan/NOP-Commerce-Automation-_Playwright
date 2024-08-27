import { loc_SearchBar } from "../locators/loc_commonSearchBar";
import { Page } from "@playwright/test";

export class searchBar {
  locSearchBar: loc_SearchBar;
  constructor(page: Page) {
    this.locSearchBar = new loc_SearchBar(page);
  }
  async doSearch(input: string) {
    if (await this.locSearchBar.notificationWindow.isVisible()) {
      await this.declineNotification();
    }
    await this.locSearchBar.searchBarInputField.fill(input);
    await this.locSearchBar.searchButton.click();
  }
  async acceptNotification() {
    await this.locSearchBar.acceptNotification.click();
  }
  async declineNotification() {
    await this.locSearchBar.declineNotification.click();
  }
  async waitForNotificationWindow() {
    await this.locSearchBar.notificationWindow.waitFor({ state: "visible" });
  }
  
}
