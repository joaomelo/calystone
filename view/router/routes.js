import { authRoute, solveRoute, outlineRoute, preferencesRoute } from "@view";

export const routes = [
  { path: "/", redirect: solveRoute.path },
  solveRoute,
  authRoute,
  outlineRoute,
  preferencesRoute,
  // artifactEditRoute,
  // {
  //   path: "/page-preferences",
  //   name: "page-preferences",
  //   component: PagePreferences,
  //   meta: { intra: true },
  // },
  // {
  //   path: "/page-search",
  //   name: "page-search",
  //   component: PageSearch,
  //   meta: { intra: true },
  //   props: (route) => ({ term: route.query.term }),
  // },
  { path: "/:pathMatch(.*)*", redirect: solveRoute.path },
];
