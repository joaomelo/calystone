import { signOut } from "firebase/auth";
import { useTask } from "@lib";
import { useAuth } from "./use-auth";

export function useSignOut() {
  const auth = useAuth();
  const signOutTask = useTask(() => signOut(auth));
  return signOutTask;
}
