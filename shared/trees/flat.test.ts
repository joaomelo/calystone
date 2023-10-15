import type { IsRoot } from "./treeable";

import { describe, test, expect } from "vitest";
import { treeify } from "./treeify";
import { flatTree } from "./flat";

describe("flat tree", () => {
  const a = { id: "a", parentId: null };
  const b = { id: "b" };
  const a1 = { id: "a1", parentId: "a" };
  const a11 = { id: "a11", parentId: "a1" };
  const b1 = { id: "b1", archivedAt: new Date(), parentId: "b" };

  test("flattens a tree into an array", () => {
    const isRoot: IsRoot = ({ id }) => id === a1.id;
    const tree = treeify([b1, a11, a, a1, b], { isRoot });
    const flat = flatTree(tree);

    expect(flat).toEqual([a1, a11]);
  });
});
