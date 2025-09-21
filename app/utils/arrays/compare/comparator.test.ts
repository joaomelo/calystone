import {
  describe,
  expect,
  it
} from "vitest";

import { comparator } from "./comparator";

describe("comparator", () => {
  const numberCompare = (a: number, b: number) => a - b;

  it("should work with a single comparer", () => {
    const compare = comparator(numberCompare);
    expect(compare(1, 2)).toBeLessThan(0);
    expect(compare(2, 1)).toBeGreaterThan(0);
    expect(compare(1, 1)).toBe(0);
  });

  it("should return early on first non-zero result", () => {
    const compare = comparator(
      numberCompare,
      () => { throw new Error("Should not be called"); }
    );

    expect(compare(1, 2)).toBeLessThan(0);
    expect(compare(2, 1)).toBeGreaterThan(0);
  });

  it("should continue to next comparer when first returns 0", () => {
    const ageNameCompare = comparator<{
      age: number,
      name: string
    }>(
      (a, b) => a.age - b.age,
      (a, b) => a.name.localeCompare(b.name)
    );

    expect(ageNameCompare({
      age: 30,
      name: "Alice"
    }, {
      age: 30,
      name: "Bob"
    })).toBeLessThan(0);
    expect(ageNameCompare({
      age: 30,
      name: "Bob"
    }, {
      age: 30,
      name: "Alice"
    })).toBeGreaterThan(0);
    expect(ageNameCompare({
      age: 25,
      name: "Charlie"
    }, {
      age: 30,
      name: "Alice"
    })).toBeLessThan(0);
  });

  it("should return 0 when all comparers return 0", () => {
    const alwaysEqualCompare = comparator(
      () => 0,
      () => 0
    );

    expect(alwaysEqualCompare("anything", "something else")).toBe(0);
  });

  it("should handle empty comparers array", () => {
    const emptyCompare = comparator();
    expect(emptyCompare(1, 2)).toBe(0);
    expect(emptyCompare("a", "b")).toBe(0);
  });
});
