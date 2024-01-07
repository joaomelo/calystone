import { closeArtifacts, closeTags } from "@body";
import { signOut as signOutBase } from "@lib";

export async function signOut(dependencies) {
  closeArtifacts(dependencies);
  closeTags(dependencies);

  const { auth } = dependencies;
  await signOutBase(auth);
}
