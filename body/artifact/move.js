import { mutate } from "@lib";
import { listArtifacts } from "@body";

export function moveArtifact(dependencies, { id, parentId, order }) {
  if (!id) throw new Error("artifact move requires a id to perform");

  const list = listArtifacts(dependencies);

  const manifests = moveManifests({
    id,
    parentId,
    list,
    order,
  });

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}

export function moveManifests({ parentId, id, list, order }) {
  const upwards = list.filter(
    (artifact) =>
      artifact.parentId === parentId &&
      artifact.order >= order &&
      artifact.id !== id
  );

  const base = {
    method: "put",
    name: "artifacts",
  };

  const manifests = [
    {
      ...base,
      payload: { id, parentId, order },
    },
  ];

  upwards.forEach((upward) => {
    manifests.push({
      ...base,
      payload: { id: upward.id, order: upward.order + 1 },
    });
  });

  return manifests;
}
