import type { ClosedConnectiion } from "./connection";

export function createConnection(): ClosedConnectiion {
  return {
    root: undefined,
    status: "closed",
  };
};