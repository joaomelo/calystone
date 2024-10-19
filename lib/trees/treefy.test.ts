import { describe, expect, it } from "vitest";

import { type TreeNodeItem } from "./tree";
import { treeify } from "./treeify";

interface MockItem extends TreeNodeItem<number> {
  id: number;
  name: string;
}

describe("treeify", () => {
  it("should create a flat tree when no items have parentId", () => {
    const items = new Map<number, MockItem>([
      [1, { id: 1, name: "Item 1" }],
      [2, { id: 2, name: "Item 2" }],
    ]);

    const tree = treeify(items);

    expect(tree.length).toBe(2);
    expect(tree[0].item.id).toBe(1);
    expect(tree[0].children).toHaveLength(0);
    expect(tree[1].item.id).toBe(2);
    expect(tree[1].children).toHaveLength(0);
  });

  it("should create a nested tree with parent-child relationships", () => {
    const items = new Map<number, MockItem>([
      [1, { id: 1, name: "Parent 1" }],
      [2, { id: 2, name: "Child 1", parentId: 1 }],
      [3, { id: 3, name: "Child 2", parentId: 1 }],
      [4, { id: 4, name: "Parent 2" }],
      [5, { id: 5, name: "Child 3", parentId: 4 }]
    ]);

    const tree = treeify(items);

    expect(tree.length).toBe(2); 
    expect(tree[0].item.id).toBe(1);
    expect(tree[0].children.length).toBe(2); 
    expect(tree[0].children[0].item.id).toBe(2);
    expect(tree[0].children[1].item.id).toBe(3);

    expect(tree[1].item.id).toBe(4);
    expect(tree[1].children.length).toBe(1); 
    expect(tree[1].children[0].item.id).toBe(5);
  });

  it("should throw an error if a parent is not found in the items map", () => {
    const items = new Map<number, MockItem>([
      [1, { id: 1, name: "Parent 1" }],
      [2, { id: 2, name: "Child 1", parentId: 99 }] 
    ]);

    expect(() => treeify(items)).toThrow("parent item not found in items input");
  });
});
