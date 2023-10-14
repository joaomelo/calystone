import type { IsRoot, Map } from "./node";

import { describe, test, expect } from "vitest";
import { treeify } from "./treeify";

describe("treeify", () => {
  const a = { id: "a", parentId: null };
  const b = { id: "b" };
  const a1 = { id: "a1", parentId: "a" };
  const a11 = { id: "a11", parentId: "a1" };
  const b1 = { id: "b1", archivedAt: new Date(), parentId: "b" };

  test("if the list is empty it returns a empty array", () => {
    const tree = treeify([]);
    expect(tree).toEqual([]);
  });

  test("if the list has only parents the tree will be similar", () => {
    const tree = treeify([a, b]);

    expect(tree).toEqual([
      { ...a, children: [] },
      { ...b, children: [] },
    ]);
  });

  test("mounts a tree with nested items independent of their order", () => {
    const tree = treeify([b, a1, b1, a11, a]);

    expect(tree).toEqual([
      { ...b, children: [{ ...b1, children: [] }] },
      {
        ...a,
        children: [{ ...a1, children: [{ ...a11, children: [] }] }],
      },
    ]);
  });

  test.only("is able to map data preserving default fields", () => {
    const map: Map = ({ id, archivedAt }) => ({ id, isArchived: !!archivedAt });
    const tree = treeify([b, b1], { map });

    expect(tree).toEqual([
      {
        id: b.id,
        isArchived: false,
        parentId: null,
        children: [
          { id: b1.id, isArchived: true, parentId: b1.parentId, children: [] },
        ],
      },
    ]);
  });

  test("accepts arbitrary roots", () => {
    const isRoot: IsRoot = ({ id }) => id === a1.id;
    const tree = treeify([b1, a11, a, a1, b], { isRoot });

    expect(tree).toEqual([{ ...a1, children: [{ ...a11, children: [] }] }]);
  });
});
