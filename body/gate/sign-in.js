import { currentUser, signIn as signInBase } from "@lib";
import { openArtifacts } from "@body";

export async function signIn(dependencies, payload) {
  const { auth } = dependencies;
  await signInBase(auth, payload);

  const { id } = currentUser(auth);
  await openArtifacts(dependencies, id);
}
