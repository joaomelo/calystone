import { describe, expect, it } from "vitest";

import { mapTree } from "./map";
import { type Tree } from "./tree";

interface MockItem {
  id: number;
  name: string;
}

interface MappedMockItem {
  isMapped: boolean;
  name: string;
}

describe("mapTree", () => {
  it("should map each item in the tree using the provided map function", () => {
    const tree: Tree<MockItem> = [
      {
        children: [
          {
            children: [],
            item: { id: 2, name: "Child 1" }
          },
          {
            children: [],
            item: { id: 3, name: "Child 2" }
          }
        ],
        item: { id: 1, name: "Root" }
      }
    ];

    const mapItem = (item: MockItem): MappedMockItem => ({
      ...item,
      isMapped: true
    });

    const mappedTree = mapTree(tree, mapItem);

    expect(mappedTree).toEqual([
      {
        children: [
          {
            children: [],
            item: { id: 2, isMapped: true, name: "Child 1" }
          },
          {
            children: [],
            item: { id: 3, isMapped: true, name: "Child 2" }
          }
        ],
        item: { id: 1, isMapped: true, name: "Root" }
      }
    ]);
  });

  it("should handle an empty tree", () => {
    const tree: Tree<MockItem> = [];
    const mapItem = (item: MockItem): MappedMockItem => ({
      ...item,
      isMapped: true
    });

    const mappedTree = mapTree(tree, mapItem);

    expect(mappedTree).toEqual([]);
  });
});