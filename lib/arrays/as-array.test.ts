import { describe, expect, it } from "vitest";

import { asArray } from "./as-array";

describe("asArray", () => {
  it("should return the same array when given an array", () => {
    const array = [1, 2, 3];
    expect(asArray(array)).toEqual(array);
  });

  it("should wrap a non-array value into an array", () => {
    expect(asArray(42)).toEqual([42]);
    expect(asArray("hello")).toEqual(["hello"]);
  });

  it("should return an empty array when given undefined", () => {
    expect(asArray(undefined)).toEqual([]);
  });

  it("should return an empty array when given null", () => {
    expect(asArray(null)).toEqual([]);
  });
});
