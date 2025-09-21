import {
  describe,
  expect,
  it
} from "vitest";

import { compareByRank } from "./compare-by-rank";

describe("compareByRank", () => {
  const taskA = {
    name: "Task A",
    priority: "high"
  };
  const taskB = {
    name: "Task B",
    priority: "low"
  };
  const taskC = {
    name: "Task C",
    priority: undefined
  };
  const taskD = {
    name: "Task D",
    priority: "medium"
  };
  const taskE = {
    name: "Task E",
    priority: "critical"
  };

  const items = [ taskA, taskB, taskC, taskD, taskE, ];
  const priorities = ["low", "medium", "high"];

  it("should compare based on ranked array", () => {

    const compare = compareByRank({
      nulls: "first",
      rank: priorities,
      select: (item: { priority?: string }) => item.priority
    });

    const sorted = [...items].sort(compare);

    expect(sorted).toEqual([taskC, taskE, taskB, taskD, taskA]);
  });

  it("should handle empty rank array", () => {
    const compare = compareByRank({
      rank: [],
      select: (item: { priority?: string }) => item.priority
    });

    const sorted = [...items].sort(compare);

    expect(sorted).toEqual(items);
  });
});
