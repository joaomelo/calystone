import { describe, expect, test } from "vitest";

import { createId } from "../ids";
import { filterTree } from "./filter";
import { treeify } from "./treeify";

describe("filter tree", () => {
  const a = { id: createId(), parentId: null };
  const a1 = { id: createId(), parentId: a.id };
  const a11 = { id: createId(), parentId: a1.id };
  const b = { id: createId() };
  const b1 = { archivedAt: new Date(), id: createId(), parentId: b.id };

  test("filter a tree into an array", () => {
    const tree = treeify([b1, a11, a, a1, b]);

    const subTree = filterTree(tree, i => i.id === a1.id);

    expect(subTree).toEqual([
      {
        ...a1,
        children: [{ ...a11, children: [] }],
      },
    ]);
  });
});
