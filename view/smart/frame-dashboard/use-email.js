import { currentUser, truncate, useDependencies } from "@lib";

export function useEmail() {
  const { auth } = useDependencies();
  const { email } = currentUser(auth);
  return truncate(email, 15);
}
