import { dataTest } from "../helpers";

const tagOptions = dataTest("select-tag-options");
const criterionOptions = dataTest("select-criterion-options");

export const outlinePriority = {
  lenses: {
    criterion: {
      input: dataTest("select-criterion-input"),
      option: (label: string) => `${criterionOptions} > li[aria-label="${label}"]`,
      options: criterionOptions,
    },
    tag: {
      input: dataTest("select-tag-input"),
      option: (label: string) => `${tagOptions} > li[aria-label="${label}"]`,
      options: tagOptions
    }
  },
  nodes: { node: ".p-tree-node-content" }
} as const;