import type { Artifacts } from "@/domain/artifacts";
import type { Source } from "@/domain/source";

import { loadSource } from "@/domain/source";

export async function feed(artifacts: Artifacts, source: Source) {
  if (source.status !== "open") throw new Error("The store's source must be open in order to load");

  artifacts.clear();
  for await (const artifact of loadSource(source)) {
    artifacts.set(artifact.id, artifact);
  }
}