import { identifyLastArtifactsOrder } from "@body";
import { mutate } from "@lib";

export function transferArtifact(dependencies, { id, parentId = null }) {
  if (!id) throw new Error("artifact transfer requires a id to perform");

  const order = identifyLastArtifactsOrder(dependencies, parentId);
  const data = { id, parentId, order: order + 1 };

  const { mutator } = dependencies;
  return mutate(mutator, { method: "put", name: "artifacts", data });
}
