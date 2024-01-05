import { outlinePage, signInPage, signUpPage } from "./shared";

describe("sign up", () => {
  beforeEach(() => cy.clearData());

  it("visit sign-up", () => {
    cy.visit(signUpPage.path());
    cy.location("pathname").should("equal", signUpPage.path());
  });

  it("visit sign-up through sign-in", () => {
    cy.visit(signInPage.path());
    signInPage.linkSign().click();
    cy.location("pathname").should("equal", signUpPage.path());
  });

  it("signs up new users", () => {
    const email = "test@test.com";
    const password = "1234567890";

    signUpPage.signUp({ email, password });

    outlinePage.sideSignOut();
  });
});
