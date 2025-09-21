import {
  describe,
  expect,
  it
} from "vitest";

import { compareBy } from "./compare-by";

describe("compareBy", () => {
  it("should compare numbers correctly with default comparator", () => {
    const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
    const compare = compareBy<{ value: number }, number>({ select: item => item.value });

    expect(compare(items[0], items[1])).toBeGreaterThan(0);
    expect(compare(items[1], items[0])).toBeLessThan(0);
    expect(compare(items[0], items[2])).toBeGreaterThan(0);
    expect(compare(items[2], items[0])).toBeLessThan(0);
    expect(compare(items[1], items[2])).toBeLessThan(0);
    expect(compare(items[2], items[1])).toBeGreaterThan(0);

    items.sort(compare);
    expect(items).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
  });

  it("should compare strings correctly with default comparator", () => {
    const items = [{ name: "charlie" }, { name: "alpha" }, { name: "bravo" }];
    const compare = compareBy<{ name: string }, string>({ select: item => item.name });

    items.sort(compare);
    expect(items).toEqual([{ name: "alpha" }, { name: "bravo" }, { name: "charlie" }]);
  });

  it("should compare dates correctly with default comparator", () => {
    const date1 = new Date(2023, 0, 1);
    const date2 = new Date(2023, 0, 15);
    const date3 = new Date(2023, 1, 1);

    const items = [{ date: date2 }, { date: date3 }, { date: date1 }];
    const compare = compareBy<{ date: Date }, Date>({ select: item => item.date });

    items.sort(compare);
    expect(items).toEqual([{ date: date1 }, { date: date2 }, { date: date3 }]);
  });

  it("should use custom compare function when provided", () => {
    const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
    const reverseCompare = (a: number, b: number) => b - a;
    const compare = compareBy<{ value: number }, number>({
      compare: reverseCompare,
      select: item => item.value
    });

    items.sort(compare);
    expect(items).toEqual([{ value: 3 }, { value: 2 }, { value: 1 }]);
  });

  it("should handle nulls and undefined values as equal", () => {
    const compare = compareBy<{ value?: null | number }, null | number>({ select: item => item.value });

    expect(compare({ value: null }, { value: undefined })).toBe(0);
    expect(compare({ value: undefined }, { value: null })).toBe(0);
    expect(compare({ value: undefined }, { value: undefined })).toBe(0);
    expect(compare({ value: null }, { value: null })).toBe(0);
  });

  it("should place nulls last by default", () => {
    const items = [{ value: null }, { value: 1 }, { value: undefined }, { value: 2 }];
    const compare = compareBy<{ value?: null | number }, null | number>({ select: item => item.value });

    items.sort(compare);
    expect(items[0].value).toBe(1);
    expect(items[1].value).toBe(2);
    expect(items[2].value).toBeNull();
    expect(items[3].value).toBeUndefined();
  });

  it("should place nulls first when configured", () => {
    const items = [{ value: 1 }, { value: null }, { value: 2 }, { value: undefined }];
    const compare = compareBy<{ value?: null | number }, null | number>({
      nulls: "first",
      select: item => item.value
    });

    items.sort(compare);
    expect(items[0].value).toBeNull();
    expect(items[1].value).toBeUndefined();
    expect(items[2].value).toBe(1);
    expect(items[3].value).toBe(2);
  });

  it("should return 0 for equal values", () => {
    const compare = compareBy<{ value: number }, number>({ select: item => item.value });

    expect(compare({ value: 5 }, { value: 5 })).toBe(0);
  });
});
