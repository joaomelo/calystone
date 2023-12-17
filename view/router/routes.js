import {
  artifactEditRoute,
  authRoute,
  outlineRoute,
  preferencesRoute,
  searchRoute,
  solveRoute,
} from "@view/pages";

export const routes = [
  { path: "/", redirect: solveRoute.path },
  artifactEditRoute,
  authRoute,
  outlineRoute,
  preferencesRoute,
  searchRoute,
  solveRoute,
  { path: "/:pathMatch(.*)*", redirect: solveRoute.path },
];
