import { Page, Locator, Dialog } from "@playwright/test";
const axios = require("axios");

export class utils {
  readonly links: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async invalidLinks() {
    type brokenLinks = [string, number];
    let links_: brokenLinks[] = [];
    // Click the get started link.
    let links = await this.page.$$("//a");

    for (let link of links) {
      const href = await link.getAttribute("href");
      if (href && (href.startsWith("https://") || href.includes("www"))) {
        const response = await axios.get(href, { validateStatus: false });
        if (199 > response.status && response.status < 300) {
          links_.push([href, response.status]);
        }
      }
    }
    return links_;
  }
  async brokenImages() {
    type brokenImage = [string, string];
    const brokenImages: brokenImage[] = [];

    let images = await this.page.$$("//img");
    for (let image of images) {
      const srcUrl = await image.getAttribute("src");
      const imgAlt = await image.getAttribute("alt");

      if (srcUrl) {
        try {
          const response = await axios.get(srcUrl, { responseType: "blob" });
          if (response.status !== 200) {
            brokenImages.push([imgAlt || "No Alt Text", srcUrl]);
          }
        } catch (error) {
          // If there's an error, the image is likely broken
          brokenImages.push([imgAlt || "No Alt Text", srcUrl]);
        }
      } else {
        // If srcUrl is null or undefined, log it as broken
        brokenImages.push([imgAlt || "No Alt Text", "No URL"]);
      }
    }
    return brokenImages;
  }

  async acceptDialog() {
    let message: string = "";

    this.page.on("dialog", async (dialog) => {
      message = dialog.message();
      console.log("Dialog Message: ", message);
      await dialog.accept();
      console.log("Dialog accepted.01:", message);
      return message;
    });
    return message;
  }

  async declineDialog() {
    this.page.on("dialog", async (dialog) => {
      let message = dialog.message();
      await dialog.accept();
      return message;
    });
  }

  async handleDialog(): Promise<string> {
    let dialogMessage: string = "";

    this.page.on("dialog", async (dialog: Dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept(); // You can also use dialog.accept() based on your scenario
    });

    return dialogMessage;
  }
  async waitForElemetToBeVisible(element: Locator) {
    try {
      await element.waitFor({ state: "visible" });
      return true;
    } catch {
      return false;
    }
  }
}
