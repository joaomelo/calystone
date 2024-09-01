import { useDependencies, useTask } from "@lib";

export function useSignUp() {
  const { gatekeeper, helmsman } = useDependencies();
  const reset = () => ({ email: null, password: null });
  const { payload, task } = useTask(async (payload) => {
    await gatekeeper.signUp(payload);
    await helmsman.open();
  }, reset);
  return { payload, signUp: task };
}
