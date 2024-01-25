import {
  PageOpen,
  PageSignIn,
  PageSignUp,
  PageSolve,
} from "@view/pages";

const routeSolveName = "solve";
export const routeSolve = {
  component: PageSolve,
  meta: { access: "external" },
  name: routeSolveName,
  path: `/${routeSolveName}`,
};

const routeSignUpName = "sign-up";
export const routeSignUp = {
  component: PageSignUp,
  meta: { access: "external" },
  name: routeSignUpName,
  path: `/${routeSignUpName}`,
};

const routeSignInName = "sign-in";
export const routeSignIn = {
  component: PageSignIn,
  meta: { access: "external" },
  name: routeSignInName,
  path: `/${routeSignInName}`,
};

const routeOpenName = "open";
export const routeOpen = {
  component: PageOpen,
  meta: { access: "internal" },
  name: routeOpenName,
  path: `/${routeOpenName}`,
};

export const routes = [
  { path: "/", redirect: routeSolve.path },

  routeOpen,
  routeSolve,
  routeSignUp,
  routeSignIn,

  { path: "/:pathMatch(.*)*", redirect: routeSolve.path },
];
