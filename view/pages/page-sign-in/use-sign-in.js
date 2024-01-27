import { useDependencies, useTask } from "@lib";

export function useSignIn() {
  const { display, gatekeeper } = useDependencies();
  const reset = () => ({ email: null, password: null });
  const { payload, task } = useTask(async (payload) => {
    await gatekeeper.signIn(payload);
    await display.signedIn();
  }, reset);
  return { payload, signIn: task };
}
