import { signSelectors } from "./sign";

export const signInSelectors = {
  path: "/page-sign-in",
  linkSignUp: "#link-sign-up",
  buttonSignIn: "#button-sign-in",
  ...signSelectors,
};
