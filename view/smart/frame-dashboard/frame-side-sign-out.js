import { useDependencies } from "@lib";

export function useSignOut() {
  const { gatekeeper, helmsman } = useDependencies();
  return async () => {
    await gatekeeper.signOut();
    helmsman.signIn();
  };
}
