import { InMemoryDb } from "./in-memory";

export function createDb(options) {
  switch (options?.type) {
    case "in-memory":
      return new InMemoryDb(options);
    default:
      return new InMemoryDb();
  }
}
