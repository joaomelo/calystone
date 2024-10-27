import { computed } from "vue";
import { useRoute } from "vue-router";

import { DEFAULT_ACTIVITY, isActivity } from "./activities";

export function useCurrentActivity() {
  const route = useRoute();
  return computed(() => {
    if (isActivity(route.name)) return route.name;
    return DEFAULT_ACTIVITY;
  });
}