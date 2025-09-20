import type { Compare } from "./compare";

import { by } from "./by";

const defaultCollatorOptions: Intl.CollatorOptions = {
  ignorePunctuation: true,
  numeric: true,
  sensitivity: "base",
};
const defaultCollator = new Intl.Collator(undefined, defaultCollatorOptions);

type ByStringCollatorOptions = {
  locale: string | string[];
  options: Intl.CollatorOptions;
} | {
  locale: undefined;
  options: undefined;
};

type ByStringOptions<T> = ByStringCollatorOptions & {
  nulls?: "first" | "last";
  select: (item: T) => null | string | undefined;
};

export function byString<T>({
  locale,
  nulls = "last",
  options,
  select
}: ByStringOptions<T>): Compare<T> {

  const collator = locale
    ? new Intl.Collator(locale, options)
    : defaultCollator;
  const compare: Compare<string> = (a, b) => collator.compare(a, b);

  return by({
    compare,
    nulls,
    select
  });
}