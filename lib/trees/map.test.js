import { describe, test, expect } from "vitest";
import { treeify } from "./treeify";
import { mapTree } from "./map";

describe("map tree", () => {
  const a = { id: "a", parentId: null };
  const a1 = { id: "a1", parentId: "a" };
  const a11 = { id: "a11", parentId: "a1", archivedAt: new Date() };
  const b = { id: "b" };
  const b1 = { id: "b1", archivedAt: new Date(), parentId: "b" };
  const tree = treeify([a, a1, a11, b, b1]);

  test("is able to map data preserving default fields", () => {
    const map = ({ id, archivedAt }) => ({ id, isArchived: !!archivedAt });
    const newTree = mapTree(tree, map);

    expect(newTree).toEqual([
      {
        data: { id: a.id, isArchived: false },
        children: [
          {
            data: { id: a1.id, isArchived: false },
            children: [
              {
                data: { id: a11.id, isArchived: true },
                children: [],
              },
            ],
          },
        ],
      },
      {
        data: { id: b.id, isArchived: false },
        children: [
          {
            data: { id: b1.id, isArchived: true },
            children: [],
          },
        ],
      },
    ]);
  });
});
