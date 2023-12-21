import { useDependencies, currentUser, truncate } from "@lib";

export function useEmail() {
  const { auth } = useDependencies();
  const { email } = currentUser(auth);
  return truncate(email, 15);
}
