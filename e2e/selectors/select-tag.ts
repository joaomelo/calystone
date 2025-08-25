import { dataTest } from "../helpers";

const tagOptions = dataTest("select-tag-options");

export const selectTag = {
  input: dataTest("select-tag-input"),
  option: (label: string) => `${tagOptions} > li[aria-label="${label}"]`,
  options: tagOptions
} as const;