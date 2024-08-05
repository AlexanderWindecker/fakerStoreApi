class page {
  constructor() {
    this.get = {
      infoEmpty: (num) => cy.get(`#grid [style="z-index:${num}"]`)
    };
  }

  clickOnNumber(num) {
    this.get.infoEmpty(num).click();
  }
}
export const Page = new page()