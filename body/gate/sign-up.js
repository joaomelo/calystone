import { currentUser, signUp as signUpBase } from "@lib";
import { openArtifacts } from "@body";

export async function signUp(dependencies, payload) {
  const { auth } = dependencies;
  await signUpBase(auth, payload);

  const { id } = currentUser(auth);
  await openArtifacts(dependencies, id);
}
