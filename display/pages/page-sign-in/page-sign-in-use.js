import { useDependencies, useTask } from "@lib";

export function useSignIn() {
  const { helmsman, gatekeeper } = useDependencies();
  const reset = () => ({ email: null, password: null });
  const { payload, task } = useTask(async (payload) => {
    await gatekeeper.signIn(payload);
    await helmsman.open();
  }, reset);
  return { payload, signIn: task };
}