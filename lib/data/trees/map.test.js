import { describe, expect, test } from "vitest";
import { createId } from "../ids";
import { treeify } from "./treeify";
import { mapTree } from "./map";

describe("map tree", () => {
  const a = { id: createId(), parentId: null };
  const a1 = { id: createId(), parentId: a.id };
  const a11 = { id: createId(), parentId: a1.id, archivedAt: new Date() };
  const b = { id: createId() };
  const b1 = { id: createId(), archivedAt: new Date(), parentId: b.id };
  const tree = treeify([a, a1, a11, b, b1]);

  test("is able to map data preserving default fields", () => {
    const map = ({ id, archivedAt }) => ({ id, isArchived: !!archivedAt });
    const newTree = mapTree(tree, map);

    expect(newTree).toEqual([
      {
        id: a.id,
        isArchived: false,
        children: [
          {
            id: a1.id,
            isArchived: false,
            children: [
              {
                id: a11.id,
                isArchived: true,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: b.id,
        isArchived: false,
        children: [
          {
            id: b1.id,
            isArchived: true,
            children: [],
          },
        ],
      },
    ]);
  });
});
