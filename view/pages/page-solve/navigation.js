import { AUTH_STATUSES, authStatus } from "@lib";
import { goOutline, goSignIn } from "@view";

import { default as PageSolve } from "./page-solve.vue";

const name = "page-solve";

export const solveRoute = {
  component: PageSolve,
  name,
  path: `/${name}`,
};

export function goSolve(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}

export async function goStart(dependencies) {
  const { auth, router, start: startPath } = dependencies;

  const status = await authStatus(auth);

  const startRoute = router.resolve(startPath);
  const goStart = () => router.push(startRoute);

  if (status === AUTH_STATUSES.SIGNED_OUT) {
    return startRoute.meta.external ? goStart() : goSignIn(dependencies);
  }

  return startRoute.meta.intra ? goStart() : goOutline(dependencies);
}
