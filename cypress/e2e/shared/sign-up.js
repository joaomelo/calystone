import { sign } from "./sign";

export const signUpPage = {
  ...sign,
  path,
  buttonSignUp,
  linkSignIn,
  signUp,
  signUpAuto,
};

function path() {
  return "/page-sign-up";
}
function buttonSignUp() {
  return cy.get("#button-sign-up");
}
function linkSignIn() {
  return cy.get("#link-sign-in");
}

function signUp({ email, password }) {
  cy.visit(path());
  sign.inputEmail().type(email);
  sign.inputPassword().type(password);
  return buttonSignUp().click();
}

function signUpAuto() {
  const email = "test@test.com";
  const password = "1234567890";
  return signUp({ email, password });
}
