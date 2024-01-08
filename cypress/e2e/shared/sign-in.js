import { sign } from "./sign";

export const signInPage = {
  ...sign,
  buttonSignIn,
  path,
};

function path() {
  return "/page-sign-in";
}

function buttonSignIn() {
  return cy.get("#button-sign-in");
}
