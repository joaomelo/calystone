import type { Driver } from "@service";
import type { ArtifactPayload } from "../artifact";

import { add } from "@service";
import { artifactFieldsSchema } from "../artifact";

export async function addArtifact(payload: ArtifactPayload, driver: Driver) {
  const artifactFields = artifactFieldsSchema.parse(payload);
  const to = { name: "artifacts", driver };
  await add(artifactFields, to);
}
