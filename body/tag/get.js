import { getItem } from "@lib";

export function getTag(dependencies, id) {
  const { selector } = dependencies;
  return getItem(selector, { name: "tags", id });
}
