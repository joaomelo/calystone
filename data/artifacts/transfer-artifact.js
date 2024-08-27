import { mutate } from "@lib";

import { getLastOrder } from "./last-order";

export function transferArtifact(dependencies, { id, parentId = null }) {
  if (!id) throw new Error("artifact transfer requires a id to perform");

  const order = getLastOrder(dependencies, parentId);
  const data = { id, order: order + 1, parentId };

  const { mutator } = dependencies;
  return mutate(mutator, { data, method: "put", name: "artifacts" });
}
