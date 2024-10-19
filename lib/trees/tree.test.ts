import { describe, expect, it } from "vitest";

import { nodedify } from "./tree";

describe("nodedify", () => {
  it("should return a TreeNode with value %s and empty children", () => {
    const item = { id: 1, name: "test" };
    const result = nodedify(item);
    expect(result).toEqual({
      children: [],
      item,
    });
  });
});
