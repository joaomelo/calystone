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
} from "@view/pages";

export const routeOpen = {
  component: PageOpen,
  name,
  path: `/${name}`,
};

export const routes = [
  { path: "/", redirect: routeOpen.path },

  // artifactEditRoute,
  // outlineRoute,
  // preferencesRoute,
  // searchRoute,
  // signInRoute,
  // signUpRoute,
  routeOpen,
  // tagArtifactsRoute,
  // tagsRoute,

  { path: "/:pathMatch(.*)*", redirect: routeOpen.path },
];
