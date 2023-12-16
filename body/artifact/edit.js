import { mutate } from "@lib";

export function editArtifact(dependencies, payload) {
  if (!payload.id) throw new Error("artifact edit requires a id to perform");

  const { mutator } = dependencies;
  return mutate(mutator, { name: "artifacts", payload, method: "put" });
}
