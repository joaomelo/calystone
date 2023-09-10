import { reactive } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./use-auth";
import { AUTH_STATUSES } from "./statuses";

export function useAuthState() {
  const state = reactive({
    id: null,
    email: null,
    status: AUTH_STATUSES.UNSOLVED,
  });

  const auth = useAuth();

  onAuthStateChanged(auth, (userData) => {
    if (userData) {
      state.id = userData.uid;
      state.email = userData.email;
      state.status = AUTH_STATUSES.SIGNED_IN;
    } else {
      state.id = null;
      state.email = null;
      state.status = AUTH_STATUSES.SIGNED_OUT;
    }
  });

  return state;
}
