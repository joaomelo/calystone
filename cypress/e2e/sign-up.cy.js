import {
  signUp,
  signUpSelectors,
  signInSelectors,
  outlineSelectors,
} from "./shared";

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
    const email = "test@test.com";
    const password = "1234567890";

    signUp({ email, password });

    cy.get(outlineSelectors.sideSignOut);
  });
});
