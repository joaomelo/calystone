import { goStart } from "@view";
import { signUp } from "@body";
import { useTask } from "@lib";

export function useSignUp() {
  const reset = () => ({ email: null, password: null });
  return useTask(async (dependencies, payload) => {
    await signUp(dependencies, payload);
    goStart(dependencies);
  }, reset);
}
