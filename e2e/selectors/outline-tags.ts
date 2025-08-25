import { selectTag } from "./select-tag";

export const outlineTags = {
  filters: { tag: { ...selectTag } },
  nodes: { node: ".p-tree-node-content", }
} as const;