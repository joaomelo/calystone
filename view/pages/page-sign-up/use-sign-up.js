import { useTask } from "@lib";
import { signUp } from "@body";
import { goStart } from "@view";

export function useSignUp() {
  return useTask(
    async (dependencies, payload) => {
      await signUp(dependencies, payload);
      goStart(dependencies);
    },
    { email: null, password: null }
  );
}
