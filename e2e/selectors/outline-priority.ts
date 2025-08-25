import { dataTest } from "../helpers";
import { selectTag } from "./select-tag";

const criterionOptions = dataTest("select-criterion-options");

export const outlinePriority = {
  filters: {
    criterion: {
      input: dataTest("select-criterion-input"),
      option: (label: string) => `${criterionOptions} > li[aria-label="${label}"]`,
      options: criterionOptions,
    },
    tag: { ...selectTag }
  },
  nodes: { node: ".p-tree-node-content" }
} as const;