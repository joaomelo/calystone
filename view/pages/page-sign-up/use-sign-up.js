import { useDependencies, useTask } from "@lib";

export function useSignUp() {
  const { display, gatekeeper } = useDependencies();
  const reset = () => ({ email: null, password: null });
  const { payload, task } = useTask(async (payload) => {
    await gatekeeper.signUp(payload);
    await display.signedIn();
  }, reset);
  return { payload, signUp: task };
}
