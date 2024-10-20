import { describe, expect, it } from "vitest";

import { hasElements } from "./has-elements";

describe("hasElements", () => {
  it("should return true when given an array with elements", () => {
    expect(hasElements([1, 2, 3])).toBe(true);
  });

  it("should return false when given an empty array", () => {
    expect(hasElements([])).toBe(false);
  });

  it("should return true when given a non-array element", () => {
    expect(hasElements(42)).toBe(true);
  });

  it("should return false when given an undefined value", () => {
    expect(hasElements(undefined)).toBe(false);
  });

  it("should return false when given null", () => {
    expect(hasElements(null)).toBe(false);
  });
});
