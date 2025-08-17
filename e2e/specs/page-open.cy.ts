import {
  openDropbox,
  openMemory,
  openOneDrive
} from "../macros";
import {
  pageFolders,
  pageOpen,
  pagePrivacy,
  pageTerms
} from "../selectors";

describe("page-open", () => {
  it("opens memory", () => {
    openMemory();
    cy.url().should("include", pageFolders.url());
  });

  it("redirects to one drive oauth", () => {
    cy.intercept("GET", "https://login.microsoftonline.com/**").as("oneDriveAuth");

    openOneDrive();

    cy.wait("@oneDriveAuth").then((interception) => {
      expect(interception.request.url).to.include("login.microsoftonline.com");
    });
  });

  it("redirects to dropbox oauth", () => {
    cy.intercept("GET", "https://*.dropbox.com/**").as("dropboxAuth");

    openDropbox();

    cy.wait("@dropboxAuth").then((interception) => {
      expect(interception.request.url).to.include("dropbox.com");
    });
  });

  it("can open the privacy page", function() {
    cy.visit("/");
    pageOpen.privacyLink().click();
    cy.contains("privacy policy", { matchCase: false });
    pagePrivacy.openLink().click();
  });

  it("can open the terms page", function() {
    cy.visit("/");
    pageOpen.termsLink().click();
    cy.contains("terms of service", { matchCase: false });
    pageTerms.openLink().click();
  });

  it("switches between locales", () => {
    cy.visit("/");
    pageOpen.locale.option("en").click();
    pageOpen.locale.label().should("have.text", "language");

    pageOpen.locale.option("pt-br").click();
    pageOpen.locale.label().should("have.text", "idioma");
  });

});
