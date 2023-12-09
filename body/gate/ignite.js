import { AUTH_STATUSES } from "@lib";
import { openArtifacts } from "@body";

export async function ignite(dependencies) {
  const { auth } = dependencies;
  const status = await auth.solve();
  if (status === AUTH_STATUSES.SIGNED_IN) {
    const userId = auth.user.uid;
    await openArtifacts(dependencies, { userId });
  }
}
