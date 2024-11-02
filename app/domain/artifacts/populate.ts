import type { Artifacts } from "@/domain/artifacts";

import type { Connection } from "./connection";

import { load } from "./load";

export function populate(connection: Connection, artifacts: Artifacts) {
  connection.status = "loading";
  artifacts.clear();

  for await (const artifact of load(connection.root)) {
    this.index.value.set(artifact.id, artifact);
    if (!artifact.parent) {
      this.roots.value.push(artifact);
    }
  }

  this.isLoading.value = false;
}
