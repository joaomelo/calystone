import type { ProviderKey } from "@/domain";
import type { Router } from "vue-router";

import { Store, useStore } from "@/domain";
import { computed } from "vue";

import type { Activity } from "./activities";

import { defaultActivity, isActivity } from "./activities";

const key: ProviderKey<Activity> = Symbol("activity");

export class ActivityStore extends Store<Activity> {

  constructor(router: Router) {
    const activity = computed(() => {
      const name = router.currentRoute.value.name;
      if (isActivity(name)) return name;
      return defaultActivity;
    });
    super(key, activity);
  }

}

export function useActivity() {
  return useStore(key);
}
