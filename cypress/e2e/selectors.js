const signSelectors = {
  inputEmail: "#input-email input",
  inputPassword: "#input-password input",
};

export const signInSelectors = {
  path: "/page-sign-in",
  linkSignUp: "#link-sign-up",
  buttonSignIn: "#button-sign-in",
  ...signSelectors,
};

export const signUpSelectors = {
  path: "/page-sign-up",
  buttonSignUp: "#button-sign-up",
  linkSignIn: "#link-sign-in",
  ...signSelectors,
};

export const dashboardSelectors = {
  sideSignOut: "#side-sign-out",
};
