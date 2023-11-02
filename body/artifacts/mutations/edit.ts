import type { Driver } from "@service";
import type { ArtifactPayloadWithId } from "../artifact";

import { put } from "@service";

export async function editArtifact(
  payload: ArtifactPayloadWithId,
  driver: Driver
) {
  const to = { name: "artifacts", driver };
  await put(payload, to);
}
