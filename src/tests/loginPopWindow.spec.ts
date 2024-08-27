import { test, Page } from "@playwright/test";
import * as data from "../data/test/loginCred.json";
import { loginPopUp } from "../pages/loginPopWindow";

test("Checking login functionality with valid credentials", async ({
  page,
}) => {
  let login = new loginPopUp(page);
  //console.log(data.userName)
  await login.inputEmail(data.userName);
 // await login.inputPassword(data.password);
});
