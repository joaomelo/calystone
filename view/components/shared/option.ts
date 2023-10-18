export type Option = {
  value: Value;
  text: Text;
  inactive?: boolean;
};

export type OptionOrString = Option | string;

export type Value = string;
export type Text = string;

export function asOptions(optionsOrStrings: OptionOrString[]) {
  return optionsOrStrings.map((optionOrString) => {
    if (typeof optionOrString === "string") {
      return {
        value: optionOrString,
        text: optionOrString,
      };
    }
    return optionOrString;
  });
}
