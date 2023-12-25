import { AUTH_STATUSES, authStatus } from "@lib";
import { goSignIn, goOutline } from "@view";
import { default as PageSolve } from "./page-solve.vue";

const name = "page-solve";

export const solveRoute = {
  path: `/${name}`,
  name,
  component: PageSolve,
};

export function goSolve(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}

export async function goStart(dependencies) {
  const { start, router, auth } = dependencies;

  const status = await authStatus(auth);

  if (status === AUTH_STATUSES.SIGNED_OUT) {
    return goSignIn(dependencies);
  }

  const route = router.resolve(start);
  return route.meta.intra ? router.push(route) : goOutline(dependencies);
}
