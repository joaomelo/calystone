import type { Source } from "./source";

export function closeSource(source: Source) {
  source.status = "closed";
  source.load = undefined;
};