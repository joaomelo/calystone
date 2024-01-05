import { describe, expect, test } from "vitest";
import { createId } from "../ids";
import { treeify } from "./treeify";

describe("treeify", () => {
  const a = { id: createId(), parentId: null };
  const b = { id: createId() };
  const a1 = { id: createId(), parentId: a.id };
  const a11 = { id: createId(), parentId: a1.id };
  const b1 = { id: createId(), archivedAt: new Date(), parentId: b.id };

  test("if the list is empty it returns a empty array", () => {
    const tree = treeify([]);
    expect(tree).toEqual([]);
  });

  test("if the list has only parents the tree will be similar but with all treeable fields", () => {
    const tree = treeify([a, b]);

    expect(tree).toEqual([
      { ...a, children: [] },
      { ...b, children: [] },
    ]);
  });

  test("mounts a tree with nested items independent of their order", () => {
    const tree = treeify([b, a1, b1, a11, a]);

    expect(tree).toEqual([
      {
        ...b,
        children: [{ ...b1, children: [] }],
      },
      {
        ...a,
        children: [{ ...a1, children: [{ ...a11, children: [] }] }],
      },
    ]);
  });

  test("can return filtered tree", () => {
    const isRoot = i => i.id === a1.id;
    const tree = treeify([b, a1, b1, a11, a], { isRoot });

    expect(tree).toEqual([
      {
        ...a1,
        children: [{ ...a11, children: [] }],
      },
    ]);
  });
});
