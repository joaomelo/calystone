import { useUseCase } from "@lib";
import { signIn } from "@body";
import { goStart } from "@view";

export function useSignIn() {
  return useUseCase(
    async (dependencies, payload) => {
      await signIn(dependencies, payload);
      goStart(dependencies);
    },
    { email: null, password: null }
  );
}
