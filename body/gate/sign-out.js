import { signOut as signOutBase } from "@lib";
import { closeArtifacts } from "@body";

export async function signOut(dependencies) {
  closeArtifacts(dependencies);

  const { auth } = dependencies;
  await signOutBase(auth);
}
