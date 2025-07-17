import {
  openMacros,
  pageNodes
} from "../helpers";

describe("connects", () => {
  it("opens memory outlineNodes", () => {
    openMacros.openMemory();
    cy.url().should("include", pageNodes.url());
  });

  it("redirects to one drive oauth", () => {
    openMacros.openOneDrive();
    cy.origin("https://login.live.com", () => {
      cy.url().should("include", "login.live.com");
    });
  });

  it("redirects to dropbox oauth", () => {
    openMacros.openDropbox();
    cy.origin("https://www.dropbox.com", () => {
      cy.url().should("include", "www.dropbox.com");
    });
  });
});
