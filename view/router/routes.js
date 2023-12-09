import { authRoute, solveRoute, outlineRoute } from "@view/pages";

export const routes = [
  { path: "/", redirect: solveRoute.path },
  solveRoute,
  authRoute,
  outlineRoute,
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
  // {
  //   path: "/page-artifact-edit/:artifactId",
  //   name: "page-artifact-edit",
  //   component: PageArtifactEdit,
  //   props: true,
  //   meta: { intra: true },
  // },
  { path: "/:pathMatch(.*)*", redirect: solveRoute.path },
];
