import { reactive } from "vue";
import { useTask } from "@lib";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "./use-auth";
import { validateEmail } from "./validate-email";
import { validatePassword } from "./validate-password";

export function useSignUp() {
  const auth = useAuth();
  const payload = reactive({ email: null, password: null });

  const signUpTask = useTask(() => {
    const { email, password } = payload;
    validateEmail(email);
    validatePassword(password);
    return createUserWithEmailAndPassword(auth, email, password);
  });

  return { signUpTask, payload };
}
