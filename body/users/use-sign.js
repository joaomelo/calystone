import { reactive } from "vue";
import { useService, useTask } from "@lib";
import { validateEmail, validatePassword } from "./validation";

export function useSignUp() {
  const [auth, users] = useService(["auth", "users"]);
  const payload = reactive({ email: null, password: null });

  const signUp = useTask(async () => {
    const { email, password } = payload;
    validateEmail(email);
    validatePassword(password);
    const { user } = await auth.signUp(payload);
    return users.add({ id: user.uid, email: user.email });
  });

  return [signUp, payload];
}

export function useSignIn() {
  const auth = useService("auth");
  const payload = reactive({ email: null, password: null });

  const signIn = useTask(() => {
    const { email } = payload;
    validateEmail(email);
    return auth.signIn(payload);
  });

  return [signIn, payload];
}

export function useSignOut() {
  const auth = useService("auth");
  const signOut = useTask(() => auth.signOut());
  return signOut;
}
