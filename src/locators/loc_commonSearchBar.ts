import { Page, Locator } from "@playwright/test";

export class loc_SearchBar {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly acceptNotification: Locator;
  readonly notificationWindow: Locator;
  readonly declineNotification: Locator;
  readonly searchBarInputField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBarInputField = page.locator("#small-searchterms");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.notificationWindow = page.locator(
      "//div[@id='allow-push-notification-bar']"
    );
    this.acceptNotification = page.locator(
      "//button[@id='allow-push-notification']"
    );
    this.declineNotification = page.locator(
      "//button[@id='close-push-notification']"
    );
  }
}
