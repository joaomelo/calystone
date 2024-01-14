import {
  artifactEditRoute,
  outlineRoute,
  preferencesRoute,
  searchRoute,
  signInRoute,
  signUpRoute,
  solveRoute,
  tagArtifactsRoute,
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
  tagArtifactsRoute,
  tagsRoute,

  { path: "/:pathMatch(.*)*", redirect: solveRoute.path },
];
