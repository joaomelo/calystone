import {
  docs,
  pageOpen
} from "../helpers";

describe("docs", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can open the privacy page", function() {
    pageOpen.privacyLink().click();
    cy.contains("privacy policy", { matchCase: false });
    docs.openLink().click();
  });

  it("can open the terms page", function() {
    pageOpen.termsLink().click();
    cy.contains("terms of service", { matchCase: false });
    docs.openLink().click();
  });
});
