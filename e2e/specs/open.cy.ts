import { pageOpen } from "../helpers";

describe("open", function() {
  it("open directory", function() {
    cy.visit("/");
    pageOpen.buttonOpenFsa().click();
  });
});
