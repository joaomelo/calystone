import { openSelect } from "@lib";

export async function openTags(dependencies, userId) {
  const { selector } = dependencies;

  await openSelect(selector, {
    name: "tags",
    where: [
      {
        field: "userId",
        operator: "==",
        value: userId,
      },
    ],
  });
}
