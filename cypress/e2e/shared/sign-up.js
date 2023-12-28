import { signSelectors } from "./sign";

export const signUpSelectors = {
  path: "/page-sign-up",
  buttonSignUp: "#button-sign-up",
  linkSignIn: "#link-sign-in",
  ...signSelectors,
};

export function signUp({ email, password }) {
  cy.visit(signUpSelectors.path);
  cy.get(signUpSelectors.inputEmail).type(email);
  cy.get(signUpSelectors.inputPassword).type(password);
  cy.get(signUpSelectors.buttonSignUp).click();
}
