import { truncate, useDependencies } from "@lib";

export function useEmail() {
  const { gatekeeper } = useDependencies();
  const email = gatekeeper.user.email;
  return truncate(email, 15);
}
