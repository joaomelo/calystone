import { describe, expect, test } from "vitest";

import { createId } from "../ids";
import { flatTree } from "./flat";
import { treeify } from "./treeify";

describe("flat tree", () => {
  const a = { id: createId(), parentId: null };
  const a1 = { id: createId(), parentId: a.id };
  const a11 = { id: createId(), parentId: a1.id };
  const b = { id: createId() };
  const b1 = { archivedAt: new Date(), id: createId(), parentId: b.id };

  test("flattens a tree into an array", () => {
    const tree = treeify([b1, a11, a, a1, b]);
    const flat = flatTree(tree);

    expect(flat).toEqual([a, a1, a11, b, b1]);
  });
});
