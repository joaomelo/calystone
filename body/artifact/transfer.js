import { mutate } from "@lib";
import { identifyLastOrder } from "@body";

export function transferArtifact(dependencies, { id, parentId = null }) {
  if (!id) throw new Error("artifact transfer requires a id to perform");

  const order = identifyLastOrder(dependencies, parentId);
  const payload = { id, parentId, order: order + 1 };

  const { mutator } = dependencies;
  return mutate(mutator, { method: "put", name: "artifacts", payload });
}
