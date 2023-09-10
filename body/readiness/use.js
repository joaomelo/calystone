import { computed } from "vue";
import { useAuthState, AUTH_STATUSES } from "@lib";
import { READINESS } from "./enum";

export function useReadiness() {
  const authState = useAuthState();

  const readiness = computed(() => {
    if (authState.status === AUTH_STATUSES.UNSOLVED) return READINESS.UNSOLVED;
    if (authState.status === AUTH_STATUSES.SIGNED_OUT) return READINESS.OUT;
    return READINESS.UNLOADED;
  });

  return readiness;
}
