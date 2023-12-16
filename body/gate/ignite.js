import { AUTH_STATUSES, authStatus, currentUser } from "@lib";
import { openArtifacts } from "@body";

export async function ignite(dependencies) {
  const { auth } = dependencies;
  const status = await authStatus(auth);
  if (status === AUTH_STATUSES.SIGNED_IN) {
    const { id } = currentUser(auth);
    await openArtifacts(dependencies, id);
  }
}
