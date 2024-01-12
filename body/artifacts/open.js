import { openSelect } from "@lib";

export async function openArtifacts(dependencies, userId) {
  const { selector } = dependencies;

  await openSelect(selector, {
    name: "artifacts",
    orderBy: "order",
    where: [
      {
        field: "userId",
        operator: "==",
        value: userId,
      },
    ],
  });
}
