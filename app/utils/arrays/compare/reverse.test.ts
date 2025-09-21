import {
  describe,
  expect,
  it
} from "vitest";

import { reverse } from "./reverse";

describe("reverse", () => {
  it("should reverse the comparison result", () => {
    const numberCompare = (a: number, b: number) => a - b;
    const reversedCompare = reverse(numberCompare);

    expect(reversedCompare(1, 2)).toBeGreaterThan(0);
    expect(reversedCompare(2, 1)).toBeLessThan(0);
    expect(reversedCompare(1, 1)).toBe(0);
  });
});
