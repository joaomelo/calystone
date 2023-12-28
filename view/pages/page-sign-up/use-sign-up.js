import { useTask } from "@lib";
import { signUp } from "@body";
import { goStart } from "@view";

export function useSignUp() {
  const reset = () => ({ email: null, password: null });
  return useTask(async (dependencies, payload) => {
    await signUp(dependencies, payload);
    goStart(dependencies);
  }, reset);
}
