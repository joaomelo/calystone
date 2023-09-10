import { getAuth } from "firebase/auth";
import { useFirebase } from "@lib/firebase";

export function useAuth() {
  const firebase = useFirebase();
  const auth = getAuth(firebase.app);
  return auth;
}
