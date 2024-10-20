import { describe, expect, it } from "vitest";

import { isObjectLike } from "./is-object-like";

describe("isObjectLike", () => {
  it.each([
    [{}],
    [{ key: "value" }],
    [[]]
  ])("should return true for object-like values: %s", (value) => {
    expect(isObjectLike(value)).toBe(true);
  });

  it.each([
    null,
    "string",
    42,
    true,
    false,
    () => undefined,
    undefined
  ])("should return false for non-object-like values: %s", (value) => {
    expect(isObjectLike(value)).toBe(false);
  });
});
