import {
  describe,
  expect,
  it
} from "vitest";

import { isArrayFull } from "./is-array-full";

describe("isArrayFull", () => {
  it("should return true when given an array with elements", () => {
    expect(isArrayFull([1, 2, 3])).toBe(true);
  });

  it("should return false when given an empty array", () => {
    expect(isArrayFull([])).toBe(false);
  });

  it("should return false when given a non-array element", () => {
    expect(isArrayFull(42)).toBe(false);
  });

  it("should return false when given an undefined value", () => {
    expect(isArrayFull(undefined)).toBe(false);
  });

  it("should return false when given null", () => {
    expect(isArrayFull(null)).toBe(false);
  });
});
