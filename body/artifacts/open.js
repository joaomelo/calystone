export async function openArtifacts(dependencies, payload) {
  const { artifactsSelect } = dependencies;
  const { userId } = payload;

  await artifactsSelect.open({
    field: "userId",
    operator: "==",
    value: userId,
  });
}
