import { describe, expectTypeOf, it } from "vitest";
import { createId } from "./create";

describe("generate id", () => {
  it("generate ids", () => {
    expectTypeOf(createId()).toBeString();
  });
});
