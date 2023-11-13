import {
  // PageArtifactEdit,
  // PageArtifactsPlan,
  PageAuth,
  PageUnsolved,
} from "@view/pages";

export const routes = [
  { path: "/", redirect: "/page-unsolved" },
  { path: "/page-unsolved", name: "page-unsolved", component: PageUnsolved },
  { path: "/page-auth", name: "page-auth", component: PageAuth },
  // {
  //   path: "/page-artifacts-plan",
  //   component: PageArtifactsPlan,
  //   meta: { internal: true },
  // },
  // {
  //   path: "/page-artifacts-edit",
  //   component: PageArtifactEdit,
  //   meta: { internal: true },
  // },
];
