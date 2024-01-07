import { goStart } from "@view";
import { signIn } from "@body";
import { useTask } from "@lib";

export function useSignIn() {
  const reset = () => ({ email: null, password: null });
  return useTask(async (dependencies, payload) => {
    await signIn(dependencies, payload);
    goStart(dependencies);
  }, reset);
}
