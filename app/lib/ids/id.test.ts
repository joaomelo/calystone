import { validate } from "uuid";
import { describe, expect, it } from "vitest";

import { createId, isId } from "./id";

describe("createId", () => {
  it("should create a valid UUID v4 Id", () => {
    const id = createId();
    expect(validate(id)).toBe(true);
  });
});

describe("isId", () => {
  it("should return true for a valid UUID v4 Id", () => {
    const validId = createId();
    expect(isId(validId)).toBe(true);
  });

  it("should return false for an invalid UUID", () => {
    const invalidId = "invalid-uuid";
    expect(isId(invalidId)).toBe(false);
  });

  it("should return false for a non-string type", () => {
    expect(isId(123)).toBe(false);
    expect(isId({})).toBe(false);
    expect(isId([])).toBe(false);
  });

  it("should return false for a UUID that is not version 4", () => {
    const nonV4Id = "123e4567-e89b-12d3-a456-426614174000";
    expect(isId(nonV4Id)).toBe(false);
  });
});
