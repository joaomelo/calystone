import { describe, it, expectTypeOf } from "vitest";
import { createId } from "./id";

describe("generate id", () => {
  it("generate ids", () => {
    expectTypeOf(createId()).toBeString();
  });
});
