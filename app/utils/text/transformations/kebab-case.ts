import { kebabCase as kebabCaseLodash } from "lodash-es";

export function kebabCase(...args: string[]): string {
  return kebabCaseLodash(args.join("-"));
}