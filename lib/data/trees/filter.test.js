import { describe, test, expect } from "vitest";
import { createId } from "../ids";
import { treeify } from "./treeify";
import { filterTree } from "./filter";

describe("filter tree", () => {
  const a = { id: createId(), parentId: null };
  const a1 = { id: createId(), parentId: a.id };
  const a11 = { id: createId(), parentId: a1.id };
  const b = { id: createId() };
  const b1 = { id: createId(), archivedAt: new Date(), parentId: b.id };

  test("filter a tree into an array", () => {
    const tree = treeify([b1, a11, a, a1, b]);

    const subTree = filterTree(tree, (i) => i.id === a1.id);

    expect(subTree).toEqual([
      {
        ...a1,
        children: [{ ...a11, children: [] }],
      },
    ]);
  });
});