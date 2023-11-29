import { describe, it, expectTypeOf } from "vitest";
import { createId } from "./create";

describe("generate id", () => {
  it("generate ids", () => {
    expectTypeOf(createId()).toBeString();
  });
});
