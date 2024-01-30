import { useDependencies, useTask } from "@lib";

export function useSignUp() {
  const { helmsman, gatekeeper } = useDependencies();
  const reset = () => ({ email: null, password: null });
  const { payload, task } = useTask(async (payload) => {
    await gatekeeper.signUp(payload);
    await helmsman.open();
  }, reset);
  return { payload, signUp: task };
}
