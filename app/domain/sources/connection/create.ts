import type { Connection } from "./connection";

export function createConnection(): Connection {
  return {
    status: "idle"
  };
};