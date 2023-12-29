import { sign } from "./sign";

export const signInPage = {
  ...sign,
  path,
  buttonSignIn,
};

function path() {
  return "/page-sign-in";
}

function buttonSignIn() {
  return cy.get("#button-sign-in");
}
