import { sign } from "./sign";

export const signInPage = {
  ...sign,
  path,
  buttonSignIn,
  linkSignUp,
};

function path() {
  return "/page-sign-in";
}
function buttonSignIn() {
  return cy.get("#button-sign-in");
}
function linkSignUp() {
  return cy.get("#link-sign-up");
}
