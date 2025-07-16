import type { DebouncedFunc } from "lodash-es";

import { debounce as debounceLodash } from "lodash-es";

interface Options {wait?: number,}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  options?: Options
): DebouncedFunc<T> {
  const { wait = 1000 } = options ?? {};
  return debounceLodash(func, wait);
}
