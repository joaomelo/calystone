import { useTask } from "@lib";
import { signIn } from "@body";
import { goStart } from "@view";

export function useSignIn() {
  const reset = () => ({ email: null, password: null });
  return useTask(async (dependencies, payload) => {
    await signIn(dependencies, payload);
    goStart(dependencies);
  }, reset);
}
