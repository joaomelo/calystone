import type { Compare } from "./compare";

import { compareBy } from "./compare-by";

const defaultCollatorOptions: Intl.CollatorOptions = {
  ignorePunctuation: true,
  numeric: true,
  sensitivity: "base",
};
const defaultCollator = new Intl.Collator(undefined, defaultCollatorOptions);

type CompareByStringCollatorOptions = {
  locale: string | string[];
  options: Intl.CollatorOptions;
} | {
  locale?: undefined;
  options?: undefined;
};

type CompareByStringOptions<T> = CompareByStringCollatorOptions & {
  nulls?: "first" | "last";
  select: (item: T) => null | string | undefined;
};

export function compareByString<T>({
  locale,
  nulls = "last",
  options,
  select
}: CompareByStringOptions<T>): Compare<T> {

  const collator = locale
    ? new Intl.Collator(locale, options)
    : defaultCollator;
  const compare: Compare<string> = (a, b) => collator.compare(a, b);

  return compareBy({
    compare,
    nulls,
    select
  });
}