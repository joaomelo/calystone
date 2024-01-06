import { listItems } from "@lib";

export function listTags(dependencies) {
  const { selector } = dependencies;
  return listItems(selector, "tags");
}
