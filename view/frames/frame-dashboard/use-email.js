import { useDependencies } from "@lib";
import { currentUser } from "@body";

export function useEmail() {
  const dependencies = useDependencies();
  const { email } = currentUser(dependencies);
  return email;
}
