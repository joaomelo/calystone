import type { RouteRecordRaw } from "vue-router";

import { PageOpen } from "@display/pages";

const routeOpenName = "open";
export const routeOpen: RouteRecordRaw = {
  component: PageOpen,
  name: routeOpenName,
  path: `/${routeOpenName}`,
};

// const routeSolveName = "solve";
// export const routeSolve = {
//   component: PageSolve,
//   meta: { access: "external" },
//   name: routeSolveName,
//   path: `/${routeSolveName}`,
// };

// const routeSignUpName = "sign-up";
// export const routeSignUp = {
//   component: PageSignUp,
//   meta: { access: "external" },
//   name: routeSignUpName,
//   path: `/${routeSignUpName}`,
// };

// const routeSignInName = "sign-in";
// export const routeSignIn = {
//   component: PageSignIn,
//   meta: { access: "external" },
//   name: routeSignInName,
//   path: `/${routeSignInName}`,
// };

// const routeOutlineName = "outline";
// export const routeOutline = {
//   component: PageOutline,
//   meta: { access: "internal" },
//   name: routeOutlineName,
//   path: `/${routeOutlineName}/:parentId?`,
//   props: true,
// };


