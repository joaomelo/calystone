import type { Artifacts } from "@/domain/artifacts";

import type { Source } from "./source";

export async function loadSource(source: Source, artifacts: Artifacts) {
  if (source.status !== "open") throw new Error("Source must be open in order to load");

  source.status = "loading";
  artifacts.clear();

  for await (const artifact of source.load()) {
    artifacts.set(artifact.id, artifact);
  }

  source.status = "open";
}