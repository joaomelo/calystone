export function moveManifests({ parentId, id, list, order }) {
  const upwards = list.filter(
    (artifact) =>
      artifact.parentId === parentId &&
      artifact.order >= order &&
      artifact.id !== id
  );

  const method = "put";
  const manifests = [
    {
      method,
      payload: { id, parentId, order },
    },
  ];

  upwards.forEach((upward) => {
    manifests.push({
      method,
      payload: { id: upward.id, order: upward.order + 1 },
    });
  });

  return manifests;
}
