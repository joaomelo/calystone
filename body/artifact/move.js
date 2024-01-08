import { listArtifacts } from "@body";
import { mutate } from "@lib";

export function moveArtifact(dependencies, { id, order, parentId }) {
  if (!id) throw new Error("artifact move requires a id to perform");

  const list = listArtifacts(dependencies);

  const manifests = moveManifests({
    id,
    list,
    order,
    parentId,
  });

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}

export function moveManifests({ id, list, order, parentId }) {
  const upwards = list.filter(
    artifact =>
      artifact.parentId === parentId
      && artifact.order >= order
      && artifact.id !== id,
  );

  const base = {
    method: "put",
    name: "artifacts",
  };

  const manifests = [
    {
      ...base,
      data: { id, order, parentId },
    },
  ];

  upwards.forEach((upward) => {
    manifests.push({
      ...base,
      data: { id: upward.id, order: upward.order + 1 },
    });
  });

  return manifests;
}
