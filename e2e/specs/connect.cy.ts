import {
  openMacros,
  pageNodes,
} from "../helpers";

describe("connects", () => {
  it("opens memory outlineNodes", () => {
    openMacros.openMemory();
    cy.url().should("include", pageNodes.url());
  });

  it("redirects to one drive oauth", () => {
    cy.intercept("GET", "https://login.microsoftonline.com/**").as("oneDriveAuth");

    openMacros.openOneDrive();

    cy.wait("@oneDriveAuth").then((interception) => {
      expect(interception.request.url).to.include("login.microsoftonline.com");
    });
  });

  it("redirects to dropbox oauth", () => {
    cy.intercept("GET", "https://*.dropbox.com/**").as("dropboxAuth");

    openMacros.openDropbox();

    cy.wait("@dropboxAuth").then((interception) => {
      expect(interception.request.url).to.include("dropbox.com");
    });
  });

});
