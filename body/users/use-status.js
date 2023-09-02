import { readonly, computed } from "vue";
import { useService, AUTH_STATUSES } from "@lib";

export function useAuthStatus() {
  const auth = useService("auth");
  return readonly({
    status: computed(() => auth.user.status),
    isUnsolved: computed(() => auth.user.status === AUTH_STATUSES.UNSOLVED),
    isSignedIn: computed(() => auth.user.status === AUTH_STATUSES.SIGNED_IN),
    isSignedOut: computed(() => auth.user.status === AUTH_STATUSES.SIGNED_OUT),
  });
}
