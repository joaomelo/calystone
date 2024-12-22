import type { Router } from "vue-router";

import type { Activity } from "./activities";

import { asActivity } from "./activities";

export function solveRouterActivity(router: Router): Activity {
  const name = router.currentRoute.value.name;
  return asActivity(name);
}
