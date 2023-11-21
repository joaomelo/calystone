import {
  PageArtifactEdit,
  PageArtifactsPlan,
  PageAuth,
  PageSolve,
} from "@view/pages";

export const routes = [
  { path: "/", redirect: "/page-solve" },
  { path: "/page-solve", name: "page-solve", component: PageSolve },
  { path: "/page-auth", name: "page-auth", component: PageAuth },
  {
    path: "/page-artifacts-plan",
    name: "page-artifacts-plan",
    component: PageArtifactsPlan,
    meta: { intra: true },
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
