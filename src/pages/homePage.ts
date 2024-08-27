import { Page } from "@playwright/test";
import { loc_homePage } from "../locators/locators_homePage";

export class homePage {
  loc_homePage: loc_homePage;

  constructor(page: Page) {
    this.loc_homePage = new loc_homePage(page);
  }
  async navigateToReg_Page() {
    await this.loc_homePage.registrationPageLink.click();
  }
  async getHeaderMenuCategories() {
    let menus = await this.loc_homePage.header_menu;
    const headerMenus: string[] = [];
    let numberOfMenus = await menus.count();
    for (let i = 0; i < numberOfMenus; i++) {
      const textContent = await this.loc_homePage.header_menu
        .nth(i)
        .textContent();
      headerMenus.push(textContent?.trim() || "");
    }
    return headerMenus;
  }
  async doVote(vote: string) {
    switch (vote) {
      case "Excellent": {
        await this.loc_homePage.comPollVote_Excellent.check();
        break;
      }
      case "Good": {
        await this.loc_homePage.comPollVote_Good.check();
        break;
      }
      case "Poor": {
        await this.loc_homePage.comPollVote_Poor.check();
        break;
      }
      case "Very bad": {
        await this.loc_homePage.comPollVote_Very_Bad.check();
        break;
      }
    }
    await this.loc_homePage.btn_Vote.click();
  }
  async getVoteErrorMessage() {
    await this.loc_homePage.voteMessage.waitFor({ state: "visible" });
    let message = await this.loc_homePage.voteMessage.textContent();
    return message;
  }
  async isVoteErrorMessageVisible() {
    let flag = await this.loc_homePage.voteMessage.isVisible();
    return flag;
  }
  async subscribeWithValidEmail(email: string) {
    await this.loc_homePage.newsLetterEmailInput.fill(email);
    await this.loc_homePage.btn_subscribe.click();
    await this.loc_homePage.newsLetterSubscribeMessage.waitFor({
      state: "visible",
    });
    let message = this.loc_homePage.newsLetterSubscribeMessage.textContent();
    return message;
  }
  async clickOnLogin() {
    await this.loc_homePage.login.click();
  }
  
}
