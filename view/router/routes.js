import {
  artifactEditRoute,
  outlineRoute,
  preferencesRoute,
  searchRoute,
  signInRoute,
  signUpRoute,
  solveRoute,
} from "@view/pages";

export const routes = [
  { path: "/", redirect: solveRoute.path },

  artifactEditRoute,
  outlineRoute,
  preferencesRoute,
  searchRoute,
  signInRoute,
  signUpRoute,
  solveRoute,

  { path: "/:pathMatch(.*)*", redirect: solveRoute.path },
];
