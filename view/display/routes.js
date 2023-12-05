import {
  PageArtifactEdit,
  PageAuth,
  PageOutline,
  PagePreferences,
  PageSearch,
  PageSolve,
} from "@view/pages";

export const routes = [
  { path: "/", redirect: "/page-solve" },
  { path: "/page-solve", name: "page-solve", component: PageSolve },
  { path: "/page-auth", name: "page-auth", component: PageAuth },
  {
    path: "/page-outline",
    name: "page-outline",
    component: PageOutline,
    meta: { intra: true },
  },
  {
    path: "/page-preferences",
    name: "page-preferences",
    component: PagePreferences,
    meta: { intra: true },
  },
  {
    path: "/page-search",
    name: "page-search",
    component: PageSearch,
    meta: { intra: true },
    props: (route) => ({ term: route.query.term }),
  },
  {
    path: "/page-artifact-edit/:artifactId",
    name: "page-artifact-edit",
    component: PageArtifactEdit,
    props: true,
    meta: { intra: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/page-solve" },
];
