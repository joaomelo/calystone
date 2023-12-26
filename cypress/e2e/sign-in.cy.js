import {
  signUpSelectors,
  signInSelectors,
  dashboardSelectors,
} from "./selectors";

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

  it.only("signs in users", () => {
    const email = "test@test.com";
    const password = "1234567890";

    cy.visit(signUpSelectors.path);
    cy.get(signUpSelectors.inputEmail).type(email);
    cy.get(signUpSelectors.inputPassword).type(password);
    cy.get(signUpSelectors.buttonSignUp).click();
    cy.get(dashboardSelectors.sideSignOut).click();

    cy.visit(signInSelectors.path);
    cy.get(signInSelectors.inputEmail).type(email);
    cy.get(signInSelectors.inputPassword).type(password);
    cy.get(signInSelectors.buttonSignIn).click();

    cy.get(dashboardSelectors.sideSignOut);
  });
});
