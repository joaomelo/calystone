import { signUpPage, signInPage, outlinePage } from "./shared";

describe("sign in", () => {
  beforeEach(() => cy.clearData());

  it("sign in is the default route", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", signInPage.path());
  });

  it("visit sign-in through sign-up", () => {
    cy.visit(signUpPage.path());
    signUpPage.linkSign().click();
    cy.location("pathname").should("equal", signInPage.path());
  });

  it("signs in users", () => {
    const email = "test@test.com";
    const password = "1234567890";
    signUpPage.signUp({ email, password });
    outlinePage.sideSignOut().click();

    cy.visit(signInPage.path());
    signInPage.inputEmail().type(email);
    signInPage.inputPassword().type(password);
    signInPage.buttonSignIn().click();

    outlinePage.sideSignOut();
  });
});
