import { closeArtifacts } from "@body";

export async function signOut(dependencies) {
  const { auth } = dependencies;
  closeArtifacts(dependencies);
  await auth.signOut();
}
