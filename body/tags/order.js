import { listTags } from "@body";

export function identifyLastTagsOrder(dependencies) {
  const tags = listTags(dependencies);
  const lastOrder = tags.reduce((acc, tag) => {
    const order = tag.order || 0;
    return Math.max(acc, order);
  }, 0);
  return lastOrder;
}
