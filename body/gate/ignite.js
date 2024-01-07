import { AUTH_STATUSES, authStatus, currentUser } from "@lib";
import { openArtifacts, openTags } from "@body";

export async function ignite(dependencies) {
  const { auth } = dependencies;
  const status = await authStatus(auth);
  if (status === AUTH_STATUSES.SIGNED_IN) {
    const { id } = currentUser(auth);
    const artifactsPromise = openArtifacts(dependencies, id);
    const tagsPromise = openTags(dependencies, id);
    await Promise.all([artifactsPromise, tagsPromise]);
  }
}
