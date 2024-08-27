import { Page, Locator } from "@playwright/test";

export class loc_homePage {

  readonly page: Page;
  readonly registrationPageLink: Locator;
  readonly header_menu: Locator;
  readonly comPollVote_Excellent: Locator;
  readonly comPollVote_Good: Locator;
  readonly comPollVote_Poor: Locator;
  readonly comPollVote_Very_Bad: Locator;
  readonly btn_Vote: Locator;
  readonly voteMessage: Locator;
  readonly newsLetterEmailInput: Locator;
  readonly btn_subscribe: Locator;
  readonly newsLetterSubscribeMessage: Locator;
  readonly login: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btn_Vote = page.locator("#vote-poll-1");
    this.login = page.locator("//a[@class='ico-login']");
    this.comPollVote_Good = page.locator("#pollanswers-2");
    this.comPollVote_Poor = page.locator("#pollanswers-3");
    this.comPollVote_Very_Bad = page.locator("#pollanswers-4");
    this.voteMessage = page.locator("#block-poll-vote-error-1");
    this.comPollVote_Excellent = page.locator("#pollanswers-1");
    this.newsLetterEmailInput = page.locator("#newsletter-email");
    this.btn_subscribe = page.locator("#newsletter-subscribe-button");
    this.registrationPageLink = page.locator("//a[@class='ico-register']");
    this.header_menu = page.locator("//ul[@class='top-menu notmobile']/li/a");
    this.newsLetterSubscribeMessage = page.locator("#newsletter-result-block");
  }
}
