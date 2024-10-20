import { describe, expect, it } from "vitest";

import { sort } from "./sort";

describe("sort", () => {
  it("should sort an array of objects by a number field", () => {
    const array = [
      { id: 3, name: "Charlie" },
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const sorted = sort(array, "id");
    expect(sorted).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("should sort an array of objects by a string field", () => {
    const array = [
      { id: 1, name: "Charlie" },
      { id: 2, name: "Alice" },
      { id: 3, name: "Bob" },
    ];
    const sorted = sort(array, "name");
    expect(sorted).toEqual([
      { id: 2, name: "Alice" },
      { id: 3, name: "Bob" },
      { id: 1, name: "Charlie" },
    ]);
  });

  it("should handle single non-array object", () => {
    const obj = { id: 1, name: "Alice" };
    const sorted = sort(obj, "id");
    expect(sorted).toEqual([obj]);
  });

  it("sorted array is independent", () => {
    const array = [{ id: 1, name: "Alice" }];
    const sorted = sort(array, "id");

    array[0].id = 5;

    expect(sorted[0].id).toEqual(1);
  });
});
