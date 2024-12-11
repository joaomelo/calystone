import { describe, expect, it } from "vitest";

import { createId } from "./id";
import { isWithId } from "./with-id";

describe("isWithId", () => {
  it("should return true for an object with a valid Id", () => {
    const validWithId = { id: createId() };
    expect(isWithId(validWithId)).toBe(true);
  });

  it("should return false for an object without an id property", () => {
    const invalidWithId = { name: "test" };
    expect(isWithId(invalidWithId)).toBe(false);
  });

  it("should return false for an object with an invalid Id", () => {
    const invalidWithId = { id: "invalid-uuid" };
    expect(isWithId(invalidWithId)).toBe(false);
  });

  it("should return false for an object with an id property that is not an id", () => {
    const invalidWithId = { id: {} };
    expect(isWithId(invalidWithId)).toBe(false);
  });

  it("should return false for non-object types", () => {
    expect(isWithId(123)).toBe(false);
    expect(isWithId("string")).toBe(false);
    expect(isWithId([])).toBe(false);
    expect(isWithId(null)).toBe(false);
  });
});
