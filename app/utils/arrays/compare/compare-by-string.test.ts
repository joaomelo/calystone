import {
  describe,
  expect,
  it
} from "vitest";

import { compareByString } from "./compare-by-string";

describe("compareByString", () => {
  it("should compare strings alphabetically", () => {
    const compare = compareByString({ select: (item: string) => item });

    const items = ["banana", "apple", "cherry"];
    const sorted = [...items].sort(compare);

    expect(sorted).toEqual(["apple", "banana", "cherry"]);
  });

  it("should handle case insensitivity by default", () => {
    const compare = compareByString({ select: (item: string) => item });

    const items = ["Apple", "banana", "CHERRY", "date"];
    const sorted = [...items].sort(compare);

    expect(sorted).toEqual(["Apple", "banana", "CHERRY", "date"]);
  });

  it("should handle numeric values correctly", () => {
    const compare = compareByString({ select: (item: string) => item });

    const items = ["file10", "file2", "file1", "file20"];
    const sorted = [...items].sort(compare);

    expect(sorted).toEqual(["file1", "file2", "file10", "file20"]);
  });

  it("should handle nulls last by default", () => {
    const compare = compareByString({ select: (item: { value: null | string }) => item.value });

    const items = [
      { value: null },
      { value: "banana" },
      { value: "apple" },
      { value: null }
    ];
    const sorted = [...items].sort(compare);

    expect(sorted).toEqual([
      { value: "apple" },
      { value: "banana" },
      { value: null },
      { value: null }
    ]);
  });

  it("should handle nulls first when specified", () => {
    const compare = compareByString({
      nulls: "first",
      select: (item: { value: null | string }) => item.value
    });

    const items = [
      { value: "banana" },
      { value: null },
      { value: "apple" },
      { value: null }
    ];
    const sorted = [...items].sort(compare);

    expect(sorted).toEqual([
      { value: null },
      { value: null },
      { value: "apple" },
      { value: "banana" }
    ]);
  });

  it("should use custom locale when specified", () => {
    const compareSwedish = compareByString({
      locale: "sv",
      options: { sensitivity: "base" },
      select: (item: string) => item
    });

    const items = ["z", "ä", "o", "a"];
    const sorted = [...items].sort(compareSwedish);

    expect(sorted).toEqual(["a", "o", "z", "ä"]);
  });
});
