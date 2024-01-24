import {
  // artifactEditRoute,
  // outlineRoute,
  // preferencesRoute,
  // searchRoute,
  // signInRoute,
  // signUpRoute,
  // tagArtifactsRoute,
  // tagsRoute,
  PageOpen,
  PageSolve,
} from "@view/pages";

const routeOpenName = "open";
export const routeOpen = {
  component: PageOpen,
  name: routeOpenName,
  path: `/${routeOpenName}`,
};

const routeSolveName = "solve";
export const routeSolve = {
  component: PageSolve,
  name: routeSolveName,
  path: `/${routeSolveName}`,
};

export const routes = [
  { path: "/", redirect: routeSolve.path },

  // artifactEditRoute,
  // outlineRoute,
  // preferencesRoute,
  // searchRoute,
  // signInRoute,
  // signUpRoute,
  routeOpen,
  routeSolve,
  // tagArtifactsRoute,
  // tagsRoute,

  { path: "/:pathMatch(.*)*", redirect: routeSolve.path },
];
