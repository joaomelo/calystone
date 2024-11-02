import type { ActiveSource } from "./source";

export async function* loadSource(source: ActiveSource) {
  source.status = "loading";
  yield* source.load();
  source.status = "open";
}