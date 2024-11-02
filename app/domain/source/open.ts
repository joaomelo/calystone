import type { Load, Source } from "./source";

export function openSource(source: Source, load: Load) {
  source.load = load;
  source.status = "open";
};