import {
  openMacros,
  pageNodes,
} from "../helpers";

describe("connects", () => {
  it("opens memory outlineNodesLegacy", () => {
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

  it("switches between locales", () => {
    pageOpen.locale.option("en").click();
    pageOpen.locale.label().should("have.text", "language");

    pageOpen.locale.option("pt-br").click();
    pageOpen.locale.label().should("have.text", "idioma");
  });

});
