import { Page } from "../support/pages/1to50.page";

describe("1 to 50 test", () => {
  it("Test", () => {
    cy.visit("https://zzzscore.com/1to50/en/");
    let number = 99;
    while (number > 49) {
        Page.clickOnNumber(number);
        number = number - 1
    }
  });
});
