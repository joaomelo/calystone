import { reactive } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTask } from "@lib/task";
import { useAuth } from "./use-auth";
import { validateEmail } from "./validate-email";

export function useSignIn() {
  const auth = useAuth();
  const payload = reactive({ email: null, password: null });

  const signInTask = useTask(() => {
    const { email, password } = payload;
    validateEmail(email);
    return signInWithEmailAndPassword(auth, email, password);
  });

  return { signInTask, payload };
}
