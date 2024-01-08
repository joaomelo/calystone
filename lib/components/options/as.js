import { asArray } from "@lib";

export function asOptions(maybeOptionOrOptions) {
  const maybeOptions = asArray(maybeOptionOrOptions);
  return maybeOptions.map((maybeOption) => {
    if (typeof maybeOption === "string") {
      return {
        text: maybeOption,
        value: maybeOption,
      };
    }
    return maybeOption;
  });
}
