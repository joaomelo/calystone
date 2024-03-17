import { closeSelect } from "@lib";

export function closeTags(dependencies) {
  const { selector } = dependencies;
  closeSelect(selector, "tags");
}
