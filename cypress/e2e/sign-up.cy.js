import {
  signUpSelectors,
  signInSelectors,
  dashboardSelectors,
} from "./selectors";

describe("sign up", () => {
  beforeEach(() => cy.clearData());

  it("visit sign-up", () => {
    cy.visit(signUpSelectors.path);
    cy.location("pathname").should("equal", signUpSelectors.path);
  });

  it("visit sign-up through sign-in", () => {
    cy.visit(signInSelectors.path);
    cy.get(signInSelectors.linkSignUp).click();
    cy.location("pathname").should("equal", signUpSelectors.path);
  });

  it("signs up new users", () => {
    cy.visit(signUpSelectors.path);
    cy.get(signUpSelectors.inputEmail).type("test@test.com");
    cy.get(signUpSelectors.inputPassword).type("1234567890");
    cy.get(signUpSelectors.buttonSignUp).click();

    cy.get(dashboardSelectors.sideSignOut);
  });
});
