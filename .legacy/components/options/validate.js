import { asOptions } from "./as";

export function validateOptionOrOptions(optionOrOptions) {
  return validateOptions(asOptions(optionOrOptions));
}

export function validateOptions(options) {
  return options.every((option) => {
    if (typeof option !== "object") return false;
    if (typeof option.value !== "string") return false;
    if (typeof option.text !== "string") return false;
    return true;
  });
}
