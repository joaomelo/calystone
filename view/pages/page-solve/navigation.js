import { AUTH_STATUSES } from "@lib";
import { goAuth, goOutline } from "@view";
import { default as PageSolve } from "./page-solve.vue";

const name = "page-solve";

export const solveRoute = {
  path: "/page-solve",
  name,
  component: PageSolve,
};

export function isSolve(dependencies) {
  const { router } = dependencies;
  return router.currentRoute.value.name === name;
}

export function goStart(dependencies) {
  const { start, router, auth } = dependencies;

  if (auth.status === AUTH_STATUSES.UNSOLVED) {
    return goSolve(dependencies);
  }

  if (auth.status === AUTH_STATUSES.SIGNED_OUT) {
    return goAuth(dependencies);
  }

  const route = router.resolve(start);
  return route.meta.intra ? router.push(route) : goOutline(dependencies);
}

export function goSolve(dependencies) {
  const { router } = dependencies;
  return router.push({ name: "page-solve" });
}
