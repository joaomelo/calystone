import { useDependencies, currentUser } from "@lib";

export function useEmail() {
  const { auth } = useDependencies();
  const { email } = currentUser(auth);
  return email;
}
