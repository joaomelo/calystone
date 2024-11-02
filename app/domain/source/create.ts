import type { ClosedSource } from "./source";

export function createSource(): ClosedSource {
  return {
    load: undefined,
    status: "closed",
  };
};