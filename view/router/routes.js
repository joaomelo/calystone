import {
  artifactEditRoute,
  outlineRoute,
  preferencesRoute,
  searchRoute,
  signInRoute,
  signUpRoute,
  solveRoute,
  tagsRoute,
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
  tagsRoute,

  { path: "/:pathMatch(.*)*", redirect: solveRoute.path },
];
