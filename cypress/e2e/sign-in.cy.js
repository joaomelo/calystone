import {
  signUp,
  signUpSelectors,
  signInSelectors,
  outlineSelectors,
} from "./shared";

describe("sign in", () => {
  beforeEach(() => cy.clearData());

  it("sign in is the default route", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", signInSelectors.path);
  });

  it("visit sign-in through sign-up", () => {
    cy.visit(signUpSelectors.path);
    cy.get(signUpSelectors.linkSignIn).click();
    cy.location("pathname").should("equal", signInSelectors.path);
  });

  it("signs in users", () => {
    const email = "test@test.com";
    const password = "1234567890";
    signUp({ email, password });
    cy.get(outlineSelectors.sideSignOut).click();

    cy.visit(signInSelectors.path);
    cy.get(signInSelectors.inputEmail).type(email);
    cy.get(signInSelectors.inputPassword).type(password);
    cy.get(signInSelectors.buttonSignIn).click();

    cy.get(outlineSelectors.sideSignOut);
  });
});
