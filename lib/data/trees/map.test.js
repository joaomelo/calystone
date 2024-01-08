import { describe, expect, test } from "vitest";

import { createId } from "../ids";
import { mapTree } from "./map";
import { treeify } from "./treeify";

describe("map tree", () => {
  const a = { id: createId(), parentId: null };
  const a1 = { id: createId(), parentId: a.id };
  const a11 = { archivedAt: new Date(), id: createId(), parentId: a1.id };
  const b = { id: createId() };
  const b1 = { archivedAt: new Date(), id: createId(), parentId: b.id };
  const tree = treeify([a, a1, a11, b, b1]);

  test("is able to map data preserving default fields", () => {
    const map = ({ archivedAt, id }) => ({ id, isArchived: !!archivedAt });
    const newTree = mapTree(tree, map);

    expect(newTree).toEqual([
      {
        children: [
          {
            children: [
              {
                children: [],
                id: a11.id,
                isArchived: true,
              },
            ],
            id: a1.id,
            isArchived: false,
          },
        ],
        id: a.id,
        isArchived: false,
      },
      {
        children: [
          {
            children: [],
            id: b1.id,
            isArchived: true,
          },
        ],
        id: b.id,
        isArchived: false,
      },
    ]);
  });
});
