import {
  beforeEach,
  describe,
  expect,
  it
} from "vitest";

import { Queue } from "./queue";

describe("Queue", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  describe("add", () => {
    it("should add items to the queue", () => {
      queue.add([1, 2, 3]);
      expect(queue.size()).toBe(3);
    });

    it("should add items in the correct order", () => {
      queue.add([1, 2, 3]);
      expect(queue.next()).toEqual([1]);
      expect(queue.next()).toEqual([2]);
      expect(queue.next()).toEqual([3]);
    });

    it("should handle empty array", () => {
      queue.add([]);
      expect(queue.size()).toBe(0);
    });

    it("should handle multiple add operations", () => {
      queue.add([1, 2]);
      queue.add([3, 4]);
      expect(queue.size()).toBe(4);
      expect(queue.next(4)).toEqual([1, 2, 3, 4]);
    });
  });

  describe("next", () => {
    it("should return empty array when queue is empty", () => {
      expect(queue.next()).toEqual([]);
      expect(queue.next(5)).toEqual([]);
    });

    it("should return single item with default batch size", () => {
      queue.add([1, 2, 3]);
      expect(queue.next()).toEqual([1]);
    });

    it("should return multiple items with specified batch size", () => {
      queue.add([1, 2, 3, 4, 5]);
      expect(queue.next(3)).toEqual([1, 2, 3]);
    });

    it("should return all remaining items when batch size exceeds queue size", () => {
      queue.add([1, 2, 3]);
      expect(queue.next(5)).toEqual([1, 2, 3]);
    });

    it("should maintain FIFO order", () => {
      queue.add([1, 2, 3, 4, 5]);
      expect(queue.next(2)).toEqual([1, 2]);
      expect(queue.next(2)).toEqual([3, 4]);
      expect(queue.next(2)).toEqual([5]);
    });

    it("should handle batch size of zero", () => {
      queue.add([1, 2, 3]);
      expect(queue.next(0)).toEqual([]);
      expect(queue.size()).toBe(3);
    });
  });

  describe("size", () => {
    it("should return 0 for empty queue", () => {
      expect(queue.size()).toBe(0);
    });

    it("should return correct size after adding items", () => {
      queue.add([1, 2, 3]);
      expect(queue.size()).toBe(3);
    });

    it("should return correct size after removing items", () => {
      queue.add([1, 2, 3, 4, 5]);
      queue.next(2);
      expect(queue.size()).toBe(3);
    });

    it("should return 0 after clearing", () => {
      queue.add([1, 2, 3]);
      queue.clear();
      expect(queue.size()).toBe(0);
    });
  });

  describe("empty", () => {
    it("should return true for empty queue", () => {
      expect(queue.empty()).toBe(true);
    });

    it("should return false when queue has items", () => {
      queue.add([1]);
      expect(queue.empty()).toBe(false);
    });

    it("should return true after removing all items", () => {
      queue.add([1, 2]);
      queue.next(2);
      expect(queue.empty()).toBe(true);
    });
  });

  describe("clear", () => {
    it("should remove all items from queue", () => {
      queue.add([1, 2, 3, 4, 5]);
      queue.clear();
      expect(queue.size()).toBe(0);
      expect(queue.empty()).toBe(true);
    });

    it("should work on empty queue", () => {
      queue.clear();
      expect(queue.size()).toBe(0);
      expect(queue.empty()).toBe(true);
    });
  });

  describe("generic behavior", () => {
    it("should work with string type", () => {
      const stringQueue = new Queue<string>();
      stringQueue.add(["hello", "world"]);
      expect(stringQueue.next()).toEqual(["hello"]);
    });

    it("should work with object type", () => {
      const objectQueue = new Queue<{
        id: number;
        name: string
      }>();
      const items = [
        {
          id: 1,
          name: "Alice"
        },
        {
          id: 2,
          name: "Bob"
        },
      ];
      objectQueue.add(items);
      expect(objectQueue.next()).toEqual([items[0]]);
    });

    it("should work with mixed operations", () => {
      const mixedQueue = new Queue<number | string>();
      mixedQueue.add([1, "hello", 2, "world"]);
      expect(mixedQueue.next(2)).toEqual([1, "hello"]);
      expect(mixedQueue.next(2)).toEqual([2, "world"]);
    });
  });

  describe("edge cases", () => {
    it("should handle very large batch sizes", () => {
      queue.add([1, 2, 3]);
      expect(queue.next(1000)).toEqual([1, 2, 3]);
    });

    it("should handle negative batch sizes", () => {
      queue.add([1, 2, 3]);
      expect(queue.next(-1)).toEqual([]);
      expect(queue.size()).toBe(3);
    });

    it("should handle multiple clear operations", () => {
      queue.add([1, 2, 3]);
      queue.clear();
      queue.clear();
      expect(queue.size()).toBe(0);
    });
  });
});