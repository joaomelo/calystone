import { listTags } from "./list-tags";

export function identifyLastTagsOrder(dependencies) {
  const tags = listTags(dependencies);
  const lastOrder = tags.reduce((acc, { order }) => Math.max(acc, order), -1);
  return lastOrder;
}
